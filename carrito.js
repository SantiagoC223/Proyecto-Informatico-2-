// ==========================================
// CONFIGURACIÓN
// ==========================================

const CLAVE_CARRITO = "syryndy_carrito_v1";
const CLAVE_STOCK_CARRITO = "syryndy_stock_v1";
const CLAVE_SESION = "syryndy_sesion";

const PRODUCTOS_CARRITO = {

    mezcladora: {
        nombre: "Mezcladora de Café Syryndy",
        precio: 15000
    },

    batidora: {
        nombre: "Batidora Syryndy",
        precio: 100000
    },

    horno: {
        nombre: "Horno Syryndy",
        precio: 200000
    },

    wafflera: {
        nombre: "Wafflera Syryndy",
        precio: 95000
    },

    microondas: {
        nombre: "Microondas Syryndy",
        precio: 250000
    },

    "heladera-chica": {
        nombre: "Heladera Pequeña Syryndy",
        precio: 350000
    },

    "heladera-grande": {
        nombre: "Heladera Grande Syryndy",
        precio: 1050000
    },

    lavarropas: {
        nombre: "Lavarropas Syryndy",
        precio: 600000
    }

};


// ==========================================
// OBTENER Y GUARDAR CARRITO
// ==========================================

function obtenerCarrito() {

    const datos = localStorage.getItem(CLAVE_CARRITO);

    if (datos === null) {
        return [];
    }

    try {

        const carrito = JSON.parse(datos);

        return Array.isArray(carrito) ? carrito : [];

    } catch (error) {

        console.error("Error al cargar el carrito:", error);
        return [];

    }

}


function guardarCarrito(carrito) {

    localStorage.setItem(
        CLAVE_CARRITO,
        JSON.stringify(carrito)
    );

}


// ==========================================
// AGREGAR PRODUCTOS AL CARRITO
// ==========================================

function agregarAlCarrito(id) {

    const producto = PRODUCTOS_CARRITO[id];

    if (!producto) {
        alert("No se encontró este producto.");
        return;
    }

    const inventario = obtenerInventario();
    const productoInventario = inventario[id];

    if (!productoInventario) {
        alert("Este producto no existe en el inventario.");
        return;
    }

    const carrito = obtenerCarrito();

    const productoExistente = carrito.find(
        elemento => elemento.id === id
    );

    const cantidadActual = productoExistente
        ? productoExistente.cantidad
        : 0;

    if (cantidadActual + 1 > productoInventario.stock) {

        alert("No hay suficientes unidades disponibles.");
        return;

    }

    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        carrito.push({

            id: id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1

        });

    }

    guardarCarrito(carrito);

    alert(
        producto.nombre +
        " fue agregado al carrito correctamente."
    );

}


// ==========================================
// FORMATO DE PRECIOS
// ==========================================

function formatearPrecio(precio) {

    return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0
    }).format(precio);

}


// ==========================================
// MOSTRAR PRODUCTOS DEL CARRITO
// ==========================================

function mostrarCarrito() {

    const contenedor = document.getElementById("listaCarrito");
    const totalElemento = document.getElementById("totalCarrito");

    if (!contenedor || !totalElemento) {
        actualizarEstadoSesion();
        return;
    }

    const carrito = obtenerCarrito();

    contenedor.innerHTML = "";

    let total = 0;

    if (carrito.length === 0) {

        contenedor.innerHTML =
            "<p>Tu carrito está vacío.</p>";

    }

    carrito.forEach(producto => {

        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;

        contenedor.innerHTML += `

            <div class="item-carrito">

                <div>

                    <h3>${producto.nombre}</h3>

                    <p>Precio unitario:
                    ${formatearPrecio(producto.precio)}</p>

                    <p>Subtotal:
                    ${formatearPrecio(subtotal)}</p>

                </div>

                <div class="controles-carrito">

                    <button type="button"
                        onclick="cambiarCantidadCarrito('${producto.id}', -1)">
                        -
                    </button>

                    <span>${producto.cantidad}</span>

                    <button type="button"
                        onclick="cambiarCantidadCarrito('${producto.id}', 1)">
                        +
                    </button>

                    <button type="button"
                        onclick="eliminarDelCarrito('${producto.id}')">
                        Eliminar
                    </button>

                </div>

            </div>

            <hr>

        `;

    });

    totalElemento.textContent = formatearPrecio(total);

    actualizarEstadoSesion();

}


// ==========================================
// CAMBIAR CANTIDAD DE PRODUCTOS
// ==========================================

function cambiarCantidadCarrito(id, cambio) {

    const carrito = obtenerCarrito();

    const producto = carrito.find(
        elemento => elemento.id === id
    );

    if (!producto) {
        return;
    }

    if (cambio > 0) {

        const inventario = obtenerInventario();

        if (
            !inventario[id] ||
            producto.cantidad + cambio > inventario[id].stock
        ) {

            alert("No hay suficiente stock disponible.");
            return;

        }

    }

    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {

        const indice = carrito.findIndex(
            elemento => elemento.id === id
        );

        carrito.splice(indice, 1);

    }

    guardarCarrito(carrito);

    mostrarCarrito();

}


// ==========================================
// ELIMINAR PRODUCTO
// ==========================================

function eliminarDelCarrito(id) {

    const carrito = obtenerCarrito();

    const nuevoCarrito = carrito.filter(
        producto => producto.id !== id
    );

    guardarCarrito(nuevoCarrito);

    mostrarCarrito();

}


// ==========================================
// VACIAR CARRITO
// ==========================================

function vaciarCarrito() {

    const confirmar = confirm(
        "¿Estás seguro de que querés vaciar el carrito?"
    );

    if (confirmar) {

        localStorage.removeItem(CLAVE_CARRITO);

        mostrarCarrito();

    }

}


// ==========================================
// COMPROBAR SESIÓN
// ==========================================

function actualizarEstadoSesion() {

    const estado = document.getElementById("estadoSesion");

    if (!estado) {
        return;
    }

    if (localStorage.getItem(CLAVE_SESION) === "activa") {

        estado.textContent =
            "Sesión iniciada. Ya podés finalizar tu compra.";

    } else {

        estado.textContent =
            "Necesitás iniciar sesión para finalizar tu compra.";

    }

}


// ==========================================
// FINALIZAR COMPRA
// ==========================================

function finalizarCompra() {

    const carrito = obtenerCarrito();

    if (carrito.length === 0) {

        alert("Tu carrito está vacío.");
        return;

    }

    // Comprobamos que exista una sesión iniciada.

    if (localStorage.getItem(CLAVE_SESION) !== "activa") {

        alert(
            "Para finalizar tu compra primero tenés que iniciar sesión."
        );

        window.location.href = "inicio-sesion.html";

        return;

    }

    // Comprobamos los datos de entrega.

    const formulario = document.getElementById("formularioEnvio");

    if (!formulario || !formulario.reportValidity()) {
        return;
    }

    // Recuperamos el inventario actualizado.

    const inventario = obtenerInventario();

    // PRIMERA COMPROBACIÓN:
    // Verificamos todos los productos antes de descontar ninguno.

    for (const producto of carrito) {

        if (
            !inventario[producto.id] ||
            inventario[producto.id].stock < producto.cantidad
        ) {

            alert(
                "No hay stock suficiente de " +
                producto.nombre +
                ". Revisá las cantidades de tu carrito."
            );

            return;

        }

    }

    // Calculamos el total.

    let total = 0;

    carrito.forEach(producto => {

        total += producto.precio * producto.cantidad;

    });

    // SEGUNDA COMPROBACIÓN:
    // Ahora sí descontamos el stock de todos los productos.

    carrito.forEach(producto => {

        inventario[producto.id].stock -= producto.cantidad;

    });

    // Guardamos el inventario actualizado.

    localStorage.setItem(
        CLAVE_STOCK_CARRITO,
        JSON.stringify(inventario)
    );

    // Guardamos los datos del pedido para la demostración.

    const datosEnvio = Object.fromEntries(
        new FormData(formulario).entries()
    );

    const pedido = {

        productos: carrito,
        total: total,
        direccion: datosEnvio,
        fecha: new Date().toLocaleString("es-AR")

    };

    localStorage.setItem(
        "syryndy_ultimo_pedido",
        JSON.stringify(pedido)
    );

    // Vacíamos el carrito después de la compra.

    localStorage.removeItem(CLAVE_CARRITO);

    // Mostramos la confirmación.

    alert(
        "¡COMPRA REALIZADA EXITOSAMENTE!\n\n" +
        "Total: " + formatearPrecio(total) +
        "\nDestino: " + datosEnvio.pais +
        "\n\n¡Gracias por comprar en Syryndy!"
    );

    formulario.reset();

    mostrarCarrito();

}


// ==========================================
// INICIAR LA PÁGINA
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    mostrarCarrito();

});