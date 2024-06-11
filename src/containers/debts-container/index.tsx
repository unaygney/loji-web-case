"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import TableSection from "./table-section";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { debtFormSchema } from "@/lib/validations";
import { UpdateFormData } from "@/lib/definitions";
import { FORM_FIELDS } from "./table-section/constant";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
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
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateFormData>({ resolver: yupResolver(debtFormSchema) });

  const onSubmit: SubmitHandler<UpdateFormData> = async (data) => {
    const response = fetch("/api/create-debt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = (await response).json();
    console.log(res);
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
                {...register(name as keyof UpdateFormData)}
                placeholder={placeholder}
                className="border border-gray-300 rounded-md p-2"
              />
              {errors[name as keyof UpdateFormData] && (
                <span className="text-red-500">
                  {errors[name as keyof UpdateFormData]?.message}
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
                        register(name as keyof UpdateFormData).onChange(event);
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors[name as keyof UpdateFormData] && (
                <span className="text-red-500">
                  {errors[name as keyof UpdateFormData]?.message}
                </span>
              )}
            </div>
          );
        } else {
          return null;
        }
      })}
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting && <Loader2 className="animate-spin w-4 h-4 mr-2" />}Borç
        Oluştur
      </Button>
    </form>
  );
}
