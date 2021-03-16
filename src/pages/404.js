import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { TitleAndMetaTags } from '../components/Helpers.TitleAndMetaTags'

const ImageContainer = styled.div`
  padding: 4em;
  width: 100%;
  width: 90ch;
`

const H1 = styled.h1`
  font-weight: 900;
  font-size: 3em;
  margin: 0em 0 1em 0;
`

const Text = styled.p`
  font-weight: 400;
  font-size: 17px;
  line-height: 1.5em;
`

const ContactForm = styled.div`
  margin-top: 3em;
  position: relative;
  width: 100%;
  background-color: white;
  border: 1px solid var(--accent);
  border-radius: 2px;
  padding: 2em;
`

class NotFoundPage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const script = document.createElement('script')
    script.src = 'https://js.hsforms.net/forms/v2.js'
    document.body.appendChild(script)

    script.addEventListener('load', () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: '5983949',
          target: '#contactForm',
          formId: '1cf9ad70-13c3-42e0-9771-224ab8857854',
        })
      }
    })
  }

  render() {
    return (
      <Fragment>
        <TitleAndMetaTags
          title="Page Not Found"
          pathname="404"
        ></TitleAndMetaTags>
        <ImageContainer>
          <H1>404: Page not found</H1>
          <Text>
            What you are looking for does not exist. Use the navigation menu or
            search keywords above. In case of failure, don't lose hope. Tell us
            what it is and we might be able to help you.
          </Text>
          <ContactForm id="contactForm"></ContactForm>
        </ImageContainer>
      </Fragment>
    )
  }
}

export default NotFoundPage
