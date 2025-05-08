// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "./constants/environments";

const roleRoutes: { [key: string]: number[] } = {
  "/dashboard": [1],
  "/customers": [1, 2, 3],
  "/owners": [1, 2, 3],
  "/workspaces": [1, 2, 3],
  "/employees": [1],
  "/verify-owner": [1, 3],
  "/withdrawal-request": [1, 2],
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Match base paths only
  const basePath = Object.keys(roleRoutes).find((route) =>
    pathname.startsWith(route)
  );
  if (!basePath) return NextResponse.next();

  const token = req.cookies.get("admin_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  try {
    const decodeResponse = await fetch(`${BASE_URL}/users/decodejwttoken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        token: token,
      }),
    });

    if (!decodeResponse.ok) {
      throw new Error("Đăng nhập thất bại! Vui lòng kiểm tra lại.");
    }

    const decoded = await decodeResponse.json();

    if (
      decoded.claims.RoleId !== "1" &&
      decoded.claims.RoleId !== "2" &&
      decoded.claims.RoleId !== "3"
    ) {
      throw new Error("Không có quyền truy cập!");
    }
    const role = Number(decoded.claims.RoleId);

    const allowedRoles = roleRoutes[basePath];
    if (allowedRoles && !allowedRoles.includes(role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to only protected routes
export const config = {
  matcher: [
    "/dashboard",
    "/customers/:path*",
    "/owners/:path*",
    "/workspaces/:path*",
    "/workspaces",
    "/employees",
    "/employees/:path*",
    "/verify-owner",
    "/verify-owner/:path*",
    "/withdrawal-request/:path*",
  ],
};
