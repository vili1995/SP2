import React, { useState, useEffect } from 'react'
import { Layout, Row, Col } from 'antd'

import socketIOClient from 'socket.io-client'

import * as fp from 'lodash/fp'

import styled, { css } from 'styled-components'

import Time from '../component/time'
import Status from '../component/status'
import Mapping from '../component/mapping'
import Activity from '../component/activity'

const { Header, Content } = Layout

const LayoutStyled = styled(Layout)`
  width: 100vw;
  height: 100vh;
  background: white;
`

const Title = styled.h3`
  text-align: left;
  font-size: 35px;
  color: #4da1ee;
`

const DisplayStatus = styled.span`
  ${(props) =>
    props.type === 'Idel' &&
    css`
      color: #ff9800;
    `}
  ${(props) =>
    props.type === 'Online' &&
    css`
      color: #4caf50;
    `}
  ${(props) =>
    props.type === 'Offline' &&
    css`
      color: #f44336;
    `}
`

const TimeStyled = styled(Time)`
  text-align: right;
  font-size: 16px;
`

const ContentStyled = styled(Content)`
  display: flex;
  flex-flow: column;

  overflow: hidden;

  border: 1px solid;
  margin: 20px 50px;
  padding: 40px;
  border-radius: 10px;

  box-sizing: content-box;
`

const socket = socketIOClient('http://localhost:5000/event')

const Screen = () => {
  const [connectionStatus, setConnectionStatus] = useState('Offline')
  const [prediction, setPrediction] = useState([])

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected')
      setConnectionStatus('Idel')
      socket.emit('server')
    })

    socket.on('disconnect', () => {
      setConnectionStatus('Offline')
      console.log('disconnected')
    })

    socket.on('prediction', (data) => {
      if (connectionStatus !== 'Online') setConnectionStatus('Online')
      setPrediction((oldArray) => [...oldArray, data])
    })
  }, [])

  return (
    <LayoutStyled>
      <Header style={{ background: '#ffff' }}>
        <Row>
          <Col span={17}>
            <Title>Smart Residence</Title>
          </Col>
          <Col span={7}>
            <TimeStyled />
          </Col>
        </Row>
      </Header>
      <ContentStyled>
        <Row gutter={[16]}>
          <Col span={14}>
            <h2>
              Room 101{' '}
              <DisplayStatus type={connectionStatus}>
                {`(${connectionStatus})`}
              </DisplayStatus>
            </h2>
          </Col>
          <Col span={10}>
            <Status type={fp.pipe(fp.last, fp.get('Result'))(prediction)} />
          </Col>
        </Row>
        <Row gutter={[16]} style={{ flexGrow: '1' }}>
          <Col span={14}>
            <Mapping type={fp.pipe(fp.last, fp.get('Result'))(prediction)} />
          </Col>
          <Col span={10}>
            <Activity data={prediction} />
          </Col>
        </Row>
      </ContentStyled>
    </LayoutStyled>
  )
}

export default Screen
