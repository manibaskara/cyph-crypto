import React from 'react';
import Shortcuts from '../Shortcuts';
import {render} from '../../../shared/testing/testing';

describe('Shortcuts', () => {
  it('renders correctly', () => {
    const {getByText} = render(<Shortcuts />);
    expect(getByText('Shortcuts')).toBeTruthy();
  });
});
