import React, { Component } from 'react'
import { navigateTo } from 'gatsby-link'
import styled from 'styled-components'
import { InputButton } from './Common.Button'

import { media } from '../styles/media'

const FormContainer = styled.form`
  margin-top: 40px;
  display: flex;
  max-width: 525px;
  width: 100%;
  position: relative;

  ${media.largePhone`
    flex-wrap: wrap;
  `};
`

const InputField = styled.input`
  outline: none;
  border: 0;
  margin: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 0 1em;
  z-index: 2;
  color: rgba(35, 97, 109, 0.8);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
`

const AbsoluteButton = styled.input`
  outline: none;
  position: absolute;
  right: 4px;
  top: 4px;
  bottom: 4px;
  box-shadow: none;
  border: none;
  background-color: #efad2d;
  color: white;
  border-radius: 4px;
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
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...this.state }),
    })
      .then(() => {
        this.props.onDone && this.props.onDone()
        navigateTo('/thanks/')
      })
      .catch((error) => alert(error))

    e.preventDefault()
  }

  render() {
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
        <InputButton type="submit" value="Reach out to learn more" />
      </FormContainer>
    )
  }
}
