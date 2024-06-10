import React from "react";
import DashboardContainer from "@/containers/dashboard-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anasayfa",
  description: "Lojiper Borç Ödeme Sistemi Anasayfası",
};

export default function Dashboard() {
  return <DashboardContainer />;
}
