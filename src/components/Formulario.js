import React, { useState } from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types'

const Formulario = ({ crearCita }) => {
	//Crear State de Citas
	const [cita, actualizarCita] = useState({
		mascota: '',
		propietario: '',
		fecha: '',
		hora: '',
		sintomas: ''
	});

	const actualizarState = (event) => {
		actualizarCita({
			...cita,
			[event.target.name]: event.target.value
		});
	};

	const [error, updateError] = useState(false)

	const submitCita = (event) => {
		event.preventDefault();

		//Validar
		if (cita.mascota.trim() === '' || cita.propietario.trim() === '' || cita.fecha.trim() === '' || cita.hora.trim() === '' || cita.sintomas.trim() === '') {
			updateError(true);
			return;
		}

		// Eliminar error
		updateError(false);

		//Asignar un ID
		cita.id = uuid();

		// Crear Cita
		crearCita(cita);

		//Reiniciar el form
		actualizarCita({
			mascota: '',
			propietario: '',
			fecha: '',
			hora: '',
			sintomas: ''
		})
	};

	return (
		<>
			<h2>Crear Cita</h2>

			{error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}

			<form onSubmit={submitCita}>
				<label>Nombre Mascota</label>
				<input
					type="text"
					name="mascota"
					className="u-full-width"
					placeholder="Nombre Mascota"
					onChange={actualizarState}
					value={cita.mascota}
				/>

				<label>Nombre Dueño</label>
				<input
					type="text"
					name="propietario"
					className="u-full-width"
					placeholder="Nombre Dueño de la Mascota"
					onChange={actualizarState}
					value={cita.propietario}
				/>

				<label>Fecha</label>
				<input
					type="date"
					name="fecha"
					className="u-full-width"
					onChange={actualizarState}
					value={cita.fecha}
				/>

				<label>Hora</label>
				<input type="time" name="hora" className="u-full-width" onChange={actualizarState} value={cita.hora} />

				<label>Sintomas</label>
				<textarea className="u-full-width" name="sintomas" onChange={actualizarState} value={cita.sintomas} />

				<button type="submit" className="u-full-witdth button-primary">
					Agregar Cita
				</button>
			</form>
		</>
	);
}

Formulario.propTypes = {
	crearCita: PropTypes.func.isRequired
}

export default Formulario;
