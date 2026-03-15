<?php

namespace App\Notifications\Orders\Creating;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Order\Order;

class OrderConfirmation extends Notification
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
      ->subject(__('emails.order_confirmation_subject', ['id' => $this->order->id], $this->locale))
      ->view('emails.orders.creating.user-confirmation', [
        'order' => $this->order,
        'notifiable' => $notifiable,
        'locale' => $this->locale
      ]);
  }

  public function toArray($notifiable)
  {
    return [
      'order_id' => $this->order->id,
      'total_price' => $this->order->total_price,
    ];
  }
}
