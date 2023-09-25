<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, Avatar, Drawer, getDrawerStore, initializeStores } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	initializeStores()

	const drawerStore = getDrawerStore();
</script>

<Drawer
	class="w-full"
	position="bottom"
>
<div class="flex h-96 sm:p-10 md:h-full justify-center items-center flex-col gap-4">
	{#if $page.data.user}
		<a href="/me">
			<h3>
				Profile
			</h3>
		</a>
		<form action="/logout" method="POST">
			<button class="justify-start text-error-600" type="submit">
				<h3>
					Logout
				</h3>
			</button>
		</form>
		{:else}
		<a href="/login">
			<h3>
				Login
			</h3>
		</a>
		<a href="/register">
			<h3>
				Register
			</h3>
		</a>
	{/if}
</div>
</Drawer>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">DROP ASSESS</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<!-- <a
					class="btn btn-sm variant-ghost-surface"
					href="https://discord.gg/EXqV7W8MtY"
					target="_blank"
					rel="noreferrer"
				>
					Discord
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://twitter.com/SkeletonUI"
					target="_blank"
					rel="noreferrer"
				>
					Twitter
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/skeletonlabs/skeleton"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a> -->
				<button on:click={() => drawerStore.open()} class="variant-ghost-surface rounded-full h-12 w-12 p-2 flex flex-col gap-1 justify-center items-center">
				{#if $page.data.user}
					<div class="flex gap-4">
						<Avatar src={$page.data.user.avatar} width="w-12" />
					</div>
					{:else}
						<span class="h-1 w-6 rounded bg-white" />
						<span class="h-1 w-6 rounded bg-white" />
						<span class="h-1 w-6 rounded bg-white" />
				{/if} 
				</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<div class="container flex justify-center items-center w-full">
		<slot />
	</div>
</AppShell>
