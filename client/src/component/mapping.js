import React from 'react'
import { Row, Col, Space } from 'antd'

import * as fp from 'lodash/fp'

import { IconTypes } from '../configs'

import styled, { css } from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-flow: column;

  justify-content: space-between;
  background: white;
  border: 1px solid;

  /* padding: 10px; */
  border-radius: 10px;
  width: 100%;
  height: 100%;
`

const Icon = styled.img`
  width: 20px;
  height: 20px;
  padding: 2px;

  border-radius: 5px;

  background: ${(props) => props.color};
  background-repeat: no-repeat;
  background-size: 100%;
`

const BoxContainer = styled.div`
  display: flex;
  align-items: center;

  color: #a8a8a8;
  border: 1px solid #a8a8a8;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  text-align: center;

  justify-content: space-around;

  ${(props) =>
    props.active === true &&
    css`
      color: white;
      background: ${(props) => props.color};
      border-color: ${(props) => props.color};
    `}
`

const isActive = (a, b) => {
  console.log(a, b)
  if (a && b) return fp.isEqual(fp.toLower(a), fp.toLower(b))

  return false
}

const Box = (props) => {
  const { type, curr } = props
  const { color, image } = fp.getOr(
    { color: '#797979' },
    fp.toLower(type)
  )(IconTypes)

  return (
    <BoxContainer {...props} color={color} active={isActive(type, curr)}>
      {image && <Icon src={image} color={color} />}
      <span>{type}</span>
    </BoxContainer>
  )
}

const Mapping = ({ type }) => {
  return (
    <Container>
      <Row justify="center">
        <Col span={3}>
          <Box type="desk" height="80px" curr={type} />
        </Col>
        <Col span={3}>
          <Box type="closet" height="80px" curr={type} />
        </Col>
        <Col span={6}>
          <Box height="80px" />
        </Col>
        <Col span={3}>
          <Box type="desk" height="80px" curr={type} />
        </Col>
        <Col span={3}>
          <Box type="closet" height="80px" curr={type} />
        </Col>
      </Row>
      
      <Row > 
        <Col span={2} className="Box1">
        </Col>

        <Col span={4} >
          <Box type="bed" height="200px" curr={type} />
        </Col>

        <Col span={1}>

        </Col>

        <Col span={1} className="Bone">
          <Col className="Btwo" />
          <Col className="Bthree" />
        </Col>

        <Col span={1}>

        </Col>

        <Col span={4}>
          <Box type="bed" height="200px" curr={type}/>
        </Col>

        <Col span={2} className="Box1">
          
        </Col>

        <Col span={2} className="Shower">
          <Col className="Ishower">
            <Box className="Bshower" type="shower" curr={type}/>
          </Col>
         

        </Col>

        <Col span={5} className="Bathroom">
          <Col className="Toilet" > 
            <Box className="Btoilet" type="toilet" curr={type} />
          </Col> 
        </Col>

        <Col span={2}>
          <Box  />
            <Col className="Sink"  >
              <Box  className="Bsink" type="sink" curr={type}/>
            </Col>
        </Col>
      </Row>
    </Container>
  )
}

Mapping.propTypes = {}

export default Mapping
