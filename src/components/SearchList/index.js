import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'

import './index.css'

const SearchList = props => {
  const {searchedList} = props
  const {stateCode, stateName} = searchedList

  return (
    <Link
      to={`/covid19-state-wise-data/state/${stateCode}`}
      className="link-item"
    >
      <li className="searched-container">
        <p className="stateName-container">{stateName}</p>
        <div className="stateCode-container">
          <p>{stateCode}</p>
          <BiChevronRightSquare className="square-icon" />
        </div>
      </li>
    </Link>
  )
}
export default SearchList
