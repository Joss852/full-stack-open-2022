import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material'

const Blog = ({ blog }) => {
  return (
    <Card sx={{ minWidth: 275, margin: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {blog.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {blog.author}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/blogs/${blog.id}`}>View more</Button>
      </CardActions>
    </Card>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
