import { useEffect, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

/* Filter imports */
import AccountFilter from "../components/filters/AccountFilter.jsx";
import CashflowFilter from "../components/filters/CashflowFilter.jsx";
import { DateFilter } from "../components/filters/DateFilters.jsx";

/* Chart imports */
import CategoryPieChart from "../components/charts/CategoryPieChart.jsx";

function ChartsPage({ transactionList, filters, setFilters }) {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className="container">
            <h1>Transaction Charts</h1>
            <Tooltip title={showFilters ? "Hide Filters" : "Show Filters"}>
                <IconButton
                    color={showFilters ? "primary" : "default"}
                    onClick={() => setShowFilters((prev) => !prev)}
                    sx={{ mb: 2 }}
                >
                    <FilterListIcon />
                </IconButton>
            </Tooltip>

            {showFilters && (
                <Filters filters={filters} setFilters={setFilters} />
            )}
            <CategoryPieChart transactions={transactionList} />
        </div>
    );
}

function Filters({ filters, setFilters }) {
    const { account, cashflow, date } = filters;
    const { setAccount, setCashflow, setDate } = setFilters;
    return (
        <>
            <div className="filters-container">
                <h3 id="filters">Filters</h3>
                <AccountFilter account={account} setAccount={setAccount} />
                <CashflowFilter cashflow={cashflow} setCashflow={setCashflow} />
                <DateFilter date={date} setDate={setDate} />
            </div>
        </>
    );
}

export default function App() {
    const [transactionList, setTransactionList] = useState([]);
    const [account, setAccount] = useState("");
    const [cashflow, setCashflow] = useState("");
    const [date, setDate] = useState("");

    const filters = {
        account: account,
        cashflow: cashflow,
        date: date,
    };
    const setFilters = {
        setAccount: setAccount,
        setCashflow: setCashflow,
        setDate: setDate,
    };

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const url = new URL(`http://10.8.0.1:8000/transactions/`);
                const params = new URLSearchParams();
                if (account) params.append("account", account);
                if (cashflow) params.append("cashflow", cashflow);
                if (date) params.append("date", date);

                url.search = params.toString();
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Could not find the list");
                }
                const data = await response.json();

                setTransactionList(data);
            } catch (error) {
                console.error("Error while obtaining the list:", error);
            }
        };

        fetchTransactions();
    }, [account, cashflow, date]);

    return (
        <ChartsPage
            transactionList={transactionList}
            filters={filters}
            setFilters={setFilters}
        />
    );
}
