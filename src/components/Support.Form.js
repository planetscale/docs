import React, { Component } from 'react'
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

export class SupportForm extends Component {
  render() {
    return (
      <FormContainer
        action="https://webto.salesforce.com/servlet/servlet.WebToCase?encoding=UTF-8"
        method="POST"
      >
        <InputField type="hidden" name="orgid" value="00D4P0000010OuM" />
        <InputField
          type="hidden"
          name="retURL"
          value="http://planetscale.com/thanks"
        />
        <InputField name="name" type="text" placeholder="Name" />
        <InputField name="email" type="email" placeholder="Email address" />
        <InputField name="phone" type="text" placeholder="Phone Number" />
        <InputField name="subject" type="text" placeholder="Subject" />
        <TextAreaField name="description" placeholder="Description" rows="5" />
        <FormSubmitButton type="submit" value="Submit Ticket" />
      </FormContainer>
    )
  }
}
