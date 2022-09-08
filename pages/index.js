import Link from 'next/link'
import SVG from 'react-inlinesvg'

import ButtonLink from '../components/ButtonLink'
import Footer from '../components/Footer'
import Icon from '../components/Icon'
import Layout from '../components/layout'
import { TitleAndMetaTags } from '../components/TitleAndMetaTags'

export default function Overview() {
  return (
    <Layout>
      <TitleAndMetaTags
        title='Overview'
        banner='https://og-image.planetscale.com/Documentation%20Overview.png?theme=dark&direction=row&md=1&fontSize=100px&images=https%3A%2F%2Fog-image.planetscale.com%2Fimages%2Fps-logo-white-v2.svg'
      />

      <h1 className='text-3xl font-semibold'>PlanetScale documentation</h1>
      <p className='mb-4 text-lg text-secondary'>
        Learn how to use PlanetScale, the serverless database, to power your application.
      </p>

      <div className='p-3 mb-3 border border-purple-100 rounded md:rounded-lg md:mb-4 bg-purple-50 dark:bg-purple-900 dark:border-purple-800'>
        <div className='mb-4' style={{ aspectRatio: '720 / 84' }}>
          <svg
            width='720'
            height='84'
            viewBox='0 0 720 84'
            fill='none'
            className='max-w-fit'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M89.8037 42.2469H207.478'
              stroke='var(--text-purple)'
              opacity='0.5'
              strokeWidth='1.4'
              strokeDasharray='4.79 4.79'
            />
            <path
              d='M301.41 42.2469H419.084'
              stroke='var(--text-purple)'
              opacity='0.5'
              strokeWidth='1.4'
              strokeDasharray='4.79 4.79'
            />
            <circle
              cx='466.469'
              cy='42'
              r='41.3'
              fill='var(--bg-primary)'
              stroke='var(--text-purple)'
              opacity='0.8'
              strokeWidth='1.4'
            />
            <circle
              cx='678'
              cy='42'
              r='41.3'
              fill='var(--bg-primary)'
              stroke='var(--text-purple)'
              opacity='0.8'
              strokeWidth='1.4'
            />
            <path
              className='icon-color-secondary'
              fill='currentColor'
              fillRule='evenodd'
              clipRule='evenodd'
              d='M683.917 28.028C677.298 28.028 671.806 32.9206 670.78 39.3281C670.732 39.6288 670.553 39.8917 670.292 40.044C670.032 40.1964 669.717 40.2221 669.436 40.1139C668.601 39.793 667.694 39.6168 666.744 39.6168C662.555 39.6168 659.16 43.0542 659.16 47.2944C659.16 51.5346 662.555 54.9719 666.744 54.9719C667.298 54.9719 667.746 55.4259 667.746 55.986C667.746 56.546 667.298 57 666.744 57C661.449 57 657.156 52.6546 657.156 47.2944C657.156 41.9341 661.449 37.5888 666.744 37.5888C667.53 37.5888 668.295 37.6848 669.028 37.866C670.644 31.0586 676.696 26 683.917 26C692.374 26 699.23 32.9396 699.23 41.5C699.23 49.5379 693.186 56.1457 685.447 56.9235C684.897 56.9788 684.406 56.5719 684.352 56.0146C684.297 55.4573 684.699 54.9607 685.249 54.9054C691.974 54.2296 697.226 48.4851 697.226 41.5C697.226 34.0596 691.268 28.028 683.917 28.028Z'
            />
            <path
              className='icon-color-tertiary'
              fill='currentColor'
              fillRule='evenodd'
              clipRule='evenodd'
              d='M682.916 32.8083C682.916 32.2483 683.364 31.7943 683.918 31.7943C688.67 31.7943 692.612 35.2925 693.373 39.8835C693.465 40.4358 693.097 40.9587 692.551 41.0514C692.005 41.144 691.489 40.7714 691.397 40.2191C690.796 36.5887 687.675 33.8223 683.918 33.8223C683.364 33.8223 682.916 33.3684 682.916 32.8083Z'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M686.772 44.4045C687.163 44.8005 687.163 45.4425 686.772 45.8385L676.039 56.703C675.851 56.8932 675.596 57 675.33 57C675.065 57 674.81 56.8932 674.622 56.703L669.743 51.7646C669.352 51.3686 669.352 50.7266 669.743 50.3306C670.135 49.9346 670.769 49.9346 671.16 50.3306L675.33 54.5519L685.355 44.4045C685.746 44.0085 686.381 44.0085 686.772 44.4045Z'
              className='icon-color-primary'
              fill='currentColor'
            />
            <path
              d='M514.049 42.2469H631.723'
              stroke='var(--text-purple)'
              opacity='0.5'
              strokeWidth='1.4'
              strokeDasharray='4.79 4.79'
            />
            <path
              className='icon-color-tertiary'
              fill='currentColor'
              fillRule='evenodd'
              clipRule='evenodd'
              d='M471.812 41.2C472.372 41.2 472.826 40.7483 472.826 40.1913V31.8087C472.826 30.1374 471.465 28.7826 469.786 28.7826H469.088C468.528 28.7826 468.074 29.2342 468.074 29.7913C468.074 30.3484 468.528 30.8 469.088 30.8H469.786C470.346 30.8 470.799 31.2516 470.799 31.8087V40.1913C470.799 40.7483 471.253 41.2 471.812 41.2Z'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M465.664 22C463.985 22 462.625 23.3548 462.625 25.0261V37.2696C462.625 38.9408 463.985 40.2956 465.664 40.2956H470.799V48.1218C470.799 48.6788 470.346 49.1305 469.786 49.1305H466.363C465.803 49.1305 465.35 49.5821 465.35 50.1391C465.35 50.6962 465.803 51.1478 466.363 51.1478H469.786C471.465 51.1478 472.826 49.793 472.826 48.1218V40.2956H477.961C479.64 40.2956 481 38.9408 481 37.2696V25.0261C481 23.3548 479.64 22 477.961 22H465.664ZM464.651 25.0261C464.651 24.469 465.105 24.0174 465.664 24.0174H477.961C478.521 24.0174 478.974 24.469 478.974 25.0261V37.2696C478.974 37.8266 478.521 38.2783 477.961 38.2783H465.664C465.105 38.2783 464.651 37.8266 464.651 37.2696V25.0261Z'
              className='icon-color-primary'
              fill='currentColor'
            />
            <path
              className='icon-color-secondary'
              fill='currentColor'
              fillRule='evenodd'
              clipRule='evenodd'
              d='M455.463 34.2087C456.022 34.2087 456.476 34.6603 456.476 35.2174V43.7043H458.886C460.565 43.7043 461.926 45.0592 461.926 46.7304V53.5478C461.926 55.2191 460.565 56.5739 458.886 56.5739H456.476V60.9913C456.476 61.5484 456.022 62 455.463 62C454.903 62 454.45 61.5484 454.45 60.9913V56.5739H452.039C450.361 56.5739 449 55.2191 449 53.5478V46.7304C449 45.0592 450.361 43.7043 452.039 43.7043H454.45V35.2174C454.45 34.6603 454.903 34.2087 455.463 34.2087ZM455.463 54.5565H458.886C459.446 54.5565 459.9 54.1049 459.9 53.5478V46.7304C459.9 46.1733 459.446 45.7217 458.886 45.7217H452.039C451.48 45.7217 451.026 46.1733 451.026 46.7304V53.5478C451.026 54.1049 451.48 54.5565 452.039 54.5565H455.463Z'
            />
            <ellipse
              cx='455.463'
              cy='29.7913'
              rx='1.36245'
              ry='1.35652'
              className='icon-color-primary'
              fill='currentColor'
            />
            <circle
              cx='42'
              cy='42'
              r='41.3'
              fill='var(--bg-primary)'
              stroke='var(--text-purple)'
              opacity='0.8'
              strokeWidth='1.4'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M33.4729 32.6122C33.4729 27.8703 37.3238 24.0263 42.074 24.0263C46.8243 24.0263 50.6751 27.8703 50.6751 32.6122C50.6751 37.1506 47.1477 40.8666 42.6804 41.1772C42.4793 41.1701 42.2771 41.1665 42.0741 41.1665C41.871 41.1665 41.6688 41.1701 41.4676 41.1772C37.0003 40.8666 33.4729 37.1506 33.4729 32.6122ZM37.0063 41.9434C33.6926 40.1463 31.4431 36.6415 31.4431 32.6122C31.4431 26.7513 36.2027 22 42.074 22C47.9453 22 52.7049 26.7513 52.7049 32.6122C52.7049 36.6415 50.4554 40.1463 47.1417 41.9434C52.6992 43.706 56.9166 48.3108 58.0504 54.134C58.2469 55.143 57.8789 56.1839 57.0581 56.8342C55.1263 58.3648 49.9458 61.7687 42.0741 61.7687C34.2024 61.7687 29.0219 58.3648 27.09 56.8342C26.2693 56.1839 25.9013 55.143 26.0978 54.134C27.2316 48.3108 31.4489 43.7061 37.0063 41.9434ZM28.1526 54.5326C29.4183 48.0322 35.112 43.2561 42.0741 43.2561C49.0362 43.2561 54.7299 48.0322 55.9956 54.5326C56.0464 54.7939 55.9514 55.0433 55.7568 55.1974C54.0518 56.5483 49.3181 59.6791 42.0741 59.6791C34.8301 59.6791 30.0964 56.5483 28.3914 55.1974C28.1968 55.0433 28.1018 54.7939 28.1526 54.5326Z'
              className='icon-color-primary'
              fill='currentColor'
            />
            <circle
              cx='254.204'
              cy='42'
              r='41.3'
              fill='var(--bg-primary)'
              stroke='var(--text-purple)'
              opacity='0.8'
              strokeWidth='1.4'
            />
            <path
              className='icon-color-secondary'
              fill='currentColor'
              fillRule='evenodd'
              clipRule='evenodd'
              d='M236.176 42.6908C236.496 42.2021 237.144 42.0701 237.625 42.3959L250.682 51.2548C252.086 52.2073 253.914 52.2073 255.318 51.2548L263.057 46.0042C263.537 45.6785 264.186 45.8105 264.506 46.2991C264.826 46.7878 264.696 47.448 264.216 47.7737L256.477 53.0243C254.372 54.453 251.628 54.453 249.523 53.0243L236.465 44.1654C235.985 43.8396 235.856 43.1794 236.176 42.6908Z'
            />
            <path
              className='icon-color-tertiary'
              fill='currentColor'
              fillRule='evenodd'
              clipRule='evenodd'
              d='M236.176 50.8096C236.496 50.3209 237.144 50.1889 237.625 50.5146L250.102 58.9804C251.857 60.171 254.143 60.171 255.898 58.9804L268.375 50.5146C268.856 50.1889 269.504 50.3209 269.824 50.8096C270.144 51.2982 270.015 51.9584 269.535 52.2841L257.057 60.7499C254.6 62.4167 251.4 62.4167 248.943 60.7499L236.465 52.2841C235.985 51.9584 235.856 51.2982 236.176 50.8096Z'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M237.459 36.2402C235.535 34.9676 235.563 32.0915 237.511 30.8583L250.241 22.8017C251.93 21.7328 254.069 21.7328 255.758 22.8017L258.205 24.35C258.694 24.6599 258.844 25.3149 258.54 25.8132C258.235 26.3114 257.592 26.4641 257.102 26.1543L254.656 24.606C253.642 23.9643 252.358 23.9643 251.344 24.606L238.614 32.6626C237.964 33.0742 237.954 34.0341 238.596 34.4588L251.291 42.8565C252.33 43.5438 253.669 43.5438 254.709 42.8565L259.079 39.9655C259.562 39.6457 260.209 39.7853 260.523 40.2773C260.837 40.7692 260.7 41.4272 260.217 41.747L255.846 44.6379C254.115 45.783 251.884 45.783 250.153 44.6379L237.459 36.2402Z'
              className='icon-color-primary'
              fill='currentColor'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M264.681 25.6899C264.681 25.1026 264.213 24.6266 263.636 24.6266C263.059 24.6266 262.591 25.1026 262.591 25.6899V30.0391H258.318C257.741 30.0391 257.273 30.5152 257.273 31.1025C257.273 31.6897 257.741 32.1658 258.318 32.1658H262.591V36.515C262.591 37.1022 263.059 37.5783 263.636 37.5783C264.213 37.5783 264.681 37.1022 264.681 36.515V32.1658H268.954C269.532 32.1658 269.999 31.6897 269.999 31.1025C269.999 30.5152 269.532 30.0391 268.954 30.0391H264.681V25.6899Z'
              className='icon-color-primary'
              fill='currentColor'
            />
          </svg>
        </div>

        <h2 className='mb-1 text-xl font-semibold'>New to PlanetScale?</h2>
        <p className='mb-2'>
          Follow this step by step guide to quickly get up and running in PlanetScale. You’ll learn the following:
        </p>
        <ol className='grid grid-cols-2 mb-2 ml-2 list-decimal font-bold gap-1'>
          <li>Account setup</li>
          <li className='order-3'>Creating your first database.</li>
          <li className='order-2'>Branching and deployments.</li>
          <li className='order-last'>Connecting to your database.</li>
        </ol>
        <p>
          <ButtonLink href='/onboarding/create-an-account' variant='secondary'>
            Get started
          </ButtonLink>
        </p>
      </div>

      <div className='grid grid-cols-1 gap-3 mb-4 lg:grid-cols-2'>
        <Link href='/tutorials/planetscale-quick-start-guide'>
          <a className='h-full p-3 border rounded hover:bg-secondary'>
            <div className='inline-block w-[24px] h-[24px]'>
              <Icon name='rocket' size='large' className='mb-2 text-blue' />
            </div>
            <h3 className='text-lg font-semibold text-primary mb-sm'>PlanetScale quickstart guide</h3>
            <p className='text-secondary'>
              Deploy a database and learn the basics of using PlanetScale with an example.{' '}
            </p>
          </a>
        </Link>
        <Link href='/concepts/branching'>
          <a className='h-full p-3 border rounded hover:bg-secondary'>
            <div className='inline-block w-[24px] h-[24px]'>
              <Icon name='branch' size='large' className='mb-2 text-blue' />
            </div>
            <h3 className='text-lg font-semibold text-primary mb-sm'>Branching your database</h3>
            <p className='text-secondary'>Use live database branches for staging and production environments.</p>
          </a>
        </Link>
        <Link href='/concepts/connection-strings'>
          <a className='h-full p-3 border rounded hover:bg-secondary'>
            <div className='inline-block w-[24px] h-[24px]'>
              <Icon name='code' size='large' className='mb-2 text-blue' />
            </div>
            <h3 className='text-lg font-semibold text-primary mb-sm'>Connection strings</h3>
            <p className='text-secondary'>PlanetScale provides secure connection strings for your database branches.</p>
          </a>
        </Link>
        <Link href='/concepts/nonblocking-schema-changes'>
          <a className='h-full p-3 border rounded hover:bg-secondary'>
            <div className='inline-block w-[24px] h-[24px]'>
              <Icon name='schema-change' size='large' className='mb-2 text-blue' />
            </div>
            <h3 className='text-lg font-semibold text-primary mb-sm'>Non-blocking schema changes</h3>
            <p className='text-secondary'>Deploy and revert schema changes without downtime or locking.</p>
          </a>
        </Link>
      </div>

      <h2 className='mb-1 text-xl font-semibold'>Tutorials</h2>

      <div className='grid grid-cols-1 gap-3 lg:grid-cols-3'>
        <Link href='/tutorials/connect-rails-app'>
          <a className='flex flex-col items-center h-full p-3 text-center border rounded hover:bg-secondary'>
            <div className='inline-block h-[32px]'>
              <SVG src='/docs/img/internals/ruby-logo.svg' height={32} width={32} className='mb-2' />
            </div>
            <h3 className='text-lg font-semibold text-primary mb-sm'>Ruby on Rails</h3>
            <p className='text-secondary'>Learn how to connect your Rails app to a PlanetScale database.</p>
          </a>
        </Link>
        <Link href='/tutorials/deploy-to-vercel'>
          <a className='flex flex-col items-center h-full p-3 text-center border rounded hover:bg-secondary'>
            <div className='inline-block h-[32px]'>
              <SVG
                src='/docs/img/internals/vercel-logo.svg'
                height={32}
                width={37}
                className='mb-2 text-black dark:text-white'
              />
            </div>
            <h3 className='text-lg font-semibold text-primary mb-sm'>Vercel</h3>
            <p className='text-secondary'>Deploy a Next.js app with a PlanetScale database to Vercel.</p>
          </a>
        </Link>
        <Link href='/tutorials/automatic-prisma-migrations'>
          <a className='flex flex-col items-center h-full p-3 text-center border rounded hover:bg-secondary'>
            <div className='inline-block h-[32px]'>
              <SVG
                src='/docs/img/internals/prisma-logo.svg'
                height={32}
                className='mb-2 text-[#163C53] dark:text-white'
              />
            </div>
            <h3 className='text-lg font-semibold text-primary mb-sm'>Prisma</h3>
            <p className='text-secondary'>Learn how to use PlanetScale&apos;s automatic migrations with Prisma.</p>
          </a>
        </Link>
      </div>
      <Footer />
    </Layout>
  )
}
