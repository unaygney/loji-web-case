import React from "react";
import LoginContainer from "@/containers/login-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giriş Yap | Lojiper ",
  description: "Giriş Sayfası.",
};

export default function Login() {
  return <LoginContainer />;
}
