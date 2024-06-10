import { NextRequest, NextResponse } from "next/server";
import { registerSchema } from "@/lib/validations";
import * as yup from "yup";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    //* Validate the request body
    await registerSchema.validate(body, { abortEarly: false });

    //* Destructure the body
    const { email, password } = body;

    return NextResponse.json({ message: "Kayıt başarılı" }, { status: 200 });
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
