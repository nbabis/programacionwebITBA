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
            </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Calcular el costo', // Cambiar el texto del botón "OK" por "Calcular"
        preConfirm: () => {
            return [
                parseInt(document.getElementById("selectColectivos").value),
                parseInt(document.getElementById("selectTrenes").value),
                parseInt(document.getElementById("selectSubtes").value)
            ];
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
    const precios = [320, 169, 125];
    let costo = 0;

    for (let i = 0; i < valores.length; i++) {
        costo += valores[i] * precios[i];
    }

    return costo;
}














