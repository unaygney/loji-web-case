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
export async function getSecretKey(): Promise<Uint8Array> {
  let secretKey: string | undefined = process.env.SECRET_KEY;

  if (!secretKey) {
    throw new Error("No secret key found");
  }

  return new TextEncoder().encode(secretKey);
}

//? This function verifies the JWT token
export async function verifyJwtToken(
  token: string
): Promise<JWTPayload | null> {
  const key = await getSecretKey();

  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (e) {
    console.log("token verification failed  ", e);
    return null;
  }
}
