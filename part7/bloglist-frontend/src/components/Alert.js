import PropTypes from 'prop-types'
import { Alert as Notification } from '@mui/material'

const Alert = ({ alert }) => {
  if (alert.message === null) {
    return null
  }

  return (
    <Notification severity={alert.type}>
      {alert.message}
    </Notification>
  )
}

Alert.propTypes = {
  alert: PropTypes.object.isRequired,
}

export default Alert
