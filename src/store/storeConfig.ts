import { applyMiddleware, createStore, Dispatch } from 'redux';
import { rootReducer } from './reducer';
import createThunkErrorHandlerMiddleware from 'redux-thunk-error-handler';

export function configureStore() {
  const handleError = (err: any) => {
    console.log(err);
    if (err && err.response) {
      const { status } = err.response;
      if (status === 401 || status === 403) {
        return;
      }
    }
    return;
  };

  const errorHandlerMiddleware = createThunkErrorHandlerMiddleware({
    onError: handleError,
  });
  const middleware = [errorHandlerMiddleware];
  return createStore(rootReducer, applyMiddleware(...middleware));
}
