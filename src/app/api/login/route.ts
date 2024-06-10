import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/lib/validations";
import * as yup from "yup";
import { getSecretKey } from "@/lib/auth";
import { SignJWT } from "jose";

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
      return NextResponse.json(
        { message: "Giriş Yaparken Hata Oluştu!" },
        { status: response.status }
      );
    }

    const data = await response.json();

    const res = NextResponse.json(
      { message: "Giriş başarılı" },
      { status: 200 }
    );
    //* set the cookie for backend authentication
    res.cookies.set("token", data.data, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      secure: true,
      path: "/",
    });

    //* set the cookie for frontend authentication
    const authToken = await new SignJWT({ email: email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(await getSecretKey());

    res.cookies.set("auth-token", authToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 2, // 2 hours
      path: "/",
    });

    return res;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    console.error("error =>", error);

    return NextResponse.json({ message: "Bir hata oluştu" }, { status: 400 });
  }
}
