import { z } from "sveltekit-api";
import { type RequestEvent, error, fail } from "@sveltejs/kit";
import {db} from "$lib"

export const Input = z.object({
  userId: z.string(),
  name: z.string(),
  state: z.string(),
  post: z.string(),
})

export const Output = z.object({
  newOfficial: z.object({
    userId: z.string(),
    name: z.string(),
    state: z.string(),
    post: z.string(),
  })
})

export default async function (
  input: z.infer<typeof Input>,
  evt: RequestEvent,
  ): Promise<z.infer<typeof Output>> {
    if (!evt.locals.user ) {
      throw error(401, "You must be logged in");
    }

    if (evt.locals.user.userType !== "admin") {
      throw error(401, "Unauthorized");
    }

    const body = await evt.request.json()

    const {name, state, post, userId} = body

    if (!name || !state || !post || !userId || typeof name != "string" || typeof state != "string" || !(post == "state" || post == "capital") || typeof userId != "string") throw fail(422, {message: "Missing name"})

    const newOfficial = await db.govtOff.create({
      data: {
        userId,
        name,
        state,
        post
      }
    })
    return {
      newOfficial,
    };
  }