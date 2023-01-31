import { json, type LoaderArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { prisma } from '~/lib/prisma.server';

export const loader = async ({ request, params }: LoaderArgs) => {
	const users = await prisma.user.findMany({
		select: {
			id: true,
			email: true
		}
	});

	return json({ users: users });
};

export default function Users() {
	const { users } = useLoaderData<typeof loader>();

	return (
		<div className="flow-root">
			<ul className="-mb-8">
				{users.map((user) => (
					<li key={user.id}>
						<div className="relative pb-8">
							<div className="relative flex space-x-3">
								<div>
									<span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white">
										<div className="bg-gray-600 h-5 w-5 rounded-full" />
									</span>
								</div>
								<div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
									<div>
										<p className="text-sm text-gray-500">
											{user.id} / {user.email}
										</p>
									</div>
								</div>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
