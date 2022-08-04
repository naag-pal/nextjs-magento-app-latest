import React from 'react';
import { CreateAccountAfterCheckout } from './createAccountAfterCheckout';

export const CheckoutCreateAccount = (props) => {
  return (
    <div className="signin-form border-2 border-spacing-2 w-50 p-2 rounded-lg max-w-sm md:max-w-lg mb-4 text-center">
      <CreateAccountAfterCheckout email={props.email} firstname={props.firstname} lastname={props.lastname} />
    </div>
  );
};
