import React from 'react'

import Link from 'next/link'

import { buttonClasses } from './Button'

const ButtonLink = ({ href, children, variant, size, className, ariaLabel, iconOnly, disabled, scroll, onClick }) => {
  const primary = variant !== 'secondary' && variant !== 'danger' && variant !== 'text'
  const secondary = variant === 'secondary'
  const danger = variant === 'danger'
  const text = variant === 'text'
  const classNames = buttonClasses({
    className,
    primary,
    secondary,
    danger,
    text,
    disabled,
    iconOnly,
    size
  })

  if (disabled) {
    return <span className={classNames}>{children}</span>
  }

  return (
    <Link href={href} scroll={scroll}>
      <a href={href} onClick={onClick} aria-label={ariaLabel} className={classNames}>
        {children}
      </a>
    </Link>
  )
}

export default ButtonLink
