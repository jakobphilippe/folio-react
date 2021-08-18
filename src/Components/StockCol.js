import React, { useState } from 'react'
import Col from 'react-bootstrap/Col'
import StockBigPicture from './StockBigPicture';
import StockCard from './StockCard'

const StockCol = ({ handleDrag, handleDrop, stock, onDelete, updateStock }) => {
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
            <StockCard stock={stock} setShow={setShow} onDelete={onDelete} updateStock={updateStock} />
            <StockBigPicture stock={stock} show={show} setShow={setShow}/>
        </Col>
    )
}

export default StockCol
