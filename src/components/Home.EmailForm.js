import React, { Component } from 'react'
import { navigateTo } from 'gatsby-link'
import styled from 'styled-components'
import { InputButton } from './Common.Button'

import { media } from '../styles/media'

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;

  ${media.largePhone`
    flex-wrap: wrap;
  `};
`

const InputField = styled.input`
  outline: none;
  border: 0;
  border-radius: 4px;
  margin: 0 0 10px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 0 1em;
  z-index: 2;
  color: rgba(35, 97, 109, 0.8);
  box-sizing: border-box;
`

const TextAreaField = styled.textarea`
  outline: none;
  border: 0;
  border-radius: 4px;
  margin: 0 0 10px;
  width: 100%;
  line-height: 40px;
  padding: 0 1em;
  z-index: 2;
  color: rgba(35, 97, 109, 0.8);
  box-sizing: border-box;
`

const UpdateContainer = styled.div`
  margin: 1.2em 0 0.5em;

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
  align-items: baseline;
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
      body: encode({ 'form-name': 'contactus', ...this.state }),
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
        name="contactus"
        method="post"
        action="/thanks/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={this.handleSubmit}
      >
        <HoneyPot>
          <InputField name="bot-field" />
        </HoneyPot>
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
          placeholder="Your Company"
          onChange={this.handleChange}
        />

        <TextAreaField
          name="notes"
          placeholder="Notes (anything you would like to tell us)"
          rows="5"
          onChange={this.handleChange}
        />

        <UpdateContainer>
          <Checkbox>
            <InputField
              type="checkbox"
              id="updates"
              name="feature"
              value="scales"
            />
            <Label htmlFor="updates">
              Email me PlanetScale updates (no more than once a week)
            </Label>
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
