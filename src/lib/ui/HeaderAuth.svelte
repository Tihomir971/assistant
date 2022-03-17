<script>
	import {
		SkipToContent,
		Header,
		HeaderNav,
		HeaderNavItem,
		HeaderUtilities,
		HeaderGlobalAction
	} from 'carbon-components-svelte';
	import { Notification20, UserAvatar20, AppSwitcher20 } from 'carbon-icons-svelte';
	import { page } from '$app/stores';
</script>

<Header company="KALISI" platformName="Assistant" href="/">
	<div slot="skip-to-content">
		<SkipToContent />
	</div>
	<HeaderNav>
		{#if $page.url.pathname === '/user/login'}
			<HeaderNavItem text="Sign up" href="/user/signup" sveltekit:prefetch />
		{:else}
			<HeaderNavItem text="Login" href="/user/login" sveltekit:prefetch />
		{/if}

		<!-- aria-current={$page.url.pathname === '/repos' ? 'page' : undefined} -->
	</HeaderNav>
	<HeaderUtilities>
		<HeaderGlobalAction aria-label="Notifications" icon={Notification20} />
		<HeaderGlobalAction aria-label="User Avatar" icon={UserAvatar20} />
	</HeaderUtilities>
</Header>
