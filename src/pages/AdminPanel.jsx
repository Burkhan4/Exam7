import { useState, useEffect } from "react";
import productService from "../service/product.service";

const AdminPanel = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        brand: "",
        category_id: "",
        image_url: "",
        variants: [
            {
                sku: "",
                price: "",
                old_price: "",
                stock: "",
                weight: "0.8",
                weight_unit: "kr",
            }
        ]
    });

    // Barcha mahsulotlarni yuklash
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await productService.getProducts({ page: 1, limit: 100 });
            setProducts(data.data || []);
        } catch (err) {
            console.error(err);
            setErrorMessage("Mahsulotlarni yuklashda xatolik yuz berdi");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Form input o'zgarishi
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Variant input o'zgarishi
    const handleVariantChange = (field, value) => {
        const newVariants = [...formData.variants];
        newVariants[0][field] = value;
        setFormData(prev => ({ ...prev, variants: newVariants }));
    };

    // Yangi mahsulot qo'shish
    const handleAddProduct = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");

        const payload = {
            name: formData.name,
            description: formData.description || "",
            brand: formData.brand || "",
            category_id: Number(formData.category_id),
            image_url: formData.image_url || null,
            variants: formData.variants.map(v => ({
                sku: v.sku || `SKU-${Date.now()}`,
                price: Number(v.price),
                old_price: v.old_price ? Number(v.old_price) : null,
                stock: Number(v.stock),
                weight: Number(v.weight) || 0.8,
                weight_unit: v.weight_unit || "kr",
            }))
        };

        try {
            await productService.api.post("/products", payload);
            setSuccessMessage("✅ Mahsulot muvaffaqiyatli qo'shildi!");

            // Formani tozalash
            setFormData({
                name: "", description: "", brand: "", category_id: "", image_url: "",
                variants: [{ sku: "", price: "", old_price: "", stock: "", weight: "0.8", weight_unit: "kr" }]
            });

            fetchProducts();
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.message || err.message;
            setErrorMessage(`❌ Xatolik: ${msg}`);
        }
    };

    // Mahsulotni o'chirish
    const handleDelete = async (id) => {
        if (!window.confirm("Bu mahsulotni rostdan ham o'chirmoqchimisiz?")) return;

        try {
            await productService.api.delete(`/products/${id}`);
            setSuccessMessage("✅ Mahsulot muvaffaqiyatli o'chirildi!");
            fetchProducts();
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.message || err.message;
            setErrorMessage(`❌ O'chirishda xatolik: ${msg}`);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Admin Panel</h1>

            {/* Xabarlar */}
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-2xl mb-6">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-2xl mb-6">
                    {errorMessage}
                </div>
            )}

            {/* Yangi Mahsulot Qo'shish */}
            <div className="bg-white p-8 rounded-3xl shadow-xl mb-12">
                <h2 className="text-2xl font-semibold mb-8">Yangi Mahsulot Qo'shish</h2>

                <form onSubmit={handleAddProduct} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Mahsulot nomi *"
                            required
                            className="border p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            placeholder="Brend nomi"
                            className="border p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="number"
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            placeholder="Category ID *"
                            required
                            className="border p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            name="image_url"
                            value={formData.image_url}
                            onChange={handleChange}
                            placeholder="Rasm URL"
                            className="border p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Mahsulot tavsifi"
                        rows="3"
                        className="w-full border p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Variant */}
                    <div className="border p-6 rounded-2xl bg-gray-50">
                        <h3 className="font-medium mb-4">Variant ma'lumotlari</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                type="number"
                                placeholder="Narxi *"
                                value={formData.variants[0].price}
                                onChange={(e) => handleVariantChange("price", e.target.value)}
                                required
                                className="border p-4 rounded-2xl"
                            />
                            <input
                                type="number"
                                placeholder="Eski narxi"
                                value={formData.variants[0].old_price}
                                onChange={(e) => handleVariantChange("old_price", e.target.value)}
                                className="border p-4 rounded-2xl"
                            />
                            <input
                                type="number"
                                placeholder="Ombordagi soni *"
                                value={formData.variants[0].stock}
                                onChange={(e) => handleVariantChange("stock", e.target.value)}
                                required
                                className="border p-4 rounded-2xl"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-5 rounded-3xl text-lg transition"
                    >
                        Mahsulotni Qo'shish
                    </button>
                </form>
            </div>

            {/* Mahsulotlar Ro'yxati + Delete */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Barcha Mahsulotlar ({products.length})</h2>
                    <button
                        onClick={fetchProducts}
                        className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                    >
                        Yangilash
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-full">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-4 text-left">ID</th>
                                <th className="p-4 text-left">Nomi</th>
                                <th className="p-4 text-left">Narxi</th>
                                <th className="p-4 text-left">Brand</th>
                                <th className="p-4 text-center">Amallar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="border-t hover:bg-gray-50">
                                    <td className="p-4 font-medium">{product.id}</td>
                                    <td className="p-4">{product.name}</td>
                                    <td className="p-4">
                                        {product.main_variant?.price?.toLocaleString() || product.min_price} so'm
                                    </td>
                                    <td className="p-4">{product.brand || "-"}</td>
                                    <td className="p-4 text-center">
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl text-sm transition"
                                        >
                                            O'chirish
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;