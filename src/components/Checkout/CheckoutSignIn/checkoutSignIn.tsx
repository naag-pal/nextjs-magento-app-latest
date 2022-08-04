import React from 'react';
import { Button } from '@magentopwa/components/UI';
import Link from 'next/link';

export const CheckoutSignIn = (props) => {
  console.log(props);
  return (
    <div className="signin-form border-2 border-spacing-2 w-50 p-2 rounded-lg max-w-sm md:max-w-lg mb-4 text-center">
      <div className="m-4 ">Sign in for Express Checkout</div>
      <Link href="/sign-in">
        <Button variant="primary">Sign in</Button>
      </Link>
    </div>
  );
};
