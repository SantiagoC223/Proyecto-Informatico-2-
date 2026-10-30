
function abrirPopUpCuenta() {
    const ventana = document.getElementById("popUpCuenta");
    if (ventana) {
        ventana.showModal();
    }
}

function cerrarPopUpCuenta() {
    const ventana = document.getElementById("popUpCuenta");
    if (ventana) {
        ventana.close();
    }
}

function IrRegistro() {
    window.location.href = "crear-cuenta.html";
}

function IrInicioSesion() {
    window.location.href = "inicio-sesion.html";
}

function IrAboutUs(){
    window.location.href = "aboutUs.html";
}

function IrHeladeraChica(){
    window.location.href = "HeladeraChica.html";
}

function IrHeladeraGrande(){
    window.location.href = "HeladeraGrande.html";
}

function IrLavarropas(){
    window.location.href = "Lavaropas.html";
}

function IrWaflera(){
    window.location.href = 'Wafflera.html';
}

function IrGrandes(){
    window.location.href = 'Grandes.html';
}

function IrChicos(){
    window.location.href = 'Chicos.html';
}

function Irbatidora(){
    window.location.href = 'Batidora.html';
}

function IrHorno(){
    window.location.href = 'Horno.html';
}


function IrProyecto2(){
    window.location.href = "proyecto2.html";
}

function ALERTA(){
    alert("Viene un grupo de jaker, vistanse de nubs");
}

function navegar(direccion) {
    const track = document.getElementById('carruselTrack');
            
    const anchoImagen = track.clientWidth; 
    
    track.scrollBy({ left: direccion * anchoImagen, behavior: 'smooth' });
}

function IrPaginaPrincipal(){
    window.location.href = 'index.html';
}

function IrMezcladora() {
    window.location.href = "Mezcladora.html";
}




/*___________________________________________________*/

const CLAVE_STOCK = "syryndy_stock_v1";

const STOCK_INICIAL = {

    "heladera-chica": {
        nombre: "Heladera chica",
        stock: 3
    },

    "heladera-grande": {
        nombre: "Heladera grande",
        stock: 5
    },

    lavarropas: {
        nombre: "Lavarropas Syryndy",
        stock: 5
    },

    microondas: {
        nombre: "Microondas",
        stock: 4
    },

    wafflera: {
        nombre: "Wafflera",
        stock: 5
    },

    horno: {
        nombre: "Horno Eléctrico Syryndy",
        stock: 5
    },

    mezcladora: {
        nombre: "Mezcladora",
        stock: 20
    },

    batidora: {
        nombre: "Batidora",
        stock: 5
    },

    "heladera-chica": {
        nombre: "Heladera chica",
        stock: 3
    },

    microondas: {
        nombre: "Microondas",
        stock: 4
    },

    tostadora: {
        nombre: "Tostadora",
        stock: 0
    }
};


function obtenerInventario() {

    const datosGuardados = localStorage.getItem(CLAVE_STOCK);

    // Copiamos todos los productos iniciales.
    const inventarioCompleto = JSON.parse(
        JSON.stringify(STOCK_INICIAL)
    );

    if (datosGuardados !== null) {

        try {

            const inventarioGuardado = JSON.parse(datosGuardados);

            if (
                inventarioGuardado &&
                typeof inventarioGuardado === "object" &&
                !Array.isArray(inventarioGuardado)
            ) {

                // Incorporamos los datos anteriores,
                // conservando sus cantidades de stock.
                Object.assign(inventarioCompleto, inventarioGuardado);

            }

        } catch (error) {

            console.error("Error al leer el inventario:", error);

        }

    }

    // Guardamos el inventario actualizado.
    localStorage.setItem(
        CLAVE_STOCK,
        JSON.stringify(inventarioCompleto)
    );

    return inventarioCompleto;
}




function actualizarStockVisible(id, cantidad) {
    const elemento = document.querySelector(
        '[data-stock="' + id + '"]'
    );

    if (elemento) {
        elemento.textContent = "Stock disponible: " + cantidad;
    }
}

function mostrarInventario() {
    const inventario = obtenerInventario();

    for (const [id, producto] of Object.entries(inventario)) {
        actualizarStockVisible(id, producto.stock);
    }
}

document.addEventListener("DOMContentLoaded", mostrarInventario);


function cambiarStock(id, cantidad) {
    if (!Number.isInteger(cantidad) || cantidad < 0) {
        alert("El stock debe ser un número entero no negativo.");
        return;
    }

    const inventario = obtenerInventario();

    if (!inventario[id]) {
        alert("No existe ese producto en el inventario.");
        return;
    }

    inventario[id].stock = cantidad;

    localStorage.setItem(
        CLAVE_STOCK,
        JSON.stringify(inventario)
    );

    actualizarStockVisible(id, cantidad);
}

function comprarProducto(id) {
    const inventario = obtenerInventario();
    const producto = inventario[id];

    if (!producto) {
        alert("No se encontró ese producto.");
        return;
    }

    if (producto.stock <= 0) {
        alert("Este producto no tiene stock disponible.");
        return;
    }

    // Descontamos una unidad.
    producto.stock--;

    // Guardamos los cambios.
    localStorage.setItem(
        CLAVE_STOCK,
        JSON.stringify(inventario)
    );

    // Actualizamos el stock visible en la página.
    actualizarStockVisible(id, producto.stock);

    alert(
        "¡Compra simulada realizada!\n" +
        "Producto: " + producto.nombre + "\n" +
        "Stock restante: " + producto.stock
    );
}















