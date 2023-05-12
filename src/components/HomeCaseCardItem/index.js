import './index.css'

const HomeCaseCardItem = props => {
  const {cardDetails} = props
  const {confirmed, recovered, deceased} = cardDetails
  const active = confirmed - recovered - deceased
  return (
    )
}
export default HomeCaseCardItem
