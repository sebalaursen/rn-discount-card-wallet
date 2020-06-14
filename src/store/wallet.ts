import { Dispatch } from 'redux';
import Card from '../models/Card';
import { Alert } from 'react-native';

const LOAD_WALLET = 'LOAD_WALLET';
const ADD_CARD = 'ADD_CARD';
const REMOVE_CARD = 'REMOVE_CARD';
const EDIT_CARD = 'EDIT_CARD';
const ERROR = 'ERROR';

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

export interface ErrorAction {
  type: typeof ERROR;
}

export type WalletActionTypes = LoadWalletAction | AddCardAction | RemoveCardAction | EditCardAction | ErrorAction;

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

export function load(): LoadWalletAction {
  const cards: Card[] = [
    {
      name: 'AAA',
      code: '3341234452354355412542',
      isFavourite: false,
    },
    {
      name: 'BBB',
      code: '3123432354124342',
      isFavourite: false,
    },
    {
      name: 'CCC',
      code: '432549823512345000',
      isFavourite: false,
    },
  ];
  const action: LoadWalletAction = {
    type: LOAD_WALLET,
    payload: cards,
  };
  return action;
}

export function add(card: Card, cards: Card[]) {
  if (
    cards.findIndex((val) => val.code === card.code) === -1 &&
    cards.findIndex((val) => val.name === card.name) === -1
  ) {
    return { type: ADD_CARD, payload: card };
  } else {
    Alert.alert('Alert', 'Card with this code or name already exists in your wallet.');
    return { type: ERROR };
  }
}

export function remove(index: number) {
  return { type: REMOVE_CARD, payload: index };
}

export function edit(index: number, card: Card, cards: Card[]) {
  if (!cards.filter((ca) => ca.name === card.name || ca.name === card.name)) {
    return { type: EDIT_CARD, payload: [index, card] };
  } else {
    Alert.alert('Alert', 'Card with this code or name already exists in your wallet.');
    return { type: ERROR };
  }
}
