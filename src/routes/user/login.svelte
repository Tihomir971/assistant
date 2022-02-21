<script>
	import {
		PasswordInput,
		Tile,
		Form,
		FormGroup,
		TextInput,
		Button,
		Link
	} from 'carbon-components-svelte';
	import { supabase } from '$lib/supabaseClient';
	import Login16 from 'carbon-icons-svelte/lib/Login16';
	import { goto } from '$app/navigation';

	let loading = false;
	let email;
	let password;

	const handleLogin = async () => {
		try {
			loading = true;
			const { user, error } = await supabase.auth.signIn({ email, password });
			if (error) throw error;
		} catch (error) {
			console.log(error);
			alert(error.error_description || error.message);
		} finally {
			loading = false;
			goto('/catalog/products');
		}
	};
</script>

<Tile style="min-width: 440px">
	<Form on:submit={handleLogin}>
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

		<Button style="float: right; width: 50%" type="submit" icon={Login16} disabled={loading}
			>{loading ? 'Loading' : 'Log In'}</Button
		>
	</Form>
</Tile>

<style>
	div {
		padding: 12px 0px 32px 0px;
	}
</style>
