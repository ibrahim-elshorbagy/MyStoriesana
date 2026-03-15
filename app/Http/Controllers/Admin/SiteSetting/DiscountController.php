<?php

namespace App\Http\Controllers\Admin\SiteSetting;

use App\Http\Controllers\Controller;
use App\Models\Admin\SiteSetting\Discount;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DiscountController extends Controller
{
  public function index(Request $request)
  {
    $request->validate([
      'code' => ['nullable', 'string', 'max:255'],
      'sort' => ['nullable', 'string', 'in:id,code,percent,usage_limit,created_at,updated_at'],
      'direction' => ['nullable', 'string', 'in:asc,desc'],
      'per_page' => ['nullable', 'integer', 'min:1'],
    ]);

    $sortField = $request->input('sort', 'updated_at');
    $sortDirection = $request->input('direction', 'desc');
    $perPage = $request->input('per_page', 15);

    $query = Discount::query();

    // Filter by code
    if ($request->filled('code')) {
      $query->where('code', 'like', '%' . $request->code . '%');
    }

    $discounts = $query->orderBy($sortField, $sortDirection)
      ->paginate($perPage)
      ->withQueryString();

    // Add row numbers
    $discounts = $this->addRowNumbers($discounts);

    return inertia('Admin/SiteSetting/Discounts/Discount', [
      'discounts' => $discounts,
      'queryParams' => $request->query() ?: null,
    ]);
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
      'code' => ['required', 'string', 'max:255', 'unique:discounts,code'],
      'percent' => ['required', 'numeric', 'min:0', 'max:100'],
      'usage_limit' => ['required', 'integer', 'min:1'],
    ]);

    Discount::create($validated);

    return back()
      ->with('title', __('website_response.discount_created_title'))
      ->with('message', __('website_response.discount_created_message'))
      ->with('status', 'success');
  }

  public function update(Request $request, Discount $discount)
  {
    $validated = $request->validate([
      'code' => ['required', 'string', 'max:255', 'unique:discounts,code,' . $discount->id],
      'percent' => ['required', 'numeric', 'min:0', 'max:100'],
      'usage_limit' => ['required', 'integer', 'min:1'],
    ]);

    $discount->update($validated);

    return back()
      ->with('title', __('website_response.discount_updated_title'))
      ->with('message', __('website_response.discount_updated_message'))
      ->with('status', 'success');
  }

  public function destroy(Request $request, Discount $discount)
  {
    $discount->delete();

    return back()
      ->with('title', __('website_response.discount_deleted_title'))
      ->with('message', __('website_response.discount_deleted_message'))
      ->with('status', 'success');
  }

  public function bulkDelete(Request $request)
  {
    $validated = $request->validate([
      'ids' => ['required', 'array'],
      'ids.*' => ['exists:discounts,id'],
    ]);

    Discount::whereIn('id', $validated['ids'])->delete();

    return back()
      ->with('title', __('website_response.discounts_deleted_title'))
      ->with('message', __('website_response.discounts_deleted_message', ['count' => count($validated['ids'])]))
      ->with('status', 'success');
  }
}
