import { z } from "sveltekit-api";
import { type RequestEvent, error } from "@sveltejs/kit";
import {db} from "$lib"

export const Param = z.object({
	idx: z.string().toLowerCase().describe("The start index of rows to get."),
  amt: z.string().toLowerCase().describe("The amount of rows to get."),
});

export const Output = z.object({
  govtOff: z.array(z.object({
    name: z.string(),
    address: z.string(),
    board: z.string(),
  })),
  total: z.number(),
})

export default async function (
  param: z.infer<typeof Param>,
  evt: RequestEvent,
  ): Promise<z.infer<typeof Output>> {
    if (!evt.locals.user ) {
      throw error(401, "You must be logged in");
    }

    if (evt.locals.user.userType !== "admin" && evt.locals.user.userType !== "govtOff") {
      throw error(401, "Unauthorized");
    }
    const {idx, amt} = param;
    if (isNaN(parseInt(idx)) || isNaN(parseInt(amt))) {
      throw error(400, "Invalid parameters");
    }
    const govtOff = await db.school.findMany({
      skip: parseInt(idx),
      take: parseInt(amt),
    });
    const total = await db.school.count();
    return {
      govtOff,
      total,
    };
  }