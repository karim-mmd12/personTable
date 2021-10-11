import React from 'react'
import { Person } from '../../interfaces/Person'
import Active from './active'

interface TableBodyProps {
  sortedPersons: Person[]
  onActiveHandler: Function
}
const TableBody = (props: TableBodyProps) => {
  const { onActiveHandler, sortedPersons } = props
  return (
    <tbody>
      {sortedPersons.map((person) => (
        <tr key={person.id}>
          <td>{person.name}</td>
          <td>{person.gender}</td>
          <td>{person.company}</td>
          <td>
            <Active
              isActive={person.isActive}
              onClick={() => onActiveHandler(person)}
            />
          </td>
        </tr>
      ))}
    </tbody>
  )
}

export default TableBody
