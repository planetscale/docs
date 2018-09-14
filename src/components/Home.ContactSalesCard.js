import React, { Component } from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'
import { Button } from '../components/Common.Button'
import background from '../images/hero/home-bg.svg'
import { Modal } from '../components/Common.Modal'
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

const ModalTitle = styled.div`
  margin: 1.4em 0.7em 0em;
  font-size: 2em;
`

const CareerLink = styled.div`
  width: 100%;
  height: 40px;
  background-color: #8a8a8a;
  margin-top: 20px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  box-sizing: border-box;
  padding: 0.7em 2em;
  text-align: center;
  color: #d8d8d8;
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
          <ModalTitle>Let us run Vitess for you.</ModalTitle>
          <EmailForm onDone={() => this.toggleModal(false)} />
          <CareerLink>
            Psst! We are{' '}
            <a href={'/careers'} activeStyle={{ opacity: 1 }}>
              hiring
            </a>
          </CareerLink>
        </Modal>
      </_Container>
    )
  }
}
