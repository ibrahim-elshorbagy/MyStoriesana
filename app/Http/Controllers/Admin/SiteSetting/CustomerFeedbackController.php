<?php

namespace App\Http\Controllers\Admin\SiteSetting;

use App\Http\Controllers\Controller;
use App\Models\Admin\SiteSetting\CustomerFeedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CustomerFeedbackController extends Controller
{
  public function index(Request $request)
  {
    $request->validate([
      'sort' => ['nullable', 'string', 'in:id,created_at,updated_at'],
      'direction' => ['nullable', 'string', 'in:asc,desc'],
      'per_page' => ['nullable', 'integer', 'min:1'],
    ]);

    $sortField = $request->input('sort', 'updated_at');
    $sortDirection = $request->input('direction', 'desc');
    $perPage = $request->input('per_page', 15);

    $query = CustomerFeedback::query();

    $feedbacks = $query->orderBy($sortField, $sortDirection)
      ->paginate($perPage)
      ->withQueryString();

    // Add row numbers
    $feedbacks = $this->addRowNumbers($feedbacks);

    return Inertia::render('Admin/SiteSetting/CustomerFeedbacks/CustomerFeedbacks', [
      'feedbacks' => $feedbacks,
      'queryParams' => $request->query() ?: null,
    ]);
  }

  public function store(Request $request)
  {
    $request->validate([
      'customer_feedback' => ['nullable', 'string'],
      'image' => ['nullable', 'image'],
      'video' => ['nullable', 'mimetypes:video/*'],
    ]);

    // Count how many fields are provided
    $providedCount = 0;
    if ($request->filled('customer_feedback')) $providedCount++;
    if ($request->hasFile('image')) $providedCount++;
    if ($request->hasFile('video')) $providedCount++;

    // Only one can be provided
    if ($providedCount > 1) {
      return back()->withErrors(['general' => __('website.only_one_required')]);
    }

    // At least one must be provided
    if ($providedCount === 0) {
      return back()->withErrors(['general' => __('website.at_least_one_required')]);
    }

    $imagePath = null;
    if ($request->hasFile('image')) {
      $imagePath = $request->file('image')->store('customer_feedbacks', 'public');
    }

    $videoPath = null;
    if ($request->hasFile('video')) {
      $videoPath = $request->file('video')->store('customer_feedbacks', 'public');
    }

    CustomerFeedback::create([
      'customer_feedback' => $request->customer_feedback,
      'image' => $imagePath,
      'video' => $videoPath,
    ]);

    return back()
      ->with('title', __('website_response.customer_feedback_created_title'))
      ->with('message', __('website_response.customer_feedback_created_message'))
      ->with('status', 'success');
  }

  public function update(Request $request, CustomerFeedback $customerFeedback)
  {
    $request->validate([
      'customer_feedback' => ['nullable', 'string'],
      'image' => ['nullable', 'image'],
      'video' => ['nullable', 'mimetypes:video/*'],
      'remove_image' => ['boolean'],
      'remove_video' => ['boolean'],
    ]);

    // At least one must be provided: either text, image (existing or new), or video (existing or new)
    $hasText = $request->filled('customer_feedback');
    $hasNewImage = $request->hasFile('image');
    $hasExistingImage = $customerFeedback->image && !$request->boolean('remove_image');
    $hasNewVideo = $request->hasFile('video');
    $hasExistingVideo = $customerFeedback->video && !$request->boolean('remove_video');

    // Count how many are provided
    $providedCount = 0;
    if ($hasText) $providedCount++;
    if ($hasNewImage || $hasExistingImage) $providedCount++;
    if ($hasNewVideo || $hasExistingVideo) $providedCount++;

    // Only one can be provided
    if ($providedCount > 1) {
      return back()->withErrors(['general' => __('website.only_one_required')]);
    }

    if ($providedCount === 0) {
      return back()->withErrors(['general' => __('website.at_least_one_required')]);
    }

    $imagePath = $customerFeedback->image;
    if ($request->boolean('remove_image')) {
      // Delete old image if exists
      if ($customerFeedback->image) {
        Storage::disk('public')->delete($customerFeedback->image);
      }
      $imagePath = null;
    } elseif ($request->hasFile('image')) {
      // Delete old image
      if ($customerFeedback->image) {
        Storage::disk('public')->delete($customerFeedback->image);
      }
      $imagePath = $request->file('image')->store('customer_feedbacks', 'public');
    }

    $videoPath = $customerFeedback->video;
    if ($request->boolean('remove_video')) {
      // Delete old video if exists
      if ($customerFeedback->video) {
        Storage::disk('public')->delete($customerFeedback->video);
      }
      $videoPath = null;
    } elseif ($request->hasFile('video')) {
      // Delete old video
      if ($customerFeedback->video) {
        Storage::disk('public')->delete($customerFeedback->video);
      }
      $videoPath = $request->file('video')->store('customer_feedbacks', 'public');
    }

    $customerFeedback->update([
      'customer_feedback' => $request->customer_feedback,
      'image' => $imagePath,
      'video' => $videoPath,
    ]);

    return back()
      ->with('title', __('website_response.customer_feedback_updated_title'))
      ->with('message', __('website_response.customer_feedback_updated_message'))
      ->with('status', 'success');
  }

  public function destroy(Request $request, CustomerFeedback $customerFeedback)
  {
    // Delete image if exists
    if ($customerFeedback->image) {
      Storage::disk('public')->delete($customerFeedback->image);
    }

    // Delete video if exists
    if ($customerFeedback->video) {
      Storage::disk('public')->delete($customerFeedback->video);
    }

    $customerFeedback->delete();

    return back()
      ->with('title', __('website_response.customer_feedback_deleted_title'))
      ->with('message', __('website_response.customer_feedback_deleted_message'))
      ->with('status', 'success');
  }

  public function bulkDelete(Request $request)
  {
    $validated = $request->validate([
      'ids' => ['required', 'array'],
      'ids.*' => ['exists:customer_feedback,id'],
    ]);

    $feedbacks = CustomerFeedback::whereIn('id', $validated['ids'])->get();

    // Delete images and videos
    foreach ($feedbacks as $feedback) {
      if ($feedback->image) {
        Storage::disk('public')->delete($feedback->image);
      }
      if ($feedback->video) {
        Storage::disk('public')->delete($feedback->video);
      }
    }

    CustomerFeedback::whereIn('id', $validated['ids'])->delete();

    return back()
      ->with('title', __('website_response.customer_feedbacks_bulk_deleted_title'))
      ->with('message', __('website_response.customer_feedbacks_bulk_deleted_message'))
      ->with('status', 'success');
  }
}
