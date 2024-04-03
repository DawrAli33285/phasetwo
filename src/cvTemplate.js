import React from 'react'
import CateBanner from './components/cateBanner'
import ViewCv from './components/viewCv'


const CvTemplate = () => {
  return (
    <div>
      <CateBanner pageName="Your Cv"/>
      <ViewCv/>
    </div>
  )
}

export default CvTemplate