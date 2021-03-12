import { create } from 'react-test-renderer';
import Header from '../components/Header/Header';

test('Header renders correctly', () => {
  const tree = create(
    <Header />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
