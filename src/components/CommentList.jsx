import { Component } from 'react'
import Button from 'react-bootstrap/Button'

const API_KEY =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNTMwNDE4N2U1YzAwMTgxNGM2OWUiLCJpYXQiOjE3MDY3OTUzMjksImV4cCI6MTcwODAwNDkyOX0.z776mNx_nkW-OchLZgq0pX1G0Fvqfzy-JBFhRt38tac'

class CommentList extends Component {
  state = {
    comments: [],
  }

  getComments = (asin) => {
    fetch('https://striveschool-api.herokuapp.com/api/comments/' + asin, {
      method: 'GET',
      headers: {
        Authorization: API_KEY,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error(res.status)
        }
      })
      .then((data) => {
        console.log(data)
        this.setState({ comments: data })
      })
      .catch((err) => console.log(err))
  }

  deleteComment = (el) => {
    fetch('https://striveschool-api.herokuapp.com/api/comments/' + el._id, {
      method: 'DELETE',
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((res) => {
        if (res.ok) {
          this.getComments(el.elementId)
        } else {
          throw new Error(res.status)
        }
      })
      .catch((err) => console.log(err))
  }

  printStars = (n) => {
    const iconContainer = []
    const icon = <i className="bi bi-star-fill text-warning"></i>
    for (let i = 0; i < n; i++) {
      iconContainer.push(icon)
    }
    return iconContainer
  }

  componentDidMount() {
    this.getComments(this.props.book.asin)
  }
  render() {
    return (
      <div className="my-3">
        {this.state.comments.length === 0 ? (
          <h1 className="text-center text-secondary">Non ci sono commenti.</h1>
        ) : (
          this.state.comments.map((el, i) => (
            <div key={el._id}>
              <div className="d-flex justify-content-between">
                <p>
                  <span className="fw-semibold me-2">Utente {i + 1}</span>
                  {this.printStars(el.rate)}
                </p>
                <Button variant="danger" onClick={() => this.deleteComment(el)}>
                  <i className="bi bi-trash-fill"></i>
                </Button>
              </div>
              <p className="fst-italic border-bottom">{el.comment}</p>
            </div>
          ))
        )}
      </div>
    )
  }
}

export default CommentList
