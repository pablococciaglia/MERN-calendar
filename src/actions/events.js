import { types } from "../types/types";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import Swal from "sweetalert2";


export const eventStartAddNew = ( event ) => {
    
    return async ( dispatch, getState ) =>{

        const { uid, name } = getState().auth;
        
        try {
            
            const resp = await fetchConToken( 'events', event, 'POST' )
            const body = await resp.json();

            if (body.ok){

                event._id = body.msg._id;
                event.user = {
                    _id: uid,
                    name
                }

                dispatch ( eventAddNew ( event ) )
            }

        } catch (error) {
            console.log (error)
        }

    }

}

const eventAddNew = (event) =>({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
})

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent,
})

export const eventStartUpdate = ( event ) => {

    return async ( dispatch ) => {

        try {
            
            const resp = await fetchConToken( `events/${event._id}`, event ,'PUT' );
            const body = await resp.json();

            if (body.ok){
                dispatch( eventUpdated( event ) )
            } else {
                Swal.fire ('Error', body.msg, 'error')
            }

        } catch (error) {
            console.log(error)
        }

    }

}

const eventUpdated = ( event ) => ({
    
    type: types.eventUpdated,
    payload: event

})

export const eventStartDelete = () => {

    return async ( dispatch, getState ) => {

        const { _id } = getState().calendar.activeEvent;
        
        try {
            
            const resp = await fetchConToken( `events/${_id}`, {} ,'DELETE' );
            const body = await resp.json();

            if (body.ok){
                dispatch( eventDeleted () )
            } else {
                Swal.fire ('Error', body.msg, 'error')
            }

        } catch (error) {
            console.log(error)
        }

    } 

}

const eventDeleted = () => ({
    type: types.eventDeleted,
})

export const eventStartLoadingEvents = () => {
    return async ( dispatch ) => {

        try {

            const resp = await fetchConToken( 'events' );
            const body = await resp.json();
            const events = prepareEvents (body.events)

            dispatch ( eventLoadedEvents( events ) )

        } catch (error) {

            console.log(error)

        }

    }

}

const eventLoadedEvents = (events)=> ({
    type: types.eventLoadedEvents,
    payload: events
})

export const eventClearOnLogout = () => ({
    type: types.eventClearOnLogout
})