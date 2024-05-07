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
                if (selectColectivos < 0 || precioColectivos < 0 || precioColectivos > 9999) {
                    Swal.showValidationMessage('Ingrese valores válidos para colectivos (0-9999)');
                    return false;
                }
                valores.push(selectColectivos, precioColectivos);
            }

            if (document.getElementById("selectTrenes").value !== "0") {
                const selectTrenes = parseInt(document.getElementById("selectTrenes").value);
                const precioTrenes = parseInt(document.getElementById("precioTrenes").value);
                if (selectTrenes < 0 || precioTrenes < 0 || precioTrenes > 9999) {
                    Swal.showValidationMessage('Ingrese valores válidos para trenes (0-9999)');
                    return false;
                }
                valores.push(selectTrenes, precioTrenes);
            }

            if (document.getElementById("selectSubtes").value !== "0") {
                const selectSubtes = parseInt(document.getElementById("selectSubtes").value);
                const precioSubtes = parseInt(document.getElementById("precioSubtes").value);
                if (selectSubtes < 0 || precioSubtes < 0 || precioSubtes > 9999) {
                    Swal.showValidationMessage('Ingrese valores válidos para subtes (0-9999)');
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


















