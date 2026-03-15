<?php

namespace App\Http\Controllers\Admin\Story\Category;


use App\Http\Controllers\Controller;
use App\Models\Admin\Story\Category\AgeCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AgeCategoryController extends Controller
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

    $query = AgeCategory::query();

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

    return inertia('Admin/Story/AgeCategory/AgeCategory', [
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
      'image' => ['required', 'image', 'mimes:jpeg,png,jpg,gif'],
    ]);

    // Check for uniqueness in all languages
    $existingCategory = AgeCategory::where(function ($query) use ($validated) {
      $query->where('name->ar', $validated['name_ar'])
            ->orWhere('name->en', $validated['name_en'])
            ->orWhere('name->de', $validated['name_de']);
    })->first();

    if ($existingCategory) {
      return back()->withErrors(['name' => __('website_response.age_category_name_exists')]);
    }

    $imagePath = null;
    if ($request->hasFile('image')) {
      $imagePath = $request->file('image')->store('age_categories', 'public');
    }

    AgeCategory::create([
      'name' => [
        'ar' => $validated['name_ar'],
        'en' => $validated['name_en'],
        'de' => $validated['name_de'],
      ],
      'image' => $imagePath,
    ]);

    return back()
      ->with('title', __('website_response.age_category_created_title'))
      ->with('message', __('website_response.age_category_created_message'))
      ->with('status', 'success');
  }

  public function update(Request $request, AgeCategory $ageCategory)
  {
    $validated = $request->validate([
      'name_ar' => ['required', 'string', 'max:255'],
      'name_en' => ['required', 'string', 'max:255'],
      'name_de' => ['required', 'string', 'max:255'],
      'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif'],
    ]);

    // Check for uniqueness in all languages (excluding current category)
    $existingCategory = AgeCategory::where('id', '!=', $ageCategory->id)
      ->where(function ($query) use ($validated) {
        $query->where('name->ar', $validated['name_ar'])
              ->orWhere('name->en', $validated['name_en'])
              ->orWhere('name->de', $validated['name_de']);
      })->first();

    if ($existingCategory) {
      return back()->withErrors(['name' => __('website_response.age_category_name_exists')]);
    }

    $imagePath = $ageCategory->image;
    if ($request->hasFile('image')) {
      // Delete old image
      if ($ageCategory->image) {
        Storage::disk('public')->delete($ageCategory->image);
      }
      $imagePath = $request->file('image')->store('age_categories', 'public');
    }

    $ageCategory->update([
      'name' => [
        'ar' => $validated['name_ar'],
        'en' => $validated['name_en'],
        'de' => $validated['name_de'],
      ],
      'image' => $imagePath,
    ]);

    return back()
      ->with('title', __('website_response.age_category_updated_title'))
      ->with('message', __('website_response.age_category_updated_message'))
      ->with('status', 'success');
  }

  public function destroy(Request $request, AgeCategory $ageCategory)
  {
    // Delete image if exists
    if ($ageCategory->image) {
      Storage::disk('public')->delete($ageCategory->image);
    }

    $ageCategory->delete();

    return back()
      ->with('title', __('website_response.age_category_deleted_title'))
      ->with('message', __('website_response.age_category_deleted_message'))
      ->with('status', 'success');
  }

  public function bulkDelete(Request $request)
  {
    $validated = $request->validate([
      'ids' => ['required', 'array'],
      'ids.*' => ['exists:age_categories,id'],
    ]);

    $categories = AgeCategory::whereIn('id', $validated['ids'])->get();

    // Delete images
    foreach ($categories as $category) {
      if ($category->image) {
        Storage::disk('public')->delete($category->image);
      }
    }

    AgeCategory::whereIn('id', $validated['ids'])->delete();

    return back()
      ->with('title', __('website_response.age_categories_deleted_title'))
      ->with('message', __('website_response.age_categories_deleted_message', ['count' => count($validated['ids'])]))
      ->with('status', 'success');
  }


}
