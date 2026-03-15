<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Admin\Story\Story;
use App\Models\Admin\Story\Category\AgeCategory;
use Illuminate\Http\Request;

class StoryController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'search' => ['nullable', 'string', 'max:255'],
            'gender' => ['nullable', 'in:0,1'],
            'category_id' => ['nullable', 'exists:age_categories,id'],
            'sort' => ['nullable', 'in:name_asc,name_desc'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:50'],
        ]);

        $query = Story::with('category')->where('status', 'published');

        // Search by title (include German)
        if ($request->filled('search')) {
            $locale = app()->getLocale();
            $query->where(function ($q) use ($request, $locale) {
                $q->where("title->{$locale}", 'like', '%' . $request->search . '%')
                  ->orWhere('title->en', 'like', '%' . $request->search . '%')
                  ->orWhere('title->de', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by gender
        if ($request->filled('gender')) {
            $query->where('gender', $request->gender);
        }

        // Filter by category
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Sorting
        $sortField = 'updated_at';
        $sortDirection = 'desc';
        if ($request->sort === 'name_asc') {
            $sortField = 'title->en';
            $sortDirection = 'asc';
        } elseif ($request->sort === 'name_desc') {
            $sortField = 'title->en';
            $sortDirection = 'desc';
        }

        $perPage = $request->input('per_page', 12);
        $stories = $query->orderBy($sortField, $sortDirection)->paginate($perPage);

        $categories = AgeCategory::all();

        return inertia('Frontend/Story/Stories', [
            'stories' => $stories,
            'categories' => $categories,
            'queryParams' => $request->query(),
        ]);
    }

    public function show(Story $story)
    {
        if ($story->status !== 'published') {
            abort(404);
        }

        return inertia('Frontend/Story/SingleStory', [
            'story' => $story->load('category'),
        ]);
    }
}
