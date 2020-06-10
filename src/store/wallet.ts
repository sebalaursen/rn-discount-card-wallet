import { Dispatch } from 'redux';
import Card from '../models/Card';
import { Alert } from 'react-native';

const LOAD_WALLET = 'LOAD_WALLET';
const ADD_CARD = 'ADD_CARD';
const REMOVE_CARD = 'REMOVE_CARD';
const EDIT_CARD = 'EDIT_CARD';

export interface WalletState {
  cards: Card[];
}

export interface LoadWalletAction {
  type: typeof LOAD_WALLET;
  payload: Card[];
}

export interface AddCardAction {
  type: typeof ADD_CARD;
  payload: Card;
}

export interface RemoveCardAction {
  type: typeof REMOVE_CARD;
  payload: number;
}

export interface EditCardAction {
  type: typeof EDIT_CARD;
  payload: [number, Card];
}

export type WalletActionTypes = LoadWalletAction | AddCardAction | RemoveCardAction | EditCardAction;

const defaultState: WalletState = {
  cards: [],
};

export default function reducer(state: WalletState = defaultState, action: WalletActionTypes): WalletState {
  switch (action.type) {
    case LOAD_WALLET:
      return {
        cards: action.payload,
      };
    case ADD_CARD:
      return Object.assign({}, state, {
        cards: [...state.cards, action.payload],
      });
    case REMOVE_CARD:
      return Object.assign({}, state, {
        cards: state.cards.filter((card, index) => index !== action.payload),
      });
    case EDIT_CARD:
      Object.assign({}, state, {
        cards: state.cards.map((card, index) => {
          if (index === action.payload[0]) {
            return Object.assign({}, card, action.payload[1]);
          }
        }),
      });
    default:
      return state;
  }
}

export function load() {
  return (dispatch: Dispatch<WalletActionTypes>) => {
    return dispatch<LoadWalletAction>({
      type: LOAD_WALLET,
      payload: [
        {
          name: 'CCC',
          code: '3410252482043',
          isFavourite: false,
        },
        {
          name: 'Fishka',
          code: '35253252456234633',
          isFavourite: false,
        },
        {
          name: 'Сільпо',
          code: '35253252456234633',
          isFavourite: false,
        },
        {
          name: '7/11',
          code: '3523634563442',
          isFavourite: false,
        },
        {
          name: 'Coffe',
          code: '24534523566333',
          isFavourite: false,
        },
      ],
    });
  };
}

export function add(card: Card, cards: Card[]) {
  return (dispatch: Dispatch<WalletActionTypes>) => {
    if (cards.filter((ca) => ca.code === card.code || ca.name === card.name)) {
      dispatch<AddCardAction>({ type: ADD_CARD, payload: card });
    } else {
      Alert.alert('Alert', 'Card with this code or name already exists in your wallet.');
    }
  };
}

export function remove(index: number) {
  return (dispatch: Dispatch<WalletActionTypes>) => {
    dispatch<RemoveCardAction>({ type: REMOVE_CARD, payload: index });
  };
}

export function edit(index: number, card: Card, cards: Card[]) {
  return (dispatch: Dispatch<WalletActionTypes>) => {
    if (cards.filter((ca) => ca.name === card.name || ca.name === card.name)) {
      dispatch<EditCardAction>({ type: EDIT_CARD, payload: [index, card] });
    } else {
      Alert.alert('Alert', 'Card with this code or name already exists in your wallet.');
    }
  };
}
