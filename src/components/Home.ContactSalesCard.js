import React, { Component } from 'react'
import styled from 'styled-components'
import MarkdownContent from '../components/Common.MarkdownContent'
import { media } from '../styles/media'
import bottomOverlay from '../images/waves.png'
import { Button } from '../components/Common.Button'
import background from '../images/hero/home-bg.svg'
import { Modal } from '../components/Common.Modal'
import { H3 } from '../components/Typography.Headings'
import { EmailForm } from './Home.EmailForm'

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

export class ContactSalesCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalOpen: false,
    }
  }

  toggleModal = (boolean) =>
    this.setState((oldState) => {
      return {
        modalOpen: boolean,
      }
    })

  render() {
    const { modalOpen } = this.state

    return (
      <_Container>
        <Title>Ready to start scaling?</Title>
        <Button backgroundImage={background} onClick={this.toggleModal}>
          Get Started
        </Button>
        <Modal visible={modalOpen} onClose={() => this.toggleModal(false)}>
          <H3>Let us help you operationalize Vitess.</H3>
          <EmailForm onDone={() => this.toggleModal(false)} />
        </Modal>
      </_Container>
    )
  }
}
