import React from 'react'
import { styled } from '../stitches.config'
import { File4, AlarmWarning, Star } from '@styled-icons/remix-line'

const IconContainer = styled('div', {
  marginRight: '1em',
  fontSize: '14px',
  lineHeight: '24.1818px',

  '&:before': {
    content: '',
    marginBottom: '-0.5em',
    display: 'table',
  },

  '&:after': {
    content: '',
    marginTop: '-0.5em',
    display: 'table',
  },

  '> svg': {
    width: '16px',
  },
})

const TextContainer = styled('div', {
  fontSize: '16px',
  lineHeight: '24px',

  '&:before': {
    content: '',
    marginBottom: '-0.3864em',
    display: 'table',
  },

  '&:after': {
    content: '',
    marginTop: '-0.3864em',
    display: 'table',
  },
})

const InfoBlockContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  borderRadius: '6px',
  margin: '2em 0 2em',
  padding: '1.5em 1em',

  variants: {
    type: {
      note: {
        backgroundColor: '$textGreenTranslucent',

        [`> ${IconContainer} > svg`]: {
          color: '$textGreen',
        },
      },
      warning: {
        backgroundColor: '$textOrangeTranslucent',

        [`> ${IconContainer} > svg`]: {
          color: '$textOrange',
        },
      },
      tip: {
        backgroundColor: '$textPurpleTranslucent',

        [`> ${IconContainer} > svg`]: {
          color: '$textPurple',
        },
      },
    },
  },
})

export default function InfoBlock(props) {
  const { type, children } = props

  return (
    <InfoBlockContainer type={type}>
      <IconContainer>
        {type === 'note' && <File4 />}
        {type === 'warning' && <AlarmWarning />}
        {type === 'tip' && <Star />}
      </IconContainer>

      <TextContainer>{children}</TextContainer>
    </InfoBlockContainer>
  )
}
