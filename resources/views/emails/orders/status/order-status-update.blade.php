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
    <h2 style="color:#333;">{{ __('emails.order_status_mail_title', ['id' => $order->id], $locale) }}</h2>
    <p style="color:#555; font-size:16px;">{{ __('emails.order_status_mail_greeting', ['name' => $notifiable->name], $locale) }}</p>

    <div style="background:#f8f9fa; padding:15px; border-radius:8px; margin:20px 0;">
      <h3 style="color:#fa7508; margin-top:0;">{{ __('emails.order_status_mail_details_title', [], $locale) }}</h3>
      <strong style="color:#333;">{{ __('emails.order_status_mail_order_id_label', [], $locale) }}:</strong> #{{ $order->id }}<br />
      <strong style="color:#333;">{{ __('emails.order_status_mail_child_label', [], $locale) }}:</strong>
      {{ $firstItem?->child_name ?? '-' }}<br />
      <strong style="color:#333;">{{ __('emails.order_status_mail_new_status_label', [], $locale) }}:</strong>
      <span style="color:#fa7508;">{{ __('emails.order_status_' . $order->status, [], $locale) }}</span><br />
      <strong style="color:#333;">{{ __('emails.order_status_mail_updated_at_label', [], $locale) }}:</strong>
      {{ $order->updated_at->format('Y-m-d H:i') }}
    </div>

    <div style="background:#e8f5e8; padding:15px; border-radius:8px; margin:20px 0;">
      <h4 style="color:#2d5a2d; margin-top:0;">{{ __('emails.order_status_mail_meaning_title', [], $locale) }}</h4>
      <p style="color:#2d5a2d; font-size:14px; margin:5px 0;">
        {{ __('emails.order_status_message_' . $order->status, [], $locale) }}
      </p>
    </div>

    @if (in_array($order->status, ['processing', 'printing', 'completed'], true))
      <div style="text-align:center; margin:20px 0;">
        <a href="{{ route('user.orders.show', $order->id) }}"
          style="background:#fa7508; color:#fff; padding:12px 24px; text-decoration:none; border-radius:6px; display:inline-block;">
          {{ __('emails.order_status_mail_view_order_button', [], $locale) }}
        </a>
      </div>
    @endif

    <p style="color:#777; font-size:14px;">{{ __('emails.order_status_mail_help_text', [], $locale) }}</p>
    <p style="margin-top:30px; font-size:14px; color:#999;">{{ __('emails.order_status_mail_regards', [], $locale) }}</p>
  </div>

  <p style="margin-top:20px; font-size:12px; color:#aaa;">
    © {{ date('Y') }} MyStoriesAi. {{ __('emails.all_rights_reserved', [], $locale) }}
    <br />
    <a href="{{ config('app.url') }}" style="color:#555; text-decoration:none;">{{ __('emails.official_website', [], $locale) }}</a> |
    <a href="mailto:support@mystoriesai.com" style="color:#555; text-decoration:none;">{{ __('emails.contact_us', [], $locale) }}</a>
  </p>
</div>
