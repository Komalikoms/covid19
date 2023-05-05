import {Component} from 'react'
import Header from '../Header'
import Loading from '../Loading'
import DataCard from '../DataCard'
import DistrictsData from '../DistrictsData'
import TimeLine from '../TimeLine'

import './index.css'
import Footer from '../Footer'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const activeCaseConstants = {
  confirm: 'confirmed',
  active: 'active',
  deceased: 'deceased',
  recovered: 'recovered',
}

class StateSpecificRoute extends Component {
  state = {
    isLoading: true,
    covidData: {},
    activeCaseClass: activeCaseConstants.confirm,
    showConfirmedCases: true,
    showActiveCases: false,
    showDeceasedCases: false,
    showRecoveredCases: false,
  }

  componentDidMount() {
    this.getStateWiseData()
  }

  getStateWiseData = async () => {
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    this.setState({isLoading: false, covidData: data})
  }

  convertObjectsDataIntoListItemsUsingForInMethod = () => {
    const resultList = []
    const {covidData} = this.state
    const keyNames = Object.keys(covidData)

    keyNames.forEach(keyName => {
      if (covidData[keyName]) {
        const {total} = covidData[keyName]
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const lastUpdated = covidData[keyName].meta.last_updated
          ? covidData[keyName].meta.last_updated
          : 0

        let name
        const stateName = statesList.find(state => state.state_code === keyName)
        if (stateName !== undefined) {
          name = stateName.state_name
        }

        let allDistricts = []
        allDistricts = covidData[keyName].districts

        resultList.push({
          stateCodes: keyName,
          stateName: name,
          confirmed,
          deceased,
          recovered,
          tested,
          lastUpdated,
          active: confirmed - (deceased + recovered),
          districts: allDistricts,
        })
      }
    })
    return resultList
  }

  convertDistrictObjectIntoDistrictListForInMethod = districts => {
    const districtList = []

    const districtKeyName = Object.keys(districts)
    districtKeyName.forEach(keyName => {
      if (districts[keyName]) {
        const {total} = districts[keyName]
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0

        districtList.push({
          districtName: keyName,
          confirmed,
          deceased,
          recovered,
          tested,
          active: confirmed - deceased - recovered,
        })
      }
    })
    return districtList
  }

  sortDistrictsByCaseKey = (array, key) =>
    array.sort((x, y) => {
      const a = x[key]
      const b = y[key]

      return a > b ? -1 : 1
    })

  renderStateSpecificRoute = () => {
    const {
      activeCaseClass,
      showConfirmedCases,
      showActiveCases,
      showDeceasedCases,
      showRecoveredCases,
    } = this.state

    const statesData = this.convertObjectsDataIntoListItemsUsingForInMethod()

    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const specificState = stateCode

    const stateSpecificData = statesData.filter(
      eachState => eachState.stateCodes === specificState,
    )

    const districtsData = stateSpecificData[0].districts

    const districtsDataList = this.convertDistrictObjectIntoDistrictListForInMethod(
      districtsData,
    )
    console.log(districtsDataList)

    const clickActiveCases = () => {
      this.setState({
        showActiveCases: true,
        showConfirmedCases: false,
        showDeceasedCases: false,
        showRecoveredCases: false,
        activeCaseClass: activeCaseConstants.active,
      })
    }

    const clickConfirmedCases = () => {
      this.setState({
        showActiveCases: false,
        showConfirmedCases: true,
        showDeceasedCases: false,
        showRecoveredCases: false,
        activeCaseClass: activeCaseConstants.confirm,
      })
    }

    const clickRecoveredCases = () => {
      this.setState({
        showActiveCases: false,
        showConfirmedCases: false,
        showDeceasedCases: false,
        showRecoveredCases: true,
        activeCaseClass: activeCaseConstants.recovered,
      })
    }

    const clickDeceaseCases = () => {
      this.setState({
        showActiveCases: false,
        showConfirmedCases: false,
        showDeceasedCases: true,
        showRecoveredCases: false,
        activeCaseClass: activeCaseConstants.deceased,
      })
    }

    const sortedArray = this.sortDistrictsByCaseKey(
      districtsDataList,
      activeCaseClass,
    )

    const {tested, lastUpdated, stateName} = stateSpecificData[0]
    const updatedTime = new Date(lastUpdated).toDateString()

    return (
      <div>
        <div className="banner-card">
          <div>
            <h1 className="state-label">{stateName}</h1>
            <p className="state-time">{`Last update on ${updatedTime}`}</p>
          </div>
          <div>
            <p className="tested">Tested</p>
            <p className="tested-count">{tested}</p>
          </div>
        </div>
        <div className="state-specific-containers">
          <DataCard
            cardDetails={stateSpecificData[0]}
            clickActiveCases={clickActiveCases}
            clickConfirmedCases={clickConfirmedCases}
            clickDeceasedCases={clickDeceaseCases}
            clickRecoveredCases={clickRecoveredCases}
            showActiveCases={showActiveCases}
            showConfirmedCases={showConfirmedCases}
            showDeceasedCases={showDeceasedCases}
            showRecoveredCases={showRecoveredCases}
          />
          <h1 className="top-districts-heading">Top Districts</h1>
          <div testid="topDistrictsUnorderedList">
            {activeCaseClass && (
              <ul className="district-list">
                {sortedArray.map(eachDistrict => (
                  <DistrictsData
                    key={eachDistrict.districtName}
                    districtsDetails={eachDistrict}
                    showConfirmedCases={showConfirmedCases}
                    showActiveCases={showActiveCases}
                    showRecoveredCases={showRecoveredCases}
                    showDeceasedCases={showDeceasedCases}
                  />
                ))}
              </ul>
            )}
          </div>

          <TimeLine activeCaseClass={activeCaseClass} />
          <Footer />
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="state-specific-container">
        <Header />
        <main className="home-contain">
          {isLoading ? (
            <div className="loader-container" testid="stateDetailsLoader">
              <Loading />
            </div>
          ) : (
            this.renderStateSpecificRoute()
          )}
        </main>
      </div>
    )
  }
}

export default StateSpecificRoute
