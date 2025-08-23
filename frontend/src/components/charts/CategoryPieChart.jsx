import React, { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

/// Define some colors
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

export default function CategoryPieChart({ transactions }) {
  // Aggregate expenses by category
  const data = useMemo(() => {
    const totals = {};
    transactions.forEach((t) => {
      if (t.cashflow === "expense" && t.account !== "ahorros") {
        totals[t.category] = (totals[t.category] || 0) + Number(t.amount);
      }
    });
    return Object.entries(totals).map(([category, value]) => ({
      name: category,
      value,
    }));
  }, [transactions]);

  return (
    <PieChart width={500} height={500}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={150}
        label
        isAnimationActive={false}
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}

// Usage somewhere in your app
// <CategoryPieChart transactions={transactionList} />
