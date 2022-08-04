import React, { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Arrow from '@magentopwa/components/Icons/Arrow';

export const HomePageBannerSlider = ({ children }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  console.log(currentSlide);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
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
        {loaded && instanceRef.current && (
          <>
            <Arrow left onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()} />

            <Arrow onClick={(e) => e.stopPropagation() || instanceRef.current?.next()} />
          </>
        )}
      </div>

      {/*
      loaded && instanceRef.current && instanceRef.current.track.details.slides && (
        <div className="dots">
          {
            // @ts-ignore to ignore the type checking errors on the next line
            [...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx);
                  }}
                  className={'dot' + (currentSlide === idx ? ' active' : '')}
                ></button>
              );
            })
          }
        </div>
      )
        */}
    </>
  );
};
