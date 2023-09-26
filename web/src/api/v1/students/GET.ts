import { z } from "sveltekit-api";
import { type RequestEvent, error } from "@sveltejs/kit";
import {db} from "$lib"

export const Param = z.object({
	idx: z.string().toLowerCase().describe("The start index of rows to get."),
  amt: z.string().toLowerCase().describe("The amount of rows to get."),
});

export const Output = z.object({
  students: z.array(z.object({
    id: z.string(),
    name: z.string(),
  })),
  total: z.number(),
})

export default async function (
  param: z.infer<typeof Param>,
  evt: RequestEvent,
  ): Promise<z.infer<typeof Output>> {
    if ((!evt.locals.user )|| (evt.locals.user.userType !== "admin" && evt.locals.user.userType !== "govtOff")) {
      throw error(401, "Unauthorized");
    }
    const {idx, amt} = param;
    if (isNaN(parseInt(idx)) || isNaN(parseInt(amt))) {
      throw error(400, "Invalid parameters");
    }
    const students = await db.student.findMany({
      skip: parseInt(idx),
      take: parseInt(amt),
    });
    const total = await db.student.count();
    return {
      students,
      total,
    };
  }