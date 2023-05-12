import './index.css'

const StateCardItem = props => {
  const {eachStateData} = props
  const {stateName, confirmed, recovered, deceased, population} = eachStateData

  const active = confirmed - recovered - deceased

  return (
    <li className="table-container">
      <p className="asc-desc-container name">{stateName}</p>
      <div className="table-heading-container">
        <p className="column-para cases red">{confirmed}</p>
        <p className="column-para cases blue">{active}</p>
        <p className="column-para cases green">{recovered}</p>
        <p className="column-para cases ash">{deceased}</p>
        <p className="column-para cases">{population}</p>
      </div>
    </li>
  )
}
export default StateCardItem
