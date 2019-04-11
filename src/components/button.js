import React from 'react'
import PropTypes from 'prop-types'

import { css } from 'styled-components'

import styled from 'styled-components'

//styled-components example
const Button = styled.button`
  background: transparent;
  border-radius: 0.5rem;
  border: 2px solid #0090FF;
  color: #0090FF;
  margin: 1em 0;
  padding: 0.25em 1em;
  font-size: ${props => props.big ? '1.5rem' : '1rem'}
  ${props => props.big && css`
    width: 100%;
  `}
`

Button.propTypes = {

}

export default Button
