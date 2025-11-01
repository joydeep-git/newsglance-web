// import { NextRequest, NextResponse } from "next/server";
// import { setLoginState } from "./redux/slices/uiSlice";

import { NextRequest, NextResponse } from "next/server";


// export async function middleware(req: NextRequest) {

//   const token = req.cookies.get("token")?.value;

//   const pathname = req.nextUrl.pathname;

//   const protectedRoutes = ["/profile", "/dashboard", "/settings/*"];

//   if (protectedRoutes.includes(pathname) && !isAuth) {
//     dispatch(setLoginState(true));
//     return;
//   }

//   // if logged in then let them do what they want
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/profile/:path*"],
// };


export async function middleware() {
  return NextResponse.next();
}