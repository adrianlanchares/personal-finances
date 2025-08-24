import { TextField } from "@mui/material";

export default function CategoryFilter({ category, setCategory }) {
  return (
    <div className="CategoryFilter">
      <TextField
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        label="Category"
      />
    </div>
  );
}
