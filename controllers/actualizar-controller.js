import { clientServices } from "../service/client-service.js";

const formulario = document.querySelector("[data-form]");

/* const obtenerInfo = () =>{
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    if(id == null){
        window.location.href = "/screens/error.html"
    }

    const nombre = document.querySelector("[data-nombre]");
    const email = document.querySelector("[data-email]");
    console.log(nombre, "-", email)
    clientServices.detalleCliente(id).then( perfil => {
        nombre.value = perfil.nombre,
        email.value = perfil.email 
    });
} */


/*ASYNC Y AWAIT: SON FUNCIONES ASINCRONAS QUE ESPERAN UNA RESPUESTA, HACE LO MISMO QUE LA DE ARRIBA PERO 
CON UNA SINTAXIS MEJORADA Y MAS SISNTETICA*/ 

const obtenerInfo = async() =>{
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    if(id == null){
        window.location.href = "/screens/error.html"
    }
    
    const nombre = document.querySelector("[data-nombre]");
    const email = document.querySelector("[data-email]");
    
    try{
        const perfil = await clientServices.detalleCliente(id)
        if(perfil.nombre && perfil.email){
            nombre.value = perfil.nombre,
            email.value = perfil.email       
        }else{
            throw new Error();
        }        
    }catch{
        window.location.href = "/screens/error.html"
    } 
}


obtenerInfo();

formulario.addEventListener("submit", (evento) => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    evento.preventDefault();

    const nombre = document.querySelector("[data-nombre]").value;
    const email = document.querySelector("[data-email]").value;

    clientServices.actualizarCliente(nombre, email, id).then(() => {
        window.location.href = "/screens/edicion_concluida.html";
    })
})