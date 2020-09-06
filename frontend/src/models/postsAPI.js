import { createItem } from "../services/apiPosts";
import pathToRegExp from 'path-to-regexp';
import {fetchItems} from "../services/api";

export default {
  namespace: "postsAPI",

  state: {
    itemsState:[],
    logging: false
  },

  reducers: {
    //PAYLOAD É O ITEM QUE EU QUERO SALVAR
    //PAYLOAD É OQ VALOR Q EU RECEBO. (ID, TEXT, ETC)
    saveItems(state, { payload }) {
      //COPIO TUDO QUE TEM EM STATE E SOBREPONHO EM ITEMS[]: PAYLOAD ( QUE SOBREPOE O VALUE)
      return { ...state, itemsState: payload, logging: true };
    },

    //o saveItems pega todos os items da api salva no estado de items[]. ele é chamado pelo getitems

    createPost(state, { payload: { title, body } }){
      //Since fake api returns the id as 101 always
      const item = {
        id: state.itemsState.length + 1,
        title,
        body
      };

      const newStateItems = [...state.itemsState];
      newStateItems[state.itemsState.length] = item;
      console.log(newStateItems);
      return {...state, itemsState: newStateItems};
    },

  },

  effects: {
    *postItem({ payload }, { call, put }){
      try {
        const { data } = yield call(createItem,payload);
        if ( data ) {
          yield put({
            type:"createPost",
            payload: data
          });
        }
      }catch (e){
        console.log(e)
      }
    },

    *getItems(action, { call, put }) {
      const items = yield call(fetchItems);
      yield put({
        type: "saveItems",
        payload: items.data
      });
    },

  },

  //every time it visits executions starts from history.listem acting as listener function.
  subscriptions: {
    setup: function ({ history, dispatch }) {
      let locate = false;
      history.listen(location => {
        if (pathToRegExp('/').exec(location.pathname)) {
          if(!locate){
            dispatch({
              type: 'getItems',
            });
            locate =true;
          }
        }
      });
    }
  }
};
