import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminPanel from './pages/AdminPanel';   // ← Yangi qo'shamiz

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "products/:id",
                element: <ProductDetailPage />,
            },
            {
                path: "admin",           // ← Admin panel yo'li
                element: <AdminPanel />,
            },
        ],
    },
])

export default router;