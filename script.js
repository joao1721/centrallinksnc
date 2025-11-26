document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather Icons
    feather.replace();
    
    // FAQ Data
    const faqData = [
        {
            question: "Como posso começar a usar as ferramentas da NC+?",
            answer: "Para começar a usar nossas ferramentas, basta criar uma conta gratuita em nosso site e selecionar a ferramenta que deseja utilizar. Todas as ferramentas têm guias de introdução para ajudar você a começar."
        },
        {
            question: "As ferramentas da NC+ são gratuitas?",
            answer: "Oferecemos um plano gratuito com funcionalidades básicas para você testar. Para acesso completo a todas as funcionalidades e ferramentas avançadas, você pode assinar um de nossos planos premium."
        },
        {
            question: "Quais são os requisitos do sistema para usar as ferramentas?",
            answer: "Nossas ferramentas são baseadas na web e funcionam na maioria dos navegadores modernos como Chrome, Firefox, Edge e Safari. Recomendamos usar a versão mais recente do seu navegador para a melhor experiência."
        },
        {
            question: "Como posso entrar em contato com o suporte?",
            answer: "Você pode entrar em contato com nosso suporte técnico através do email suporte@cyber-nova.com ou através do chat disponível no painel do usuário após fazer login."
        },
        {
            question: "Meus dados estão seguros com a NC+?",
            answer: "Sim, seguimos rigorosos protocolos de segurança e todas as comunicações são criptografadas. Seus dados estão protegidos conosco."
        },
        {
            question: "Posso integrar as ferramentas com outros serviços?",
            answer: "Sim, a maioria de nossas ferramentas oferece APIs para integração com outros serviços. Consulte a documentação específica de cada ferramenta para mais detalhes."
        },
        {
            question: "Há um limite para o número de projetos que posso criar?",
            answer: "No plano gratuito, você pode criar até 3 projetos. Nos planos premium, esse limite é estendido conforme o plano escolhido, podendo chegar a projetos ilimitados no plano Enterprise."
        },
        {
            question: "Como funciona o cancelamento da assinatura?",
            answer: "Você pode cancelar sua assinatura a qualquer momento através do painel do usuário. O cancelamento é imediato e você mantém acesso até o final do período contratado."
        }
    ];

    // Initialize FAQ
    const faqContainer = document.getElementById('faqContainer');
    const faqSearch = document.getElementById('faqSearch');
    const faqSection = document.getElementById('faqSection');
    const loadMoreBtn = document.getElementById('loadMoreFaq');

    let visibleFaqCount = 4;

    function updateLoadMoreVisibility(total, isSearchMode) {
        if (!loadMoreBtn) return;

        if (isSearchMode || total <= visibleFaqCount) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
    }

    function renderFAQ(questions = faqData, { isSearchMode = false } = {}) {
        faqContainer.innerHTML = '';
        
        if (questions.length === 0) {
            faqContainer.innerHTML = '<p class="text-center text-gray-400">Nenhum resultado encontrado para sua pesquisa.</p>';
            updateLoadMoreVisibility(0, true);
            return;
        }

        const listToRender = isSearchMode ? questions : questions.slice(0, visibleFaqCount);

        listToRender.forEach((item, index) => {
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item';
            
            faqItem.innerHTML = `
                <div class="faq-question">
                    <span class="faq-question-text">${item.question}</span>
                    <i data-feather="chevron-down" class="faq-arrow w-5 h-5"></i>
                </div>
                <div class="faq-answer">
                    <p>${item.answer}</p>
                </div>
            `;
            
            faqItem.addEventListener('click', function() {
                this.classList.toggle('active');
                feather.replace();
            });
            
            faqContainer.appendChild(faqItem);
        });
        
        updateLoadMoreVisibility(questions.length, isSearchMode);
        feather.replace();
    }

    // Initial FAQ render (limited view)
    renderFAQ(faqData, { isSearchMode: false });

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            visibleFaqCount += 3;
            if (visibleFaqCount > faqData.length) {
                visibleFaqCount = faqData.length;
            }
            renderFAQ(faqData, { isSearchMode: false });
        });
    }

    // FAQ Search functionality
    faqSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm) {
            // Move FAQ section up
            faqSection.classList.add('pt-0');
            faqSection.classList.remove('pt-8');
            
            const filteredFAQs = faqData.filter(item => 
                item.question.toLowerCase().includes(searchTerm) || 
                item.answer.toLowerCase().includes(searchTerm)
            );
            
            if (filteredFAQs.length > 0) {
                const highlightedFAQs = filteredFAQs.map(item => {
                    const regex = new RegExp(searchTerm, 'gi');
                    return {
                        question: item.question.replace(regex, match => `<span class="highlight">${match}</span>`),
                        answer: item.answer.replace(regex, match => `<span class="highlight">${match}</span>`)
                    };
                });
                
                renderFAQ(highlightedFAQs, { isSearchMode: true });
            } else {
                renderFAQ([], { isSearchMode: true });
            }
        } else {
            // Reset FAQ section position
            faqSection.classList.add('pt-8');
            faqSection.classList.remove('pt-0');
            visibleFaqCount = 4;
            renderFAQ(faqData, { isSearchMode: false });
        }
    });

    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('button[aria-label="Toggle menu"]');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobileMenu');
            mobileMenu.classList.toggle('open');
        });
    }

    // Smooth scroll from hero button
    const scrollDownBtn = document.getElementById('scrollDownBtn');
    const toolsSection = document.getElementById('toolsSection');

    if (scrollDownBtn && toolsSection) {
        scrollDownBtn.addEventListener('click', function() {
            toolsSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Scroll reveal para elementos com a classe .reveal
    const revealElements = document.querySelectorAll('.reveal');

    if (IntersectionObserver && revealElements.length > 0) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('reveal-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -40px 0px',
            }
        );

        revealElements.forEach((el) => observer.observe(el));
    } else {
        // Fallback: mostra tudo sem animação se IntersectionObserver não estiver disponível
        revealElements.forEach((el) => el.classList.add('reveal-visible'));
    }

    // Efeito de header ao rolar
    const mainHeader = document.getElementById('mainHeader');
    if (mainHeader) {
        const toggleHeaderShadow = () => {
            if (window.scrollY > 10) {
                mainHeader.classList.add('header-scrolled');
            } else {
                mainHeader.classList.remove('header-scrolled');
            }
        };

        toggleHeaderShadow();
        window.addEventListener('scroll', toggleHeaderShadow);
    }

    // Efeito de parallax/tilt leve nos cards de ferramenta
    const toolCards = document.querySelectorAll('.tool-card');

    toolCards.forEach((card) => {
        const inner = card.querySelector('.tool-card-inner') || card.querySelector('div');
        if (!inner) return;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateY = ((x / rect.width) - 0.5) * 10; // -5 a 5 graus
            const rotateX = ((y / rect.height) - 0.5) * -8; // -4 a 4 graus

            inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            inner.style.transform = '';
        });
    });
});