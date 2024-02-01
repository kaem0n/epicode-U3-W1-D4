import { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const API_KEY =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNTMwNDE4N2U1YzAwMTgxNGM2OWUiLCJpYXQiOjE3MDY3OTUzMjksImV4cCI6MTcwODAwNDkyOX0.z776mNx_nkW-OchLZgq0pX1G0Fvqfzy-JBFhRt38tac'

class AddComment extends Component {
  state = {
    comment: '',
    rate: '1',
    elementId: this.props.book.asin,
  }

  addComment = (e) => {
    e.preventDefault()
    fetch('https://striveschool-api.herokuapp.com/api/comments/', {
      method: 'POST',
      headers: {
        Authorization: API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
      .then((res) => {
        if (res.ok) {
          this.setState({
            comment: '',
            rate: '',
          })
        }
      })
      .catch((err) => console.log(err))
  }

  render() {
    return (
      <>
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
      </>
    )
  }
}

export default AddComment
