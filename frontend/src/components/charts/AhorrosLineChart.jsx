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

export default function AhorrosLineChart({ transactions }) {
    const data = useMemo(() => {
        // Filter only "ahorros" and sort by date
        const filtered = transactions
            .filter((t) => t.account === "ahorros")
            .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

        let runningTotal = 0;
        return filtered.map((t) => {
            const multiplier = t.cashflow === "income" ? 1 : -1;
            runningTotal += multiplier * Number(t.amount);
            return {
                date: new Date(t.datetime).toISOString().split("T")[0],
                value: Math.round(runningTotal * 100) / 100,
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
                    stroke="#82ca9d"
                    dot={{ r: 3 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
