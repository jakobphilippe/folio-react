import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Quote from './Quote';
import TradingViewWidget from 'react-tradingview-widget';
import axios from 'axios'
import ReactInterval from 'react-interval';

const StockCard = ({stock, setShow, onDelete, updateStock}) => {
    const [requesting, setRequest] = useState(false)

    const update = () => {
        let d = new Date();
        d = new Date(d.toLocaleString('en-US', { timeZone: 'America/New_York' }));
        const day = d.getDay();
        const hour = d.getHours();


        if (day >= 1 && day <= 5 && hour >= 9 && hour < 16 && !requesting) {
            setRequest(true)
            axios.request({
                method: 'POST',
                url: `https://jakobphilippe-folio.herokuapp.com/api/stock/quick_quote`,
                data: {
                    tickers: [stock.ticker]
                },
            }).then((response) => {
                setRequest(false)
                updateStock(response.data)
            }, (error) => {
                setRequest(false)
                console.log(error)
            });
        }
    }

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
            <ReactInterval timeout={5000} enabled={true} callback={() => update()} />
        </Card>
    )
}

export default StockCard
