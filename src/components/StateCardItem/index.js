import './index.css'

const StateCardItem = props => {
  const {eachStateData} = props
  const {
    name,
    confirmed,
    active,
    recovered,
    deceased,
    population,
  } = eachStateData

  return (
    <li className="table-container">
      <p className="asc-desc-container name">{name}</p>
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
