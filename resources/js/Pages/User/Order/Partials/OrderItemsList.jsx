import OrderItem from './OrderItem';

export default function OrderItemsList({ order, t }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
        <i className="fa-solid fa-box-open text-orange-500"></i>
        {t('your_stories')} ({order.order_items.length})
      </h2>
      {order.order_items.map((item, index) => (
        <OrderItem
          key={item.id}
          item={item}
          index={index}
          t={t}
        />
      ))}
    </div>
  );
}
