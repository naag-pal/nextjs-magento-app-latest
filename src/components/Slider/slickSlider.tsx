import React from 'react';
import Image from '@magentopwa/components/UI/Image';

interface ImageProps {
  alt?: string;
  className?: string;
  height?: string;
  src?: string;
  width?: string;
  loading?: 'lazy' | 'eager';
  style?: string;
}

const SlickSlider = (props: ImageProps) => {
  const { alt, className, height, src, width, ...rest } = props;
  const dimensionAttributes = {};
  if (typeof height !== 'undefined') {
    dimensionAttributes['--height'] = height + 'px';
  }
  if (typeof width !== 'undefined') {
    dimensionAttributes['--width'] = width + 'px';
  }

  // Note: Attributes that are allowed to be overridden must appear before the spread of `rest`.
  return (
    <Image
      loading="lazy"
      style={dimensionAttributes}
      {...rest}
      alt={alt}
      className={className}
      height={height}
      src={src}
      width={width}
    />
  );
};

export default SlickSlider;
