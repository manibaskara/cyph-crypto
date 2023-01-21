import React from 'react';
import Browser from '../Browser';
import {render} from '../../../shared/testing/testing';

describe('Browser', () => {
  it('renders correctly', () => {
    const {getByText} = render(<Browser />);

    expect(getByText('Browser')).toBeTruthy();
  });
});
