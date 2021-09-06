const initialState = [];

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD TODO':
      return [...state, action.payload];
    case 'REMOVE TODO':
      return state.filter((todo) => todo.id !== action.payload);
    case 'COMPLETE TODO':
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: true } : { ...todo }
      );
    case 'UPDATE LIST ORDER':
      //? payload should be a new array which has already been reordered
      return action.payload;
    case 'CLEAR COMPLETED':
      return state.filter((todo) => todo.completed === false);

    default:
      return state;
  }
};

export default todoReducer;
