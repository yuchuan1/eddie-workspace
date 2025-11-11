import React from 'react';

describe('Import Test', () => {
  it('should import React', () => {
    expect(React).toBeDefined();
  });

  it('should work with basic math', () => {
    expect(2 + 2).toBe(4);
  });
});
