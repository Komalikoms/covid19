import './index.css'

const HomeCaseCardItem = props => {
  const {cardDetails} = props
  const {confirmed, active, recovered, deceased} = cardDetails
  return (
    <div className="order-list">
      <li className="list-card" testid="countryWideConfirmedCases">
        <p className="stats red">Confirmed</p>
        <img
          src="https://res.cloudinary.com/dnv6kesmt/image/upload/v1636521128/mini-project/check-mark_1_e83qpy.png"
          alt="country wide confirmed cases pic"
          className="cases-pic"
        />
        <p className="red count">{confirmed}</p>
      </li>

      <li className="list-card" testid="countryWideActiveCases">
        <p className="stats blue">Active</p>
        <img
          src="https://res.cloudinary.com/dnv6kesmt/image/upload/v1636521130/mini-project/protection_1_roaazd.png"
          alt="country wide active cases pic"
          className="cases-pic"
        />
        <p className="blue count">{active}</p>
      </li>

      <li className="list-card" testid="countryWideRecoveredCases">
        <p className="stats green">Recovered</p>
        <img
          src="https://res.cloudinary.com/dnv6kesmt/image/upload/v1636521130/mini-project/recovered_1_pz28bz.png"
          alt="country wide recovered cases pic"
          className="cases-pic"
        />
        <p className="green count">{recovered}</p>
      </li>

      <li className="list-card" testid="countryWideDeceasedCases">
        <p className="stats ash">Deceased</p>
        <img
          src="https://res.cloudinary.com/dnv6kesmt/image/upload/v1636521128/mini-project/breathing_1_uxmvq9.png"
          alt="country wide deceased cases pic"
          className="cases-pic"
        />
        <p className="ash count">{deceased}</p>
      </li>
    </div>
  )
}
export default HomeCaseCardItem
