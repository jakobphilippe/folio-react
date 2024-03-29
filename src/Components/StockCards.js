import React, { useState, useRef } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import StockCol from './StockCol'
import StockSearch from './StockSearch'
import LoadingCard from './LoadingCard'
import ReactInterval from 'react-interval';

const StockCards = () => {
    const [stocks, setStocks] = useState([])
    const [dragId, setDragId] = useState();
    const [tickers, setTickers] = useState([])
    const [loading, setLoading] = useState([])
    const stateRef = useRef();

    stateRef.current = stocks;

    const handleDrag = (ev) => {
        setDragId(ev.currentTarget.id);
    };

    const handleDrop = (ev) => {
        const dragCard = stocks.find((box) => box.ticker === dragId);
        const dropCard = stocks.find((box) => box.ticker === ev.currentTarget.id);

        const dragCardIndex = stocks.findIndex(x => x.ticker === dragCard.ticker);
        const dropCardIndex = stocks.findIndex(x => x.ticker === dropCard.ticker);

        setStocks(prevState => {
            let data = [...prevState]
            let temp = data[dragCardIndex];
            data[dragCardIndex] = data[dropCardIndex];
            data[dropCardIndex] = temp;

            return [...data];
        });


    };
    

    // Add stock
    const addStock = (ticker) => {
        if (stocks.find(x => x.ticker === ticker)) {
            return
        }

        setTickers([...tickers, ticker])
        setLoading(prevLoading => [...prevLoading, ticker])
        axios.request({
            method: 'POST',
            url: `https://jakobphilippe-folio.herokuapp.com/api/stock/card_data`,
            data: {
                tickers: [ticker]
            },
        }).then((response) => {
            setLoading(prevLoading => [...prevLoading].filter((t) => t !== ticker))
            setStocks(prevStocks => [...prevStocks, ...response.data])

        }, (error) => {
            setLoading(prevLoading => [...prevLoading].filter((t) => t !== ticker))
        });
    }

    // Remove stock
    const deleteStock = (ticker) => {
        setTickers(tickers.filter((stock) => stock !== ticker))
        setStocks(stocks.filter((stock) => stock.ticker !== ticker))
    }

    const updateStock = (newStock) => {
        let d = new Date();
        d = new Date(d.toLocaleString('en-US', { timeZone: 'America/New_York' }));
        const day = d.getDay();
        const hour = d.getHours();

        if (day >= 1 && day <= 5 && hour >= 9 && hour < 16) {
            try {
                let currentStockData = stateRef.current
                let updatedQuotes = []
                let newQuote = newStock[0]
                let objIndex = currentStockData.findIndex((obj => obj.ticker === newQuote.ticker));
                newQuote.desc = currentStockData[objIndex].desc
                newQuote.name = currentStockData[objIndex].name
                newQuote.sector = currentStockData[objIndex].sector
                updatedQuotes.push(newQuote)
                let newStockData = currentStockData.map(obj => updatedQuotes.find(o => o.ticker === obj.ticker) || obj);
                setStocks(newStockData)
            } catch (e) {
                console.log(e)
            }
        }
    }


    return (
        <div className="album py-5 bg-light">
            <Container>
                <Row md={2}>
                    <StockSearch onAdd={addStock} />
                </Row>
                <Row className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" >
                    {stocks.map((stock) => (<StockCol
                        key={stock.ticker}
                        handleDrag={handleDrag}
                        handleDrop={handleDrop}
                        stock={stock}
                        onDelete={deleteStock}
                        updateStock={updateStock} />))
                    }
                    {loading.map((load) => (<LoadingCard key={load} ticker={load} />))}
                </Row>
            </Container>
        </div>
    )
}

export default StockCards
