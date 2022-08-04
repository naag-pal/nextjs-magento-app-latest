import React from 'react';
import SimpleImage from './simpleImage';

interface ImageProps {
  alt?: string;
  className?: string;
  height?: string;
  src: string;
  width?: string;
}

const Image = (props: ImageProps) => {
  const { alt, className, height, src, width, ...rest } = props;
  return (
    <>
      <SimpleImage
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

export default Image;
