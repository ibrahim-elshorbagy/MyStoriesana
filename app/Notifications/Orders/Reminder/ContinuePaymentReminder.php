<?php

namespace App\Notifications\Orders\Reminder;

use App\Models\Order\Order;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContinuePaymentReminder extends Notification
{
  protected $order;
  public $locale;

  public function __construct(Order $order, $locale = null)
  {
    $this->order = $order;
    $this->locale = $locale ?: app()->getLocale();
  }

  public function via($notifiable)
  {
    return ['mail'];
  }

  public function toMail($notifiable)
  {
    return (new MailMessage)
      ->subject(__('emails.continue_payment_reminder_subject', ['id' => $this->order->id], $this->locale))
      ->view('emails.orders.reminder.continue-payment', [
        'order' => $this->order,
        'notifiable' => $notifiable,
        'locale' => $this->locale,
      ]);
  }

  public function toArray($notifiable)
  {
    return [
      'order_id' => $this->order->id,
      'total_price' => $this->order->total_price,
      'reminder_type' => 'continue_payment_24h',
    ];
  }
}
