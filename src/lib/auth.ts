"use server";
import { jwtVerify, JWTPayload } from "jose";

//? This function checks if the page is  authentication pages
export const isAuthPages = (url: string): Boolean => {
  const AUTH_PAGES = ["/login", "/register"];
  return AUTH_PAGES.some((page) => url.startsWith(page));
};

//? This function checks if the page is  dashboard pages
export const isDashboardPage = (url: string): Boolean => {
  const DASHBOARD_PAGES = ["/", "/debts", "/payment-plan"];

  return DASHBOARD_PAGES.some((page) => url.startsWith(page));
};

//? This function returns the secret key for JWT
export const getJwtSecretKey = (): Uint8Array => {
  let secretKey: string | undefined = process.env.SECRET_KEY;

  if (!secretKey) {
    throw new Error("Secret key is not defined");
  }

  console.log("SECRET_KEY type:", typeof secretKey);

  return new TextEncoder().encode(secretKey);
};

//? This function verifies the JWT token
export async function verifyJwtToken(
  token: string
): Promise<JWTPayload | null> {
  const key = getJwtSecretKey();

  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("Token verification failed:");
    return null;
  }
}
