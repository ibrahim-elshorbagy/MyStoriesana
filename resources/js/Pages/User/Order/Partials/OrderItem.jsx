import OrderItemDetails from '@/Pages/Admin/Order/Partials/OrderItemDetails';
import OrderItemPDF from './OrderItemPDF';

export default function OrderItem({ item, index, t }) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-neutral-900 dark:to-neutral-800 border border-blue-200 dark:border-neutral-700 rounded-2xl p-8 shadow-lg">
      {/* Item Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold flex items-center gap-3 text-neutral-900 dark:text-neutral-100">
          <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
            {index + 1}
          </span>
          {t('child_story', {name: item.child_name})}
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Item Details */}
        <OrderItemDetails item={item} t={t} />

        {/* Right: PDF Download */}
        <div className="space-y-4">
          {/* PDF Download */}
          <OrderItemPDF item={item} t={t} />
        </div>
      </div>
    </div>
  );
}
