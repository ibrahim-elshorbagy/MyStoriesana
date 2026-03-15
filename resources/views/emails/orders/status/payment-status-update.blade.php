@php
  $locale = $locale ?? app()->getLocale();
  $isRtl = $locale === 'ar';
  $firstItem = $order->orderItems->first();
@endphp

<div style="font-family: Arial, sans-serif; background-color:#f9f9f9; padding:10px; text-align:center;">
  <img src="{{ asset('assets/auth/logo.png') }}" alt="MyStoriesAi Logo" width="150"
    style="margin:0 auto 20px auto; width:100%; max-width:400px;" />

  <div
    style="max-width:600px; margin:0 auto; background:#fff; padding:20px; border-radius:12px; box-shadow:0 2px 6px rgba(0,0,0,0.1); text-align:{{ $isRtl ? 'right' : 'left' }};"
    dir="{{ $isRtl ? 'rtl' : 'ltr' }}">
    <h2 style="color:#333;">{{ __('emails.payment_status_mail_title', ['id' => $order->id], $locale) }}</h2>
    <p style="color:#555; font-size:16px;">{{ __('emails.payment_status_mail_greeting', ['name' => $notifiable->name], $locale) }}</p>

    <div style="background:#f8f9fa; padding:15px; border-radius:8px; margin:20px 0;">
      <h3 style="color:#fa7508; margin-top:0;">{{ __('emails.payment_status_mail_details_title', [], $locale) }}</h3>
      <strong style="color:#333;">{{ __('emails.payment_status_mail_order_id_label', [], $locale) }}:</strong> #{{ $order->id }}<br />
      <strong style="color:#333;">{{ __('emails.payment_status_mail_child_label', [], $locale) }}:</strong>
      {{ $firstItem?->child_name ?? '-' }}<br />
      <strong style="color:#333;">{{ __('emails.payment_status_mail_method_label', [], $locale) }}:</strong>
      {{ __('emails.payment_method_' . $payment->payment_method, [], $locale) }}<br />
      <strong style="color:#333;">{{ __('emails.payment_status_mail_amount_label', [], $locale) }}:</strong>
      {{ number_format((float) $payment->amount, 2) }} EUR<br />
      <strong style="color:#333;">{{ __('emails.payment_status_mail_status_label', [], $locale) }}:</strong>
      {{ __('emails.payment_status_' . $payment->status, [], $locale) }}
    </div>

    <div style="background:#e8f5e8; padding:15px; border-radius:8px; margin:20px 0;">
      <h4 style="color:#2d5a2d; margin-top:0;">{{ __('emails.payment_status_mail_meaning_title', [], $locale) }}</h4>
      <p style="color:#2d5a2d; font-size:14px; margin:5px 0;">
        {{ __('emails.payment_status_message_' . $payment->status, [], $locale) }}
      </p>
    </div>

    <p style="color:#777; font-size:14px;">{{ __('emails.payment_status_mail_help_text', [], $locale) }}</p>
    <p style="margin-top:30px; font-size:14px; color:#999;">{{ __('emails.payment_status_mail_regards', [], $locale) }}</p>
  </div>

  <p style="margin-top:20px; font-size:12px; color:#aaa;">
    © {{ date('Y') }} MyStoriesAi. {{ __('emails.all_rights_reserved', [], $locale) }}
    <br />
    <a href="{{ config('app.url') }}" style="color:#555; text-decoration:none;">{{ __('emails.official_website', [], $locale) }}</a> |
    <a href="mailto:support@mystoriesai.com" style="color:#555; text-decoration:none;">{{ __('emails.contact_us', [], $locale) }}</a>
  </p>
</div>
