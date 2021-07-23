import React, { Fragment } from 'react'
import { styled } from '../stitches.config'
import { File4, AlarmWarning, Star } from '@styled-icons/remix-line'

const LabelContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: '1em',
})

const IconContainer = styled('div', {
  marginRight: '0.5em',
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
  lineHeight: '26px',

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

const Label = styled('span', {
  fontWeight: '$2',
  fontSize: '14px',
  paddingTop: '2px',
})

const InfoBlockContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  borderRadius: '6px',
  margin: '2em 0 2em',
  padding: '1.5em 1em',

  variants: {
    type: {
      note: {
        backgroundColor: '$textGreenTranslucent',

        [`${IconContainer} > svg`]: {
          color: '$textGreen',
        },

        [`${Label}`]: {
          color: '$textGreen',
        },
      },
      warning: {
        backgroundColor: '$textOrangeTranslucent',

        [`${IconContainer} > svg`]: {
          color: '$textOrange',
        },

        [`${Label}`]: {
          color: '$textOrange',
        },
      },
      tip: {
        backgroundColor: '$textPurpleTranslucent',

        [`${IconContainer} > svg`]: {
          color: '$textPurple',
        },

        [`${Label}`]: {
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
      <LabelContainer>
        <IconContainer>
          {type === 'note' && <File4 />}
          {type === 'warning' && <AlarmWarning />}
          {type === 'tip' && <Star />}
        </IconContainer>
        {type === 'note' && <Label>Note</Label>}{' '}
        {type === 'warning' && <Label>Warning</Label>}{' '}
        {type === 'tip' && <Label>Tip</Label>}
      </LabelContainer>

      <TextContainer>{children}</TextContainer>
    </InfoBlockContainer>
  )
}
