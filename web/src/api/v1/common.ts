import { z } from "sveltekit-api";
export const Error = z.object({
  statusCode: z.number(),
  message: z.string(),
})