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

const FormSubmitButton = styled(InputButton)`
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

export class SignupForm extends Component {
  state = {
    email: '',
    name: '',
    phone: '',
    company: '',
    isSending: false,
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  isFormEmpty() {
    if (
      this.state.email === '' ||
      this.state.name === '' ||
      this.state.phone === '' ||
      this.state.company === ''
    ) {
      return true
    }
    return false
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    if (this.state.isSending) return
    else if (!this.isFormEmpty()) {
      this.setState({ isSending: true })
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'signup', ...this.state }),
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
    }
  }

  render() {
    const { isSending } = this.state

    return (
      <FormContainer
        name="signup"
        onSubmit={this.onFormSubmit}
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <HoneyPot>
          <InputField name="bot-field" />
        </HoneyPot>
        <InputField
          name="name"
          type="text"
          placeholder="Name"
          onChange={this.handleChange}
        />
        <InputField
          name="email"
          type="email"
          placeholder="Email address"
          onChange={this.handleChange}
        />
        <InputField
          name="phone"
          type="text"
          placeholder="Phone Number (optional)"
          onChange={this.handleChange}
        />

        <InputField
          name="company"
          type="text"
          placeholder="Company"
          onChange={this.handleChange}
        />

        <TextAreaField
          name="notes"
          placeholder="Notes (anything you would like to tell us)"
          rows="5"
          onChange={this.handleChange}
        />

        <FormSubmitButton
          type="submit"
          value={isSending ? 'Sending' : 'Sign Up'}
        />
      </FormContainer>
    )
  }
}
