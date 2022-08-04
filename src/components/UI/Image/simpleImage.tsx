import React from 'react';
import Image from 'next/image';

interface ImageProps {
  alt: string;
  className?: string;
  height?: string;
  src: string;
  width?: string;
  loading?: 'lazy' | 'eager';
}

const SimpleImage = (props: ImageProps) => {
  const { loading, alt, className, height, src, width, ...rest } = props;
  const dimensionAttributes = {};
  if (typeof height !== 'undefined') {
    dimensionAttributes['--height'] = height + 'px';
  }
  if (typeof width !== 'undefined') {
    dimensionAttributes['--width'] = width + 'px';
  }

  const myLoader = ({ src, width, quality }) => {
    return `${process.env.NEXT_PUBLIC_DOMAIN}${src}?w=${width}&q=${quality || 75}`;
  };
  // Note: Attributes that are allowed to be overridden must appear before the spread of `rest`.
  return (
    <>
      {process.env.NODE_ENV === 'production' ? (
        <img
          loading={loading}
          style={dimensionAttributes}
          {...rest}
          alt={alt}
          className={className}
          height={height}
          src={src}
          width={width}
        />
      ) : (
        /*
        <Image
          loader={process.env.NODE_ENV === 'production' && myLoader}
          loading={loading}
          style={dimensionAttributes}
          {...rest}
          alt={alt}
          className={className}
          height={height}
          src={src}
          width={width} />
       */
        <Image
          loading={loading}
          style={dimensionAttributes}
          {...rest}
          alt={alt}
          className={className}
          height={height}
          src={src}
          width={width}
        />
      )}
    </>
  );
};

export default SimpleImage;
