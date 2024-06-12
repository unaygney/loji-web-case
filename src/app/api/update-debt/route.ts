import {
  calculateTotalAmount,
  createPaymentPlan,
  formatDateNumeric,
} from "@/lib/utils";
import { createDebtSchema } from "@/lib/validations";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

export async function POST(req: NextRequest) {
  try {
    const { value: token } = req.cookies.get("token") ?? { value: null };

    const data = await req.json();
    await createDebtSchema.validate(data, { abortEarly: false });

    //* Destructure the body
    const {
      id,
      installment,
      paymentStart,
      interestRate,
      debAmount,
      lenderName,
      debtName,
    } = data;

    //* Calculate the total amount and create the payment plan
    const totalAmount = calculateTotalAmount(
      debAmount,
      interestRate,
      installment
    );
    const paymentPlan = createPaymentPlan(
      debAmount,
      totalAmount,
      installment,
      paymentStart
    );

    //* Check if the description is provided or not?
    let description = data.description || "";
    const formattedPaymentStart = formatDateNumeric(paymentStart);

    //* Create a PUT request to the API
    const response = await fetch(
      `https://study.logiper.com/finance/debt/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          debtName,
          lenderName,
          debtAmount: debAmount,
          interestRate,
          amount: totalAmount,
          paymentStart: formattedPaymentStart,
          installment,
          description,
          paymentPlan: paymentPlan.map((payment) => ({
            paymentDate: formatDateNumeric(payment.paymentDate),
            paymentAmount: payment.paymentAmount,
          })),
        }),
      }
    );

    //*   if the response is not ok, return an error message
    if (!response.ok) {
      return NextResponse.json(
        { message: "Borç Oluşturulurken Hatayla Karşılaşıldı!" },
        { status: 400 }
      );
    }

    //* you can return a success message if the response is ok
    return NextResponse.json({
      message: "Borç Başarıyla Oluşturuldu!",
    });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    console.error("Error creating debt:", error);
    return NextResponse.json(
      { message: "An error occurred while creating the debt." },
      { status: 500 }
    );
  }
}
