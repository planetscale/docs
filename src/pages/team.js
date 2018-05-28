import React from 'react'
import Link from 'gatsby-link'

import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'
import { Wrapper } from '../components/Layout.Wrapper'
import { H1 } from '../components/Typography.Headings'
import {
  Hero,
  HeroTitle,
  HeroSubTitle,
  HeroContent,
} from '../components/Common.Hero'

import { Footer } from '../components/Layout.Footer'

import { TeamMemberContainer, TeamMember } from '../components/Team.TeamMember'
import { InvestorContainer, Investor } from '../components/Team.Investor'

import background from '../images/hero/team-bg.svg'
import overlay from '../images/hero/team-overlay.svg'

import careersBackground from '../images/hero/careers-bg.svg'
import careersOverlay from '../images/hero/careers-overlay.svg'

export default function TeamPage({ data }) {
  const { allPagesYaml } = data
  const pageData = allPagesYaml.edges[0].node

  return (
    <div>
      <TitleAndMetaTags title="Team" pathname="team" />
      <Hero
        backgroundImage={background}
        backgroundColor={'#24D855'}
        overlay={overlay}
      >
        <Wrapper>
          <HeroTitle>
            <span style={{ fontWeight: 100 }}>{pageData.title}</span>
          </HeroTitle>
          <HeroSubTitle>{pageData.subtitle}</HeroSubTitle>
          <HeroContent>{pageData.content}</HeroContent>
        </Wrapper>
      </Hero>
      <Wrapper>
        <H1>{pageData.team.title}</H1>
        <TeamMemberContainer>
          {data.team.edges.reverse().map((edge) => {
            const { node } = edge
            const { html, frontmatter } = node
            const { name, image, linkedin } = frontmatter

            return (
              <TeamMember
                key={name}
                name={name}
                image={image}
                linkedin={linkedin}
                bio={html}
              />
            )
          })}
        </TeamMemberContainer>
        {data.investors && (
          <InvestorContainer>
            {data.investors.edges.map(Investor)}
          </InvestorContainer>
        )}
      </Wrapper>
      {/*
      <Section backgroundImage={careersBackground} backgroundColor={'#302DEF'} >
        <Wrapper>
          <SectionTitle>
            <span style={{fontWeight: 100}}>Join us!</span>
          </SectionTitle>
          <SectionSubTitle>
            We always looking for new team members.
          </SectionSubTitle>
          <SectionContent>
            <Link to='/careers'>
              <Button.div>Open Positions</Button.div>
            </Link>
          </SectionContent>
        </Wrapper>
      </Section>
      */}
      <Footer
        backgroundImage={background}
        backgroundColor={'#24D855'}
        overlay={overlay}
      />
    </div>
  )
}

export const pageQuery = graphql`
  query teamQuery {
    team: allMarkdownRemark(
      filter: { fields: { collection: { eq: "team" } } }
    ) {
      edges {
        node {
          html
          frontmatter {
            image
            name
            position
            linkedin
          }
          fields {
            slug
          }
        }
      }
    }
    investors: allMarkdownRemark(
      filter: { fields: { collection: { eq: "investors" } } }
    ) {
      edges {
        node {
          html
          frontmatter {
            image
            name
            link
          }
          fields {
            slug
          }
        }
      }
    }
    allPagesYaml(filter: { id: { regex: "/pages/team/" } }) {
      edges {
        node {
          title
          subtitle
          content
          team {
            title
          }
        }
      }
    }
  }
`
