import {FaTwitter} from 'react-icons/fa'
import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <h1 className="header-heading">
        COVID19
        <span className="india-text">INDIA</span>
      </h1>
      <p className="footer-para">
        we stand with everyone fighting on the front lines
      </p>
      <div className="react-icons">
        <VscGithubAlt className="footer-icon" />
        <FiInstagram className="footer-icon" />
        <FaTwitter className="footer-icon" />
      </div>
    </div>
  )
}
