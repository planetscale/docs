import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { media } from './styles/media'
import { StaticQuery, graphql, Link } from 'gatsby'
import * as Collapsible from '@radix-ui/react-collapsible'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { Menu2, Close, ArrowDropRight } from '@styled-icons/remix-line'
import SearchBar from './Searchbar'
import Logo from './Logo'

const ConditionalLogoWrapper = styled.div`
  ${media.tablet`
    display: none;
  `}
`

const _SearchBarContainer = styled.div`
  position: relative;
  padding-bottom: 2em;

  &:after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: '';
    display: block;
    height: 1px;
    width: 100%;
    background: linear-gradient(
      to right,
      var(--border-primary),
      var(--bg-primary)
    );
  }
`

const _SidenavContainer = styled(ScrollArea.Root)`
  width: 300px;
  position: sticky;
  top: 0px;
  height: calc(100vh - 90px);
  transition: border-color 100ms linear;
  padding: 2em;
  padding-right: 0;

  > [data-radix-scroll-area-viewport-position]::-webkit-scrollbar {
    -webkit-appearance: none;
    display: none;
    width: 0;
    height: 0;
  }

  > ${_SearchBarContainer} {
    display: none;
  }

  ${media.tablet`
    border-right: unset;
    position: fixed;
    top: 0;
    left: -100vw;
    z-index: 5;    
    padding: 2em;
    background-color: var(--bg-primary);
    flex-basis: 100vw;
    width: 90vw;
    height: 100vh;
    transition: left 100ms ease-out;

    &:hover {
      border-right: unset;
    }

    &.show {
      left: 0;
    }
  `}

  ${media.phone`
    overflow: hidden;

    > ${_SearchBarContainer} {
      display: block;
    }
  `}
`

const StyledScrollbarY = styled(ScrollArea.ScrollbarY)`
  z-index: 2;
  position: absolute;
  user-select: none;
  transition: 300ms opacity ease;
  width: 8;
  right: 0;
  top: 0;
  bottom: 0;
`

const StyledScrollTrack = styled(ScrollArea.Track)`
  z-index: -1;
  position: relative;
  width: 100%;
  height: 100%;
`

const StyledScrollThumb = styled(ScrollArea.Thumb)`
  background-color: var(--text-primary);
  position: absolute;
  top: 0;
  left: 0;
  user-select: none;
  border-radius: 9999;
  width: 1px;
  height: 8px;
  will-change: top;
`

const MenuLink = styled.div`
  display: none;

  ${media.tablet`
    position: fixed;
    bottom: 2em;
    left: 2em;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: var(--text-primary);
    background-color: var(--bg-tertiary);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 6px, rgba(0, 0, 0, 0.2) 0px 2px 24px;
    border-radius: 6px;
    z-index: 6;
    padding: 1em;
    font-size: 14px;

    > svg {
      width: 14px;
    }
  `}
`

const _SidenavList = styled(ScrollArea.Viewport)`
  z-index: 3;
  position: relative;

  ${media.tablet`
    padding: 2em 0;
  `}
`

const _GroupContainer = styled(Collapsible.Root)``

const _GroupHeading = styled(Collapsible.Button)`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-tertiary);
  background-color: unset;
  border: unset;
  padding: 0;
  margin: 0;
  margin-bottom: 1em;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;

  svg {
    width: 24px;
    height: 24px;
  }

  &:active,
  &:focus {
    outline: unset;
    border: unset;
  }

  &[data-state='open'] {
    svg {
      transform: rotate(90deg);
    }
  }
`

const _GroupLinks = styled(Collapsible.Content)`
  padding: 0;
  margin-bottom: 3em;
`

const _PageLink = styled(Link)`
  font-size: 14px;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 1.5em 0;
  color: var(--text-secondary);
  position: relative;

  &:hover {
    color: var(--link);
  }

  &.active {
    color: var(--text-primary);
    font-weight: 600;
  }
`

const BackgroundFrozen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(8px);
  opacity: 0.75;
  background-color: var(--gray-600);
  z-index: 4;
`

function SideNav({ categories, docPages }) {
  const [mobileTOCState, setMobileTOCState] = useState(false)

  const getPagesInCategory = (category, docPages) => {
    const outputPages = []
    category.pages.map((pageID) => {
      docPages.nodes.map((page) => {
        if (page.fields.slug.includes(pageID)) {
          outputPages.push(page)
        }
      })
    })
    return outputPages
  }

  const toggleMobileTOC = () => {
    setMobileTOCState(!mobileTOCState)
    document.body.classList.toggle('prevent-scroll')
  }

  return (
    <Fragment>
      <MenuLink onClick={toggleMobileTOC}>
        {mobileTOCState ? <Close /> : <Menu2 />}
      </MenuLink>
      {mobileTOCState && (
        <BackgroundFrozen onClick={toggleMobileTOC}></BackgroundFrozen>
      )}
      <_SidenavContainer className={`${mobileTOCState ? 'show' : ''}`}>
        <ConditionalLogoWrapper>
          <Logo />
        </ConditionalLogoWrapper>
        {mobileTOCState && (
          <_SearchBarContainer>
            <SearchBar></SearchBar>
          </_SearchBarContainer>
        )}
        <_SidenavList>
          <_PageLink
            onClick={mobileTOCState ? toggleMobileTOC : () => {}}
            to="/"
            activeClassName="active"
          >
            PlanetScale overview
          </_PageLink>

          {categories.order.map((category, index) => {
            return (
              <SidenavGroup
                key={index}
                category={category.name}
                pages={getPagesInCategory(category, docPages)}
                onClick={mobileTOCState ? toggleMobileTOC : () => {}}
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

function SidenavGroup({ category, pages, onClick }) {
  return (
    <_GroupContainer defaultOpen={true}>
      <_GroupHeading>
        {category} <ArrowDropRight />
      </_GroupHeading>
      <_GroupLinks>
        {pages.map((page, index) => {
          return (
            <div key={index}>
              <_PageLink
                onClick={onClick}
                to={`${page.fields.slug}`}
                activeClassName="active"
              >
                {page.frontmatter.title}
              </_PageLink>
            </div>
          )
        })}
      </_GroupLinks>
    </_GroupContainer>
  )
}

const query = graphql`
  query {
    categories: docsYaml {
      order {
        id
        name
        pages
      }
    }

    docPages: allMdx(filter: { frontmatter: { title: { ne: "" } } }) {
      nodes {
        frontmatter {
          title
        }
        fields {
          slug
        }
      }
    }
  }
`

export default () => (
  <StaticQuery
    query={query}
    render={(data) => {
      return (
        <SideNav
          categories={data.categories}
          docPages={data.docPages}
        ></SideNav>
      )
    }}
  ></StaticQuery>
)
