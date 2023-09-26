<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, Avatar, Drawer, getDrawerStore, initializeStores, LightSwitch } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

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
		<a href="/dashboard">
			<h3>
				Dashboard
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
				<img src="/images/logo.jpeg" alt="Logo" />

				{#if $page.data.user}
				<nav>
					<button class="pill" on:click={() => goto('/dashboard')}>
						Dashboard
					</button>
					<button class="pill" on:click={() => goto('/analytics')}>
						Analytics
					</button>
					<button class="pill" on:click={() => goto('/schools')}>
						Schools
					</button>
					<button class="pill" on:click={() => goto('/students')}>
						Students
					</button>
				</nav>
				{/if}
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
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
	<main class="flex justify-center items-center w-full">
		<slot />
	</main>
</AppShell>


<style lang="postcss">
	nav {
		padding-left: 2vw;
		display: flex;
		gap: 2vw;
		&>.pill {
			background-color: var(--slate-100);
			&.active {
				background-color: var(--slate-200);
			}
		}
	}
</style>