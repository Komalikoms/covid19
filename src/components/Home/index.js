import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'

import Header from '../Header'
import Loading from '../Loading'
import StateCardItem from '../StateCardItem'
import SearchList from '../SearchList'

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

class Home extends Component {
  state = {
    isLoading: true,
    covidData: [],
    searchInput: '',
    showSearchList: false,
    showStatesList: true,
    showInitialTable: true,
    showAscStateList: false,
    showDescStateList: false,
    sortedStateData: [],
    totalConfirmed: 0,
    totalRecovered: 0,
    totalActive: 0,
    totalDeceased: 0,
  }

  componentDidMount() {
    this.getHomeData()
  }

  getHomeData = async () => {
    const response = await fetch('https://apis.ccbp.in/covid19-state-wise-data')

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)

      let nationWideConfirmedCases = 0
      let nationWideRecoveredCases = 0
      let nationWideDeceasedCases = 0
      let nationWideActiveCases = 0

      statesList.forEach(state => {
        if (data[state.state_code]) {
          const {total} = data[state.state_code]
          nationWideConfirmedCases += total.confirmed ? total.confirmed : 0
          nationWideDeceasedCases += total.deceased ? total.deceased : 0
          nationWideRecoveredCases += total.recovered ? total.recovered : 0
        }
      })

      nationWideActiveCases +=
        nationWideConfirmedCases -
        nationWideDeceasedCases -
        nationWideRecoveredCases

      const stateData = statesList.map(eachState => ({
        stateName: eachState.state_name,
        stateCode: eachState.state_code,
        confirmed: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(e => data[e].total.confirmed),

        deceased: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(each => data[each].total.deceased),
        recovered: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(each => data[each].total.recovered),
        tested: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(each => data[each].total.tested),
        population: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(each => data[each].meta.population),
      }))

      this.setState({
        covidData: stateData,
        isLoading: false,
        totalConfirmed: nationWideConfirmedCases,
        totalDeceased: nationWideDeceasedCases,
        totalRecovered: nationWideRecoveredCases,
        totalActive: nationWideActiveCases,
      })
    }
  }

  onChangeSearchInput = event => {
    if (event.target.value === '') {
      this.setState({
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
    const {covidData} = this.state
    const sortedStateArray = this.sortByCaseKeyAsc(covidData, 'name')
    this.setState({
      sortedStateData: sortedStateArray,
      showInitialTable: false,
      showAscStateList: true,
    })
  }

  sortDescending = () => {
    const {covidData} = this.state
    const sortedStateArrayrev = this.sortByCaseKeyDesc(covidData, 'name')
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
      showAscStateList,
      showDescStateList,
      sortedStateData,
      totalConfirmed,
      totalRecovered,
      totalActive,
      totalDeceased,
    } = this.state

    console.log(covidData)

    const updatedStatesList = statesList.map(eachState => ({
      stateCode: eachState.state_code,
      stateName: eachState.state_name,
    }))

    const filteredSearchList = updatedStatesList.filter(eachSearch =>
      eachSearch.stateName.toLowerCase().includes(searchInput.toLowerCase()),
    )

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
          <ul
            className="search-unorder-list"
            testid="searchResultsUnorderedList"
          >
            {showSearchList &&
              filteredSearchList.map(eachState => (
                <SearchList
                  key={eachState.stateCode}
                  searchedList={eachState}
                />
              ))}
          </ul>
        </div>
        <ul>
          {showStatesList && (
            <div className="order-list">
              <li className="list-card" testid="countryWideConfirmedCases">
                <p className="stats red">Confirmed</p>
                <img
                  src="https://res.cloudinary.com/dnv6kesmt/image/upload/v1636521128/mini-project/check-mark_1_e83qpy.png"
                  alt="country wide confirmed cases pic"
                  className="cases-pic"
                />
                <p className="red count">{totalConfirmed}</p>
              </li>

              <li className="list-card" testid="countryWideActiveCases">
                <p className="stats blue">Active</p>
                <img
                  src="https://res.cloudinary.com/dnv6kesmt/image/upload/v1636521130/mini-project/protection_1_roaazd.png"
                  alt="country wide active cases pic"
                  className="cases-pic"
                />
                <p className="blue count">{totalActive}</p>
              </li>

              <li className="list-card" testid="countryWideRecoveredCases">
                <p className="stats green">Recovered</p>
                <img
                  src="https://res.cloudinary.com/dnv6kesmt/image/upload/v1636521130/mini-project/recovered_1_pz28bz.png"
                  alt="country wide recovered cases pic"
                  className="cases-pic"
                />
                <p className="green count">{totalRecovered}</p>
              </li>

              <li className="list-card" testid="countryWideDeceasedCases">
                <p className="stats ash">Deceased</p>
                <img
                  src="https://res.cloudinary.com/dnv6kesmt/image/upload/v1636521128/mini-project/breathing_1_uxmvq9.png"
                  alt="country wide deceased cases pic"
                  className="cases-pic"
                />
                <p className="ash count">{totalDeceased}</p>
              </li>
            </div>
          )}
        </ul>

        <div className="main-table-container " testid="stateWiseCovidDataTable">
          {showStatesList && (
            <div className="table-container border-bottom">
              <div className="asc-desc-container">
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
              <div className="table-heading-container">
                <p className="column-para">Confirmed</p>
                <p className="column-para">Active</p>
                <p className="column-para">Recovered</p>
                <p className="column-para">Deceased</p>
                <p className="column-para">Population</p>
              </div>
            </div>
          )}

          <ul className="stateDataTable">
            {showInitialTable &&
              covidData.map(eachState => (
                <StateCardItem
                  key={eachState.stateCode}
                  eachStateData={eachState}
                />
              ))}
          </ul>

          <div>
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
          <div>
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
    )
  }

  render() {
    const {isLoading, showStatesList} = this.state
    return (
      <ul className="homes">
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
      </ul>
    )
  }
}
export default Home
