import { Radio } from '@material-tailwind/react'
import React from 'react'

const Radioz = (props) => {
  const { ...prop } = props
  
  return (
    <Radio color="cyan" {...prop} />
  )
}

export default Radioz