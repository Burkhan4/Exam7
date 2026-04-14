// src/pages/HomePage.jsx
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import productService from "../service/product.service";
import Korsine from "../assets/svg/Korsine.svg?react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HomePage = () => {
  // React Query hooks for API data
  const bestPrevRef = useRef(null);
  const bestNextRef = useRef(null);
  const dishesPrevRef = useRef(null);
  const dishesNextRef = useRef(null);
  const [bestSwiper, setBestSwiper] = useState(null);
  const [dishesSwiper, setDishesSwiper] = useState(null);

  const { data: dailyBestSells } = useQuery({
    queryKey: ["products", { page: 1, limit: 10 }],
    queryFn: () => productService.getProducts({ page: 1, limit: 10 }),
  });

  const { data: specialDishes } = useQuery({
    queryKey: ["products", { category_id: 7, limit: 3 }],
    queryFn: () => productService.getProducts({ category_id: 7, limit: 3 }),
  });

  const { data: dealsOfDay } = useQuery({
    queryKey: ["products", { category_id: 5, limit: 4 }],
    queryFn: () => productService.getProducts({ category_id: 5, limit: 4 }),
  });

  useEffect(() => {
    if (bestSwiper && bestPrevRef.current && bestNextRef.current) {
      bestSwiper.params.navigation.prevEl = bestPrevRef.current;
      bestSwiper.params.navigation.nextEl = bestNextRef.current;
      bestSwiper.navigation.destroy();
      bestSwiper.navigation.init();
      bestSwiper.navigation.update();
    }
  }, [bestSwiper]);

  useEffect(() => {
    if (dishesSwiper && dishesPrevRef.current && dishesNextRef.current) {
      dishesSwiper.params.navigation.prevEl = dishesPrevRef.current;
      dishesSwiper.params.navigation.nextEl = dishesNextRef.current;
      dishesSwiper.navigation.destroy();
      dishesSwiper.navigation.init();
      dishesSwiper.navigation.update();
    }
  }, [dishesSwiper]);

  return (
    <>
      <section className="mb-32">
        <div className="max-w-375 m-auto w-full bg-[url('/img/hero-img.png')] bg-cover bg-center h-224.5 relative">
          <Link to="/products/152" className="flex items-center gap-0 w-67.25 h-15.75 rounded-3xl cursor-pointer absolute bottom-34.5 left-34.5">
            <button className="w-16.5 h-14.75 rounded-l-3xl flex items-center justify-center bg-[#36241E]">
              <img src="/svg/right.svg" alt="" />
            </button>
            <div className="w-50.75 h-15.75 rounded-r-3xl flex items-center justify-center bg-[#CCB777]">
              <p className="pl-4 text-[24px] text-[#402F25] font-extrabold">
                Order Now
              </p>
            </div>
          </Link>
        </div>
      </section>
      <section className="py-12 bg-white">
        <div className="container mx-auto">
          {/* Sarlavha qismi */}
          <div className="text-center mb-10">
            <h5 className="text-[#FF6868] uppercase tracking-[0.2em] font-bold text-[13px] tablet:text-[15px] mb-2">
              Customer Favorites
            </h5>
            <h2 className="text-[#000000] font-extrabold text-[32px] tablet:text-[40px] desktop:text-[48px]">
              Popular Catagories
            </h2>
          </div>

          {/* Cardlar konteyneri */}
          <div className="flex flex-wrap justify-center gap-6 desktop:gap-10">
            {/* 1. Main Dish */}
            <Link to="/products/category/1" className="flex flex-col items-center justify-center bg-white rounded-[30px] shadow-[0px_10px_30px_rgba(0,0,0,0.08)] w-[180px] h-[200px] tablet:w-[200px] tablet:h-[230px] desktop:w-[220px] desktop:h-[250px] transition-transform hover:-translate-y-2 cursor-pointer">
              <div className="w-[80px] h-[80px] tablet:w-[100px] tablet:h-[100px] bg-[#C1D0AD4D] rounded-full flex items-center justify-center mb-4">
                <img
                  src="/img/categiries-1.png"
                  alt="Main Dish"
                  className="w-[70%] h-[70%] object-contain"
                />
              </div>
              <h4 className="text-[#1E1E1E] font-bold text-[18px] tablet:text-[20px] mb-1">
                Main Dish
              </h4>
              <p className="text-[#555555] text-[14px] tablet:text-[16px]">
                (86 dishes)
              </p>
            </Link>

            {/* 2. Break Fast */}
            <Link to="/products/category/2" className="flex flex-col items-center justify-center bg-white rounded-[30px] shadow-[0px_10px_30px_rgba(0,0,0,0.08)] w-[180px] h-[200px] tablet:w-[200px] tablet:h-[230px] desktop:w-[220px] desktop:h-[250px] transition-transform hover:-translate-y-2 cursor-pointer">
              <div className="w-[80px] h-[80px] tablet:w-[100px] tablet:h-[100px] bg-[#C1D0AD4D] rounded-full flex items-center justify-center mb-4">
                <img
                  src="/img/categiries-2.png"
                  alt="Break Fast"
                  className="w-[70%] h-[70%] object-contain"
                />
              </div>
              <h4 className="text-[#1E1E1E] font-bold text-[18px] tablet:text-[20px] mb-1">
                Break Fast
              </h4>
              <p className="text-[#555555] text-[14px] tablet:text-[16px]">
                (12 break fast)
              </p>
            </Link>

            {/* 3. Dessert */}
            <Link to="/products/category/3" className="flex flex-col items-center justify-center bg-white rounded-[30px] shadow-[0px_10px_30px_rgba(0,0,0,0.08)] w-[180px] h-[200px] tablet:w-[200px] tablet:h-[230px] desktop:w-[220px] desktop:h-[250px] transition-transform hover:-translate-y-2 cursor-pointer">
              <div className="w-[80px] h-[80px] tablet:w-[100px] tablet:h-[100px] bg-[#C1D0AD4D] rounded-full flex items-center justify-center mb-4">
                <img
                  src="/img/categiries-3.png"
                  alt="Dessert"
                  className="w-[70%] h-[70%] object-contain"
                />
              </div>
              <h4 className="text-[#1E1E1E] font-bold text-[18px] tablet:text-[20px] mb-1">
                Dessert
              </h4>
              <p className="text-[#555555] text-[14px] tablet:text-[16px]">
                (48 dessert)
              </p>
            </Link>

            {/* 4. Browse All */}
            <Link to="/products/category/5" className="flex flex-col items-center justify-center bg-white rounded-[30px] shadow-[0px_10px_30px_rgba(0,0,0,0.08)] w-[180px] h-[200px] tablet:w-[200px] tablet:h-[230px] desktop:w-[220px] desktop:h-[250px] transition-transform hover:-translate-y-2 cursor-pointer">
              <div className="w-[80px] h-[80px] tablet:w-[100px] tablet:h-[100px] bg-[#C1D0AD4D] rounded-full flex items-center justify-center mb-4">
                <img
                  src="/img/categiries-4.png"
                  alt="Browse All"
                  className="w-[70%] h-[70%] object-contain"
                />
              </div>
              <h4 className="text-[#1E1E1E] font-bold text-[18px] tablet:text-[20px] mb-1">
                Browse All
              </h4>
              <p className="text-[#555555] text-[14px] tablet:text-[16px]">
                (255 Items)
              </p>
            </Link>

            {/* 5. Breakfast Food */}
            <Link to="/products/category/4" className="flex flex-col items-center justify-center bg-white rounded-[30px] shadow-[0px_10px_30px_rgba(0,0,0,0.08)] w-[180px] h-[200px] tablet:w-[200px] tablet:h-[230px] desktop:w-[220px] desktop:h-[250px] transition-transform hover:-translate-y-2 cursor-pointer">
              <div className="w-[80px] h-[80px] tablet:w-[100px] tablet:h-[100px] bg-[#C1D0AD4D] rounded-full flex items-center justify-center mb-4">
                <img
                  src="/img/categiries-5.png"
                  alt="Breakfast Food"
                  className="w-[70%] h-[70%] object-contain"
                />
              </div>
              <h4 className="text-[#1E1E1E] font-bold text-[18px] tablet:text-[20px] mb-1">
                Breakfast Food
              </h4>
              <p className="text-[#555555] text-[14px] tablet:text-[16px]">
                (205 Items)
              </p>
            </Link>
          </div>
        </div>
      </section>
      <section className="py-10 pb-42">
        <div className="container mx-auto">
          {/* Header qismi */}
          <div className="flex flex-col tablet:flex-row tablet:items-end justify-between mb-8 gap-4">
            <h2 className="text-[#253D4E] text-[24px] tablet:text-[32px] font-bold">
              Daily Best Sells
            </h2>
            <ul className="flex items-center gap-4 tablet:gap-8">
              <li className="text-[#3BB77E] text-[16px] font-semibold cursor-pointer border-b-2 border-[#3BB77E]">
                Featured
              </li>
            </ul>
          </div>

          {/* Main Grid Content */}
          <div className="grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)] gap-6 relative">
            <div className="relative h-[450px] rounded-[15px] overflow-hidden group">
              <img
                src="/img/Bring.png"
                alt="Promo"
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="relative">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                slidesPerGroup={1}
                navigation={{
                  nextEl: bestNextRef.current,
                  prevEl: bestPrevRef.current,
                }}
                onBeforeInit={(swiper) => {
                  if (swiper.params.navigation) {
                    swiper.params.navigation.prevEl = bestPrevRef.current;
                    swiper.params.navigation.nextEl = bestNextRef.current;
                  }
                }}
                onSwiper={setBestSwiper}
                pagination={{ clickable: true }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                }}
                className="pb-12"
              >
                {dailyBestSells?.data?.map((product) => (
                  <SwiperSlide key={product.id}>
                    <Link
                      to={`/products/${product.id}`}
                      className="border border-[#ececec] rounded-[15px] p-5 hover:border-[#BCE3C9] hover:shadow-[20px_20px_40px_rgba(0,0,0,0.05)] transition-all bg-white relative block h-full"
                    >
                      <span className="absolute top-0 left-0 px-4 py-1 rounded-tl-[15px] rounded-br-[15px] text-white text-[12px] bg-[#3BB77E]">
                        Sale
                      </span>

                      <div className="h-[180px] flex items-center justify-center mb-4">
                        <img
                          src={product.image_url || "/path-to-product.png"}
                          alt={product.name}
                          className="max-h-full object-contain"
                        />
                      </div>

                      <div className="space-y-2">
                        <span className="text-[12px] text-[#adadad]">{product.brand || "Brand"}</span>
                        <h4 className="text-[#253D4E] font-bold text-[16px] leading-tight h-[40px] overflow-hidden">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-1 text-[#FDC040]">
                          <span className="text-[14px]">★★★★★</span>
                          <span className="text-[#adadad] text-[12px]">({product.rating || 4.0})</span>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                          <span className="text-[#3BB77E] text-[18px] font-bold">
                            ${product.main_variant?.price?.toFixed(2) ?? "0.00"}
                          </span>
                          {product.main_variant?.old_price && (
                            <span className="text-[#adadad] text-[14px] line-through">
                              ${product.main_variant.old_price.toFixed(2)}
                            </span>
                          )}
                        </div>

                        <div className="pt-2">
                          <div className="w-full h-[4px] bg-[#f0f0f0] rounded-full overflow-hidden">
                            <div className="w-[80%] h-full bg-[#F53E32]"></div>
                          </div>
                          <p className="text-[12px] text-[#253D4E] mt-1 font-medium">
                            Stock: {product.main_variant?.stock ?? 0}
                          </p>
                        </div>

                        <button className="w-full bg-[#F53E32] hover:bg-[#e12215] cursor-pointer text-white font-bold py-2 rounded-[5px] mt-4 flex items-center justify-center gap-2 transition-all group">
                          <span className="text-[20px] mb-1 group-hover:scale-110">+</span> Add To Cart
                        </button>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>

              <button ref={bestPrevRef} className="absolute top-1/2 left-4 z-50 -translate-y-1/2 w-10 h-10 rounded-full bg-[#F2F3F4] hover:bg-[#a6a7a7] flex items-center justify-center cursor-pointer">
                <img src="/svg/rightt.svg" alt="Previous" className="rotate-180" />
              </button>
              <button ref={bestNextRef} className="absolute top-1/2 right-4 z-50 -translate-y-1/2 w-10 h-10 rounded-full bg-[#F2F3F4] hover:bg-[#a6a7a7] flex items-center justify-center cursor-pointer">
                <img src="/svg/rightt.svg" alt="Next" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Header qismi: Sarlavha va Navigatsiya tugmalari */}
          <div className="flex flex-col tablet:flex-row tablet:items-end justify-between mb-12 gap-6">
            <div className="space-y-2">
              <h5 className="text-[#FF6868] uppercase tracking-[0.2em] font-bold text-[14px]">
                Special Dishes
              </h5>
              <h2 className="text-[#000000] font-extrabold text-[32px] tablet:text-[40px] desktop:text-[48px] leading-tight max-w-[500px]">
                Standout Dishes From Our Menu
              </h2>
            </div>

            {/* Navigatsiya tugmalari */}
            <div className="flex gap-4">
            <button ref={dishesPrevRef} className="w-[50px] h-[50px] tablet:w-[60px] cursor-pointer tablet:h-[60px] rounded-full bg-[#EFEFEF] flex items-center justify-center hover:bg-[#FF6868] hover:text-white transition-all duration-300 group">
              <span className="text-[20px] tablet:text-[24px]">❮</span>
            </button>
            <button ref={dishesNextRef} className="w-[50px] h-[50px] tablet:w-[60px] cursor-pointer tablet:h-[60px] rounded-full bg-[#FF6868] text-white flex items-center justify-center shadow-lg hover:bg-[#e55a5a] transition-all duration-300">
                <span className="text-[20px] tablet:text-[24px]">❯</span>
              </button>
            </div>
          </div>

          {/* Taomlar Grid qismi */}
          <div className="relative">
            <Swiper
              modules={[Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                nextEl: dishesNextRef.current,
                prevEl: dishesPrevRef.current,
              }}
              onBeforeInit={(swiper) => {
                if (swiper.params.navigation) {
                  swiper.params.navigation.prevEl = dishesPrevRef.current;
                  swiper.params.navigation.nextEl = dishesNextRef.current;
                }
              }}
              onSwiper={setDishesSwiper}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="pb-8"
            >
              {/* Taom Cards from API */}
              {specialDishes?.data?.map((dish) => (
                <SwiperSlide key={dish.id}>
                  <Link
                    to={`/products/${dish.id}`}
                    className="relative bg-white rounded-[35px] p-8 shadow-[0px_20px_50px_rgba(0,0,0,0.05)] border border-transparent hover:border-[#FF686822] transition-all duration-300 group cursor-pointer block"
                  >
                    {/* Heart/Like tugmasi (Top-right) */}
                    <div className="absolute top-0 right-0 w-[60px] h-[50px] bg-[#FF6868] rounded-tr-[35px] rounded-bl-[35px] flex items-center justify-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </div>

                    {/* Ovqat rasmi */}
                    <div className="flex justify-center mb-8">
                      <div className="w-[200px] h-[200px] tablet:w-[220px] tablet:h-[220px] overflow-hidden rounded-full group-hover:scale-105 transition-transform duration-500">
                        <img
                          src={dish.image_url || "/path-to-dish.png"}
                          alt={dish.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Matnli qism */}
                    <div className="text-left space-y-2">
                      <h4 className="text-[#1E1E1E] font-bold text-[22px] tablet:text-[24px]">
                        {dish.name}
                      </h4>
                      <p className="text-[#555555] text-[16px]">
                        {dish.description || "Description of the item"}
                      </p>
                      <div className="flex items-center gap-2 pt-2">
                        <span className="text-[#3BB77E] text-[18px] font-bold">
                          ${dish.main_variant?.price?.toFixed(2) ?? "0.00"}
                        </span>
                        {dish.main_variant?.old_price && (
                          <span className="text-[#adadad] text-[14px] line-through">
                            ${dish.main_variant.old_price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

          </div>
        </div>
      </section>
      <section className="py-12 bg-white pb-27.75">
        <div className="container mx-auto px-4">
          {/* Header qismi */}
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-[#253D4E] text-[28px] tablet:text-[32px] font-bold">
              Deals Of The Day
            </h2>
            <Link
              to="/products/category/5"
              className="flex items-center gap-2 text-[#7E7E7E] hover:text-[#3BB77E] transition-all text-[16px]"
            >
              All Deals <span className="text-[12px]">❯</span>
            </Link>
          </div>

          {/* Grid Content */}
          <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-6">
            {/* Product Cards from API */}
            {dealsOfDay?.data?.map((deal) => (
              <Link
                key={deal.id}
                to={`/products/${deal.id}`}
                className="relative h-[400px] rounded-[20px] overflow-hidden group block"
              >
                {/* Asosiy fon rasmi */}
                <img
                  src={deal.image_url || "/path-to-deal.jpg"}
                  alt={deal.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-[20px]"
                />

                {/* Pastdagi oq ma'lumotlar bloki */}
                <div className="absolute bottom-4 left-4 right-4 bg-white rounded-[15px] p-5 shadow-[5px_5px_15px_rgba(0,0,0,0.05)] translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-[#253D4E] font-bold text-[16px] leading-tight mb-2 h-[40px] overflow-hidden">
                    {deal.name}
                  </h4>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-[#FDC040] text-[14px]">★★★★★</span>
                    <span className="text-[#B6B6B6] text-[12px]">({deal.rating || 4.0})</span>
                  </div>

                  <p className="text-[#B6B6B6] text-[13px] mb-3">
                    By <span className="text-[#3BB77E]">{deal.brand || "Brand"}</span>
                  </p>

                  {/* Narx va Tugma */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[#3BB77E] text-[18px] font-bold">
                        ${deal.main_variant?.price?.toFixed(2) ?? "0.00"}
                      </span>
                      {deal.main_variant?.old_price && (
                        <span className="text-[#adadad] text-[14px] line-through">
                          ${deal.main_variant.old_price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button className="bg-[#F53E32] hover:bg-[#c92216] cursor-pointer text-white px-4 py-2 rounded-[5px] flex items-center gap-2 transition-all font-bold text-[14px]">
                      <span className="text-[18px]">
                        <Korsine className="w-6 h-6 duration-200 text-white hover:text-[#3BB77E] cursor-pointer" />
                      </span>{" "}
                      Add
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col desktop:flex-row items-center justify-between gap-12">
            {/* 1. Chap tarafdagi rasm qismi */}
            <div className="w-full desktop:w-1/2 flex justify-center">
              <div className="relative w-full max-w-[500px] aspect-square rounded-[40px] overflow-hidden shadow-2xl">
                <img
                  src="/img/Why-img.png"
                  alt="Healthy Food"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* 2. O'ng tarafdagi matn va cardlar qismi */}
            <div className="w-full desktop:w-1/2 space-y-8">
              <div className="space-y-4 text-center desktop:text-left">
                <h2 className="text-[#000000] font-extrabold text-[32px] tablet:text-[40px] desktop:text-[48px] leading-tight">
                  Why People Choose us?
                </h2>
              </div>

              {/* Xususiyatlar Cardlari */}
              <div className="space-y-6">
                {/* Card 1 */}
                <div className="flex flex-col tablet:flex-row items-center tablet:items-start gap-5 p-6 bg-white rounded-[20px] shadow-[0px_10px_30px_rgba(0,0,0,0.05)] border border-transparent hover:border-[#FDC04022] transition-all group">
                  <div className="w-[70px] h-[70px] shrink-0 bg-white rounded-full flex items-center justify-center shadow-md">
                    <img
                      src="/svg/why1.svg"
                      alt="Icon"
                      className="w-[35px] h-[35px] object-contain"
                    />
                  </div>
                  <div className="text-center tablet:text-left">
                    <h4 className="text-[#1E1E1E] font-bold text-[20px] mb-2">
                      Convenient and Reliable
                    </h4>
                    <p className="text-[#555555] text-[16px] leading-relaxed">
                      Whether you dine in, take out, or order delivery, our
                      service is convenient, fast, and reliable, making mealtime
                      hassle-free.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="flex flex-col tablet:flex-row items-center tablet:items-start gap-5 p-6 bg-white rounded-[20px] shadow-[0px_10px_30px_rgba(0,0,0,0.05)] border border-transparent hover:border-[#FDC04022] transition-all group">
                  <div className="w-[70px] h-[70px] shrink-0 bg-white rounded-full flex items-center justify-center shadow-md">
                    <img
                      src="/svg/why2.svg"
                      alt="Icon"
                      className="w-[35px] h-[35px] object-contain"
                    />
                  </div>
                  <div className="text-center tablet:text-left">
                    <h4 className="text-[#1E1E1E] font-bold text-[20px] mb-2">
                      Variety of Options
                    </h4>
                    <p className="text-[#555555] text-[16px] leading-relaxed">
                      From hearty meals to light snacks, we offer a wide range
                      of options to suit every taste and craving.
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="flex flex-col tablet:flex-row items-center tablet:items-start gap-5 p-6 bg-white rounded-[20px] shadow-[0px_10px_30px_rgba(0,0,0,0.05)] border border-transparent hover:border-[#FDC04022] transition-all group">
                  <div className="w-[70px] h-[70px] shrink-0 bg-white rounded-full flex items-center justify-center shadow-md">
                    <img
                      src="/svg/why3.svg"
                      alt="Icon"
                      className="w-[35px] h-[40px] object-contain"
                    />
                  </div>
                  <div className="text-center tablet:text-left">
                    <h4 className="text-[#1E1E1E] font-bold text-[20px] mb-2">
                      Eat Burger
                    </h4>
                    <p className="text-[#555555] text-[16px] leading-relaxed">
                      Our burgers are grilled to perfection, with juicy patties
                      and flavorful toppings that make every bite a delicious
                      experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          {/* 1. Asosiy Banner qismi */}
          <div className="relative w-full min-h-[450px] rounded-[30px] overflow-hidden bg-[#3e4437] flex items-center">
            {/* Bannerning orqa fon rasmi (Kurer va sabzavotlar) */}
            <img
              src="/img/kuryer.png"
              alt="Courier"
              className="absolute w-158.5 right-0 bottom-[-100px] h-full object-contain z-0"
            />

            {/* Banner matnlari qismi */}
            <div className="relative z-10 pl-12 tablet:pl-20 desktop:pl-24 max-w-[600px]">
              <h1 className="text-white text-[24px] tablet:text-[32px] desktop:text-[40px] font-bold leading-tight mb-6">
                Stay home & get your daily needs from our shop
              </h1>
              <p className="text-[#BCE3C9] text-[18px] tablet:text-[20px] mb-10 font-medium">
                Start You'r Daily Shopping with{" "}
                <span className="text-[#3BB77E]">Nest Mart</span>
              </p>

              {/* Email Input qismi */}
              <div className="relative flex justify-between items-center w-full max-w-[450px] h-[60px] bg-white rounded-full shadow-lg">
                <div className="pl-6 flex items-center text-[#838383]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" />
                  </svg>
                  <input
                    type="email"
                    placeholder="Your emaill address"
                    className="bg-transparent border-none outline-none pl-4 text-[16px] w-full"
                  />
                </div>
                <button className="h-full px-10 bg-[#FF8B72] hover:bg-[#e87a63] text-white font-bold rounded-full transition-all shrink-0">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* 2. Pastki Features (Xususiyatlar) qismi */}
          <div className="grid grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-5 gap-4 mt-8">
            {/* Feature 1 */}
            <div className="bg-[#F4F6FA] p-6 rounded-[15px] flex items-center gap-4 group hover:-translate-y-1 transition-all duration-300">
              <img
                src="/svg/stay1.svg"
                alt="Icon"
                className="w-12 h-12"
              />
              <div>
                <h4 className="text-[#253D4E] font-bold text-[16px]">
                  Best prices & offers
                </h4>
                <p className="text-[#adadad] text-[13px]">Orders $50 or more</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#F4F6FA] p-6 rounded-[15px] flex items-center gap-4 group hover:-translate-y-1 transition-all duration-300">
              <img src="/svg/stay2.svg" alt="Icon" className="w-12 h-12" />
              <div>
                <h4 className="text-[#253D4E] font-bold text-[16px]">
                  Free delivery
                </h4>
                <p className="text-[#adadad] text-[13px]">
                  24/7 amazing services
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#f4f6fa] p-6 rounded-[15px] flex items-center gap-4 group hover:-translate-y-1 transition-all duration-300">
              <img src="/svg/stay3.svg" alt="Icon" className="w-12 h-12" />
              <div>
                <h4 className="text-[#253D4E] font-bold text-[16px]">
                  Great daily deal
                </h4>
                <p className="text-[#adadad] text-[13px]">When you sign up</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#f4f6fa] p-6 rounded-[15px] flex items-center gap-4 group hover:-translate-y-1 transition-all duration-300">
              <img
                src="/svg/stay4.svg"
                alt="Icon"
                className="w-12 h-12"
              />
              <div>
                <h4 className="text-[#253D4E] font-bold text-[16px]">
                  Wide assortment
                </h4>
                <p className="text-[#adadad] text-[13px]">Mega Discounts</p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="bg-[#f4f6fa] p-6 rounded-[15px] flex items-center gap-4 group hover:-translate-y-1 transition-all duration-300">
              <img src="/svg/stay5.svg" alt="Icon" className="w-12 h-12" />
              <div>
                <h4 className="text-[#253D4E] font-bold text-[16px]">
                  Easy returns
                </h4>
                <p className="text-[#adadad] text-[13px]">Within 30 days</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
