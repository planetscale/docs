import Header from '../components/Header'
import Navigation from '../components/Navigation'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen mx-auto">
      <Header />
      <main className="flex flex-col flex-1 w-full px-3 py-4 md:py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col h-full md:flex-row">
          <div className="hidden md:block flex-shrink-0 w-full md:w-1/3 md:pr-4 lg:pr-8 xl:pr-12">
            <Navigation />
          </div>
          <div className="flex-1 relative min-w-0">{children}</div>
        </div>
      </main>
    </div>
  )
}
