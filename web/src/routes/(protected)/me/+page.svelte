<script lang="ts">
  import {page} from "$app/stores"
	import { Avatar } from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";

  onMount(() => {
    console.log($page.data.user)
  })
</script>

<div class="flex flex-col items-center gap-4 mt-10">
  <Avatar src={$page.data.user.avatar} />
  <div class="text-center">
    <h2>
      {$page.data.user.name}
    </h2>
    <small>
      {$page.data.user.email}
    </small>
  </div>
  <div class="role">
    <span class="badge variant-filled">
      {$page.data.user.userType}
    </span>
  </div>
</div>