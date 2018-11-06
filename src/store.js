import {createStore,combineReducers, applyMiddleware} from "redux";
import dataReducer from './components/reducers/dataReducer'
import reducer2 from './components/reducers/reducer2'
import logger from 'redux-logger'

export default createStore(
    combineReducers({
        updatedata:dataReducer,
        reducer2
    }),
  applyMiddleware(logger)//applymiddleware(urlogger(),otherlogger,....)
  );//(create-reducer,empty js object overwritten by reducers which have their own initial state,middleware)



  
/**for multiple reducer
 * const store =createStore(combineReducers({reducer1,reducer2,....}));
 */