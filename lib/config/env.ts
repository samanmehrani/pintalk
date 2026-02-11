const env = (process.env.NODE_ENV || "development").trim().toLowerCase()
export const isDev = env === "development"
export const isProd = env === "production"

console.log({ env: process.env.NODE_ENV });

export const accessToken = {
  name: "access_token",
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 8 * 60 * 60,
  },
}

export { env }