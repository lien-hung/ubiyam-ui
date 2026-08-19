import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import './index.css'
import {
  AboutPage,
  AdminBundlesPage,
  AdminProductsPage,
  CartPage,
  HomePage,
  Layout,
  ProductPage,
} from './pages'
import store from './store/store'

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "/cart", Component: CartPage },
      { path: "/products/:slug", Component: ProductPage },
      { path: "/pages/about-ubiyam", Component: AboutPage },
      {
        path: "admin",
        children: [
          { path: "products", Component: AdminProductsPage },
          { path: "bundles", Component: AdminBundlesPage },
        ],
      },
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
