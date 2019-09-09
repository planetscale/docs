import React from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  RedditIcon,
  EmailIcon,
} from 'react-share'

const ShareContainer = styled.div`
  margin: 2em 0 0;
  padding: 0 1em 1em;
  border: 1px solid #eee;
  border-radius: 8px;
  width: min-content;
  box-sizing: border-box;

  ${media.largePhone`
    width: 100%;
  `}
`

const Title = styled.h3`
  font-size: 1em;
  margin-left: 0.5em;
  border-bottom: 1px solid #eee;
  padding: 0.5em 0;
`

const BlogPostShareButtonsContainer = styled.ol`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  display: flex;
`

const PlatformContainer = styled.li`
  cursor: pointer;
  margin: 0 0.2em;
`
export const BlogPostShareButtons = ({ title, shareUrl }) => {
  return (
    <ShareContainer>
      <Title>Share</Title>
      <BlogPostShareButtonsContainer>
        {[
          <FacebookShareButton url={shareUrl} quote={title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>,
          <TwitterShareButton url={shareUrl} title={title}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>,
          <LinkedinShareButton
            url={shareUrl}
            title={title}
            windowWidth={750}
            windowHeight={600}
          >
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>,
          <RedditShareButton
            url={shareUrl}
            title={title}
            windowWidth={660}
            windowHeight={460}
          >
            <RedditIcon size={32} round />
          </RedditShareButton>,
          <EmailShareButton url={shareUrl} subject={title}>
            <EmailIcon size={32} round />
          </EmailShareButton>,
        ].map((shareButton, index) => (
          <PlatformContainer key={index} children={shareButton} />
        ))}
      </BlogPostShareButtonsContainer>
    </ShareContainer>
  )
}
