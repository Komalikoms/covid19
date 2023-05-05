import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dnv6kesmt/image/upload/v1636521130/mini-project/notfound_wxbwda.png"
      alt="not-found-pic"
      className="not-found-pic"
    />
    <h1 className="not-found-heading">PAGE NOT FOUND</h1>
    <p className="not-found-para">
      we are sorry, the page you requested could not be found.Please go back to
      the home page
    </p>
    <Link to="/">
      <button type="button" className="not-found-button">
        Home
      </button>
    </Link>
  </div>
)
export default NotFound
