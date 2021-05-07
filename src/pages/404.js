import React, { Component, Fragment } from 'react'
import { styled } from '../components/styles/stitches.config'
import { TitleAndMetaTags } from '../components/TitleAndMetaTags'
import HeadingBlock from '../components/HeadingBlock'
import { ContentBlock } from '../components/Layout.Wrapper'
import { ButtonSecondary } from '../components/Buttons'
import { Github } from '@styled-icons/remix-line'

const Text = styled('p', {
  fontSize: '1em',
  lineHeight: '1.75em',
})

const ButtonContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
})

class NotFoundPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Fragment>
        <TitleAndMetaTags
          title="Page Not Found"
          pathname="404"
        ></TitleAndMetaTags>
        <ContentBlock overview>
          <HeadingBlock title="404: Page not found" />
          <Text>
            What you are looking probably does not exist. Use the navigation
            menu or the searchbar to double check. In case of failure, browse
            our Github repository or open an issue for our team to help you out.
          </Text>
          <ButtonContainer>
            <ButtonSecondary
              as="a"
              href="https://github.com/planetscale/docs.public"
            >
              <Github />
              <span>Visit @planetscale/docs.public</span>
            </ButtonSecondary>
          </ButtonContainer>
        </ContentBlock>
      </Fragment>
    )
  }
}

export default NotFoundPage
