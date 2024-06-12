"use client";
import React from "react";
//* Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
//* Icons
import { Loader2 } from "lucide-react";
//* Libraries
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//* Types
import { Inputs } from "@/lib/definitions";
import { RegisterInputs } from "@/lib/definitions";
import { registerSchema } from "@/lib/validations";
//* Hooks
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function RegisterContainer() {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInputs>({ resolver: yupResolver(registerSchema) });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      toast({
        title: "Kayıt Başarılı",
        description: "Giriş sayfasına yönlendiriliyorsunuz.",
      });
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      toast({
        title: "Giriş Başarısız",
        description: result.message || "Bir hata oluştu.",
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-[350px] flex flex-col gap-4 px-8 md:px-0"
    >
      <div className="relative">
        <Label htmlFor="email">Email</Label>
        <Input {...register("email")} id="email" type="email" />
        {errors.email && (
          <p className="text-red-500 text-xs absolute -bottom-5 left-0">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="relative">
        <Label htmlFor="email">Ad</Label>
        <Input {...register("name")} id="name" type="string" />
        {errors.name && (
          <p className="text-red-500 text-xs absolute -bottom-5 left-0">
            {errors.name.message}
          </p>
        )}
      </div>
      <div className="relative">
        <Label htmlFor="password">Parola</Label>
        <Input id="password" {...register("password")} type="password" />
        {errors.password && (
          <p className="text-red-500 text-xs absolute -bottom-5 left-0">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="relative">
        <Label htmlFor="confirmPassword">Parola Tekrar</Label>
        <Input
          id="confirmPassword"
          {...register("confirmPassword")}
          type="password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs absolute -bottom-5 left-0">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Link
        href={"/login"}
        className="text-sm text-center text-zinc-500 font-normal leading-5 "
      >
        Zaten bir hesabınız var mı?{" "}
        <span className="font-semibold leading-5 text-zinc-700">
          Giriş Yapın.
        </span>
      </Link>

      <Button
        variant="outline"
        className="bg-[#299FCE] text-white "
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
        Giriş Yap
      </Button>
    </form>
  );
}
