export default function CashflowFilter({cashflow, setCashflow}) {
  return (
    <div className="CashflowFilter">
      <p>
        <strong>Cashflow<br/></strong>
        <input type="text" value={cashflow} onChange={(e) => setCashflow(e.target.value)} placeholder="Cashflow"/>
      </p>
    </div>
  );
}