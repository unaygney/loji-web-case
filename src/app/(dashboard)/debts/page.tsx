import React from "react";
import DebtsContainer from "@/containers/debts-container";
import { getAllDebts } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Borçlar Sayfası",
  description: "Borçlar Sayfası",
};

export default async function Debts() {
  const data = await getAllDebts();

  return <DebtsContainer debts={data} />;
}
