import { DateRangeCalendar } from '@mui/x-date-pickers-pro';
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
        <DateRangeCalendar
            startDate={startDate}
            endDate={endDate}
            onChange={({ start, end }) => {
                setStartDate(start);
                setEndDate(end);
            }}
        />
    );
}