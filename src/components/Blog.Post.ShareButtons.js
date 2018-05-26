import React from 'react'
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
import styled from 'styled-components'
import { Spacing } from './Layout.Spacing'

const BlogPostShareButtonsContainer = styled.ol`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 350px;
  display: flex;
  margin-top: 2em;
`

const PlatformContainer = styled.li`
  cursor: pointer;
`
export const BlogPostShareButtons = ({ title, shareUrl }) => {
  return (
    <React.Fragment>
      <Spacing />
      <BlogPostShareButtonsContainer>
        <h3>Share this article</h3>
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
    </React.Fragment>
  )
}
