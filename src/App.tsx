import { useEffect, useState } from "react";
import Table from "./components/Table";
import { getProducts } from "./services";
import { Product } from "./components/Types";

function App() {
    const [data, setData] = useState<Product[]>([]);
    useEffect(() => {
        getProducts().then((data) => setData(data));
    }, []);

    return (
        <>
            <Table data={data} setData={setData} />
        </>
    );
}

export default App;
