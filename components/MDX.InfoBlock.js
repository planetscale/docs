import React from 'react'

import classNames from 'classnames'

export default function InfoBlock(props) {
  const { type, children } = props

  return (
    <div
      className={classNames('my-4 border mb-3 px-3 py-2.5 rounded', {
        'bg-blue-50 dark:bg-blue-900 border-blue-100 dark:border-blue-800': type === 'note',
        'border-yellow-200 bg-yellow-50 dark:border-yellow-500 dark:bg-yellow-900': type === 'warning',
        'bg-purple-50 dark:bg-purple-900 border-purple-100 dark:border-purple-800': type === 'tip'
      })}
    >
      {type === 'note' && <strong>Note</strong>} {type === 'warning' && <strong>Warning</strong>}{' '}
      {type === 'tip' && <strong>Tip</strong>}
      <div className='mt-1 info-block'>{children}</div>
    </div>
  )
}
