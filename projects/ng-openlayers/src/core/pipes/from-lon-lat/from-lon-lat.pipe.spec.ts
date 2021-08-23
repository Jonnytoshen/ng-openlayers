import { FromLonLatPipe } from './from-lon-lat.pipe';

describe('FromLonLatPipe', () => {
  it('create an instance', () => {
    const pipe = new FromLonLatPipe();
    expect(pipe).toBeTruthy();
  });
});
