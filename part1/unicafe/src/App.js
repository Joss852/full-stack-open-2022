import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button type='button' onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <td>
      {text} {value}
    </td>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  return (
    <table>
      <tbody>
        <tr>
          <StatisticLine text='good' value={good} />
        </tr>
        <tr>
          <StatisticLine text='neutral' value={neutral} />
        </tr>
        <tr>
          <StatisticLine text='bad' value={bad} />
        </tr>
        <tr>
          <StatisticLine text='all' value={good + neutral + bad} />
        </tr>
        <tr>
          <StatisticLine
            text='average'
            value={(good - bad) / (good + neutral + bad)}
          />
        </tr>
        <tr>
          <StatisticLine
            text='positive'
            value={(good * 100) / (good + neutral + bad) + ' %'}
          />
        </tr>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <h1>statistics</h1>
      {good || neutral || bad ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  )
}

export default App
