<script>
	import { Tile, Form, FormGroup, TextInput, Button, Link } from 'carbon-components-svelte';
	import { supabase } from '$lib/supabaseClient';
	import Login16 from 'carbon-icons-svelte/lib/Login16';

	let loading = false;
	let email;
	let password;

	const handleLogin = async () => {
		try {
			loading = true;
			const { error } = await supabase.auth.signIn({ email });
			if (error) throw error;
			alert('Check your email for the login link!');
		} catch (error) {
			alert(error.error_description || error.message);
		} finally {
			loading = false;
		}
	};
</script>

<Tile style="min-width: 440px">
	<Form on:submit={handleLogin}>
		<h1>Log in</h1>
		<div>
			Don't have an account?
			<Link inline href="/user/signup">Sign up</Link>.
		</div>
		<FormGroup>
			<TextInput labelText="Email" placeholder="Enter user name..." bind:value={email} />
		</FormGroup>
		<FormGroup>
			<TextInput labelText="Password" placeholder="Enter password..." bind:value={password} />
		</FormGroup>
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
