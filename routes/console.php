<?php

use App\Services\Order\ContinuePaymentReminderService;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
  $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::call(function () {
  app(ContinuePaymentReminderService::class)->sendPendingPaymentReminders();
})
  ->hourly()
  ->name('orders:continue-payment-reminder-after-24-hours');
