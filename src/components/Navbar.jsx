import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import productService from "../service/product.service";
import Phone from "../assets/svg/nav-phone.svg?react";
import Korsine from "../assets/svg/Korsine.svg?react";

const categories = [
  { id: 1, name: "Nuts" },
  { id: 2, name: "Main dish" },
  { id: 3, name: "Break Fast" },
  { id: 4, name: "Desserts" },
  { id: 5, name: "Drinks" },
  { id: 6, name: "Milk" },
  { id: 7, name: "Salats" },
  { id: 8, name: "Snacks" },
];

const navItems = [
  { label: "Home", to: "/" },
  { label: "Category" },
  { label: "Products" },
  { label: "Pages" },
  { label: "Blog" },
  { label: "Elements" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({
    id: null,
    name: "All Categories",
  });
  const [searchText, setSearchText] = useState("");
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const resultsRef = useRef(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["productsByCategory", selectedCategory.id],
    queryFn: ({ queryKey }) => productService.getProducts({ category_id: queryKey[1] }),
    enabled: !!selectedCategory.id,
    staleTime: 1000 * 60 * 2,
    cacheTime: 1000 * 60 * 5,
  });

  const products = data?.data || [];

  const filteredProducts = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (!query) return [];

    return products.filter((product) =>
      product.name.toLowerCase().includes(query),
    );
  }, [products, searchText]);

  useEffect(() => {
    if (!showResults) return;

    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showResults]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
    setShowResults(true);
  };

  const handleProductClick = (productId) => {
    setShowResults(false);
    navigate(`/products/${productId}`);
  };

  return (
    <section>
      <nav className="shadow-[0px_0px_8px_0px_#33333333] py-4.5">
        <div className="container desktop:pl-90 tablet:pl-30 pl-4 pr-10">
          <div className="flex items-center justify-between">
            <ul className="max-w-144.75 w-full flex items-center justify-between">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.to ? (
                    <Link
                      to={item.to}
                      className="text-[14px] text-[#000000] font-medium duration-300 transition-all hover:-translate-y-1 hover:text-[#7C5334]"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href="#"
                      className="text-[14px] text-[#000000] font-medium duration-300 transition-all hover:-translate-y-1 hover:text-[#7C5334]"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex items-center">
              <a href="tel:+998901234567">
                <Phone className="w-5 h-5 duration-200 text-black hover:text-[#7C5334] cursor-pointer" />
              </a>
              <p className="text-[15px] text-[#000000] ml-2">
                +123 ( 456 ) ( 7890 )
              </p>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative">
        <div className="container desktop:pl-20 tablet:pl-8 pl-3">
          <div className="flex items-center justify-between">
            <img src="/svg/logo.svg" alt="Logo" />

            <div
              className="relative flex-1 flex justify-center p-10"
              ref={resultsRef}
            >
              <div className="relative flex items-center w-full max-w-[600px] h-[45px] bg-white border border-[#BCE3C9] rounded-[4px] font-sans">
                <input
                  type="text"
                  value={searchText}
                  placeholder="Search for items..."
                  onFocus={() => setShowResults(true)}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    setShowResults(true);
                  }}
                  className="flex-grow h-full px-4 text-[14px] outline-none text-[#838383] placeholder-[#838383] rounded-l-[4px]"
                />

                <div className="relative h-full border-l border-[#BCE3C9] flex items-center">
                  <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between px-4 h-full min-w-[150px] text-[14px] font-bold text-[#253D4E] hover:bg-gray-50 transition-all cursor-pointer"
                  >
                    <span className="truncate">{selectedCategory.name}</span>
                    <svg
                      className={`ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="#253D4E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {isOpen && (
                    <div className="absolute top-[48px] left-0 w-full min-w-[200px] bg-white border border-[#BCE3C9] rounded-[4px] shadow-xl z-[999] py-2 max-h-[300px] overflow-y-auto overflow-x-hidden">
                      {categories.map((category) => (
                        <div
                          key={category.id}
                          onClick={() => handleCategorySelect(category)}
                          className={`px-4 py-2 text-[14px] cursor-pointer transition-colors ${
                            selectedCategory.id === category.id
                              ? "bg-[#3BB77E] text-white"
                              : "text-[#253D4E] hover:bg-[#F2F3F7]"
                          }`}
                        >
                          {category.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="h-full w-[50px] cursor-pointer flex items-center justify-center bg-[#253D4E] hover:bg-[#3BB77E] transition-colors rounded-r-[4px]"
                  onClick={() => setShowResults(true)}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="9"
                      cy="9"
                      r="7.5"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <path
                      d="M14.5 14.5L18.5 18.5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {showResults && (
                <div className="absolute top-[85px] left-0 w-full max-w-[600px] bg-white border border-[#D9D9D9] rounded-[10px] shadow-xl z-[1000] overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB]">
                    <div>
                      <p className="font-semibold text-[#1F2937]">
                        Search results
                      </p>
                      <p className="text-sm text-[#6B7280]">
                        {selectedCategory.id
                          ? `${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""}`
                          : "Select category to search"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowResults(false)}
                      className="text-[#6B7280] hover:text-[#111827]"
                    >
                      ×
                    </button>
                  </div>

                  {!selectedCategory.id ? (
                    <div className="p-4 text-sm text-[#6B7280]">
                      Please choose a category first.
                    </div>
                  ) : isLoading ? (
                    <div className="p-4 text-sm text-[#6B7280]">
                      Loading products...
                    </div>
                  ) : isError ? (
                    <div className="p-4 text-sm text-red-500">
                      Ошибка загрузки товаров.
                    </div>
                  ) : filteredProducts.length === 0 ? (
                    <div className="p-4 text-sm text-[#6B7280]">
                      {searchText.trim()
                        ? "No products found matching the name."
                        : "Type a product name to search."}
                    </div>
                  ) : (
                    <div className="grid gap-3 p-4">
                      {filteredProducts.map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => handleProductClick(product.id)}
                          className="w-full text-left flex items-center gap-3 rounded-[10px] border border-[#E5E7EB] p-3 hover:shadow-lg transition"
                        >
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="h-16 w-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-[#111827]">
                              {product.name}
                            </p>
                            <p className="text-sm text-[#6B7280]">
                              {product.brand}
                            </p>
                            <p className="text-sm font-medium text-[#1D4ED8]">
                              {product.main_variant?.price?.toLocaleString()}{" "}
                              so'm
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1 cursor-pointer pr-4">
              <Korsine className="w-6 h-6 duration-200 text-black hover:text-[#7C5334] cursor-pointer" />
              <p className="text-[#000000] text-[15px] font-medium">Cart</p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Navbar;
