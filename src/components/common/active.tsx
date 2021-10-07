import React, { Component, MouseEventHandler } from 'react'

interface ActiveProps {
  isActive: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}
interface ActiveState {}
class Active extends Component<ActiveProps, ActiveState> {
  render() {
    let classes = 'btn btn-sm '
    const { isActive } = this.props
    classes += isActive ? 'btn-success' : 'btn-danger'
    return (
      <button className={classes} onClick={this.props.onClick}>
        {isActive ? 'Active' : 'Pending'}
      </button>
    )
  }
}

export default Active
