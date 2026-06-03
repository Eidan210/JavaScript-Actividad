const btnCargar = document.getElementById("btnCargar");
const estado = document.getElementById("estado");
const contenedor = document.getElementById("contenedorPersonajes");

async function cargarPersonajes(){

    contenedor.innerHTML="";
    btnCargar.disabled = true;

    estado.style.display = "block";
    estado.style.marginTop = "15px";
    estado.textContent = "Cargando Personajes...";

    try{
        const respuesta = await fetch("./docs.json");

        if(!respuesta.ok){
            throw new Error(`Error al cargar el archivo (${respuesta.status})`);
        }

        const personajes = await respuesta.json();

        if(!Array.isArray(personajes) || personajes.length === 0){
            throw new Error("Error en el formato o No hay personajes registrados. ");
        }

        personajes.forEach(personaje => {
            const card = document.createElement("div");
            card.className = "tarjeta-personaje";
            card.innerHTML = `
                <div class="tarjeta-imagen-wrapper">
                    <img src="${personaje.imagen}" alt="${personaje.nombre}" class="tarjeta-imagen">
                    <span class="badge-status ${personaje.status.toLowerCase()}">${personaje.status}</span>
                </div>
                <div class="tarjeta-info">
                    <h3 class="tarjeta-nombre">${personaje.nombre}</h3>
                    <span class="tarjeta-afiliacion">${personaje.afiliacion}</span>
                    
                    <div class="tarjeta-detalles">
                        <div class="detalle-item">
                            <span class="detalle-label">Edad</span>
                            <span class="detalle-valor">${personaje.edad} años</span>
                        </div>
                        <div class="detalle-item">
                            <span class="detalle-label">Género</span>
                            <span class="detalle-valor">${personaje.genero}</span>
                        </div>
                        <div class="detalle-item full-width">
                            <span class="detalle-label">Especialidad</span>
                            <span class="detalle-valor">${personaje.especialidad}</span>
                        </div>
                    </div>
                </div>
            `;
            contenedor.appendChild(card);
        });

        estado.textContent = "Personajes cargados con éxito.";
    }catch(error){
        console.log("error" + error);
        estado.textContent = "Error al cargar los personajes.";
    } finally {
        btnCargar.disabled = false;
    }
}
btnCargar.addEventListener("click", cargarPersonajes);
