import React, { ReactNode } from 'react';
import times from 'lodash/times';
import { BackgroundView } from '../common';
import { HeartAnimated } from './HeartAnimated';

interface IProps {
  children: ReactNode;
}

export const Background = ({ children }: IProps) => {
  return (
    <BackgroundView>
      {times(20, (i) => (
        <HeartAnimated key={`heart-${i}`} />
      ))}
      {children}
    </BackgroundView>
  );
};
