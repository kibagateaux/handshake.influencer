import React from 'react'
import { Link } from 'gatsby'

export default (props) => {
  const { title } = props
  const [toggleNav, setToggleNav] = React.useState(false)
  const menuItems = [
    { to: '/products', label: 'Products', icon: ''},
    { to: '/news', label: 'News', icon: ''},
    { to: '/funds', label: 'Funds', icon: ''},
    // { to: '/search', label: 'search', icon: ''},
    // { to: '/resolvers', label: 'resolvers', icon: ''},
  ]

  const socialItems = [
    { to: 'http://twitter.com/kibagateaux', label: 'Twitter' }
  ]

  return (
    <header className={`site-head ${toggleNav ? 'site-head-open' : ''}`}>
      <div id="menu" className="site-head-container">
        <a
          className="nav-burger"
          href={`#menu`}
          onClick={() => setToggleNav(!toggleNav)}
        >
          <div
            className="hamburger hamburger--collapse"
            aria-label="Menu"
            role="button"
            aria-controls="navigation"
          >
            <div className="hamburger-box">
              <div className="hamburger-inner" />
            </div> <div className="hamburger-text-menu-text hidden">Menu</div>
          </div>
        </a>
        <div className="site-head-left social-links-container">
          <div className="social-links">
            {socialItems.map(item =>
              <SocialMenuLink key={item.label} {...item} />)}  
          </div>
        </div>
        <div className="site-head-center">
          <Link className="site-head-logo" to={`/`}>
            {title}
          </Link>
        </div>
        <nav id="nav-menu" className="site-head-right">
          <ul className="nav" role="menu">
            {menuItems.map(item =>
              <MenuLink key={item.label} {...item} />)}
          </ul>
        </nav>
      </div>
    </header>
  )
}

const MenuLink = ({ to, label }) => (
  <li
    key={label}
    className={`nav-${label}`}
    role="menuitem"
  >
    <Link to={to}>{label}</Link>
  </li>
)

const SocialMenuLink = ({ to, label }) => (
  <a
    key={label}
    title={label}
    href={to}
    target="_blank"
    rel="noopener noreferrer"
  >
    {label}
  </a>
)

