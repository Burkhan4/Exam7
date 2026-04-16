import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import productService from "../service/product.service";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getProductById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  const { data: popularProducts } = useQuery({
    queryKey: ["popular-products"],
    queryFn: () =>
      productService.getProducts({ page: 1, limit: 4, sort: "newest" }),
    staleTime: 1000 * 60 * 5,
  });

  const mainVariant = useMemo(() => {
    if (!product) return null;
    return (
      product.main_variant || (product.variants && product.variants[0]) || null
    );
  }, [product]);

  const productDescription =
    product?.description || "No description available for this product.";
  const price = mainVariant?.price ?? 0;
  const oldPrice = mainVariant?.old_price;
  const stock = mainVariant?.stock ?? 0;
  const weight = mainVariant?.weight;
  const weightUnit = mainVariant?.weight_unit;

  const variantId =
    mainVariant?.id ??
    mainVariant?.variant_id ??
    product?.variants?.[0]?.id ??
    product?.variants?.[0]?.variant_id ??
    1;

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    if (!product || quantity < 1) return;

    const cartItem = {
      id: product.id,
      variant_id: variantId,
      name: product.name,
      brand: product.brand,
      image_url: product.image_url,
      price,
      old_price: oldPrice,
      quantity,
      stock,
    };

    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = savedCart.findIndex(
      (item) => item.id === cartItem.id,
    );

    if (existingIndex >= 0) {
      savedCart[existingIndex].quantity += quantity;
    } else {
      savedCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(savedCart));
    navigate("/cart", { state: { item: cartItem } });
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center text-[#6B7280]">
        Loading product details...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 text-center text-[#EF4444]">
        {error?.message || "Failed to load product details."}
      </div>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <div className="mb-6">
          <Link
            to="/"
            className="text-[#3BB77E] hover:text-[#2a8b5e] font-semibold"
          >
            ← Back to shop
          </Link>
        </div>

        <div className="grid grid-cols-1 desktop:grid-cols-[420px_minmax(0,1fr)] gap-10">
          <div className="rounded-[30px] overflow-hidden bg-white">
            <img
              src={product?.image_url || "/img/placeholder.png"}
              alt={product?.name}
              className="w-full h-[560px] object-cover"
            />
          </div>

          <div className="space-y-8">
            <div className="rounded-[30px] bg-white p-8">
              <span className="text-[#3BB77E] text-[12px] uppercase tracking-[0.25em] font-bold">
                {product?.brand || "Brand"}
              </span>
              <h1 className="text-[#1F2937] text-[36px] tablet:text-[42px] font-extrabold mt-5 mb-5">
                {product?.name}
              </h1>
              <p className="text-[#6B7280] text-[16px] leading-relaxed">
                {productDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-6">
                <div className="flex items-center gap-2 text-[#FDC040] text-[16px] font-semibold">
                  <span>★★★★★</span>
                  <span className="text-[#9CA3AF] text-[14px]">
                    (75 Reviews)
                  </span>
                </div>
                <div className="text-[#9CA3AF] text-[14px]">
                  In stock: {stock}
                </div>
              </div>

              <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 mt-8">
                <div className="rounded-[20px] bg-[#F8FAFC] p-5">
                  <p className="text-[#6B7280] text-[14px] uppercase tracking-[0.2em] mb-3">
                    Brand
                  </p>
                  <p className="text-[#111827] font-semibold">
                    {product?.brand || "Foodze"}
                  </p>
                </div>
                <div className="rounded-[20px] bg-[#F8FAFC] p-5">
                  <p className="text-[#6B7280] text-[14px] uppercase tracking-[0.2em] mb-3">
                    Weight
                  </p>
                  <p className="text-[#111827] font-semibold">
                    {weight ? `${weight}${weightUnit || ""}` : "0 kg"}
                  </p>
                </div>
                <div className="rounded-[20px] bg-[#F8FAFC] p-5">
                  <p className="text-[#6B7280] text-[14px] uppercase tracking-[0.2em] mb-3">
                    Speciality
                  </p>
                  <p className="text-[#111827] font-semibold">
                    Gluten Free, Sugar Free
                  </p>
                </div>
                <div className="rounded-[20px] bg-[#F8FAFC] p-5">
                  <p className="text-[#6B7280] text-[14px] uppercase tracking-[0.2em] mb-3">
                    Items
                  </p>
                  <p className="text-[#111827] font-semibold">{stock} pcs</p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-6 tablet:flex-row tablet:items-end tablet:justify-between">
                <div className="space-y-2">
                  <div className="text-[#111827] text-[38px] font-bold">
                    ${price.toFixed(2)}
                  </div>
                  {oldPrice && (
                    <div className="text-[#9CA3AF] text-[16px] line-through">
                      ${oldPrice.toFixed(2)}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {["50g", "80g", "100g", "250g"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className="rounded-[14px] border border-[#E5E7EB] bg-white py-3 px-4 text-[14px] font-semibold text-[#374151] hover:border-[#3BB77E] hover:text-[#111827] transition"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid gap-4 tablet:grid-cols-[1fr_auto]">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(-1)}
                    className="h-12 w-12 rounded-full bg-[#F2F3F4] text-[#374151] text-[22px]"
                  >
                    −
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-20 rounded-[14px] border border-[#E5E7EB] bg-white text-center text-[16px] font-semibold text-[#111827]"
                  />
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(1)}
                    className="h-12 w-12 rounded-full bg-[#3BB77E] text-white text-[22px]"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="rounded-[20px] bg-[#F53E32] px-8 py-4 text-[16px] font-bold text-white shadow-lg shadow-[#F53E3220] hover:bg-[#e12215] transition"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-[30px] bg-white p-8">
          <div className="flex flex-wrap gap-4 border-b pb-4">
            {[
              { id: "description", label: "Description" },
              { id: "information", label: "Information" },
              { id: "review", label: "Review" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-5 py-3 text-[15px] font-semibold transition ${
                  activeTab === tab.id
                    ? "bg-[#3BB77E] text-white shadow-lg"
                    : "text-[#6B7280] bg-[#F8FAFC] hover:bg-[#E5E7EB]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="pt-6 text-[#4B5563] text-[15px] leading-relaxed space-y-6">
            {activeTab === "description" && <p>{productDescription}</p>}

            {activeTab === "information" && (
              <div className="grid gap-4 tablet:grid-cols-2">
                <div className="rounded-[20px] bg-[#F8FAFC] p-6">
                  <h3 className="text-[#111827] font-bold mb-3">
                    Product Details
                  </h3>
                  <p>Brand: {product?.brand || "Foodze"}</p>
                  <p>Weight: {weight ? `${weight}${weightUnit || ""}` : "—"}</p>
                  <p>Stock: {stock} pcs</p>
                </div>
                <div className="rounded-[20px] bg-[#F8FAFC] p-6">
                  <h3 className="text-[#111827] font-bold mb-3">
                    Packaging & Delivery
                  </h3>
                  <p>
                    Product is carefully packaged and delivered fresh. Delivery
                    time may vary depending on your location.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "review" && (
              <div className="space-y-6">
                <div className="rounded-[20px] bg-[#F8FAFC] p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[#111827] text-[16px] font-bold">
                        Good product
                      </p>
                      <p className="text-[#6B7280] text-[14px]">
                        by Anna, 2 weeks ago
                      </p>
                    </div>
                    <span className="text-[#FDC040]">★★★★★</span>
                  </div>
                  <p>
                    The taste is excellent and the packaging was secure. I would
                    definitely order again.
                  </p>
                </div>
                <div className="rounded-[20px] bg-[#F8FAFC] p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[#111827] text-[16px] font-bold">
                        Fresh & tasty
                      </p>
                      <p className="text-[#6B7280] text-[14px]">
                        by Mark, 1 month ago
                      </p>
                    </div>
                    <span className="text-[#FDC040]">★★★★★</span>
                  </div>
                  <p>
                    Excellent choice for a quick meal. The product arrived in
                    perfect condition and had great flavor.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 rounded-[30px] bg-white p-8">
          <div className="flex flex-col gap-4 tablet:flex-row tablet:items-end tablet:justify-between mb-8">
            <div>
              <h2 className="text-[#111827] text-[32px] font-bold">
                Popular Products
              </h2>
              <p className="text-[#6B7280] text-[15px] max-w-2xl mt-2">
                Discover trending products with the latest pricing and images.
              </p>
            </div>
            <Link
              className="text-[#3BB77E] font-semibold hover:text-[#2a8b5e]"
              to="/"
            >
              Back to home
            </Link>
          </div>

          <div className="grid gap-5 tablet:grid-cols-2 desktop:grid-cols-4">
            {popularProducts?.data?.map((item) => (
              <Link
                key={item.id}
                to={`/products/${item.id}`}
                className="rounded-[25px] border border-[#E5E7EB] bg-[#FAFBFC] p-5 transition hover:shadow-[0px_16px_40px_rgba(0,0,0,0.08)]"
              >
                <div className="mb-5 overflow-hidden rounded-[22px] bg-white">
                  <img
                    src={item.image_url || "/img/placeholder.png"}
                    alt={item.name}
                    className="h-48 w-full object-cover"
                  />
                </div>
                <p className="text-[#6B7280] text-[13px] uppercase tracking-[0.2em] mb-2">
                  {item.brand || "Brand"}
                </p>
                <h3 className="text-[#111827] text-[18px] font-bold mb-3 line-clamp-2">
                  {item.name}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-[#3BB77E] text-[18px] font-bold">
                    $
                    {item.main_variant?.price?.toFixed(2) ??
                      item.min_price?.toFixed(2) ??
                      "0.00"}
                  </span>
                  {item.main_variant?.old_price && (
                    <span className="text-[#9CA3AF] text-[14px] line-through">
                      ${item.main_variant.old_price.toFixed(2)}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;
