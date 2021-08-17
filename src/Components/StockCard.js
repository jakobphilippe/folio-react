import React from 'react'
import Card from 'react-bootstrap/Card'
import Quote from './Quote';
import TradingViewWidget from 'react-tradingview-widget';

const StockCard = ({stock, setShow, onDelete}) => {
    return (
        <Card className="card box-shadow">
            <Card.Header style={{ cursor: "grab" }}>
                <span><h3 style={{ fontSize: "1.5em", whiteSpace: "nowrap", overflow: "hidden" }} className="mb-0">{stock.name}</h3></span>
                <small style={{ float: "left" }} className="text-muted">{stock.ticker}</small>
            </Card.Header>
            <Card.Body>
                <Quote stock={stock} size="1.5em"/>
                <div style={{ height: "12em"}}>
                    {
                    //eslint-disable-next-line
                    }<TradingViewWidget autosize symbol={stock.ticker.replace('-', '')} hide_top_toolbar={true} hide_legend={true} style="3" interval="D" />
                </div>
            </Card.Body>
            <Card.Footer>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                        <button type="button" onClick={() => setShow(true)} className="btn btn-sm btn-outline-secondary">View</button>
                        <button onClick={() => onDelete(stock.ticker)} type="button" className="btn btn-sm btn-outline-secondary">Remove</button>
                    </div>
                    <small className="text-muted">{stock.sector}</small>
                </div>
            </Card.Footer>
        </Card>
    )
}

export default StockCard
