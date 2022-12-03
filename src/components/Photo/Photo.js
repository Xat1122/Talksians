import React from 'react'
import {PhotoContainer} from './Photo.style'
const Photo = ({Imgurl}) => {
  return (
    <PhotoContainer style={{background:`url(${Imgurl})`}}></PhotoContainer>
  )
}

export default Photo