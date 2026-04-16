import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminPanel from './pages/AdminPanel';   // ← Yangi qo'shamiz
import ProductListPage from './pages/ProductListPage';
import AboutUsPage from './pages/AboutUsPage';
import BlogPage from './pages/BlogPage';
import FaqPage from './pages/FaqPage';
import CardPage from './pages/CardPage';
import CheckOutPage from './pages/CheckOutPage';

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
                path: "products/category/:category_id",
                element: <ProductListPage />,
            },
            {
                path: "products",
                element: <ProductListPage />,
            },
            {
                path: "about",
                element: <AboutUsPage />,
            },
            {
                path: "blog",
                element: <BlogPage />,
            },
            {
                path: "faq",
                element: <FaqPage />,
            },
            {
                path: "cart",
                element: <CardPage />,
            },
            {
                path: "checkout",
                element: <CheckOutPage />,
            },
            {
                path: "admin",           // ← Admin panel yo'li
                element: <AdminPanel />,
            },
        ],
    },
])

export default router;