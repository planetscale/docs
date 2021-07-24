import React from 'react'
import { styled } from '../stitches.config'
import {
  FileIcon,
  ExclamationTriangleIcon,
  StarIcon,
} from '@radix-ui/react-icons'

const LabelContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: '1.5em',
})

const IconContainer = styled('div', {
  marginRight: '0.5em',
  height: '15px',
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
          {type === 'note' && <FileIcon />}
          {type === 'warning' && <ExclamationTriangleIcon />}
          {type === 'tip' && <StarIcon />}
        </IconContainer>
        {type === 'note' && <Label>Note</Label>}{' '}
        {type === 'warning' && <Label>Warning</Label>}{' '}
        {type === 'tip' && <Label>Tip</Label>}
      </LabelContainer>

      <TextContainer>{children}</TextContainer>
    </InfoBlockContainer>
  )
}
