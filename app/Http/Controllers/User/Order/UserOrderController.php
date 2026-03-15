<?php

namespace App\Http\Controllers\User\Order;

use App\Http\Controllers\Controller;
use App\Models\Order\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\Order\OrderResource;

class UserOrderController extends Controller
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

    $query = Order::with(['user', 'payments', 'orderItems.story', 'shippingAddress.deliveryOption'])
      ->where('user_id', Auth::id());

    // Filter by child name
    if ($request->filled('name')) {
      $query->whereHas('orderItems', function ($itemQuery) use ($request) {
        $itemQuery->where('child_name', 'like', '%' . $request->name . '%');
      });
    }

    $orders = $query->orderBy($sortField, $sortDirection)
      ->paginate($perPage)
      ->withQueryString();

    $orders = $this->addRowNumbers($orders);

    return inertia('User/Order/Orders', [
      'orders' => $orders->through(fn($order) => OrderResource::make($order)->toArray(request())),
      'queryParams' => $request->query() ?: null,
    ]);
  }

  public function show(Order $order)
  {
    if ($order->user_id !== Auth::id()) {
      abort(403, 'Unauthorized');
    }

    $order->load(['user', 'payments', 'orderItems.story', 'shippingAddress.deliveryOption']);

    return inertia('User/Order/Partials/Pages/ViewOrder', [
      'order' => OrderResource::make($order)->toArray(request()),
    ]);
  }
}
