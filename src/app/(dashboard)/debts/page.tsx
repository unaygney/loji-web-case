import React from "react";
import DebtsContainer from "@/containers/debts-container";
import { getAllDebts } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function Debts() {
  const data = await getAllDebts();

  return <DebtsContainer debts={data} />;
}
