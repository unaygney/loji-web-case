"use server";
import { cookies } from "next/headers";
export async function deleteCookie() {
  "use server";
  const token = cookies().get("token");
  const authToken = cookies().get("auth-token");

  if (token && authToken) {
    cookies().delete("token");
    cookies().delete("auth-token");
  }

  return { message: "Başarıyla Çıkış Yapıldı. " };
}
