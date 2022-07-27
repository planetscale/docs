import React from 'react'

function GetHelp() {
  return (
    <>
      <a className='text-primary' href='#need-help'>
        <h1 className='font-semibold text-xl mb-2 mt-3' as='h2' id='need-help'>
          Need help?
        </h1>
      </a>
      <p>
        Get help from <a href='https://support.planetscale.com/'>the PlanetScale support team</a>, or join our 
        <a href='https://github.com/planetscale/discussion/discussions'>GitHub discussion board</a> to see how others
        are using PlanetScale.
      </p>
    </>
  )
}

export default GetHelp
