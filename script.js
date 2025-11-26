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

    function renderFAQ(questions = faqData) {
        faqContainer.innerHTML = '';
        
        if (questions.length === 0) {
            faqContainer.innerHTML = '<p class="text-center text-gray-400">Nenhum resultado encontrado para sua pesquisa.</p>';
            return;
        }

        questions.forEach((item, index) => {
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
        
        feather.replace();
    }

    // Initial FAQ render
    renderFAQ();

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
                
                renderFAQ(highlightedFAQs);
            } else {
                renderFAQ([]);
            }
        } else {
            // Reset FAQ section position
            faqSection.classList.add('pt-8');
            faqSection.classList.remove('pt-0');
            renderFAQ();
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
});