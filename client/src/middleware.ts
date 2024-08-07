import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { readPayload } from "../src/database/helpers/jwt";

export async function middleware(request: NextRequest) {
    const authentication = cookies().get("Authorization");

    if (request.nextUrl.pathname.startsWith("/api/wishlist")) {
        if (!authentication) {
            return NextResponse.json(
                {
                    message: "Please login first",
                },
                { status: 401 }
            );
        }

        const [type, token] = authentication.value.split(" ");
        if (type !== "Bearer") {
            return NextResponse.json(
                {
                    message: "Authentication Failed",
                },
                { status: 401 }
            );
        }

        const decodedToken = await readPayload<{ _id: string }>(token);
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-id-user", decodedToken._id);

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    }

    if (request.nextUrl.pathname.startsWith("/wishlist")) {
        if (!authentication) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }
}

export const config = {
    matcher: ["/api/wishlist/:path*", "/wishlist"],
};
