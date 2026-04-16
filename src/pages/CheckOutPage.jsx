import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import productService from "../service/product.service";

const validationSchema = Yup.object().shape({
  customer_name: Yup.string().required("Full name is required"),
  phone: Yup.string().required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  comment: Yup.string(),
});

const CheckOutPage = () => {
  const navigate = useNavigate();
  const state = useLocation().state || { cartItems: [], total: 0 };
  const { cartItems = [], total = 0 } = state;

  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      customer_name: "",
      phone: "",
      email: "",
      comment: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log("📤 Sending payload:", values);

        const preparedItems = await Promise.all(
          cartItems.map(async (item) => {
            if (item.variant_id) {
              return {
                product_id: Number(item.id),
                variant_id: Number(item.variant_id),
                quantity: Number(item.quantity),
              };
            }

            const productData = await productService.getProductById(item.id);
            const fallbackVariantId =
              productData?.main_variant?.id ??
              productData?.main_variant?.variant_id ??
              productData?.variants?.[0]?.id ??
              productData?.variants?.[0]?.variant_id;

            if (!fallbackVariantId) {
              throw new Error(`Unable to resolve variant for product ${item.id}`);
            }

            return {
              product_id: Number(item.id),
              variant_id: Number(fallbackVariantId),
              quantity: Number(item.quantity),
            };
          }),
        );

        const orderPayload = {
          customer_name: values.customer_name,
          phone: values.phone,
          email: values.email,
          comment: values.comment,
          items: preparedItems,
        };

        console.log("📤 Full order payload:", JSON.stringify(orderPayload, null, 2));

        const response = await productService.createOrder(orderPayload);
        console.log("✅ Order created successfully:", response);

        localStorage.removeItem("cart");
        setOrderSuccess(true);
        setOrderMessage("Ваш заказ принят! Спасибо за покупку.");
      } catch (err) {
        console.error("❌ Order error:", err);
        const serverError = err.response?.data?.message || err.response?.data || err.message;
        formik.setStatus({ error: serverError || "Failed to place order. Please try again." });
      }
    },
  });

  if (cartItems.length === 0) {
    return (
      <section className="py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-[#111827] text-[32px] font-bold mb-4">No items to checkout</h1>
          <Link to="/" className="inline-block rounded-[20px] bg-[#3BB77E] px-8 py-4 text-white font-bold hover:bg-[#2a8b5e] transition">
            Back to Shop
          </Link>
        </div>
      </section>
    );
  }

  if (orderSuccess) {
    return (
      <section className="py-12 bg-[#F8FFEF]">
        <div className="container mx-auto max-w-3xl text-center rounded-[30px] bg-white p-10 shadow-[0px_20px_50px_rgba(0,0,0,0.08)]">
          <div className="mb-6 inline-flex items-center rounded-full bg-[#D1FAE5] px-4 py-2 text-[#065F46] text-[15px] font-semibold">
            Заказ принят
          </div>
          <h1 className="text-[#111827] text-[32px] font-bold mb-4">Спасибо за покупку!</h1>
          <p className="text-[#6B7280] text-[16px] mb-8">
            {orderMessage}
          </p>
          <div className="flex flex-col tablet:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="rounded-[15px] bg-[#3BB77E] px-8 py-4 text-white font-bold hover:bg-[#2a8b5e] transition"
            >
              Вернуться на главную
            </Link>
            <Link
              to="/products/category/5"
              className="rounded-[15px] border border-[#3BB77E] px-8 py-4 text-[#3BB77E] font-bold hover:bg-[#F0FDF4] transition"
            >
              Смотреть ещё товары
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto">
        <h1 className="text-[#111827] text-[32px] font-bold mb-8">Checkout</h1>

        <div className="grid gap-8 desktop:grid-cols-[1fr_400px]">
          {/* Checkout Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {formik.status?.error && (
              <div className="rounded-[10px] bg-[#FEE2E2] p-4 text-[#DC2626]">
                {formik.status.error}
              </div>
            )}

            {/* Contact Information */}
            <div className="rounded-[20px] bg-[#F8FAFC] p-6">
              <h2 className="text-[#111827] text-[20px] font-bold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-[#111827] text-[14px] font-semibold mb-2 block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="customer_name"
                    value={formik.values.customer_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-[10px] border border-[#E5E7EB] px-4 py-3 text-[#111827] placeholder-[#9CA3AF]"
                    placeholder="Enter your full name"
                  />
                  {formik.touched.customer_name && formik.errors.customer_name && (
                    <p className="text-[#DC2626] text-[12px] mt-1">{formik.errors.customer_name}</p>
                  )}
                </div>
                <div>
                  <label className="text-[#111827] text-[14px] font-semibold mb-2 block">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-[10px] border border-[#E5E7EB] px-4 py-3 text-[#111827] placeholder-[#9CA3AF]"
                    placeholder="Enter your phone number"
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="text-[#DC2626] text-[12px] mt-1">{formik.errors.phone}</p>
                  )}
                </div>
                <div>
                  <label className="text-[#111827] text-[14px] font-semibold mb-2 block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-[10px] border border-[#E5E7EB] px-4 py-3 text-[#111827] placeholder-[#9CA3AF]"
                    placeholder="Enter your email"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-[#DC2626] text-[12px] mt-1">{formik.errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="text-[#111827] text-[14px] font-semibold mb-2 block">
                    Comment
                  </label>
                  <textarea
                    name="comment"
                    value={formik.values.comment}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-[10px] border border-[#E5E7EB] px-4 py-3 text-[#111827] placeholder-[#9CA3AF] resize-none"
                    placeholder="Add a note to your order"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full rounded-[10px] bg-[#3BB77E] px-8 py-4 text-white font-bold hover:bg-[#2a8b5e] transition disabled:opacity-50"
            >
              {formik.isSubmitting ? "Processing..." : "Place Order"}
            </button>
          </form>

          {/* Order Summary */}
          <div className="rounded-[20px] bg-[#F8FAFC] p-6 h-fit sticky top-20">
            <h2 className="text-[#111827] text-[20px] font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 pb-6 border-b border-[#E5E7EB]">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <img
                    src={item.image_url || "/img/placeholder.png"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-[10px]"
                  />
                  <div className="flex-1 text-[14px]">
                    <p className="text-[#111827] font-semibold line-clamp-1">{item.name}</p>
                    <p className="text-[#6B7280]">Qty: {item.quantity}</p>
                    <p className="text-[#3BB77E] font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 py-6 border-b border-[#E5E7EB]">
              <div className="flex justify-between text-[#6B7280]">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#6B7280]">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>

            <div className="flex justify-between text-[#111827] font-bold text-[18px] mt-6">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default CheckOutPage;
