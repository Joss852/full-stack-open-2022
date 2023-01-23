const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => (sum += part.exercises), 0)
  return (
    <p>
      <b>total of {total} exercises</b>
    </p>
  )
}

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  )
}

const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map(course => (
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </div>
  )
}

export default Courses
