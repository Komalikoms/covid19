import './index.css'

const Faq = props => {
  const {faqDetails} = props
  const {question, answer} = faqDetails

  return (
    <li>
      <p className="question-label">{question}</p>
      <p className="answer-label">{answer}</p>
    </li>
  )
}
export default Faq
