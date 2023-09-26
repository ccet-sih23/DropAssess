<script lang='ts'>
	import { enhance } from "$app/forms";
    export let form
</script>


<form action="?/register" method="POST" class="flex flex-col w-full gap-4 mt-20" use:enhance>
    <h1>
        Login
    </h1>
    {#if form?.missing}
        <p class="error">Missing form details</p>
    {/if}
    {#if form?.notRegistered}
        <p class="error">You are not registered</p>
    {/if}
    {#if form?.incorrectDetails}
        <p class="error">The email or password is incorrect</p>
    {/if}
    <input name="email" type="email" placeholder="dumbledore@hogwarts.edu" required />
    <input name="pass" type="password" placeholder="Password" required />
    <button type="submit" class="btn variant-ghost-surface">
        Login
    </button>
</form>

<style lang="postcss">
    
</style>