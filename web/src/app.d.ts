// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
export interface User {
	id: string;
	name: string;
	email: string;
	passwordHash: string;
	userType: string;
	createAt: Date;
	updatedAt: Date;
	avatar: string;
	banner: string;
}
declare global {
	declare namespace App {
		interface Locals {
			user: User;
		}
		// interface PageData {}
		// interface Error {}
		// interface Platform {}
	}
}
