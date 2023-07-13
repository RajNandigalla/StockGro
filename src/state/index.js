import { trelloReducer } from "./reducer";
import { createStore } from "./redux";

const store = createStore(trelloReducer);
window.__store__ = store;