import React from "react";
import { Product, TableProps } from "../Types";
import EditProductModal from "../Modal";
import { editProduct, deleteProduct } from "../../services";

const Table: React.FC<TableProps> = ({ data, setData }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedProduct, setSelectedProduct] =
        React.useState<Product | null>(null);
    const [confirmDelete, setConfirmDelete] = React.useState(false);
    const [productToDelete, setProductToDelete] =
        React.useState<Product | null>(null);

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setIsOpen(true);
    };

    const handleSave = async (updatedProduct: {
        name: string;
        unitPrice: number;
        unitsInStock: number;
    }) => {
        if (!selectedProduct) {
            console.error("No product selected for editing");
            return;
        }

        console.log("Updated product", updatedProduct);
        try {
            const productWithId = {
                ...updatedProduct,
                id: selectedProduct.id,
            };
            const result = await editProduct(productWithId);

            setData((prevData) =>
                prevData.map((product) =>
                    product.id === result.id ? result : product
                )
            );

            setIsOpen(false);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleDelete = async (product: Product | null) => {
        if (!product) {
            console.error("No product selected for deletion");
            return;
        }
        try {
            await deleteProduct(product.id);
            setData((prevData) => prevData.filter((p) => p.id !== product.id));
            setConfirmDelete(false);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const confirmDeleteProduct = (product: Product) => {
        setProductToDelete(product);
        setConfirmDelete(true);
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Units in Stock
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((product) => {
                        const { name, unitPrice, unitsInStock } = product;
                        return (
                            <tr
                                key={product.id}
                                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                            >
                                <td className="px-6 py-4">{product.id}</td>
                                <td
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {name}
                                </td>
                                <td className="px-6 py-4">{unitsInStock}</td>
                                <td className="px-6 py-4">${unitPrice}</td>
                                <td className="px-6 py-4 flex gap-5">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            confirmDeleteProduct(product)
                                        }
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <EditProductModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                product={selectedProduct}
                onSave={handleSave}
            />

            {confirmDelete && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={() => setConfirmDelete(false)}
                    ></div>
                    <div className="bg-white rounded-lg shadow-lg z-10 p-5">
                        <h2 className="text-lg font-semibold">
                            Confirm Deletion
                        </h2>
                        <p>
                            Are you sure you want to delete{" "}
                            {productToDelete?.name}?
                        </p>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setConfirmDelete(false)}
                                className="mr-2 text-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(productToDelete)}
                                className="bg-red-600 text-white rounded px-4 py-2"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Table;
