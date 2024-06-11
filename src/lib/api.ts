"use server";

import { cookies } from "next/headers";
//? This function fetches all debts from the server
export async function getAllDebts() {
  try {
    let baseUrl = "https://study.logiper.com/finance/debt";
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) throw new Error("Token not found");

    const allDebts = await fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await allDebts.json();

    return data.data;
  } catch (e) {
    console.log(e);
  }
}

//? This function fetches a single debt from the server
export async function getDebtWithId({ id }: { id: string }) {
  try {
    let baseUrl = `https://study.logiper.com/finance/debt/${id}`;
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) throw new Error("Token not found");

    const debt = await fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await debt.json();
    return data.data;
  } catch (e) {
    console.log(e);
  }
}
