import React from 'react'
import { IdProvider } from '@radix-ui/react-id'

export const wrapRootElement = ({ element }) => {
  return <IdProvider>{element}</IdProvider>
}
