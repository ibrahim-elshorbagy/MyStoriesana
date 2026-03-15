<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name'=>'required|string|max:255',
            'username' => 'required|string|max:255|unique:'.User::class.'|regex:/^[^\s]+$/',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'phone' => 'nullable|string|regex:/^\+?[\d\s\-\(\)]+$/|max:20',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ], [
            'name.required' => __('website_response.name_required'),
            'username.required' => __('website_response.username_required'),
            'username.unique' => __('website_response.username_unique'),
            'username.regex' => __('website_response.username_regex'),
            'email.required' => __('website_response.email_required'),
            'email.email' => __('website_response.email_invalid'),
            'email.unique' => __('website_response.email_unique'),
            'phone.max' => __('website_response.phone_invalid'),
            'password.required' => __('website_response.password_required'),
            'password.confirmed' => __('website_response.password_confirmation'),
        ]);

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole('user');
        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
