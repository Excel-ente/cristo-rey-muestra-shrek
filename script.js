document.addEventListener('DOMContentLoaded', () => {
    // ========== SPLASH SCREEN / PRELOADER ==========
    const splashScreen = document.getElementById('splash-screen');
    const body = document.body;
    
    // Initialize body as loading state
    body.classList.add('loading');
    
    // Function to handle splash screen removal
    function removeSplashScreen() {
        if (splashScreen) {
            splashScreen.classList.add('fade-out');

            setTimeout(() => {
                splashScreen.style.display = 'none';
            }, 1000);
        }
        // SIEMPRE sacar el loading, haya o no splash
        body.classList.remove('loading');
    }


    // Remove splash screen after 3 seconds
    setTimeout(removeSplashScreen, 4000);
    
    if (splashScreen) {
        splashScreen.addEventListener('click', removeSplashScreen);
    }
    // ========== DATOS DEL ELENCO ==========
    const castData = {
        shrek: { name: 'Shrek', actor: 'Bautista Formica', grade: '6°B' },
        donkey: { name: 'Donkey', actor: 'Santino Di Gracia', grade: '6°B' },
        puss: { name: 'Puss in Boots', actor: 'Valentino Salto', grade: '6°A' },
        fiona: { name: 'Fiona', actor: 'Alma Acosta', grade: '6°A' },
        dragon: { name: 'Dragon', actor: 'Morena Arancibia', grade: '6°C' },
        gingerbread: { name: 'Gingerbread Man', actor: 'Catalina Gonzalez', grade: '6°C' },
        lord_farquaad: { name: 'Lord Farquaad', actor: 'Bastian D\'Amico', grade: '6°A' }
    };

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

    let currentItems = [];
    let currentIndex = 0;

    function openModal(itemElement) {
        if (!fullscreenModal || !modalImage || !modalVideo || !modalCaption || !itemElement) return;

        fullscreenModal.style.display = 'flex';

        const type = itemElement.dataset.type || (itemElement.tagName === 'IMG' ? 'image' : 'video');
        const src = itemElement.dataset.full || itemElement.src;
        const alt = itemElement.alt || '';
        const caption =
            itemElement.closest('.feed-item')?.querySelector('.feed-item__caption')?.textContent ||
            alt;

        if (type === 'image') {
            modalImage.src = src;
            modalImage.alt = alt;
            modalImage.style.display = 'block';
            modalVideo.style.display = 'none';
            modalVideo.pause();
        } else if (type === 'video') {
            modalVideo.src = src;
            modalVideo.style.display = 'block';
            modalImage.style.display = 'none';
            modalVideo.play();
        }

        modalCaption.textContent = caption || '';

        if (document.body.classList.contains('feed-page')) {
            currentItems = Array.from(document.querySelectorAll('.feed-item'));
        } else {
            const visibleGallery =
                document.querySelector('.grade-gallery-section[style*="block"] .gallery') ||
                document.querySelector('.project-gallery');

            if (visibleGallery) {
                currentItems = Array.from(visibleGallery.querySelectorAll('.gallery__item'));
            } else {
                currentItems = Array.from(document.querySelectorAll('.project-gallery .gallery__item'));
            }
        }

        currentIndex = currentItems.indexOf(itemElement.closest('.feed-item, .gallery__item')) || 0;
        updateNavigationButtons();
    }

    function closeModal() {
        if (!fullscreenModal) return;
        fullscreenModal.style.display = 'none';
        if (modalVideo) {
            modalVideo.pause();
            modalVideo.currentTime = 0;
            modalVideo.src = '';
        }
        if (modalImage) modalImage.src = '';
        if (modalCaption) modalCaption.textContent = '';
    }

    function showNext() {
        if (!currentItems.length) return;
        currentIndex = (currentIndex + 1) % currentItems.length;
        const el = currentItems[currentIndex].querySelector('img, video') || currentItems[currentIndex];
        openModal(el);
    }

    function showPrev() {
        if (!currentItems.length) return;
        currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
        const el = currentItems[currentIndex].querySelector('img, video') || currentItems[currentIndex];
        openModal(el);
    }

    function updateNavigationButtons() {
        if (!prevButton || !nextButton) return;
        if (currentItems.length > 1) {
            prevButton.style.display = 'block';
            nextButton.style.display = 'block';
        } else {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        }
    }

    // Click en items de galería (index.html)
    document.querySelectorAll('.gallery__item').forEach(item => {
        item.addEventListener('click', () => {
            const media = item.querySelector('img, video') || item;
            openModal(media);
        });
    });

    // Click en items del feed (feed.html)
    document.querySelectorAll('.feed-item').forEach(item => {
        item.addEventListener('click', () => {
            const mediaElement = item.querySelector('img, video');
            if (!mediaElement) return;

            mediaElement.dataset.type = item.dataset.type || (mediaElement.tagName === 'IMG' ? 'image' : 'video');
            mediaElement.dataset.full = item.dataset.src || mediaElement.src;

            openModal(mediaElement);
        });
    });

    // Listeners del modal solo si existen todos los elementos clave
    if (fullscreenModal && closeButton && prevButton && nextButton) {
        closeButton.addEventListener('click', closeModal);
        prevButton.addEventListener('click', showPrev);
        nextButton.addEventListener('click', showNext);

        fullscreenModal.addEventListener('click', (e) => {
            if (e.target === fullscreenModal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && fullscreenModal.style.display === 'flex') {
                closeModal();
            }
        });
    }








    // ========== LÓGICA PARA MODAL DEL ELENCO (OBSOLETO, REEMPLAZADO POR MODAL DE ALUMNOS) ==========
    // La funcionalidad del modal del elenco ha sido integrada en el modal de alumnos.
    // Las tarjetas de personajes ahora abren el modal de alumnos directamente.
    // El código anterior para 'castModal' se puede eliminar o dejar comentado por referencia.
    /*
    const castModal = document.getElementById('castModal');
    const castCharacterName = document.getElementById('castCharacterName');
    // ... (resto del código obsoleto)
    */

    // ========== LÓGICA PARA MODAL DE ALUMNOS ==========
    const studentModal = document.getElementById('studentModal');
    const studentPhoto = document.getElementById('studentPhoto');
    const studentName = document.getElementById('studentName');
    const studentGrade = document.getElementById('studentGrade');

    if (studentModal && studentPhoto && studentName && studentGrade) {
        function openStudentModal(name, grade) {
            const photoFileName = name.toLowerCase().replace(/\s+/g, '_') + '.svg';

            studentName.textContent = name;
            studentGrade.textContent = grade;
            studentPhoto.src = `./alumnos/${photoFileName}`;

            studentPhoto.onerror = () => {
                const initials = name.split(' ').map(n => n[0]).join('');
                studentPhoto.src = `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff`;
                studentPhoto.onerror = null;
            };

            studentModal.style.display = 'flex';
        }

        function closeStudentModal() {
            studentModal.style.display = 'none';
        }

        // Nombres clickeables
        document.querySelectorAll('.student-name').forEach(nameSpan => {
            nameSpan.addEventListener('click', () => {
                const name = nameSpan.dataset.name;
                const grade = nameSpan.dataset.grade;
                openStudentModal(name, grade);
            });
        });

        // Tarjetas de personajes
        document.querySelectorAll('.cast-card').forEach(card => {
            card.addEventListener('click', () => {
                const name = card.dataset.name;
                const grade = card.dataset.grade;
                openStudentModal(name, grade);
            });
        });

        // Botón cerrar dentro del modal
        const studentCloseBtn = studentModal.querySelector('.close-button');
        if (studentCloseBtn) {
            studentCloseBtn.addEventListener('click', closeStudentModal);
        }

        // Cerrar haciendo click fuera
        studentModal.addEventListener('click', (e) => {
            if (e.target === studentModal) {
                closeStudentModal();
            }
        });

        // ESC para cerrar SOLO si el modal existe y está visible
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && studentModal.style.display === 'flex') {
                closeStudentModal();
            }
        });
    }
});