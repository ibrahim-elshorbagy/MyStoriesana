<?php

return [
  /*
  |--------------------------------------------------------------------------
  | All Website Controllers Responses Lines
  |--------------------------------------------------------------------------
  |
  |
  */

  'language_changed_title' => 'Language Changed',
  'language_changed_message' => 'Language updated successfully.',
  "blocked_account" => "Your account has been blocked. Please contact administrator",

  /* Auth Controller Responses */
  'login_successful_title' => 'Login Successful',
  'login_successful_message' => 'Welcome back! You have been logged in successfully.',
  'logout_successful_title' => 'Logged Out',
  'logout_successful_message' => 'You have been logged out successfully.',
  'registration_successful_title' => 'Registration Successful',
  'registration_successful_message' => 'Your account has been created successfully. Welcome!',
  'password_reset_link_sent_title' => 'Password Reset Link Sent',
  'password_reset_link_sent_message' => 'A password reset link has been sent to your email address.',
  'password_reset_successful_title' => 'Password Reset Successful',
  'password_reset_successful_message' => 'Your password has been reset successfully. You can now log in.',
  'verification_link_sent_title' => 'Verification Link Sent',
  'verification_link_sent_message' => 'A new verification link has been sent to your email address.',
  'password_confirmed_title' => 'Password Confirmed',
  'password_confirmed_message' => 'Your password has been confirmed successfully.',

  /* Auth Validation Messages */
  'username_required' => 'The username field is required.',
  'password_required' => 'The password field is required.',
  'name_required' => 'The name field is required.',
  'username_unique' => 'This username is already taken.',
  'email_required' => 'The email field is required.',
  'email_invalid' => 'Please enter a valid email address.',
  'email_unique' => 'This email is already registered.',
  'password_confirmation' => 'The password confirmation does not match.',
  'phone_invalid' => 'Please enter a valid phone number (e.g., +1234567890).',
  'username_regex' => 'The username must not contain spaces.',
  /* End Auth Validation Messages */

  /* End Auth Controller Responses */

  /* Profile Controller Responses */
  'profile_updated_title' => 'Profile Updated',
  'profile_updated_message' => 'Your profile information has been updated successfully.',
  'account_deleted_title' => 'Account Deleted',
  'account_deleted_message' => 'Your account has been permanently deleted.',
  'password_updated_title' => 'Password Updated',
  'password_updated_message' => 'Your password has been updated successfully.',
  'profile_image_updated_title' => 'Profile Image Updated',
  'profile_image_updated_message' => 'Your profile image has been updated successfully.',


  /* User Management Responses */
  'user_created_title' => 'User Created',
  'user_created_message' => 'User has been created successfully.',
  'user_updated_title' => 'User Updated',
  'user_updated_message' => 'User has been updated successfully.',
  'user_deleted_title' => 'User Deleted',
  'user_deleted_message' => 'User has been deleted successfully.',
  'users_deleted_title' => 'Users Deleted',
  'users_deleted_message' => ':count users have been deleted successfully.',
  'user_blocked_title' => 'User Blocked',
  'user_blocked_message' => 'User has been blocked successfully.',
  'user_unblocked_title' => 'User Unblocked',
  'user_unblocked_message' => 'User has been unblocked successfully.',
  'user_delete_error_title' => 'Delete Error',
  'user_delete_error_self_message' => 'You cannot delete your own account.',


  /* Admin Impersonation Responses */
  'impersonation_success_title' => 'Logged in as user',
  'impersonation_success_message' => 'Successfully logged in as user: :name',
  'impersonation_return_title' => 'Returned to Admin',

  /* Story Management Responses */
  'story_created_title' => 'Story Created',
  'story_created_message' => 'Story has been created successfully.',
  'story_updated_title' => 'Story Updated',
  'story_updated_message' => 'Story has been updated successfully.',
  'story_deleted_title' => 'Story Deleted',
  'story_deleted_message' => 'Story has been deleted successfully.',
  'stories_deleted_title' => 'Stories Deleted',
  'stories_deleted_message' => ':count stories have been deleted successfully.',
  'stories_published_title' => 'Stories Published',
  'stories_published_message' => ':count stories have been published successfully.',
  'stories_archived_title' => 'Stories Archived',
  'stories_archived_message' => ':count stories have been archived successfully.',
  'confirm_delete_story' => 'Are you sure you want to delete this story?',
  'confirm_delete_stories' => 'Are you sure you want to delete the selected stories?',
  'confirm_publish_stories' => 'Are you sure you want to publish the selected stories?',
  'confirm_archive_stories' => 'Are you sure you want to archive the selected stories?',

  // Story File Upload Messages
  'cover_image_uploaded_title' => 'Cover Image Uploaded',
  'cover_image_uploaded_message' => 'Cover image has been uploaded successfully.',
  'gallery_images_uploaded_title' => 'Gallery Images Uploaded',
  'gallery_images_uploaded_message' => 'Gallery images have been uploaded successfully.',
  'pdf_uploaded_title' => 'PDF Uploaded',
  'pdf_uploaded_message' => 'PDF file has been uploaded successfully.',
  'payment_status_updated_title' => 'Payment Status Updated',
  'order_status_updated_title' => 'Order Status Updated',
  'notification_sent_title' => 'Notification Sent',
  'pdf_not_found_title' => 'PDF Not Found',
  'file_upload_error_title' => 'File Upload Error',
  'file_upload_error_message' => 'An error occurred while uploading the file. Please try again.',
  'impersonation_return_message' => 'Successfully returned to the admin account.',
  'impersonation_failed_title' => 'Return failed',
  'impersonation_failed_message' => 'Could not return to the admin account.',

  // Static Pages
  'page_created_title' => 'Created',
  'page_created_message' => 'Page created successfully',
  'page_updated_title' => 'Updated',
  'page_updated_message' => 'Page updated successfully',
  'page_deleted_title' => 'Deleted',
  'page_deleted_message' => 'Page deleted successfully',
  'pages_published_title' => 'Published',
  'pages_published_message' => 'Selected pages published successfully',
  'pages_archived_title' => 'Archived',
  'pages_archived_message' => 'Selected pages archived successfully',
  'pages_deleted_title' => 'Deleted',
  'pages_deleted_message' => 'Selected pages deleted successfully',

  // Static Page Categories
  'static_page_category_created_title' => 'Created',
  'static_page_category_created_message' => 'Category created successfully',
  'static_page_category_updated_title' => 'Updated',
  'static_page_category_updated_message' => 'Category updated successfully',
  'static_page_category_deleted_title' => 'Deleted',
  'static_page_category_deleted_message' => 'Category deleted successfully',
  'static_page_category_delete_failed_title' => 'Delete Failed',
  'static_page_category_delete_failed_message' => 'Cannot delete category that contains pages',
  'static_page_categories_deleted_title' => 'Deleted',
  'static_page_categories_deleted_message' => ':count categories deleted successfully',
  'static_page_categories_bulk_delete_failed_title' => 'Delete Failed',
  'static_page_categories_bulk_delete_failed_message' => 'Cannot delete categories that contain pages',

  // FAQ Categories
  'faq_category_created_title' => 'Created',
  'faq_category_created_message' => 'Category created successfully',
  'faq_category_updated_title' => 'Updated',
  'faq_category_updated_message' => 'Category updated successfully',
  'faq_category_deleted_title' => 'Deleted',
  'faq_category_deleted_message' => 'Category deleted successfully',
  'faq_category_delete_failed_title' => 'Delete Failed',
  'faq_category_delete_failed_message' => 'Cannot delete category that contains FAQs',
  'faq_categories_deleted_title' => 'Deleted',
  'faq_categories_deleted_message' => ':count categories deleted successfully',
  'faq_categories_bulk_delete_failed_title' => 'Delete Failed',
  'faq_categories_bulk_delete_failed_message' => 'Cannot delete categories that contain FAQs',
  'faq_category_name_exists' => 'Category name already exists',

  // Site Settings Responses
  'settings_updated_title' => 'Updated',
  'settings_updated_message' => 'Site settings have been saved successfully',

  // Pricing Settings Responses
  'pricing_updated_title' => 'Pricing Updated',
  'pricing_updated_message' => 'Pricing settings have been updated successfully.',

  // FAQ Responses
  'faq_created_title' => 'FAQ Created',
  'faq_created_message' => 'FAQ has been created successfully.',
  'faq_updated_title' => 'FAQ Updated',
  'faq_updated_message' => 'FAQ has been updated successfully.',
  'faq_deleted_title' => 'FAQ Deleted',
  'faq_deleted_message' => 'FAQ has been deleted successfully.',
  'faqs_deleted_title' => 'FAQs Deleted',
  'faqs_deleted_message' => ':count FAQs deleted successfully.',

  // FAQ Toggle Responses
  'faq_toggle_title' => 'FAQ Updated',
  'faq_toggle_message' => 'FAQ has been :status on home page.',
  'faqs_bulk_toggle_title' => 'FAQs Updated',
  'faqs_bulk_toggle_message' => ':count FAQs have been :status on home page.',
  'show' => 'shown',
  'hide' => 'hidden',

  /* Age Category Responses */
  'age_category_created_title' => 'Age Category Created',
  'age_category_created_message' => 'Age category has been created successfully.',
  'age_category_updated_title' => 'Age Category Updated',
  'age_category_updated_message' => 'Age category has been updated successfully.',
  'age_category_deleted_title' => 'Age Category Deleted',
  'age_category_deleted_message' => 'Age category has been deleted successfully.',
  'age_categories_deleted_title' => 'Age Categories Deleted',
  'age_categories_deleted_message' => ':count age categories have been deleted successfully.',
  'age_category_name_exists' => 'Age category name already exists.',

  /* Discount Responses */
  'discount_created_title' => 'Discount Created',
  'discount_created_message' => 'Discount has been created successfully.',
  'discount_updated_title' => 'Discount Updated',
  'discount_updated_message' => 'Discount has been updated successfully.',
  'discount_deleted_title' => 'Discount Deleted',
  'discount_deleted_message' => 'Discount has been deleted successfully.',
  'discounts_deleted_title' => 'Discounts Deleted',
  'discounts_deleted_message' => ':count discounts have been deleted successfully.',
  'discount_not_found' => 'Invalid discount code',
  'discount_already_used' => 'You have already used this discount code',
  'discount_limit_reached' => 'This discount code has reached its usage limit',
  'discount_applied' => 'Discount applied successfully',
  'discount_code_required' => 'Please enter a discount code',
  'discount_validation_error' => 'Failed to validate discount code. Please try again.',
  'discount_code' => 'Discount Code',
  'enter_discount_code' => 'Enter discount code',
  'apply' => 'Apply',
  'remove_discount' => 'Remove discount',
  'discount' => 'Discount',

  // Delivery Options Responses
  'delivery_option_created_title' => 'Delivery Option Created',
  'delivery_option_created_message' => 'Delivery option has been created successfully.',
  'delivery_option_updated_title' => 'Delivery Option Updated',
  'delivery_option_updated_message' => 'Delivery option has been updated successfully.',
  'delivery_option_deleted_title' => 'Delivery Option Deleted',
  'delivery_option_deleted_message' => 'Delivery option has been deleted successfully.',
  'delivery_options_deleted_title' => 'Delivery Options Deleted',
  'delivery_options_deleted_message' => ':count delivery options have been deleted successfully.',
  'delivery_option_city_exists' => 'Delivery option city already exists.',

  // Order Management Responses
  'order_created_title' => 'Order Created',
  'order_created_message' => 'Your order has been created successfully.',
  'order_created_cod_title' => 'Order Payment Created - Cash on Delivery',
  'order_created_cod_message' => 'You will pay upon delivery.',
  'payment_status_updated' => 'Payment status updated successfully.',
  'payment_already_initiated_title' => 'Payment Already Initiated',
  'payment_already_initiated' => 'Payment already initiated for this order.',
  'order_status_updated' => 'Order status updated successfully.',
  'pdf_uploaded' => 'PDF uploaded successfully.',
  'pdf_not_found' => 'PDF file not found.',
  'notification_sent' => 'Notification sent successfully.',

  // Email Settings Responses
  'email_settings_updated_title' => 'Email Settings Updated',
  'email_settings_updated_message' => 'Email settings have been updated successfully.',

  // Customer Feedback Responses
  'customer_feedback_created_title' => 'Customer Feedback Created',
  'customer_feedback_created_message' => 'Customer feedback has been created successfully.',
  'customer_feedback_updated_title' => 'Customer Feedback Updated',
  'customer_feedback_updated_message' => 'Customer feedback has been updated successfully.',
  'customer_feedback_deleted_title' => 'Customer Feedback Deleted',
  'customer_feedback_deleted_message' => 'Customer feedback has been deleted successfully.',
  'customer_feedbacks_bulk_deleted_title' => 'Customer Feedbacks Deleted',
  'customer_feedbacks_bulk_deleted_message' => 'Selected customer feedbacks have been deleted successfully.',

  // Payment Responses
  'payment_already_completed' => 'Payment has already been completed for this order.',
  'payment_already_completed_title' => 'Payment Already Completed',
  'payment_failed' => 'Payment failed. Please try again.',
  'payment_methods_not_configured' => 'Payment methods not configured. Please contact support.',
  'payment_successful_title' => 'Payment Successful',
  'payment_successful_message' => 'Your payment has been processed successfully.',
  'payment_pending_title' => 'Payment Pending',
  'payment_pending_message' => 'Your payment is being processed.',
  'payment_error_title' => 'Payment Error',
  'payment_already_initiated_title' => 'Payment Already Initiated',
  'payment_already_initiated' => 'Payment for this order has already been initiated.',

  // Cart Responses
  'item_added_to_cart_title' => 'Item Added to Cart',
  'item_added_to_cart_message' => 'Story has been added to your cart successfully.',
  'failed_to_add_to_cart' => 'Failed to add story to cart. Please try again.',
  'item_removed_title' => 'Item Removed',
  'item_removed_message' => 'Item has been removed from your cart.',
  'cart_cleared_title' => 'Cart Cleared',
  'cart_cleared_message' => 'Your cart has been cleared successfully.',
  'cart_updated_title' => 'Cart Updated',
  'cart_updated_message' => 'Your cart has been updated successfully.',
  'cart_empty_title' => 'Cart is Empty',
  'cart_empty_message' => 'Please add items to your cart',
  'order_creation_failed_title' => 'Order Creation Failed',
  'order_creation_failed' => 'Failed to create order. Please try again.',
  'payment_error_title' => 'Payment Error',
  'payment_failed' => 'Payment failed. Please try again.',
  'already_paid_title' => 'Already Paid',
  'already_paid_message' => 'This order has already been paid.',

  // Discount Management
  'discount_created_title' => 'Discount Created',
  'discount_created_message' => 'Discount has been created successfully.',
  'discount_updated_title' => 'Discount Updated',
  'discount_updated_message' => 'Discount has been updated successfully.',
  'discount_deleted_title' => 'Discount Deleted',
  'discount_deleted_message' => 'Discount has been deleted successfully.',
  'discounts_deleted_title' => 'Discounts Deleted',
  'discounts_deleted_message' => ':count discounts have been deleted successfully.',

];
