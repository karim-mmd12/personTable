import React, { Component, Fragment } from 'react'
import { Person } from '../interfaces/Person'
import { getPersons } from '../services/fakePersonsService'
import _ from 'lodash'
import SearchInput from './common/searchInput'
import { TableHeader } from './common/tableHeader'
import TableBody from './common/tableBody'

class Persons extends Component<
  {},
  {
    persons: Person[]
    sortBy: { path: string; order: 'asc' | 'desc' }
    searchQuery: string
  }
> {
  handleSearchThrottled: _.DebouncedFunc<(query: string) => void>
  constructor(props: any) {
    super(props)
    this.state = {
      persons: [],
      sortBy: { path: 'name', order: 'asc' },
      searchQuery: '',
    }
    this.handleSearchThrottled = _.throttle(this.handleSearch, 300)
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
  handleSearch = (query: string) => {
    this.setState({ searchQuery: query })
  }
  render() {
    const { persons, sortBy, searchQuery } = this.state
    const { length: count } = persons
    const tHeaders = [
      { path: 'name', headerTitle: 'Name' },
      { path: 'gender', headerTitle: 'Gender' },
      { path: 'company', headerTitle: 'Company' },
      { path: 'isActive', headerTitle: 'Status' },
    ]
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
        <SearchInput
          value={searchQuery}
          onChange={this.handleSearchThrottled}
        />
        <table className='table table-striped'>
          <TableHeader onSort={this.handleSortClick} columns={tHeaders} />
          <TableBody
            sortedPersons={sortedPersons}
            onActiveHandler={this.handleClick}
          />
        </table>
      </Fragment>
    )
  }
}

export default Persons
