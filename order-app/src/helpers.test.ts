import { isValidOrderStatus } from './helpers';

test('should return true for status confirmed', () => {
  const confirmedAvailable = isValidOrderStatus('confirmed');

  expect(confirmedAvailable).toEqual(true);
});

test('should return false for status notconfirmed', () => {
  const confirmedAvailable = isValidOrderStatus('notconfirmed');

  expect(confirmedAvailable).toEqual(false);
});
