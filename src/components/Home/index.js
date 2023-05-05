import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'

import Header from '../Header'
import Loading from '../Loading'
import StateCardItem from '../StateCardItem'
import SearchList from '../SearchList'
import HomeCaseCardItem from '../HomeCaseCardItem'

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

let stateData = []

class Home extends Component {
  state = {
    isLoading: true,
    covidData: {},
    searchInput: '',
    showSearchList: false,
    showStatesList: true,
    sortedStateData: stateData,
    showInitialTable: true,
    showAscStateList: false,
    showDescStateList: false,
  }

  componentDidMount() {
    this.getHomeData()
  }

  getHomeData = async () => {
    const response = await fetch('https://apis.ccbp.in/covid19-state-wise-data')
    const data = await response.json()
    console.log(data)

    this.setState({covidData: data, isLoading: false})
  }

  convertObjectsDataIntoListItemsUsingForInMethod = covidData => {
    const resultList = []
    const keyNames = Object.keys(covidData)

    keyNames.forEach(keyName => {
      if (covidData[keyName]) {
        const {total} = covidData[keyName]

        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = covidData[keyName].meta.population
          ? covidData[keyName].meta.population
          : 0

        let stateName
        const name = statesList.find(state => state.state_code === keyName)
        if (name !== undefined) {
          stateName = name.state_name
        }

        resultList.push({
          stateCode: keyName,
          name: stateName,
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    return resultList
  }

  onChangeSearchInput = event => {
    if (event.target.value === '') {
      this.setState({
        searchInput: event.target.value,
        showSearchList: false,
        showStatesList: true,
        showInitialTable: true,
      })
    } else {
      this.setState({
        searchInput: event.target.value,
        showSearchList: true,
        showStatesList: false,
        showAscStateList: false,
        showDescStateList: false,
        showInitialTable: false,
      })
    }
  }

  sortByCaseKeyDesc = (array, key) =>
    array.sort((a, b) => {
      const x = a[key]
      const y = b[key]
      return x > y ? -1 : 1
    })

  sortByCaseKeyAsc = (array, key) =>
    array.sort((a, b) => {
      const x = a[key]
      const y = b[key]
      return x > y ? 1 : -1
    })

  sortAscending = () => {
    const sortedStateArray = this.sortByCaseKeyAsc(stateData, 'name')
    this.setState({
      sortedStateData: sortedStateArray,
      showInitialTable: false,
      showAscStateList: true,
    })
  }

  sortDescending = () => {
    const sortedStateArrayrev = this.sortByCaseKeyDesc(stateData, 'name')
    this.setState({
      sortedStateData: sortedStateArrayrev,
      showInitialTable: false,
      showDescStateList: true,
    })
  }

  renderHome = () => {
    const {
      searchInput,
      covidData,
      showSearchList,
      showStatesList,
      showInitialTable,
      sortedStateData,
      showAscStateList,
      showDescStateList,
    } = this.state

    stateData = this.convertObjectsDataIntoListItemsUsingForInMethod(covidData)

    const updatedStatesList = statesList.map(eachState => ({
      stateCode: eachState.state_code,
      stateName: eachState.state_name,
    }))

    const filteredSearchList = updatedStatesList.filter(eachSearch =>
      eachSearch.stateName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const getUpdated = (a, b) => ({
      confirmed: a.confirmed + b.confirmed,
      deceased: a.deceased + b.deceased,
      recovered: a.recovered + b.recovered,
      active: a.active + b.active,
    })

    const sum = stateData.reduce(getUpdated)

    return (
      <div className="container">
        <div className="input-main-container">
          <div className="input-container ">
            <BsSearch className="search-container" />
            <input
              type="search"
              placeholder="Enter the state"
              className="search-input"
              value={searchInput}
              onChange={this.onChangeSearchInput}
            />
          </div>
          <div testid="searchResultsUnorderedList">
            <ul className="search-unorder-list">
              {showSearchList &&
                filteredSearchList.map(eachState => (
                  <SearchList
                    key={eachState.stateCode}
                    searchedList={eachState}
                  />
                ))}
            </ul>
          </div>
        </div>

        {showStatesList && <HomeCaseCardItem cardDetails={sum} />}

        <div className="main-table-container ">
          {showStatesList && (
            <div className="table-container border-bottom">
              <div
                className="asc-desc-container"
                testid="stateWiseCovidDataTable"
              >
                <p className="states-heading">States/UT</p>
                <button
                  type="button"
                  className="sort-button-icon"
                  onClick={this.sortAscending}
                  testid="ascendingSort"
                >
                  <FcGenericSortingAsc />
                </button>

                <button
                  type="button"
                  className="sort-button-icon"
                  onClick={this.sortDescending}
                  testid="descendingSort"
                >
                  <FcGenericSortingDesc />
                </button>
              </div>

              <div
                className="table-heading-container"
                testid="stateWiseCovidDataTable"
              >
                <p className="column-para">Confirmed</p>
                <p className="column-para">Active</p>
                <p className="column-para">Recovered</p>
                <p className="column-para">Deceased</p>
                <p className="column-para">Population</p>
              </div>
            </div>
          )}
          <div>
            <div testid="stateWiseCovidDataTable">
              <ul className="stateDataTable">
                {showInitialTable &&
                  stateData.map(eachState => (
                    <StateCardItem
                      key={eachState.stateCode}
                      eachStateData={eachState}
                    />
                  ))}
              </ul>
            </div>
            <div testid="stateWiseCovidDataTable">
              <ul className="stateDataTable">
                {showAscStateList &&
                  sortedStateData.map(eachState => (
                    <StateCardItem
                      key={eachState.stateCode}
                      eachStateData={eachState}
                    />
                  ))}
              </ul>
            </div>
            <div testid="stateWiseCovidDataTable">
              <ul className="stateDataTable">
                {showDescStateList &&
                  sortedStateData.map(eachState => (
                    <StateCardItem
                      key={eachState.stateCode}
                      eachStateData={eachState}
                    />
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading, showStatesList} = this.state
    return (
      <div className="homes">
        <Header />
        <main className="home-container">
          {isLoading ? (
            <div className="loader-container" testid="homeRouteLoader">
              <Loading />
            </div>
          ) : (
            this.renderHome()
          )}
          <div>{showStatesList && <Footer />}</div>
        </main>
      </div>
    )
  }
}
export default Home
