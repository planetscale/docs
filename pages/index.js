import { TitleAndMetaTags } from '../components/TitleAndMetaTags'
import Layout from '../components/layout'
import Footer from '../components/Footer'
import Link from 'next/link'
import ButtonLink from '../components/ButtonLink'
import Icon from '../components/Icon'
import SVG from 'react-inlinesvg'

export default function Overview() {
  return (
    <Layout>
      <TitleAndMetaTags title='Overview' pathname='overview' />

      <h1 className='text-3xl font-semibold'>PlanetScale documentation</h1>
      <p className='mb-4 text-lg text-secondary'>
        Learn how to use PlanetScale, the serverless database, to power your application.
      </p>

      <div className='p-3 mb-3 border border-purple-100 rounded md:rounded-lg md:mb-4 bg-purple-50 dark:bg-purple-900 dark:border-purple-800'>
        <div className='mb-2' style={{ aspectRatio: '720 / 139' }}>
          <SVG src='/img/internals/flow-diagram.svg' width='720' height={'auto'} className='max-w-full' />
        </div>

        <h2 className='mb-1 text-xl font-semibold'>The PlanetScale workflow</h2>
        <p className='mb-2'>
          Treat your databases as code. Use the PlanetScale developer workflows for data branching, non-blocking schema
          changes and more.
        </p>
        <p>
          <ButtonLink href='/concepts/planetscale-workflow' variant='secondary'>
            Learn more
          </ButtonLink>
        </p>
      </div>

      <div className='grid grid-cols-1 gap-3 mb-4 lg:grid-cols-2'>
        <Link href='/concepts/branching'>
          <a className='h-full p-3 border rounded hover:bg-secondary'>
            <Icon name='branch' size='large' className='mb-2 text-blue' />
            <h3 className='text-lg font-semibold text-primary mb-sm'>Branching your database</h3>
            <p className='text-secondary'>Use live database branches for staging and production environments.</p>
          </a>
        </Link>
        <Link href='/concepts/connection-strings'>
          <a className='h-full p-3 border rounded hover:bg-secondary'>
            <Icon name='code' size='large' className='mb-2 text-blue' />
            <h3 className='text-lg font-semibold text-primary mb-sm'>Connection strings</h3>
            <p className='text-secondary'>PlanetScale provides secure connection strings for your database branches.</p>
          </a>
        </Link>
        <Link href='/concepts/nonblocking-schema-changes'>
          <a className='h-full p-3 border rounded hover:bg-secondary'>
            <Icon name='schema-change' size='large' className='mb-2 text-blue' />
            <h3 className='text-lg font-semibold text-primary mb-sm'>Non-blocking schema changes</h3>
            <p className='text-secondary'>Deploy schema changes without downtime or locking.</p>
          </a>
        </Link>
        <Link href='/reference/planetscale-cli'>
          <a className='h-full p-3 border rounded hover:bg-secondary'>
            <Icon name='terminal' size='large' className='mb-2 text-blue' />
            <h3 className='text-lg font-semibold text-primary mb-sm'>PlanetScale CLI</h3>
            <p className='text-secondary'>
              Create branches, open deploy requests, and deploy schema changes from your terminal.
            </p>
          </a>
        </Link>
      </div>

      <h2 className='mb-1 text-xl font-semibold'>Tutorials</h2>

      <div className='grid grid-cols-1 gap-3 lg:grid-cols-3'>
        <Link href='/tutorials/connect-rails-app'>
          <a className='flex flex-col items-center h-full p-3 text-center border rounded hover:bg-secondary'>
            <SVG src='/img/internals/ruby-logo.svg' height={32} width='auto' className='mb-2' />
            <h3 className='text-lg font-semibold text-primary mb-sm'>Ruby on Rails</h3>
            <p className='text-secondary'>Learn how to connect your Rails app to a PlanetScale database.</p>
          </a>
        </Link>
        <Link href='/tutorials/deploy-to-vercel'>
          <a className='flex flex-col items-center h-full p-3 text-center border rounded hover:bg-secondary'>
            <SVG
              src='/img/internals/vercel-logo.svg'
              height={32}
              width='auto'
              className='mb-2 text-black dark:text-white'
            />
            <h3 className='text-lg font-semibold text-primary mb-sm'>Vercel</h3>
            <p className='text-secondary'>Deploy a Next.js app with a PlanetScale database to Vercel.</p>
          </a>
        </Link>
        <Link href='/tutorials/automatic-prisma-migrations'>
          <a className='flex flex-col items-center h-full p-3 text-center border rounded hover:bg-secondary'>
            <SVG
              src='/img/internals/prisma-logo.svg'
              height={32}
              width='auto'
              className='mb-2 text-[#163C53] dark:text-white'
            />
            <h3 className='text-lg font-semibold text-primary mb-sm'>Prisma</h3>
            <p className='text-secondary'>Learn how to use PlanetScale's automatic migrations with Prisma.</p>
          </a>
        </Link>
      </div>
      <Footer />
    </Layout>
  )
}

function Category({ categoryID, categoryName, description, pages }) {
  return (
    <Link href={`${categoryID}/${pages[0]['route']}`} passHref>
      <a>
        <h1>{categoryName}</h1>
        <p>{description}</p>
      </a>
    </Link>
  )
}
