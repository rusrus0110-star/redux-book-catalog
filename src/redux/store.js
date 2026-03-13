import { legacy_createStore as createStore } from "redux";
import booksReducer from "./reducer";

const store = createStore(booksReducer);

export default store;
