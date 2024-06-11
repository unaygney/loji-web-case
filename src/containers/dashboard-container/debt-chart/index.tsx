"use client";
import { groupDebtsByMonth } from "@/lib/utils";
import React from "react";

import {
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export default function DebtChart({ debts }: { debts: any }) {
  const data = groupDebtsByMonth(debts);
  console.log(data);
  return (
    <>
      <h2 className="text-xl leading-8 text-zinc-800 font-bold">
        Grafik Gösterim
      </h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
