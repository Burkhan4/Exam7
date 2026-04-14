import Location from "../assets/svg/footerLocation.svg?react";
import Email from "../assets/svg/footerEmail.svg?react";
import Phone from "../assets/svg/footerPhone.svg?react";

const Footer = () => {
  return (
    <footer className="pt-20 pb-10 bg-[#F7F7F8]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-12 mb-16">
          {/* 1-Ustun: Logo va Kontaktlar */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img src="/svg/logoFooter.svg" alt="Foodzy" className="w-10 h-10" />
              <div>
                <h3 className="text-[#000000] font-bold text-[24px] leading-none">
                  Foodzy
                </h3>
                <p className="text-[#7E7E7E] text-[12px]">
                  A Treasure of Tastes
                </p>
              </div>
            </div>
            <p className="text-[#7E7E7E] text-[15px] leading-relaxed">
              FoodTrove is the biggest market of grocery products. Get your
              daily needs from our store.
            </p>
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <span className="text-[#FF6868] mt-1"><Location className="w-4 h-4.5 duration-200 text-[#F53E32] hover:text-[#b6170c] cursor-pointer" /></span>
                <p className="text-[#253D4E] text-[14px]">
                  51 Green St.Huntington ohaio beach ontario, NY 11746 KY 4783,
                  USA.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#FF6868]"><Email className="h-4 w-4.5 duration-200 text-[#F53E32] hover:text-[#b6170c] cursor-pointer" /></span>
                <p className="text-[#253D4E] text-[14px]">example@email.com</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#FF6868]"><Phone className="w-4 h-4 duration-200 text-[#F53E32] hover:text-[#b6170c] cursor-pointer" /></span>
                <p className="text-[#253D4E] text-[14px]">+91 123 4567890</p>
              </div>
            </div>
          </div>

          {/* 2-Ustun: Company */}
          <div>
            <h4 className="text-[#253D4E] font-bold text-[20px] mb-8">
              Company
            </h4>
            <ul className="space-y-4">
              {[
                "About Us",
                "Delivery Information",
                "Privacy Policy",
                "Terms & Conditions",
                "contact Us",
                "Support Center",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[#7E7E7E] hover:text-[#FF6868] transition-all text-[15px]"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3-Ustun: Category */}
          <div>
            <h4 className="text-[#253D4E] font-bold text-[20px] mb-8">
              Category
            </h4>
            <ul className="space-y-4">
              {[
                "Dairy & Bakery",
                "Fruits & Vegetable",
                "Snack & Spice",
                "Juice & Drinks",
                "Chicken & Meat",
                "Fast Food",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[#7E7E7E] hover:text-[#FF6868] transition-all text-[15px]"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 4-Ustun: Newsletter va Galereya */}
          <div className="space-y-8">
            <h4 className="text-[#253D4E] font-bold text-[20px]">
              Subscribe Our Newsletter
            </h4>
            <div className="relative w-full h-[55px] border border-[#ececec] rounded-[5px] flex items-center px-4">
              <input
                type="text"
                placeholder="Search here..."
                className="w-full bg-transparent outline-none text-[14px] pr-10"
              />
              <button className="absolute right-4 text-[#253D4E] hover:text-[#FF6868]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>

            {/* Ijtimoiy tarmoqlar */}
            <div className="flex gap-3">
              {["f", "𝕏", "🌐", "📸"].map((icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 border border-[#ececec] rounded-[5px] flex items-center justify-center hover:bg-[#FF6868] hover:text-white hover:border-[#FF6868] transition-all cursor-pointer text-[#253D4E]"
                >
                  {icon}
                </div>
              ))}
            </div>

            {/* Kichik Galereya */}
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((img) => (
                <div
                  key={img}
                  className="w-[60px] h-[60px] rounded-[10px] overflow-hidden"
                >
                  <img
                    src={`/img/footer${img}.png`}
                    alt="Gallery"
                    className="w-full h-full object-cover hover:scale-110 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pastki qism: Copyright */}
        <div className="pt-8 border-t border-[#ececec] text-center">
          <p className="text-[#7E7E7E] text-[14px]">
            © 2025 <span className="text-[#FF6868] font-bold">Foodzy</span>, All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
