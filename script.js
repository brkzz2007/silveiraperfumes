document.addEventListener("DOMContentLoaded", () => {
    const btnCarrinho = document.getElementById("icon-carrinho");
    const carrinhoBox = document.getElementById("carrinhoBox");
    const fecharCarrinho = document.getElementById("fecharCarrinho");
    const itensCarrinho = document.getElementById("itensCarrinho");
    const totalCarrinho = document.getElementById("totalCarrinho");
    const finalizarCompra = document.getElementById("finalizarCompra");

    const WHATSAPP = "5569984520192"; // SEU NÚMERO

    let carrinho = [];

    // Abrir e Fechar Carrinho
    btnCarrinho.onclick = () => carrinhoBox.classList.add("aberto");
    fecharCarrinho.onclick = () => carrinhoBox.classList.remove("aberto");

    // Botões de adicionar
    document.querySelectorAll(".add-cart").forEach(btn => {
        btn.addEventListener("click", () => {
            const produtoEl = btn.closest(".box");
            const nome = produtoEl.querySelector("h3").innerText;
            const precoStr = produtoEl.querySelector(".price").innerText.replace("R$", "").trim();
            const preco = parseFloat(precoStr.replace(".", "").replace(",", "."));
            const img = produtoEl.querySelector("img").src;

            carrinho.push({ nome, preco, img });
            atualizarCarrinho();
            carrinhoBox.classList.add("aberto");
        });
    });

    function atualizarCarrinho() {
        itensCarrinho.innerHTML = "";
        let total = 0;

        carrinho.forEach((item, index) => {
            total += item.preco;

            itensCarrinho.innerHTML += `
                <div class="item-carrinho">
                    <img src="${item.img}" class="mini-img">
                    <div class="info">
                        <p>${item.nome}</p>
                        <p>${item.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                    </div>
                   <button class="remover" data-index="${index}" title="Remover produto">
  🗑️
</button>

                </div>
            `;
        });

        totalCarrinho.innerText = `Total: ${total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;

        // remover item
        document.querySelectorAll(".remover").forEach(btn => {
            btn.onclick = () => {
                const i = btn.getAttribute("data-index");
                carrinho.splice(i, 1);
                atualizarCarrinho();
            };
        });
    }

    finalizarCompra.onclick = () => {
        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }

        let mensagem = "Pedido - Silveira Perfumes\n\n";

        carrinho.forEach(item => {
            mensagem += `• ${item.nome} — R$ ${item.preco.toFixed(2)}\n`;
        });

        const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
        mensagem += `\nTotal: R$ ${total.toFixed(2)}`;

        const link = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
        window.open(link, "_blank");
    };
});


iconBusca.addEventListener("click", () => {
  buscaBox.style.display =
    buscaBox.style.display === "block" ? "none" : "block";
});


inputBusca.addEventListener("keyup", () => {
  const termo = inputBusca.value.toLowerCase();
  const produtos = document.querySelectorAll(".menu .box");

  produtos.forEach(produto => {
    const nome = produto.querySelector("h3").innerText.toLowerCase();
    produto.style.display = nome.includes(termo) ? "block" : "none";
  });
});

document.addEventListener("DOMContentLoaded", () => {
    const btnCarrinho = document.getElementById("icon-carrinho");
    const carrinhoBox = document.getElementById("carrinhoBox");
    const fecharCarrinho = document.getElementById("fecharCarrinho");
    const itensCarrinho = document.getElementById("itensCarrinho");
    const totalCarrinho = document.getElementById("totalCarrinho");
    const finalizarCompra = document.getElementById("finalizarCompra");

    const WHATSAPP = "5569984520192"; // SEU NÚMERO

    let carrinho = [];

    // Abrir e Fechar Carrinho
    btnCarrinho.onclick = () => carrinhoBox.classList.add("aberto");
    fecharCarrinho.onclick = () => carrinhoBox.classList.remove("aberto");

    // Botões de adicionar
    document.querySelectorAll(".add-cart").forEach(btn => {
        btn.addEventListener("click", () => {
            const produtoEl = btn.closest(".box");
            const nome = produtoEl.querySelector("h3").innerText;
            const precoStr = produtoEl.querySelector(".price").innerText.replace("R$", "").trim();
            const preco = parseFloat(precoStr.replace(".", "").replace(",", "."));
            const img = produtoEl.querySelector("img").src;

            carrinho.push({ nome, preco, img });
            atualizarCarrinho();
            carrinhoBox.classList.add("aberto");
        });
    });

    function atualizarCarrinho() {
        itensCarrinho.innerHTML = "";
        let total = 0;

        carrinho.forEach((item, index) => {
            total += item.preco;

            itensCarrinho.innerHTML += `
                <div class="item-carrinho">
                    <img src="${item.img}" class="mini-img">
                    <div class="info">
                        <p>${item.nome}</p>
                        <p>${item.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                    </div>
                   <button class="remover" data-index="${index}" title="Remover produto">
  🗑️
</button>

                </div>
            `;
        });

        totalCarrinho.innerText = `Total: ${total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;

        // remover item
        document.querySelectorAll(".remover").forEach(btn => {
            btn.onclick = () => {
                const i = btn.getAttribute("data-index");
                carrinho.splice(i, 1);
                atualizarCarrinho();
            };
        });
    }

    finalizarCompra.onclick = () => {
        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }

        let mensagem = "Pedido - Silveira Perfumes\n\n";

        carrinho.forEach(item => {
            mensagem += `• ${item.nome} — R$ ${item.preco.toFixed(2)}\n`;
        });

        const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
        mensagem += `\nTotal: R$ ${total.toFixed(2)}`;

        const link = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
        window.open(link, "_blank");
    };
});
const iconBusca = document.getElementById("icon-busca");
const buscaBox = document.getElementById("buscaBox");
const inputBusca = document.getElementById("inputBusca");


iconBusca.addEventListener("click", () => {
  buscaBox.style.display =
    buscaBox.style.display === "block" ? "none" : "block";
});


inputBusca.addEventListener("keyup", () => {
  const termo = inputBusca.value.toLowerCase();
  const produtos = document.querySelectorAll(".menu .box");

  produtos.forEach(produto => {
    const nome = produto.querySelector("h3").innerText.toLowerCase();
    produto.style.display = nome.includes(termo) ? "block" : "none";
  });
});

