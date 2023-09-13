const defaultState = { count: 0 };

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export function countReducer(state = defaultState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
  }
  return state;
}

export const incrementCreator = () => {
  INCREMENT;
};
export const decrementCreator = () => {
  DECREMENT;
};
