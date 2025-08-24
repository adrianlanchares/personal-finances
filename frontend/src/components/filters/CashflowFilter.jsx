import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

export default function CashflowFilter({ cashflow, setCashflow }) {
  return (
    <FormControl fullWidth>
      <InputLabel>Cashflow</InputLabel>
      <Select
        defaultValue="all"
        value={cashflow}
        label="Cashflow"
        onChange={(e) => setCashflow(e.target.value)}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="income">Income</MenuItem>
        <MenuItem value="expense">Expense</MenuItem>
      </Select>
    </FormControl>
  );
}
