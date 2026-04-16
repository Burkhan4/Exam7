const AboutUsPage = () => {
  return (
    <section className="bg-[#F8FAFC] py-16">
      <div className="container mx-auto">
        <div className="grid gap-10 desktop:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-8">
            <div>
              <p className="text-[#3BB77E] text-[14px] uppercase tracking-[0.35em] font-bold mb-4">
                About The Carrot
              </p>
              <h1 className="text-[#111827] text-[42px] font-extrabold leading-tight">
                Fresh food made simple for your daily needs
              </h1>
            </div>
            <div className="space-y-4 text-[#6B7280] text-[16px] leading-relaxed">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, recusandae necessitatibus quasi inventore alias doloremque pariatur earum iure beatae assumenda rerum quod.
              </p>
              <p>
                Tempora magni autem a voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut vitae rerum cum accusamus maiores voluptatem architecto.
              </p>
              <p>
                Ipsum deleniti expedita doloribus suscipit reiciendis beataeibus aperiam quasi alias omnis.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-[24px] bg-white p-6 text-center shadow-[0px_20px_50px_rgba(0,0,0,0.08)]">
                <p className="text-[#3BB77E] text-[32px] font-extrabold">0.1k</p>
                <p className="text-[#111827] font-semibold mt-3">Vendors</p>
              </div>
              <div className="rounded-[24px] bg-white p-6 text-center shadow-[0px_20px_50px_rgba(0,0,0,0.08)]">
                <p className="text-[#3BB77E] text-[32px] font-extrabold">23k</p>
                <p className="text-[#111827] font-semibold mt-3">Customers</p>
              </div>
              <div className="rounded-[24px] bg-white p-6 text-center shadow-[0px_20px_50px_rgba(0,0,0,0.08)]">
                <p className="text-[#3BB77E] text-[32px] font-extrabold">2k</p>
                <p className="text-[#111827] font-semibold mt-3">Products</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[30px] shadow-[0px_20px_50px_rgba(0,0,0,0.08)]">
            <img src="/img/AboutUs.png" alt="About Us" className="w-full object-cover" />
          </div>
        </div>

        <div className="mt-12 grid gap-4 tablet:grid-cols-2 desktop:grid-cols-4">
          {[
            { title: "Product Packing", description: "Secure packaging to keep your goods fresh." },
            { title: "24X7 Support", description: "We are here to help you every day of the week." },
            { title: "Delivery in 5 Days", description: "Fast and reliable delivery to your door." },
            { title: "Payment Secure", description: "Safe and secure payment processing." },
          ].map((item) => (
            <div key={item.title} className="rounded-[24px] bg-white p-6 shadow-[0px_20px_50px_rgba(0,0,0,0.08)]">
              <h3 className="text-[#111827] text-[18px] font-bold mb-3">{item.title}</h3>
              <p className="text-[#6B7280] text-[15px] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsPage;
