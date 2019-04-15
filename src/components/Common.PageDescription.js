import styled from 'styled-components'
import PropTypes from 'prop-types'

const styles = `
  margin: 0 auto;
  font-size: 20px;
  width: 100%;
  line-height: 1.5;
`

export const PageDescription = styled.p`
  ${styles} ${(props) => (props.relaxedWidth ? '' : 'max-width: 550px;')};
`

PageDescription.propTypes = {
  relaxedWidth: PropTypes.string,
}
