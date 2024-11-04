import React from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';

const CheckoutForm = () => {
  return (
    <Container className="mt-5 p-4" style={{ backgroundColor: '#0b0d2a', color: 'white', borderRadius: '10px', maxWidth: '600px' }}>
      <h2 className="mb-4">Thanh toán để tăng sức mạnh cho Quizlet</h2>

      {/* Order Summary */}
      <Row className="mb-4">
        <Col>
          <div style={{ backgroundColor: '#1d1e33', padding: '20px', borderRadius: '10px' }}>
            <Form>
              <Form.Group controlId="planSelection">
                <Form.Check
                  type="radio"
                  label="Theo năm 35,99 US$/năm"
                  name="subscriptionPlan"
                  defaultChecked
                  className="mb-3"
                  style={{ color: 'white' }}
                />
                <Form.Check
                  type="radio"
                  label="Theo tháng 7,99 US$/tháng"
                  name="subscriptionPlan"
                  style={{ color: 'white' }}
                />
              </Form.Group>
            </Form>
          </div>
        </Col>
      </Row>

      {/* Payment Methods */}
      <Row className="mb-4">
        <Col>
          <Button variant="outline-light" style={{ width: '100%', marginBottom: '10px' }}>PayPal</Button>
        </Col>
        <Col>
          <Button variant="outline-light" style={{ width: '100%', marginBottom: '10px' }}>G Pay</Button>
        </Col>
      </Row>

      {/* Credit Card Form */}
      <Form>
        <Form.Group controlId="cardNumber" className="mb-3">
          <Form.Label>Số thẻ</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="1234 5678 9101 1121"
              style={{ backgroundColor: '#141629', color: 'white', border: '1px solid #ccc' }}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="cardName" className="mb-3">
          <Form.Label>Tên trên thẻ</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Nguyen Van A"
              style={{ backgroundColor: '#141629', color: 'white', border: '1px solid #ccc' }}
            />
          </InputGroup>
        </Form.Group>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="expiryDate">
              <Form.Label>Ngày hết hạn</Form.Label>
              <Form.Control
                type="text"
                placeholder="MM/YY"
                style={{ backgroundColor: '#141629', color: 'white', border: '1px solid #ccc' }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="cvc">
              <Form.Label>CVC</Form.Label>
              <Form.Control
                type="text"
                placeholder="123"
                style={{ backgroundColor: '#141629', color: 'white', border: '1px solid #ccc' }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="country" className="mb-3">
          <Form.Label>Quốc gia</Form.Label>
          <Form.Control as="select" defaultValue="Vietnam" style={{ backgroundColor: '#141629', color: 'white', border: '1px solid #ccc' }}>
            <option>Vietnam</option>
            <option>USA</option>
            {/* Add other countries as needed */}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" style={{ width: '100%', backgroundColor: '#5054a4', border: 'none' }}>
          Hoàn tất đơn hàng
        </Button>
      </Form>
    </Container>
  );
};

export default CheckoutForm;
