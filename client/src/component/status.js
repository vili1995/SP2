import React from 'react'
import styled from 'styled-components'

import { IconTypes } from '../configs'

import * as fp from 'lodash/fp'

const Container = styled.div`
  background: ${(props) => props.color};
  border-radius: 10px;
  padding: 4px 14px;

  font-size: 16px;

  color: white;
`

const Icon = styled.img`
  width: 20px;
  height: 20px;
  padding: 2px;

  border: 1px solid;
  border-radius: 10px;

  background-repeat: no-repeat;
  background-size: 100%;
`

const Status = ({ type }) => {
  const { color, image } = fp.getOr(
    { color: '#797979', image: '' },
    fp.toLower(type)
  )(IconTypes)

  return (
    <Container color={color || '#797979'}>
      Status :{' '}
      {type && image && (
        <span>
          <Icon src={image} color={color} /> Patient is at {type}
        </span>
      )}
    </Container>
  )
}

Status.defaultProps = {
  type: 'Bed',
}


export default Status
