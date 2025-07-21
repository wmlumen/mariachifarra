// Funcionalidad del menú hamburguesa
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle del menú móvil
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Animación del hamburger
    hamburger.addEventListener('click', function() {
        const bars = document.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (hamburger.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });
});

// Contador de visitas web
document.addEventListener('DOMContentLoaded', function() {
    const webCounter = document.getElementById('web-counter');
    
    if (webCounter) {
        // Obtener contador del localStorage o inicializar
        let visitCount = localStorage.getItem('mariachiFarraVisits');
        
        if (!visitCount) {
            visitCount = Math.floor(Math.random() * 50) + 1; // Número inicial aleatorio entre 1-50
        } else {
            visitCount = parseInt(visitCount) + 1;
        }
        
        // Guardar el nuevo contador
        localStorage.setItem('mariachiFarraVisits', visitCount);
        
        // Formatear número con ceros a la izquierda
        const formattedCount = visitCount.toString().padStart(4, '0');
        
        // Animación del contador
        let currentCount = 0;
        const increment = Math.ceil(visitCount / 50);
        
        const countAnimation = setInterval(() => {
            currentCount += increment;
            if (currentCount >= visitCount) {
                currentCount = visitCount;
                clearInterval(countAnimation);
            }
            
            const displayCount = currentCount.toString().padStart(4, '0');
            webCounter.textContent = displayCount;
        }, 50);
        
        // Efecto de parpadeo cada 5 segundos
        setInterval(() => {
            webCounter.style.opacity = '0.5';
            setTimeout(() => {
                webCounter.style.opacity = '1';
            }, 200);
        }, 5000);
    }
});

// Scroll suave y navegación activa
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Función para actualizar el enlace activo
    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Escuchar el evento scroll
    window.addEventListener('scroll', updateActiveLink);
});

// Animaciones al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    const animatedElements = document.querySelectorAll('.member-card, .service-card, .gallery-item, .contact-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Manejo del formulario de contacto por WhatsApp
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('whatsapp-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los datos del formulario
            const formData = new FormData(form);
            const nombre = formData.get('nombre');
            const lugar = formData.get('lugar');
            const telefono = formData.get('telefono');
            const evento = formData.get('evento');
            const fecha = formData.get('fecha');
            const comentarios = formData.get('comentarios');

            // Validación básica
            if (!nombre || !lugar || !telefono || !evento || !fecha) {
                alert('Por favor, completa todos los campos requeridos.');
                return;
            }

            // Validación de fecha (no puede ser en el pasado)
            const selectedDate = new Date(fecha);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                alert('La fecha del evento debe ser futura.');
                return;
            }

            // Formatear la fecha para mostrar
            const fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Crear mensaje para WhatsApp
            let mensaje = `🎵 *Solicitud de Cotización - Mariachi Farra* 🎵\n\n`;
            mensaje += `👤 *Nombre:* ${nombre}\n`;
            mensaje += `📍 *Lugar del evento:* ${lugar}\n`;
            mensaje += `📱 *Teléfono:* ${telefono}\n`;
            mensaje += `🎉 *Tipo de evento:* ${evento}\n`;
            mensaje += `📅 *Fecha:* ${fechaFormateada}\n`;
            
            if (comentarios) {
                mensaje += `💭 *Comentarios:* ${comentarios}\n`;
            }
            
            mensaje += `\n¡Espero su respuesta! 🎶`;

            // Codificar el mensaje para URL
            const mensajeCodificado = encodeURIComponent(mensaje);
            const numeroWhatsApp = '595981755717';
            const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
            
            // Abrir WhatsApp
            window.open(urlWhatsApp, '_blank');
            
            // Mostrar mensaje de confirmación
            alert('¡Perfecto! Te redirigimos a WhatsApp para completar tu solicitud.');
            
            // Limpiar el formulario
            form.reset();
        });
    }
});

// Efectos de paralaje para el hero
document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent) {
            const rate = scrolled * -0.5;
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    });
});

// Contador animado para las estadísticas
document.addEventListener('DOMContentLoaded', function() {
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target === 100) {
                element.textContent = Math.floor(current) + '%';
            } else if (target >= 500) {
                element.textContent = Math.floor(current) + '+';
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    }

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('h4');
                const text = statNumber.textContent;
                
                if (text.includes('500')) {
                    animateCounter(statNumber, 500);
                } else if (text.includes('15')) {
                    animateCounter(statNumber, 15);
                } else if (text.includes('100')) {
                    animateCounter(statNumber, 100);
                }
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statElements = document.querySelectorAll('.stat');
    statElements.forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Galería con lightbox simple
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // En una implementación real, aquí abriríamos un lightbox
            // con la imagen completa
            console.log('Abrir imagen en lightbox');
        });
    });
});

// Efecto de typing para el título hero
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Iniciar el efecto después de un pequeño delay
        setTimeout(typeWriter, 500);
    }
});

// Smooth scroll para navegación interna
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Ajuste para navbar fija
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Validación en tiempo real del formulario
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Limpiar errores mientras el usuario escribe
            this.style.borderColor = '#eee';
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        // Validación según el tipo de campo
        switch(field.type) {
            case 'tel':
                const phoneRegex = /^[\d\s\-\+\(\)]+$/;
                isValid = phoneRegex.test(value) && value.length >= 10;
                break;
            case 'date':
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                isValid = selectedDate >= today;
                break;
            case 'text':
                isValid = value.length >= 2;
                break;
            default:
                isValid = value.length > 0;
        }
        
        // Aplicar estilos según validación
        if (!isValid && value.length > 0) {
            field.style.borderColor = '#e74c3c';
        } else if (isValid && value.length > 0) {
            field.style.borderColor = '#27ae60';
        }
    }
});

// Añadir clase CSS para animaciones
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1;
        transform: translateY(0);
        transition: all 0.6s ease;
    }
    
    .member-card,
    .service-card,
    .gallery-item,
    .contact-item {
        opacity: 0;
        transform: translateY(20px);
    }
    
    .nav-link.active {
        color: var(--accent-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Funcionalidad mejorada para el botón flotante de WhatsApp
document.addEventListener('DOMContentLoaded', function() {
    const whatsappFloat = document.querySelector('.whatsapp-float');
    
    if (whatsappFloat) {
        // Mostrar/ocultar el botón según el scroll
        let scrollTimeout;
        
        window.addEventListener('scroll', function() {
            // Mostrar el botón al hacer scroll
            whatsappFloat.style.opacity = '1';
            whatsappFloat.style.visibility = 'visible';
            
            // Limpiar timeout anterior
            clearTimeout(scrollTimeout);
            
            // Si el usuario está en el top, mantener visible pero con menos opacidad
            if (window.scrollY < 200) {
                whatsappFloat.style.opacity = '0.8';
            }
        });
        
        // Agregar mensaje predefinido al hacer clic
        whatsappFloat.addEventListener('click', function(e) {
            // Mensaje predefinido para WhatsApp
            const mensaje = encodeURIComponent('¡Hola! Me interesa contratar los servicios del Mariachi Farra. ¿Podrían darme más información sobre disponibilidad y precios?');
            const numeroWhatsApp = '595981755717';
            const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
            
            // Actualizar el href con el mensaje
            this.href = urlWhatsApp;
        });
        
        // Efecto de vibración al pasar el mouse (solo en desktop)
        if (!window.matchMedia('(max-width: 768px)').matches) {
            whatsappFloat.addEventListener('mouseenter', function() {
                this.style.animation = 'whatsapp-shake 0.5s ease-in-out';
            });
            
            whatsappFloat.addEventListener('animationend', function() {
                this.style.animation = 'whatsapp-pulse 2s infinite';
            });
        }
    }
});

// Añadir animación de shake para el hover del botón de WhatsApp
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes whatsapp-shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);

// Funcionalidad para los botones de tipo de evento
document.addEventListener('DOMContentLoaded', function() {
    const eventButtons = document.querySelectorAll('.event-btn');
    const eventoSeleccionado = document.getElementById('evento-seleccionado');
    
    eventButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            eventButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase active al botón seleccionado
            this.classList.add('active');
            
            // Guardar el valor seleccionado
            eventoSeleccionado.value = this.getAttribute('data-event');
        });
    });
});

// Funcionalidad para el acordeón de FAQ
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('i');
    
    // Cerrar todas las otras respuestas
    const allAnswers = document.querySelectorAll('.faq-answer-accordion');
    const allButtons = document.querySelectorAll('.faq-question-btn');
    
    allAnswers.forEach(answer => {
        if (answer !== element.nextElementSibling) {
            answer.classList.remove('open');
        }
    });
    
    allButtons.forEach(button => {
        if (button !== element) {
            button.classList.remove('active');
        }
    });
    
    // Toggle de la respuesta actual
    answer.classList.toggle('open');
    element.classList.toggle('active');
}

// Música de fondo y mute + volumen
window.addEventListener('DOMContentLoaded', function() {
  var audio = document.getElementById('bg-music');
  var btn = document.getElementById('music-toggle');
  var icon = document.getElementById('music-icon');
  var player = document.getElementById('music-player');
  var volume = document.getElementById('music-volume');
  if (audio && btn && icon && player) {
    audio.volume = volume ? parseFloat(volume.value) : 0.7;
    audio.play().catch(() => {});
    btn.addEventListener('click', function() {
      audio.muted = !audio.muted;
      icon.className = audio.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
      if(player) {
        if(audio.muted) player.classList.add('muted');
        else player.classList.remove('muted');
      }
    });
    if(audio.muted && player) player.classList.add('muted');
    if(volume) {
      volume.addEventListener('input', function() {
        audio.volume = parseFloat(this.value);
      });
    }
  }
});
