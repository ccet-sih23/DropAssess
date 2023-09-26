<script lang='ts'>
	import { enhance } from "$app/forms";
    export let form

    $: submitDisable = false

    let pass = ''
    let confPass = ''

    const updateSubmitDisable = () => {
        if (pass !== confPass) {
            submitDisable = true
        } else {
            submitDisable = false
        }
    }
</script>

<svelte:head>
    <title>
        Login | Drop Assess
    </title>
</svelte:head>

<form action="?/register" method="POST" class="flex flex-col w-full gap-4 mt-20" use:enhance>
    <h1>
        Register
    </h1>
    {#if form?.missing}
        <p class="error">This field is required</p>
    {/if}
    <span>
        <label for="name">Name: </label>
        <input name="name" type="text" placeholder="Albus Dumbledore" tabindex="1" autofocus required />
    </span>
    <span>

    <label for="email">Email: </label>
    <input name="email" type="email" placeholder="dumbledore@hogwarts.edu" tabindex="2" required />
    </span>
    <span>
        <label for="pass">Password: </label>
        <input name="pass" type="password" placeholder="Password" tabindex="3" required bind:value={pass}/>
    </span>
    <span>
        <label for="confPass">Confirm Password: </label>
        <input name="confPass" class:invalid={submitDisable} type="password" placeholder="Confirm Password" tabindex="4" required bind:value={confPass} on:change={() => updateSubmitDisable()} />
        {#if submitDisable}
            <p class="error">Passwords do not match</p>
        {/if}
    </span>
    <button type="submit" class="btn bg-primary-50" disabled={submitDisable}>
        Continue
    </button>
    <a href="/login">
        Already have an account?
    </a>
    <span>
        By clicking continue, you accept our <a href="/tnc">terms and conditions</a>.
    </span>
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
                &.invalid {
                    border: 1px solid red;
                }
            }
            &>a {
                text-decoration: underline;
            }
            &>.error {
                color: red;
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