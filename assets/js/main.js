document.addEventListener("DOMContentLoaded", function() {

    // --- 1. FUNCIÓN PARA CARGAR COMPONENTES ---
    // Carga un componente HTML (header/footer) y luego ejecuta un callback (opcional)
    const loadComponent = (id, url, callback) => {
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok ' + response.statusText);
                return response.text();
            })
            .then(data => {
                document.getElementById(id).innerHTML = data;
                if (callback) callback(); // Ejecuta el callback si existe
            })
            .catch(error => console.error('Error loading component:', error));
    };

    // --- 2. FUNCIÓN PARA INICIALIZAR EL MENÚ MÓVIL ---
    // Esta función se pasará como callback
    const initMobileMenu = () => {
        const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        const iconMenu = document.getElementById('icon-menu');
        const iconClose = document.getElementById('icon-close');

        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                const isMenuOpen = mobileMenu.classList.contains('hidden');
                mobileMenu.classList.toggle('hidden', !isMenuOpen);
                iconMenu.classList.toggle('hidden', isMenuOpen);
                iconClose.classList.toggle('hidden', !isMenuOpen);
            });
        }
    };

    // --- 3. FUNCIÓN PARA MARCAR EL ENLACE ACTIVO ---
    // Esta función también se pasa como callback
    const highlightActiveLink = () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            if (link.getAttribute('data-page') === currentPage) {
                // Tailwind class para el link activo
                link.classList.add('text-neon-accent', 'font-bold');
                link.classList.remove('text-text-secondary');
                // Estilo específico para el borde del menú móvil
                if (link.parentElement.id === 'mobile-menu') {
                    link.classList.add('border-l-4', 'border-neon-accent', 'bg-surface');
                }
            }
        });
    };

    // --- 4. FUNCIÓN PARA INICIALIZAR ICONOS LUCIDE ---
    const initLucideIcons = () => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    };

    // --- 5. EJECUCIÓN ---
    // Carga el header, y CUANDO TERMINE, inicializa el menú Y los enlaces activos
    loadComponent('header-placeholder', '_header.html', () => {
        initMobileMenu();
        highlightActiveLink();
        initLucideIcons(); // Inicializa iconos que puedan estar en el header
    });

    // Carga el footer
    loadComponent('footer-placeholder', '_footer.html', () => {
        initLucideIcons(); // Inicializa iconos que puedan estar en el footer
    });

    // Inicializa iconos en el contenido principal (main)
    initLucideIcons();

});