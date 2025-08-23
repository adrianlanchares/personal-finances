export function MinAmountFilter({minAmount, setMinAmount}) {
  return (
    <div className="MinAmountFilter">
      <p>
        <strong>Min Amount<br/></strong>
        <input type="number" value={minAmount} onChange={e => setMinAmount(Math.max(0, e.target.value))} placeholder="Min Amount"/>
      </p>
    </div>
  );
}

export function MaxAmountFilter({maxAmount, setMaxAmount}) {
  return (
    <div className="MaxAmountFilter">
      <p>
        <strong>Max Amount<br/></strong>
        <input type="number" value={maxAmount} onChange={e => setMaxAmount(Math.max(0, e.target.value))} placeholder="Max Amount"/>
      </p>
    </div>
  );
}