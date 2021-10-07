import React, { Component } from 'react'
import { Person } from '../interfaces/Person'
import { getPersons } from '../services/fakePersonsService'
import Active from './common/active'

class Persons extends Component {
  state = { persons: getPersons() }
  handleClick = (person: Person) => {
    const persons = [...this.state.persons]
    const index = persons.indexOf(person)
    persons[index] = { ...persons[index] }
    persons[index].isActive = !persons[index].isActive
    this.setState({ persons })
  }
  render() {
    const { length: count } = this.state.persons
    if (count === 0) return <p>There are no persons</p>
    return (
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Company</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {this.state.persons.map((person) => (
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.gender}</td>
              <td>{person.company}</td>
              <td>
                <Active
                  isActive={person.isActive}
                  onClick={() => this.handleClick(person)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default Persons
