import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import prisma from "../prisma/client.js";

const auth = betterAuth({

  database: prismaAdapter(
    prisma,
    {
      provider: "postgresql"
    }
  ),

  emailAndPassword: {
    enabled: true
  },

  session: {
    strategy: "jwt"
  }

});

export default auth;