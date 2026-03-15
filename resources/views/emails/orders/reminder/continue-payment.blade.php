@php
  $locale = $locale ?? app()->getLocale();
  $isRtl = $locale === 'ar';
@endphp

<div style="font-family: Arial, sans-serif; background-color:#f9f9f9; padding:10px; text-align:center;">
  <img src="{{ asset('assets/auth/logo.webp') }}" alt="MyStoryana Logo" width="150"
    style="margin:0 auto 20px auto; width:100%; max-width:400px;" />

  <div
    style="max-width:600px; margin:0 auto; background:#fff; padding:20px; border-radius:12px; box-shadow:0 2px 6px rgba(0,0,0,0.1); text-align:{{ $isRtl ? 'right' : 'left' }};"
    dir="{{ $isRtl ? 'rtl' : 'ltr' }}">
    <h2 style="color:#333;">{{ __('emails.continue_payment_reminder_title', ['id' => $order->id], $locale) }}</h2>
    <p style="color:#555; font-size:16px;">{{ __('emails.continue_payment_reminder_greeting', ['name' => $notifiable->name], $locale) }}</p>
    <p style="color:#555; font-size:15px;">{{ __('emails.continue_payment_reminder_intro', [], $locale) }}</p>

    <div style="background:#f8f9fa; padding:15px; border-radius:8px; margin:20px 0;">
      <strong style="color:#333;">{{ __('emails.continue_payment_reminder_order_id_label', [], $locale) }}:</strong> #{{ $order->id }}<br />
      <strong style="color:#333;">{{ __('emails.continue_payment_reminder_created_at_label', [], $locale) }}:</strong>
      {{ $order->created_at->format('Y-m-d H:i') }}<br />
      <strong style="color:#333;">{{ __('emails.continue_payment_reminder_total_label', [], $locale) }}:</strong>
      {{ number_format((float) $order->total_price, 2) }} EUR
    </div>

    <p style="color:#2d5a2d; font-size:14px;">{{ __('emails.continue_payment_reminder_note', [], $locale) }}</p>

    <div style="text-align:center; margin:20px 0;">
      <a href="{{ route('frontend.order.continuePayment', $order->id) }}"
        style="background:#fa7508; color:#fff; padding:12px 24px; text-decoration:none; border-radius:6px; display:inline-block;">
        {{ __('emails.continue_payment_reminder_button', [], $locale) }}
      </a>
    </div>

    <p style="margin-top:30px; font-size:14px; color:#999;">{{ __('emails.continue_payment_reminder_regards', [], $locale) }}</p>
  </div>

  <p style="margin-top:20px; font-size:12px; color:#aaa;">
    © {{ date('Y') }} MyStoryana. {{ __('emails.all_rights_reserved', [], $locale) }}
    <br />
    <a href="{{ config('app.url') }}" style="color:#555; text-decoration:none;">{{ __('emails.official_website', [], $locale) }}</a> |
    <a href="mailto:support@mystoryana.com" style="color:#555; text-decoration:none;">{{ __('emails.contact_us', [], $locale) }}</a>
  </p>
</div>
