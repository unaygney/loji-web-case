import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiError } from "next/dist/server/api-utils";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function Summary({ debts }: { debts: any }) {
  const totalDebt = debts.reduce((acc: number, debt: any) => {
    return acc + debt.amount;
  }, 0);
  const totalDebtCount = debts.length;
  const nearestPaymentData = debts.reduce((acc: any, debt: any) => {
    if (!acc) {
      return debt;
    }
    if (new Date(debt.paymentStart) < new Date(acc.paymentStart)) {
      return debt;
    }
    return acc;
  }, null);
  const totalInstallmentCount = debts.reduce((acc: number, debt: any) => {
    return acc + debt.installment;
  }, 0);

  return (
    <section
      id="summary"
      className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-4 mt-8 "
    >
      <Card>
        <CardHeader>
          <CardTitle>Toplam Borç</CardTitle>
        </CardHeader>
        <CardContent>{formatCurrency(totalDebt)}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Borç Sayısı</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{totalDebtCount}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Toplam Taksit Sayısı</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{totalInstallmentCount}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Ödemesi En Yakın Borç Tarihi</CardTitle>
        </CardHeader>
        <CardContent>
          {nearestPaymentData ? (
            <p>{formatDate(nearestPaymentData.paymentStart)}</p>
          ) : (
            <p>En yakın Tarihli Borç Verisine Ulaşılamadı.</p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
