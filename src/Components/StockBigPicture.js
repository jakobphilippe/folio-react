import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Quote from './Quote'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import TradingViewWidget from 'react-tradingview-widget';
import Card from 'react-bootstrap/Card'

const StockBigPicture = ({ stock, show, setShow }) => {
    return (
        <Modal show={show} size={"xl"} onHide={() => setShow(false)} >
            <Modal.Header>
                <Modal.Title>
                    <h3 style={{ fontSize: "1.1em", whiteSpace: "nowrap", overflow: "hidden" }} className="mb-0">{stock.name}</h3>
                    <small style={{ float: "left" }} className="text-muted">{stock.ticker}</small>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Quote stock={stock} size="2em" />
                <Container fluid>
                    <Row>
                        <Col md={8}>
                            <div className={"rounded-3 shadow-sm"} style={{ height: "30em" }}>
                                {
                                // eslint-disable-next-line
                                }<TradingViewWidget autosize symbol={stock.ticker.replace('-', '')} style="1" interval="D" />
                            </div>
                        </Col>
                        <Col>
                            <Card className="card mb-4 rounded-3 shadow-sm">
                                <Card.Body style={{ fontSize: "12px" }}>
                                    {stock.desc}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                </Container>

            </Modal.Body>
        </Modal >
    )
}

export default StockBigPicture
