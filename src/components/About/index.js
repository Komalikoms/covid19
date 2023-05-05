import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Faq from '../Faq'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
}

class About extends Component {
  state = {faqList: [], apiStatus: apiStatusConstants.inProgress}

  componentDidMount() {
    this.getAboutDetails()
  }

  getAboutDetails = async () => {
    const response = await fetch('https://apis.ccbp.in/covid19-faqs')
    const data = await response.json()
    console.log(data)

    this.setState({faqList: data.faq, apiStatus: apiStatusConstants.success})
  }

  renderAboutView = () => {
    const {faqList} = this.state

    return (
      <div>
        <h1 className="about-heading">About</h1>
        <p className="last-update-label">Last update on may 3rd 2023.</p>
        <p className="vacccine-para">
          COVID-19 vaccines be ready for distribution
        </p>
        <ul className="faqlist-order" testid="faqsUnorderedList">
          {faqList.map(eachFaq => (
            <Faq key={eachFaq.qno} faqDetails={eachFaq} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="covid-loader-container" testid="aboutRouteLoader">
      <Loader type="Oval" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderCovidAboutData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAboutView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="about-container">
        <Header />
        <div className="content-container">
          {this.renderCovidAboutData()}
          <Footer />
        </div>
      </div>
    )
  }
}
export default About
