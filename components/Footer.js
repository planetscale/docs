import React from 'react'

export default function Footer() {
  return (
    <div className='mt-4 flex items-center flex-wrap gap-2 justify-between'>
      <nav>
        <ul className='flex gap-x-1.5'>
          <li>
            <a className='text-secondary hover:text-blue' href='/legal/privacy'>
              Privacy
            </a>
          </li>
          <li>
            <a className='text-secondary hover:text-blue' href='/legal/siteterms'>
              Terms
            </a>
          </li>
          <li>
            <a className='text-secondary hover:text-blue' href='https://support.planetscale.com?utm_content=docsfooter'>
              Support
            </a>
          </li>
          <li>
            <a className='text-secondary hover:text-blue' href='/contact?utm_content=docsfooter'>
              Contact
            </a>
          </li>
        </ul>
      </nav>
      <span className='text-secondary'>&copy; 2022 PlanetScale Inc.</span>
    </div>
  )
}
