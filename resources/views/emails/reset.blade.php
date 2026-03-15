@php
  $locale = $locale ?? app()->getLocale();
  $isRtl = $locale === 'ar';
@endphp

<div style="font-family: Arial, sans-serif; background-color:#f9f9f9; padding:10px; text-align:center;">
  <img src="{{ asset('assets/auth/logo.webp') }}" alt="MyStoryana Logo" width="150"
    style="margin:0 auto 20px auto; width:100%; max-width:400px;" />

  <div
    style="max-width:600px; margin:0 auto; background:#fff; padding:10px; border-radius:12px; box-shadow:0 2px 6px rgba(0,0,0,0.1); text-align:{{ $isRtl ? 'right' : 'left' }};"
    dir="{{ $isRtl ? 'rtl' : 'ltr' }}">
    <h2 style="color:#333;">{{ __('emails.password_reset_greeting', ['name' => $notifiable->name], $locale) }}</h2>
    <p style="color:#555; font-size:16px;">{{ __('emails.password_reset_intro', [], $locale) }}</p>

    <div style="text-align:center; margin:20px 0;">
      <a href="{{ $resetUrl }}"
        style="background:#fa7508; color:#fff; padding:15px 30px; text-decoration:none; border-radius:8px; display:inline-block;">
        {{ __('emails.password_reset_button', [], $locale) }}
      </a>
    </div>

    <p style="color:#777; font-size:14px;">{{ __('emails.password_reset_outro', [], $locale) }}</p>
    <p style="margin-top:30px; font-size:14px; color:#999;">{{ __('emails.password_reset_regards', [], $locale) }}</p>
  </div>

  <p style="margin-top:20px; font-size:12px; color:#aaa;">
    © {{ date('Y') }} MyStoryana. {{ __('emails.all_rights_reserved', [], $locale) }}
    <br />
    <a href="{{ config('app.url') }}" style="color:#555; text-decoration:none;">{{ __('emails.official_website', [], $locale) }}</a>
    |
    <a href="mailto:support@mystoryana.com" style="color:#555; text-decoration:none;">{{ __('emails.contact_us', [], $locale) }}</a>
  </p>
</div>
