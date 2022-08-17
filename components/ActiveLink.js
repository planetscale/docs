import React, { Children, useEffect } from 'react'

import cn from 'classnames'
import Link from 'next/link'
import { withRouter } from 'next/router'

const ActiveLink = ({ activeClassName, router, children, setShowSubNav, ...props }) => {
  const isActive = router.isReady ? router.asPath === props.href : false

  useEffect(() => {
    if (setShowSubNav && isActive) {
      setShowSubNav(true)
    }
  }, [setShowSubNav, isActive])

  const child = Children.only(children)
  const className = cn(child.props.className, { [activeClassName]: isActive })

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>
}

export default withRouter(ActiveLink)
