import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/lib/validations";
import * as yup from "yup";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    //* Validate the request body
    await loginSchema.validate(body, { abortEarly: false });

    //* Destructure the body
    const { email, password } = body;

    const response = await fetch("https://study.logiper.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: "Authentication failed", error: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();

    const res = NextResponse.json(
      { message: "Giriş başarılı" },
      { status: 200 }
    );

    res.cookies.set("token", data.data, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      secure: true,
      path: "/",
    });

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
