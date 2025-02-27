import authReducer, { registerUser, login, logout } from '../radux/authslice';

describe('authSlice', () => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    users: [],
  };

  test('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  test('should register a new user and set user in localStorage', () => {
    const user = { id: 1, email: 'user@example.com' };
    const action = registerUser(user);

    const state = authReducer(initialState, action);

    expect(state.users).toContainEqual(user);
    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBe(true);
    expect(localStorage.getItem('user')).toEqual(JSON.stringify(user));
    expect(JSON.parse(localStorage.getItem('users'))).toContainEqual(user);

  });

  test('should log in an existing user', () => {
    const user = { id: 1, email: 'user@example.com' };
    const action = login(user);

    const state = authReducer(initialState, action);

    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBe(true);
    expect(localStorage.getItem('user')).toEqual(JSON.stringify(user));
  });

  test('should log out and remove user from localStorage', () => {
    const action = logout();
    const state = authReducer(initialState, action);

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(localStorage.getItem('user')).toBeNull();
  });
});
