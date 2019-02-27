# react-i18next-loader

## Usage

```json
// App.i18n
{
  "message": {
    "text": {
      "en": "Field",
      "de": "Feld"
    }
  }
}
```

```js
// App.jsx
import React from 'react'
import { useTranslation } from './App.i18n'

export const App = () => {
  const { t } = useTranslation()
  return (
    <div>{t('message.text')}</div>
  )
}
```

## Configuration

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.i18n$/,
        use: [{ loader: '@choffmeister/react-i18next-loader' }],
      },
    ],
  },
}
```

```js
// lib.d.ts
declare module '*.i18n' {
  import { UseTranslationResponse } from 'react-i18next'
  export const namespace: string
  export const translations: any
  export const useTranslation: () => UseTranslationResponse
}
```
