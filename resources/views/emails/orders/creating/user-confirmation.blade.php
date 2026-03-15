@php
  $locale = $locale ?? app()->getLocale();
  $isRtl = $locale === 'ar';
@endphp

<div style="font-family: Arial, sans-serif; background-color:#f9f9f9; padding:10px; text-align:center;">
  <img src="{{ asset('assets/auth/logo.png') }}" alt="MyStoriesAi Logo" width="150"
    style="margin:0 auto 20px auto; width:100%; max-width:400px;" />

  <div
    style="max-width:600px; margin:0 auto; background:#fff; padding:20px; border-radius:12px; box-shadow:0 2px 6px rgba(0,0,0,0.1); text-align:{{ $isRtl ? 'right' : 'left' }};"
    dir="{{ $isRtl ? 'rtl' : 'ltr' }}">
    <h2 style="color:#333;">{{ __('emails.order_confirmation_title', ['name' => $notifiable->name], $locale) }}</h2>
    <p style="color:#555; font-size:16px;">{{ __('emails.order_confirmation_intro', [], $locale) }}</p>

    <div style="background:#f8f9fa; padding:15px; border-radius:8px; margin:20px 0;">
      <h3 style="color:#fa7508; margin-top:0;">{{ __('emails.order_confirmation_details_title', [], $locale) }}</h3>
      <strong style="color:#333;">{{ __('emails.order_confirmation_order_id_label', [], $locale) }}:</strong> #{{ $order->id }}<br />
      <strong style="color:#333;">{{ __('emails.order_confirmation_stories_count_label', [], $locale) }}:</strong>
      {{ $order->orderItems->count() }}<br />
      <strong style="color:#333;">{{ __('emails.order_confirmation_price_before_label', [], $locale) }}:</strong>
      {{ number_format((float) $order->subtotal + (float) $order->delivery_total, 2) }} EUR<br />
      <strong style="color:#333;">{{ __('emails.order_confirmation_discount_label', [], $locale) }}:</strong>
      -{{ number_format((float) $order->discount_value, 2) }} EUR<br />
      <strong style="color:#333;">{{ __('emails.order_confirmation_total_label', [], $locale) }}:</strong>
      {{ number_format((float) $order->total_price, 2) }} EUR<br />
      <strong style="color:#333;">{{ __('emails.order_confirmation_payment_method_label', [], $locale) }}:</strong>
      {{ __('emails.payment_method_' . $order->payment_method, [], $locale) }}
      <br /><br />

      <strong style="color:#333;">{{ __('emails.order_confirmation_story_details_label', [], $locale) }}:</strong><br />
      @foreach ($order->orderItems as $item)
        @php
          $normalizedLanguage = match ($item->language) {
              'ar', 'arabic' => 'arabic',
              'de', 'german', 'deutsch' => 'german',
              default => 'english',
          };
        @endphp
        <div style="background:#fff; padding:10px; margin:5px 0; border-radius:5px; border-left:3px solid #fa7508;">
          <strong>{{ __('emails.order_confirmation_story_child_label', [], $locale) }}:</strong>
          {{ $item->child_name }} ({{ $item->child_age }} {{ __('emails.years_old', [], $locale) }})<br />
          <strong>{{ __('emails.order_confirmation_story_language_label', [], $locale) }}:</strong>
          {{ __('emails.language_' . $normalizedLanguage, [], $locale) }}<br />
          <strong>{{ __('emails.order_confirmation_story_format_label', [], $locale) }}:</strong>
          {{ __('emails.plan_' . $item->format, [], $locale) }}<br />
          <strong>{{ __('emails.order_confirmation_story_price_label', [], $locale) }}:</strong>
          {{ number_format((float) $item->story_price, 2) }} EUR
        </div>
      @endforeach
    </div>

    <div style="background:#e8f5e8; padding:15px; border-radius:8px; margin:20px 0;">
      <h4 style="color:#2d5a2d; margin-top:0;">{{ __('emails.order_confirmation_next_steps_title', [], $locale) }}</h4>
      <p style="color:#2d5a2d; font-size:14px; margin:5px 0;">
        {{ __('emails.order_confirmation_next_step_1', [], $locale) }}<br />
        {{ __('emails.order_confirmation_next_step_2', [], $locale) }}<br />
        {{ __('emails.order_confirmation_next_step_3', [], $locale) }}
      </p>
    </div>

    <div style="text-align:center; margin:20px 0;">
      <a href="{{ route('user.orders.show', $order->id) }}"
        style="background:#fa7508; color:#fff; padding:15px 30px; text-decoration:none; border-radius:8px; display:inline-block;">
        {{ __('emails.order_confirmation_view_order_button', [], $locale) }}
      </a>
    </div>

    <p style="color:#777; font-size:14px;">{{ __('emails.order_confirmation_help_text', [], $locale) }}</p>
    <p style="margin-top:30px; font-size:14px; color:#999;">{{ __('emails.order_confirmation_regards', [], $locale) }}</p>
  </div>

  <p style="margin-top:20px; font-size:12px; color:#aaa;">
    © {{ date('Y') }} MyStoriesAi. {{ __('emails.all_rights_reserved', [], $locale) }}
    <br />
    <a href="{{ config('app.url') }}" style="color:#555; text-decoration:none;">{{ __('emails.official_website', [], $locale) }}</a> |
    <a href="mailto:support@mystoriesai.com" style="color:#555; text-decoration:none;">{{ __('emails.contact_us', [], $locale) }}</a>
  </p>
</div>
