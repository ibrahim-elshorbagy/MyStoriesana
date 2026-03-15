<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Admin\SiteSetting\StaticPage;
use Illuminate\Http\Request;

class UserController extends Controller
{
  public function staticPage($id)
  {
    $page = StaticPage::findOrFail($id);

    // Check if page is published
    if ($page->status !== 'published') {
      abort(404);
    }

    return inertia('Frontend/StaticPage/Index', [
      'page' => $page,
    ]);
  }
}
