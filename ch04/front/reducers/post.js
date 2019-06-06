export const initialState = {
  mainPosts: [{
    User: {
      id: 1,
      nickname: 'hachicore',
    },
    content: '첫번째 게시글',
    img: 'http://img.hani.co.kr/imgdb/resize/2018/0313/00500561_20180313.JPG',
  }],
  imagePaths: [],
};

export const ADD_POST = 'ADD_POST';
export const ADD_DUMMY = 'ADD_DUMMY';

const addPost = {
  type: ADD_POST,
};

const addDummy = {
  type: ADD_DUMMY,
  data: {
    content: 'Hello',
    UserId: 1,
    User: {
      nickname: 'hachicore',
    },
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
      };
    case ADD_DUMMY:
      return {
        ...state,
        mainPosts: [action.data, ...state.mainPosts],
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
