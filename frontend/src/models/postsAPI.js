import { createItem, fetchItems, deleteItem } from "../services/apiPosts";
import pathToRegExp from 'path-to-regexp';
import {routerRedux} from "dva/router";

export default {
  namespace: "postsAPI",

  state: {
    items:[],
    logging: false
  },

  reducers: {
    //PAYLOAD É O ITEM QUE EU QUERO SALVAR
    //PAYLOAD É OQ VALOR Q EU RECEBO. (ID, TEXT, ETC)
    saveItems(state, { payload }) {
      //COPIO TUDO QUE TEM EM STATE E SOBREPONHO EM ITEMS[]: PAYLOAD ( QUE SOBREPOE O VALUE)
      return { ...state, items: payload, logging: true };
    },

    //o saveItems pega todos os items da api salva no estado de items[]. ele é chamado pelo getitems

    createPost(state, { payload: { title, body } }){
      //Since fake api returns the id as 101 always
      const item = {
        id: state.items.length + 1,
        title,
        body
      };

      const newStateItems = [...state.items];
      newStateItems[state.items.length] = item;
      console.log(newStateItems);
      return {...state, items: newStateItems};
    },

    delItem(state, { payload: id  }) {
      const previousState = state.items;
      deleteItem(id)
      const newState = previousState.filter(item => item.id !== id);
      return {...state, items: newState };

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
        //yield put(routerRedux.push('/'));

      }catch (e){
        console.log(e)
      }
    },

    *getItems(action, { call, put }) {
      const items = yield call(fetchItems);
      yield put({
        type: "saveItems",
        payload: items
      });
    },

    *deleteItem({ payload: id }, { call, put }){
      yield put({
        type: "delItem",
        payload: id
      })
    },
  },

  //every time it visits executions starts from history.listem acting as listener function.
  //Alteração do histórico de inscrição (url), aciona a ação `load` se o nome do caminho for` / `
  subscriptions: {
    setup: function ({ history, dispatch }) {
      let locate = false;
      history.listen(location => {
        if (pathToRegExp('/posts' && '/').exec(location.pathname)) {
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
