import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

export default function DateFilter({ date, setDate, defaultValue = "all" }) {
    return (
        <FormControl fullWidth>
            <InputLabel>Date</InputLabel>
            <Select
                defaultValue={defaultValue}
                value={date}
                label="Date"
                onChange={(e) => setDate(e.target.value)}
            >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="year">Last Year</MenuItem>
                <MenuItem value="month">Last Month</MenuItem>
                <MenuItem value="week">Last Week</MenuItem>
            </Select>
        </FormControl>
    );
}
