import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  // const userIds = _.uniq(_.map(getState().posts, 'userId'));
  // userIds.forEach(id => dispatch(fetchUser(id)));

  _.chain(getState().posts) // Primer parametro de map
    .map('userId') // Segundo parametro de map
    .uniq() // unicos indices encontrados a lo largo del map anterior
    .forEach(id => dispatch(fetchUser(id))) // recorrer los indices encontrados y compararlos
    .value(); // Ejecutar todo lo anterior sería como un "Execute()" pero se llama "value()"
};

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get('/posts');

  dispatch({
    type: 'FETCH_POSTS',
    payload: response.data
  });
};

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({
    type: 'FETCH_USER',
    payload: response.data
  });
};

// Memoized
// export const fetchUser = id => async dispatch => _fetchUser(id, dispatch);
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({
//     type: 'FETCH_USER',
//     payload: response.data
//   });
// });
