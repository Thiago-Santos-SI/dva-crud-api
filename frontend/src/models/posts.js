import {fetchItems, deleteItem, createItem, editItem, fetchItemsAPI} from "../services/api";
import {routerRedux} from "dva/router";
import pathToRegExp from 'path-to-regexp';
export default {
  namespace: "posts",

  state: {
    items:[],
    logging:false
  },

  reducers: {
    //PAYLOAD É O ITEM QUE EU QUERO SALVAR
    //PAYLOAD É OQ VALOR Q EU RECEBO. (ID, TEXT, ETC)

    //o saveItems pega todos os items da api salva no estado de items[]. ele é chamado pelo getitems
    saveItems(state, { payload }) {

      //COPIO TUDO QUE TEM EM STATE E SOBREPONHO EM ITEMS[]: PAYLOAD ( QUE SOBREPOE O VALUE)
      return { ...state, items: payload, logging: true };
    },

    //SOBREPONHO O PAYLOAD PRA id
    delItem(state, { payload: id  }) {
      const previousState = state.items;
      const newState = previousState.filter(item => item.id !== id);
      return {...state, items: newState };

    },

    createPost(state, { payload }){
      //Since fake api returns the id as 101 always
      const item = {
        userId: payload.userId,
        id: state.items.length + 1,
        title: payload.title
      };

      const newStateItems = [...state.items];
      newStateItems[state.items.length] = item;
      console.log(newStateItems);
      return {...state, items: newStateItems};
    },

    editPost(state, { payload }){
      console.log(payload);
      const { id } = payload;
      const newStateItems = [...state.items];
      const index = newStateItems.findIndex(item => item.id === id);
      console.log(index)
      newStateItems[index] = payload;
      return {...state, items: newStateItems };
    }

  },

  effects: {
    //ESSE EFEITO SERVE APENAS PARA CHAMAR O METODO SAVE E SALVAR OS DADOS DA API NO ESTADO DE ARRAY (items[])
    *getItems(action, { call, put }) {
      const items = yield call(fetchItems);
      console.log(items)
      yield put({
        type: "saveItems",
        payload: items.data
      });
    },

    *getItemsAPI(action, { call, put }) {
      const items = yield call(fetchItemsAPI);
      console.log(items)
      yield put({
        type: "saveItems",
        payload: items
      });
    },


    *deleteItem({ payload }, { call, put }){
      call(deleteItem);
      yield put({
        type:"delItem",
        payload:payload
      })
    },

    *postItem({ payload }, { call, put }){
      const { data } = yield call(createItem,payload);
      if ( data ) {
        yield put({
          type:"createPost",
          payload: data
        });
        yield put(routerRedux.push('/'));
      }
    },

    *editItem({payload},{call,put}){
      const {data} = yield call(editItem,payload);
      console.log();
      const combinedData = {
        id: payload.id,
        userId:data.userId,
        title:data.title
      }
      if(data) {
        yield put({
          type:"editPost",
          payload:combinedData
        });
        yield put(routerRedux.push('/'));
      }
    }
  },

  //every time it visits executions starts from history.listem acting as listener function.
  //https://github.com/dvajs/dva-knowledgemap/blob/master/README_en.md#subscription
  //Alteração do histórico de inscrição (url), aciona a ação `load` se o nome do caminho for` / `
  subscriptions: {
    setup: function ({ history, dispatch }) {
      let locate = false;
        history.listen(location => {
            if (pathToRegExp('/').exec(location.pathname)) {
              if(!locate){
                dispatch({
                  type: 'getItemsAPI',
              });
              locate =true;
              }
            }
        });
    }
}
};
