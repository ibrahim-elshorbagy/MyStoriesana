<?php

namespace App\Services\Order;

use App\Models\Order\Order;
use App\Notifications\Orders\Reminder\ContinuePaymentReminder;

class ContinuePaymentReminderService
{
  public function sendPendingPaymentReminders(): void
  {
    Order::query()
      ->with(['user', 'orderItems'])
      ->whereNull('payment_reminder_sent_at')
      ->where('status', 'pending')
      ->where('created_at', '<=', now()->subHours(24))
      ->whereDoesntHave('payments', function ($query) {
        $query->where('status', 'paid');
      })
      ->whereHas('user')
      ->chunkById(100, function ($orders) {
        foreach ($orders as $order) {
          $itemLanguage = $order->orderItems->first()?->language;

          $locale = match ($itemLanguage) {
            'arabic', 'ar' => 'ar',
            'german', 'de', 'deutsch' => 'de',
            default => 'en',
          };

          $order->user->notify(new ContinuePaymentReminder($order, $locale));

          $order->update([
            'payment_reminder_sent_at' => now(),
          ]);
        }
      });
  }
}
