import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

{
  /* Filter Imports */
}
import {
  MinAmountFilter,
  MaxAmountFilter,
} from "../components/filters/AmountFilters.jsx";
import DescriptionFilter from "../components/filters/DescriptionFilter.jsx";
import CategoryFilter from "../components/filters/CategoryFilter.jsx";
import AccountFilter from "../components/filters/AccountFilter.jsx";
import CashflowFilter from "../components/filters/CashflowFilter.jsx";
import PageFilter from "../components/filters/PageFilter.jsx";
import { DateFilter } from "../components/filters/DateFilters.jsx";

const INITIAL_PAGE = 1;
const TRANSACTIONS_PER_PAGE = 10;

function TransactionListPage({
  transactionList,
  currentPage,
  setCurrentPage,
  filters,
  setFilters,
}) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="container">
      <h1>Transaction List</h1>

      <Tooltip title={showFilters ? "Hide Filters" : "Show Filters"}>
        <IconButton
          color={showFilters ? "primary" : "default"}
          onClick={() => setShowFilters((prev) => !prev)}
          sx={{ mb: 2 }}
        >
          <FilterListIcon />
        </IconButton>
      </Tooltip>

      {showFilters && <Filters filters={filters} setFilters={setFilters} />}

      <TransactionList transactionList={transactionList} />
      <PageFilter currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

function Filters({ filters, setFilters }) {
  const {
    minAmount,
    maxAmount,
    description,
    category,
    account,
    cashflow,
    date,
  } = filters;
  const {
    setMinAmount,
    setMaxAmount,
    setDescription,
    setCategory,
    setAccount,
    setCashflow,
    setDate,
  } = setFilters;
  return (
    <>
      <div className="filters-container">
        <h3 id="filters">Filters</h3>
        <div className="filters">
          <MinAmountFilter minAmount={minAmount} setMinAmount={setMinAmount} />
          <MaxAmountFilter maxAmount={maxAmount} setMaxAmount={setMaxAmount} />
          <DescriptionFilter
            description={description}
            setDescription={setDescription}
          />
          <CategoryFilter category={category} setCategory={setCategory} />
        </div>
        <div className="filters">
          <AccountFilter account={account} setAccount={setAccount} />
          <CashflowFilter cashflow={cashflow} setCashflow={setCashflow} />
          <DateFilter date={date} setDate={setDate} />
        </div>
      </div>
    </>
  );
}

function TransactionList({ transactionList }) {
  return (
    <div>
      {transactionList.map((transaction) => (
        // Remove the link appearance
        // Add unique key to each transaction
        <NavLink
          to={`/transactions/${transaction.id}`}
          key={transaction.id}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Transaction transaction={transaction} />
        </NavLink>
      ))}
    </div>
  );
}

function Transaction({ transaction }) {
  // Determine background color
  const bgColor = transaction.cashflow === "income" ? "#d4edda" : "#f8d7da"; // greenish / reddish

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        marginBottom: "8px",
        borderRadius: "6px",
        backgroundColor: bgColor,
      }}
    >
      <span style={{ width: 200, fontWeight: "bold" }}>
        {transaction.description}
      </span>
      <span>{transaction.amount} €</span>
      <span>
        {new Date(transaction.datetime)
          .toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
          .replace(",", " @")}
      </span>
    </div>
  );
}

function App() {
  const [transactionList, setTransactionList] = useState([]);
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [account, setAccount] = useState("");
  const [cashflow, setCashflow] = useState("");
  const [date, setDate] = useState("");

  const filters = {
    minAmount: minAmount,
    maxAmount: maxAmount,
    description: description,
    category: category,
    account: account,
    cashflow: cashflow,
    date: date,
  };
  const setFilters = {
    setMinAmount: setMinAmount,
    setMaxAmount: setMaxAmount,
    setDescription: setDescription,
    setCategory: setCategory,
    setAccount: setAccount,
    setCashflow: setCashflow,
    setDate: setDate,
  };

  useEffect(() => {
    let skip = (currentPage - INITIAL_PAGE) * TRANSACTIONS_PER_PAGE;
    const fetchTransactions = async () => {
      try {
        // Content type application json
        const url = new URL(`http://10.8.0.1:8000/transactions/`);
        const params = new URLSearchParams();
        if (minAmount) params.append("minAmount", minAmount);
        if (maxAmount) params.append("maxAmount", maxAmount);
        if (description) params.append("description", description);
        if (category) params.append("category", category);
        if (account) params.append("account", account);
        if (cashflow) params.append("cashflow", cashflow);
        if (date) params.append("date", date);
        params.append("limit", TRANSACTIONS_PER_PAGE);
        params.append("skip", skip);

        url.search = params.toString();
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Could not find the list");
        }
        const data = await response.json();
        // We have done this if - else to prevent having to load all the movies
        // in order to know if we have reached the end of the list
        if (data.length === 0) {
          setCurrentPage(Math.max(INITIAL_PAGE, currentPage - 1));
        } else {
          setTransactionList(data);
        }
      } catch (error) {
        console.error("Error while obtaining the list:", error);
      }
    };

    fetchTransactions();
  }, [
    currentPage,
    minAmount,
    maxAmount,
    description,
    category,
    account,
    cashflow,
    date,
  ]);

  return (
    <TransactionListPage
      transactionList={transactionList}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      filters={filters}
      setFilters={setFilters}
    />
  );
}

export default App;
