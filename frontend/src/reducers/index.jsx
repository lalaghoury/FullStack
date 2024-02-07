// reducers/index.js
import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import dataReducer from './dataReducer';
import recipesReducer from './recipesReducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  data: dataReducer,
  recipes: recipesReducer,
  // Add more reducers as needed
});

export default rootReducer;
