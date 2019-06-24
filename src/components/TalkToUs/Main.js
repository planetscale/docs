import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../../styles/globals'
import { DialogCloseButton, CalendlyWrap, CalendlyWrapContent } from './styles'

export default class TalkDrawer extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)
  }

  render() {
    const { visible, calendly, onClick } = this.props
    const { closeDialog } = calendly

    return (
      <CalendlyWrap visible={visible} id="calendly-dialog">
        <div className="header" />
        <CalendlyWrapContent>
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/planetscale-presale-default/30min-1on1"
          />
        </CalendlyWrapContent>
        <DialogCloseButton
          onClick={onClick}
          aria-controls="calendly-dialog"
          aria-label={closeDialog}
        >
          <span>✕</span>
        </DialogCloseButton>
      </CalendlyWrap>
    )
  }
}
