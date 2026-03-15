<?php

namespace App\Notifications\Orders\Status;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Order\Order;
use App\Models\Order\Payment;

class PaymentStatusUpdate extends Notification
{

  protected $order;
  protected $payment;
  public $locale;

  public function __construct(Order $order, Payment $payment, $locale = null)
  {
    $this->order = $order;
    $this->payment = $payment;
    $this->locale = $locale ?: app()->getLocale();
  }

  public function via($notifiable)
  {
    return ['mail'];
  }

  public function toMail($notifiable)
  {
    return (new MailMessage)
      ->subject(__('emails.payment_status_update_subject', ['id' => $this->order->id], $this->locale))
      ->view('emails.orders.status.payment-status-update', [
        'order' => $this->order,
        'payment' => $this->payment,
        'notifiable' => $notifiable,
        'locale' => $this->locale
      ]);
  }

  public function toArray($notifiable)
  {
    return [
      'order_id' => $this->order->id,
      'payment_id' => $this->payment->id,
      'status' => $this->payment->status,
    ];
  }
}
