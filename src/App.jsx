import { useEffect, useState } from 'react'
import productService from './service/product.service'
import { RouterProvider } from 'react-router-dom'
import router from './router'

function App() {
  return (
      <RouterProvider router={router} />
  )
}

export default App
