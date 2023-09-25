// attach user to page data

export const load  = async ({locals}) => {
  return {user: locals.user}
}