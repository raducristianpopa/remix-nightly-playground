interface User {
	email: string;
	password: string;
}

export const users = new Map<string, User>();
