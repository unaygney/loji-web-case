"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { deleteCookie } from "@/lib/actions";
export default function Logout() {
  const { toast } = useToast();

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await deleteCookie();
      toast({
        title: response.message,
      });

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      toast({
        title: "Çıkış Yapılamadı Lütfen Sonra Tekrar Deneyin",
      });
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button variant="outline">Çıkış Yap</Button>
    </form>
  );
}
