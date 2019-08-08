import React, { Component } from 'react'

export class Form extends Component {
  componentDidMount() {
    const script = document.createElement('script')
    script.src = 'https://js.hsforms.net/forms/v2.js'
    script.async = true
    document.body.appendChild(script)

    script.addEventListener('load', () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: this.props.portalId,
          formId: this.props.formId,
          target: '#hubspot-form',
        })
      }
    })
  }
  render(props) {
    return (
      <React.Fragment>
        <div id="hubspot-form"></div>
      </React.Fragment>
    )
  }
}
