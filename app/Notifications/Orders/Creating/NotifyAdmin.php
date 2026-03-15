<?php

namespace App\Notifications\Orders\Creating;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Order\Order;

class NotifyAdmin extends Notification
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
      ->subject(__('emails.new_order_admin_subject', ['id' => $this->order->id], $this->locale))
      ->view('emails.orders.creating.notify-admin', [
        'order' => $this->order,
        'notifiable' => $notifiable,
        'locale' => $this->locale
      ]);
  }

  public function toArray($notifiable)
  {
    return [
      'order_id' => $this->order->id,
      'customer_name' => $this->order->user->name,
      'total_price' => $this->order->total_price,
    ];
  }
}
