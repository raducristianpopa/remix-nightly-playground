import { type ActionFunction, redirect } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { object, string } from 'zod';
import crypto from 'crypto';
import { bcrypt } from 'hash-wasm';
import { prisma } from '~/lib/prisma.server';

const signUpSchema = object({
	email: string().email(),
	password: string().min(6, {
		message: 'Password needs to be at least 6 characters long.'
	})
});

export const action: ActionFunction = async ({ request }) => {
	const data = Object.fromEntries(await request.formData());

	const result = signUpSchema.safeParse(data);

	if (!result.success) {
		const errors = result.error.flatten();
		return errors;
	}

	const hashedPwd = await bcrypt({
		password: result.data.password,
		salt: crypto.randomBytes(16),
		costFactor: 10,
		outputType: 'encoded'
	});

	await prisma.user.create({
		data: {
			email: result.data.email,
			password: hashedPwd
		}
	});

	return redirect('/users');
};

export default function SignUp() {
	const actionData = useActionData<typeof action>();

	return (
		<Form className="w-full space-y-4 max-w-sm" method="post">
			<div className="flex"></div>
			<Input name="email" label="Email" required />
			{actionData?.fieldErrors.email && (
				<span role="alert" className="text-red-500 font-medium">
					{actionData?.fieldErrors.email}
				</span>
			)}
			<Input name="password" type="password" label="Password" required />
			{actionData?.fieldErrors.password && (
				<span role="alert" className="text-red-500 font-medium">
					{actionData?.fieldErrors.password}
				</span>
			)}
			<Button intent="primary" aria-label="sign up" type="submit">
				Sign Up
			</Button>
		</Form>
	);
}
