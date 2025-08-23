export default function AmountFilter({amount, setAmount}) {
  return (
    <div className="AmountFilter">
      <p>
        <strong>Amount<br/></strong>
        <input type="number" value={amount} onChange={e => setAmount(Math.max(0, e.target.value))} placeholder="Amount"/>
      </p>
    </div>
  );
}