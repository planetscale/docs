import React from 'react'
import { styled as stitchesStyled } from './styles/stitches.config'

const HeadingWrapper = stitchesStyled('div', {
  margin: '0 0 4em',

  '@phone': {
    borderBottom: 'unset',
    marginBottom: 0,
  },
})

const HeadingContent = stitchesStyled('h1', {
  fontWeight: '600',
  fontSize: '2.441em',
  margin: '1em 0',
})

const SubHeadingContainer = stitchesStyled('div', {
  fontSize: '1.25em',
  lineHeight: '1.5em',
  maxWidth: '69ch',
  padding: '0 0 2em',
  margin: 0,

  '@phone': {
    paddingBottom: '2em',
  },
})

const CustomHorizontalRule = stitchesStyled('hr', {
  border: '1px solid var(--border-primary)',
})

const BannerImage = stitchesStyled('img', {
  width: '100%',
  borderRadius: 6,
})

export default function HeadingBlock(props) {
  const { title, subtitle, banner } = props
  return (
    <HeadingWrapper>
      <HeadingContent>{title}</HeadingContent>
      {subtitle && <SubHeadingContainer>{subtitle}</SubHeadingContainer>}
      {banner && <BannerImage src={banner}></BannerImage>}
      {subtitle && !banner && <CustomHorizontalRule />}
    </HeadingWrapper>
  )
}
