import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario'
import Cita from './components/Cita'

function App() {
    //Citas en localStorage
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if (!citasIniciales) {
        citasIniciales = [];
    }

    //Arreglo de Citas
    const [citas, guardarCitas] = useState(citasIniciales);

    //se usa cundo cambia el state
    useEffect(() => {
        if (citasIniciales) {
            localStorage.setItem('citas', JSON.stringify(citas));
        } else {
            localStorage.setItem('citas', JSON.stringify([]));
        }
    }, [citas, citasIniciales]);



    //Agregar cita
    const crearCita = cita => {
        guardarCitas([...citas, cita]);
    }

    //Eliminar cita
    const eliminarCita = id => {
        const nuevasCitas = citas.filter(cita => cita.id !== id);
        guardarCitas(nuevasCitas);
    }

    //Mensaje condicional
    const titulo = citas.length === 0 ? 'No hay citas' : 'Administrar tus citas'


    return (
        <>
            <h1>Administrador de Citas</h1>
            <div className="container">
                <div className="row">
                    <div className="one-half column">
                        <Formulario
                            crearCita={crearCita}
                        />
                    </div>
                    <div className="one-half column">
                        <h2>{titulo}</h2>
                        {citas.map(cita => (
                            <Cita
                                key={cita.id}
                                cita={cita}
                                eliminarCita={eliminarCita}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default App;
