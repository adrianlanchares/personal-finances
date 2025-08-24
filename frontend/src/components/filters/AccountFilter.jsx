import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

export default function AccountFilter({ account, setAccount }) {
  return (
    <FormControl fullWidth>
      <InputLabel>Account</InputLabel>
      <Select
        defaultValue="all"
        value={account}
        label="Account"
        onChange={(e) => setAccount(e.target.value)}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="tarjeta">Tarjeta</MenuItem>
        <MenuItem value="efectivo">Efectivo</MenuItem>
        <MenuItem value="ahorros">Ahorros</MenuItem>
      </Select>
    </FormControl>
  );
}
