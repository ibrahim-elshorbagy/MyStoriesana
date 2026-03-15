<?php

namespace App\Http\Controllers\Admin\SiteSetting;

use App\Http\Controllers\Controller;
use App\Models\Admin\SiteSetting\DeliveryOption;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;

class DeliveryOptionController extends Controller
{
  public function index(Request $request)
  {
    $request->validate([
      'name' => ['nullable', 'string', 'max:255'],
      'per_page' => ['nullable', 'integer', 'min:1'],
    ]);

    $sortField = $request->input('sort', 'updated_at');
    $sortDirection = $request->input('direction', 'desc');
    $perPage = $request->input('per_page', 15);

    $query = DeliveryOption::query();

    // Filter by city (search in both Arabic and English)
    if ($request->filled('name')) {
      $query->where(function ($q) use ($request) {
        $q->whereRaw("JSON_UNQUOTE(JSON_EXTRACT(city, '$.ar')) LIKE ?", ['%' . $request->name . '%'])
          ->orWhereRaw("JSON_UNQUOTE(JSON_EXTRACT(city, '$.en')) LIKE ?", ['%' . $request->name . '%'])
          ->orWhereRaw("JSON_UNQUOTE(JSON_EXTRACT(city, '$.de')) LIKE ?", ['%' . $request->name . '%']);
      });
    }

    $deliveryOptions = $query->orderBy($sortField, $sortDirection)
      ->paginate($perPage)
      ->withQueryString();

    // Add row numbers
    $deliveryOptions = $this->addRowNumbers($deliveryOptions);

    return inertia('Admin/SiteSetting/DeliveryOptions/DeliveryOptions', [
      'deliveryOptions' => $deliveryOptions,
      'queryParams' => $request->query() ?: null,
    ]);
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
      'city_ar' => ['required', 'string', 'max:255'],
      'city_en' => ['required', 'string', 'max:255'],
      'city_de' => ['required', 'string', 'max:255'],
      'price' => ['required', 'numeric', 'min:0'],
    ]);

    // Check for uniqueness in all languages
    $existingOption = DeliveryOption::where(function ($query) use ($validated) {
      $query->whereRaw("JSON_UNQUOTE(JSON_EXTRACT(city, '$.ar')) = ?", [$validated['city_ar']])
            ->orWhereRaw("JSON_UNQUOTE(JSON_EXTRACT(city, '$.en')) = ?", [$validated['city_en']])
            ->orWhereRaw("JSON_UNQUOTE(JSON_EXTRACT(city, '$.de')) = ?", [$validated['city_de']]);
    })->first();

    if ($existingOption) {
      return back()->withErrors(['city_ar' => __('website_response.delivery_option_city_exists')]);
    }

    DeliveryOption::create([
      'city' => [
        'ar' => $validated['city_ar'],
        'en' => $validated['city_en'],
        'de' => $validated['city_de'],
      ],
      'price' => $validated['price'],
    ]);

    return back()
      ->with([
        'title' => __('website_response.delivery_option_created_title'),
        'message' => __('website_response.delivery_option_created_message'),
        'status' => 'success'
      ]);
  }

  public function update(Request $request, DeliveryOption $deliveryOption)
  {
    $validated = $request->validate([
      'city_ar' => ['required', 'string', 'max:255'],
      'city_en' => ['required', 'string', 'max:255'],
      'city_de' => ['required', 'string', 'max:255'],
      'price' => ['required', 'numeric', 'min:0'],
    ]);

    // Check for uniqueness in all languages (excluding current option)
    $existingOption = DeliveryOption::where('id', '!=', $deliveryOption->id)
      ->where(function ($query) use ($validated) {
        $query->whereRaw("JSON_UNQUOTE(JSON_EXTRACT(city, '$.ar')) = ?", [$validated['city_ar']])
              ->orWhereRaw("JSON_UNQUOTE(JSON_EXTRACT(city, '$.en')) = ?", [$validated['city_en']])
              ->orWhereRaw("JSON_UNQUOTE(JSON_EXTRACT(city, '$.de')) = ?", [$validated['city_de']]);
      })->first();

    if ($existingOption) {
      return back()->withErrors(['city_ar' => __('website_response.delivery_option_city_exists')]);
    }

    $deliveryOption->update([
      'city' => [
        'ar' => $validated['city_ar'],
        'en' => $validated['city_en'],
        'de' => $validated['city_de'],
      ],
      'price' => $validated['price'],
    ]);

    return back()
      ->with([
        'title' => __('website_response.delivery_option_updated_title'),
        'message' => __('website_response.delivery_option_updated_message'),
        'status' => 'success'
      ]);
  }

  public function destroy(Request $request, DeliveryOption $deliveryOption)
  {
    $deliveryOption->delete();

    return back()
      ->with([
        'title' => __('website_response.delivery_option_deleted_title'),
        'message' => __('website_response.delivery_option_deleted_message'),
        'status' => 'success'
      ]);
  }

  public function bulkDelete(Request $request)
  {
    $validated = $request->validate([
      'ids' => ['required', 'array'],
      'ids.*' => ['exists:delivery_options,id'],
    ]);

    DeliveryOption::whereIn('id', $validated['ids'])->delete();

    return back()
      ->with([
        'title' => __('website_response.delivery_options_deleted_title'),
        'message' => __('website_response.delivery_options_deleted_message', ['count' => count($validated['ids'])]),
        'status' => 'success'
      ]);
  }

  protected function addRowNumbers($paginatedItems)
  {
    $currentPage = $paginatedItems->currentPage();
    $perPage = $paginatedItems->perPage();
    $startNumber = ($currentPage - 1) * $perPage + 1;

    $paginatedItems->getCollection()->transform(function ($item, $index) use ($startNumber) {
      $item->row_number = $startNumber + $index;
      return $item;
    });

    return $paginatedItems;
  }
}
