import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between px-4">
        <Link to="/">
          <img 
            src="/logo.png"
            alt="Climate Logo"
            className="w-16 h-16 object-contain"
          />
        </Link>

        <div>
          {/* {search} */}
          {/* {theme toggle} */}
        </div>
      </div>
    </header>
  )
}

export default Header
