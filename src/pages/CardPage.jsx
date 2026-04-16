import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import productService from "../service/product.service";

const CardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  const { data: popularProducts } = useQuery({
    queryKey: ["popular-products"],
    queryFn: () => productService.getProducts({ page: 1, limit: 4, sort: "newest" }),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    const newItem = location.state?.item;
    if (!newItem) return;

    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === newItem.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        );
      }
      return [...prevItems, newItem];
    });
  }, [location.state]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 0), 0),
    [cartItems],
  );

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate("/checkout", { state: { cartItems, total } });
  };

  if (cartItems.length === 0) {
    return (
      <section className="py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-[#1F2937] text-[32px] font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-[#6B7280] mb-8">Add a product from the product page to see it here.</p>
          <Link to="/" className="inline-block rounded-[20px] bg-[#3BB77E] px-8 py-4 text-white font-bold hover:bg-[#2a8b5e] transition">
            Back to Shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto">
        <h1 className="text-[#111827] text-[32px] font-bold mb-8">Shopping Cart</h1>

        <div className="grid gap-8 desktop:grid-cols-[1fr_350px]">
          {/* Cart Items */}
          <div>
            <div className="hidden tablet:grid tablet:grid-cols-[2fr_1fr_1fr_1fr_80px] gap-4 pb-4 border-b border-[#E5E7EB] font-bold text-[#111827]">
              <div>Product</div>
              <div className="text-center">Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-center">Total</div>
              <div className="text-center">Action</div>
            </div>

            <div className="space-y-4 mt-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col tablet:grid tablet:grid-cols-[2fr_1fr_1fr_1fr_80px] gap-4 p-4 tablet:p-0 bg-[#FAFBFC] tablet:bg-transparent rounded-[15px] tablet:rounded-none tablet:border-b tablet:border-[#E5E7EB]">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image_url || "/img/placeholder.png"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-[10px]"
                    />
                    <div>
                      <p className="text-[#111827] font-bold text-[14px]">{item.name}</p>
                      <p className="text-[#6B7280] text-[12px]">{item.brand}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="tablet:hidden text-[#6B7280] text-[12px]">Price: </span>
                    <p className="text-[#111827] font-bold">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="text-center">
                    <span className="tablet:hidden text-[#6B7280] text-[12px]">Quantity: </span>
                    <p className="text-[#111827] font-bold">{item.quantity}</p>
                  </div>
                  <div className="text-center">
                    <span className="tablet:hidden text-[#6B7280] text-[12px]">Total: </span>
                    <p className="text-[#111827] font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="text-[#F53E32] hover:text-[#e12215] transition text-[20px]"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Link to="/" className="text-[#3BB77E] font-semibold hover:text-[#2a8b5e]">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Summary */}
          <div className="rounded-[20px] bg-[#F8FAFC] p-6 h-fit sticky top-20">
            <h3 className="text-[#111827] text-[20px] font-bold mb-6">Summary</h3>
            <div className="space-y-4 pb-4 border-b border-[#E5E7EB]">
              <div className="flex justify-between text-[#6B7280]">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#6B7280]">
                <span>Delivery Charges</span>
                <span>$0.00</span>
              </div>
            </div>
            <div className="flex justify-between text-[#111827] font-bold text-[18px] mt-4 mb-6">
              <span>Total Amount</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full rounded-[10px] bg-[#F53E32] px-4 py-3 text-white font-bold hover:bg-[#e12215] transition"
            >
              Check Out
            </button>
          </div>
        </div>

        {/* Popular Products */}
        <div className="mt-16 rounded-[30px] bg-white p-8">
          <div className="flex flex-col gap-4 tablet:flex-row tablet:items-end tablet:justify-between mb-8">
            <div>
              <h2 className="text-[#111827] text-[32px] font-bold">Popular Products</h2>
              <p className="text-[#6B7280] text-[15px] max-w-2xl mt-2">
                Discover trending products with the latest pricing and images.
              </p>
            </div>
            <Link className="text-[#3BB77E] font-semibold hover:text-[#2a8b5e]" to="/">
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
                    ${item.main_variant?.price?.toFixed(2) ?? item.min_price?.toFixed(2) ?? "0.00"}
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

export default CardPage;
