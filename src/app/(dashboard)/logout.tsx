"use client";
import React from "react";
//* Components
import { Button } from "@/components/ui/button";
//* Hooks
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
//* Actions
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

      router.push("/login");
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
