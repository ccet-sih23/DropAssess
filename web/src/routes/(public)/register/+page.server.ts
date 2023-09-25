import { db } from "$lib";
import { fail, redirect } from '@sveltejs/kit';
import { hashPass } from '../../../lib/server/argon';

export const load = async ({locals}) => {
  if (locals.user) {
    throw redirect(302, '/')
  }
}

export const actions = {
  register: async ({request}) => {
    const data = await request.formData();

    const email = data.get('email');
    const password = data.get('pass');
    const name = data.get('name');

    console.log(email, password, name)

    if (!email || !password || !name || typeof email != "string" || typeof name != "string" || typeof password != "string") return fail(422, {missing: true})

    const passwordHash = await hashPass(password);

    console.log(email, password, name, passwordHash)
    const user = await db.user.create({
      data: {
        email,
        passwordHash,
        name
      }
    }).catch(e => {
      console.log(e)
    })

    return {
      status: 201,
      body: {
        user
      }
    }

  }
}