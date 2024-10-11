import { Product } from "../components/Types";
import { BASE_URL } from "../constants";

export const getProducts = async (): Promise<Product[]> => {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Product[] = await response.json();
    console.log("Data", data);

    return data;
};

export const editProduct = async (product: Product): Promise<Product> => {
    const response = await fetch(`${BASE_URL}/${product.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });

    if (!response.ok) {
        throw new Error(
            `Failed to edit product. HTTP status: ${response.status}`
        );
    }

    const updatedProduct: Product = await response.json();
    return updatedProduct;
};

export const deleteProduct = async (id: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(
            `Failed to delete product. HTTP status: ${response.status}`
        );
    }
};
