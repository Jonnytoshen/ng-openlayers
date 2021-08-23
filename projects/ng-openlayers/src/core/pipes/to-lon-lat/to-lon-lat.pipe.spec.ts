import { ToLonLatPipe } from './to-lon-lat.pipe';

describe('ToLonLatPipe', () => {
  it('create an instance', () => {
    const pipe = new ToLonLatPipe();
    expect(pipe).toBeTruthy();
  });
});
