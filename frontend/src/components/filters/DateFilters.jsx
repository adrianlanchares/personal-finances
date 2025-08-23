import { DateRangeCalendar } from '@mui/x-date-pickers-pro';
import { Select } from '@mui/material';

export function DateFilter({ date, setDate }) {
    return (
        <Select value={date} label={{name: 'Date'}} onChange={(e) => setDate(e.target.value)}>
            <option value={"all"}>All</option>
            <option value={"year"}>Last Year</option>
            <option value={"month"}>Last Month</option>
            <option value={"week"}>Last Week</option>
        </Select>
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