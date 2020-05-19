import React from 'react'
import styled from 'styled-components'

import * as fp from 'lodash/fp'

import { IconTypes } from '../configs'

import { Table, Tag } from 'antd'

const Container = styled.div`
  display: flex;
  flex-flow: column;

  border: 1px solid;

  padding: 10px;
  border-radius: 10px;
  width: 100%;
  height: 100%;
`

const TableStyled = styled(Table)`
  &.ant-table-wrapper {
    overflow: hidden;
    border-radius: 5px;
    flex: 1;
  }

  .ant-spin-nested-loading,
  .ant-spin-container,
  .ant-table,
  .ant-table-container,
  .ant-table-content {
    height: 100%;
  }
  .ant-table-body {
    height: calc(100% - 55px);
  }
`

const Title = styled.h1`
  text-align: left;
  font-size: 20px;
`

const columns = [
  {
    title: 'Time',
    dataIndex: 'Time',
    key: 'Time',
    sorter: (a, b) => a.Time.localeCompare(b.Time),
    defaultSortOrder: 'descend',
  },
  {
    title: 'Result',
    dataIndex: 'Result',
    key: 'Result',
    render: (text) => {
      const { color } = fp.getOr(
        { color: '#797979' },
        fp.toLower(text)
      )(IconTypes)

      return <Tag color={color}>{text}</Tag>
    },
  },
]

const Activity = ({ data }) => {
  return (
    <Container>
      <Title>Patient’s activities</Title>
      <TableStyled
        tableLayout="auto"
        rowKey="Time"
        scroll={{ y: '45vh' }}
        pagination={false}
        sortDirections={['descend']}
        dataSource={data}
        columns={columns}
      />
    </Container>
  )
}

Activity.defaultProps = {
  data: [
    {
      Time: '1',
      Result: 'desk',
    },
    {
      Time: '2',
      Result: 'shower',
    },
    {
      Time: '3',
      Result: 'desk',
    },
    {
      Time: '4',
      Result: 'shower',
    },
    {
      Time: '5',
      Result: 'desk',
    },
    {
      Time: '6',
      Result: 'shower',
    },
    {
      Time: '7',
      Result: 'shower',
    },
    {
      Time: '8',
      Result: 'shower',
    },
  ],
}

export default Activity
