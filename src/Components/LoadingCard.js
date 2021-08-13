import React from 'react'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'

function LoadingCard({ ticker }) {
    return (
        <Col className="col-md-4 mb-4">
            <Card style={{ height: "14rem" }} className="card box-shadow">
                <Card.Body className="w-100 d-flex justify-content-center align-items-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default LoadingCard
