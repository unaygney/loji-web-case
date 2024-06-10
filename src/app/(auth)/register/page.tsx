import React from "react";
import RegisterContainer from "@/containers/register-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kayıt Ol | Lojiper",
  description: "Kayıt Sayfası.",
};

export default function Register() {
  return <RegisterContainer />;
}
