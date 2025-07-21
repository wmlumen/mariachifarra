// Oculta todas las secciones y muestra solo la seleccionada
function showSection(id) {
  document.querySelectorAll('section').forEach(sec => {
    if (sec.id === id) {
      sec.style.display = 'block';
    } else {
      sec.style.display = 'none';
    }
  });
}

// Detecta clicks en los links del menú y muestra solo la sección correspondiente
window.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const hash = this.getAttribute('href').replace('#', '');
      if (document.getElementById(hash)) {
        e.preventDefault();
        showSection(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });
  // Mostrar solo la primera sección al cargar
  showSection('inicio');
});
