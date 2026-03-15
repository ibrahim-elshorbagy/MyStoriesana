import React, { useState } from 'react'
import { router } from '@inertiajs/react'
import DragFileInput from '@/Components/DragFileInput'
import SelectInput from '@/Components/SelectInput'

export default function UploadPDF({ orderItem, t }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [loadingUpload, setLoadingUpload] = useState(false)
  const [loadingNotify, setLoadingNotify] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('en')

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'العربية' },
    { value: 'de', label: 'Deutsch' },

  ]

  const handleFileSelect = (file) => {
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUpload = () => {
    if (!selectedFile) return

    const formData = new FormData()
    formData.append('pdf_file', selectedFile)

    setLoadingUpload(true)
    router.post(route('admin.orders.upload-pdf', orderItem.id), formData, {
      onFinish: () => setLoadingUpload(false),
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onSuccess: () => {
        setSelectedFile(null)
      }
    })
  }

  const handleNotify = () => {
    setLoadingNotify(true)
    router.post(route('admin.orders.notify-pdf', orderItem.id), {
      locale: selectedLanguage,
    }, {
      onFinish: () => setLoadingNotify(false),
    })
  }

  return (
    <div className="bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-700 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">{t('upload_story_pdf')}</h3>

      <div className="space-y-4">

        {orderItem.pdf_path && (
          <>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <i className="fas fa-file-pdf text-green-600 dark:text-green-400 mx-2"></i>
                  <span className="text-green-800 dark:text-green-200">{t('pdf_uploaded')}</span>
                </div>
                <a
                  href={`/storage/${orderItem.pdf_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800 transition-colors duration-200"
                >
                  <i className="fa fa-external-link-alt mr-1"></i>
                  {t('view_pdf')}
                </a>
              </div>
            </div>
          </>
        )}

        <DragFileInput
          id="pdf_file"
          label={t('select_pdf_file')}
          accept=".pdf"
          onChange={handleFileSelect}
          helperText={t('pdf_upload_helper')}
          disabled={loadingUpload}
        />

        {selectedFile && (
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            {t('selected_file')}: {selectedFile.name}
          </div>
        )}

        <SelectInput
          name="language"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          options={languageOptions}
          label="Language"
        />

        <div className="flex gap-2">
          <button
            onClick={handleUpload}
            disabled={loadingUpload || !selectedFile}
            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50"
          >
            {loadingUpload ? t('uploading') : t('update_pdf')}
          </button>

          <button
            onClick={handleNotify}
            disabled={loadingNotify || !orderItem.pdf_path}
            className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50"
          >
            {loadingNotify ? t('sending') : t('notify_user_pdf')}
          </button>
        </div>
      </div>
    </div>
  )
}
