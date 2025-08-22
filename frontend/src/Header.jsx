import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header() {

    const [balances, setBalances] = useState([]);

    useEffect(() => {
        const fetchBalances = async () => {
            const response = await fetch('http://10.8.0.1:8000/transactions/balance/');
            const data = await response.json();
            setBalances(data);
        };

        fetchBalances();
    }, []);

    return (
        <header>
            <div>
                <h2>Your Balances</h2>
                <ul>
                    {balances.map((balance) => (
                        <li key={balance.id}>
                            {balance.name}: {balance.amount}
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
}