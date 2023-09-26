import { z } from "sveltekit-api";
import { type RequestEvent, error } from "@sveltejs/kit";
import {db} from "$lib"

export const Input = z.object({
  name: z.string()
})

export const Output = z.object({
  newStudent: z.object({
    id: z.string(),
    name: z.string(),
  })
})

export default async function (
  input: z.infer<typeof Input>,
  evt: RequestEvent,
  ): Promise<z.infer<typeof Output>> {
    if ((!evt.locals.user) || !(evt.locals.user.userType !== "admin" && evt.locals.user.userType !== "govtOff" && evt.locals.user.userType !== "schoolAdmin" && evt.locals.user.userType !== "teacher")) {
      throw error(401, "Unauthorized");
    }

    const body = await evt.request.json()

    const {name} = body

    const newStudent = await db.student.create({
      data: {
        name
      }
    })
    return {
      newStudent
    };
  }
  