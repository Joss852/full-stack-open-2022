import PropTypes from 'prop-types'

const Alert = ({ alert }) => {
  let alertStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (alert.message === null) {
    return null
  }

  if (alert.type === 'error') {
    alertStyle = { ...alertStyle, color: 'red' }
  }

  return (
    <div id="alert" style={alertStyle}>
      {alert.message}
    </div>
  )
}

Alert.propTypes = {
  alert: PropTypes.object.isRequired,
}

export default Alert
