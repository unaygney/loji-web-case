"use client";
import React from "react";

//* Components
import { Button } from "@/components/ui/button";
import TableSection from "./table-section";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
//* Hooks
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

//* Types
import { createDebtSchema } from "@/lib/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateDebt } from "@/lib/definitions";

//* Constants
import { FORM_FIELDS } from "./table-section/constant";

//* Libs
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function DebtsContainer({ debts }: { debts: any[] }) {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold leading-8 text-gray-900">
        Borçlar Sayfası
      </h1>
      <section className="flex flex-col gap-10">
        <TableSection debts={debts} />
        <Dialog>
          <Button asChild>
            <DialogTrigger className="max-w-[230px]">
              Borç Oluştur
            </DialogTrigger>
          </Button>
          <DialogContent className="overflow-scroll max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Borç Oluştur</DialogTitle>
              <DialogDescription>
                Borç detaylarını düzenlemek için gerekli alanları doldurunuz.
                <DialogForm />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </section>
    </main>
  );
}

function DialogForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateDebt>({ resolver: yupResolver(createDebtSchema) });

  const onSubmit: SubmitHandler<CreateDebt> = async (data) => {
    const response = await fetch("/api/create-debt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      toast({
        title: "Borç Başarılı Bir Şekilde Oluşturuldu",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      toast({
        title: "Borç Oluşturulamadı",
      });
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
                className="border border-gray-300 rounded-md p-2"
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
        Oluştur
      </Button>
    </form>
  );
}
