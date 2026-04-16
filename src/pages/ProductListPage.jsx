import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import productService from "../service/product.service";

const categoryOptions = [
  { id: 1, label: "Vegetables" },
  { id: 2, label: "Juice & Drinks" },
  { id: 3, label: "Snacks" },
  { id: 4, label: "Bakery" },
  { id: 5, label: "Fruits" },
];

const weightOptions = ["2kg Pack", "5kg Pack", "10kg Pack"];
const tagsOptions = ["Vegetables", "Juice", "Food", "Dry Fruits"];

const ProductListPage = () => {
  const { category_id } = useParams();
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(
    category_id ? Number(category_id) : null,
  );
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [activeWeight, setActiveWeight] = useState(null);
  const [activeTags, setActiveTags] = useState([]);

  useEffect(() => {
    if (category_id) {
      setSelectedCategory(Number(category_id));
      setPage(1);
    }
  }, [category_id]);

  const limit = filtersOpen ? 9 : 12;

  const queryParams = useMemo(() => {
    const params = { page, limit, sort };
    if (priceMin != null && priceMin !== "") params.price_min = priceMin;
    if (priceMax != null && priceMax !== "") params.price_max = priceMax;
    if (selectedCategory) params.category_id = selectedCategory;
    return params;
  }, [page, limit, sort, priceMin, priceMax, selectedCategory]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: () => productService.getProducts(queryParams),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
  });

  const products = Array.isArray(data) ? data : data?.data || [];
  const meta = data?.meta || { page: 1, total_pages: 1, total: Array.isArray(data) ? data.length : 0 };

  const handleCategorySelect = (id) => {
    setSelectedCategory(id);
    setPage(1);
  };

  const handleFilterToggle = () => {
    setFiltersOpen((prev) => !prev);
  };

  const handleTagToggle = (tag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag],
    );
  };

  const currentCategoryLabel =
    categoryOptions.find((option) => option.id === selectedCategory)?.label ||
    "All Products";

  return (
    <section className="py-12 bg-[#F8FAFC] min-h-screen">
      <div className="container mx-auto">
        <div className="mb-8 flex flex-col tablet:flex-row tablet:items-end tablet:justify-between gap-4">
          <div>
            <h1 className="text-[#111827] text-[32px] font-bold mb-2">{currentCategoryLabel}</h1>
            <p className="text-[#6B7280] text-[15px]">
              We found {meta.total} item{meta.total === 1 ? "" : "s"} for you!
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleFilterToggle}
              className="inline-flex items-center gap-2 rounded-[15px] border border-[#D1D5DB] bg-white px-4 py-3 text-[#111827] font-semibold shadow-sm hover:border-[#3BB77E] hover:text-[#3BB77E] transition"
            >
              <span className="text-[18px]">{filtersOpen ? "⌧" : "☰"}</span>
              {filtersOpen ? "Hide filter" : "Show filter"}
            </button>
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="rounded-[15px] border border-[#D1D5DB] bg-white px-4 py-3 text-[#111827]"
            >
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        <div className={`grid gap-6 ${filtersOpen ? "desktop:grid-cols-[300px_minmax(0,1fr)]" : "desktop:grid-cols-1"}`}>
          {filtersOpen && (
            <aside className="rounded-[30px] bg-white p-6 shadow-[0px_20px_50px_rgba(0,0,0,0.08)]">
              <div className="mb-8">
                <h2 className="text-[#111827] text-[18px] font-bold mb-4">Product Category</h2>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => handleCategorySelect(null)}
                    className={`w-full rounded-[18px] px-4 py-3 text-left ${!selectedCategory ? "bg-[#D1FAE5] text-[#065F46]" : "bg-[#F8FAFC] text-[#111827] hover:bg-[#EEF2FF]"}`}>
                    All
                  </button>
                  {categoryOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleCategorySelect(option.id)}
                      className={`w-full rounded-[18px] px-4 py-3 text-left ${selectedCategory === option.id ? "bg-[#D1FAE5] text-[#065F46]" : "bg-[#F8FAFC] text-[#111827] hover:bg-[#EEF2FF]"}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-[#111827] text-[18px] font-bold mb-4">Filter By Price</h2>
                <div className="space-y-3">
                  <div>
                    <label className="text-[#6B7280] text-[14px] mb-2 block">Min price</label>
                    <input
                      type="number"
                      value={priceMin}
                      min="0"
                      onChange={(e) => setPriceMin(e.target.value)}
                      placeholder="Min price"
                      className="w-full rounded-[18px] border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3 text-[#111827]"
                    />
                  </div>
                  <div>
                    <label className="text-[#6B7280] text-[14px] mb-2 block">Max price</label>
                    <input
                      type="number"
                      value={priceMax}
                      min="0"
                      onChange={(e) => setPriceMax(e.target.value)}
                      placeholder="Max price"
                      className="w-full rounded-[18px] border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3 text-[#111827]"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-[#111827] text-[18px] font-bold mb-4">Weight</h2>
                <div className="grid gap-3">
                  {weightOptions.map((weight) => (
                    <button
                      key={weight}
                      type="button"
                      onClick={() => setActiveWeight(weight)}
                      className={`w-full rounded-[18px] px-4 py-3 text-left ${activeWeight === weight ? "bg-[#D1FAE5] text-[#065F46]" : "bg-[#F8FAFC] text-[#111827] hover:bg-[#EEF2FF]"}`}
                    >
                      {weight}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-[#111827] text-[18px] font-bold mb-4">Products Tags</h2>
                <div className="flex flex-wrap gap-3">
                  {tagsOptions.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className={`rounded-full px-4 py-2 text-[13px] ${activeTags.includes(tag) ? "bg-[#3BB77E] text-white" : "bg-[#F8FAFC] text-[#111827] hover:bg-[#E5F7EE]"}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          )}

          <div>
            <div className={`grid gap-6 ${filtersOpen ? "grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3" : "grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4"}`}>
              {isLoading && <div className="text-[#6B7280]">Loading products...</div>}
              {isError && (
                <div className="text-[#EF4444]">Не удалось загрузить продукты.</div>
              )}
              {!isLoading && !products.length && (
                <div className="text-[#6B7280]">No products found for the selected filters.</div>
              )}
              {products.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group overflow-hidden rounded-[30px] bg-white p-5 shadow-[0px_20px_50px_rgba(0,0,0,0.08)] transition hover:shadow-[0px_25px_70px_rgba(0,0,0,0.08)]"
                >
                  <div className="mb-5 h-[210px] overflow-hidden rounded-[24px] bg-[#F8FAFC] flex items-center justify-center">
                    <img
                      src={product.image_url || "/img/placeholder.png"}
                      alt={product.name}
                      className="max-h-full object-contain"
                    />
                  </div>
                  <div className="space-y-3">
                    <p className="text-[#6B7280] text-[13px] uppercase tracking-[0.2em] font-semibold">
                      {product.brand || "Brand"}
                    </p>
                    <h3 className="text-[#111827] text-[18px] font-bold line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[#3BB77E] font-bold text-[18px]">
                      ${product.main_variant?.price?.toFixed(2) ?? "0.00"}
                      {product.main_variant?.old_price && (
                        <span className="text-[#9CA3AF] text-[14px] line-through">
                          ${product.main_variant.old_price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-4">
              <div className="text-[#6B7280] text-[14px]">
                Page {meta.page} of {meta.total_pages}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={meta.page <= 1}
                  className="rounded-[15px] border border-[#D1D5DB] bg-white px-4 py-3 text-[#111827] disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: meta.total_pages }, (_, index) => index + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={`rounded-[15px] px-4 py-3 ${meta.page === pageNumber ? "bg-[#3BB77E] text-white" : "bg-white text-[#111827] border border-[#D1D5DB]"}`}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setPage((prev) => Math.min(prev + 1, meta.total_pages))}
                  disabled={meta.page >= meta.total_pages}
                  className="rounded-[15px] border border-[#D1D5DB] bg-white px-4 py-3 text-[#111827] disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;