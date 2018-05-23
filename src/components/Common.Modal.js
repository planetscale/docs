import React from 'react'
import Rodal from 'rodal'

import 'rodal/lib/rodal.css'

const customStyles = {
  backgroundColor: '#2878E0',
  color: 'white',
  width: 'auto',
  maxWidth: '600px',
  padding: '2rem 1rem 0 3rem',
  borderRadius: '1rem',
}

export class Modal extends React.PureComponent {
  render() {
    return (
      <Rodal
        visible={this.props.visible}
        onClose={this.props.onClose}
        customStyles={customStyles}
        closeOnEsc={true}
      >
        {this.props.children}
      </Rodal>
    )
  }
}
