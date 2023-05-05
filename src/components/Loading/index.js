import Loader from 'react-loader-spinner'
import './index.css'

const Loading = () => (
  <div className="loader-container">
    <Loader type="TailSpin" color="#007BFF" height={50} width={50} />
  </div>
)

export default Loading
