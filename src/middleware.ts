import { auth } from "./auth";

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;

  console.log("HERE ROUTE:", req.nextUrl.pathname);
  console.log("isLoggedIn:", isLoggedIn);
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
