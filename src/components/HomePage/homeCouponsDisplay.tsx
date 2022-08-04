import React from 'react';
import { Button } from '@magentopwa/components/UI';
import Link from 'next/link';

export const HomeCouponsDisplay = () => {
  return (
    <div>
      <h1 className="h1 text-lg text-bold mt-8 mb-8">
        Coupons
        <span className="float-right">
          <Link href="#" className="cursor-pointer">
            View All
          </Link>
        </span>
      </h1>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
        <div className="bg-th-bg-color-1 border-2 border-th-bg-color-1 p-5">
          VISA Cards - Flat 25% off on Orders Above 499 (FLAT25) <br />
          <Button
            onClick={() => {
              navigator.clipboard.writeText('FLAT25');
            }}
            className="float-right mt-6"
          >
            Copy Code
          </Button>
        </div>
        <div className="bg-th-bg-color-1 border-2 border-th-bg-color-1 p-5">
          SBI Credit Cards - Flat 30% off on Orders Above 999 (SBIFLAT30) <br />
          <Button
            onClick={() => {
              navigator.clipboard.writeText('SBIFLAT30');
            }}
            className="float-right mt-6"
          >
            Copy Code
          </Button>
        </div>
        <div className="bg-th-bg-color-1 border-2 border-th-bg-color-1 p-5">
          AXIS Bank Credit Cards - Flat 35% off on Orders Above 1499 (AXISFLAT35) <br />
          <Button
            onClick={() => {
              navigator.clipboard.writeText('AXISFLAT35');
            }}
            className="float-right mt-6"
          >
            Copy Code
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeCouponsDisplay;
