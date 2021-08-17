import React, { useState, useEffect } from 'react'
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';

const Quote = ({ stock, size }) => {
    const [data, setData] = useState(stock)
    const [priceClass, setPriceClass] = useState("price-same")

    useEffect(() => {
        if (stock.price > data.price) {
            setPriceClass("price-increase")
        } else if (stock.price < data.price) {
            setPriceClass("price-decrease")
        }

        setData(stock)

        setTimeout(function () {
            setPriceClass("price-animation")
        }, 500)

        //eslint-disable-next-line
    }, [stock])

    return (
        <div style={{ width: "100%", height: "40px", marginBottom: "10px", display: "inline-flex", alignItems: "center" }}>
            <div style={{ fontSize: `${size}`}} className={priceClass}>${stock.price}</div>
            <div style={{ fontSize: ".8em", marginLeft: "10px", whiteSpace: "nowrap"}} className={stock.percent_change > 0 ? "percent-change-positive" : "percent-change-negative"}>
                {stock.percent_change}%
                {stock.percent_change > 0 ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
            </div>
            <div style={{ marginLeft: "5px", fontSize: "1em", whiteSpace: "nowrap"}} className={stock.percent_change > 0 ? "change-positive" : "change-negative"}>
                {stock.price_change} Today
            </div>
        </div>
    )
}

export default Quote
