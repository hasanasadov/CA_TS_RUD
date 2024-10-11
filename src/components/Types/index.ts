export interface Category {
    name?: string;
}

export interface Product {
    id: number ;
    name: string;
    unitPrice: number;
    unitsInStock: number;
}


export interface TableProps {
    data: Product[];
    setData: (data: Product[]) => void;
}
