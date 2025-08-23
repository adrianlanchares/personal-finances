import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {IconButton, Tooltip} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const INITIAL_PAGE = 1;
const TRANSACTIONS_PER_PAGE = 10;


function TransactionListPage({ transactionList, currentPage, setCurrentPage, filters, setFilters }) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="container">
      <h2>Transaction list</h2>

      <Tooltip title={showFilters ? "Hide Filters" : "Show Filters"}>
        <IconButton
          color={showFilters ? "primary" : "default"}
          onClick={() => setShowFilters(prev => !prev)}
          sx={{ mb: 2 }}
        >
          <SearchIcon />
        </IconButton>
      </Tooltip>

      {showFilters && (
        <Filters
          filters={filters}
          setFilters={setFilters}
        />
      )}

      <TransactionList transactionList={transactionList} />
      <PageFilter currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

function Filters({ filters, setFilters }) {
  const {amount, description, category, account, cashflow} = filters;
  const {setAmount, setDescription, setCategory, setAccount, setCashflow} = setFilters;
  return (<>
    <div className = "filters-container">
      <h3 id="filters">Filters</h3>
      <div className="filters">
        <AmountFilter amount={amount} setAmount={setAmount}/>
        <DescriptionFilter description={description} setDescription={setDescription}/>
        <CategoryFilter category={category} setCategory={setCategory}/>
        <AccountFilter account={account} setAccount={setAccount}/>
        <CashflowFilter cashflow={cashflow} setCashflow={setCashflow}/>
      </div>
    </div>
  </>);
}


function PageFilter({currentPage, setCurrentPage}) {
  function changePage(page) {
    page = Math.max(INITIAL_PAGE, page);
    setCurrentPage(page);
  }
  return (
    <div className="PageFilter">
      <button onClick={() => changePage(currentPage - 1)} disabled={currentPage===INITIAL_PAGE}>&lt;</button>
      <p>{currentPage}</p>
      {/* <input type="number" value={currentPage} onChange={(e) => changePage(e.target.value)}/> */}
      <button onClick={() => changePage(currentPage + 1)}>&gt;</button>
    </div>
  );
}

function AmountFilter({amount, setAmount}) {
  return (
    <div className="AmountFilter">
      <p>
        <strong>Amount<br/></strong>
        <input type="number" value={amount} onChange={e => setAmount(Math.max(0, e.target.value))} placeholder="Amount"/>
      </p>
    </div>
  );
}


function DescriptionFilter({description, setDescription}) {
  return (
    <div className="DescriptionFilter">
      <p>
        <strong>Description<br/></strong>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"/>
      </p>
    </div>
  );
}

function CategoryFilter({category, setCategory}) {
  return (
    <div className="CategoryFilter">
      <p>
        <strong>Category<br/></strong>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category"/>
      </p>
    </div>
  );
}


function AccountFilter({account, setAccount}) {
  return (
    <div className="AccountFilter">
      <p>
        <strong>Account<br/></strong>
        <input type="text" value={account} onChange={(e) => setAccount(e.target.value)} placeholder="Account"/>
      </p>
    </div>
  );
}

function CashflowFilter({cashflow, setCashflow}) {
  return (
    <div className="CashflowFilter">
      <p>
        <strong>Cashflow<br/></strong>
        <input type="text" value={cashflow} onChange={(e) => setCashflow(e.target.value)} placeholder="Cashflow"/>
      </p>
    </div>
  );
}


function TransactionList({transactionList}) {
  return (<div>
    {transactionList.map(transaction => 
      // Remove the link appearance
      // Add unique key to each transaction
      <NavLink to={`/transactions/${transaction.id}`} key={transaction.id} style={{textDecoration: 'none', color: 'black'}}>
        <Transaction transaction={transaction}/>
      </NavLink>)}
  </div>);
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
      <span style={{ width: 200, fontWeight: "bold" }}>{transaction.description}</span>
      <span>{transaction.amount} €</span>
      <span>
        {new Date(transaction.datetime).toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).replace(",", " @")}
      </span>
    </div>
  );
}


function App() {
  const [transactionList, setTransactionList] = useState([]);
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [account, setAccount] = useState('');
  const [cashflow, setCashflow] = useState('');
  const filters = {
    amount: amount,
    description: description,
    category: category,
    account: account,
    cashflow: cashflow
  }
  const setFilters = {
    setAmount: setAmount,
    setDescription: setDescription,
    setCategory: setCategory,
    setAccount: setAccount,
    setCashflow: setCashflow
  }

  useEffect(() => {
    let skip = (currentPage - INITIAL_PAGE) * TRANSACTIONS_PER_PAGE;
    const fetchTransactions = async () => {
      try {
        // Content type application json
        const url = new URL(`http://10.8.0.1:8000/transactions/`)
        const params = new URLSearchParams();
        if (amount) params.append('amount', amount);
        if (description) params.append('description', description);
        if (category) params.append('category', category);
        if (account) params.append('account', account);
        if (cashflow) params.append('cashflow', cashflow);
        params.append('limit', TRANSACTIONS_PER_PAGE);
        params.append('skip', skip);
        
        url.search = params.toString();
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Could not find the list');
        } 
        const data = await response.json();
        // We have done this if - else to prevent having to load all the movies
        // in order to know if we have reached the end of the list
        if (data.length === 0) {
          setCurrentPage(Math.max(INITIAL_PAGE, currentPage - 1));
        }
        else {
          setTransactionList(data);
        }
      } catch (error) {
        console.error('Error while obtaining the list:', error);
      }
    };

    fetchTransactions();
  }, [currentPage, amount, description, category, account, cashflow]);

  return (
      <TransactionListPage
        transactionList={transactionList}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        filters={filters}
        setFilters={setFilters}
      />      
  )
}

export default App
