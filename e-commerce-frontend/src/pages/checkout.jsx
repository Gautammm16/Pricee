import React from 'react'
import  {Elements } from "@stripe/react-stripe-js"
import  {loadStripe } from "@stripe/stripe-js"
import CheckoutComp  from '../component/checkoutcomponent'
const Checkout = () => {
  const stripe = loadStripe("pk_test_51MrIdjSDwNSVBNJvOqytGVKjiemyIkvDiJF1bzYKAcBtwPpyb7mSpH3QvTyssOySppjjafd1BfRbgVjWZ96BUIfa00vPOOQAOa")

  return (
      <Elements  stripe={stripe} >

        <CheckoutComp/>
      </Elements>
  )
}

export default Checkout