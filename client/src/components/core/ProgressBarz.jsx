import { Progress } from '@material-tailwind/react'
import React from 'react'

const ProgressBarz = (props) => {
  const { value = 50, color = "cyan", size = "sm", ...prop } = props
  return (
    <Progress value={value} color={color} size={size} {...prop} />
  )
}

export default ProgressBarz