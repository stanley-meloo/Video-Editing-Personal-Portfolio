// Espera todo o conteúdo da página carregar antes de rodar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- INICIALIZAÇÃO DO SCROLL SUAVE (LENIS) ---
    const lenis = new Lenis({
        duration: 1.2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    // ------------------------------------------------

    // --- FUNÇÃO PARA ROLAGEM SUAVE NOS LINKS DO MENU ---
    const navLinks = document.querySelectorAll('.tabs a.tab');
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            lenis.scrollTo(targetId);
        });
    });
    // ----------------------------------------------------


    // --- OTIMIZAÇÃO DE SCROLL PARA IFRAMES ---
    let scrollTimer;
    const iframes = document.querySelectorAll('iframe');
    lenis.on('scroll', () => {
        clearTimeout(scrollTimer);
        iframes.forEach(iframe => {
            iframe.classList.add('scrolling');
        });
        scrollTimer = setTimeout(() => {
            iframes.forEach(iframe => {
                iframe.classList.remove('scrolling');
            });
        }, 150);
    });
    // ----------------------------------------------------


    // --- LÓGICA DO MODAL DO DISCORD ---
    const discordTriggers = document.querySelectorAll('.discord-modal-trigger');
    const discordModalOverlay = document.getElementById('discord-modal-overlay');
    const mainContent = document.querySelector('main.wrap');
    const closeDiscordModalBtn = document.getElementById('discord-modal-close-btn');
    const copyUsernameBtn = document.getElementById('modal-copy-btn');
    const discordCopyNotification = document.getElementById('discord-copy-notification');
    let discordNotificationTimer;

    const openDiscordModal = (event) => {
        event.preventDefault();
        discordModalOverlay.classList.add('active');
        mainContent.classList.add('blurred');
    };

    const closeDiscordModal = () => {
        discordModalOverlay.classList.remove('active');
        mainContent.classList.remove('blurred');
    };

    discordTriggers.forEach(trigger => {
        trigger.addEventListener('click', openDiscordModal);
    });

    closeDiscordModalBtn.addEventListener('click', closeDiscordModal);

    discordModalOverlay.addEventListener('click', (event) => {
        if (event.target === discordModalOverlay) {
            closeDiscordModal();
        }
    });

    copyUsernameBtn.addEventListener('click', () => {
        const username = 'stanleyy';
        navigator.clipboard.writeText(username).then(() => {
            clearTimeout(discordNotificationTimer);
            discordCopyNotification.classList.add('show');
            discordNotificationTimer = setTimeout(() => {
                discordCopyNotification.classList.remove('show');
            }, 2000);
        }).catch(err => {
            console.error('Falha ao copiar o nome de usuário: ', err);
        });
    });
    // -----------------------------------------


    // --- LÓGICA DO MODAL DE E-MAIL ---
    const emailTriggers = document.querySelectorAll('.email-modal-trigger');
    const emailModalOverlay = document.getElementById('email-modal-overlay');
    const closeEmailModalBtn = document.getElementById('email-modal-close-btn');
    const copyEmailBtnInModal = document.getElementById('modal-email-copy-btn');
    const emailCopyNotification = document.getElementById('email-copy-notification');
    let emailNotificationTimer;

    const openEmailModal = (event) => {
        event.preventDefault();
        emailModalOverlay.classList.add('active');
        mainContent.classList.add('blurred');
    };

    const closeEmailModal = () => {
        emailModalOverlay.classList.remove('active');
        mainContent.classList.remove('blurred');
    };

    emailTriggers.forEach(trigger => {
        trigger.addEventListener('click', openEmailModal);
    });

    closeEmailModalBtn.addEventListener('click', closeEmailModal);

    emailModalOverlay.addEventListener('click', (event) => {
        if (event.target === emailModalOverlay) {
            closeEmailModal();
        }
    });

    copyEmailBtnInModal.addEventListener('click', () => {
        const emailAddress = 'stmelo.c@gmail.com';
        navigator.clipboard.writeText(emailAddress).then(() => {
            clearTimeout(emailNotificationTimer);
            emailCopyNotification.classList.add('show');
            emailNotificationTimer = setTimeout(() => {
                emailCopyNotification.classList.remove('show');
            }, 2000);
        }).catch(err => {
            console.error('Falha ao copiar o e-mail: ', err);
        });
    });
    // -----------------------------------
});