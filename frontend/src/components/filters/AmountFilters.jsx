import { TextField } from "@mui/material";

export function MinAmountFilter({ minAmount, setMinAmount }) {
  return (
    <div className="MinAmountFilter">
      <TextField
        type="number"
        value={minAmount}
        onChange={(e) => setMinAmount(Math.max(0, Number(e.target.value)))}
        label="Min Amount"
      />
    </div>
  );
}

export function MaxAmountFilter({ maxAmount, setMaxAmount }) {
  return (
    <div className="MaxAmountFilter">
      <TextField
        type="number"
        value={maxAmount}
        onChange={(e) => setMaxAmount(Math.max(0, Number(e.target.value)))}
        label="Max Amount"
      />
    </div>
  );
}
