import React, { useState } from 'react';
import Phone from "../assets/svg/nav-phone.svg?react";
import Korsine from "../assets/svg/Korsine.svg?react";

const Navbar = () => {
  // 1. Massiv nomi: categories
  const categories = [
    "Electronics",
    "Clothing & Apparel",
    "Home & Kitchen",
    "Health & Beauty",
    "Sports & Outdoors",
    "Books & Stationery",
    "Toys & Games",
    "Automotive Parts",
    "Groceries",
    "Pet Supplies",
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  return (
    <section>
      <nav className="shadow-[0px_0px_8px_0px_#33333333] py-4.5">
        <div className="container desktop:pl-90 tablet:pl-30 pl-4 pr-10">
          <div className="flex items-center justify-between">
            <ul className="max-w-144.75 w-full flex items-center justify-between">
              {["Home", "Category", "Products", "Pages", "Blog", "Elements"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[14px] text-[#000000] font-medium duration-300 transition-all hover:-translate-y-1 hover:text-[#7C5334]">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center">
              <a href="tel:+998901234567">
                <Phone className="w-5 h-5 duration-200 text-black hover:text-[#7C5334] cursor-pointer" />
              </a>
              <p className="text-[15px] text-[#000000] ml-2">+123 ( 456 ) ( 7890 )</p>
            </div>
          </div>
        </div>
      </nav>

      <section>
        <div className="container desktop:pl-20 tablet:pl-8 pl-3">
          <div className="flex items-center justify-between">
            <img src="/svg/logo.svg" alt="Logo" />
            
            <div className="flex justify-center p-10">
              <div className="relative flex items-center w-[600px] h-[45px] bg-white border border-[#BCE3C9] rounded-[4px] font-sans">
                <input
                  type="text"
                  placeholder="Search For items..."
                  className="flex-grow h-full px-4 text-[14px] outline-none text-[#838383] placeholder-[#838383] rounded-l-[4px]"
                />

                <div className="relative h-full border-l border-[#BCE3C9] flex items-center">
                  <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between px-4 h-full min-w-[150px] text-[14px] font-bold text-[#253D4E] hover:bg-gray-50 transition-all cursor-pointer"
                  >
                    <span className="truncate">{selectedCategory}</span>
                    <svg
                      className={`ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1 1L5 5L9 1" stroke="#253D4E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {/* 2. BU YERDA categories ISHLATILGAN. TEPADAGI NOM BILAN BIR XIL */}
                  {isOpen && (
                    <div className="absolute top-[48px] left-0 w-full min-w-[200px] bg-white border border-[#BCE3C9] rounded-[4px] shadow-xl z-[999] py-2 max-h-[300px] overflow-y-auto overflow-x-hidden">
                      {categories.map((cat, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setSelectedCategory(cat);
                            setIsOpen(false);
                          }}
                          className={`px-4 py-2 text-[14px] cursor-pointer transition-colors
                            ${selectedCategory === cat ? "bg-[#3BB77E] text-white" : "text-[#253D4E] hover:bg-[#F2F3F7]"}
                          `}
                        >
                          {cat}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button type="button" className="h-full w-[50px] cursor-pointer flex items-center justify-center bg-[#253D4E] hover:bg-[#3BB77E] transition-colors rounded-r-[4px]">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="9" cy="9" r="7.5" stroke="white" strokeWidth="2" />
                    <path d="M14.5 14.5L18.5 18.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
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