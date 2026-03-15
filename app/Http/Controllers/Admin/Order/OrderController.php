<?php

namespace App\Http\Controllers\Admin\Order;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order\Order;
use App\Models\Order\Payment;
use App\Models\Order\OrderItem;
use Illuminate\Support\Facades\Storage;
use App\Notifications\Orders\Status\PaymentStatusUpdate;
use App\Notifications\Orders\Status\OrderStatusUpdate;
use App\Notifications\Orders\Status\PDFUploaded;
use App\Http\Resources\Order\OrderResource;
use Illuminate\Support\Facades\Notification;

class OrderController extends Controller
{
  public function index(Request $request)
  {
    $request->validate([
      'name' => ['nullable', 'string', 'max:255'],
      'sort' => ['nullable', 'string', 'in:id,child_name,created_at,updated_at,status'],
      'direction' => ['nullable', 'string', 'in:asc,desc'],
      'per_page' => ['nullable', 'integer', 'min:1'],
    ]);

    $sortField = $request->input('sort', 'updated_at');
    $sortDirection = $request->input('direction', 'desc');
    $perPage = $request->input('per_page', 15);

    $query = Order::with(['user', 'payments', 'orderItems.story', 'shippingAddress.deliveryOption']);

    // Filter by child name or user name
    if ($request->filled('name')) {
      $query->where(function ($q) use ($request) {
        $q->whereHas('orderItems', function ($itemQuery) use ($request) {
          $itemQuery->where('child_name', 'like', '%' . $request->name . '%');
        })
        ->orWhereHas('user', function ($userQuery) use ($request) {
          $userQuery->where('name', 'like', '%' . $request->name . '%');
        });
      });
    }

    $orders = $query->orderBy($sortField, $sortDirection)
      ->paginate($perPage)
      ->withQueryString();

    $orders = $this->addRowNumbers($orders);

    return inertia('Admin/Order/Orders', [
      'orders' => $orders->through(fn($order) => OrderResource::make($order)->toArray(request())),
      'queryParams' => $request->query() ?: null,
    ]);
  }

  public function show(Order $order)
  {
    $order->load(['user', 'payments', 'orderItems.story', 'shippingAddress.deliveryOption']);

    return inertia('Admin/Order/Partials/Pages/ViewOrder', [
      'order' => OrderResource::make($order)->toArray(request()),
    ]);
  }

  public function updatePaymentStatus(Request $request, Order $order)
  {
    $request->validate([
      'status' => 'required|in:pending,paid,failed,refunded',
    ]);

    $payment = $order->payments()->first();
    if (!$payment) {
      return back()
        ->with('title', __('website_response.no_payment_found_title'))
        ->with('message', __('website_response.no_payment_found'))
        ->with('status', 'error');
    }

    $payment->update(['status' => $request->status]);

    return back()
      ->with('title', __('website_response.payment_status_updated_title'))
      ->with('message', __('website_response.payment_status_updated'))
      ->with('status', 'success');
  }

  public function notifyPaymentStatus(Request $request, Order $order)
  {
    $request->validate([
      'locale' => 'nullable|in:ar,en,de',
    ]);

    $payment = $order->payments()->first();
    if (!$payment) {
      return back()
        ->with('title', __('website_response.no_payment_found_title'))
        ->with('message', __('website_response.no_payment_found'))
        ->with('status', 'error');
    }

    $user = $order->user()->first();

    if (!$user) {
      return back()
        ->with('title', __('website_response.no_payment_found_title'))
        ->with('message', __('website_response.unauthorized_access'))
        ->with('status', 'error');
    }

    Notification::send($user, new PaymentStatusUpdate($order, $payment, $request->input('locale')));

    return back()
      ->with('title', __('website_response.notification_sent_title'))
      ->with('message', __('website_response.notification_sent'))
      ->with('status', 'success');
  }

  public function updateStatus(Request $request, Order $order)
  {
    $request->validate([
      'status' => 'required|in:pending,processing,printing,completed,cancelled',
    ]);

    $order->update(['status' => $request->status]);

    return back()
      ->with('title', __('website_response.order_status_updated_title'))
      ->with('message', __('website_response.order_status_updated'))
      ->with('status', 'success');
  }

  public function notifyStatus(Request $request, Order $order)
  {
    $request->validate([
      'locale' => 'nullable|in:ar,en,de',
    ]);

    $user = $order->user()->first();

    if (!$user) {
      return back()
        ->with('title', __('website_response.no_payment_found_title'))
        ->with('message', __('website_response.unauthorized_access'))
        ->with('status', 'error');
    }

    Notification::send($user, new OrderStatusUpdate($order, $request->input('locale')));

    return back()
      ->with('title', __('website_response.notification_sent_title'))
      ->with('message', __('website_response.notification_sent'))
      ->with('status', 'success');
  }

  public function uploadPDF(Request $request, OrderItem $orderItem)
  {
    $request->validate([
      'pdf_file' => 'required|file|mimes:pdf|max:51200',
    ]);

    // Delete old PDF if exists
    if ($orderItem->pdf_path) {
      Storage::disk('public')->delete($orderItem->pdf_path);
    }

    $file = $request->file('pdf_file');
    $userId = $orderItem->order->user_id;
    $timestamp = now()->timestamp;
    $filename = "story_{$orderItem->child_name}_{$timestamp}.pdf";

    $path = $file->storeAs("users/{$userId}/orders/{$orderItem->order_id}/order_items/{$orderItem->id}/pdf", $filename, 'public');

    $orderItem->update(['pdf_path' => $path]);

    return back()
      ->with('title', __('website_response.pdf_uploaded_title'))
      ->with('message', __('website_response.pdf_uploaded_message'))
      ->with('status', 'success');
  }


  public function notifyPDF(Request $request, OrderItem $orderItem)
  {
    $request->validate([
      'locale' => 'nullable|in:ar,en,de',
    ]);

    if (!$orderItem->pdf_path) {
      return back()
        ->with('title', __('website_response.pdf_not_found_title'))
        ->with('message', __('website_response.pdf_not_found'))
        ->with('status', 'error');
    }

    $user = $orderItem->order->user()->first();

    if (!$user) {
      return back()
        ->with('title', __('website_response.no_payment_found_title'))
        ->with('message', __('website_response.unauthorized_access'))
        ->with('status', 'error');
    }

    Notification::send($user, new PDFUploaded($orderItem, $request->input('locale')));

    return back()
      ->with('title', __('website_response.notification_sent_title'))
      ->with('message', __('website_response.notification_sent'))
      ->with('status', 'success');
  }

}
