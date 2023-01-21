import React from 'react';
import Portfolio from '../Portfolio';
import {render} from '../../../shared/testing/testing';

describe('Portfolio', () => {
  it('renders correctly', () => {
    const {getByText} = render(<Portfolio />);
  });
});
