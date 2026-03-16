export function useTrans() {
  const translations = window.translations || {}

  function t(key, replacements = {}) {
    let value = translations[key] || key
    Object.entries(replacements).forEach(([k, v]) => {
      value = value.replace(`:${k}`, v)
    })
    // Decode escaped newline sequences coming from translation payloads.
    return value.replace(/\\r\\n|\\n|\\r/g, '\n')
  }

  return { t }
}
