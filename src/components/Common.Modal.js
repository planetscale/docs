import React from 'react'
import Rodal from 'rodal'

import '../css/rodal.css'
import { EmailForm } from './Home.EmailForm'
import { H3 } from '../components/Typography.Headings'

const customStyles = {
  backgroundColor: '#808284',
  color: 'white',
  maxWidth: '600px',
  height: '350px',
  padding: '2em',
  borderRadius: '4px',
}

export class Modal extends React.PureComponent {
  render() {
    return (
      <Rodal
        visible={this.props.visible}
        onClose={this.props.onClose}
        customStyles={customStyles}
        closeOnEsc={true}
        animation={'slideUp'}
      >
        {this.props.children}
      </Rodal>
    )
  }
}
