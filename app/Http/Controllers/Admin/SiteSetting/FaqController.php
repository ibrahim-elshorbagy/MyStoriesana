<?php

namespace App\Http\Controllers\Admin\SiteSetting;

use App\Http\Controllers\Controller;
use App\Models\Admin\SiteSetting\Faq;
use App\Models\Admin\SiteSetting\FaqCategory;
use Illuminate\Http\Request;

class FaqController extends Controller
{
  public function index(Request $request)
  {
    $request->validate([
      'question' => ['nullable', 'string', 'max:255'],
      'sort' => ['nullable', 'string', 'in:id,updated_at'],
      'direction' => ['nullable', 'string', 'in:asc,desc'],
      'per_page' => ['nullable', 'integer', 'min:1'],
    ]);

    $sortField = $request->input('sort', 'updated_at');
    $sortDirection = $request->input('direction', 'desc');
    $perPage = $request->input('per_page', 15);

    $query = Faq::query();

    // Filter by question (include German)
    if ($request->filled('question')) {
      $locale = app()->getLocale();
      $query->where(function ($q) use ($request, $locale) {
        $q->where("question->{$locale}", 'like', '%' . $request->question . '%')
          ->orWhere("question->en", 'like', '%' . $request->question . '%')
          ->orWhere("question->de", 'like', '%' . $request->question . '%');
      });
    }

    $faqs = $query->with('category')->orderBy($sortField, $sortDirection)
      ->paginate($perPage)
      ->withQueryString();

    // Add row numbers
    $faqs = $this->addRowNumbers($faqs);

    return inertia('Admin/SiteSetting/FAQ/Faq', [
      'faqs' => $faqs,
      'queryParams' => $request->query() ?: null,
    ]);
  }

  public function create()
  {
    $categories = FaqCategory::all();

    return inertia('Admin/SiteSetting/FAQ/Partials/Pages/CreateFAQ', [
      'categories' => $categories,
    ]);
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
      'question_ar' => ['required', 'string', 'max:255'],
      'question_en' => ['required', 'string', 'max:255'],
      'question_de' => ['nullable', 'string', 'max:255'],
      'answer_ar' => ['required', 'string'],
      'answer_en' => ['required', 'string'],
      'answer_de' => ['nullable', 'string'],
      'category_id' => ['required', 'exists:faq_categories,id'],
    ]);

    $questionData = [
      'ar' => $validated['question_ar'],
      'en' => $validated['question_en'],
    ];
    if (!empty($validated['question_de'])) {
      $questionData['de'] = $validated['question_de'];
    }

    $answerData = [
      'ar' => $validated['answer_ar'],
      'en' => $validated['answer_en'],
    ];
    if (!empty($validated['answer_de'])) {
      $answerData['de'] = $validated['answer_de'];
    }

    Faq::create([
      'question' => $questionData,
      'answer' => $answerData,
      'category_id' => $validated['category_id'],
    ]);

    return redirect()->route('admin.faq.index')
      ->with('title', __('website_response.faq_created_title'))
      ->with('message', __('website_response.faq_created_message'))
      ->with('status', 'success');
  }

  public function edit(Faq $faq)
  {
    $categories = FaqCategory::all();

    return inertia('Admin/SiteSetting/FAQ/Partials/Pages/EditFAQ', [
      'faq' => $faq,
      'categories' => $categories,
    ]);
  }

  public function update(Request $request, Faq $faq)
  {
    $validated = $request->validate([
      'question_ar' => ['required', 'string', 'max:255'],
      'question_en' => ['required', 'string', 'max:255'],
      'question_de' => ['nullable', 'string', 'max:255'],
      'answer_ar' => ['required', 'string'],
      'answer_en' => ['required', 'string'],
      'answer_de' => ['nullable', 'string'],
      'category_id' => ['required', 'exists:faq_categories,id'],
    ]);

    $questionData = [
      'ar' => $validated['question_ar'],
      'en' => $validated['question_en'],
    ];
    if (!empty($validated['question_de'])) {
      $questionData['de'] = $validated['question_de'];
    }

    $answerData = [
      'ar' => $validated['answer_ar'],
      'en' => $validated['answer_en'],
    ];
    if (!empty($validated['answer_de'])) {
      $answerData['de'] = $validated['answer_de'];
    }

    $faq->update([
      'question' => $questionData,
      'answer' => $answerData,
      'category_id' => $validated['category_id'],
    ]);

    return back()
      ->with('title', __('website_response.faq_updated_title'))
      ->with('message', __('website_response.faq_updated_message'))
      ->with('status', 'success');
  }

  public function destroy(Request $request, Faq $faq)
  {
    $faq->delete();

    return back()
      ->with('title', __('website_response.faq_deleted_title'))
      ->with('message', __('website_response.faq_deleted_message'))
      ->with('status', 'warning');
  }

  public function bulkDelete(Request $request)
  {
    $validated = $request->validate([
      'ids' => ['required', 'array'],
      'ids.*' => ['required', 'integer', 'exists:faqs,id'],
    ]);

    Faq::whereIn('id', $validated['ids'])->delete();

    return back()
      ->with('title', __('website_response.faqs_deleted_title'))
      ->with('message', __('website_response.faqs_deleted_message', ['count' => count($validated['ids'])]))
      ->with('status', 'warning');
  }

  public function toggleShowInHome(Faq $faq)
  {
    $faq->update([
      'show_in_home' => !$faq->show_in_home,
    ]);

    return back()
      ->with('title', __('website_response.faq_toggle_title'))
      ->with('message', __('website_response.faq_toggle_message', ['status' => $faq->show_in_home ? __('website_response.show') : __('website_response.hide')]))
      ->with('status', 'success');
  }

  public function bulkToggleShowInHome(Request $request)
  {
    $validated = $request->validate([
      'ids' => ['required', 'array'],
      'ids.*' => ['required', 'integer', 'exists:faqs,id'],
      'show_in_home' => ['required', 'boolean'],
    ]);

    Faq::whereIn('id', $validated['ids'])->update([
      'show_in_home' => $validated['show_in_home'],
    ]);

    return back()
      ->with('title', __('website_response.faqs_bulk_toggle_title'))
      ->with('message', __('website_response.faqs_bulk_toggle_message', [
        'count' => count($validated['ids']),
        'status' => $validated['show_in_home'] ? __('website_response.show') : __('website_response.hide')
      ]))
      ->with('status', 'success');
  }
}
