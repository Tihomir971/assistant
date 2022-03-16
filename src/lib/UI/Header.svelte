<script>
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';
	import db from '$lib/db';
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
	let user = db.user;
</script>

<Header company="KALISI" platformName="Assistant" href="/">
	<div slot="skip-to-content">
		<SkipToContent />
	</div>
	<HeaderNav>
		{#if $user}
			<HeaderNavItem
				text="Products"
				href="/catalog/products"
				aria-current={$page.url.pathname === '/repos' ? 'page' : undefined}
			/>
			<HeaderNavItem
				text="Categories"
				href="/catalog/categories"
				aria-current={$page.url.pathname === '/repos' ? 'page' : undefined}
			/>
			<HeaderNavItem
				text="Warehouse"
				href="/warehouse/warehouse"
				aria-current={$page.url.pathname === '/repos' ? 'page' : undefined}
			/>
			<HeaderNavItem
				text="User Profile"
				href="/user/profile"
				aria-current={$page.url.pathname === '/repos' ? 'page' : undefined}
			/>
			<HeaderNavItem text="Import" href="/catalog/import" />
			<HeaderNavItem text="Attribute" href="/catalog/family" />
		{/if}
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
				{#if $user}
					<HeaderPanelLink on:click={db.signOut}>Logout</HeaderPanelLink>
				{:else}
					<HeaderPanelLink on:click={goto('/user/login')}>Login</HeaderPanelLink>
				{/if}
			</HeaderPanelLinks>
		</HeaderAction>
	</HeaderUtilities>
</Header>
