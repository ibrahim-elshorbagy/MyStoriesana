<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    public function handle(Request $request, Closure $next): Response
    {
        $locale = $request->cookie('locale');

        if (!$locale) {
            // Detect browser language, default to 'de' if not supported
            $locale = $request->getPreferredLanguage(['en', 'ar', 'de']) ?: 'de';
            // Set cookie for future visits
            $response = $next($request);
            return $response->withCookie(cookie('locale', $locale, 60 * 24 * 365)); // 1 year
        }

        if (in_array($locale, ['en', 'ar', 'de'])) {
            app()->setLocale($locale);
        }

        return $next($request);
    }
}
