/* =========================================================
   ALEX SITES — SCRIPT
   Interações, formulário e slideshow
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

            const plan = button.closest(".plan");

            if (!plan) {
                return;
            }

            const planName = plan.querySelector("h3");

            if (planName) {

                console.log(
                    "Plano selecionado:",
                    planName.textContent.trim()
                );

            }

        });

    });


    /* =====================================================
       SLIDESHOW DO PORTFÓLIO
    ===================================================== */

    const slides = document.querySelectorAll(".slider-card");
    const dots = document.querySelectorAll(".slider-dots .dot");

    let slideAtual = 0;
    let intervaloSlide;


    function mostrarSlide(numero) {

        if (!slides.length) {
            return;
        }

        /* Garante que o número fique entre os slides existentes */

        if (numero >= slides.length) {
            slideAtual = 0;
        } else if (numero < 0) {
            slideAtual = slides.length - 1;
        } else {
            slideAtual = numero;
        }


        /* Remove o slide ativo de todos */

        slides.forEach(slide => {
            slide.classList.remove("active");
        });


        /* Ativa o slide atual */

        slides[slideAtual].classList.add("active");


        /* Atualiza as bolinhas */

        dots.forEach(dot => {
            dot.classList.remove("active");
        });

        if (dots[slideAtual]) {
            dots[slideAtual].classList.add("active");
        }

    }


    function mudarSlide(direcao) {

        mostrarSlide(slideAtual + direcao);

        reiniciarSlideshow();

    }


    function irParaSlide(numero) {

        mostrarSlide(numero);

        reiniciarSlideshow();

    }


    function iniciarSlideshow() {

        intervaloSlide = setInterval(() => {

            mostrarSlide(slideAtual + 1);

        }, 3500);

    }


    function reiniciarSlideshow() {

        clearInterval(intervaloSlide);

        iniciarSlideshow();

    }


    /* =====================================================
       DISPONIBILIZA AS FUNÇÕES PARA OS BOTÕES DO HTML
    ===================================================== */

    window.mudarSlide = mudarSlide;
    window.irParaSlide = irParaSlide;


    /* =====================================================
       INICIA O SLIDESHOW
    ===================================================== */

    if (slides.length > 0) {

        mostrarSlide(0);

        iniciarSlideshow();

    }


    /* =====================================================
       CONSOLE
    ===================================================== */

    console.log(
        "Alex Sites carregado com sucesso."
    );

});
