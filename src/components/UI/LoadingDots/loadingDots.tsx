import React from 'react';
import s from './loadingDots.module.css';

export const LoadingDots: React.FC = () => {
  return (
    <span className={s.root}>
      <span />
      <span />
      <span />
    </span>
  );
};
