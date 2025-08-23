import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material'

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
        <header className="site-header">
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <div style={{backgroundColor: '#FA8970', padding: '1rem', borderRadius: '8px', paddingTop: '0px', paddingBottom: '0px' }}>
                        <h2>Tarjeta: {balances.tarjeta} €</h2>
                    </div>
                    <div style={{backgroundColor: '#76C869', padding: '1rem', borderRadius: '8px', paddingTop: '0px', paddingBottom: '0px' }}>
                        <h2>Efectivo: {balances.efectivo} €</h2>
                    </div>
                    <div style={{backgroundColor: '#6CA9F9', padding: '1rem', borderRadius: '8px', paddingTop: '0px', paddingBottom: '0px' }}>
                        <h2>Ahorros: {balances.ahorros} €</h2>
                    </div>
                </div>
            </div>
            <nav className="site-nav">
                <Button href="/list" variant="contained" style={{ margin: '0 10px' }}>Ver Transacciones</Button>
                <Button href="/charts" variant="contained" style={{ margin: '0 10px' }}>Gráficos</Button>
            </nav>
        </header>
    );
}