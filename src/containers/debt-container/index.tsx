"use client";
import React from "react";
//* Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
//* Utils
import { formatCurrency, formatDate, formatDateNumeric } from "@/lib/utils";
import { getDeleteDebt, getPaidDebt } from "@/lib/api";
//* Hooks
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function DebtContainer({ debt }: { debt: any }) {
  const { toast } = useToast();
  const router = useRouter();

  const {
    lenderName,
    debtName,
    installment,
    amount,
    debtAmount,
    interestRate,
    description,
    paymentPlan,
    id,
  } = debt;

  //? This function handles the payment of a debt
  const handleClick = async (id: string, date: string) => {
    const res = await getPaidDebt(id, formatDateNumeric(date));
    if (res?.status === "success") {
      toast({ title: "Ödeme Başarılı Bir Şekilde Yapıldı!" });
      setTimeout(() => window.location.reload(), 1500);
      router.push("/");
    } else {
      toast({ title: "Ödeme yapılırken bir hata ile karşılaşıldı" });
      setTimeout(() => window.location.reload(), 1500);
    }
  };
  //? This function handles the deletion of a debt
  const handleDelete = async (id: string) => {
    const res = await getDeleteDebt(id);
    if (res?.status === "success") {
      toast({ title: "Borç Başarılı Bir Şekilde Silindi!" });
      setTimeout(() => window.location.reload(), 1500);
      router.push("/");
    } else {
      toast({ title: "Borç Silinirken Bir Hata Oluştu!" });
      setTimeout(() => window.location.reload(), 1500);
    }
  };
  return (
    <main className="p-8 flex flex-col gap-10">
      <h1 className="text-3xl font-bold leading-8 text-gray-900">
        Borç Detay Sayfası
      </h1>
      <Card className="relative ">
        <AlertDialog>
          <AlertDialogTrigger className="absolute right-5 top-5" asChild>
            <Button>Borcu Sil</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {lenderName}&apos;a Olan Borcu Silmek Üzeresiniz.
              </AlertDialogTitle>
              <AlertDialogDescription>
                Bu İşlem Geri Alınamaz. Silmek İstediğinize Emin Misiniz?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>İptal Et</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(id)}>
                Borcu Sil
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

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
              <CardFooter>
                {!isPaid && (
                  <Button onClick={() => handleClick(id, paymentDate)}>
                    Ödeme Yap
                  </Button>
                )}
              </CardFooter>
            </Card>
          )
        )}
    </main>
  );
}
