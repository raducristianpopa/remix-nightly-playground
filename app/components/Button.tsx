import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import { ButtonOrLink, type ButtonOrLinkProps } from './ButtonOrLink';

const buttonStyles = cva(
	'inline-flex items-center justify-center px-3 py-2 rounded-md font-medium',
	{
		variants: {
			intent: {
				primary:
					'bg-blue-600 text-white hover:bg-blue-500 focus:outline-none'
			}
		}
	}
);

type ButtonProps = VariantProps<typeof buttonStyles> &
	ButtonOrLinkProps & {
		['aria-label']: string;
	};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ intent, children, ...props }, ref) => {
		return (
			<ButtonOrLink
				ref={ref}
				className={buttonStyles({ intent })}
				{...props}
			>
				{children}
			</ButtonOrLink>
		);
	}
);

Button.displayName = 'Button';
