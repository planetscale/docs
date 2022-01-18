import React, { Children } from 'react'

import Link from 'next/link'
import { withRouter } from 'next/router'

const ActiveLink = ({ router, children, setShowSubNav, ...props }) => {
  const child = Children.only(children)

  let className = child.props.className || ''
  const pathname = `/${router.query.category}/${router.query.post}`

  if (pathname === props.href && props.activeClassName) {
    className = `${className} ${props.activeClassName}`.trim()
    if (setShowSubNav) {
      setShowSubNav(true)
    }
  }

  delete props.activeClassName

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>
}

export default withRouter(ActiveLink)
