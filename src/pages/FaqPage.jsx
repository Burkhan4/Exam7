import { useState } from "react";

const faqItems = [
  {
    question: "How can I track my order?",
    answer: "You can track your order in real-time from the My Orders page. Once shipped, we will send you a tracking number by email.",
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 7-day return policy from delivery date. If the product is damaged or unsatisfactory, contact support and we will help you with the return.",
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship internationally to selected countries. Shipping fees and delivery times depend on your region.",
  },
  {
    question: "Can I change my delivery address after placing an order?",
    answer: "If the order is not yet shipped, you can contact our support team to update the delivery address.",
  },
];

const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="bg-[#F8FAFC] py-16">
      <div className="container mx-auto">
        <div className="grid gap-10 desktop:grid-cols-[1.1fr_0.9fr] items-center mb-16">
          <div className="space-y-6">
            <p className="text-[#3BB77E] text-[14px] uppercase tracking-[0.35em] font-bold">
              Frequently Asked Questions
            </p>
            <h1 className="text-[#111827] text-[40px] font-extrabold leading-tight">
              Your questions answered instantly
            </h1>
            <p className="text-[#6B7280] text-[16px] leading-relaxed">
              Read through our most common questions about ordering, delivery and product support.
            </p>
          </div>
          <div className="overflow-hidden rounded-[30px] shadow-[0px_20px_50px_rgba(0,0,0,0.08)]">
            <img src="/img/AboutUs.png" alt="FAQ" className="w-full object-cover" />
          </div>
        </div>

        <div className="rounded-[30px] bg-white p-8 shadow-[0px_20px_50px_rgba(0,0,0,0.08)]">
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={item.question} className="border-b border-[#E5E7EB] pb-4">
                <button
                  type="button"
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className="flex w-full items-center justify-between text-left gap-4 py-4 text-[#111827] font-semibold"
                >
                  <span>{item.question}</span>
                  <span className="text-[20px]">{activeIndex === index ? "−" : "+"}</span>
                </button>
                {activeIndex === index && (
                  <div className="pt-2 text-[#6B7280] text-[15px] leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqPage;
