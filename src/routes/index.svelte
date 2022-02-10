<script>
	import { user } from '$lib/sessionStore';
	import { supabase } from '$lib/supabaseClient';

	user.set(supabase.auth.user());
	console.log('user:', $user);

	supabase.auth.onAuthStateChange((_, session) => {
		user.set(session.user);
		console.log('Change:', $user);
	});
</script>

<div class="container" style="padding: 50px 0 100px 0;">
	{#if $user}
		<p>Logovan</p>
		<!--     <Profile /> -->
	{:else}
		<p>Nije logovan</p>{/if}
</div>
