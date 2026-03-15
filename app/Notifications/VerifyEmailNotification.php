<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class VerifyEmailNotification extends Notification
{
  use Queueable;

  protected $verificationUrl;

  /**
   * Create a new notification instance.
   */
  public function __construct($verificationUrl)
  {
    $this->verificationUrl = $verificationUrl;
  }

  /**
   * Get the notification's delivery channels.
   *
   * @return array<int, string>
   */
  public function via(object $notifiable): array
  {
    return ['mail'];
  }

  /**
   * Get the mail representation of the notification.
   */
  public function toMail(object $notifiable): MailMessage
  {
    $locale = app()->getLocale();

    return (new MailMessage)
      ->subject(__('emails.email_verification_subject', [], $locale))
      ->view('emails.verify', ['notifiable' => $notifiable, 'verificationUrl' => $this->verificationUrl, 'locale' => $locale]);
  }

  /**
   * Get the array representation of the notification.
   *
   * @return array<string, mixed>
   */
  public function toArray(object $notifiable): array
  {
    return [
      //
    ];
  }
}
