import { Button } from '~/components/Button';

export default function Index() {
	return (
		<Button
			intent="primary"
			aria-label="sign up"
			to="/sign-up"
			prefetch="intent"
		>
			Sign up
		</Button>
	);
}
