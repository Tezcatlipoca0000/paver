export const sessionOptions = {
    password: process.env.SECRET,
    cookieName: "optica-Pa-Ver",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
};