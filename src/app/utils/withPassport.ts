import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import passport from "passport";
import session from "express-session";

import "@/app/lib/passport";

export const withPassport = nextConnect<NextApiRequest, NextApiResponse>()
  .use(session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
  }))
  .use(passport.initialize())
  .use(passport.session());
