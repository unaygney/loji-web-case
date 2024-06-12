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
    console.error(e);
  }
}

//? This function fetches a single debt from the server
export async function getDebtWithId(id: string) {
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
    return data;
  } catch (e) {
    console.error(e);
  }
}

//? This function paid a debt from the server
export async function getPaidDebt(id: string, date: string) {
  try {
    let baseUrl = `https://study.logiper.com/finance/payment-plans/${id}`;
    let debtData = {
      paymentDate: date,
      paymentAmount: 0,
      isPaid: true,
    };
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) throw new Error("Token not found");

    const debt = await fetch(baseUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(debtData),
    });
    const data = await debt.json();

    if (data.status === "success") {
      return { message: "Borc odeme islemi basarili oldu.", status: "success" };
    } else {
      return { message: "Borc odeme islemi basarisiz oldu.", status: "error" };
    }
  } catch (e) {
    console.error(e);
  }
}

//? This function deletes a debt from the server
export async function getDeleteDebt(id: string) {
  try {
    let baseUrl = `https://study.logiper.com/finance/debt/${id}`;
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) throw new Error("Token not found");

    const debt = await fetch(baseUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await debt.json();

    if (data.status === "success") {
      return { message: "Borc odeme islemi basarili oldu.", status: "success" };
    } else {
      return { message: "Borc odeme islemi basarisiz oldu.", status: "error" };
    }
  } catch (e) {
    console.error(e);
  }
}
