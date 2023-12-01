import React from 'react';
import { Carousel } from 'react-bootstrap';

const MyCarousel = () => {
  return (
    <div className='hahaha'>
    <Carousel interval={2000}> {/* Đặt interval ở đây, ví dụ: 3000ms = 3 giây */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://d2308c07sw6r8q.cloudfront.net/media/wysiwyg/ADLV_VnPay_vnexclusive_2000x823__1.webp"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://d2308c07sw6r8q.cloudfront.net/media/catalog/category/shop1_1109_top_878986.jpg"
          alt="Second slide"
        />
      </Carousel.Item>      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://d2308c07sw6r8q.cloudfront.net/media/catalog/category/shop1_1025_top_736811.jpg"
          alt="thirt slide"
        />
      </Carousel.Item>    </Carousel>
      </div>
  );
};

export default MyCarousel;
