import React from 'react'
import styled from 'styled-components'
import MarkdownContent from './Common.MarkdownContent'
import { media } from '../styles/media'
import { StaticQuery, graphql } from 'gatsby'
import { Wrapper } from './Layout.Wrapper'
import { Button, ButtonLink } from '../components/Common.Button'
import { unstyle } from 'ansi-colors'

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
const _Container = styled.div`
  display: flex;
  flex-direction: row;

  ${media.largePhone`
    flex-direction: column;
  `};
`

const _Section = styled.div`
  align-items: flex-start;
  flex-grow: 0;
  display: flex;
  flex-direction: column;

  &.left {
    margin-right: 8em;
  }

  &.right {
    margin-right: 4em;
  }

  a {
    display: inline-block;
    color: #fff;
    text-decoration: none;
    border-bottom: 1px dashed #ef6128;
  }

  ${media.largePhone`
    text-align: center;

    &.left, &.right {
      margin-right: unset;
    }
  `};
`

const _SectionTitle = styled.h6`
  font-size: var(--exo-font-size-h6);
  color: #f1572c;

  ${media.largePhone`
    text-align: center;
  `};
`

const _TechSection = styled.div`
  display: grid;
  margin-bottom: 4em;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 4fr;

  ${media.largePhone`
    grid-template-rows: 1fr 2.5fr;
    grid-template-columns: 1fr;
  `};
`

const _TechSectionLogo = styled.img`
  margin-right: 1em;

  ${media.largePhone`
    margin: 0 auto;
    margin-bottom: 1em;
  `};
`

const _Logos = styled.img`
  margin-bottom: 2em;

  ${media.largePhone`
    width: 100%;
  `};
`

export function SectionProvenTechnology() {
  return (
    <StaticQuery
      query={sectionProvenTechnology}
      render={(data) => (
        <Wrapper>
          <Title>{data.section.title}</Title>
          <_Container>
            <_Section className="left">
              <_SectionTitle>{data.section.leftSection.title}</_SectionTitle>
              <_TechSection>
                <_TechSectionLogo
                  src={data.section.leftSection.vitess.logo}
                ></_TechSectionLogo>
                <MarkdownContent
                  html={data.section.leftSection.vitess.blurb}
                  inverted={true}
                />
              </_TechSection>
              <_TechSection>
                <_TechSectionLogo
                  src={data.section.leftSection.mysql.logo}
                ></_TechSectionLogo>
                <MarkdownContent
                  html={data.section.leftSection.mysql.blurb}
                  inverted={true}
                />
              </_TechSection>
            </_Section>
            <_Section className="right">
              <_SectionTitle>{data.section.rightSection.title}</_SectionTitle>
              <_Logos src={data.section.rightSection.image}></_Logos>
              <a href={data.section.rightSection.link}>
                {data.section.rightSection.linkLabel}
              </a>
            </_Section>
          </_Container>
        </Wrapper>
      )}
    ></StaticQuery>
  )
}

const sectionProvenTechnology = graphql`
  query {
    section: componentsYaml(id: { eq: "section.provenTechnology" }) {
      title
      leftSection {
        title
        vitess {
          logo
          blurb
        }
        mysql {
          logo
          blurb
        }
      }
      rightSection {
        title
        image
        link
        linkLabel
      }
    }
  }
`
