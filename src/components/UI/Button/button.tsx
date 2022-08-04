import React from 'react';
import { ButtonHTMLAttributes, ComponentType, FC, HTMLAttributes, ReactNode } from 'react';
import { LoadingDots } from '@magentopwa/components/UI';
import styles from './button.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | ReactNode[];
  isLoading?: boolean;
  Component?: string | ComponentType<HTMLAttributes<HTMLElement>>;
  href?: string;
  variant?: string;
  size?: string;
}

const Button: FC<Props> = ({
  children,
  className,
  isLoading = false,
  variant,
  size,
  Component = 'button',
  ...rest
}) => {
  const variantBgColor = variant && variant !== '' ? styles[`${variant}`] : styles['default'];
  const sizeClass = size === 'sm' ? styles.smallSize : styles.defaultSize;

  return (
    <Component className={`${styles.root} ${className} ${variantBgColor} ${sizeClass}`} type="button" {...rest}>
      {children}
      {isLoading && (
        <i className="pl-2 m-0 flex">
          <LoadingDots />
        </i>
      )}
    </Component>
  );
};

export default Button;
