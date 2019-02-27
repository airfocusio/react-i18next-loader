declare module '*.i18n' {
  import { UseTranslationResponse } from 'react-i18next'
  export const namespace: string
  export const translations: any
  export const useTranslation: () => UseTranslationResponse
}
