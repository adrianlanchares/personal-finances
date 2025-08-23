import { useEffect, useState } from 'react';
import CategoryPieChart from "../components/charts/CategoryPieChart.jsx";

export default function ChartsPage(){
    const [transactionList, setTransactionList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://10.8.0.1:8000/transactions/");
            const data = await response.json();
            setTransactionList(data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Transaction Charts</h1>
            <CategoryPieChart transactions={transactionList} />
        </div>
    );
}