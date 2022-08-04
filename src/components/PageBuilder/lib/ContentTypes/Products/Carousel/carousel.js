import React from 'react';
import SlickSlider from 'react-slick';
import ProductCard from '@magentopwa/components/ProductCard/productCard';
import { useCarousel } from './useCarousel';

const Carousel = props => {
    const { settings, items } = props;

    const { storeConfig } = useCarousel();

    const galleryItems = items.map((item, index) => {
        return (
            <ProductCard key={index} product={item} storeConfig={storeConfig} />
        );
    });

    return <SlickSlider {...settings}>{galleryItems}</SlickSlider>;
};

export default Carousel;
