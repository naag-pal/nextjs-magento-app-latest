import React from 'react';
import SlickSlider from './slickSlider';

interface ImageProps {
  alt?: string;
  className?: string;
  height?: string;
  src: string;
  width?: string;
}

const Slider = (props: ImageProps) => {
  const { alt, className, height, src, width, ...rest } = props;
  return (
    <>
      <SlickSlider
        src={src}
        alt={alt ? alt : ''}
        {...rest}
        className={className ? className : ''}
        height={height ? height : ''}
        width={width ? width : ''}
      />
    </>
  );
};

export default Slider;
