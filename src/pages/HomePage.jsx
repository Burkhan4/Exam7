// src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import productService from "../service/product.service";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Backend rasmdagi parametrlarga moslashtirdim
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page: 1,
        limit: 20,
        sort: "newest",
      };

      const data = await productService.getProducts(params);

      // Backend javobi { data: [...] } shaklida keladi
      setProducts(data.data || data.products || []);

      console.log("Mahsulotlar soni:", (data.data || []).length);
    } catch (err) {
      console.error("Fetch xatolik:", err);
      setError("Mahsulotlarni yuklashda xatolik yuz berdi: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <section className="py-10 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
          Yangi Mahsulotlar
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Eng so'nggi va eng yaxshi narxdagi mahsulotlar
        </p>

        {products.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-xl">
            Hozircha mahsulotlar topilmadi
          </div>
        ) : (
          <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* Rasm qismi */}
                <div className="h-56 bg-gray-100 relative overflow-hidden">
                  <img
                    src={
                      product.image_url ||
                      product.main_variant?.image_url ||
                      "https://placehold.co/600x400?text=Rasm+yo'q"
                    }
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/600x400?text=Rasm+yo'q";
                    }}
                  />
                </div>

                {/* Ma'lumotlar */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800 line-clamp-2 min-h-[3.5rem]">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-2xl font-bold text-blue-600">
                      {product.price?.toLocaleString()} so'm
                    </span>
                    {product.old_price && (
                      <span className="text-sm text-gray-400 line-through">
                        {product.old_price.toLocaleString()} so'm
                      </span>
                    )}
                  </div>

                  {product.category && (
                    <p className="text-sm text-gray-500 mt-1">
                      {product.category.name}
                    </p>
                  )}

                  {/* Savatga qo'shish tugmasi */}
                  <button
                    onClick={() => alert(`${product.name} savatga qo'shildi!`)}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <span>Savatga qo'shish</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomePage;
