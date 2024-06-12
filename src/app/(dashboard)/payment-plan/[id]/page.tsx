import { getDebtWithId } from "@/lib/api";
import React from "react";
import DebtContainer from "@/containers/debt-container";
import { redirect } from "next/navigation";

export default async function PaymentPlan({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const debt = await getDebtWithId(id);

  if (debt.status !== "success") redirect("/");

  return <DebtContainer debt={debt.data} />;
}
