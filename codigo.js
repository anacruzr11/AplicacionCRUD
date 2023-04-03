const nombre = document.getElementById("nombreInput");
const email = document.getElementById("emailInput");
const telefono = document.getElementById("telefonoInput");
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const cuerpoTabla = document.getElementById("cuerpoTabla");
const nombreOriginal = document.getElementById("nombreOriginal")

const btnAgregar = document.getElementById("btnAgregar");
const btnGuardar = document.getElementById("btnGuardar");
btnGuardar.style.display = "none"

const agregarUsuario = () => {
    const usuarioValue = {
        nombre: nombre.value,
        email: email.value,
        telefono: telefono.value,
    }
    
    usuarios.push(usuarioValue);
    
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    mostrarUsuario();

}

const mostrarUsuario = () => {
    cuerpoTabla.innerHTML = "",
    usuarios.forEach((usuario) => {
        cuerpoTabla.innerHTML += `<tr>
        <td>${usuario.nombre}</td>
        <td>${usuario.email}</td>
        <td>${usuario.telefono}</td>
        <td>
        <button
         type="button"
         class="btn btn-danger"
         onclick="eliminarUsuario('${usuario.nombre}')">
        
         Eliminar
        </button>
        <td>
        <td>
        <button
         type="button"
         class="btn btn-warning"
         onclick="editarUsuario('${usuario.nombre}')">
        
         Editar
        </button>
        </td>
     </tr>`
     })
}

const eliminarUsuario = () => {
    const usuario = usuarios.find((usuario) => usuario.nombre === nombre)
    const index = usuarios.indexOf(usuario)
    usuarios.splice(index, 1)
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
    mostrarUsuario()
}

const editarUsuario = (edicion) => {
    btnAgregar.style.display = "none"
    btnGuardar.style.display = "inline"

    const usuario = usuarios.find((usuario) => usuario.nombre === edicion)
    nombre.value = usuario.nombre
    email.value = usuario.email
    telefono.value = usuario.telefono
    nombreOriginal.value = usuario.nombre
}

const confirmarEdicion = () => {
    const usuario = usuarios.find((usuario) => usuario.nombre === nombreOriginal.value)
    usuario.nombre = nombre.value
    usuario.email = email.value
    usuario.telefono = telefono.value
    localStorage.setItem("usuarios", JSON.stringify(usuarios))

    btnGuardar.style.display = "none"
    btnAgregar.style.display = "inline"

    nombre.value = ""
    email.value = ""
    telefono.value = ""

    mostrarUsuario()
}

window.addEventListener("load", mostrarUsuario)