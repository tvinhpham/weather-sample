import React, { FC, HtmlHTMLAttributes } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import LazyLoad from 'react-lazyload';

const LazyLoadImage: FC<{ src: string; heightRatio?: number } & HtmlHTMLAttributes<HTMLDivElement>> = ({
  src,
  heightRatio = 1,
  style,
  className,
  ...props
}) => {
  const lazyMask = <Spinner animation="grow" className="position-absolute w-100 h-100" />;
  return (
    <div
      className={`w-100 position-relative ${className}`}
      style={{ paddingTop: heightRatio * 100 + '%', overflow: 'hidden', objectFit: 'cover', ...style }}
      {...props}
    >
      <LazyLoad placeholder={lazyMask} once>
        <img src={src} className="d-none" alt="" />
        <div
          className="position-absolute h-100 w-100"
          style={{
            top: 0,
            backgroundSize: 'cover',
            backgroundColor: '#e6e6e6ba',
            backgroundImage: `url(${src})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50% 50%'
          }}
        />
      </LazyLoad>
    </div>
  );
};

export default LazyLoadImage;
