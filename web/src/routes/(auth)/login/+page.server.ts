import { db, verifyPass } from "$lib";
import { fail, redirect } from '@sveltejs/kit';

export const load  = async ({locals}) => {
  if (locals.user) {
    throw redirect(302, '/')
  }
}

export const actions = {
  register: async ({request, cookies, url}) => {
    const data = await request.formData();

    const email = data.get('email');
    const password = data.get('pass');

    console.log(email, password)

    if (!email || !password || typeof email != "string" || typeof password != "string") return fail(422, {missing: true})

    const user = await db.user.findUnique({
      where: {
        email
      }
    })

    if (!user) return fail(422, {notRegistered: true})

    const isPassCorrect = await verifyPass(user.passwordHash, password);

    if (!isPassCorrect) return fail(422, {incorrectDetails: true})

    const newSession = await db.userSession.create({
      data: {
        userId: user.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
      }
    })

    cookies.set('session', newSession.id, {
      // send cookie for every page
			path: '/',
			// server side only cookie so you can't use `document.cookie`
			httpOnly: true,
			// only requests from same site can send cookies
			// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
			sameSite: 'lax',
			// only sent over HTTPS in production
			secure: process.env.NODE_ENV === 'production',
			// set cookie to expire after a month
			maxAge: 60 * 60 * 24 * 30,
    })

    const redirectTo = url.searchParams.get('redirectTo');
    if (redirectTo) {
      throw redirect(302, `/${redirectTo.slice(1)}`)
    }
    throw redirect(302, '/dashboard');

  }
}