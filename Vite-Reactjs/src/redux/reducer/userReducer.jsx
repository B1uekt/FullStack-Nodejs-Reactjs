import { FETCH_USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from '../action/userAction';
const INITIAL_STATE = {
    account: {
        access_token: '',
        address: '',
        email: '',
        firstName: '',
        lastName: '',
        role: '',
        phone: '',
    },
    isAuthenticated: false
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            console.log('>>>>check action: ', action?.payload?.access_token,)
            return {
                ...state, account: {
                    access_token: action?.payload?.access_token,
                    address: action?.payload?.user?.address,
                    email: action?.payload?.user?.email,
                    firstName: action?.payload?.user?.firstName,
                    lastName: action?.payload?.user?.lastName,
                    role: action?.payload?.user?.role,
                    phone: action?.payload?.user?.phone,
                },
                isAuthenticated: true
            };
        case USER_LOGOUT_SUCCESS:
            return {
                account: {
                    access_token: '',
                    address: '',
                    email: '',
                    firstName: '',
                    lastName: '',
                    role: '',
                    phone: '',
                },
                isAuthenticated: false
            };
        default: return state;
    }
};

export default userReducer;