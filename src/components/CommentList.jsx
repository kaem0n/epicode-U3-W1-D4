import { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'

const API_KEY =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNTMwNDE4N2U1YzAwMTgxNGM2OWUiLCJpYXQiOjE3MDY3OTUzMjksImV4cCI6MTcwODAwNDkyOX0.z776mNx_nkW-OchLZgq0pX1G0Fvqfzy-JBFhRt38tac'

class CommentList extends Component {
  state = {
    comments: [],
    comment: '',
    rate: '1',
    isLoading: true,
    isError: false,
    error: '',
  }

  getComments = (asin) => {
    fetch('https://striveschool-api.herokuapp.com/api/comments/' + asin, {
      method: 'GET',
      headers: {
        Authorization: API_KEY,
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
        this.setState({ comments: data, isLoading: false })
      })
      .catch((err) =>
        this.setState({
          isError: true,
          error: `${err}`,
          isLoading: false,
        })
      )
  }

  deleteComment = (id) => {
    fetch('https://striveschool-api.herokuapp.com/api/comments/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((res) => {
        if (res.ok) {
          this.getComments(this.props.book.asin)
        } else {
          throw new Error(res.status)
        }
      })
      .catch((err) =>
        this.setState({
          isError: true,
          error: `${err}`,
          isLoading: false,
        })
      )
  }

  addComment = (e) => {
    e.preventDefault()
    fetch('https://striveschool-api.herokuapp.com/api/comments/', {
      method: 'POST',
      headers: {
        Authorization: API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment: this.state.comment,
        rate: this.state.rate,
        elementId: this.props.book.asin,
      }),
    })
      .then((res) => {
        if (res.ok) {
          this.setState({
            comment: '',
            rate: '1',
          })
          this.getComments(this.props.book.asin)
        } else {
          throw new Error(res.status)
        }
      })
      .catch((err) =>
        this.setState({
          isError: true,
          error: `${err}`,
          isLoading: false,
        })
      )
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
      <>
        <Col xs={7} className="border-end">
          <div className="my-3 h-75">
            {this.state.isLoading && (
              <div className="h-100 d-flex flex-column justify-content-center align-items-center">
                <Spinner animation="border" variant="danger" />
              </div>
            )}
            {this.state.isError ? (
              <h1 className="text-center text-danger">{this.state.error}</h1>
            ) : this.state.comments.length === 0 &&
              !this.state.isLoading &&
              !this.state.isError ? (
              <h1 className="text-center text-secondary">
                Non ci sono commenti.
              </h1>
            ) : (
              this.state.comments.map((el, i) => (
                <div key={el._id}>
                  <div className="d-flex justify-content-between">
                    <p>
                      <span className="fw-semibold me-2">Utente {i + 1}</span>
                      {this.printStars(el.rate)}
                    </p>
                    <Button
                      variant="danger"
                      onClick={() => this.deleteComment(el._id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </Button>
                  </div>
                  <p className="fst-italic border-bottom">{el.comment}</p>
                </div>
              ))
            )}
          </div>
        </Col>
        <Col xs={5}>
          <Form
            className="d-flex flex-column justify-content-between h-100"
            onSubmit={this.addComment}
          >
            <div>
              <Form.Group className="mb-2">
                <Form.Label>Valutazione (da 1 a 5 stelle)</Form.Label>
                <Form.Select
                  value={this.state.rate}
                  onChange={(e) => this.setState({ rate: e.target.value })}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Aggiungi un commento</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  value={this.state.comment}
                  onChange={(e) => this.setState({ comment: e.target.value })}
                  required
                />
              </Form.Group>
            </div>
            <Button type="submit" variant="dark" className="align-self-end">
              INVIA
            </Button>
          </Form>
        </Col>
      </>
    )
  }
}

export default CommentList
