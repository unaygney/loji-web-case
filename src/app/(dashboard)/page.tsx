import React from "react";
import DashboardContainer from "@/containers/dashboard-container";
import { Metadata } from "next";
import { getAllDebts } from "@/lib/api";

export const metadata: Metadata = {
  title: "Anasayfa",
  description: "Lojiper Borç Ödeme Sistemi Anasayfası",
};

export default async function Dashboard() {
  const data = await getAllDebts();

  return <DashboardContainer debts={data} />;
}
