import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { create } from 'react-test-renderer';
import { createStore, applyMiddleware } from 'redux';
import combinedReducers from '../reducers';
import FormDay from '../components/FormDay/FormDay';

test('Footer renders correctly', () => {
  const store = createStore(combinedReducers, applyMiddleware(thunk));
  const tree = create(
    <Provider store={store}>
      <FormDay />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});