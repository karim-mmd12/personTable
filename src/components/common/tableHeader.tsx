import React from 'react'

interface TableHeaderProps {
  onSort: Function
  columns: { path: string; headerTitle: any }[]
}
export const TableHeader = (props: TableHeaderProps) => {
  const { onSort, columns } = props
  return (
    <thead>
      <tr className='clickable'>
        {columns.map((theader) => (
          <th key={theader.path} onClick={() => onSort(theader.path)}>
            {theader.headerTitle}
            <i className='fa fa-sort' aria-hidden='true'></i>
          </th>
        ))}
      </tr>
    </thead>
  )
}
