import {applyMiddleware, createStore} from "redux";
import rootReducer from './reducers/reducers'
import {Provider} from "react-redux";
import thunk from "redux-thunk"
import {composeWithDevTools} from 'redux-devtools-extension'



const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

const DataProvider = ({children}) => {
    return (
        <Provider store = {store}>
            {children}
        </Provider>
    )
}

export default DataProvider

