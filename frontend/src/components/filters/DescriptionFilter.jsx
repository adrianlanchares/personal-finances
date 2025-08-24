import { TextField } from "@mui/material";

export default function DescriptionFilter({ description, setDescription }) {
  return (
    <div className="DescriptionFilter">
      <TextField
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        label="Description"
      />
    </div>
  );
}
