import OrderItemDetails from './OrderItemDetails';
import UploadPDF from './Pages/Partials/UploadPDF';

export default function OrderItem({ item, index, t }) {
  return (
    <div className="bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-700 rounded-lg p-8 shadow-sm">
      {/* Item Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-3 text-neutral-900 dark:text-neutral-100">
          <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {index + 1}
          </span>
          {t('child_story', {name: item.child_name})}
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Item Details */}
        <OrderItemDetails item={item} t={t} />

        {/* Right: PDF Upload */}
        <div className="space-y-4">
          {/* PDF Upload per Item */}
          <UploadPDF orderItem={item} t={t} />
        </div>
      </div>
    </div>
  );
}
