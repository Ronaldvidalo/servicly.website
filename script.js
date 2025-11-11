// Espera a que todo el contenido del DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {

    /**
     * ----------------------------------------
     * Funcionalidad del Menú de Navegación Móvil
     * ----------------------------------------
     */
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (mobileNavToggle && mainNav) {
        // Abrir/Cerrar menú con el botón hamburguesa
        mobileNavToggle.addEventListener('click', () => {
            const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
            mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('nav-open');
            // Opcional: Bloquear scroll del body cuando el menú está abierto
            document.body.classList.toggle('no-scroll');
        });
    }

    // Cerrar el menú móvil al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('nav-open')) {
                mainNav.classList.remove('nav-open');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    /**
     * ----------------------------------------
     * Animación "Fade-in" al hacer Scroll
     * ----------------------------------------
     * Utiliza IntersectionObserver para una mejor performance.
     */
    const faders = document.querySelectorAll('.fade-in');

    if ("IntersectionObserver" in window) {
        const appearOptions = {
            threshold: 0.1, // El elemento debe estar 10% visible
            rootMargin: "0px 0px -50px 0px" // Se activa 50px antes de entrar al viewport
        };

        const appearOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return; // Si no está intersectando, no hacer nada
                } else {
                    entry.target.classList.add('visible'); // Añadir clase para animar
                    observer.unobserve(entry.target); // Dejar de observar el elemento una vez animado
                }
            });
        }, appearOptions);

        faders.forEach(fader => {
            appearOnScroll.observe(fader);
        });

    } else {
        // Fallback para navegadores antiguos (simplemente mostrar todo)
        faders.forEach(fader => {
            fader.classList.add('visible');
        });
    }
});