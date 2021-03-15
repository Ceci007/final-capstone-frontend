import axios from 'axios';

export const DISPLAY_FETCHED_DAYS = 'DISPLAY FETCHED DAYS';
export const CREATE_DAY = 'CREATE DAY';
export const DELETE_DAY = 'DELETE DAY';
export const CREATE_DAY_ERROR = 'CREATE DAY ERROR';
export const UPDATE_DAY = 'UPDATE DAY';

export const fetchIllnessDays = (userId, illnessId) => dispatch => axios.get(`https://tracking-api-ceci.herokuapp.com/users/${userId}/illnesses/${illnessId}/trackings`)
  .then(response => response.data)
  .then(data => {
    dispatch({
      type: DISPLAY_FETCHED_DAYS,
      payload: data,
    });
  })
  .catch(error => {
    throw (error);
  });

export const createDay = data => async dispatch => {
  try {
    const response = await axios({
      method: 'POST',
      url: `https://tracking-api-ceci.herokuapp.com/users/${data.userId}/illnesses/${data.illnessId}/trackings `,
      data,
      crossdomain: true,
      withCredentials: true,
    });
    dispatch({
      type: CREATE_DAY,
      data: {
        ...data,
        id: response.data.id ? response.data.id : null,
      },

    });
  } catch (error) {
    dispatch({ type: CREATE_DAY_ERROR, payload: error });
  }
};

export const deleteDay = data => async dispatch => {
  try {
    dispatch({ type: DELETE_DAY, payload: data });
    const response = await axios({
      method: 'DELETE',
      url: `https://tracking-api-ceci.herokuapp.com/users/${data.userId}/illnesses/${data.illnessId}/trackings/${data.id}`,
      data,
      crossdomain: true,
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return (error);
  }
};

export const updateDay = data => async dispatch => {
  try {
    dispatch({ type: UPDATE_DAY, payload: data });
    const response = await axios({
      method: 'PATCH',
      url: `https://tracking-api-ceci.herokuapp.com/users/${data.userId}/illnesses/${data.illnessId}/trackings/${data.id}`,
      data,
      crossdomain: true,
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return (error);
  }
};
