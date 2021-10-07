import React, { Component } from 'react'
import { Person } from '../interfaces/Person'
import { getPersons } from '../services/fakePersonsService'
import Active from './common/active'
import _ from 'lodash'

class Persons extends Component {
  state: {
    persons: Person[]
    sortBy: { path: string; order: 'asc' | 'desc' }
  } = {
    persons: [],
    sortBy: { path: 'name', order: 'asc' },
  }
  componentDidMount = () => {
    this.setState({ persons: getPersons() })
  }
  handleClick = (person: Person) => {
    const persons = [...this.state.persons]
    const index = persons.indexOf(person)
    persons[index] = { ...persons[index] }
    persons[index].isActive = !persons[index].isActive
    this.setState({ persons })
  }
  handleSortClick(path: string): void {
    const sortBy = { ...this.state.sortBy }
    if (sortBy.path === path)
      sortBy.order = sortBy.order === 'asc' ? 'desc' : 'asc'
    else {
      sortBy.path = path
      sortBy.order = 'asc'
    }
    this.setState({ sortBy })
  }
  render() {
    const { persons, sortBy } = this.state
    const { length: count } = persons
    const sortedPersons = _.orderBy(persons, [sortBy.path], [sortBy.order])
    if (count === 0) return <p>There are no persons</p>
    return (
      <table className='table table-striped'>
        <thead>
          <tr>
            <th onClick={() => this.handleSortClick('name')}>
              Name<i className='fa fa-sort' aria-hidden='true'></i>
            </th>
            <th onClick={() => this.handleSortClick('gender')}>
              Gender<i className='fa fa-sort' aria-hidden='true'></i>
            </th>
            <th onClick={() => this.handleSortClick('company')}>
              Company<i className='fa fa-sort' aria-hidden='true'></i>
            </th>
            <th onClick={() => this.handleSortClick('isActive')}>
              Status<i className='fa fa-sort' aria-hidden='true'></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedPersons.map((person) => (
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
