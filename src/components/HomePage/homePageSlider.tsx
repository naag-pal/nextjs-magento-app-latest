import React, { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Arrow from '@magentopwa/components/Icons/Arrow';

export const HomePageSlider = ({ children }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    breakpoints: {
      '(min-width: 400px)': {
        slides: { perView: 1, spacing: 5 },
      },
      '(min-width: 1000px)': {
        slides: { perView: 4, spacing: 10 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <>
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {children}
        </div>
        {loaded && instanceRef.current && instanceRef.current?.track?.details?.slides && (
          <>
            <Arrow
              left
              onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()}
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
              disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
            />
          </>
        )}
      </div>
    </>
  );
};
