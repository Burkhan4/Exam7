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

        const queryString = queryParams.toString();
        const url = queryString ? `/products?${queryString}` : "/products";

        console.log("📡 So'rov URL:", url);

        try {
            const res = await this.api.get(url);
            console.log("✅ Backend javobi:", res.data);
            return res.data;
        } catch (error) {
            console.error("❌ API xatolik:", error.response?.data || error.message);
            throw error;
        }
    }

    async getProductById(id) {
        if (!id) {
            throw new Error("Product ID is required");
        }

        const url = `/products/${id}`;
        console.log("📡 So'rov URL:", url);

        try {
            const res = await this.api.get(url);
            console.log("✅ Product detail javobi:", res.data);
            return res.data;
        } catch (error) {
            console.error("❌ API xatolik:", error.response?.data || error.message);
            throw error;
        }
    }

    async createOrder(orderData) {
        const url = "/orders";
        console.log("📡 Order URL:", url);
        console.log("📤 Order data:", orderData);

        try {
            const res = await this.api.post(url, orderData);
            console.log("✅ Order created:", res.data);
            return res.data;
        } catch (error) {
            console.error("❌ Order API xatolik:", error.response?.data || error.message);
            throw error;
        }
    }
}

const productService = new ProductService(axiosInstance);
export default productService;