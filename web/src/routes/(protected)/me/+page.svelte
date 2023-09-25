<script lang="ts">
  import {page} from "$app/stores"
	import { Avatar } from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";

  onMount(() => {
    console.log($page.data.user)
  })
</script>

<Avatar src={$page.data.user.avatar} />