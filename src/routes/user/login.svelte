<script>
	import db from '$lib/db';
	import { goto } from '$app/navigation';
	import Login16 from 'carbon-icons-svelte/lib/Login16';
	import {
		PasswordInput,
		Tile,
		Form,
		FormGroup,
		TextInput,
		Button,
		Link,
		Content
	} from 'carbon-components-svelte';

	let result = false;
	let email, password;

	async function signInWithEmail() {
		// 	const { user, error } = await supabase.auth.signIn({ email, password });
		result = await db.signIn(email, password);
		if (result.error) throw result.error;
		else goto('/');

		// loading = await db.signIn(email, password);
		console.log('Login res', result);
	}
</script>

<div style="padding:0;align-items: center; justify-content: center; display: flex">
	<Tile style="min-width: 440px">
		<Form on:submit={signInWithEmail}>
			<h1>Log in</h1>
			<div>
				Don't have an account?
				<Link inline href="/user/signup">Create account</Link>.
			</div>
			<FormGroup>
				<TextInput
					autocomplete="username"
					labelText="Email"
					placeholder="Enter user name..."
					bind:value={email}
				/>
			</FormGroup>
			<FormGroup>
				<PasswordInput
					autocomplete="current-password"
					labelText="Password"
					placeholder="Enter password..."
					bind:value={password}
				/>
			</FormGroup>

			<Link inline href="/user/forgot">Forgot password?</Link>

			<Button style="float: right; width: 50%" type="submit" icon={Login16} disabled={result}
				>Log In</Button
			>
		</Form>
	</Tile>
</div>

<style>
	div {
		padding: 12px 0px 32px 0px;
	}
</style>
