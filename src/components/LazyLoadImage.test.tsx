import React from 'react';
import renderer from 'react-test-renderer';
import LazyLoadImage from './LazyLoadImage';

it('lazy rendering image', () => {
  const lazyImg = renderer
    .create(<LazyLoadImage src="/logo.svg" heightRatio={0.6}/>)
    .toJSON();
  expect(lazyImg).toMatchSnapshot();
});
