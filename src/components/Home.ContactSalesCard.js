import React, { Component } from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'
import { Button } from '../components/Common.Button'
import background from '../images/hero/home-bg.svg'

const _Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 30px auto;
  padding: 30px;
  max-width: 600px;
  box-shadow: 0 0 4px #d8d8d8;
  border-radius: 4px;

  ${media.largePhone`
    flex-direction: column;
    margin: 20px;
  `};
`

const Title = styled.h2`
  font-size: 1.8em;
  font-weight: 300;
  margin: 0;

  ${media.largePhone`
    font-size: 1.4em;
    font-weight: 100;
    margin-bottom: 1em;
  `};
`

const ButtonLink = styled.a`
  text-decoration: none;
`

export class ContactSalesCard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <_Container>
        <Title>Ready to start scaling?</Title>
        <Button backgroundImage={background}>
          <ButtonLink href="/signup">Sign Up</ButtonLink>{' '}
        </Button>
      </_Container>
    )
  }
}
