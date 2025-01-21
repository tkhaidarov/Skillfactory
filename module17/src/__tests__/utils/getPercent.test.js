import { getPercent } from '../../utils/getPercent';

describe('test for getPercent function', () => {
   it('should get percent of number', () =>
      expect(getPercent(20, 100)).toBe(20));
   it('should get percent of fractional number', () =>
      expect(getPercent(25, 150.5)).toBe(37.625));
   it('should get negative procent of number', () =>
      expect(getPercent(-20, 50)).toBe(-10));
});
