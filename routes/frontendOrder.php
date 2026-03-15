<?php

use App\Http\Controllers\Frontend\Order\OrderController;
use App\Http\Controllers\Frontend\Cart\CartController;
use App\Http\Controllers\Frontend\PaymentGateways\PaymobController;
use App\Http\Controllers\Frontend\PaymentGateways\StripeController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:user'])->group(function () {
  // Order creation routes
  Route::get('/create-order', [OrderController::class, 'create'])->name('frontend.order.create');
  Route::post('/order/store', [OrderController::class, 'store'])->name('frontend.order.store');

  // Cart routes
  Route::get('/cart', [CartController::class, 'getCart'])->name('cart.index');
  Route::get('/cart/{cartItem}', [CartController::class, 'showCartItem'])->name('cart.show');
  Route::post('/cart/add', [CartController::class, 'addToCart'])->name('cart.add');
  Route::get('/cart/count', [CartController::class, 'getCartCount'])->name('cart.count');
  Route::delete('/cart/{cartItemId}', [CartController::class, 'removeFromCart'])->name('cart.remove');
  Route::delete('/cart', [CartController::class, 'clearCart'])->name('cart.clear');
  Route::get('/cart-checkout', [CartController::class, 'proceedToPayment'])->name('cart.proceedToPayment');
  Route::post('/cart/validate-discount', [CartController::class, 'validateDiscount'])->name('cart.validateDiscount');

  // Payment routes
  Route::get('/orders/{order}/continue-payment', [OrderController::class, 'continuePayment'])->name('frontend.order.continuePayment');

  // NEW: Separated payment processing routes
  Route::post('/orders/process-payment', [OrderController::class, 'processPayment'])->name('frontend.order.processPayment');
  Route::post('/orders/{order}/process-payment', [OrderController::class, 'processExistingOrderPayment'])->name('frontend.order.processPayment.old');

  // Payment gateway callback routes
  Route::get('/payment/paymob/success/{order?}', [PaymobController::class, 'success'])->name('frontend.payment.success');
  Route::get('/payment/paymob/failed/{order?}', [PaymobController::class, 'failure'])->name('frontend.payment.failed');
  Route::get('/payment/stripe/success/{order}', [StripeController::class, 'success'])->name('frontend.stripe.payment.success');
  Route::get('/payment/stripe/failed/{order}', [StripeController::class, 'failure'])->name('frontend.stripe.payment.failed');
});
