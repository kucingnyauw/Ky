import React from 'react';
import Slider from 'react-slick';
import './style/slide.css';

const MediaSlider = ({ items }) => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
       
        appendDots: dots => (
            <div
                style={{
                    position: 'absolute',
                    bottom: '10px',
                    width: '100%',
                    textAlign: 'center'
                }}
            >
                <ul style={{ margin: '0px', padding: '0px' }}> {dots} </ul>
            </div>
        ),
    };

    return (
        <div className="slider-container">
            <Slider {...settings}>
                {items.map((item, index) => (
                    <div key={index} className="slider-item">
                        {item.videoUrl ? (
                            <video controls className="slider-media">
                                <source src={item.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <img src={item.imageUrl} alt={`Slide ${index}`} className="slider-media" />
                        )}
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default MediaSlider;
