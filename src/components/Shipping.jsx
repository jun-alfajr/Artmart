import React from 'react';
import Hero from './Hero';
import {Container, Row, Col} from 'react-bootstrap';


export default function Shipping() {
  return (
    <React.Fragment>
        <Hero pageName={"Shipping Policy"}/>
          <Container>
            <Row>
              <Col className="mt-5 mb-5">
                <p className="mb-5">Thank you for visiting and shopping at Artmart. Following are the terms and conditions that constitute our Shipping Policy.Domestic Shipping Policy</p>
                <h3>Shipment Processing Time</h3>
                <p>All orders are processed within 2-3 business days. Orders are not shipped or delivered on weekends or holidays.</p>
                <p>If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery. If there will be a significant delay in shipment of your order, we will contact you via email or telephone.</p>
                <h3>Shipping rates &amp; delivery estimates</h3>
                <p>Shipping charges for your order will be calculated and displayed at checkout.</p>
                <p><strong>* Overnight delivery is only available for orders with delivery addresses within the continental United States.</strong></p>
                <p><strong>Delivery delays can occasionally occur.</strong></p>
                <h3>Shipment to P.O. boxes or APO/FPO addresses</h3>
                <p>Artmart ships to addresses within the U.S., U.S. Territories, and APO/FPO/DPO addresses.</p>
                <h3>Shipment confirmation &amp; Order tracking</h3>
                <p>You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.</p>
                <h3>Customs, Duties and Taxes</h3>
                <p>Artmart is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).</p>
                <h3>Damages</h3>
                <p>Artmart is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim.</p>
                <p>Please save all packaging materials and damaged goods before filing a claim. International Shipping Policy.</p>
                <h3>Returns Policy</h3>
                <p>Our Return &amp; Refund Policy provides detailed information about options and procedures for returning your order.</p>
          </Col>
          </Row>
      </Container>
    </React.Fragment>
  )
}
