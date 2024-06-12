import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import React from "react";

export default function DebtContainer({ debt }: { debt: any }) {
  console.log(debt);
  const {
    lenderName,
    debtName,
    installment,
    amount,
    debtAmount,
    interestRate,
    description,
    paymentPlan,
  } = debt;
  return (
    <main className="p-8 flex flex-col gap-10">
      <h1 className="text-3xl font-bold leading-8 text-gray-900">
        Borç Detay Sayfası
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Borcu Veren Kişi : {lenderName}</CardTitle>
          <CardDescription>Borç Adı : {debtName}</CardDescription>
          <CardDescription>Taksit Sayısı: {installment}</CardDescription>
          <CardDescription>Alınan Borç Miktarı: {debtAmount}</CardDescription>
          <CardDescription>Ödenecek Miktar Miktar: {amount}</CardDescription>
          <CardDescription>Faiz Miktarı: {interestRate}%</CardDescription>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <span className="text-zinc-600 font-bold ">Borç Açıklaması :</span>
            {description ? description : "Borç Açıklaması Eklenmedi."}
          </CardDescription>
        </CardContent>
      </Card>
      <h3>Ödeme Planı</h3>
      {paymentPlan &&
        paymentPlan.map(
          (
            {
              id,
              isPaid,
              paymentDate,
              paymentAmount,
            }: {
              id: string;
              isPaid: boolean;
              paymentDate: string;
              paymentAmount: number;
            },
            i: number
          ) => (
            <Card key={id}>
              <CardHeader>
                <CardTitle>Taksit Sayısı: {i + 1}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-1.5">
                <CardDescription>
                  <span className="text-zinc-600 font-bold ">
                    Ödeme Tarihi :
                  </span>
                  {formatDate(paymentDate)}
                </CardDescription>
                <CardDescription>
                  <span className="text-zinc-600 font-bold ">
                    Ödenecek Miktar :
                  </span>
                  {formatCurrency(paymentAmount)}
                </CardDescription>
                <CardDescription className="flex gap-2">
                  <span className="text-zinc-600 font-bold ">
                    Ödeme Durumu :
                  </span>
                  <span
                    className={`${
                      isPaid ? "text-green-400" : "underline text-red-400"
                    }`}
                  >
                    {isPaid ? "Ödendi" : "Ödenmedi"}
                  </span>
                </CardDescription>
              </CardContent>
              <CardFooter>{!isPaid && <Button>Ödeme Yap</Button>}</CardFooter>
            </Card>
          )
        )}
    </main>
  );
}
