import { reverseText } from '../../utils/reverseText.js';

describe('test for reverseText function', () => {
   it('should reverse string', () => expect(reverseText('123')).toBe('321'));
});
