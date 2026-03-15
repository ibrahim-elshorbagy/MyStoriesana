<?php

namespace App\Notifications\Orders\Status;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Order\OrderItem;

class PDFUploaded extends Notification
{

  protected $orderItem;
  public $locale;

  public function __construct(OrderItem $orderItem, $locale = null)
  {
    $this->orderItem = $orderItem;
    $this->locale = $locale ?: app()->getLocale();
  }

  public function via($notifiable)
  {
    return ['mail'];
  }

  public function toMail($notifiable)
  {
    return (new MailMessage)
      ->subject(__('emails.pdf_uploaded_subject', ['id' => $this->orderItem->order->id], $this->locale))
      ->view('emails.orders.status.pdf-uploaded', [
        'orderItem' => $this->orderItem,
        'order' => $this->orderItem->order,
        'notifiable' => $notifiable,
        'locale' => $this->locale
      ]);
  }

  public function toArray($notifiable)
  {
    return [
      'order_id' => $this->orderItem->order->id,
      'order_item_id' => $this->orderItem->id,
      'pdf_path' => $this->orderItem->pdf_path,
    ];
  }
}
