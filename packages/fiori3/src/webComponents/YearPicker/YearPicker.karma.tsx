import { YearPicker } from '@lib/YearPicker';
import { mountThemedComponent } from '@shared/tests/utils';
import { expect, use } from 'chai';
import { matchSnapshot } from 'chai-karma-snapshot';
import React from 'react';

use(matchSnapshot);

describe('YearPicker', () => {
  it('Basic Test (generated)', () => {
    const wrapper = mountThemedComponent(<YearPicker />);
    expect(wrapper.debug()).to.matchSnapshot();
  });
});
