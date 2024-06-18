function abrirCalculadora() {
    Swal.fire({
        title: "Ingrese los valores:",
        html: `
            <div class="select-wrapper">
                <label for="selectColectivos" class="label">Cantidad de colectivos:</label>
                <select id="selectColectivos" class="swal2-select">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <div>
                    <label for="precioColectivos">Precio del boleto de colectivos:</label>
                    <input type="text" id="precioColectivos" class="swal2-input" pattern="[0-9]{1,4}" title="Ingrese un número de hasta 4 dígitos">
                </div>
            </div>
            <div class="select-wrapper">
                <label for="selectTrenes" class="label">Cantidad de trenes:</label>
                <select id="selectTrenes" class="swal2-select">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <div>
                    <label for="precioTrenes">Precio del boleto de trenes:</label>
                    <input type="text" id="precioTrenes" class="swal2-input" pattern="[0-9]{1,4}" title="Ingrese un número de hasta 4 dígitos">
                </div>
            </div>
            <div class="select-wrapper">
                <label for="selectSubtes" class="label">Cantidad de subtes:</label>
                <select id="selectSubtes" class="swal2-select">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <div>
                    <label for="precioSubtes">Precio del boleto de subtes:</label>
                    <input type="text" id="precioSubtes" class="swal2-input" pattern="[0-9]{1,4}" title="Ingrese un número de hasta 4 dígitos">
                </div>
            </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Calcular el costo',
        preConfirm: () => {
            const valores = [];

            if (document.getElementById("selectColectivos").value !== "0") {
                const selectColectivos = parseInt(document.getElementById("selectColectivos").value);
                const precioColectivos = parseInt(document.getElementById("precioColectivos").value);
                if (isNaN(selectColectivos) || isNaN(precioColectivos) || selectColectivos < 0 || precioColectivos < 0 || precioColectivos > 9999) {
                    Swal.showValidationMessage('Ingrese valores válidos para colectivos');
                    return false;
                }
                valores.push(selectColectivos, precioColectivos);
            }

            if (document.getElementById("selectTrenes").value !== "0") {
                const selectTrenes = parseInt(document.getElementById("selectTrenes").value);
                const precioTrenes = parseInt(document.getElementById("precioTrenes").value);
                if (isNaN(selectTrenes) || isNaN(precioTrenes) || selectTrenes < 0 || precioTrenes < 0 || precioTrenes > 9999) {
                    Swal.showValidationMessage('Ingrese valores válidos para trenes');
                    return false;
                }
                valores.push(selectTrenes, precioTrenes);
            }

            if (document.getElementById("selectSubtes").value !== "0") {
                const selectSubtes = parseInt(document.getElementById("selectSubtes").value);
                const precioSubtes = parseInt(document.getElementById("precioSubtes").value);
                if (isNaN(selectSubtes) || isNaN(precioSubtes) || selectSubtes < 0 || precioSubtes < 0 || precioSubtes > 9999) {
                    Swal.showValidationMessage('Ingrese valores válidos para subtes');
                    return false;
                }
                valores.push(selectSubtes, precioSubtes);
            }

            return valores;
        }
    }).then((result) => {
        if (!result.dismiss) {
            const costo = calcular_costo(result.value);
            Swal.fire(`El costo aproximado de su viaje es de ${costo} pesos`);
        }
    });

}

document.getElementById('abrirAlertaCalc1').addEventListener('click', abrirCalculadora);
document.getElementById('abrirAlertaCalc2').addEventListener('click', abrirCalculadora);

function calcular_costo(valores) {
    let costoTotal = 0;

    for (let i = 0; i < valores.length; i += 2) {
        const cantidad = valores[i];
        const precio = valores[i + 1];
        costoTotal += cantidad * precio;
    }

    return costoTotal;
}

document.addEventListener('DOMContentLoaded', () => {
    const eventoForm = document.getElementById('evento-form');
    const calendarioSemanal = document.getElementById('calendario-semanal');

    eventoForm.addEventListener('submit', agregarEvento);

    function agregarEvento(e) {
        e.preventDefault();

        const descripcion = document.getElementById('evento-descripcion').value;
        const fechaHora = document.getElementById('evento-fecha-hora').value;

        if (descripcion && fechaHora) {
            const evento = {
                descripcion,
                fechaHora,
                alarma: false
            };

            guardarEvento(evento);
            mostrarEventos();
            eventoForm.reset();
        }
    }

    function guardarEvento(evento) {
        let eventos = JSON.parse(localStorage.getItem('eventos')) || [];
        eventos.push(evento);
        localStorage.setItem('eventos', JSON.stringify(eventos));
    }

    function mostrarEventos() {
        calendarioSemanal.innerHTML = '';
        const eventos = JSON.parse(localStorage.getItem('eventos')) || [];

        eventos.forEach(evento => {
            const div = document.createElement('div');
            div.classList.add('evento');
            div.innerHTML = `
                <p>${evento.descripcion}</p>
                <p>${new Date(evento.fechaHora).toLocaleString()}</p>
                <button class="eliminar-btn" data-fecha="${evento.fechaHora}">Eliminar</button>
                <button class="alarma-btn" data-fecha="${evento.fechaHora}">${evento.alarma ? 'Desactivar Alarma' : 'Activar Alarma'}</button>
            `;
            calendarioSemanal.appendChild(div);
        });

        document.querySelectorAll('.eliminar-btn').forEach(btn => {
            btn.addEventListener('click', eliminarEvento);
        });

        document.querySelectorAll('.alarma-btn').forEach(btn => {
            btn.addEventListener('click', toggleAlarma);
        });
    }

    function eliminarEvento(e) {
        const fechaHora = e.target.getAttribute('data-fecha');
        let eventos = JSON.parse(localStorage.getItem('eventos')) || [];
        eventos = eventos.filter(evento => evento.fechaHora !== fechaHora);
        localStorage.setItem('eventos', JSON.stringify(eventos));
        mostrarEventos();
    }

    function toggleAlarma(e) {
        const fechaHora = e.target.getAttribute('data-fecha');
        let eventos = JSON.parse(localStorage.getItem('eventos')) || [];
        const evento = eventos.find(evento => evento.fechaHora === fechaHora);
        
        if (evento) {
            evento.alarma = !evento.alarma;
            if (evento.alarma) {
                programarAlarma(evento);
            }
        }

        localStorage.setItem('eventos', JSON.stringify(eventos));
        mostrarEventos();
    }

    function programarAlarma(evento) {
        const tiempoActual = new Date().getTime();
        const tiempoEvento = new Date(evento.fechaHora).getTime();
        const tiempoAlarma = tiempoEvento - (30 * 60 * 1000); 

        if (tiempoAlarma > tiempoActual) {
            setTimeout(() => {
                mostrarNotificacion(evento.descripcion);
            }, tiempoAlarma - tiempoActual);
        }
    }

    function mostrarNotificacion(descripcion) {
        if (Notification.permission === 'granted') {
            new Notification('Recordatorio de Evento', {
                body: `El evento "${descripcion}" comenzará en 30 minutos.`
            });
        }
    }

    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }

    mostrarEventos();
});


















