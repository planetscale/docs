import React, { Component } from 'react'
import styled from 'styled-components'
import { media } from './styles/media'
import { StaticQuery, graphql, Link } from 'gatsby'
import * as Collapsible from '@radix-ui/react-collapsible'
import * as ScrollArea from '@radix-ui/react-scroll-area';

const _SidenavContainer = styled.div`
  position: sticky;
  top: calc(89px + 4em);
  margin-right: 2em;
  padding-right: 2em;
  width: 100%;
  min-width: 350px;
  max-width: 350px;
  height: calc(100vh - 89px - 8em);
  border-right: 1px solid var(--bg-primary);
  transition: border-color 100ms linear;
  background: var(--bg-primary);

  &:hover {
    border-right: 1px solid var(--border-primary);
  }

  ${media.tablet`
    border-right: unset;
    max-width: unset;
    position: fixed;
    top: -100vh;
    left: 0;
    z-index: 2;
    padding: 0;
    margin: 0;
    height: 100vh;
    padding: 2em;

    &:hover {
      border-right: unset;
    }

    &.show {
      top: 0;
    }
  `}
`

const ScrollAreaRoot = styled(ScrollArea.Root)`
  position: 'relative';
  z-index: 0;
  max-width: 100%;
  height: calc(100vh - 89px - 8em);
  max-height: 100%;

  &[data-radix-scroll-area-viewport-position]::-webkit-scrollbar {
    display: none;
  }

  ${media.tablet`
    height: 100vh;
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
`;

const StyledScrollTrack = styled(ScrollArea.Track)`
  z-index: -1;
  position: relative;
  width: 100%;
  height: 100%;
`;

const StyledScrollThumb = styled(ScrollArea.Thumb)`
  background-color: var(--text-primary);
  position: absolute;
  top: 0;
  left: 0;
  user-select: none;
  border-radius: 9999;
  width: 1px;
  height: 8px;
`;

const MenuLink = styled.div`
  display: none;

  ${media.tablet`
    position: fixed;
    bottom: 16px;
    right: calc(16px + 60px + 16px);
    font-size: 1em;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: #000;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 6px, rgba(0, 0, 0, 0.2) 0px 2px 24px;
    height: 60px;
    border-radius: 99px;
    z-index: 3;
    padding: 0 1em;
  `}
`

const _SidenavList = styled(ScrollArea.Viewport)`
  overflow: none;

  ${media.tablet`
    height: 100vh;
  `}
`

const _GroupContainer = styled(Collapsible.Root)`
`

const _GroupHeading = styled(Collapsible.Button)`
  font-size: 1em;
  letter-spacing: 1px;
  color: var(--text-secondary);
  background-color: unset;
  border: unset;
  padding: 0;
  margin-bottom: 1em;
  cursor: pointer;

  &:before {
    content: '›';
    display: inline-block;
    margin-right: 8px;
    height: 22px;
  }

  &:active,
  &:focus {
    outline: unset;
    border: unset;
  }

  &[data-state='open'] {
    &:before {
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
  margin: 0 0 1.5em 1em;
  color: var(--text-secondary);
  position: relative;

  &:before {
    content: ' ';
    height: 100%;
    width: 1px;
    left: -0.8em;
    position: absolute;
  }

  &:hover {
    color: var(--link);

    &:before {
      border-left: 1px solid var(--link);
    }
  }

  &.active {
    color: var(--text-primary);
    font-weight: 600;

    &:before {
      border-left: 1px solid var(--text-primary);
    }
  }
`

class Sidenav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMobileTOCOpen: false,
    }
  }

  getPagesInCategory(category, docPages) {
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

  toggleMobileTOC = (boolean) => {
    this.setState((oldState) => {
      return {
        isMobileTOCOpen:
          typeof boolean === 'boolean' ? boolean : !oldState.isMobileTOCOpen,
      }
    })
  }

  render() {
    const { isMobileTOCOpen } = this.state

    return (
      <_SidenavContainer className={`${isMobileTOCOpen ? 'show' : ''}`}>
        <MenuLink onClick={this.toggleMobileTOC}>
          {isMobileTOCOpen ? 'Close' : 'Menu'}
        </MenuLink>

        <ScrollAreaRoot>
          <_SidenavList>
            <_PageLink
              onClick={this.toggleMobileTOC}
              to="/"
              activeClassName="active"
            >
              Documentation overview
            </_PageLink>

            {this.props.categories.order.map((category, index) => {
              return (
                <SidenavGroup
                  key={index}
                  category={category.name}
                  pages={this.getPagesInCategory(category, this.props.docPages)}
                  onClick={this.toggleMobileTOC}
                ></SidenavGroup>
              )
            })}
          </_SidenavList>

          <StyledScrollbarY>
            <StyledScrollTrack>
              <StyledScrollThumb />
            </StyledScrollTrack>
          </StyledScrollbarY>
        </ScrollAreaRoot>
      </_SidenavContainer>
    )
  }
}

function SidenavGroup({ category, pages, onClick }) {
  const isChildActive = (children) => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const isChildActive = pages.reduce((accumulator, page) => {
      return accumulator || url.includes(page.fields.slug)
    }, false)

    return isChildActive
  }

  return (
    <_GroupContainer defaultOpen={isChildActive}>
      <_GroupHeading>{category}</_GroupHeading>
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
        <Sidenav
          categories={data.categories}
          docPages={data.docPages}
        ></Sidenav>
      )
    }}
  ></StaticQuery>
)
