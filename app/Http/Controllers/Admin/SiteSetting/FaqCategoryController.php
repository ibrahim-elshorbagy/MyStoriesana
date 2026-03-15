<?php

namespace App\Http\Controllers\Admin\SiteSetting;

use App\Http\Controllers\Controller;
use App\Models\Admin\SiteSetting\FaqCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;

class FaqCategoryController extends Controller
{
  public function index(Request $request)
  {
    $request->validate([
      'name' => ['nullable', 'string', 'max:255'],
      'sort' => ['nullable', 'string', 'in:id,name,created_at,updated_at'],
      'direction' => ['nullable', 'string', 'in:asc,desc'],
      'per_page' => ['nullable', 'integer', 'min:1'],
    ]);

    $sortField = $request->input('sort', 'updated_at');
    $sortDirection = $request->input('direction', 'desc');
    $perPage = $request->input('per_page', 15);

    $query = FaqCategory::query();

    // Filter by name (include German)
    if ($request->filled('name')) {
      $locale = app()->getLocale();
      $query->where(function ($q) use ($request, $locale) {
        $q->where("name->{$locale}", 'like', '%' . $request->name . '%')
          ->orWhere("name->en", 'like', '%' . $request->name . '%')
          ->orWhere("name->de", 'like', '%' . $request->name . '%');
      });
    }

    $categories = $query->orderBy($sortField, $sortDirection)
      ->paginate($perPage)
      ->withQueryString();

    // Add row numbers
    $categories = $this->addRowNumbers($categories);

    return inertia('Admin/SiteSetting/FaqCategories/FaqCategories', [
      'categories' => $categories,
      'queryParams' => $request->query() ?: null,
    ]);
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
      'name_ar' => ['required', 'string', 'max:255'],
      'name_en' => ['required', 'string', 'max:255'],
      'name_de' => ['required', 'string', 'max:255'],
    ]);

    // Check for uniqueness in both languages
    $existingCategory = FaqCategory::where(function ($query) use ($validated) {
      $query->where('name->ar', $validated['name_ar'])
            ->orWhere('name->en', $validated['name_en'])
            ->orWhere('name->de', $validated['name_de']);
    })->first();

    if ($existingCategory) {
      return back()->withErrors(['name' => __('website_response.faq_category_name_exists')]);
    }

    FaqCategory::create([
      'name' => [
        'ar' => $validated['name_ar'],
        'en' => $validated['name_en'],
        'de' => $validated['name_de'],
      ],
    ]);

    return back()
      ->with('title', __('website_response.faq_category_created_title'))
      ->with('message', __('website_response.faq_category_created_message'))
      ->with('status', 'success');
  }

  public function update(Request $request, FaqCategory $faqCategory)
  {
    $validated = $request->validate([
      'name_ar' => ['required', 'string', 'max:255'],
      'name_en' => ['required', 'string', 'max:255'],
      'name_de' => ['required', 'string', 'max:255'],
    ]);

    // Check for uniqueness in both languages (excluding current category)
    $existingCategory = FaqCategory::where('id', '!=', $faqCategory->id)
      ->where(function ($query) use ($validated) {
        $query->where('name->ar', $validated['name_ar'])
              ->orWhere('name->en', $validated['name_en'])
              ->orWhere('name->de', $validated['name_de']);
      })->first();

    if ($existingCategory) {
      return back()->withErrors(['name' => __('website_response.faq_category_name_exists')]);
    }

    $faqCategory->update([
      'name' => [
        'ar' => $validated['name_ar'],
        'en' => $validated['name_en'],
        'de' => $validated['name_de'],
      ],
    ]);

    return back()
      ->with('title', __('website_response.faq_category_updated_title'))
      ->with('message', __('website_response.faq_category_updated_message'))
      ->with('status', 'success');
  }

  public function destroy(Request $request, FaqCategory $faqCategory)
  {
    // Check if category has associated faqs
    if ($faqCategory->faqs()->count() > 0) {
      return back()
        ->with('title', __('website_response.faq_category_delete_failed_title'))
        ->with('message', __('website_response.faq_category_delete_failed_message'))
        ->with('status', 'error');
    }

    $faqCategory->delete();

    return back()
      ->with('title', __('website_response.faq_category_deleted_title'))
      ->with('message', __('website_response.faq_category_deleted_message'))
      ->with('status', 'success');
  }

  public function bulkDelete(Request $request)
  {
    $validated = $request->validate([
      'ids' => ['required', 'array'],
      'ids.*' => ['exists:faq_categories,id'],
    ]);

    // Check if any categories have associated faqs
    $categoriesWithFaqs = FaqCategory::whereIn('id', $validated['ids'])
      ->whereHas('faqs')
      ->count();

    if ($categoriesWithFaqs > 0) {
      return back()
        ->with('title', __('website_response.faq_categories_bulk_delete_failed_title'))
        ->with('message', __('website_response.faq_categories_bulk_delete_failed_message'))
        ->with('status', 'error');
    }

    FaqCategory::whereIn('id', $validated['ids'])->delete();

    return back()
      ->with('title', __('website_response.faq_categories_deleted_title'))
      ->with('message', __('website_response.faq_categories_deleted_message', ['count' => count($validated['ids'])]))
      ->with('status', 'success');
  }
}
