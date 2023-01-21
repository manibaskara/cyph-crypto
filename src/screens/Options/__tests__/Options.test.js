import React from 'react';
import Options from '../Options';
import {render} from '../../../shared/testing/testing';

describe('Options', () => {
  it('renders correctly', () => {
    const {getByText} = render(<Options />);
    expect(getByText('Options')).toBeTruthy();
  });
});
