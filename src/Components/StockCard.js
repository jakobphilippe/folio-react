import React from 'react'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import TradingViewWidget from 'react-tradingview-widget';

const StockCard = ({ stock, onDelete }) => {
    console.log(stock.percent_change > 0 ? "percent-change-positive" : "percent-change-negative")

    return (
        <Col className="col-md-4 mb-4">
            <Card className="card box-shadow">
                <Card.Header>
                    <span><h3 style={{fontSize: "1.5em", whiteSpace: "nowrap", overflow: "hidden"}} className="mb-0">{stock.name}</h3></span>
                    <small style={{ float: "left" }} className="text-muted">{stock.ticker}</small>
                    <small style={{ float: "right", marginLeft: "10px"}} className={stock.percent_change > 0 ? "percent-change-positive" : "percent-change-negative"}>{stock.percent_change}%</small>
                    <small style={{ float: "right"}} className="text-muted">${stock.price}</small>
                </Card.Header>
                <Card.Body>

                    <div style={{height: "12em", marginBottom: "10px"}}>
                        <TradingViewWidget autosize symbol={stock.ticker} hide_top_toolbar="true" hide_legend="true" style="3" interval="240"/>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                            <button onClick={() => onDelete(stock.ticker)} type="button" className="btn btn-sm btn-outline-secondary">Remove</button>
                        </div>
                        <small className="text-muted">{stock.sector}</small>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default StockCard
