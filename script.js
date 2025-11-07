document.addEventListener('DOMContentLoaded', () => {
    // ========== CAMBIO DE IDIOMA ==========
    let currentLanguage = localStorage.getItem('language') || 'es'; // Idioma por defecto: español
    const languageToggle = document.getElementById('languageToggle');
    const langText = document.querySelector('.lang-text');

    // Aplicar idioma guardado al cargar
    applyLanguage(currentLanguage);

    // Event listener para el botón de idioma
    if (languageToggle) {
        languageToggle.addEventListener('click', () => {
            currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
            localStorage.setItem('language', currentLanguage);
            applyLanguage(currentLanguage);
        });
    }

    function applyLanguage(lang) {
        // Actualizar texto del botón
        if (langText) {
            langText.textContent = lang === 'es' ? 'ES' : 'EN';
        }

        // Actualizar todos los elementos con data-lang
        document.querySelectorAll('[data-lang-en][data-lang-es]').forEach(element => {
            if (lang === 'en') {
                element.textContent = element.getAttribute('data-lang-en');
            } else {
                element.textContent = element.getAttribute('data-lang-es');
            }
        });

        // Actualizar el título de la página
        if (lang === 'en') {
            document.title = document.title.replace('Festival del Pantano Encantado 2025', 'The Enchanted Swamp Festival 2025')
                                          .replace('Galería del Festival', 'Festival Gallery');
        } else {
            document.title = document.title.replace('The Enchanted Swamp Festival 2025', 'Festival del Pantano Encantado 2025')
                                          .replace('Festival Gallery', 'Galería del Festival');
        }
    }

    // --- Función para agendar el evento ---
    const addToCalendarBtn = document.getElementById('addToCalendarBtn');
    if (addToCalendarBtn) {
        addToCalendarBtn.addEventListener('click', () => {
            const lang = currentLanguage;
            const eventTitle = lang === 'en' 
                ? "The Enchanted Swamp Festival 2025 - Cristo Rey Institute"
                : "Festival del Pantano Encantado 2025 - Instituto Cristo Rey";
            const eventLocation = "Instituto Parroquial Cristo Rey, Monseñor López May 3304, B1757 Gregorio de Laferrere, Provincia de Buenos Aires";
            const eventDescription = lang === 'en'
                ? "Don't miss the annual art festival! Explore the talent of our students."
                : "No te pierdas el festival anual de arte. ¡Explora el talento de nuestros estudiantes!";

            // **IMPORTANTE: Actualiza esta fecha y hora real del evento**
            // Formato: YYYY-MM-DDTHH:MM:SS
            const eventStartDate = "2025-11-15T18:00:00"; // Ejemplo: 15 de Noviembre de 2025, 18:00
            const eventEndDate = "2025-11-15T20:00:00";   // Ejemplo: 15 de Noviembre de 2025, 20:00

            const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${encodeURIComponent(eventStartDate.replace(/[-:]|\.\d{3}/g, ''))}/${encodeURIComponent(eventEndDate.replace(/[-:]|\.\d{3}/g, ''))}&details=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(eventLocation)}&sf=true&output=xml`;

            // Abre una nueva ventana para añadir a Google Calendar
            window.open(calendarUrl, '_blank');

            // También puedes generar un archivo .ics para Outlook/Apple Calendar
            // const icsContent = `BEGIN:VCALENDAR
            // VERSION:2.0
            // PRODID:-//hacksw/handcal//NONSGML v1.0//EN
            // BEGIN:VEVENT
            // UID:${new Date().getTime()}@example.com
            // DTSTAMP:${new Date().toISOString().replace(/[-:]|\.\d{3}/g, '')}Z
            // DTSTART:${eventStartDate.replace(/[-:]|\.\d{3}/g, '')}
            // DTEND:${eventEndDate.replace(/[-:]|\.\d{3}/g, '')}
            // SUMMARY:${eventTitle}
            // DESCRIPTION:${eventDescription}
            // LOCATION:${eventLocation}
            // END:VEVENT
            // END:VCALENDAR`;

            // const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
            // const url = URL.createObjectURL(blob);
            // const a = document.createElement('a');
            // a.href = url;
            // a.download = 'MuestraDeArteCristoRey.ics';
            // document.body.appendChild(a);
            // a.click();
            // document.body.removeChild(a);
            // URL.revokeObjectURL(url);
        });
    }

    // --- Lógica para mostrar/ocultar galerías por año en index.html ---
    const yearButtons = document.querySelectorAll('.year-btn');
    const gradeGalleries = document.querySelectorAll('.grade-gallery-section');

    yearButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('data-year'); // 'primero', 'tercero', 'sexto'

            gradeGalleries.forEach(gallery => {
                if (gallery.id === `gallery-${targetId}`) {
                    gallery.style.display = gallery.style.display === 'block' ? 'none' : 'block';
                } else {
                    gallery.style.display = 'none'; // Oculta las otras galerías
                }
            });

            // Scroll suave a la galería si se muestra
            if (document.getElementById(`gallery-${targetId}`).style.display === 'block') {
                document.getElementById(`gallery-${targetId}`).scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- Lógica para el Modal Fullscreen (compartido por index.html y feed.html) ---
    const fullscreenModal = document.getElementById('fullscreenModal');
    const closeButton = document.querySelector('.modal .close-button');
    const modalImage = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');
    const modalCaption = document.getElementById('modalCaption');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    let currentItems = []; // Almacenará los items actuales de la galería/feed
    let currentIndex = 0;

    function openModal(itemElement) {
        fullscreenModal.style.display = 'flex';
        const type = itemElement.dataset.type || (itemElement.tagName === 'IMG' ? 'image' : 'video');
        const src = itemElement.dataset.full || itemElement.src;
        const alt = itemElement.alt;
        const caption = itemElement.querySelector('.feed-item__caption')?.textContent || alt; // Para el feed

        if (type === 'image') {
            modalImage.src = src;
            modalImage.alt = alt;
            modalImage.style.display = 'block';
            modalVideo.style.display = 'none';
            modalVideo.pause(); // Pausa cualquier video que pudiera estar reproduciéndose
        } else if (type === 'video') {
            modalVideo.src = src;
            modalVideo.alt = alt;
            modalVideo.style.display = 'block';
            modalVideo.play();
            modalImage.style.display = 'none';
        }
        modalCaption.textContent = caption;

        // Determinar qué elementos son navegables
        if (document.body.classList.contains('feed-page')) {
            currentItems = Array.from(document.querySelectorAll('.feed-item'));
        } else {
            // Asume que estamos en index.html y navega solo dentro de la galería actual abierta o el proyecto
            const visibleGallery = document.querySelector('.grade-gallery-section[style*="block"] .gallery') || document.querySelector('.project-gallery');
            if (visibleGallery) {
                currentItems = Array.from(visibleGallery.querySelectorAll('.gallery__item'));
            } else {
                currentItems = Array.from(document.querySelectorAll('.project-gallery .gallery__item'));
            }
        }
        
        currentIndex = currentItems.indexOf(itemElement);
        updateNavigationButtons();
    }

    function closeModal() {
        fullscreenModal.style.display = 'none';
        modalVideo.pause();
        modalVideo.currentTime = 0; // Reinicia el video
        modalImage.src = '';
        modalVideo.src = '';
        modalCaption.textContent = '';
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % currentItems.length;
        openModal(currentItems[currentIndex]);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
        openModal(currentItems[currentIndex]);
    }

    function updateNavigationButtons() {
        if (currentItems.length > 1) {
            prevButton.style.display = 'block';
            nextButton.style.display = 'block';
        } else {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        }
    }

    // Event listeners para abrir el modal en el index.html
    document.querySelectorAll('.gallery__item').forEach(item => {
        item.addEventListener('click', () => openModal(item));
    });

    // Event listeners para abrir el modal en el feed.html
    document.querySelectorAll('.feed-item').forEach(item => {
        item.addEventListener('click', () => {
            // Necesitamos pasar el elemento IMG o VIDEO dentro del .feed-item al openModal
            const mediaElement = item.querySelector('img, video');
            // Añadimos data-type y data-full al elemento media para que openModal lo reconozca
            if (mediaElement) {
                mediaElement.dataset.type = item.dataset.type;
                mediaElement.dataset.full = item.dataset.src;
            }
            openModal(mediaElement);
        });
    });

    closeButton.addEventListener('click', closeModal);
    prevButton.addEventListener('click', showPrev);
    nextButton.addEventListener('click', showNext);

    // Cerrar modal haciendo click fuera (en el fondo oscuro)
    fullscreenModal.addEventListener('click', (e) => {
        if (e.target === fullscreenModal) {
            closeModal();
        }
    });

    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && fullscreenModal.style.display === 'flex') {
            closeModal();
        }
    });
});