import { forwardRef, type ComponentPropsWithoutRef } from 'react';

import type { ReactNode } from 'react';

type LabelProps = Omit<
	ComponentPropsWithoutRef<'label'>,
	'className' | 'children'
> & {
	children: ReactNode;
};

export const Label = ({ htmlFor, children, ...props }: LabelProps) => {
	return (
		<label
			htmlFor={htmlFor}
			className="mb-0.5 font-medium leading-none text-gray-500"
			{...props}
		>
			{children}
		</label>
	);
};

type InputProps = Omit<ComponentPropsWithoutRef<'input'>, 'className'> & {
	label?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, type, ...props }, ref) => {
		return (
			<div className="flex w-full flex-col">
				{label && <Label htmlFor={props.name}>{label}</Label>}
				<input
					ref={ref}
					type={type ?? 'text'}
					className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 shadow-sm transition-colors duration-150 ease-linear placeholder:font-extralight focus:border-gray-500 focus:outline-none focus:ring-0"
					{...props}
				/>
			</div>
		);
	}
);

Input.displayName = 'Input';
