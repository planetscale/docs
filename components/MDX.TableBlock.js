import React from 'react'
import { styled } from '../stitches.config'

const TableContainer = styled('div', {
  overflowX: 'auto',
})

const Table = styled('table', {
  border: '1px solid $borderPrimary',
  borderRadius: '6px',
  marginTop: '2em',
  width: '100%',
  fontSize: '14px',
  borderSpacing: '0',

  '& th': {
    textAlign: 'left',
    padding: '1em',
    color: '$textSecondary',
    borderBottom: '2px solid $borderPrimary',
  },

  '& tbody > tr': {
    '&:hover': {
      backgroundColor: '$bgSecondary',
    },
  },

  '& td': {
    verticalAlign: 'top',
    padding: '1em',
    borderBottom: '1px solid $borderPrimary',
  },

  '& tr:last-child td': {
    borderBottom: 'unset',
  },
})

export default function TableBlock(props) {
  const { children } = props

  return (
    <TableContainer>
      <Table>{children}</Table>
    </TableContainer>
  )
}
