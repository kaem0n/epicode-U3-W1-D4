import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import CommentList from './CommentList'
import AddComment from './AddComment'

const CommentArea = function (props) {
  const [show, setShow] = useState(false)

  return (
    <>
      <Button variant="danger" onClick={() => setShow(true)}>
        <i className="bi bi-chat-left-text-fill"></i>
      </Button>

      <Modal show={show} onHide={() => setShow(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{props.book.title} - Area Commenti</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={7} className="border-end">
                <CommentList book={props.book} />
              </Col>
              <Col xs={5}>
                <AddComment book={props.book} />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default CommentArea
