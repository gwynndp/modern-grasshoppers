import React from 'react';
import scriptLoader from 'react-async-script-loader';


class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stripeLoading: true,
      stripeLoadingError: false,
      submitDisabled: false,
      paymentError: null,
      paymentComplete: false,
      token: null
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        console.log('hi');
         if (!Payment.getStripeToken) {
           // Put your publishable key here
           Stripe.setPublishableKey('pk_test_CHEhIQQMjlQn3nqbMR3n7KHs');
           this.setState({ stripeLoading: false, stripeLoadingError: false });
        }
      }
      else {

        this.setState({ stripeLoading: false, stripeLoadingError: true });

      }
    }
  }

  componentDidMount () {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    if (isScriptLoaded && isScriptLoadSucceed) {
      console.log('hi2');
    }
  }

  onSubmit (event) {

    var self = this;
    event.preventDefault();
    this.setState({ submitDisabled: true, paymentError: null });

    Stripe.createToken(event.target, function(status, response) {
      if (response.error) {

        self.setState({ paymentError: response.error.message, submitDisabled: false });
      }
      else {

        self.setState({ paymentComplete: true, submitDisabled: false, token: response.id });

        console.log('Payment complete!', response, self.state.token);

        $.post( "http://localhost:1337/payment", { token: self.state.token } );
      }
    });
  }

  render() {

      if (this.state.stripeLoading) {
        return (
          <div>Loading</div>
        );
      }

      else if (this.state.stripeLoadingError) {
        return (
          <div>Error</div>
        );
      }

      else if (this.state.paymentComplete) {
        return (
          <div>Payment Complete!</div>
        );
      }

      else {

      return (
        <form onSubmit={this.onSubmit} >
        <span>{ this.state.paymentError }</span><br />
        <input type='text' data-stripe='number' placeholder='credit card number' /><br />
        <input type='text' data-stripe='exp-month' placeholder='expiration month' /><br />
        <input type='text' data-stripe='exp-year' placeholder='expiration year' /><br />
        <input type='text' data-stripe='cvc' placeholder='cvc' /><br />
        <input disabled={this.state.submitDisabled} type='submit' value='Purchase' />
      </form>
      );

     }
    }
  }

export default scriptLoader(['https://js.stripe.com/v2/'])(Payment)