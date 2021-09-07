import React, { Fragment, useState } from 'react'
import { styled } from '../stitches.config'
import * as Collapsible from '@radix-ui/react-collapsible'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import {
  HamburgerMenuIcon,
  Cross1Icon,
  TriangleRightIcon,
} from '@radix-ui/react-icons'
import Logo from './Logo'
import meta from '../content/docs/meta.json'
import CustomLink from './CustomLink'
import Link from 'next/link'

const ConditionalLogoWrapper = styled('div', {
  '@tablet': {
    display: 'none',
  },
})

const _SidenavContainer = styled(ScrollArea.Root, {
  width: '320px',
  position: 'sticky',
  top: '0px',
  height: 'calc(100vh - 90px)',
  transition: 'border-color 100ms linear',
  padding: '2em',
  paddingRight: '0',

  '> [data-radix-scroll-area-viewport-position]::-webkit-scrollbar': {
    appearance: 'none',
    display: 'none',
    width: '0',
    height: '0',
  },

  '@tablet': {
    borderRight: 'unset',
    position: 'fixed',
    top: '0',
    right: '-100vw',
    zIndex: '5',
    padding: '2em',
    backgroundColor: '$bgPrimary',
    flexBasis: '100vw',
    width: '90vw',
    height: '100vh',
    transition: 'right 100ms ease-out',

    '&:hover': {
      borderRight: 'unset',
    },

    '&.show': {
      right: '0',
    },
  },

  '@phone': {
    overflow: 'hidden',
  },
})

const StyledScrollbarY = styled(ScrollArea.ScrollbarY, {
  zIndex: '2',
  position: 'absolute',
  userSelect: 'none',
  transition: '300ms opacity ease',
  width: '8',
  right: '0',
  top: '0',
  bottom: '0',
})

const StyledScrollTrack = styled(ScrollArea.Track, {
  zIndex: '-1',
  position: 'relative',
  width: '100%',
  height: '100%',
})

const StyledScrollThumb = styled(ScrollArea.Thumb, {
  backgroundColor: '$textPrimary',
  position: 'absolute',
  top: '0',
  left: '0',
  userSelect: 'none',
  borderRadius: '9999',
  width: '1px',
  height: '8px',
  willChange: 'top',
})

const MenuLink = styled('div', {
  display: 'none',

  '@tablet': {
    position: 'fixed',
    bottom: '2em',
    right: '2em',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: '$bgPrimary',
    backgroundColor: '$textPrimary',
    boxShadow:
      'rgba(0, 0, 0, 0.1) 0px 1px 6px, rgba(0, 0, 0, 0.2) 0px 2px 24px',
    borderRadius: '6px',
    zIndex: '6',
    padding: '1em',
    fontSize: '14px',

    '> svg': {
      width: '14px',
    },
  },
})

const _SidenavList = styled(ScrollArea.Viewport, {
  zIndex: '3',
  position: 'relative',

  '@tablet': {
    padding: '2em 0 6em',
  },
})

const _GroupContainer = styled(Collapsible.Root, {})

const _GroupHeading = styled(Collapsible.Button, {
  fontSize: '12px',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  color: '$textPrimary',
  backgroundColor: 'unset',
  border: 'unset',
  padding: '0',
  marginTop: '4em',
  marginBottom: '1.5em',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  svg: {
    marginLeft: '2px',
  },

  '&:active, &:focus': {
    outline: 'unset',
    border: 'unset',
  },

  '&[data-state="open"]': {
    svg: {
      transform: 'rotate(90deg)',
    },
  },
})

const _GroupLinks = styled(Collapsible.Content, {})

const PageLink = styled('a', {
  fontSize: '14px',
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  margin: '0 0 1.5em 0',
  color: '$textSecondary',
  position: 'relative',

  '&:hover': {
    color: '$textBlue',
    cursor: 'pointer',
  },

  '&.active': {
    color: '$textPrimary',
    fontWeight: '600',
  },
})

const BackgroundFrozen = styled('div', {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  backdropFilter: 'blur(8px)',
  opacity: '0.75',
  backgroundColor: '$bgSecondary',
  zIndex: '4',
})

export default function Navigation({ version }) {
  const [mobileTOCState, setMobileTOCState] = useState(false)
  const toc = meta

  const toggleMobileTOC = () => {
    setMobileTOCState(!mobileTOCState)
    document.body.classList.toggle('prevent-scroll')
  }

  function generateCategoryLabel({}) {}

  function generatePageLink({}) {}

  function recursiveMap(leaves) {
    leaves.map((leaf, index) => {
      if (leaf === 'page') {
        return (
          <SidenavGroup
            key={index}
            version={version}
            categoryID={category.id}
            category={category.name}
            pages={category.pages}
            clickHandler={mobileTOCState ? toggleMobileTOC : () => {}}
          ></SidenavGroup>
        )
      } else {
        recursiveMap(leaf)
      }
    })
  }

  function SidenavGroup({ categoryID, category, pages, clickHandler }) {
    return (
      <_GroupContainer defaultOpen={true}>
        <_GroupHeading>
          {category} <TriangleRightIcon />
        </_GroupHeading>
        <_GroupLinks>
          {pages.map((page, index) => {
            const href =
              version === 'v1'
                ? `/v1/${categoryID}/${page['route']}`
                : `/${categoryID}/${page['route']}`

            return (
              <CustomLink
                version={version}
                href={href}
                activeClassName="active"
                key={index}
              >
                <PageLink href={href} onClick={clickHandler}>{page['display']}</PageLink>
              </CustomLink>
            )
          })}
        </_GroupLinks>
      </_GroupContainer>
    )
  }

  return (
    <Fragment>
      <MenuLink onClick={toggleMobileTOC}>
        {mobileTOCState ? <Cross1Icon /> : <HamburgerMenuIcon />}
      </MenuLink>
      {mobileTOCState && (
        <BackgroundFrozen onClick={toggleMobileTOC}></BackgroundFrozen>
      )}
      <_SidenavContainer className={mobileTOCState ? 'show' : ''}>
        <ConditionalLogoWrapper>
          <Logo version={version} />
        </ConditionalLogoWrapper>
        <_SidenavList>
          <Link href={version === 'v1' ? '/v1' : '/'} passhref>
            <PageLink
              onClick={mobileTOCState ? toggleMobileTOC : () => {}}
              activeClassName="active"
            >
              PlanetScale overview
            </PageLink>
          </Link>
          {toc.order.map((category, index) => {
            return (
              <SidenavGroup
                key={index}
                categoryID={category.id}
                category={category.name}
                pages={category.pages}
                clickHandler={mobileTOCState ? toggleMobileTOC : () => {}}
              ></SidenavGroup>
            )
          })}
        </_SidenavList>

        <StyledScrollbarY>
          <StyledScrollTrack>
            <StyledScrollThumb />
          </StyledScrollTrack>
        </StyledScrollbarY>
      </_SidenavContainer>
    </Fragment>
  )
}
