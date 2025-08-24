import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export function DateFilter({ date, setDate }) {
    return (
        <FormControl fullWidth>
            <InputLabel>Date</InputLabel>
            <Select
                defaultValue="all"
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

export function DateRangeFilter({ startDate, endDate, setStartDate, setEndDate }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onChange={({ start, end }) => {
                    setStartDate(start);
                    setEndDate(end);
                }}
            />
        </LocalizationProvider>
    );
}