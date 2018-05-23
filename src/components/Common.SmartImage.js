import React from 'react'
import styled from 'styled-components'
import VisibilitySensor from 'react-visibility-sensor'

const _SmartImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center bottom;
  position: absolute;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : 'white'};
  background-image: ${(props) => props.backgroundImage};

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props) =>
      props.backgroundColor ? props.backgroundColor : 'white'};
  }

  ${(props) =>
    props.isLoaded
      ? `
		&::after {
			opacity: 0;
			transition: opacity 2s cubic-bezier(.165,.84, .44, 1);
		}
	`
      : ``};
`

export class SmartImage extends React.Component {
  constructor(props) {
    super(props)

    this.state = { inView: false }
  }

  handleChange = (isVisible) => {
    this.setState({ inView: isVisible })
  }

  render() {
    return (
      <VisibilitySensor
        onChange={this.handleChange}
        partialVisibility
        active={!this.state.inView}
      >
        <_SmartImage
          backgroundColor={this.props.backgroundColor}
          backgroundImage={`url(${this.props.img})`}
          isLoaded={this.state.inView}
        />
      </VisibilitySensor>
    )
  }
}
