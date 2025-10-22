const edificiosS = {
  'La Era': 'Zona de psicología y apoyo a la mujer',
  'Edificio D': 'Edificio de Tecnologías de la Información',
  'Edificio E': 'Laboratorio "Ing. Alejo Peralta"',
  'Edificio G': 'Edificio de Administración y Logística',
  'Cafeteria': 'Cafetería Universitaria',
  'Edificio K': 'Edificio de Ingeniería Industrial y Mecatrónica',
  'Edificio L': 'Laboratorio de Producción Gráfica',
  'Edificio M': 'Edificio de Tecnología Ambiental y Energías',
  'Edificio F': 'Laboratorio Pesado de Nanotecnología',
  'Centro de Idiomas': 'Centro de Idiomas e Intercambios',
  'Edificio O': 'Edificio de Contaduría y Mercadotecnia',
  'Edificio P': 'Edificio del Área de Salud',
  'Puerta 1': 'Acceso Principal (Directivos y Docentes)',
  'Puerta 2': 'Acceso Estacionamiento Estudiantes',
  'Puerta 3': 'Acceso y Salida Estudiantes (Restricción)',
  'Puerta 4': 'Acceso Principal Estudiantes',
  'Puerta 5': 'Acceso Estudiantes de Área de Salud',
  'ExHacienda': 'Casco de la Ex-Hacienda',
  'Centro de Investigacion': 'Centro de Investigación y Vinculación',
  'Gimnasio': 'Estadio y Gimnasio "Dragones"'
};

let indiceSeleccionado = -1;

function filtrarSugerencias(e) {
  const input = document.getElementById('busqueda');
  const sugerenciasDiv = document.getElementById('sugerencias');
  const texto = input.value.toLowerCase();

  if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
    navegarSugerencias(e.key);
    return;
  }

  if (e.key === 'Enter') {
    const coincidencias = Object.entries(edificiosS).filter(([clave, nombre]) =>
      clave.toLowerCase().includes(texto) || nombre.toLowerCase().includes(texto)
    );

    if (coincidencias.length === 1) {
      const nombre = coincidencias[0][0];
      window.location.href = `index.html?edificio=${encodeURIComponent(nombre)}`;
    } else if (coincidencias.length > 1) {
      sugerenciasDiv.style.display = 'block';
    } else {
      alert("No se encontraron coincidencias.");
    }
    return;
  }

  // Mostrar sugerencias mientras se escribe
  sugerenciasDiv.innerHTML = '';
  indiceSeleccionado = -1;

  if (texto === '') {
    sugerenciasDiv.style.display = 'none';
    return;
  }

  const coincidencias = Object.entries(edificiosS).filter(([clave, nombre]) =>
    clave.toLowerCase().includes(texto) || nombre.toLowerCase().includes(texto)
  );

  if (coincidencias.length === 0) {
    sugerenciasDiv.style.display = 'none';
    return;
  }

  coincidencias.forEach(([clave, nombre]) => {
    const div = document.createElement('div');
    div.innerHTML = `<img class="icono" src="https://img.icons8.com/ios-filled/50/000000/marker.png" alt="icono">
                     <span><strong>${clave}</strong> - ${nombre}</span>`;
    div.onclick = () => seleccionarSugerencia(`${clave} - ${nombre}`);
    sugerenciasDiv.appendChild(div);
  });

  sugerenciasDiv.style.display = 'block';
}

function seleccionarSugerencia(nombreCompleto) {
  const clave = nombreCompleto.split(' - ')[0];
   window.location.href = `index.html?edificio=${encodeURIComponent(clave)}`;
  document.getElementById('busqueda').value = edificiosS[clave];
  document.getElementById('sugerencias').style.display = 'none';
  

  // Si el mapa está disponible, lo usamos
  if (typeof edificios !== 'undefined' && typeof map !== 'undefined') {
    const edificio = edificios.find(e => e.nombre === clave);
    if (edificio && edificio.coords.length === 2) {
      map.setView(edificio.coords, 17, { animate: true });
      if (typeof abrirInfoEdificio === 'function') {
        abrirInfoEdificio(edificio);
      }
    } else {
      alert("No se encontraron coordenadas para: " + clave);
    }
  }
}

function navegarSugerencias(tecla) {
  const sugerencias = document.querySelectorAll('#sugerencias div');
  if (sugerencias.length === 0) return;

  if (tecla === 'ArrowDown') {
    indiceSeleccionado = (indiceSeleccionado + 1) % sugerencias.length;
  } else if (tecla === 'ArrowUp') {
    indiceSeleccionado = (indiceSeleccionado - 1 + sugerencias.length) % sugerencias.length;
  } else if (tecla === 'Enter' && indiceSeleccionado !== -1) {
    sugerencias[indiceSeleccionado].click();
    return;
  }

  sugerencias.forEach((div, i) => {
    div.classList.toggle('seleccionado', i === indiceSeleccionado);
  });
}

document.addEventListener('click', function (e) {
  if (!document.getElementById('sugerencias').contains(e.target) &&
      e.target.id !== 'busqueda') {
    document.getElementById('sugerencias').style.display = 'none';
  }
});

document.getElementById('icono-buscar').addEventListener('click', () => {
  const input = document.getElementById('busqueda');
  const texto = input.value.toLowerCase();

  const coincidencias = Object.entries(edificiosS).filter(([clave, nombre]) =>
    clave.toLowerCase().includes(texto) || nombre.toLowerCase().includes(texto)
  );

  if (coincidencias.length === 1) {
    const nombre = coincidencias[0][0];
    window.location.href = `index.html?edificio=${encodeURIComponent(nombre)}`;
  } else if (coincidencias.length > 1) {
    document.getElementById('sugerencias').style.display = 'block';
  } else {
    alert("No se encontraron coincidencias.");
  }
});
