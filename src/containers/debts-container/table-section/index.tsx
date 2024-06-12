"use client";
import React from "react";
//* Components
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
//* Utils
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
//* Constants
import { FORM_FIELDS } from "./constant";
//* Libraries
import { Calendar as CalendarIcon } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Loader2 } from "lucide-react";
//* Validations or Types
import { CreateDebt, UpdateFormData } from "@/lib/definitions";
import { createDebtSchema, debtFormSchema } from "@/lib/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { getDebtWithId } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { title } from "process";

export default function TableSection({ debts }: { debts: any[] }) {
  return (
    <div className="mt-6">
      {debts.length > 0 ? (
        <Table>
          <TableCaption>Borçların listelendiği tablo.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[140px]">Borç Alınan Kişi</TableHead>
              <TableHead className="w-[140px]">Borç Durumu</TableHead>
              <TableHead className="w-[140px]">Faiz Oranı</TableHead>
              <TableHead className="w-[140px] text-right">
                Toplam Borç
              </TableHead>
              <TableHead className="w-[140px] text-right">Aksiyonlar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {debts.map((debt) => (
              <TableRow key={debt.id}>
                <TableCell className="font-medium">{debt.lenderName}</TableCell>
                <TableCell>{debt.isActive ? "Aktif" : "Pasif"}</TableCell>
                <TableCell>{debt.interestRate}%</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(debt.amount)}
                </TableCell>
                <TableCell className="text-right ml-auto  flex-1">
                  <div className="flex flex-col md:flex-row justify-end gap-4">
                    <Dialog>
                      <Button variant="destructive" asChild>
                        <DialogTrigger className="max-w-[230px]">
                          Düzenle
                        </DialogTrigger>
                      </Button>
                      <DialogContent className="overflow-scroll max-h-[80vh]">
                        <DialogHeader>
                          <DialogTitle>Borcu Düzenle</DialogTitle>
                          <DialogDescription>
                            Borç detaylarını düzenlemek için gerekli alanları
                            doldurunuz.
                            <DialogForm id={debt.id} />
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                    <Button asChild>
                      <Link href={`/payment-plan/${debt.id}`}>
                        Ödeme Planı Görüntüle
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          Borç bulunamadı. Yeni borç eklemek için butona tıklayın.
        </div>
      )}
    </div>
  );
}

const DialogForm: React.FC<DialogFormProps> = ({ id }) => {
  const { toast } = useToast();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateDebt>({
    resolver: yupResolver(createDebtSchema),
    defaultValues: async () => {
      const formData = await getDebtWithId(id);
      return {
        ...formData,
        paymentStart: new Date(formData.paymentStart),
        debAmount: formData.debtAmount,
      };
    },
  });

  React.useEffect(() => {
    async function fetchData() {
      const formData = await getDebtWithId(id);
      Object.keys(formData).forEach((key) => {
        if (key === "debtAmount") {
          setValue("debAmount" as keyof CreateDebt, formData[key]);
        } else {
          setValue(key as keyof CreateDebt, formData[key]);
        }
      });
      setDate(new Date(formData.paymentStart));
    }
    fetchData();
  }, [id, setValue]);

  const onSubmit: SubmitHandler<CreateDebt> = async (data) => {
    const response = await fetch("/api/update-debt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      toast({
        title: "Borç Güncellenirken Hata Oluştu",
      });
    }
    if (response.ok) {
      toast({
        title: "Borç Başarıyla Güncellendi",
      });
      setTimeout(() => window.location.reload(), 2000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="overflow-auto p-4 flex flex-col gap-3"
    >
      {FORM_FIELDS.map(({ id, label, name, type, placeholder }) => {
        if (type === "text" || type === "number") {
          return (
            <div key={id} className="flex flex-col">
              <Label htmlFor={name} className="text-sm font-medium">
                {label}
              </Label>
              <Input
                type={type}
                id={name}
                {...register(name as keyof CreateDebt)}
                placeholder={placeholder}
                className="text-black"
              />
              {errors[name as keyof CreateDebt] && (
                <span className="text-red-500">
                  {errors[name as keyof CreateDebt]?.message}
                </span>
              )}
            </div>
          );
        } else if (type === "date") {
          return (
            <div key={id} className="flex flex-col mb-4">
              <Label htmlFor={name} className="text-sm font-medium">
                {label}
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? date.toLocaleDateString() : "Başlangıç Tarihi Seç"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                      setDate(selectedDate);
                      if (selectedDate) {
                        const event = {
                          target: {
                            name: name,
                            value: selectedDate,
                          },
                        };
                        register(name as keyof CreateDebt).onChange(event);
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors[name as keyof CreateDebt] && (
                <span className="text-red-500">
                  {errors[name as keyof CreateDebt]?.message}
                </span>
              )}
            </div>
          );
        } else {
          return null;
        }
      })}
      <p>Yıldızlı(*) Alanlar Zorunludur.</p>
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting && <Loader2 className="animate-spin w-4 h-4 mr-2" />}Borç
        Güncelle
      </Button>
    </form>
  );
};

type DialogFormProps = {
  id: string;
};
