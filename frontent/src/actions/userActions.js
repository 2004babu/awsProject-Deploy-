import {
    loginFail,
    loginRequest, 
    loginSuccess, 
    clearError,
    registerFail,
    registerRequest,
    registerSuccess,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logoutSuccess,
    logoutFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail,
    logoutRequest
} from '../slices/authSlice';

import {usersRequest,usersRequestSuccess,usersFail,userRequest,userSuccess, usersSuccess, userFail, deleteUserRequest, deleteUserSuccess, deleteUserFail, updateUserRequest, updateUserSuccess, updateUserFail} from '../slices/userSlice'

// import {
//     usersRequest,
//     usersSuccess,
//     usersFail,
//     userRequest,
//     userSuccess,
//     userFail,
//     deleteUserRequest,
//     deleteUserSuccess,
//     deleteUserFail,
//     updateUserRequest,
//     updateUserSuccess,
//     updateUserFail

// } from '../slices/userSlice'

import axios from 'axios';

export const login = (email, password) => async (dispatch) => {

        try {
            dispatch(loginRequest())
            const { data }  = await axios.post(`/api/v1/login`,{email,password});
            dispatch(loginSuccess(data))
        } catch (error) {
            dispatch(loginFail(error.response.data.message))
        }

}

export const clearAuthError = dispatch => {
    dispatch(clearError())
}

export const register = (userData) => async (dispatch) => {

    try {
        dispatch(registerRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const { data }  = await axios.post(`/api/v1/register`,userData, config);
        dispatch(registerSuccess(data))
    } catch (error) {
        dispatch(registerFail(error.response.data.message))
    }

}



export const loadUser=async(dispatch)=>{
try {
    dispatch(loadUserRequest())
    const {data}=await axios.get('/api/v1/myProfile')
    dispatch(loadUserSuccess(data))
} catch (error) {
    dispatch(loadUserFail())
}
}


export const updateProfile=  (FormData)=>async(dispatch)=>{
    try {
        
        dispatch(updateProfileRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const {data} =await axios.put('/api/v1/update',FormData,config)
        dispatch(updateProfileSuccess(data))

    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message))
        
    }
}


export const logOut=async(dispatch)=>{
    try {
        dispatch(logoutRequest())
        await axios.get('/api/v1/logout')
        dispatch(logoutSuccess())
    } catch (error) {
        dispatch(logoutFail())
        
    }
}







export const UpdatePassword=  (FormData)=>async(dispatch)=>{

    try {
        
        dispatch(updatePasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const {data} =await axios.put('/api/v1/password/change',FormData,config)
        dispatch(updatePasswordSuccess(data))

    } catch (error) {
        dispatch(updatePasswordFail(error.response.data.message))
        
    }
}

export const forgotpassword = (userData)=>async(dispatch)=>{

    try {
        
        dispatch(forgotPasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/v1/password/forgot',userData,config)
        if(!data){
                throw Error('not found data')
        }
        dispatch(forgotPasswordSuccess(data))

    } catch (error) {
        dispatch(forgotPasswordFail(error.response.data.message))
        
    }
}





export const resetPassword = (userData)=>async(dispatch)=>{

    try {
        
        dispatch(resetPasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const {data} = await axios.post(`/api/v1/password/reset`,userData,config)
        if(!data){
                throw Error('not found data')
        }
        dispatch(resetPasswordSuccess(data))

    } catch (error) {
        dispatch(resetPasswordFail(error.response.data.message))
        
    }
}






export const getAllUsers =  async (dispatch) => {

    try {
        dispatch(usersRequest())
        const { data }  = await axios.get(`/api/v1/admin/users`);
        dispatch(usersSuccess(data))
    } catch (error) {
        dispatch(usersFail(error.response.data.message))
    }

}

export const getUser = id=> async (dispatch) => {

    try {
        dispatch(userRequest())
        const { data }  = await axios.get(`/api/v1/admin/user/${id}`);
        dispatch(userSuccess(data))
    } catch (error) {
        dispatch(userFail(error.response.data.message))
    }

}

export const deleteUser =id=>  async (dispatch) => {

    try {
        dispatch(deleteUserRequest())
         await axios.delete(`/api/v1/admin/user/${id}`);
        dispatch(deleteUserSuccess())
    } catch (error) {
        dispatch(deleteUserFail(error.response.data.message))
    }

}
export const updateUser =(id ,FormData) =>  async (dispatch) => {

    try {
        const Config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        dispatch(updateUserRequest())
        const {data}= await axios.put(`/api/v1/admin/user/${id}`,FormData,Config);
        dispatch(updateUserSuccess(data))
    } catch (error) {
        dispatch(updateUserFail(error.response.data.message))
    }

}