import { useQuery } from 'react-query'
import { userService } from '../services'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box
} from '@mui/material/'
import { Link } from 'react-router-dom'

const UsersPage = () => {
  const userQuery = useQuery('users', userService.getAll, { refetchOnWindowFocus: false })

  if (userQuery.isLoading) return <Typography variant='h6' component='span'>Loading users...</Typography>

  if(userQuery.error) return <Typography variant='h6' component='span'>Error loading users</Typography>

  return (
    <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant='h4' component='h2'>Users</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <TableContainer component={Paper} sx={{ padding: 2, maxWidth: 650 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell align='right'>Blogs created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userQuery.data.map(user => {
                return (
                  <TableRow key={user.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <Typography variant="body1" component={Link} to={`/users/${user.id}`}>
                        {user.username}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant='body2' component='span'>{user.blogs.length}</Typography>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default UsersPage