import React, { useMemo } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function TransactionsLineChart({ transactions }) {
    const data = useMemo(() => {
        // Filter out "ahorros" and sort by date
        const filtered = transactions.filter((t) => t.account !== "ahorros");

        let runningTotal = 0;
        return filtered.map((t) => {
            const multiplier = t.cashflow === "income" ? 1 : -1;
            runningTotal += multiplier * Number(t.amount);
            return {
                date: new Date(t.datetime).toISOString().split("T")[0], // x-axis
                value: Math.round(runningTotal * 100) / 100, // y-axis (cumulative)
            };
        });
    }, [transactions]);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    dot={{ r: 3 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
