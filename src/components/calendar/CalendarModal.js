import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventStartAddNew, eventClearActiveEvent, eventStartUpdate } from '../../actions/events';

const customStyles = {

    content: {

        top         : '50%',
        left        : '50%',
        right       : 'auto',
        bottom      : 'auto',
        marginRight : '-50%',
        transform   : 'translate(-50%, -50%)',

    },
    
};

Modal.setAppElement('#root');

const now = (moment().minutes(0).seconds(0).add(1,'hours'));
const nowPlus1 = (moment().minutes(0).seconds(0).add(2,'hours'));

const initEvent = {

    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate(),

}

export const CalendarModal = () => {

    const dispatch = useDispatch()

    const { activeEvent } = useSelector( state => state.calendar )
    const { modalOpen } = useSelector( state => state.ui )

    const [ dateStart, setDateStart ] = useState ( now.toDate() );
    const [ dateEnd, setDateEnd ] = useState ( nowPlus1.toDate() );

    const [ formValues, setFormValues ] = useState( initEvent );
    const { notes, title, start, end } = formValues;

    useEffect(() => {
        if ( activeEvent ){
            setFormValues( activeEvent )
        } else {
            setFormValues(initEvent)
        }
    }, [setFormValues, activeEvent])
    
    const handleStartDateChange = (e) => {
        setDateStart (e)
        setFormValues ({
            ...formValues,
            start: e
        })
    }
    
    const handleEndDateChange = (e) => {
        setDateEnd (e)
        setFormValues ({
            ...formValues,
            end: e
        })
    }
    
    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }
  
    const closeModal = () => {

        setFormValues( initEvent )
        dispatch( uiCloseModal() );
        dispatch( eventClearActiveEvent() );

    }   

    const handleSubmit = (e) => {

        e.preventDefault();

        const momentStart = moment( start );
        const momentEnd = moment( end );
        
        if ( momentStart.isSameOrAfter ( momentEnd ) ) {
            return Swal.fire('Error', 'La fecha de finalizacion debe ser mayor que la fecha de inicio', 'error')
        }
        
        if ( title.trim().length <3 ) {
            return Swal.fire('Error', 'El título debe tener más de 2 caracteres', 'error')
        }

        if ( activeEvent ) {
            dispatch ( eventStartUpdate ( formValues ) )
        } else {
            dispatch( eventStartAddNew( formValues ) );
        }

        closeModal();
    }
    

    return (
        
        <Modal
            isOpen={ modalOpen }
            onRequestClose={ closeModal }
            style={ customStyles } 
            closeTimeoutMS={ 200 }
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1> { ( activeEvent ) ? 'Editar evento' : 'Nuevo evento' }  </h1>
            <hr />
            <form 
                className="container"
                onSubmit={ handleSubmit }
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={ handleStartDateChange }
                        value={ dateStart}
                        className="form-control"
                        minDate={moment()._d}
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={ handleEndDateChange }
                        value={ dateEnd }
                        minDate={ dateStart }
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    
    )
}
