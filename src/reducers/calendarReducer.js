import { types } from "../types/types";

const initialState = {
    events: [],
    activeEvent: null
};

export const calendarReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }

        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }
            
        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }
     
        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(
                    e => ( e._id === action.payload._id ) ? action.payload : e
                )
            }

        case types.eventDeleted:
            return {

                ...state,
                events: state.events.filter(
                    e => ( e._id !== state.activeEvent._id )
                ),
                activeEvent: null

            }

        case types.eventLoadedEvents:
            return {
                ...state,
                events: [...action.payload]
            }

        case types.eventClearOnLogout:
            return {
                ...initialState
            }

        default:
            return state;
    }
}