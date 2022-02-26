<script>
	import db from '$lib/db';
	let user = db.user;
</script>

<div class="container" style="padding: 50px 0 100px 0;">
	{#if $user}
		<p>Logovan</p>
		<!--     <Profile /> -->
	{:else}
		<p>Nije logovan</p>{/if}
</div>
