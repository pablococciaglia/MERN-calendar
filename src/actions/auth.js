import Swal from 'sweetalert2';
import { fetchConToken, fetchSinToken } from '../helpers/fetch'
import { types } from '../types/types'

export const authStartLogin = ( email, password ) => {
    
    return async (dispatch) => {
        const resp = await fetchSinToken ( 'auth' , { email, password }, 'POST' );
        const body = await resp.json();

        if ( body.ok ) {
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch ( authLogin({
                uid: body.uid,
                name :body.name
            }) ) 
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }

}

export const authStartRegister = ( name, email, password) => { 

    return async (dispatch) => {

        const resp = await fetchSinToken ( 'auth/new' , { name, email, password }, 'POST' );
        const body = await resp.json();

        if ( body.ok ) {
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch ( authLogin({
                uid: body.uid,
                name :body.name
            }) ) 
        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }

}

export const authLogin = ( user ) => ({

    type: types.authLogin,
    payload: user

})

export const authCheckingStart = () => {

    return async (dispatch) => {

        const resp = await fetchConToken ( 'auth/renew' );
        const body = await resp.json();

        if ( body.ok ) {
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch ( authLogin({
                uid: body.uid,
                name :body.name
            }) ) 
        } else {
            dispatch( authCheckingFinish() )
        }

    }

}

export const authCheckingFinish = () => ({
    type: types.authCheckingFinish
})

export const authStartTokenRenew = () => ({
    type: types.authStartTokenRenew
})

export const startLogout = () => {
    return ( dispatch ) => {

        localStorage.clear()
        dispatch( authLogout() )
    }
}

const authLogout = () => ({
    type: types.authLogout
})




