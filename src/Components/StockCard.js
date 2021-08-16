import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import TradingViewWidget from 'react-tradingview-widget';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import StockBigPicture from './StockBigPicture';

const StockCard = ({ handleDrag, handleDrop, stock, onDelete }) => {
    const [show, setShow] = useState(false);

    return (
        <Col className="col-md-4 mb-4"
            draggable={true}
            id={stock.ticker}
            onDragOver={(ev) => {
                ev.stopPropagation();
                ev.preventDefault();
            }}
            onDragStart={handleDrag}
            onDrop={handleDrop}>
            <Card className="card box-shadow">
                <Card.Header style={{ cursor: "grab" }}>
                    <span><h3 style={{ fontSize: "1.5em", whiteSpace: "nowrap", overflow: "hidden" }} className="mb-0">{stock.name}</h3></span>
                    <small style={{ float: "left" }} className="text-muted">{stock.ticker}</small>
                </Card.Header>
                <Card.Body>
                    <div>
                        <h3 style={{ float: "left" }} className="text-muted animate">${stock.price}</h3>
                        <p style={{ fontSize: ".8em", float: "right" }} className={stock.percent_change > 0 ? "percent-change-positive" : "percent-change-negative"}>
                            {stock.percent_change}%
                            {stock.percent_change > 0 ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
                        </p>
                        <p className="text-muted" style={{marginLeft: "5px", display: "inline", fontSize: "1em"}}>
                            {stock.price_change}
                        </p>
                    </div>
                    <div style={{ height: "12em", marginBottom: "55px"}}>
                        <TradingViewWidget autosize symbol={stock.ticker} hide_top_toolbar={true} hide_legend={true} style="3" interval="D" />
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
            <Modal show={show} fullscreen={true} onHide={() => setShow(false)} >
                <StockBigPicture stock={stock}/>
            </Modal>
        </Col>
    )
}

export default StockCard
