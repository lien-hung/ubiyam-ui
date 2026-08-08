import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import './index.css'
import { HomePage, Layout, ProductPage, AdminProductsPage } from './pages'
import { RouterProvider } from 'react-router/dom'

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "/products/ube-powder-purple-yam", Component: ProductPage },
      { path: "/admin/products", Component: AdminProductsPage }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
