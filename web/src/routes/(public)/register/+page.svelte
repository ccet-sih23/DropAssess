<script lang='ts'>
	import { enhance } from "$app/forms";
    export let form
</script>


<form action="?/register" method="POST" class="flex flex-col w-full gap-4 mt-20" use:enhance>
    <h1>
        Register
    </h1>
    {#if form?.missing}
        <p class="error">This field is required</p>
    {/if}
    <input name="name" type="text" placeholder="Albus Dumbledore" required />
    <input name="email" type="email" placeholder="dumbledore@hogwarts.edu" required />
    <input name="pass" type="password" placeholder="Password" required />
    <input name="confPass" type="password" placeholder="Confirm Password" required />
    <button type="submit" class="btn variant-ghost-surface">
        Register
    </button>
</form>