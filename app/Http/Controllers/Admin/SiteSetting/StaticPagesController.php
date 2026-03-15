<?php

namespace App\Http\Controllers\Admin\SiteSetting;

use App\Http\Controllers\Controller;
use App\Models\Admin\SiteSetting\StaticPage;
use App\Models\Admin\SiteSetting\StaticPageCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class StaticPagesController extends Controller
{
  public function index(Request $request)
  {
    $request->validate([
      'title' => ['nullable', 'string', 'max:255'],
      'status' => ['nullable', 'string', 'in:draft,published,archived'],
      'sort' => ['nullable', 'string', 'in:id,status,updated_at'],
      'direction' => ['nullable', 'string', 'in:asc,desc'],
      'per_page' => ['nullable', 'integer', 'min:1'],
    ]);

    $sortField = $request->input('sort', 'updated_at');
    $sortDirection = $request->input('direction', 'desc');
    $perPage = $request->input('per_page', 15);

    $query = StaticPage::query();

    // Filter by title (include German)
    if ($request->filled('title')) {
      $locale = app()->getLocale();
      $query->where(function ($q) use ($request, $locale) {
        $q->where("title->{$locale}", 'like', '%' . $request->title . '%')
          ->orWhere("title->en", 'like', '%' . $request->title . '%')
          ->orWhere("title->de", 'like', '%' . $request->title . '%');
      });
    }

    // Filter by status
    if ($request->filled('status')) {
      $query->where('status', $request->status);
    }

    $pages = $query->orderBy($sortField, $sortDirection)
      ->paginate($perPage)
      ->withQueryString();

    // Add row numbers
    $pages = $this->addRowNumbers($pages);

    return inertia('Admin/SiteSetting/StaticPages/StaticPages', [
      'pages' => $pages,
      'queryParams' => $request->query() ?: null,
    ]);
  }

  public function create()
  {
    $categories = StaticPageCategory::all();

    return inertia('Admin/SiteSetting/StaticPages/Partials/Pages/CreateStaticPage', [
      'categories' => $categories,
    ]);
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
      'title_ar' => ['required', 'string', 'max:255'],
      'title_en' => ['required', 'string', 'max:255'],
      'title_de' => ['required', 'string', 'max:255'],
      'content_ar' => ['required', 'string'],
      'content_en' => ['required', 'string'],
      'content_de' => ['required', 'string'],
      'category_id' => ['required', 'exists:static_page_categories,id'],
      'status' => ['required', 'in:draft,published,archived'],
    ]);

    StaticPage::create([
      'title' => [
        'ar' => $validated['title_ar'],
        'en' => $validated['title_en'],
        'de' => $validated['title_de'],
      ],
      'content' => [
        'ar' => $validated['content_ar'],
        'en' => $validated['content_en'],
        'de' => $validated['content_de'],
      ],
      'category_id' => $validated['category_id'],
      'status' => $validated['status'],
    ]);
    Cache::forget('footer_data'); // Clear footer cache


    return redirect()->route('admin.static-pages.index')
      ->with('title', __('website_response.page_created_title'))
      ->with('message', __('website_response.page_created_message'))
      ->with('status', 'success');
  }

  public function edit(StaticPage $staticPage)
  {
    $categories = StaticPageCategory::all();

    return inertia('Admin/SiteSetting/StaticPages/Partials/Pages/EditStaticPage', [
      'page' => $staticPage,
      'categories' => $categories,
    ]);
  }

  public function update(Request $request, StaticPage $staticPage)
  {
    $validated = $request->validate([
      'title_ar' => ['required', 'string', 'max:255'],
      'title_en' => ['required', 'string', 'max:255'],
      'title_de' => ['required', 'string', 'max:255'],
      'content_ar' => ['required', 'string'],
      'content_en' => ['required', 'string'],
      'content_de' => ['required', 'string'],
      'category_id' => ['required', 'exists:static_page_categories,id'],
      'status' => ['required', 'in:draft,published,archived'],
    ]);

    $staticPage->update([
      'title' => [
        'ar' => $validated['title_ar'],
        'en' => $validated['title_en'],
        'de' => $validated['title_de'],
      ],
      'content' => [
        'ar' => $validated['content_ar'],
        'en' => $validated['content_en'],
        'de' => $validated['content_de'],
      ],
      'category_id' => $validated['category_id'],
      'status' => $validated['status'],
    ]);

    Cache::forget('footer_data'); // Clear footer cache

    return back()
      ->with('title', __('website_response.page_updated_title'))
      ->with('message', __('website_response.page_updated_message'))
      ->with('status', 'success');
  }

  public function destroy(StaticPage $staticPage)
  {
    $staticPage->delete();

    return back()
      ->with('title', __('website_response.page_deleted_title'))
      ->with('message', __('website_response.page_deleted_message'))
      ->with('status', 'success');
  }

  // Bulk actions
  public function bulkPublish(Request $request)
  {
    $validated = $request->validate([
      'ids' => ['required', 'array'],
      'ids.*' => ['exists:static_pages,id'],
    ]);

    StaticPage::whereIn('id', $validated['ids'])->update(['status' => 'published']);

    return back()
      ->with('title', __('website_response.pages_published_title'))
      ->with('message', __('website_response.pages_published_message'))
      ->with('status', 'success');
  }

  public function bulkArchive(Request $request)
  {
    $validated = $request->validate([
      'ids' => ['required', 'array'],
      'ids.*' => ['exists:static_pages,id'],
    ]);

    StaticPage::whereIn('id', $validated['ids'])->update(['status' => 'archived']);

    return back()
      ->with('title', __('website_response.pages_archived_title'))
      ->with('message', __('website_response.pages_archived_message'))
      ->with('status', 'success');
  }

  public function bulkDelete(Request $request)
  {
    $validated = $request->validate([
      'ids' => ['required', 'array'],
      'ids.*' => ['exists:static_pages,id'],
    ]);

    StaticPage::whereIn('id', $validated['ids'])->delete();

    return back()
      ->with('title', __('website_response.pages_deleted_title'))
      ->with('message', __('website_response.pages_deleted_message'))
      ->with('status', 'success');
  }

}
