import React, { useEffect, useState } from 'react';

import moment from 'moment'
import 'moment/locale/es' //importacion para pasarlo a español

import { Navbar } from '../ui/Navbar';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import { messages } from '../../helpers/calendar-messages-es'; //configuracion para el calendario en español
import 'react-big-calendar/lib/css/react-big-calendar.css'; //importación de los estilos del calendario que vienen con el paquete npm
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoadingEvents } from '../../actions/events';
import {DeleteEventFab} from '../ui/DeleteEventFab'
import {AddNewFab} from '../ui/AddNewFab'

moment.locale('es'); //metodo para pasar el idioma de moment al español

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

    const {uid} = useSelector (state => state.auth)

    const eventStyleGetter = ( event, start, end, isSelected )=>{ //da el estilo a cada etiqueta con las actividades
        const style = {
            backgroundColor: (uid === event.user._id) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
    
        }
    
        return {
            style
        }
    };
    
    const dispatch = useDispatch()

    const [lastView, setlastView] = useState( localStorage.getItem('lastView') || 'month' ); // maneja cual fue la ultima vista utilizada

    useEffect(() => {
        dispatch( eventStartLoadingEvents() )
    }, [ dispatch ])

    const onDoubleClickEvent = (e) => {
        dispatch( uiOpenModal() )
    }

    const onSelectEvent = (e) => {
        dispatch ( eventSetActive (e) )
    }

    const onViewChange = (e) => { //graba la vista actual, asi cuando vuelvo a entrar en el calendario la app comenzará en la ultima vista utilizada (dia, mes o agenda)
        setlastView(e);
        localStorage.setItem('lastView', e)
    }

    const { events, activeEvent } = useSelector(state => state.calendar)

    const onSelectSlot = (e) => {
        dispatch ( eventClearActiveEvent() )
    }

    return (
        <div className="calendar__screen">
            <Navbar />
            <Calendar
                localizer = { localizer }
                events = { events }
                startAccessor = "start"
                endAccessor = "end"
                messages = { messages }
                eventPropGetter = { eventStyleGetter }
                onDoubleClickEvent = { onDoubleClickEvent }
                onSelectEvent = { onSelectEvent }
                onView = { onViewChange }
                onSelectSlot = { onSelectSlot }
                selectable = { true }
                view = { lastView }
                components={{
                    event: CalendarEvent
                }}
            />

            { activeEvent && <DeleteEventFab /> }
            
            <AddNewFab />
            
            <CalendarModal />
        </div>
    )
}
