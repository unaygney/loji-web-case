import { calculateTotalAmount, createPaymentPlan } from "@/lib/utils";
import { debtFormSchema } from "@/lib/validations";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  await debtFormSchema.validate(data, { abortEarly: false });

  //* Destructure the body
  const {
    installment,
    paymentStart,
    interesRate,
    debAmount,
    lenderName,
    debtName,
  } = data;

  const totalAmount = calculateTotalAmount(debAmount, interesRate, installment);
  const paymentPlan = createPaymentPlan(
    debAmount,
    totalAmount,
    installment,
    paymentStart
  );
  let description = data.description || "";

  return NextResponse.json({
    message: "success",
    data: {
      debtName,
      lenderName,
      debAmount,
      interesRate,
      totalAmount,
      paymentStart,
      installment,
      paymentPlan,
      description,
    },
  });

  return NextResponse.json({ message: "success" });
}
