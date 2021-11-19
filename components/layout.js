import Header from '../components/Header'
import Navigation from '../components/Navigation'

export default function Layout({ children }) {
  return (
    <div className='h-full'>
      <div className='flex flex-col mx-auto bg-primary text-primary'>
        <Header />
        <main className='flex flex-col flex-1 w-full px-3 py-4 mx-auto bg-primary md:py-8 max-w-7xl sm:px-6 lg:px-8'>
          <div className='flex flex-col h-full md:flex-row'>
            <div className='flex-shrink-0 hidden w-full md:block md:w-1/3 md:pr-4 lg:pr-8 xl:pr-12'>
              <Navigation />
            </div>
            <div className='relative flex-1 min-w-0'>{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}
