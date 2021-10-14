import { convertCentsToRM } from './helpers';

test('should return 2.50 when convert 250 to RM', () => {
  const converted = convertCentsToRM(250);
  expect(converted).toEqual('2.50');
});
