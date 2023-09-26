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
    <span>
        <label for="email">Email: </label>
        <input name="email" type="email" placeholder="dumbledore@hogwarts.edu" required />
    </span>
    <span>
        <label for="pass">Password: </label>
        <input name="pass" type="password" placeholder="Password" required />
    </span>
    <button type="submit" class="btn variant-ghost-surface">
        Continue
    </button>
    <a href="/register">
        Don't have an account?
    </a>
</form>

<style lang="postcss">
    form {
        padding: 5vh 3vw;
        border: 1px solid var(--slate-200);
        width: 28%;
        border-radius: 20px;
        &>h1 {
            font-weight: 800;
            text-align: center;
        }
        &>span {
            color: var(--slate-500);
            &>input {
                border-radius: 10px;
                border: 1px solid var(--slate-200);
            }
            &>a {
                text-decoration: underline;
            }
        }
        &>button {
            width: fit-content;
            margin: auto;
            background: rgba(var(--color-surface-900) / 1);
            color: var(--white-100);
        }
        &>a {
            text-align: center;
        }
    }
</style>