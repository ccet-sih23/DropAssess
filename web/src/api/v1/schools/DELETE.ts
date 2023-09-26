import { z } from "sveltekit-api";
import { type RequestEvent, error, fail } from "@sveltejs/kit";
import {db} from "$lib"

export const Input = z.object({
  schoolId: z.string()
})

export const Output = z.object({
  deletedSchool: z.object({
    name: z.string(),
    address: z.string(),
    board: z.string(),
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

    // const data = await evt.request.formData()
    // const schoolId = data.get('schoolId');

    const body = await evt.request.json()

    const {schoolId} = body

    if (!schoolId || typeof schoolId != "string") throw fail(422, {message: "Missing school id"})

    const deletedSchool = await db.school.delete({
      where: {
        id: schoolId
      }
    })
    return {
      deletedSchool
    };
  }