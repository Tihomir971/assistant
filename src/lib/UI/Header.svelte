<script>
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
	import { Notification20, UserAvatar20, AppSwitcher20 } from 'carbon-icons-svelte';
	import { page } from '$app/stores';
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
	</HeaderNav>
	<HeaderUtilities>
		<HeaderGlobalAction aria-label="Notifications" icon={Notification20} />
		<HeaderAction icon={UserAvatar20} closeIcon={UserAvatar20}>
			<HeaderPanelLinks>
				<Theme persist="true" render="select" />
				<HeaderPanelDivider />
				<HeaderPanelLink>Logout</HeaderPanelLink>
			</HeaderPanelLinks>
		</HeaderAction>
		<HeaderGlobalAction aria-label="App Switcher" icon={AppSwitcher20} />
	</HeaderUtilities>
</Header>
