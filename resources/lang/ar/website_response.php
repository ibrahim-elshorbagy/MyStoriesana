<?php

return [
  /*
  |--------------------------------------------------------------------------
  | All Website Controllers Responses Lines
  |--------------------------------------------------------------------------
  |
  |
  */

  'language_changed_title' => 'تم تغيير اللغة',
  'language_changed_message' => 'تم تغيير اللغة بنجاح.',
  "blocked_account" => "تم حظر حسابك. يُرجى التواصل مع المسؤول.",

  /* Auth Controller Responses */
  'login_successful_title' => 'تم تسجيل الدخول بنجاح',
  'login_successful_message' => 'مرحباً بعودتك! تم تسجيل دخولك بنجاح.',
  'logout_successful_title' => 'تم تسجيل الخروج',
  'logout_successful_message' => 'تم تسجيل خروجك بنجاح.',
  'registration_successful_title' => 'تم إنشاء الحساب بنجاح',
  'registration_successful_message' => 'تم إنشاء حسابك بنجاح. مرحباً بك!',
  'password_reset_link_sent_title' => 'تم إرسال رابط إعادة تعيين كلمة المرور',
  'password_reset_link_sent_message' => 'تم إرسال رابط إعادة تعيين كلمة المرور إلى عنوان بريدك الإلكتروني.',
  'password_reset_successful_title' => 'تم إعادة تعيين كلمة المرور بنجاح',
  'password_reset_successful_message' => 'تم إعادة تعيين كلمة المرور بنجاح. يمكنك الآن تسجيل الدخول.',
  'verification_link_sent_title' => 'تم إرسال رابط التحقق',
  'verification_link_sent_message' => 'تم إرسال رابط تحقق جديد إلى عنوان بريدك الإلكتروني.',
  'password_confirmed_title' => 'تم تأكيد كلمة المرور',
  'password_confirmed_message' => 'تم تأكيد كلمة المرور بنجاح.',

  /* Auth Validation Messages */
  'username_required' => 'حقل اسم المستخدم مطلوب.',
  'password_required' => 'حقل كلمة المرور مطلوب.',
  'name_required' => 'حقل الاسم مطلوب.',
  'username_unique' => 'اسم المستخدم هذا مُستخدم بالفعل.',
  'email_required' => 'حقل البريد الإلكتروني مطلوب.',
  'email_invalid' => 'يرجى إدخال عنوان بريد إلكتروني صحيح.',
  'email_unique' => 'هذا البريد الإلكتروني مُسجل بالفعل.',
  'password_confirmation' => 'تأكيد كلمة المرور غير متطابق.',
  'phone_invalid' => 'يرجى إدخال رقم هاتف صحيح (مثال: +1234567890).',
  'username_regex' => 'يجب ألا يحتوي اسم المستخدم على مسافات.',
  /* End Auth Validation Messages */

  /* End Auth Controller Responses */

  /* Profile Controller Responses */
  'profile_updated_title' => 'تم تحديث الملف الشخصي',
  'profile_updated_message' => 'تم تحديث معلومات ملفك الشخصي بنجاح.',
  'account_deleted_title' => 'تم حذف الحساب',
  'account_deleted_message' => 'تم حذف حسابك بشكل دائم.',
  'password_updated_title' => 'تم تحديث كلمة المرور',
  'password_updated_message' => 'تم تحديث كلمة المرور الخاصة بك بنجاح.',
  'profile_image_updated_title' => 'تم تحديث الصورة ',
  'profile_image_updated_message' => 'تم تحديث صورة الملف الشخصي بنجاح.',

  /* User Management Responses */
  'user_created_title' => 'تم إنشاء المستخدم',
  'user_created_message' => 'تم إنشاء المستخدم بنجاح.',
  'user_updated_title' => 'تم تحديث المستخدم',
  'user_updated_message' => 'تم تحديث المستخدم بنجاح.',
  'user_deleted_title' => 'تم حذف المستخدم',
  'user_deleted_message' => 'تم حذف المستخدم بنجاح.',
  'users_deleted_title' => 'تم حذف المستخدمين',
  'users_deleted_message' => 'تم حذف :count من المستخدمين بنجاح.',
  'user_blocked_title' => 'تم حظر المستخدم',
  'user_blocked_message' => 'تم حظر المستخدم بنجاح.',
  'user_unblocked_title' => 'تم إلغاء حظر المستخدم',
  'user_unblocked_message' => 'تم إلغاء حظر المستخدم بنجاح.',
  'user_delete_error_title' => 'خطأ في الحذف',
  'user_delete_error_self_message' => 'لا يمكنك حذف حسابك الخاص.',

  /* Admin Impersonation Responses */
  'impersonation_success_title' => 'تم تسجيل الدخول كمستخدم',
  'impersonation_success_message' => 'تم تسجيل الدخول بنجاح كمستخدم: :name',
  'impersonation_return_title' => 'تم العودة إلى المدير',

  /* Story Management Responses */
  'story_created_title' => 'تم إنشاء القصة',
  'story_created_message' => 'تم إنشاء القصة بنجاح.',
  'story_updated_title' => 'تم تحديث القصة',
  'story_updated_message' => 'تم تحديث القصة بنجاح.',
  'story_deleted_title' => 'تم حذف القصة',
  'story_deleted_message' => 'تم حذف القصة بنجاح.',
  'stories_deleted_title' => 'تم حذف القصص',
  'stories_deleted_message' => 'تم حذف :count من القصص بنجاح.',
  'stories_published_title' => 'تم نشر القصص',
  'stories_published_message' => 'تم نشر :count من القصص بنجاح.',
  'stories_archived_title' => 'تم أرشفة القصص',
  'stories_archived_message' => 'تم أرشفة :count من القصص بنجاح.',
  'confirm_delete_story' => 'هل أنت متأكد من حذف هذه القصة؟',
  'confirm_delete_stories' => 'هل أنت متأكد من حذف القصص المحددة؟',
  'confirm_publish_stories' => 'هل أنت متأكد من نشر القصص المحددة؟',
  'confirm_archive_stories' => 'هل أنت متأكد من أرشفة القصص المحددة؟',

  // Story File Upload Messages
  'cover_image_uploaded_title' => 'تم تحميل صورة الغلاف',
  'cover_image_uploaded_message' => 'تم تحميل صورة الغلاف بنجاح.',
  'gallery_images_uploaded_title' => 'تم تحميل صور المعرض',
  'gallery_images_uploaded_message' => 'تم تحميل صور المعرض بنجاح.',
  'pdf_uploaded_title' => 'تم تحميل ملف PDF',
  'pdf_uploaded_message' => 'تم تحميل ملف PDF بنجاح.',
  'payment_status_updated_title' => 'تم تحديث حالة الدفع',
  'order_status_updated_title' => 'تم تحديث حالة الطلب',
  'notification_sent_title' => 'تم إرسال الإشعار',
  'pdf_not_found_title' => 'ملف PDF غير موجود',
  'file_upload_error_title' => 'خطأ في تحميل الملف',
  'file_upload_error_message' => 'حدث خطأ أثناء تحميل الملف. يرجى المحاولة مرة أخرى.',

  // Admin Impersonation Responses
  'impersonation_return_message' => 'تم العودة إلى حساب المدير بنجاح.',
  'impersonation_failed_title' => 'فشل العودة',
  'impersonation_failed_message' => 'تعذر العودة إلى حساب المدير.',

  // Static Pages
  'page_created_title' => 'تم الإنشاء',
  'page_created_message' => 'تم إنشاء الصفحة بنجاح',
  'page_updated_title' => 'تم التحديث',
  'page_updated_message' => 'تم تحديث الصفحة بنجاح',
  'page_deleted_title' => 'تم الحذف',
  'page_deleted_message' => 'تم حذف الصفحة بنجاح',
  'pages_published_title' => 'تم النشر',
  'pages_published_message' => 'تم نشر الصفحات المحددة بنجاح',
  'pages_archived_title' => 'تم الأرشفة',
  'pages_archived_message' => 'تم أرشفة الصفحات المحددة بنجاح',
  'pages_deleted_title' => 'تم الحذف',
  'pages_deleted_message' => 'تم حذف الصفحات المحددة بنجاح',

  // Static Page Categories
  'static_page_category_created_title' => 'تم الإنشاء',
  'static_page_category_created_message' => 'تم إنشاء الفئة بنجاح',
  'static_page_category_updated_title' => 'تم التحديث',
  'static_page_category_updated_message' => 'تم تحديث الفئة بنجاح',
  'static_page_category_deleted_title' => 'تم الحذف',
  'static_page_category_deleted_message' => 'تم حذف الفئة بنجاح',
  'static_page_category_delete_failed_title' => 'فشل الحذف',
  'static_page_category_delete_failed_message' => 'لا يمكن حذف الفئة التي تحتوي على صفحات',
  'static_page_categories_deleted_title' => 'تم الحذف',
  'static_page_categories_deleted_message' => 'تم حذف :count فئات بنجاح',
  'static_page_categories_bulk_delete_failed_title' => 'فشل الحذف',
  'static_page_categories_bulk_delete_failed_message' => 'لا يمكن حذف الفئات التي تحتوي على صفحات',

  // FAQ Categories
  'faq_category_created_title' => 'تم الإنشاء',
  'faq_category_created_message' => 'تم إنشاء الفئة بنجاح',
  'faq_category_updated_title' => 'تم التحديث',
  'faq_category_updated_message' => 'تم تحديث الفئة بنجاح',
  'faq_category_deleted_title' => 'تم الحذف',
  'faq_category_deleted_message' => 'تم حذف الفئة بنجاح',
  'faq_category_delete_failed_title' => 'فشل الحذف',
  'faq_category_delete_failed_message' => 'لا يمكن حذف الفئة التي تحتوي على أسئلة شائعة',
  'faq_categories_deleted_title' => 'تم الحذف',
  'faq_categories_deleted_message' => 'تم حذف :count فئات بنجاح',
  'faq_categories_bulk_delete_failed_title' => 'فشل الحذف',
  'faq_categories_bulk_delete_failed_message' => 'لا يمكن حذف الفئات التي تحتوي على أسئلة شائعة',
  'faq_category_name_exists' => 'اسم الفئة موجود بالفعل',

  // Site Settings Responses


  // Site Settings Responses
  'settings_updated_title' => 'تم التحديث',
  'settings_updated_message' => 'تم حفظ إعدادات الموقع بنجاح',

  // Pricing Settings Responses
  'pricing_updated_title' => 'تم تحديث التسعير',
  'pricing_updated_message' => 'تم تحديث إعدادات التسعير بنجاح.',

  // FAQ Responses
  'faq_created_title' => 'تم إنشاء السؤال الشائع',
  'faq_created_message' => 'تم إنشاء السؤال الشائع بنجاح.',
  'faq_updated_title' => 'تم تحديث السؤال الشائع',
  'faq_updated_message' => 'تم تحديث السؤال الشائع بنجاح.',
  'faq_deleted_title' => 'تم حذف السؤال الشائع',
  'faq_deleted_message' => 'تم حذف السؤال الشائع بنجاح.',
  'faqs_deleted_title' => 'تم حذف الأسئلة الشائعة',
  'faqs_deleted_message' => 'تم حذف :count أسئلة شائعة بنجاح.',

  // FAQ Toggle Responses
  'faq_toggle_title' => 'تم تحديث السؤال الشائع',
  'faq_toggle_message' => 'تم :status السؤال الشائع في الصفحة الرئيسية.',
  'faqs_bulk_toggle_title' => 'تم تحديث الأسئلة الشائعة',
  'faqs_bulk_toggle_message' => 'تم :status :count أسئلة شائعة في الصفحة الرئيسية.',
  'show' => 'إظهار',
  'hide' => 'إخفاء',

  /* Age Category Responses */
  'age_category_created_title' => 'تم إنشاء فئة العمر',
  'age_category_created_message' => 'تم إنشاء فئة العمر بنجاح.',
  'age_category_updated_title' => 'تم تحديث فئة العمر',
  'age_category_updated_message' => 'تم تحديث فئة العمر بنجاح.',
  'age_category_deleted_title' => 'تم حذف فئة العمر',
  'age_category_deleted_message' => 'تم حذف فئة العمر بنجاح.',
  'age_categories_deleted_title' => 'تم حذف فئات العمر',
  'age_categories_deleted_message' => 'تم حذف :count فئات عمر بنجاح.',
  'age_category_name_exists' => 'اسم فئة العمر موجود بالفعل.',

  /* Discount Responses */
  'discount_created_title' => 'تم إنشاء الخصم',
  'discount_created_message' => 'تم إنشاء الخصم بنجاح.',
  'discount_updated_title' => 'تم تحديث الخصم',
  'discount_updated_message' => 'تم تحديث الخصم بنجاح.',
  'discount_deleted_title' => 'تم حذف الخصم',
  'discount_deleted_message' => 'تم حذف الخصم بنجاح.',
  'discounts_deleted_title' => 'تم حذف الخصومات',
  'discounts_deleted_message' => 'تم حذف :count خصومات بنجاح.',
  'discount_not_found' => 'رمز الخصم غير صحيح',
  'discount_already_used' => 'لقد استخدمت رمز الخصم هذا بالفعل',
  'discount_limit_reached' => 'وصل رمز الخصم هذا إلى حد الاستخدام',
  'discount_applied' => 'تم تطبيق الخصم بنجاح',
  'discount_code_required' => 'يرجى إدخال رمز الخصم',
  'discount_validation_error' => 'فشل في التحقق من رمز الخصم. يرجى المحاولة مرة أخرى.',
  'discount_code' => 'رمز الخصم',
  'enter_discount_code' => 'أدخل رمز الخصم',
  'apply' => 'تطبيق',
  'remove_discount' => 'إزالة الخصم',
  'discount' => 'خصم',
  'discount_minimum_books_required' => 'يتطلب هذا الخصم حد أدنى من :count كتب في سلتك',

  // Delivery Options Responses
  'delivery_option_created_title' => 'تم إنشاء خيار التوصيل',
  'delivery_option_created_message' => 'تم إنشاء خيار التوصيل بنجاح.',
  'delivery_option_updated_title' => 'تم تحديث خيار التوصيل',
  'delivery_option_updated_message' => 'تم تحديث خيار التوصيل بنجاح.',
  'delivery_option_deleted_title' => 'تم حذف خيار التوصيل',
  'delivery_option_deleted_message' => 'تم حذف خيار التوصيل بنجاح.',
  'delivery_options_deleted_title' => 'تم حذف خيارات التوصيل',
  'delivery_options_deleted_message' => 'تم حذف :count خيارات توصيل بنجاح.',
  'delivery_option_city_exists' => 'خيار التوصيل للمدينة موجود بالفعل.',

  // Order Management Responses
  'order_created_title' => 'تم إنشاء الطلب',
  'order_created_message' => 'تم إنشاء طلبك بنجاح.',
  'order_created_cod_title' => 'تم إنشاء طلب الدفع - الدفع عند الاستلام',
  'order_created_cod_message' => '.سيتم الدفع عند الاستلام.',
  'payment_status_updated' => 'تم تحديث حالة الدفع بنجاح.',
  'payment_already_initiated_title' => 'تم بالفعل بدء الدفع',
  'payment_already_initiated' => 'تم بالفعل بدء الدفع لهذا الطلب.',
  'order_status_updated' => 'تم تحديث حالة الطلب بنجاح.',
  'pdf_uploaded' => 'تم رفع ملف PDF بنجاح.',
  'pdf_not_found' => 'ملف PDF غير موجود.',
  'notification_sent' => 'تم إرسال الإشعار بنجاح.',

  // Email Settings Responses
  'email_settings_updated_title' => 'تم تحديث إعدادات البريد الإلكتروني',
  'email_settings_updated_message' => 'تم تحديث إعدادات البريد الإلكتروني بنجاح.',

  // Customer Feedback Responses
  'customer_feedback_created_title' => 'تم إنشاء تعليق العميل',
  'customer_feedback_created_message' => 'تم إنشاء تعليق العميل بنجاح.',
  'customer_feedback_updated_title' => 'تم تحديث تعليق العميل',
  'customer_feedback_updated_message' => 'تم تحديث تعليق العميل بنجاح.',
  'customer_feedback_deleted_title' => 'تم حذف تعليق العميل',
  'customer_feedback_deleted_message' => 'تم حذف تعليق العميل بنجاح.',
  'customer_feedbacks_bulk_deleted_title' => 'تم حذف تعليقات العملاء',
  'customer_feedbacks_bulk_deleted_message' => 'تم حذف تعليقات العملاء المحددة بنجاح.',

  // Payment Responses
  'payment_already_completed' => 'تم إكمال الدفع لهذا الطلب بالفعل.',
  'payment_already_completed_title' => 'تم إكمال الدفع بالفعل',
  'payment_failed' => 'فشل الدفع. يرجى المحاولة مرة أخرى.',
  'payment_methods_not_configured' => 'طرق الدفع غير مكونة. يرجى التواصل مع الدعم.',
  'payment_successful_title' => 'تم الدفع بنجاح',
  'payment_successful_message' => 'تم معالجة الدفع بنجاح.',
  'payment_pending_title' => 'الدفع معلق',
  'payment_pending_message' => 'جارٍ معالجة الدفع الخاص بك.',
  'payment_error_title' => 'خطأ في الدفع',
  'payment_already_initiated_title' => 'تم بدء الدفع بالفعل',
  'payment_already_initiated' => 'تم بدء الدفع لهذا الطلب بالفعل.',

  // Cart Responses
  'item_added_to_cart_title' => 'تمت إضافة العنصر للسلة',
  'item_added_to_cart_message' => 'تمت إضافة القصة لسلتك بنجاح.',
  'failed_to_add_to_cart' => 'فشل في إضافة القصة للسلة. يرجى المحاولة مرة أخرى.',
  'item_removed_title' => 'تم إزالة العنصر',
  'item_removed_message' => 'تم إزالة العنصر من سلتك.',
  'cart_cleared_title' => 'تم إفراغ السلة',
  'cart_cleared_message' => 'تم إفراغ سلتك بنجاح.',
  'cart_updated_title' => 'تم تحديث السلة',
  'cart_updated_message' => 'تم تحديث سلتك بنجاح.',
  'already_paid_title' => 'مدفوع بالفعل',
  'already_paid_message' => 'تم دفع هذا الطلب بالفعل.',


];
