import './index.css'

const DataCard = props => {
  const {
    cardDetails,
    clickActiveCases,
    clickConfirmedCases,
    clickDeceasedCases,
    clickRecoveredCases,
    showActiveCases,
    showConfirmedCases,
    showDeceasedCases,
    showRecoveredCases,
  } = props

  const {confirmed, deceased, active, recovered} = cardDetails

  const onClickConfirmedCases = () => {
    clickConfirmedCases()
  }

  const onClickActiveCases = () => {
    clickActiveCases()
  }

  const onClickRecoveredCases = () => {
    clickRecoveredCases()
  }

  const onClickDeceasedCases = () => {
    clickDeceasedCases()
  }

  const activeConfirmedClass = showConfirmedCases ? 'confirm-class' : ''
  const activeActiveClass = showActiveCases ? 'active-class' : ''
  const activeRecoveredClass = showRecoveredCases ? 'recover-class' : ''
  const activeDeceasedClass = showDeceasedCases ? 'decease-class' : ''

  return (
    <ul className="order-list">
      <li
        className={`case-list ${activeConfirmedClass}`}
        onClick={onClickConfirmedCases}
        testid="stateSpecificConfirmedCasesContainer"
      >
        <p className="stats red">Confirmed</p>
        <img
          src="https://res.cloudinary.com/dnv6kesmt/image/upload/v1636521128/mini-project/check-mark_1_e83qpy.png"
          alt="state specific confirmed cases pic"
          className="cases-pic"
        />
        <p className="red count">{confirmed}</p>
      </li>

      <li
        className={`case-list ${activeActiveClass}`}
        onClick={onClickActiveCases}
        testid="stateSpecificActiveCasesContainer"
      >
        <p className="stats blue">Active</p>
        <img
          src="https://res.cloudinary.com/dnv6kesmt/image/upload/v1636521130/mini-project/protection_1_roaazd.png"
          alt="state specific active cases pic"
          className="cases-pic"
        />
        <p className="blue count">{active}</p>
      </li>

      <li
        className={`case-list ${activeRecoveredClass}`}
        onClick={onClickRecoveredCases}
        testid="stateSpecificRecoveredCasesContainer"
      >
        <p className="stats green">Recovered</p>
        <img
          src="https://res.cloudinary.com/dnv6kesmt/image/upload/v1636521130/mini-project/recovered_1_pz28bz.png"
          alt="state specific recovered cases pic"
          className="cases-pic"
        />
        <p className="green count">{recovered}</p>
      </li>

      <li
        className={`case-list ${activeDeceasedClass}`}
        onClick={onClickDeceasedCases}
        testid="stateSpecificDeceasedCasesContainer"
      >
        <p className="stats ash">Deceased</p>
        <img
          src="https://res.cloudinary.com/dnv6kesmt/image/upload/v1636521128/mini-project/breathing_1_uxmvq9.png"
          alt="state specific deceased cases pic"
          className="cases-pic"
        />
        <p className="ash count">{deceased}</p>
      </li>
    </ul>
  )
}
export default DataCard
