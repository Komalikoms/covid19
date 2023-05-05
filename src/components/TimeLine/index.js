import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line,
} from 'recharts'

import './index.css'

const apiConstants = {
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
}

class TimeLine extends Component {
  state = {timelineData: '', isLoading: apiConstants.inProgress}

  componentDidMount() {
    this.getTimelineData()
  }

  getTimelineData = async () => {
    const response = await fetch(`https://apis.ccbp.in/covid19-timelines-data`)
    const data = await response.json()
    console.log(data)

    this.setState({timelineData: data, isLoading: apiConstants.success})
  }

  convertObjectsDataIntoListItemsUsingForInMethod = () => {
    const {timelineData} = this.state
    const timeData = []
    const keyNames = Object.keys(timelineData)

    const {match} = this.props
    const {params} = match
    const {stateCode} = params

    const individualState = keyNames.find(eachKey => eachKey === stateCode)
    timeData.push(timelineData[individualState])

    return timeData
  }

  getAllDates = dates => {
    let sample = {}
    const keyNames = Object.keys(dates)

    keyNames.forEach(eachKey => {
      if (dates[eachKey]) {
        sample = dates[eachKey]
      }
    })
    return sample
  }

  convertDateObjectIntoListItems = allDates => {
    const datesList = []
    const keyNames = Object.keys(allDates)
    const reverseKeyNames = keyNames.reverse()

    reverseKeyNames.forEach(eachKey => {
      if (eachKey !== undefined) {
        const {delta} = allDates[eachKey]
        // console.log(delta.confirmed)
        const recoveredCases = delta.recovered ? delta.recovered : 0
        const confirmedCases = delta.confirmed ? delta.confirmed : 0
        const deceasedCases = delta.deceased ? delta.deceased : 0
        const activeCases = confirmedCases - (deceasedCases + recoveredCases)
        const tested = delta.tested ? delta.tested : 0
        const vaccinated = delta.vaccinated1 ? delta.vaccinated1 : 0

        const dateObject = {}
        const monthNames = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ]

        // console.log("The current month is " + monthNames[d.getMonth()]);
        const date = new Date(eachKey).getDate()
        const month = monthNames[new Date(eachKey).getMonth() + 1]

        dateObject.date = `${date} ${month}`

        dateObject.confirmed = confirmedCases
        dateObject.recovered = recoveredCases
        dateObject.deceased = deceasedCases
        dateObject.active = activeCases
        dateObject.tested = tested
        dateObject.vaccinated = vaccinated
        if (datesList.length < 10) {
          datesList.push(dateObject)
        }
      }
    })
    return datesList.reverse()
  }

  renderBarChart = allDatesList => {
    const {activeCaseClass} = this.props
    return (
      <div>
        {activeCaseClass === 'confirmed' && (
          <div>
            <BarChart
              width={1000}
              height={450}
              data={allDatesList}
              stroke="#9A0E31"
              className="bar-chart"
            >
              <XAxis dataKey="date" stroke="#161625" />
              <YAxis stroke="#161625" />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="confirmed"
                fill="#9A0E31"
                className="bar"
                label={{position: 'top', color: 'white'}}
              />
            </BarChart>
          </div>
        )}

        {activeCaseClass === 'active' && (
          <div>
            <BarChart
              width={1000}
              height={450}
              data={allDatesList}
              stroke=" #0A4FA0"
              className="bar-chart"
            >
              <XAxis dataKey="date" stroke="#161625" />
              <YAxis stroke="#161625" />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="active"
                fill=" #0A4FA0"
                className="bar"
                label={{position: 'top', color: 'white'}}
              />
            </BarChart>
          </div>
        )}

        {activeCaseClass === 'recovered' && (
          <div>
            <BarChart
              width={1000}
              height={450}
              data={allDatesList}
              stroke="#216837"
              className="bar-chart"
            >
              <XAxis dataKey="date" stroke="#161625" />
              <YAxis stroke="#161625" />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="recovered"
                fill="#216837"
                className="bar"
                label={{position: 'top', color: 'white'}}
              />
            </BarChart>
          </div>
        )}

        {activeCaseClass === 'deceased' && (
          <div>
            <BarChart
              width={1000}
              height={450}
              data={allDatesList}
              stroke="#474C57"
              className="bar-chart"
            >
              <XAxis dataKey="date" stroke="#161625" />
              <YAxis stroke="#161625" />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="deceased"
                fill="#474C57"
                className="bar"
                label={{position: 'top', color: 'white'}}
              />
            </BarChart>
          </div>
        )}
      </div>
    )
  }

  renderLineChart = allDatesList => (
    <div>
      <div className="confirm-container">
        <p className="para confirm">confirmed</p>
        <div className="App">
          <LineChart
            min-width={600}
            width={940}
            height={200}
            data={allDatesList}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <XAxis dataKey="date" stroke="#9A0E31" />
            <YAxis stroke="#9A0E31" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="confirmed" stroke="#9A0E31" />
          </LineChart>
        </div>
      </div>
      <div className="active-container">
        <p className="para active">Total Active</p>
        <div className="App">
          <LineChart
            min-width={600}
            width={940}
            height={200}
            data={allDatesList}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <XAxis dataKey="date" stroke="#007BFF" />
            <YAxis stroke="#007BFF" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="active" stroke="#007BFF" />
          </LineChart>
        </div>
      </div>
      <div className="recover-container">
        <p className="para recovered">Recovered</p>
        <div className="App">
          <LineChart
            min-width={600}
            width={940}
            height={200}
            data={allDatesList}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <XAxis dataKey="date" stroke="#27A243" />
            <YAxis stroke="#27A243" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="recovered" stroke="#27A243" />
          </LineChart>
        </div>
      </div>
      <div className="decease-container">
        <p className="para decease">Deceased</p>
        <div className="App">
          <LineChart
            min-width={600}
            width={940}
            height={200}
            data={allDatesList}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <XAxis dataKey="date" stroke="#6C757D" />
            <YAxis stroke="#6C757D" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="deceased" stroke="#6C757D" />
          </LineChart>
        </div>
      </div>
      <div className="tested-container">
        <p className="para tested">Tested</p>
        <div className="App">
          <LineChart
            min-width={600}
            width={940}
            height={200}
            data={allDatesList}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <XAxis dataKey="date" stroke="#9673B9" />
            <YAxis stroke="#9673B9" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="tested" stroke="#9673B9" />
          </LineChart>
        </div>
      </div>
    </div>
  )

  renderTimeLineData = () => {
    const timesData = this.convertObjectsDataIntoListItemsUsingForInMethod()
    const [dates] = timesData
    const allDates = this.getAllDates(dates)
    console.log(allDates)

    const allDatesList = this.convertDateObjectIntoListItems(allDates)
    console.log(allDatesList)

    return (
      <div>
        {this.renderBarChart(allDatesList)}
        <h1 className="spread-trends">Daily Spread Trends</h1>
        <div testid="lineChartsContainer">
          {this.renderLineChart(allDatesList)}
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="covid-loader-container" testid="timelinesDataLoader">
      <Loader type="Oval" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state

    switch (isLoading) {
      case apiConstants.success:
        return this.renderTimeLineData()
      case apiConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default withRouter(TimeLine)
