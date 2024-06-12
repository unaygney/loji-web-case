import { getDebtWithId } from "@/lib/api";
import React from "react";

export default async function PaymentPlan({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const debt = await getDebtWithId(id);

  return <div>PaymentPlan : {id}</div>;
}
