import React from 'react'
import Typist from 'react-typist'

export class Writer extends React.Component {
  constructor(props) {
    super(props)

    this.state = { typing: true, counter: 0 }
  }

  handleDone = () => {
    this.setState({ typing: false })
  }

  render() {
    return (
      <Typist
        style={{ display: 'inline' }}
        startDelay={this.state.counter === 0 ? 500 : 0}
        stdTypingDelay={25}
        avgTypingDelay={50}
        cursor={{ show: false }}
        onTypingDone={this.handleDone}
      >
        {this.props.texts.map((text, index) => {
          if (index === this.props.texts.length - 1)
            return <span key={text}>{text}</span>
          else
            return (
              <span key={text}>
                {text}
                <Typist.Backspace count={text.length + 1} delay={1500} />
                <Typist.Delay ms={10} />
              </span>
            )
        })}
      </Typist>
    )
  }
}
