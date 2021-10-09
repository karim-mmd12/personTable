import React, { Component, Fragment } from 'react'
import { Person } from '../interfaces/Person'
import { getPersons } from '../services/fakePersonsService'
import Active from './common/active'
import _ from 'lodash'
import SearchInput from './common/searchInput'

class Persons extends Component {
  state: {
    persons: Person[]
    sortBy: { path: string; order: 'asc' | 'desc' }
    searchQuery: string
  } = {
    persons: [],
    sortBy: { path: 'name', order: 'asc' },
    searchQuery: '',
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
  handleSortClick = (path: string) => {
    const sortBy = { ...this.state.sortBy }
    if (sortBy.path === path)
      sortBy.order = sortBy.order === 'asc' ? 'desc' : 'asc'
    else {
      sortBy.path = path
      sortBy.order = 'asc'
    }
    this.setState({ sortBy })
  }
  timer = setTimeout(() => {}, 1)
  handleSearch = (query: string) => {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.setState({ searchQuery: query })
    }, 300)
  }
  render() {
    const { persons, sortBy, searchQuery } = this.state
    const { length: count } = persons
    let filteredPersons = persons
    if (searchQuery) {
      filteredPersons = persons.filter((p) =>
        p.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
    }
    const sortedPersons = _.orderBy(
      filteredPersons,
      [sortBy.path],
      [sortBy.order]
    )
    if (count === 0) return <p>There are no persons</p>
    return (
      <Fragment>
        <SearchInput value={searchQuery} onChange={this.handleSearch} />
        <table className='table table-striped'>
          <thead>
            <tr className='clickable'>
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
      </Fragment>
    )
  }
}

export default Persons
