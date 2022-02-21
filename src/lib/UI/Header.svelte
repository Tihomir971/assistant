<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { user } from '$lib/sessionStore';
	import { supabase } from '$lib/supabaseClient';

	import {
		SkipToContent,
		Header,
		HeaderNav,
		HeaderNavItem,
		HeaderUtilities,
		HeaderGlobalAction,
		HeaderAction,
		HeaderPanelLinks,
		HeaderPanelDivider,
		HeaderPanelLink,
		Theme
	} from 'carbon-components-svelte';
	import { Notification24, UserAvatar24, ShoppingCart24 } from 'carbon-icons-svelte';

	user.set(supabase.auth.user());

	supabase.auth.onAuthStateChange((_, session) => {
		user.set(session.user);
	});

	async function signOut() {
		console.log('odoh');
		try {
			let { error } = await supabase.auth.signOut();
			if (error) throw error;
		} catch (error) {
			alert(error.message);
		} finally {
			goto('/user/login');
		}
	}
</script>

<Header company="KALISI" platformName="Assistant" href="/">
	<div slot="skip-to-content">
		<SkipToContent />
	</div>
	<HeaderNav>
		<HeaderNavItem
			text="Products"
			href="/catalog/products"
			sveltekit:prefetch
			aria-current={$page.url.pathname === '/repos' ? 'page' : undefined}
		/>
		<HeaderNavItem
			text="Categories"
			href="/catalog/categories"
			sveltekit:prefetch
			aria-current={$page.url.pathname === '/repos' ? 'page' : undefined}
		/>
		<HeaderNavItem
			text="Warehouse"
			href="/warehouse/warehouse"
			sveltekit:prefetch
			aria-current={$page.url.pathname === '/repos' ? 'page' : undefined}
		/>
		<HeaderNavItem
			text="User Profile"
			href="/user/profile"
			sveltekit:prefetch
			aria-current={$page.url.pathname === '/repos' ? 'page' : undefined}
		/>
		<HeaderNavItem text="Import" href="/catalog/import" sveltekit:prefetch />
	</HeaderNav>
	<HeaderUtilities>
		<HeaderGlobalAction aria-label="Notifications" icon={Notification24} />
		<HeaderAction icon={ShoppingCart24} closeIcon={ShoppingCart24}>
			<HeaderPanelLinks />
		</HeaderAction>
		<HeaderAction icon={UserAvatar24} closeIcon={UserAvatar24}>
			<HeaderPanelLinks>
				<Theme persist="true" render="select" />
				<HeaderPanelDivider />
				<HeaderPanelLink on:click={signOut}>Logout</HeaderPanelLink>
			</HeaderPanelLinks>
		</HeaderAction>
	</HeaderUtilities>
</Header>
