export default function OrderItemPDF({ item, t }) {
  if (!item.pdf_path) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-hourglass-half text-yellow-600"></i>
          <span className="text-sm dark:text-white">{t('pdf_processing')}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="dark:text-white bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
      <h4 className="font-semibold mb-3 flex items-center gap-2">
        <i className="fa-solid fa-file-pdf text-red-500"></i>
        {t('your_story_pdf')}
      </h4>
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-check-circle text-green-600"></i>
          <span className="text-sm">{t('pdf_ready')}</span>
        </div>
        <a
          href={`/storage/${item.pdf_path}`}
          target="_blank"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold text-sm flex items-center gap-2"
        >
          <i className="fa-solid fa-download"></i>
          {t('download_pdf')}
        </a>
      </div>
    </div>
  );
}
