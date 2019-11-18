import React from 'react'
import styled from 'styled-components'
import MarkdownContent from './Common.MarkdownContent'
import { media } from '../styles/media'
import { StaticQuery, graphql } from 'gatsby'
import { Wrapper } from './Layout.Wrapper'
import { Button, ButtonLink } from '../components/Common.Button'

const FeatureContainer = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1em 1em;
  list-style: none;
  padding: 0;
  margin: 2em 0 5em;

  ${media.largePhone`
    grid-template-columns: 1fr;
    grid-gap: 0em 0em;
  `}
`

const Title = styled.h2`
  color: white;
  font-size: var(--exo-font-size-h2);
  font-weight: 700;
  margin: 0;
  margin-bottom: 0.5em;
  text-align: center;

  ${media.largePhone`
    font-size: 1.2em;
  `};
`

const SubTitle = styled.h6`
  font-size: var(--exo-font-size-h6);
  font-weight: 700;
  margin: 0;
  color: #f1572c;
  text-align: center;

  ${media.largePhone`
    font-size: 1.2em;
  `};
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${media.largePhone`
    text-align: left;
  `};
`

const _Feature = styled.li`
  display: flex;
  flex-direction: column;
  max-width: 340px;
  margin-top: 42px;

  ${media.largePhone`
    padding: 1em;
  `};
`

const FeatureTitle = styled.h5`
  font-size: var(--exo-font-size-h5);
  color: white;
  margin: 0;
  padding-bottom: 0.5em;
  border-bottom: 1px solid #f1572c;
`

const Content = styled.div`
  margin-top: 1em;
  font-weight: 300;
  font-size: 1.1em;
  line-height: 1.5em;
`

const SectionButton = styled.div`
  text-align: center;
`

export function SectionHereToHelp() {
  return (
    <StaticQuery
      query={sectionHereToHelp}
      render={(data) => (
        <Wrapper>
          <Title>{data.sectionHereToHelp.title}</Title>
          <SubTitle>{data.sectionHereToHelp.subtitle}</SubTitle>
          <FeatureContainer>
            {data.sectionHereToHelp.list.map(Feature)}
          </FeatureContainer>
          <SectionButton>
            <Button>
              <ButtonLink href="/products">Learn More</ButtonLink>{' '}
            </Button>
          </SectionButton>
        </Wrapper>
      )}
    ></StaticQuery>
  )
}

function Feature({ title, blurb }) {
  return (
    <_Feature key={title}>
      <ContentContainer>
        <FeatureTitle>{title}</FeatureTitle>
        <Content>
          <MarkdownContent html={blurb} inverted={true} />
        </Content>
      </ContentContainer>
    </_Feature>
  )
}

const sectionHereToHelp = graphql`
  query {
    sectionHereToHelp: componentsYaml(id: { eq: "section.hereToHelp" }) {
      title
      subtitle
      list {
        title
        blurb
      }
    }
  }
`
