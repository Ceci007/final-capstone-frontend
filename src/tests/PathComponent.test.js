import { create } from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import PathComponent from '../components/PathComponent/PathComponent';

test('PathComponent renders correctly', () => {
  const tree = create(
    <Router>
      <PathComponent />
    </Router>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
