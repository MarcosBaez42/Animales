function crearRegistro(nombredelamascota, nombredelpropietario, telefono, fecha, tipoMascota, hora, numeroDocumento, estado) {
    var containerResultado = document.getElementById("containerResultado");

    // Crear elemento de registro
    var registro = document.createElement("div");
    registro.classList.add("registro");

    // Crear imagen de la mascota
    var imagenMascota = document.createElement("img");
    imagenMascota.src = "img/" + tipoMascota.toLowerCase() + ".png"; // Ruta de la imagen basada en el tipo de mascota
    imagenMascota.alt = tipoMascota;
    registro.appendChild(imagenMascota);

    // Crear contenedor para detalles del registro
    var detallesRegistro = document.createElement("div");
    detallesRegistro.classList.add("detalles");

    // Crear texto con los detalles del registro
    var detallesTexto = document.createElement("p");
    detallesTexto.innerHTML = "<strong>Nombre:</strong> " + nombredelamascota + "<br>" +
        "<strong>Propietario:</strong> " + nombredelpropietario + "<br>" +
        "<strong>Teléfono:</strong> " + telefono + "<br>" +
        "<strong>Fecha:</strong> " + fecha + "<br>" +
        "<strong>Tipo:</strong> " + tipoMascota + "<br>" +
        "<strong>Hora:</strong> " + hora + "<br>" +
        "<strong>Número de documento:</strong> " + numeroDocumento + "<br>" +
        "<strong>Estado:</strong> " + estado;

    // Agregar detalles al contenedor de registro
    detallesRegistro.appendChild(detallesTexto);
    registro.appendChild(detallesRegistro);

    // Crear botón de eliminar
    var botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.classList.add("btnEliminar");
    botonEliminar.onclick = function() {
        containerResultado.removeChild(registro);
    };
    registro.appendChild(botonEliminar);

    // Crear botón de editar
    var botonEditar = document.createElement("button");
    botonEditar.textContent = "Editar";
    botonEditar.classList.add("btnEditar");
    botonEditar.onclick = function() {
        editarRegistro(registro);
    };
    registro.appendChild(botonEditar);

    // Agregar registro al contenedor de resultados
    containerResultado.appendChild(registro);
}

function editarRegistro(registro) {
    // Obtener los detalles del registro que se está editando
    var detallesRegistro = registro.querySelector(".detalles");

    // Obtener los valores actuales del registro
    var nombredelamascota = detallesRegistro.querySelector("strong:nth-of-type(1)").nextSibling.textContent.trim();
    var nombredelpropietario = detallesRegistro.querySelector("strong:nth-of-type(2)").nextSibling.textContent.trim();
    var telefono = detallesRegistro.querySelector("strong:nth-of-type(3)").nextSibling.textContent.trim();
    var fecha = detallesRegistro.querySelector("strong:nth-of-type(4)").nextSibling.textContent.trim();
    var tipoMascota = detallesRegistro.querySelector("strong:nth-of-type(5)").nextSibling.textContent.trim();
    var hora = detallesRegistro.querySelector("strong:nth-of-type(6)").nextSibling.textContent.trim();
    var numeroDocumento = detallesRegistro.querySelector("strong:nth-of-type(7)").nextSibling.textContent.trim();
    var estado = detallesRegistro.querySelector("strong:nth-of-type(8)").nextSibling.textContent.trim();

    // Llenar el formulario con los datos del registro
    document.getElementById("nombredelamascota").value = nombredelamascota;
    document.getElementById("nombredelpropietario").value = nombredelpropietario;
    document.getElementById("telefono").value = telefono;
    document.getElementById("fecha").value = fecha;
    document.getElementById("tipoMascota").value = tipoMascota;
    document.getElementById("hora").value = hora;
    document.getElementById("numeroDocumento").value = numeroDocumento;
    document.getElementById("estadoFiltro").value = estado;

    // Eliminar el registro existente
    var containerResultado = document.getElementById("containerResultado");
    containerResultado.removeChild(registro);

    // Cambiar el evento onclick del botón Enviar para que llame a una función de actualización de registro
    var botonEnviar = document.getElementById("btnEnviar");
    if (botonEnviar) {
        botonEnviar.onclick = function() {
            actualizarRegistro(registro);
        };
    }
}

function actualizarRegistro(registro) {
    // Obtener los valores actualizados del formulario
    var nombredelamascota = document.getElementById("nombredelamascota").value;
    var nombredelpropietario = document.getElementById("nombredelpropietario").value;
    var telefono = document.getElementById("telefono").value;
    var fecha = document.getElementById("fecha").value;
    var tipoMascota = document.getElementById("tipoMascota").value;
    var hora = document.getElementById("hora").value;
    var numeroDocumento = document.getElementById("numeroDocumento").value;
    var estado = document.getElementById("estadoFiltro").value;

    // Obtener el contenedor de detalles del registro
    var detallesRegistro = registro.querySelector(".detalles");

    // Validar los campos
    if (nombredelamascota === "" || nombredelpropietario === "" || telefono === "" || fecha === "" || tipoMascota === "" || hora === "" || numeroDocumento === "" || estado === "") {
        mostrarAlerta("Faltan datos en el formulario.");
        return;
    }

    // Actualizar los detalles del registro
    detallesRegistro.innerHTML = "<strong>Nombre:</strong> " + nombredelamascota + "<br>" +
        "<strong>Propietario:</strong> " + nombredelpropietario + "<br>" +
        "<strong>Teléfono:</strong> " + telefono + "<br>" +
        "<strong>Fecha:</strong> " + fecha + "<br>" +
        "<strong>Tipo:</strong> " + tipoMascota + "<br>" +
        "<strong>Hora:</strong> " + hora + "<br>" +
        "<strong>Número de documento:</strong> " + numeroDocumento + "<br>" +
        "<strong>Estado:</strong> " + estado;

    // Restaurar el evento onclick original del botón Enviar
    var botonEnviar = document.getElementById("btnEnviar");
    if (botonEnviar) {
        botonEnviar.onclick = function() {
            enviar();
        };
    }

    // Limpiar la clase "registro-editando" del registro editado
    registro.classList.remove("registro-editando");
}

function validarTelefono(telefono) {
    return /^\d{10}$/.test(telefono);
}

function validarDocumento(documento) {
    return /^\d{10}$/.test(documento);
}

function validarFecha(fecha) {
    var hoy = new Date();
    var seleccionada = new Date(fecha);
    return seleccionada >= hoy;
}

function validarHora(hora) {
    var horaActual = new Date().getHours();
    var horaSeleccionada = parseInt(hora.substring(0, 2));
    return horaSeleccionada >= 7 && horaSeleccionada < 19;
}

function enviar() {
    var nombredelamascota = document.getElementById("nombredelamascota").value;
    var nombredelpropietario = document.getElementById("nombredelpropietario").value;
    var telefono = document.getElementById("telefono").value;
    var fecha = document.getElementById("fecha").value;
    var tipoMascota = document.getElementById("tipoMascota").value;
    var hora = document.getElementById("hora").value;
    var numeroDocumento = document.getElementById("numeroDocumento").value;
    var estado = document.getElementById("estadoFiltro").value;

    // Validar los campos
    if (nombredelamascota === "" || nombredelpropietario === "" || telefono === "" || fecha === "" || tipoMascota === "" || hora === "" || numeroDocumento === "" || estado === "") {
        mostrarAlerta("Faltan datos en el formulario.");
        return;
    }

    if (!validarTelefono(telefono)) {
        mostrarAlerta("El número de teléfono no es válido.");
        return;
    }

    if (!validarDocumento(numeroDocumento)) {
        mostrarAlerta("El número de documento no es válido.");
        return;
    }

    if (!validarFecha(fecha)) {
        mostrarAlerta("La fecha seleccionada no es válida.");
        return;
    }

    if (!validarHora(hora)) {
        mostrarAlerta("La hora seleccionada no es válida.");
        return;
    }

    // Crear el registro
    crearRegistro(nombredelamascota, nombredelpropietario, telefono, fecha, tipoMascota, hora, numeroDocumento, estado);

    // Limpiar el formulario después de enviar
    limpiarFormulario();
}

function limpiarFormulario() {
    document.getElementById("nombredelamascota").value = "";
    document.getElementById("nombredelpropietario").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("tipoMascota").value = "";
    document.getElementById("hora").value = "";
    document.getElementById("numeroDocumento").value = "";
    document.getElementById("estadoFiltro").value = "";
}

function filtrar() {
    var tipoFiltro = document.getElementById("tipoFiltro").value;
    var registros = document.querySelectorAll(".registro");

    registros.forEach(function(registro) {
        var estadoRegistro = registro.querySelector("strong:nth-of-type(8)").nextSibling.textContent.trim();
        if (tipoFiltro === "Todos" || estadoRegistro === tipoFiltro) {
            registro.style.display = "block";
        } else {
            registro.style.display = "none";
        }
    });
}

function mostrarAlerta(mensaje) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: mensaje,
    });
}