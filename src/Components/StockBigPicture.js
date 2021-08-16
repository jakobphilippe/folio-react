import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'
import TradingViewWidget from 'react-tradingview-widget';

const StockBigPicture = ({ stock }) => {
    return (
        <>
            <Modal.Header>
                <Modal.Title>
                    <span><h3 style={{ fontSize: "1.5em", whiteSpace: "nowrap", overflow: "hidden" }} className="mb-0">{stock.name}</h3></span>
                    <small style={{ float: "left" }} className="text-muted">{stock.ticker}</small>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ height: "24em", marginBottom: "55px"}}>
                    <TradingViewWidget autosize symbol={stock.ticker} style="1" interval="D" />
                </div>
            </Modal.Body>
        </>
    )
}

export default StockBigPicture
