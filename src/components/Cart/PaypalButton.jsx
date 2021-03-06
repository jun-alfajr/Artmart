import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import {withRouter} from 'react-router-dom';

class PayPal extends React.Component {
    render() {
        const onSuccess = (payment) => {
            console.log("The payment was succeeded!", payment);
            this.props.clearCart();
            this.props.history.push('/products/all');
        }
        
        const onCancel = (data) => {
            console.log('The payment was cancelled!', data);
        }
        
        const onError = (err) => {
            console.log("Error!", err);
        }
        
        let env = 'sandbox'; 
        let currency = 'USD'; 
        
        const client = {
            sandbox:    process.env.REACT_APP_APP_ID,
            production: 'YOUR-PRODUCTION-APP-ID',
        }
        // In order to get production's app-ID, you will have to send your app to Paypal for approval first
        // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
        //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
        // For production app-ID:
        //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/
        
        // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
        return (
            <PaypalExpressBtn   env={env} 
                                client={client} 
                                currency={currency} 
                                total={this.props.total} 
                                onError={onError} 
                                onSuccess={onSuccess} 
                                onCancel={onCancel} />
        );
    }
}
export default withRouter(PayPal)