import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: { name: string; unitPrice: number; unitsInStock: number } | null;
    onSave: (updatedProduct: { name: string; unitPrice: number; unitsInStock: number }) => void;
}

const EditProductModal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    product,
    onSave,
}) => {
    const [name, setName] = React.useState<string>("");
    const [unitPrice, setUnitPrice] = React.useState<number>(0);
    const [unitsInStock, setUnitsInStock] = React.useState<number>(0);

    React.useEffect(() => {
        if (product) {
            setName(product.name);
            setUnitPrice(product.unitPrice);
            setUnitsInStock(product.unitsInStock);
        }
    }, [product]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, unitPrice, unitsInStock }); // Call the onSave function with updated product details
        onClose(); // Close the modal after saving
        
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded-lg shadow-lg z-10 p-5">
                <h2 className="text-lg font-semibold">Edit Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Product Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Unit Price:</label>
                        <input
                            type="number"
                            value={unitPrice}
                            onChange={(e) => setUnitPrice(Number(e.target.value))}
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Units in Stock:</label>
                        <input
                            type="number"
                            value={unitsInStock}
                            onChange={(e) => setUnitsInStock(Number(e.target.value))}
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="mr-2 text-gray-500">
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;
