export const initialStore = () => {
  return {
    token: localStorage.getItem("token") || null, // Recupera el token si ya existe
    message: null,
    todos: [
      { id: 1, title: "Make the bed", background: null },
      { id: 2, title: "Do my homework", background: null }
    ]
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'login':
      localStorage.setItem("token", action.payload);
      return { ...store, token: action.payload };

    case 'logout':
      localStorage.removeItem("token");
      return { ...store, token: null };

    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };

    case 'add_task':
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    default:
      throw Error('Unknown action.');
  }
}