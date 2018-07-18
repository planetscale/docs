import React, { Component } from 'react'
import { navigateTo } from 'gatsby-link'
import styled from 'styled-components'
import { InputButton } from './Common.Button'
import { H5 } from '../components/Typography.Headings'

import { media } from '../styles/media'

const FormContainer = styled.form`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;

  ${media.largePhone`
    flex-wrap: wrap;
  `};
`

const InputField = styled.input`
  outline: none;
  border: 0;
  margin: 0 0 10px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 0 1em;
  z-index: 2;
  color: rgba(35, 97, 109, 0.8);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  background-color: #eee;
`

const UpdateContainer = styled.div`
  border-top: 1px solid #666;
  padding: 1.2em 0 0;
  margin: 1.2em 0 1em;

  h5 {
    margin-bottom: 1em;
  }
`

const Label = styled.label`
  font-weight: 400;
`

const Checkbox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.2em 0;

  input[type='checkbox'] {
    width: auto;
    height: auto;
    margin: 0 4px 0 0;
  }

  ${media.largePhone`
    align-items: baseline;
  `};
`

const FormSubmitButton = InputButton.extend`
  margin-top: 1.5em;
  background-color: #e46a5c;
`

const HoneyPot = styled.p`
  display: none;
`

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export class EmailForm extends Component {
  state = {
    isSending: false,
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    if (this.state.isSending) return
    else this.setState({ isSending: true })
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...this.state }),
    })
      .then(() => {
        this.props.onDone && this.props.onDone()
        this.setState({ isSending: false })
        navigateTo('/thanks/')
      })
      .catch((error) => {
        this.setState({ isSending: false })
        alert(error)
      })
    e.preventDefault()
  }

  render() {
    const { isSending } = this.state

    return (
      <FormContainer
        name="contact"
        method="post"
        action="/thanks/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={this.handleSubmit}
      >
        <InputField
          name="email"
          type="email"
          placeholder="Your email address"
          onChange={this.handleChange}
        />

        <InputField
          name="name"
          type="text"
          placeholder="Your Name"
          onChange={this.handleChange}
        />

        <InputField
          name="organization"
          type="text"
          placeholder="Your Organization"
          onChange={this.handleChange}
        />

        <UpdateContainer>
          <H5>Keep me updated on</H5>
          <Checkbox>
            <InputField
              type="checkbox"
              id="careers"
              name="feature"
              value="scales"
            />
            <Label htmlFor="careers">Careers at PlanetScale</Label>
          </Checkbox>

          <Checkbox>
            <InputField
              type="checkbox"
              id="product-offerings"
              name="feature"
              value="scales"
            />
            <Label htmlFor="product-offerings">Product Offerings</Label>
          </Checkbox>

          <Checkbox>
            <InputField
              type="checkbox"
              id="updates"
              name="feature"
              value="scales"
            />
            <Label htmlFor="updates">PlanetScale Updates</Label>
          </Checkbox>
        </UpdateContainer>

        <FormSubmitButton
          type="submit"
          value={isSending ? 'Sending' : 'Submit'}
        />
      </FormContainer>
    )
  }
}
