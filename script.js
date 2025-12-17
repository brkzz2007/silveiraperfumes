document.addEventListener("DOMContentLoaded", () => {
    // ========== CARRINHO ==========
    const btnCarrinho = document.getElementById("icon-carrinho");
    const carrinhoBox = document.getElementById("carrinhoBox");
    const fecharCarrinho = document.getElementById("fecharCarrinho");
    const itensCarrinho = document.getElementById("itensCarrinho");
    const totalCarrinho = document.getElementById("totalCarrinho");
    const finalizarCompra = document.getElementById("finalizarCompra");

    const WHATSAPP = "556992456851";
    let carrinho = [];

    // Abrir e Fechar Carrinho
    if (btnCarrinho && carrinhoBox) {
        btnCarrinho.onclick = () => {
            console.log("Abrindo carrinho");
            carrinhoBox.classList.add("aberto");
        };
    }
    
    if (fecharCarrinho && carrinhoBox) {
        fecharCarrinho.onclick = () => {
            carrinhoBox.classList.remove("aberto");
        };
    }

    // Botões de adicionar ao carrinho
    document.querySelectorAll(".add-cart").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("Botão adicionar clicado");
            
            const produtoEl = btn.closest(".box");
            if (!produtoEl) {
                console.error("Elemento .box não encontrado");
                return;
            }
            
            const nomeEl = produtoEl.querySelector("h3");
            const precoEl = produtoEl.querySelector(".price");
            const imgEl = produtoEl.querySelector("img");
            
            if (!nomeEl || !precoEl || !imgEl) {
                console.error("Elementos do produto não encontrados");
                return;
            }
            
            const nome = nomeEl.innerText;
            const precoStr = precoEl.innerText.replace("R$", "").trim();
            const preco = parseFloat(precoStr.replace(".", "").replace(",", "."));
            const img = imgEl.src;
            
            console.log(`Adicionando: ${nome}, R$ ${preco}`);

            // Verifica se já existe no carrinho
            const existe = carrinho.find(item => item.nome === nome);
            if (!existe) {
                carrinho.push({ nome, preco, img, quantidade: 1 });
            } else {
                existe.quantidade += 1;
            }
            
            atualizarCarrinho();
            if (carrinhoBox) carrinhoBox.classList.add("aberto");
            
            // Efeito visual
            if (btnCarrinho) {
                btnCarrinho.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    btnCarrinho.style.transform = 'scale(1)';
                }, 300);
            }
        });
    });

    function atualizarCarrinho() {
        if (!itensCarrinho || !totalCarrinho) {
            console.error("Elementos do carrinho não encontrados");
            return;
        }
        
        itensCarrinho.innerHTML = "";
        let total = 0;

        carrinho.forEach((item, index) => {
            total += item.preco * item.quantidade;

            itensCarrinho.innerHTML += `
                <div class="item-carrinho">
                    <img src="${item.img}" class="mini-img" alt="${item.nome}">
                    <div class="info">
                        <p class="nome">${item.nome}</p>
                        <p class="preco">${item.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                        <div class="quantidade-controle">
                            <button class="diminuir" data-index="${index}">-</button>
                            <span class="quantidade">${item.quantidade}</span>
                            <button class="aumentar" data-index="${index}">+</button>
                        </div>
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

        // Eventos para quantidade
        document.querySelectorAll(".diminuir").forEach(btn => {
            btn.onclick = () => {
                const i = parseInt(btn.getAttribute("data-index"));
                if (carrinho[i].quantidade > 1) {
                    carrinho[i].quantidade -= 1;
                } else {
                    carrinho.splice(i, 1);
                }
                atualizarCarrinho();
            };
        });

        document.querySelectorAll(".aumentar").forEach(btn => {
            btn.onclick = () => {
                const i = parseInt(btn.getAttribute("data-index"));
                carrinho[i].quantidade += 1;
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
                mensagem += `• ${item.nome} (${item.quantidade}x) — R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
            });

            const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
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
            e.preventDefault();
            console.log("Ícone busca clicado");
            buscaBox.classList.toggle("active");
            if (buscaBox.classList.contains("active")) {
                inputBusca.focus();
            }
        });
    }

    if (inputBusca) {
        inputBusca.addEventListener("keyup", () => {
            const termo = inputBusca.value.toLowerCase().trim();
            console.log("Buscando por:", termo);
            const produtos = document.querySelectorAll(".menu .box");

            produtos.forEach(produto => {
                const nomeEl = produto.querySelector("h3");
                if (nomeEl) {
                    const nome = nomeEl.innerText.toLowerCase();
                    if (nome.includes(termo) || termo === "") {
                        produto.style.display = "flex";
                    } else {
                        produto.style.display = "none";
                    }
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

    // Fechar carrinho ao clicar fora
    document.addEventListener("click", (e) => {
        if (carrinhoBox && carrinhoBox.classList.contains("aberto") && 
            !carrinhoBox.contains(e.target) && 
            btnCarrinho && !btnCarrinho.contains(e.target)) {
            carrinhoBox.classList.remove("aberto");
        }
    });

    // ========== MENU MOBILE ==========
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
        document.body.style.overflow = 'hidden';
    }

    // Função para fechar menu mobile
    function fecharMenu() {
        if (navbarMobile) {
            navbarMobile.classList.remove('aberto');
        }
        if (overlayMenu) {
            overlayMenu.classList.remove('ativo');
        }
        document.body.style.overflow = 'auto';
    }

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
            
            fecharMenu();
            
            setTimeout(() => {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
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

    // ========== DEBUG ==========
    console.log("JavaScript carregado!");
    console.log("btnCarrinho:", btnCarrinho);
    console.log("iconBusca:", iconBusca);
    console.log("Botões add-cart:", document.querySelectorAll(".add-cart").length);
});