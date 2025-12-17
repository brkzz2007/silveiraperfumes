document.addEventListener("DOMContentLoaded", () => {
    // ========== CARRINHO ==========
    const btnCarrinho = document.getElementById("icon-carrinho");
    const carrinhoBox = document.getElementById("carrinhoBox");
    const fecharCarrinho = document.getElementById("fecharCarrinho");
    const itensCarrinho = document.getElementById("itensCarrinho");
    const totalCarrinho = document.getElementById("totalCarrinho");
    const finalizarCompra = document.getElementById("finalizarCompra");

    const WHATSAPP = "556992456851"; // SEU NÚMERO
    let carrinho = [];

    // Abrir e Fechar Carrinho
    if (btnCarrinho && carrinhoBox) {
        btnCarrinho.onclick = () => carrinhoBox.classList.add("aberto");
    }
    
    if (fecharCarrinho && carrinhoBox) {
        fecharCarrinho.onclick = () => carrinhoBox.classList.remove("aberto");
    }

    // Botões de adicionar ao carrinho
    document.querySelectorAll(".add-cart").forEach(btn => {
        btn.addEventListener("click", () => {
            const produtoEl = btn.closest(".box");
            const nome = produtoEl.querySelector("h3").innerText;
            const precoStr = produtoEl.querySelector(".price").innerText.replace("R$", "").trim();
            const preco = parseFloat(precoStr.replace(".", "").replace(",", "."));
            const img = produtoEl.querySelector("img").src;

            carrinho.push({ nome, preco, img });
            atualizarCarrinho();
            if (carrinhoBox) carrinhoBox.classList.add("aberto");
        });
    });

    function atualizarCarrinho() {
        if (!itensCarrinho || !totalCarrinho) return;
        
        itensCarrinho.innerHTML = "";
        let total = 0;

        carrinho.forEach((item, index) => {
            total += item.preco;

            itensCarrinho.innerHTML += `
                <div class="item-carrinho">
                    <img src="${item.img}" class="mini-img">
                    <div class="info">
                        <p class="nome">${item.nome}</p>
                        <p class="preco">${item.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                    </div>
                    <button class="remove-item" data-index="${index}">×</button>
                </div>
            `;
        });

        totalCarrinho.innerText = `Total: ${total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;

        // Eventos para remover itens
        document.querySelectorAll(".remove-item").forEach(btn => {
            btn.onclick = () => {
                const i = parseInt(btn.getAttribute("data-index"));
                carrinho.splice(i, 1);
                atualizarCarrinho();
            };
        });
    }

    if (finalizarCompra) {
        finalizarCompra.onclick = () => {
            if (carrinho.length === 0) {
                alert("Seu carrinho está vazio!");
                return;
            }

            let mensagem = "🎁 *PEDIDO - SILVEIRA PERFUMES* 🎁\n\n";
            mensagem += "Olá! Gostaria de comprar:\n\n";

            carrinho.forEach(item => {
                mensagem += `• ${item.nome} — R$ ${item.preco.toFixed(2)}\n`;
            });

            const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
            mensagem += `\n*Total: R$ ${total.toFixed(2)}*`;
            mensagem += `\n\nAguardo confirmação do pedido!`;

            const link = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
            window.open(link, "_blank");
        };
    }

    // ========== BARRA DE PESQUISA ==========
    const iconBusca = document.getElementById("icon-busca");
    const buscaBox = document.getElementById("buscaBox");
    const inputBusca = document.getElementById("inputBusca");

    if (iconBusca && buscaBox) {
        iconBusca.addEventListener("click", (e) => {
            e.stopPropagation();
            buscaBox.classList.toggle("active");
            if (buscaBox.classList.contains("active")) {
                inputBusca.focus();
            }
        });
    }

    if (inputBusca) {
        inputBusca.addEventListener("keyup", () => {
            const termo = inputBusca.value.toLowerCase().trim();
            const produtos = document.querySelectorAll(".menu .box");

            produtos.forEach(produto => {
                const nome = produto.querySelector("h3").innerText.toLowerCase();
                if (nome.includes(termo)) {
                    produto.style.display = "flex";
                } else {
                    produto.style.display = "none";
                }
            });
        });
    }

    // Fechar busca ao clicar fora
    document.addEventListener("click", (e) => {
        if (buscaBox && !buscaBox.contains(e.target) && iconBusca && !iconBusca.contains(e.target)) {
            buscaBox.classList.remove("active");
        }
    });

    // Fechar carrinho ao clicar fora (se aplicável)
    document.addEventListener("click", (e) => {
        if (carrinhoBox && carrinhoBox.classList.contains("aberto") && 
            !carrinhoBox.contains(e.target) && 
            btnCarrinho && !btnCarrinho.contains(e.target)) {
            carrinhoBox.classList.remove("aberto");
        }
    });
})
// ========== MENU MOBILE ==========
document.addEventListener("DOMContentLoaded", () => {
    // Elementos do menu mobile
    const menuMobileBtn = document.getElementById('menuMobileBtn');
    const fecharMenuBtn = document.getElementById('fecharMenuBtn');
    const navbarMobile = document.getElementById('navbarMobile');
    const overlayMenu = document.getElementById('overlayMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Função para abrir menu mobile
    function abrirMenu() {
        if (navbarMobile) {
            navbarMobile.classList.add('aberto');
        }
        if (overlayMenu) {
            overlayMenu.classList.add('ativo');
        }
        document.body.style.overflow = 'hidden'; // Impede scroll do body
    }

    // Função para fechar menu mobile
    function fecharMenu() {
        if (navbarMobile) {
            navbarMobile.classList.remove('aberto');
        }
        if (overlayMenu) {
            overlayMenu.classList.remove('ativo');
        }
        document.body.style.overflow = 'auto'; // Restaura scroll do body
    }

    // Event listeners
    if (menuMobileBtn) {
        menuMobileBtn.addEventListener('click', abrirMenu);
    }

    if (fecharMenuBtn) {
        fecharMenuBtn.addEventListener('click', fecharMenu);
    }

    if (overlayMenu) {
        overlayMenu.addEventListener('click', fecharMenu);
    }

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            // Fecha o menu primeiro
            fecharMenu();
            
            // Aguarda o menu fechar antes de rolar
            setTimeout(() => {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Calcula a posição considerando headers fixos
                    const header = document.querySelector('.header');
                    const topBar = document.querySelector('.top-bar');
                    
                    const headerHeight = header ? header.offsetHeight : 0;
                    const topBarHeight = topBar ? topBar.offsetHeight : 0;
                    const offsetTotal = headerHeight + topBarHeight + 20;
                    
                    const targetPosition = targetElement.offsetTop - offsetTotal;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 300);
        });
    });

    // Fechar menu com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navbarMobile && navbarMobile.classList.contains('aberto')) {
            fecharMenu();
        }
    });

    // Restante do seu código JavaScript existente...
    // (mantenha o código do carrinho e busca aqui)
});
// ========== EFEITOS DINÂMICOS PARA BOTÕES ==========

// Adiciona efeitos de partículas aos botões
function adicionarEfeitoParticulas() {
    document.querySelectorAll('.btn-particle, .menu .box .btn.add-cart').forEach(btn => {
        btn.addEventListener('mouseenter', function(e) {
            if (this.classList.contains('btn-particle') || this.classList.contains('add-cart')) {
                criarParticulas(e, this);
            }
        });
    });
}

function criarParticulas(e, botao) {
    const rect = botao.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Cria 8 partículas em diferentes direções
    for (let i = 0; i < 8; i++) {
        const particula = document.createElement('div');
        particula.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;
        
        // Define posição inicial
        particula.style.left = `${x}px`;
        particula.style.top = `${y}px`;
        
        // Adiciona ao botão
        botao.appendChild(particula);
        
        // Anima a partícula
        const angle = (i / 8) * Math.PI * 2;
        const speed = 2;
        const distance = 30;
        
        const animacao = particula.animate([
            { 
                transform: 'translate(0, 0) scale(1)',
                opacity: 1 
            },
            { 
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                opacity: 0 
            }
        ], {
            duration: 600,
            easing: 'ease-out'
        });
        
        // Remove a partícula após a animação
        animacao.onfinish = () => {
            particula.remove();
        };
    }
}

// Adiciona efeito de ripple (onda) a todos os botões
function adicionarEfeitoRipple() {
    document.querySelectorAll('.btn-wave-effect, .menu .box .btn.add-cart, .btn-finalizar').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            // Remove o elemento após a animação
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Adiciona estilos CSS para a animação ripple
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

// Adiciona efeito de "pulo" ao botão de carrinho quando adiciona item
function adicionarEfeitoPuloCarrinho() {
    const btnCarrinho = document.getElementById('icon-carrinho');
    if (btnCarrinho) {
        const originalTransform = btnCarrinho.style.transform;
        
        document.querySelectorAll('.add-cart').forEach(btn => {
            btn.addEventListener('click', () => {
                // Efeito de pulo no ícone do carrinho
                btnCarrinho.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    btnCarrinho.style.transform = originalTransform;
                }, 300);
                
                // Efeito de confetes (opcional)
                criarConfetes(btn);
            });
        });
    }
}

function criarConfetes(botao) {
    const rect = botao.getBoundingClientRect();
    
    for (let i = 0; i < 12; i++) {
        const confete = document.createElement('div');
        confete.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${i % 3 === 0 ? 'var(--main-color)' : i % 3 === 1 ? '#f5d2a8' : '#b8956a'};
            border-radius: ${i % 2 === 0 ? '50%' : '2px'};
            pointer-events: none;
            z-index: 9999;
            top: ${rect.top + rect.height / 2}px;
            left: ${rect.left + rect.width / 2}px;
        `;
        
        document.body.appendChild(confete);
        
        // Anima o confete
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 50;
        const duration = 800 + Math.random() * 400;
        
        confete.animate([
            { 
                transform: 'translate(0, 0) rotate(0deg)',
                opacity: 1 
            },
            { 
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance - 50}px) rotate(${360}deg)`,
                opacity: 0 
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        });
        
        // Remove o confete após a animação
        setTimeout(() => {
            confete.remove();
        }, duration);
    }
}

// Inicializa todos os efeitos quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    adicionarEfeitoParticulas();
    adicionarEfeitoRipple();
    adicionarEfeitoPuloCarrinho();
    
    // Adiciona classes de efeito aos botões existentes
    document.querySelectorAll('.menu .box .btn.add-cart').forEach(btn => {
        btn.classList.add('btn-wave-effect');
    });
    
    document.querySelectorAll('.btn-finalizar').forEach(btn => {
        btn.classList.add('btn-glow-pulse');
    });
});
// ========== EFEITOS DINÂMICOS PARA BOTÕES ==========

// Adiciona efeitos de partículas aos botões
function adicionarEfeitoParticulas() {
    document.querySelectorAll('.btn-particle, .menu .box .btn.add-cart').forEach(btn => {
        btn.addEventListener('mouseenter', function(e) {
            if (this.classList.contains('btn-particle') || this.classList.contains('add-cart')) {
                criarParticulas(e, this);
            }
        });
    });
}

function criarParticulas(e, botao) {
    const rect = botao.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Cria 8 partículas em diferentes direções
    for (let i = 0; i < 8; i++) {
        const particula = document.createElement('div');
        particula.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;
        
        // Define posição inicial
        particula.style.left = `${x}px`;
        particula.style.top = `${y}px`;
        
        // Adiciona ao botão
        botao.appendChild(particula);
        
        // Anima a partícula
        const angle = (i / 8) * Math.PI * 2;
        const speed = 2;
        const distance = 30;
        
        const animacao = particula.animate([
            { 
                transform: 'translate(0, 0) scale(1)',
                opacity: 1 
            },
            { 
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                opacity: 0 
            }
        ], {
            duration: 600,
            easing: 'ease-out'
        });
        
        // Remove a partícula após a animação
        animacao.onfinish = () => {
            particula.remove();
        };
    }
}

// Adiciona efeito de ripple (onda) a todos os botões
function adicionarEfeitoRipple() {
    document.querySelectorAll('.btn-wave-effect, .menu .box .btn.add-cart, .btn-finalizar').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            // Remove o elemento após a animação
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Adiciona estilos CSS para a animação ripple
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

// Adiciona efeito de "pulo" ao botão de carrinho quando adiciona item
function adicionarEfeitoPuloCarrinho() {
    const btnCarrinho = document.getElementById('icon-carrinho');
    if (btnCarrinho) {
        const originalTransform = btnCarrinho.style.transform;
        
        document.querySelectorAll('.add-cart').forEach(btn => {
            btn.addEventListener('click', () => {
                // Efeito de pulo no ícone do carrinho
                btnCarrinho.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    btnCarrinho.style.transform = originalTransform;
                }, 300);
                
                // Efeito de confetes (opcional)
                criarConfetes(btn);
            });
        });
    }
}

function criarConfetes(botao) {
    const rect = botao.getBoundingClientRect();
    
    for (let i = 0; i < 12; i++) {
        const confete = document.createElement('div');
        confete.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${i % 3 === 0 ? 'var(--main-color)' : i % 3 === 1 ? '#f5d2a8' : '#b8956a'};
            border-radius: ${i % 2 === 0 ? '50%' : '2px'};
            pointer-events: none;
            z-index: 9999;
            top: ${rect.top + rect.height / 2}px;
            left: ${rect.left + rect.width / 2}px;
        `;
        
        document.body.appendChild(confete);
        
        // Anima o confete
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 50;
        const duration = 800 + Math.random() * 400;
        
        confete.animate([
            { 
                transform: 'translate(0, 0) rotate(0deg)',
                opacity: 1 
            },
            { 
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance - 50}px) rotate(${360}deg)`,
                opacity: 0 
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        });
        
        // Remove o confete após a animação
        setTimeout(() => {
            confete.remove();
        }, duration);
    }
}

// Inicializa todos os efeitos quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    adicionarEfeitoParticulas();
    adicionarEfeitoRipple();
    adicionarEfeitoPuloCarrinho();
    
    // Adiciona classes de efeito aos botões existentes
    document.querySelectorAll('.menu .box .btn.add-cart').forEach(btn => {
        btn.classList.add('btn-wave-effect');
    });
    
    document.querySelectorAll('.btn-finalizar').forEach(btn => {
        btn.classList.add('btn-glow-pulse');
    });
});