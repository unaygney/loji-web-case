import { getDebtWithId } from "@/lib/api";
import React from "react";
import DebtContainer from "@/containers/debt-container";
export default async function PaymentPlan({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const debt = await getDebtWithId(id);

  return <DebtContainer debt={debt} />;
}
