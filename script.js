/* =========================================================
   NEXO - script.js
   Proyecto escolar - JavaScript puro (sin frameworks)
   Aquí va toda la lógica: formularios, localStorage,
   amigos y chat.
   ========================================================= */

/* ---------------------------------------------------------
   1. MENÚ MÓVIL (funciona en todas las páginas)
--------------------------------------------------------- */
function activarMenuMovil() {
  var botonMenu = document.querySelector(".boton-menu-movil");
  var menu = document.querySelector(".menu-principal");

  if (botonMenu && menu) {
    botonMenu.addEventListener("click", function () {
      menu.classList.toggle("menu-abierto");
    });
  }
}

/* ---------------------------------------------------------
   2. MOSTRAR U OCULTAR ENLACES SEGÚN LA SESIÓN
   "Agregar amigos", "Chats", "Editar perfil" y "Cerrar sesión"
   (enlace-privado) solo se ven si el usuario inició sesión.
   "Buscar", "Iniciar sesión" y "Crear cuenta" (enlace-invitado)
   solo se ven si NO ha iniciado sesión.

   Usamos localStorage para guardar si la sesión está iniciada
   ("nexoSesionIniciada"). Es una solución sencilla, pensada para
   una demostración escolar: se guarda solo en este navegador.
   Una página real necesitaría un sistema de autenticación con
   un servidor de verdad.
--------------------------------------------------------- */
function actualizarMenuSegunSesion() {
  var sesionIniciada = localStorage.getItem("nexoSesionIniciada") === "true";

  var enlacesPrivados = document.querySelectorAll(".enlace-privado");
  var enlacesInvitado = document.querySelectorAll(".enlace-invitado");

  enlacesPrivados.forEach(function (enlace) {
    enlace.style.display = sesionIniciada ? "block" : "none";
  });

  enlacesInvitado.forEach(function (enlace) {
    enlace.style.display = sesionIniciada ? "none" : "block";
  });
}

/* ---------------------------------------------------------
   3. USUARIOS FICTICIOS PARA "BUSCAR AMIGOS"
   (datos de demostración, no son personas reales)
--------------------------------------------------------- */
var usuariosFicticios = [
  {
    id: 1,
    nombre: "Vicente",
    edad: 16,
    curso: "3° medio",
    liceo: "Liceo Andrés Bello",
    descripcion: "Me gusta el deporte, salir a caminar y escuchar música.",
    intereses: ["Música", "Videojuegos", "Arte"],
    foto: "https://i.pravatar.cc/300?img=12"
  },
  {
    id: 2,
    nombre: "Camila",
    edad: 15,
    curso: "2° medio",
    liceo: "Liceo Andrés Bello",
    descripcion: "Amante de las series, el dibujo y los días lluviosos.",
    intereses: ["Series", "Dibujo", "Lectura"],
    foto: "https://i.pravatar.cc/300?img=32"
  },
  {
    id: 3,
    nombre: "Matías",
    edad: 17,
    curso: "4° medio",
    liceo: "Liceo Andrés Bello",
    descripcion: "Fanático del fútbol y de armar equipos para torneos.",
    intereses: ["Fútbol", "Videojuegos", "Música"],
    foto: "https://i.pravatar.cc/300?img=15"
  },
  {
    id: 4,
    nombre: "Antonia",
    edad: 16,
    curso: "3° medio",
    liceo: "Liceo Andrés Bello",
    descripcion: "Me encanta el teatro y participar en actividades del liceo.",
    intereses: ["Teatro", "Cine", "Fotografía"],
    foto: "https://i.pravatar.cc/300?img=47"
  },
  {
    id: 5,
    nombre: "Benjamín",
    edad: 15,
    curso: "1° medio",
    liceo: "Liceo Andrés Bello",
    descripcion: "Curioso por la tecnología y armar proyectos con Arduino.",
    intereses: ["Tecnología", "Videojuegos", "Ciencia"],
    foto: "https://i.pravatar.cc/300?img=51"
  },
  {
    id: 6,
    nombre: "Florencia",
    edad: 17,
    curso: "4° medio",
    liceo: "Liceo Andrés Bello",
    descripcion: "Me gusta la música en vivo y tocar guitarra en mis ratos libres.",
    intereses: ["Música", "Guitarra", "Conciertos"],
    foto: "https://i.pravatar.cc/300?img=44"
  }
];

/* ---------------------------------------------------------
   3. VALIDACIONES - LOGIN
--------------------------------------------------------- */
function inicializarLogin() {
  var formulario = document.getElementById("formulario-login");
  if (!formulario) return;

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var correo = document.getElementById("correo-login").value.trim();
    var clave = document.getElementById("clave-login").value.trim();
    var hayError = false;

    if (correo === "") {
      mostrarError("error-correo-login", "Ingresa tu correo.");
      hayError = true;
    } else {
      ocultarError("error-correo-login");
    }

    if (clave === "") {
      mostrarError("error-clave-login", "Ingresa tu contraseña.");
      hayError = true;
    } else {
      ocultarError("error-clave-login");
    }

    if (hayError) return;

    // Simulación de inicio de sesión (no hay servidor real).
    // Guardamos el estado de la sesión en localStorage: es una solución
    // sencilla para un proyecto escolar. En una página real, la sesión
    // se validaría en un servidor y no solo en el navegador.
    var cuentaGuardada = JSON.parse(localStorage.getItem("nexoCuenta"));

    if (cuentaGuardada && cuentaGuardada.correo === correo) {
      localStorage.setItem("nexoSesionIniciada", "true");
      window.location.href = "index.html";
    } else {
      mostrarError("error-clave-login", "Correo o contraseña incorrectos, o aún no tienes cuenta.");
    }
  });
}

/* ---------------------------------------------------------
   4. VALIDACIONES - REGISTRO
--------------------------------------------------------- */
function inicializarRegistro() {
  var formulario = document.getElementById("formulario-registro");
  if (!formulario) return;

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var nombre = document.getElementById("nombre-registro").value.trim();
    var apellido = document.getElementById("apellido-registro").value.trim();
    var edad = document.getElementById("edad-registro").value.trim();
    var correo = document.getElementById("correo-registro").value.trim();
    var clave = document.getElementById("clave-registro").value;
    var confirmarClave = document.getElementById("confirmar-clave-registro").value;
    var liceo = document.getElementById("liceo-registro").value.trim();
    var curso = document.getElementById("curso-registro").value.trim();

    var hayError = false;

    // Campos obligatorios
    if (nombre === "" || apellido === "" || liceo === "" || curso === "") {
      mostrarError("error-general-registro", "Completa todos los campos obligatorios.");
      hayError = true;
    } else {
      ocultarError("error-general-registro");
    }

    // Correo válido con dominio del liceo
    var expresionCorreo = /^[\w.-]+@alumnos\.sip\.cl$/;
    if (!expresionCorreo.test(correo)) {
      mostrarError("error-correo-registro", "Usa tu correo institucional (@alumnos.sip.cl).");
      hayError = true;
    } else {
      ocultarError("error-correo-registro");
    }

    // Edad válida (entre 12 y 20 años, rango típico de liceo)
    var edadNumero = parseInt(edad, 10);
    if (isNaN(edadNumero) || edadNumero < 12 || edadNumero > 20) {
      mostrarError("error-edad-registro", "Ingresa una edad válida (12 a 20 años).");
      hayError = true;
    } else {
      ocultarError("error-edad-registro");
    }

    // Contraseñas iguales
    if (clave === "" || clave !== confirmarClave) {
      mostrarError("error-clave-registro", "Las contraseñas no coinciden.");
      hayError = true;
    } else {
      ocultarError("error-clave-registro");
    }

    if (hayError) return;

    // Guardar cuenta en localStorage (simulación, sin servidor real)
    var nuevaCuenta = {
      nombre: nombre,
      apellido: apellido,
      edad: edadNumero,
      correo: correo,
      liceo: liceo,
      curso: curso
    };

    localStorage.setItem("nexoCuenta", JSON.stringify(nuevaCuenta));

    // Como acaba de crear su cuenta, lo dejamos con la sesión iniciada
    // de una vez (no debería tener que iniciar sesión de nuevo).
    localStorage.setItem("nexoSesionIniciada", "true");

    var mensaje = document.getElementById("mensaje-exito-registro");
    mensaje.style.display = "block";
    mensaje.textContent = "¡Cuenta creada correctamente!";

    formulario.reset();

    setTimeout(function () {
      window.location.href = "index.html";
    }, 1500);
  });
}

/* ---------------------------------------------------------
   5. PERFIL - crear y mostrar vista previa
--------------------------------------------------------- */
function inicializarPerfil() {
  var formulario = document.getElementById("formulario-perfil");
  if (!formulario) return;

  // Si ya existe un perfil guardado, lo mostramos al cargar la página
  cargarVistaPreviaPerfil();

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var perfil = {
      nombre: document.getElementById("nombre-perfil").value.trim(),
      edad: document.getElementById("edad-perfil").value.trim(),
      curso: document.getElementById("curso-perfil").value.trim(),
      liceo: document.getElementById("liceo-perfil").value.trim(),
      descripcion: document.getElementById("descripcion-perfil").value.trim(),
      musica: document.getElementById("musica-perfil").value.trim(),
      deportes: document.getElementById("deportes-perfil").value.trim(),
      videojuegos: document.getElementById("videojuegos-perfil").value.trim(),
      peliculas: document.getElementById("peliculas-perfil").value.trim(),
      foto: "https://i.pravatar.cc/300?img=68"
    };

    if (perfil.nombre === "" || perfil.edad === "") {
      mostrarError("error-perfil", "Al menos completa tu nombre y edad.");
      return;
    }
    ocultarError("error-perfil");

    localStorage.setItem("nexoPerfil", JSON.stringify(perfil));

    var mensaje = document.getElementById("mensaje-exito-perfil");
    mensaje.style.display = "block";
    mensaje.textContent = "¡Perfil guardado correctamente!";

    mostrarVistaPreviaPerfil(perfil);
  });
}

function cargarVistaPreviaPerfil() {
  var perfilGuardado = JSON.parse(localStorage.getItem("nexoPerfil"));
  if (perfilGuardado) {
    mostrarVistaPreviaPerfil(perfilGuardado);
  }
}

function mostrarVistaPreviaPerfil(perfil) {
  var vistaPrevia = document.getElementById("vista-previa-perfil");
  if (!vistaPrevia) return;

  var listaIntereses = [perfil.musica, perfil.deportes, perfil.videojuegos, perfil.peliculas]
    .filter(function (dato) { return dato && dato !== ""; })
    .map(function (dato) { return "<li>" + dato + "</li>"; })
    .join("");

  vistaPrevia.innerHTML =
    '<img src="' + perfil.foto + '" alt="Foto de perfil de ' + perfil.nombre + '">' +
    '<div class="info-tarjeta">' +
    "<h2>" + perfil.nombre + ", " + perfil.edad + "</h2>" +
    '<p class="datos-secundarios">' + perfil.curso + " · " + perfil.liceo + "</p>" +
    '<p class="descripcion-perfil">' + perfil.descripcion + "</p>" +
    '<ul class="lista-etiquetas">' + listaIntereses + "</ul>" +
    "</div>";
}

/* ---------------------------------------------------------
   6. BUSCAR AMIGOS - mostrar tarjetas y gestionar solicitudes
--------------------------------------------------------- */
function inicializarBuscarAmigos() {
  var contenedorTarjetas = document.getElementById("lista-perfiles");
  if (!contenedorTarjetas) return;

  renderizarTarjetasUsuarios();
  renderizarListaAmigos();
}

function renderizarTarjetasUsuarios() {
  var contenedor = document.getElementById("lista-perfiles");
  var solicitudesEnviadas = JSON.parse(localStorage.getItem("nexoSolicitudes")) || [];

  contenedor.innerHTML = "";

  usuariosFicticios.forEach(function (usuario) {
    var yaEnviada = solicitudesEnviadas.indexOf(usuario.id) !== -1;

    var tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta-perfil";

    var listaIntereses = usuario.intereses
      .map(function (interes) { return "<li>" + interes + "</li>"; })
      .join("");

    tarjeta.innerHTML =
      '<img src="' + usuario.foto + '" alt="Foto de perfil de ' + usuario.nombre + '">' +
      '<div class="info-tarjeta">' +
      "<h2>" + usuario.nombre + ", " + usuario.edad + "</h2>" +
      '<p class="datos-secundarios">' + usuario.curso + " · " + usuario.liceo + "</p>" +
      '<p class="descripcion-perfil">"' + usuario.descripcion + '"</p>' +
      '<ul class="lista-etiquetas">' + listaIntereses + "</ul>" +
      '<div class="acciones-tarjeta">' +
      '<button class="boton boton-pequeno boton-anadir' + (yaEnviada ? " enviado" : "") + '" data-id="' + usuario.id + '">' +
      (yaEnviada ? "Solicitud enviada ✓" : "Añadir amigo") +
      "</button>" +
      '<button class="boton boton-pequeno boton-pasar">Pasar</button>' +
      '<button class="boton boton-pequeno boton-mensaje">Enviar mensaje</button>' +
      "</div>" +
      "</div>";

    contenedor.appendChild(tarjeta);
  });

  // Escuchar clics en los botones "Añadir amigo"
  var botonesAnadir = document.querySelectorAll(".boton-anadir");
  botonesAnadir.forEach(function (boton) {
    boton.addEventListener("click", function () {
      var idUsuario = parseInt(boton.getAttribute("data-id"), 10);
      enviarSolicitudAmistad(idUsuario, boton);
    });
  });

  // Escuchar clics en "Pasar" (solo oculta la tarjeta, es visual)
  var botonesPasar = document.querySelectorAll(".boton-pasar");
  botonesPasar.forEach(function (boton) {
    boton.addEventListener("click", function () {
      var tarjeta = boton.closest(".tarjeta-perfil");
      tarjeta.style.display = "none";
    });
  });
}

function enviarSolicitudAmistad(idUsuario, boton) {
  var solicitudesEnviadas = JSON.parse(localStorage.getItem("nexoSolicitudes")) || [];
  var listaAmigos = JSON.parse(localStorage.getItem("nexoAmigos")) || [];

  if (solicitudesEnviadas.indexOf(idUsuario) !== -1) return;

  solicitudesEnviadas.push(idUsuario);
  localStorage.setItem("nexoSolicitudes", JSON.stringify(solicitudesEnviadas));

  // Para la demostración, la solicitud se acepta automáticamente
  var usuario = usuariosFicticios.filter(function (u) { return u.id === idUsuario; })[0];
  var yaEsAmigo = listaAmigos.some(function (amigo) { return amigo.id === idUsuario; });

  if (!yaEsAmigo) {
    listaAmigos.push(usuario);
    localStorage.setItem("nexoAmigos", JSON.stringify(listaAmigos));
  }

  boton.textContent = "Solicitud enviada ✓";
  boton.classList.add("enviado");

  renderizarListaAmigos();
}

function renderizarListaAmigos() {
  var contenedor = document.getElementById("lista-mis-amigos");
  if (!contenedor) return;

  var listaAmigos = JSON.parse(localStorage.getItem("nexoAmigos")) || [];
  contenedor.innerHTML = "";

  if (listaAmigos.length === 0) {
    contenedor.innerHTML = '<p class="aviso-vacio">Todavía no has agregado amigos. ¡Busca personas con intereses similares a los tuyos!</p>';
    return;
  }

  listaAmigos.forEach(function (amigo) {
    var tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta-amigo";
    tarjeta.innerHTML =
      '<img src="' + amigo.foto + '" alt="Foto de ' + amigo.nombre + '">' +
      "<h3>" + amigo.nombre + "</h3>" +
      '<button class="boton-eliminar" data-id="' + amigo.id + '">Eliminar amigo</button>';
    contenedor.appendChild(tarjeta);
  });

  var botonesEliminar = document.querySelectorAll(".boton-eliminar");
  botonesEliminar.forEach(function (boton) {
    boton.addEventListener("click", function () {
      eliminarAmigo(parseInt(boton.getAttribute("data-id"), 10));
    });
  });
}

function eliminarAmigo(idUsuario) {
  var listaAmigos = JSON.parse(localStorage.getItem("nexoAmigos")) || [];
  listaAmigos = listaAmigos.filter(function (amigo) { return amigo.id !== idUsuario; });
  localStorage.setItem("nexoAmigos", JSON.stringify(listaAmigos));

  // También se quita de las solicitudes enviadas para poder re-agregar
  var solicitudesEnviadas = JSON.parse(localStorage.getItem("nexoSolicitudes")) || [];
  solicitudesEnviadas = solicitudesEnviadas.filter(function (id) { return id !== idUsuario; });
  localStorage.setItem("nexoSolicitudes", JSON.stringify(solicitudesEnviadas));

  renderizarListaAmigos();
  renderizarTarjetasUsuarios();
}

/* ---------------------------------------------------------
   7. CHAT - lista de conversaciones y mensajes
--------------------------------------------------------- */
function inicializarChat() {
  var listaChats = document.getElementById("lista-chats");
  if (!listaChats) return;

  renderizarListaChats();
}

function obtenerContactosChat() {
  // Los contactos del chat son los amigos agregados.
  // Si no hay amigos todavía, se usan un par de contactos de ejemplo.
  var listaAmigos = JSON.parse(localStorage.getItem("nexoAmigos")) || [];

  if (listaAmigos.length === 0) {
    return [usuariosFicticios[0], usuariosFicticios[1]];
  }
  return listaAmigos;
}

function renderizarListaChats() {
  var contenedor = document.getElementById("lista-chats");
  var contactos = obtenerContactosChat();

  contenedor.innerHTML = "";

  contactos.forEach(function (contacto) {
    var mensajes = obtenerMensajes(contacto.id);
    var ultimoMensaje = mensajes.length > 0 ? mensajes[mensajes.length - 1].texto : "Comienza la conversación";

    var item = document.createElement("article");
    item.className = "chat-item";
    item.setAttribute("data-id", contacto.id);
    item.innerHTML =
      '<img src="' + contacto.foto + '" alt="Foto de ' + contacto.nombre + '">' +
      '<div class="datos-chat-item">' +
      "<h3>" + contacto.nombre + "</h3>" +
      "<p>" + ultimoMensaje + "</p>" +
      "</div>" +
      '<span class="hora-chat">Hoy</span>';

    item.addEventListener("click", function () {
      abrirConversacion(contacto);

      document.querySelectorAll(".chat-item").forEach(function (el) {
        el.classList.remove("chat-activo");
      });
      item.classList.add("chat-activo");
    });

    contenedor.appendChild(item);
  });
}

function obtenerMensajes(idContacto) {
  var todosLosChats = JSON.parse(localStorage.getItem("nexoChats")) || {};
  return todosLosChats[idContacto] || [];
}

function guardarMensaje(idContacto, mensaje) {
  var todosLosChats = JSON.parse(localStorage.getItem("nexoChats")) || {};
  if (!todosLosChats[idContacto]) {
    todosLosChats[idContacto] = [];
  }
  todosLosChats[idContacto].push(mensaje);
  localStorage.setItem("nexoChats", JSON.stringify(todosLosChats));
}

function abrirConversacion(contacto) {
  var ventana = document.getElementById("ventana-chat");

  ventana.innerHTML =
    '<header class="cabecera-chat">' +
    '<img src="' + contacto.foto + '" alt="Foto de ' + contacto.nombre + '">' +
    "<h2>" + contacto.nombre + "</h2>" +
    "</header>" +
    '<section class="historial-mensajes" id="historial-mensajes"></section>' +
    '<form class="formulario-enviar-mensaje" id="formulario-mensaje">' +
    '<label for="campo-mensaje" class="sr-only">Escribe un mensaje</label>' +
    '<input type="text" id="campo-mensaje" placeholder="Escribe un mensaje..." autocomplete="off">' +
    '<button type="submit" class="boton boton-primario boton-pequeno">Enviar</button>' +
    "</form>";

  pintarHistorialMensajes(contacto.id);

  var formularioMensaje = document.getElementById("formulario-mensaje");
  formularioMensaje.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var campoMensaje = document.getElementById("campo-mensaje");
    var texto = campoMensaje.value.trim();
    if (texto === "") return;

    guardarMensaje(contacto.id, { texto: texto, propio: true });
    campoMensaje.value = "";
    pintarHistorialMensajes(contacto.id);
    renderizarListaChats();
  });
}

function pintarHistorialMensajes(idContacto) {
  var historial = document.getElementById("historial-mensajes");
  var mensajes = obtenerMensajes(idContacto);

  historial.innerHTML = "";

  if (mensajes.length === 0) {
    historial.innerHTML = '<p class="aviso-vacio">Aún no hay mensajes. ¡Envía el primero!</p>';
    return;
  }

  mensajes.forEach(function (mensaje) {
    var burbuja = document.createElement("p");
    burbuja.className = mensaje.propio ? "mensaje mensaje-enviado" : "mensaje mensaje-recibido";
    burbuja.textContent = mensaje.texto;
    historial.appendChild(burbuja);
  });

  historial.scrollTop = historial.scrollHeight;
}

/* ---------------------------------------------------------
   8. CERRAR SESIÓN
--------------------------------------------------------- */
function inicializarCerrarSesion() {
  var botonSalir = document.getElementById("cerrar-sesion");
  if (!botonSalir) return;

  botonSalir.addEventListener("click", function (evento) {
    evento.preventDefault();
    localStorage.removeItem("nexoSesionIniciada");
    window.location.href = "login.html";
  });
}

/* ---------------------------------------------------------
   9. FUNCIONES DE APOYO PARA MENSAJES DE ERROR
--------------------------------------------------------- */
function mostrarError(idElemento, texto) {
  var elemento = document.getElementById(idElemento);
  if (!elemento) return;
  elemento.textContent = texto;
  elemento.style.display = "block";
}

function ocultarError(idElemento) {
  var elemento = document.getElementById(idElemento);
  if (!elemento) return;
  elemento.style.display = "none";
}

/* ---------------------------------------------------------
   10. INICIALIZACIÓN GENERAL
   Se ejecuta cuando el HTML ya está listo.
--------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  activarMenuMovil();
  actualizarMenuSegunSesion();
  inicializarLogin();
  inicializarRegistro();
  inicializarPerfil();
  inicializarBuscarAmigos();
  inicializarChat();
  inicializarCerrarSesion();
});