import { z } from "sveltekit-api";
import { type RequestEvent, error, fail } from "@sveltejs/kit";
import {db} from "$lib"

export const Input = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  board: z.string(),
})

export const Output = z.object({
  updatedSchool: z.object({
    id: z.string(),
    name: z.string(),
    address: z.string(),
    board: z.string(),
  })
})

export default async function (
  input: z.infer<typeof Input>,
  evt: RequestEvent,
  ): Promise<z.infer<typeof Output>> {

    if (!evt.locals.user) {
      throw error(401, "You must be logged in");
    }

    if (evt.locals.user.userType !== "admin") {
      throw error(401, "Unauthorized");
    }

    const body = await evt.request.json()

    const {name, address, board, id} = body

    if (!id || !name || !address || !board || typeof id !== "string" || typeof name !== "string" || typeof address !== "string") throw fail(422, {message: "Missing Fields"})

    const updatedSchool = await db.school.update({
      where: {
        id
      },
      data: {
        name,
        address,
        board
      }
    })
    return {
      updatedSchool,
    };
  }