import React from 'react'

import QuickStartCard from './QuickStartCard'

function QuickStartsGrid() {
  return (
    <div className='grid grid-cols-1 gap-3 lg:grid-cols-4'>
      <QuickStartCard href='/tutorials/connect-django-app' title='Django' imgPath='/docs/img/logos/django.png' />
      <QuickStartCard href='/tutorials/connect-go-app' title='Go' imgPath='/docs/img/logos/go.png' />
      <QuickStartCard href='/tutorials/connect-nodejs-app' title='Node.js' imgPath='/docs/img/logos/node.png' />
      <QuickStartCard href='/tutorials/connect-nextjs-app' title='Next.js' imgPath='/docs/img/logos/next.png' />
      <QuickStartCard href='/tutorials/connect-laravel-app' title='Laravel' imgPath='/docs/img/logos/laravel.png' />
      <QuickStartCard href='/tutorials/connect-symfony-app' title='Symfony' imgPath='/docs/img/logos/symfony.png' />
      <QuickStartCard href='/tutorials/connect-php-app' title='PHP' imgPath='/docs/img/logos/php.png' />
      <QuickStartCard href='/tutorials/connect-rails-app' title='Rails' imgPath='/docs/img/logos/rails.png' />
    </div>
  )
}

export default QuickStartsGrid
