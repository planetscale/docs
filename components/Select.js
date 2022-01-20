import React from 'react'

import classNames from 'classnames'

const Select = ({
  children,
  id,
  value,
  size,
  defaultValue,
  ariaLabel,
  name,
  onChange,
  onBlur,
  required,
  disabled,
  className
}) => {
  const small = size === 'small'

  return (
    <select
      id={id}
      name={name}
      defaultValue={defaultValue}
      required={required}
      disabled={disabled}
      aria-label={ariaLabel}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={classNames(
        'inline-block pl-1.5 pr-4 py-0 border rounded shadow-sm bg-primary border-secondary focus-ring',
        {
          'h-button': !small,
          'h-button-sm text-sm': small,
          'cursor-not-allowed': disabled
        },
        className
      )}
    >
      {children}
    </select>
  )
}

export default Select
