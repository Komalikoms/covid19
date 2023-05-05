import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="header-container">
    <div>
      <Link to="/" className="link-item">
        <h1 className="header-heading">
          COVID19
          <span className="india-text">INDIA</span>
        </h1>
      </Link>
    </div>

    <ul className="nav-menu">
      <Link to="/" className="link-item">
        <button type="button" className="nav-item">
          Home
        </button>
      </Link>
      <Link to="/about" className="link-item">
        <button type="button" className="nav-item">
          About
        </button>
      </Link>
    </ul>
  </nav>
)

export default Header
