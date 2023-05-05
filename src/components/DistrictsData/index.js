import './index.css'

const DistrictsData = props => {
  const {
    districtsDetails,
    showConfirmedCases,
    showActiveCases,
    showRecoveredCases,
    showDeceasedCases,
  } = props
  console.log(districtsDetails)

  const {
    confirmed,
    active,
    recovered,
    deceased,
    districtName,
  } = districtsDetails

  return (
    <li className="district-item">
      <div>
        {showConfirmedCases && <p className="activeClass">{confirmed}</p>}
      </div>
      <div>{showActiveCases && <p className="activeClass">{active}</p>}</div>
      <div>
        {showRecoveredCases && <p className="activeClass">{recovered}</p>}
      </div>
      <div>
        {showDeceasedCases && <p className="activeClass">{deceased}</p>}
      </div>

      <p className="districtName">{districtName}</p>
    </li>
  )
}
export default DistrictsData
