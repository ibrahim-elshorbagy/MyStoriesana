<?php


return [
  /*
  |--------------------------------------------------------------------------
  | All Website Controllers Responses Lines
  |--------------------------------------------------------------------------
  |
  |
  */


  'language_changed_title' => 'Sprache geändert',
  'language_changed_message' => 'Sprache erfolgreich aktualisiert.',
  "blocked_account" => "Ihr Konto wurde gesperrt. Bitte kontaktieren Sie den Administrator",


  /* Auth Controller Responses */
  'login_successful_title' => 'Anmeldung erfolgreich',
  'login_successful_message' => 'Willkommen zurück! Sie wurden erfolgreich angemeldet.',
  'logout_successful_title' => 'Abgemeldet',
  'logout_successful_message' => 'Sie wurden erfolgreich abgemeldet.',
  'registration_successful_title' => 'Registrierung erfolgreich',
  'registration_successful_message' => 'Ihr Konto wurde erfolgreich erstellt. Willkommen!',
  'password_reset_link_sent_title' => 'Passwort-Zurücksetzungslink gesendet',
  'password_reset_link_sent_message' => 'Ein Link zum Zurücksetzen des Passworts wurde an Ihre E-Mail-Adresse gesendet.',
  'password_reset_successful_title' => 'Passwort erfolgreich zurückgesetzt',
  'password_reset_successful_message' => 'Ihr Passwort wurde erfolgreich zurückgesetzt. Sie können sich jetzt anmelden.',
  'verification_link_sent_title' => 'Bestätigungslink gesendet',
  'verification_link_sent_message' => 'Ein neuer Bestätigungslink wurde an Ihre E-Mail-Adresse gesendet.',
  'password_confirmed_title' => 'Passwort bestätigt',
  'password_confirmed_message' => 'Ihr Passwort wurde erfolgreich bestätigt.',


  /* Auth Validation Messages */
  'username_required' => 'Das Benutzernamen-Feld ist erforderlich.',
  'password_required' => 'Das Passwort-Feld ist erforderlich.',
  'name_required' => 'Das Namen-Feld ist erforderlich.',
  'username_unique' => 'Dieser Benutzername ist bereits vergeben.',
  'email_required' => 'Das E-Mail-Feld ist erforderlich.',
  'email_invalid' => 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
  'email_unique' => 'Diese E-Mail-Adresse ist bereits registriert.',
  'password_confirmation' => 'Die Passwortbestätigung stimmt nicht überein.',
  'phone_invalid' => 'Bitte geben Sie eine gültige Telefonnummer ein (z.B. +1234567890).',
  'username_regex' => 'Der Benutzername darf keine Leerzeichen enthalten.',
  /* End Auth Validation Messages */


  /* End Auth Controller Responses */


  /* Profile Controller Responses */
  'profile_updated_title' => 'Profil aktualisiert',
  'profile_updated_message' => 'Ihre Profilinformationen wurden erfolgreich aktualisiert.',
  'account_deleted_title' => 'Konto gelöscht',
  'account_deleted_message' => 'Ihr Konto wurde dauerhaft gelöscht.',
  'password_updated_title' => 'Passwort aktualisiert',
  'password_updated_message' => 'Ihr Passwort wurde erfolgreich aktualisiert.',
  'profile_image_updated_title' => 'Profilbild aktualisiert',
  'profile_image_updated_message' => 'Ihr Profilbild wurde erfolgreich aktualisiert.',



  /* User Management Responses */
  'user_created_title' => 'Benutzer erstellt',
  'user_created_message' => 'Benutzer wurde erfolgreich erstellt.',
  'user_updated_title' => 'Benutzer aktualisiert',
  'user_updated_message' => 'Benutzer wurde erfolgreich aktualisiert.',
  'user_deleted_title' => 'Benutzer gelöscht',
  'user_deleted_message' => 'Benutzer wurde erfolgreich gelöscht.',
  'users_deleted_title' => 'Benutzer gelöscht',
  'users_deleted_message' => ':count Benutzer wurden erfolgreich gelöscht.',
  'user_blocked_title' => 'Benutzer gesperrt',
  'user_blocked_message' => 'Benutzer wurde erfolgreich gesperrt.',
  'user_unblocked_title' => 'Benutzer entsperrt',
  'user_unblocked_message' => 'Benutzer wurde erfolgreich entsperrt.',
  'user_delete_error_title' => 'Fehler beim Löschen',
  'user_delete_error_self_message' => 'Sie können Ihr eigenes Konto nicht löschen.',



  /* Admin Impersonation Responses */
  'impersonation_success_title' => 'Als Benutzer angemeldet',
  'impersonation_success_message' => 'Erfolgreich als Benutzer angemeldet: :name',
  'impersonation_return_title' => 'Administrator',


  /* Story Management Responses */
  'story_created_title' => 'Geschichte erstellt',
  'story_created_message' => 'Geschichte wurde erfolgreich erstellt.',
  'story_updated_title' => 'Geschichte aktualisiert',
  'story_updated_message' => 'Geschichte wurde erfolgreich aktualisiert.',
  'story_deleted_title' => 'Geschichte gelöscht',
  'story_deleted_message' => 'Geschichte wurde erfolgreich gelöscht.',
  'stories_deleted_title' => 'Geschichten gelöscht',
  'stories_deleted_message' => ':count Geschichten wurden erfolgreich gelöscht.',
  'stories_published_title' => 'Geschichten veröffentlicht',
  'stories_published_message' => ':count Geschichten wurden erfolgreich veröffentlicht.',
  'stories_archived_title' => 'Geschichten archiviert',
  'stories_archived_message' => ':count Geschichten wurden erfolgreich archiviert.',
  'confirm_delete_story' => 'Sind Sie sicher, dass Sie diese Geschichte löschen möchten?',
  'confirm_delete_stories' => 'Sind Sie sicher, dass Sie die ausgewählten Geschichten löschen möchten?',
  'confirm_publish_stories' => 'Sind Sie sicher, dass Sie die ausgewählten Geschichten veröffentlichen möchten?',
  'confirm_archive_stories' => 'Sind Sie sicher, dass Sie die ausgewählten Geschichten archivieren möchten?',


  // Story File Upload Messages
  'cover_image_uploaded_title' => 'Titelbild hochgeladen',
  'cover_image_uploaded_message' => 'Titelbild wurde erfolgreich hochgeladen.',
  'gallery_images_uploaded_title' => 'Galeriebilder hochgeladen',
  'gallery_images_uploaded_message' => 'Galeriebilder wurden erfolgreich hochgeladen.',
  'pdf_uploaded_title' => 'PDF hochgeladen',
  'pdf_uploaded_message' => 'PDF-Datei wurde erfolgreich hochgeladen.',
  'payment_status_updated_title' => 'Zahlungsstatus aktualisiert',
  'order_status_updated_title' => 'Bestellstatus aktualisiert',
  'notification_sent_title' => 'Benachrichtigung gesendet',
  'pdf_not_found_title' => 'PDF nicht gefunden',
  'file_upload_error_title' => 'Datei-Upload-Fehler',
  'file_upload_error_message' => 'Beim Hochladen der Datei ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
  'impersonation_return_message' => 'Erfolgreich zum Administrator-Konto zurückgekehrt.',
  'impersonation_failed_title' => 'Rückkehr fehlgeschlagen',
  'impersonation_failed_message' => 'Konnte nicht zum Administrator-Konto zurückkehren.',


  // Static Pages
  'page_created_title' => 'Erstellt',
  'page_created_message' => 'Seite erfolgreich erstellt',
  'page_updated_title' => 'Aktualisiert',
  'page_updated_message' => 'Seite erfolgreich aktualisiert',
  'page_deleted_title' => 'Gelöscht',
  'page_deleted_message' => 'Seite erfolgreich gelöscht',
  'pages_published_title' => 'Veröffentlicht',
  'pages_published_message' => 'Ausgewählte Seiten erfolgreich veröffentlicht',
  'pages_archived_title' => 'Archiviert',
  'pages_archived_message' => 'Ausgewählte Seiten erfolgreich archiviert',
  'pages_deleted_title' => 'Gelöscht',
  'pages_deleted_message' => 'Ausgewählte Seiten erfolgreich gelöscht',


  // Static Page Categories
  'static_page_category_created_title' => 'Erstellt',
  'static_page_category_created_message' => 'Kategorie erfolgreich erstellt',
  'static_page_category_updated_title' => 'Aktualisiert',
  'static_page_category_updated_message' => 'Kategorie erfolgreich aktualisiert',
  'static_page_category_deleted_title' => 'Gelöscht',
  'static_page_category_deleted_message' => 'Kategorie erfolgreich gelöscht',
  'static_page_category_delete_failed_title' => 'Löschen fehlgeschlagen',
  'static_page_category_delete_failed_message' => 'Kategorie mit Seiten kann nicht gelöscht werden',
  'static_page_categories_deleted_title' => 'Gelöscht',
  'static_page_categories_deleted_message' => ':count Kategorien erfolgreich gelöscht',
  'static_page_categories_bulk_delete_failed_title' => 'Löschen fehlgeschlagen',
  'static_page_categories_bulk_delete_failed_message' => 'Kategorien mit Seiten können nicht gelöscht werden',


  // FAQ Categories
  'faq_category_created_title' => 'Erstellt',
  'faq_category_created_message' => 'Kategorie erfolgreich erstellt',
  'faq_category_updated_title' => 'Aktualisiert',
  'faq_category_updated_message' => 'Kategorie erfolgreich aktualisiert',
  'faq_category_deleted_title' => 'Gelöscht',
  'faq_category_deleted_message' => 'Kategorie erfolgreich gelöscht',
  'faq_category_delete_failed_title' => 'Löschen fehlgeschlagen',
  'faq_category_delete_failed_message' => 'Kategorie mit FAQs kann nicht gelöscht werden',
  'faq_categories_deleted_title' => 'Gelöscht',
  'faq_categories_deleted_message' => ':count Kategorien erfolgreich gelöscht',
  'faq_categories_bulk_delete_failed_title' => 'Löschen fehlgeschlagen',
  'faq_categories_bulk_delete_failed_message' => 'Kategorien mit FAQs können nicht gelöscht werden',
  'faq_category_name_exists' => 'Kategoriename existiert bereits',


  // Site Settings Responses
  'settings_updated_title' => 'Aktualisiert',
  'settings_updated_message' => 'Seiteneinstellungen wurden erfolgreich gespeichert',


  // Pricing Settings Responses
  'pricing_updated_title' => 'Preise aktualisiert',
  'pricing_updated_message' => 'Preiseinstellungen wurden erfolgreich aktualisiert.',


  // FAQ Responses
  'faq_created_title' => 'FAQ erstellt',
  'faq_created_message' => 'FAQ wurde erfolgreich erstellt.',
  'faq_updated_title' => 'FAQ aktualisiert',
  'faq_updated_message' => 'FAQ wurde erfolgreich aktualisiert.',
  'faq_deleted_title' => 'FAQ gelöscht',
  'faq_deleted_message' => 'FAQ wurde erfolgreich gelöscht.',
  'faqs_deleted_title' => 'FAQs gelöscht',
  'faqs_deleted_message' => ':count FAQs erfolgreich gelöscht.',


  // FAQ Toggle Responses
  'faq_toggle_title' => 'FAQ aktualisiert',
  'faq_toggle_message' => 'FAQ wurde auf der Startseite :status.',
  'faqs_bulk_toggle_title' => 'FAQs aktualisiert',
  'faqs_bulk_toggle_message' => ':count FAQs wurden auf der Startseite :status.',
  'show' => 'angezeigt',
  'hide' => 'ausgeblendet',


  /* Age Category Responses */
  'age_category_created_title' => 'Alterskategorie erstellt',
  'age_category_created_message' => 'Alterskategorie wurde erfolgreich erstellt.',
  'age_category_updated_title' => 'Alterskategorie aktualisiert',
  'age_category_updated_message' => 'Alterskategorie wurde erfolgreich aktualisiert.',
  'age_category_deleted_title' => 'Alterskategorie gelöscht',
  'age_category_deleted_message' => 'Alterskategorie wurde erfolgreich gelöscht.',
  'age_categories_deleted_title' => 'Alterskategorien gelöscht',
  'age_categories_deleted_message' => ':count Alterskategorien wurden erfolgreich gelöscht.',
  'age_category_name_exists' => 'Alterskategoriename existiert bereits.',

  /* Discount Responses */
  'discount_created_title' => 'Rabatt erstellt',
  'discount_created_message' => 'Rabatt wurde erfolgreich erstellt.',
  'discount_updated_title' => 'Rabatt aktualisiert',
  'discount_updated_message' => 'Rabatt wurde erfolgreich aktualisiert.',
  'discount_deleted_title' => 'Rabatt gelöscht',
  'discount_deleted_message' => 'Rabatt wurde erfolgreich gelöscht.',
  'discounts_deleted_title' => 'Rabatte gelöscht',
  'discounts_deleted_message' => ':count Rabatte wurden erfolgreich gelöscht.',
  'discount_not_found' => 'Ungültiger Rabattcode',
  'discount_already_used' => 'Sie haben diesen Rabattcode bereits verwendet',
  'discount_limit_reached' => 'Dieser Rabattcode hat das Nutzungslimit erreicht',
  'discount_applied' => 'Rabatt erfolgreich angewendet',
  'discount_code_required' => 'Bitte geben Sie einen Rabattcode ein',
  'discount_validation_error' => 'Rabattcode-Validierung fehlgeschlagen. Bitte versuchen Sie es erneut.',
  'discount_code' => 'Rabattcode',
  'enter_discount_code' => 'Rabattcode eingeben',
  'apply' => 'Anwenden',
  'remove_discount' => 'Rabatt entfernen',
  'discount' => 'Rabatt',

  // Delivery Options Responses
  'delivery_option_created_title' => 'Lieferoption erstellt',
  'delivery_option_created_message' => 'Lieferoption wurde erfolgreich erstellt.',
  'delivery_option_updated_title' => 'Lieferoption aktualisiert',
  'delivery_option_updated_message' => 'Lieferoption wurde erfolgreich aktualisiert.',
  'delivery_option_deleted_title' => 'Lieferoption gelöscht',
  'delivery_option_deleted_message' => 'Lieferoption wurde erfolgreich gelöscht.',
  'delivery_options_deleted_title' => 'Lieferoptionen gelöscht',
  'delivery_options_deleted_message' => ':count Lieferoptionen wurden erfolgreich gelöscht.',
  'delivery_option_city_exists' => 'Lieferoptionsstadt existiert bereits.',


  // Order Management Responses
  'order_created_title' => 'Bestellung erstellt',
  'order_created_message' => 'Ihre Bestellung wurde erfolgreich erstellt.',
  'order_created_cod_title' => 'Bestellzahlung erstellt - Nachnahme',
  'order_created_cod_message' => 'Sie zahlen bei Lieferung.',
  'payment_status_updated' => 'Zahlungsstatus erfolgreich aktualisiert.',
  'payment_already_initiated_title' => 'Zahlung bereits eingeleitet',
  'payment_already_initiated' => 'Zahlung für diese Bestellung bereits eingeleitet.',
  'order_status_updated' => 'Bestellstatus erfolgreich aktualisiert.',
  'pdf_uploaded' => 'PDF erfolgreich hochgeladen.',
  'pdf_not_found' => 'PDF-Datei nicht gefunden.',
  'notification_sent' => 'Benachrichtigung erfolgreich gesendet.',


  // Email Settings Responses
  'email_settings_updated_title' => 'E-Mail-Einstellungen aktualisiert',
  'email_settings_updated_message' => 'E-Mail-Einstellungen wurden erfolgreich aktualisiert.',


  // Customer Feedback Responses
  'customer_feedback_created_title' => 'Kundenfeedback erstellt',
  'customer_feedback_created_message' => 'Kundenfeedback wurde erfolgreich erstellt.',
  'customer_feedback_updated_title' => 'Kundenfeedback aktualisiert',
  'customer_feedback_updated_message' => 'Kundenfeedback wurde erfolgreich aktualisiert.',
  'customer_feedback_deleted_title' => 'Kundenfeedback gelöscht',
  'customer_feedback_deleted_message' => 'Kundenfeedback wurde erfolgreich gelöscht.',
  'customer_feedbacks_bulk_deleted_title' => 'Kundenfeedbacks gelöscht',
  'customer_feedbacks_bulk_deleted_message' => 'Ausgewählte Kundenfeedbacks wurden erfolgreich gelöscht.',


  // Payment Responses
  'payment_already_completed' => 'Die Zahlung für diese Bestellung wurde bereits abgeschlossen.',
  'payment_already_completed_title' => 'Zahlung bereits abgeschlossen',
  'payment_failed' => 'Zahlung fehlgeschlagen. Bitte versuchen Sie es erneut.',
  'payment_methods_not_configured' => 'Zahlungsmethoden nicht konfiguriert. Bitte kontaktieren Sie den Support.',
  'payment_successful_title' => 'Zahlung erfolgreich',
  'payment_successful_message' => 'Ihre Zahlung wurde erfolgreich verarbeitet.',
  'payment_pending_title' => 'Zahlung ausstehend',
  'payment_pending_message' => 'Ihre Zahlung wird bearbeitet.',
  'payment_error_title' => 'Zahlungsfehler',
  'payment_already_initiated_title' => 'Zahlung bereits eingeleitet',
  'payment_already_initiated' => 'Die Zahlung für diese Bestellung wurde bereits eingeleitet.',

  // Cart Responses
  'item_added_to_cart_title' => 'Artikel zum Warenkorb hinzugefügt',
  'item_added_to_cart_message' => 'Geschichte wurde erfolgreich zu Ihrem Warenkorb hinzugefügt.',
  'failed_to_add_to_cart' => 'Fehler beim Hinzufügen der Geschichte zum Warenkorb. Bitte versuchen Sie es erneut.',
  'item_removed_title' => 'Artikel entfernt',
  'item_removed_message' => 'Artikel wurde aus Ihrem Warenkorb entfernt.',
  'cart_cleared_title' => 'Warenkorb geleert',
  'cart_cleared_message' => 'Ihr Warenkorb wurde erfolgreich geleert.',
  'cart_updated_title' => 'Warenkorb aktualisiert',
  'cart_updated_message' => 'Ihr Warenkorb wurde erfolgreich aktualisiert.',
  'already_paid_title' => 'Bereits bezahlt',
  'already_paid_message' => 'Diese Bestellung wurde bereits bezahlt.',


];
