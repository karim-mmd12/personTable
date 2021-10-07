import React, { FunctionComponent, MouseEventHandler } from 'react'

interface ActiveProps {
  isActive: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}

const Active: FunctionComponent<ActiveProps> = (props) => {
  let classes = 'btn btn-sm '
  const { isActive } = props
  classes += isActive ? 'btn-success' : 'btn-danger'
  return (
    <button className={classes} onClick={props.onClick}>
      {isActive ? 'Active' : 'Pending'}
    </button>
  )
}
export default Active
