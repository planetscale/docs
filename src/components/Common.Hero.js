import React, { Fragment } from 'react'
import styled from 'styled-components'
import Header from '../components/Layout.Header'

const _Hero = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: top;
  position: relative;
  width: 100%;
  flex-wrap: ${(props) => props.wrap || 'nowrap'};
  overflow: hidden;
`

export function Hero({ wrap }) {
  return (
    <Fragment>
      <_Hero wrap={wrap}>
        <Header />
      </_Hero>
    </Fragment>
  )
}
