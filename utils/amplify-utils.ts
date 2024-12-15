import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import config from "@/amplify_outputs.json";
import { cookies } from "next/headers";
import { getCurrentUser } from "aws-amplify/auth";

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});

export const isAuthenticated = async () =>
  await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    async operation() {
      try {
        const user = await getCurrentUser();
        return !!user;
      } catch (error) {
        return false;
      }
    },
  });
