import { GenderPipe } from './gender.pipe';

describe('GenderPipe', () => {
  let pipe;
  beforeEach(() => {
    pipe = new GenderPipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('should return the complete name gender for a customer', () => {
    expect(pipe.transform('w')).toBe('Women');
    expect(pipe.transform('m')).toBe('Men');
  });
});
