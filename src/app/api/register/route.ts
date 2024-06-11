import { NextRequest, NextResponse } from "next/server";
import { registerSchema } from "@/lib/validations";
import * as yup from "yup";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    //* Validate the request body
    await registerSchema.validate(body, { abortEarly: false });

    //* Destructure the body
    const { email, name, password, confirmPassword } = body;

    const response = await fetch("https://study.logiper.com/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Kayıt olurken hatayla karşılaşıldı" },
        { status: 400 }
      );
    }

    const res = NextResponse.json(
      { message: "Kayıt başarılı" },
      { status: 200 }
    );
    return res;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Bir hata oluştu", error },
      { status: 400 }
    );
  }
}
