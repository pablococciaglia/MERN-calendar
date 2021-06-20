import React from 'react'
import { useDispatch } from 'react-redux'
import { eventClearActiveEvent } from '../../actions/events'
import { uiOpenModal } from '../../actions/ui'

export const AddNewFab = () => {

    const dispatch = useDispatch()

    const openModal = () =>{
        dispatch ( eventClearActiveEvent() )
        dispatch( uiOpenModal() )    
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={ openModal }
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
