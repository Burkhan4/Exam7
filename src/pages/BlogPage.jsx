const BlogPage = () => {
  return (
    <section className="bg-[#F8FAFC] py-16">
      <div className="container mx-auto">
        <div className="grid gap-10 desktop:grid-cols-[1fr_0.9fr] items-center mb-16">
          <div className="space-y-5">
            <h1 className="text-[#111827] text-[40px] font-extrabold leading-tight">
              Health Benefits of a Raw Food
            </h1>
            <div className="text-[#6B7280] text-[15px] leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde mollitia nihil, sequi labore perspiciatis quidem ex eaque laborum voluptate.
            </div>
            <div className="text-[#9CA3AF] text-[13px] uppercase tracking-[0.3em] font-semibold">
              By Admin / 07 Comment / Date - 09_09_2024
            </div>
          </div>
          <div className="overflow-hidden rounded-[30px] shadow-[0px_20px_50px_rgba(0,0,0,0.08)]">
            <img src="/img/Blog1.png" alt="Blog" className="w-full object-cover" />
          </div>
        </div>

        <div className="grid gap-6 desktop:grid-cols-2 mb-16">
          <div className="rounded-[30px] bg-white p-6 shadow-[0px_20px_50px_rgba(0,0,0,0.08)]">
            <img src="/img/Blog2.png" alt="Blog Detail" className="w-full rounded-[24px] object-cover mb-6" />
            <h2 className="text-[#111827] text-[24px] font-bold mb-4">Fresh ingredients for strong immunity</h2>
            <p className="text-[#6B7280] text-[15px] leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, dolorum! Deleniti nemo cumque facilis explicabo nobis suscipit ullam.
            </p>
          </div>
          <div className="rounded-[30px] bg-white p-6 shadow-[0px_20px_50px_rgba(0,0,0,0.08)]">
            <img src="/img/Blog3.png" alt="Blog Detail" className="w-full rounded-[24px] object-cover mb-6" />
            <h2 className="text-[#111827] text-[24px] font-bold mb-4">The best way to enjoy clean eating</h2>
            <p className="text-[#6B7280] text-[15px] leading-relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni, eligendi. Fugiat magni, sed itaque facilis praesentium.
            </p>
          </div>
        </div>

        <div className="rounded-[30px] bg-white p-10 shadow-[0px_20px_50px_rgba(0,0,0,0.08)]">
          <p className="text-[#6B7280] text-[15px] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent suscipit ultrices est, at viverra ex ultricies ut. Phasellus quis eleifend tortor.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <span className="rounded-full bg-[#ECFDF5] px-4 py-2 text-[#065F46] text-[13px] font-semibold">#Health</span>
            <span className="rounded-full bg-[#ECFDF5] px-4 py-2 text-[#065F46] text-[13px] font-semibold">#FreshFood</span>
            <span className="rounded-full bg-[#ECFDF5] px-4 py-2 text-[#065F46] text-[13px] font-semibold">#Nutrition</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
