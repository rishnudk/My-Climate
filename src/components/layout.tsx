import type {PropsWithChildren} from 'react'
import Header from './Header'

const Layout = ({children} : PropsWithChildren) => {
  return (
    <div className='bg=gradient-to- br from-baground to-muted'>
      <Header/>
      <main className='min-h-screen container mx-auto px-4 py-8'>
      {children}

      </main>
      <footer className='border-t backdrop-blur py-12 supports-[backdrop-filter]:bg-background/60'>
        <div className='container max-auto px-4 text-center
        text-gray-400'>
          <p>Made by Dk</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout;