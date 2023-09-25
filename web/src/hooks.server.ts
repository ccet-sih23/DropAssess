import { db } from '$lib/server';

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  db.userSession.deleteMany({
    where: {
      expiresAt: {
        lt: new Date()
      }
    }
  })

	const sessionToken = event.cookies.get('session');
	if (!sessionToken || sessionToken == '') {
		return await resolve(event);
	}

  // extend session on each use to prevent logout on runtime
  db.userSession.update({
    where: {
      id: sessionToken
    },
    data: {
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    }
  })
  event.cookies.set('session', sessionToken, {
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

	const session = await db.userSession.findUnique({
    where: {
      id: sessionToken
    },
    include: {
      user: true
    }
  })

  if (!session) {
    return await resolve(event);
  }
	
	event.locals.user = session.user;
	return await resolve(event);
};