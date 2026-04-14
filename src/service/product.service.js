import axiosInstance from "../assets/config/axios.config";

class ProductService {
    constructor(api) {
        this.api = api;        // bu yerda axiosInstance kelishi kerak
    }

    async getProducts(params = {}) {
        const queryParams = new URLSearchParams();

        if (params.page) queryParams.append("page", params.page);
        if (params.limit) queryParams.append("limit", params.limit);
        if (params.sort) queryParams.append("sort", params.sort);
        if (params.price_min != null) queryParams.append("price_min", params.price_min);
        if (params.price_max != null) queryParams.append("price_max", params.price_max);
        if (params.category_id) queryParams.append("category_id", params.category_id);

        if (params.attribute_values && Array.isArray(params.attribute_values)) {
            params.attribute_values.forEach(val => queryParams.append("attribute_values", val));
        }

        const url = `/products?${queryParams.toString()}`;

        console.log("📡 So'rov URL:", url);   // debug uchun

        try {
            const res = await this.api.get(url);
            console.log("✅ Backend javobi:", res.data);
            return res.data;
        } catch (error) {
            console.error("❌ API xatolik:", error.response?.data || error.message);
            throw error;
        }
    }
}

// To'g'ri yaratamiz
const productService = new ProductService(axiosInstance);
export default productService;