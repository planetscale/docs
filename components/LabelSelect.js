import React from 'react'

import cn from 'classnames'

import Select from './Select'

const LabelSelect = ({
  ariaLabel,
  children,
  onBlur,
  onChange,
  value,
  name,
  size,
  className,
  label,
  defaultValue,
  disabled,
  required
}) => {
  const small = size === 'small'

  return (
    <div
      className={cn(
        'focus-within-ring flex border border-secondary items-stretch shadow-sm rounded text-primary',
        className,
        {
          'cursor-not-allowed text-secondary': disabled
        }
      )}
    >
      <label
        className={cn(
          'flex items-center px-1.5 mb-0 font-medium border-r rounded-l bg-secondary border-secondary whitespace-nowrap',
          {
            'cursor-not-allowed text-secondary': disabled,
            'text-sm py-1 h-button-sm': small,
            'h-button': !small
          }
        )}
      >
        {label}
      </label>
      <Select
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        defaultValue={defaultValue}
        size={size}
        disabled={disabled}
        name={name}
        ariaLabel={ariaLabel}
        required={required}
        className='block w-full pl-2 rounded-l-none border-0 rounded-r !shadow-none !ring-0'
      >
        {children}
      </Select>
    </div>
  )
}

export default LabelSelect
