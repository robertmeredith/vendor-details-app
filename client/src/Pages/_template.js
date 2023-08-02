import React from 'react'
import SectionHeading from '../components/SectionHeading'

const text='TEXT GOES HERE'

const _template = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div className="mx-auto max-w-6xl">
        <SectionHeading text={text} section="Vendors" />
      </div>

      
    </div>
  )
}

export default _template
