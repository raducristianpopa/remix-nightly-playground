import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration
} from '@remix-run/react';
import tailwind from './tailwind.css';

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'Remix Nightly Playground',
	viewport: 'width=device-width,initial-scale=1'
});

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: tailwind }
];

export default function App() {
	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body>
				<main className="min-h-screen w-full flex items-center justify-center">
					<Outlet />
				</main>
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
