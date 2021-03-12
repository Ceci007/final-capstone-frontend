import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { create } from 'react-test-renderer';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import combinedReducers from '../reducers';
import Footer from '../components/Footer/Footer';

test('Footer renders correctly', () => {
  const store = createStore(combinedReducers, applyMiddleware(thunk));
  const tree = create(
    <Provider store={store}>
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
