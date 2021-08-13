import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'

const StockSearch = ({onAdd}) => {
    const [text, setText] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        const upperText = text.toUpperCase()
        onAdd(upperText)

        setText('')
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Add Stock</Form.Label>
                <Form.Control type="text" placeholder="Enter ticker symbol" value={text} onChange={(e) => setText(e.target.value)} />
                <Form.Text className="text-muted">
                    Ex. AAPL or NFLX
                </Form.Text>
            </Form.Group>
        </Form>
    )
}

export default StockSearch
