import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { PaymentPlan } from "./definitions";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(value);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function groupDebtsByMonth(debts: any) {
  const groupedData = debts.reduce((acc: any, debt: any) => {
    const paymentMonth = new Date(debt.paymentStart).toLocaleString("tr-TR", {
      month: "long",
      year: "numeric",
    });
    if (!acc[paymentMonth]) {
      acc[paymentMonth] = 0;
    }
    acc[paymentMonth] += debt.amount;
    return acc;
  }, {});

  return Object.entries(groupedData).map(([month, amount]) => ({
    month,
    amount,
  }));
}

export function calculateTotalAmount(
  debtAmount: number,
  interestRate: number,
  installment: number
) {
  const monthlyRate = interestRate / 100;
  const totalAmount = debtAmount * (1 + monthlyRate) ** installment;
  return parseFloat(totalAmount.toFixed(2));
}

export function createPaymentPlan(
  debtAmount: number,
  totalAmount: number,
  installment: number,
  paymentStart: string
): PaymentPlan[] {
  const paymentAmount = parseFloat((totalAmount / installment).toFixed(2));
  const paymentPlan: PaymentPlan[] = [];

  for (let i = 0; i < installment; i++) {
    const paymentDate = new Date(paymentStart);
    paymentDate.setMonth(paymentDate.getMonth() + i);
    paymentPlan.push({
      paymentAmount,
      paymentDate: paymentDate.toISOString().split("T")[0],
    });
  }

  return paymentPlan;
}

export function formatDateNumeric(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
}
