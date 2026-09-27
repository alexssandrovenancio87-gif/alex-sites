
/* =========================================================
   ALEX SITES — SCRIPT
   Interações e formulário
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       NAVEGAÇÃO SUAVE
    ===================================================== */

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       FORMULÁRIO DE CONTATO
    ===================================================== */

    const form = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (form) {

        form.addEventListener("submit", function () {

            /*
                O envio do formulário continua sendo feito
                pelo sistema de formulário que você já ativou.

                Aqui apenas mostramos uma mensagem visual
                enquanto o formulário é processado.
            */

            if (formMessage) {

                formMessage.textContent =
                    "Enviando sua mensagem...";

            }

        });

    }


    /* =====================================================
       ANIMAÇÃO DOS CARDS AO ENTRAREM NA TELA
    ===================================================== */

    const cards = document.querySelectorAll(
        ".service-card, .portfolio-card, .plan"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show-card");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        cards.forEach(card => {
            observer.observe(card);
        });

    }


    /* =====================================================
       FEEDBACK DOS BOTÕES DE PLANO
    ===================================================== */

    const planButtons = document.querySelectorAll(
        ".plan-btn"
    );

    planButtons.forEach(button => {

        button.addEventListener("click", () => {

            const plan = button
                .closest(".plan");

            if (!plan) {
                return;
            }

            const planName =
                plan.querySelector("h3");

            if (planName) {

                console.log(
                    "Plano selecionado:",
                    planName.textContent.trim()
                );

            }

        });

    });


    /* =====================================================
       CONSOLE
    ===================================================== */

    console.log(
        "Alex Sites carregado com sucesso."
    );

});

