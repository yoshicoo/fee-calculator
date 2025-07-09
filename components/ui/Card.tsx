import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-gray-200 dark:border-gray-700',
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export default Card;
