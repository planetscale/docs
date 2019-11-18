import React from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'
import { StaticQuery, graphql, Link } from 'gatsby'
import { Wrapper } from './Layout.Wrapper'

const _Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  background-color: #000;
  color: #fff;
  padding: 4em;
  display: flex;
  flex-direction: row;

  ${media.largePhone`
    padding: 4em 2em 2em;
    flex-direction: column;
    align-items: left;
    width: 100%;
  `}
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;

  ${media.largePhone`
    margin-bottom: 2em;
  `}
`

const _Quote = styled.div`
  font-size: 18px;
  font-style: italic;
  line-height: 1.5em;
  text-align: justify;
  margin-bottom: 1.5em;
  color: #d7d7d7;

  &:before,
  &:after {
    content: '"';
  }

  ${media.largePhone`
    text-align: left;
  `}
`

const _Author = styled.div`
  font-size: 18px;
  margin: 0;
  color: #f16827;

  &:before {
    content: '- ';
  }
`

export function BlockQuote() {
  return (
    <StaticQuery
      query={staticQuery}
      render={(data) => {
        const { quote, author } = data.blockQuote
        return (
          <Wrapper>
            <_Container>
              <Content>
                <_Quote>{quote}</_Quote>
                <_Author>{author}</_Author>
              </Content>
            </_Container>
          </Wrapper>
        )
      }}
    ></StaticQuery>
  )
}

const staticQuery = graphql`
  query {
    blockQuote: componentsYaml(id: { eq: "block.quote" }) {
      quote
      author
    }
  }
`
