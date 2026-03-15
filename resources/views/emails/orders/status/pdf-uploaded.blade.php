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
    <h2 style="color:#333;">{{ __('emails.pdf_uploaded_mail_title', ['id' => $order->id], $locale) }}</h2>
    <p style="color:#555; font-size:16px;">{{ __('emails.pdf_uploaded_mail_greeting', ['name' => $notifiable->name], $locale) }}</p>

    <div style="background:#f8f9fa; padding:15px; border-radius:8px; margin:20px 0;">
      <h3 style="color:#fa7508; margin-top:0;">{{ __('emails.pdf_uploaded_mail_details_title', [], $locale) }}</h3>
      <strong style="color:#333;">{{ __('emails.pdf_uploaded_mail_order_id_label', [], $locale) }}:</strong> #{{ $order->id }}<br />
      <strong style="color:#333;">{{ __('emails.pdf_uploaded_mail_child_label', [], $locale) }}:</strong> {{ $orderItem->child_name }}<br />
      <strong style="color:#333;">{{ __('emails.pdf_uploaded_mail_child_age_label', [], $locale) }}:</strong>
      {{ $orderItem->child_age }} {{ __('emails.years_old', [], $locale) }}<br />
      <strong style="color:#333;">{{ __('emails.pdf_uploaded_mail_plan_label', [], $locale) }}:</strong>
      {{ __('emails.plan_' . $orderItem->format, [], $locale) }}<br />
      <strong style="color:#333;">{{ __('emails.pdf_uploaded_mail_ready_at_label', [], $locale) }}:</strong>
      {{ $orderItem->updated_at->format('Y-m-d H:i') }}
    </div>

    <div style="background:#e8f5e8; padding:15px; border-radius:8px; margin:20px 0;">
      <h4 style="color:#2d5a2d; margin-top:0;">{{ __('emails.pdf_uploaded_mail_congrats_title', [], $locale) }}</h4>
      <p style="color:#2d5a2d; font-size:14px; margin:5px 0;">{{ __('emails.pdf_uploaded_mail_congrats_text', [], $locale) }}</p>
      <p style="color:#2d5a2d; font-size:14px; margin:5px 0;">{{ __('emails.pdf_uploaded_mail_you_can_now', [], $locale) }}</p>
      <ul style="color:#2d5a2d; font-size:14px; margin:5px 0; {{ $isRtl ? 'padding-right:20px;' : 'padding-left:20px;' }}">
        <li>{{ __('emails.pdf_uploaded_mail_action_1', [], $locale) }}</li>
        <li>{{ __('emails.pdf_uploaded_mail_action_2', [], $locale) }}</li>
        <li>{{ __('emails.pdf_uploaded_mail_action_3', [], $locale) }}</li>
      </ul>
    </div>

    <div style="text-align:center; margin:20px 0;">
      <a href="{{ config('app.url') }}/storage/{{ $orderItem->pdf_path }}"
        style="background:#fa7508; color:#fff; padding:12px 24px; text-decoration:none; border-radius:6px; display:inline-block; margin:5px;">
        {{ __('emails.pdf_uploaded_mail_download_button', [], $locale) }}
      </a>
      <br />
      <a href="{{ route('user.orders.show', $order->id) }}"
        style="background:#007bff; color:#fff; padding:12px 24px; text-decoration:none; border-radius:6px; display:inline-block; margin:5px;">
        {{ __('emails.pdf_uploaded_mail_view_order_button', [], $locale) }}
      </a>
    </div>

    <p style="color:#777; font-size:14px;">{{ __('emails.pdf_uploaded_mail_help_text', [], $locale) }}</p>
    <p style="margin-top:30px; font-size:14px; color:#999;">{{ __('emails.pdf_uploaded_mail_regards', [], $locale) }}</p>
  </div>

  <p style="margin-top:20px; font-size:12px; color:#aaa;">
    © {{ date('Y') }} MyStoryana. {{ __('emails.all_rights_reserved', [], $locale) }}
    <br />
    <a href="{{ config('app.url') }}" style="color:#555; text-decoration:none;">{{ __('emails.official_website', [], $locale) }}</a> |
    <a href="mailto:support@mystoryana.com" style="color:#555; text-decoration:none;">{{ __('emails.contact_us', [], $locale) }}</a>
  </p>
</div>
