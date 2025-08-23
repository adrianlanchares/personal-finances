export function MinAmountFilter({amount, setAmount}) {
  return (
    <div className="MinAmountFilter">
      <p>
        <strong>Min Amount<br/></strong>
        <input type="number" value={amount} onChange={e => setAmount(Math.max(0, e.target.value))} placeholder="Min Amount"/>
      </p>
    </div>
  );
}

export function MaxAmountFilter({amount, setAmount}) {
  return (
    <div className="MaxAmountFilter">
      <p>
        <strong>Max Amount<br/></strong>
        <input type="number" value={amount} onChange={e => setAmount(Math.max(0, e.target.value))} placeholder="Max Amount"/>
      </p>
    </div>
  );
}