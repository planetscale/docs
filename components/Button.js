import React from 'react'

import classNames from 'classnames'

const Button = ({ children, variant, type, size, onClick, form, className, disabled, ariaLabel, title, iconOnly }) => {
  const primary = variant !== 'secondary' && variant !== 'danger' && variant !== 'text'
  const secondary = variant === 'secondary'
  const danger = variant === 'danger'
  const text = variant === 'text'

  return (
    <button
      disabled={disabled}
      form={form}
      aria-label={ariaLabel}
      title={title}
      onClick={onClick}
      type={type || 'button'}
      className={buttonClasses({
        className,
        primary,
        secondary,
        danger,
        text,
        disabled,
        iconOnly,
        size
      })}
    >
      {children}
    </button>
  )
}

export function buttonClasses({ className, primary, secondary, danger, text, disabled, iconOnly, size }) {
  const small = size === 'small'
  const xsmall = size === 'xsmall'
  const large = size === 'large'

  return classNames(className, {
    'box-border relative inline-flex items-center justify-center text-center no-underline leading-none whitespace-nowrap font-semibold rounded flex-shrink-0 transition select-none overflow-hidden focus-ring':
      !text,
    'bg-gray-800 hover:bg-gray-900 dark:bg-gray-50': primary,
    'text-gray-50 dark:text-gray-800 dark:hover:bg-white dark:hover:text-gray-900 cursor-pointer hover:text-white':
      primary && !disabled,
    'text-gray-300 dark:text-gray-600': primary && disabled,
    'text-primary hover:bg-secondary focus:border-blue-500': secondary && !disabled,
    'border border-gray-200 dark:border-gray-600 bg-primary': secondary || danger,
    'text-secondary': secondary && disabled,
    'text-red hover:border-red-600': danger && !disabled,
    'text-red-disabled': danger && disabled,
    'text-sm py-1': small,
    'text-sm py-sm': xsmall,
    'text-xl py-2 h-button-lg px-2.5': large,
    'h-button py-1.5': !iconOnly && !text && !small && !large && !xsmall,
    'h-button-sm px-1.5': small && !text,
    'px-1': xsmall && !text,
    'h-button px-1': iconOnly,
    'focus-visible-ring': text,
    'px-2': !text && !iconOnly && !small && !large && !xsmall,
    'cursor-not-allowed': disabled
  })
}

export default Button
