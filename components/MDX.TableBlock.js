import React from 'react'
import { styled } from '../stitches.config'

const TableContainer = styled('div', {
  overflowX: 'auto',
})

const Table = styled('table', {
  border: '1px solid var(--border-primary)',
  borderRadius: '6px',
  marginTop: '2em',
  width: '100%',
  fontSize: '14px',
  color: 'var(--foreground2)',
  borderSpacing: '0',

  '& th': {
    textAlign: 'left',
    padding: '1em',
    color: 'var(--text-secondary)',
    borderBottom: '2px solid var(--border-primary)',
  },

  '& td': {
    padding: '1em',
    borderBottom: '1px solid var(--border-primary)',
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
