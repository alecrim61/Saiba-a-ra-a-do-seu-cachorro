// Evento de clique no botão para carregar os dados
document.getElementById("fetchDataBtn").addEventListener("click", function() {
    // Substitua com a URL da sua API e a chave de API real
    const chaveApi = "live_VWGct5siPei0nEHSbu4AUZPwAoZHQO0OP45idJWLPs74AAHoojVlMq5NiKI6EgF5"; // Chave de API
    const url = "https://api.thedogapi.com/v1/breeds"; // URL da API para buscar raças de cães

    // Fazendo a requisição para a API
    fetch(url, {
        method: 'GET',
        headers: {
            'x-api-key': chaveApi // Usando a chave de API correta
        }
    })
    .then(resposta => resposta.json())
    .then(dados => {
        // Log de dados recebidos (para depuração)
        console.log(dados);
        
        // Monta a resposta da API na página
        let saida = "";

        // Dicionário de traduções dos temperamentos
        const traducaoTemperamento = {
            "Friendly": "Amigável",
            "Loyal": "Leal",
            "Intelligent": "Inteligente",
            "Active": "Ativo",
            "Playful": "Brincalhão",
            "Curious": "Curioso",
            "Independent": "Independente",
            "Courageous": "Corajoso",
            "Gentle": "Gentil",
            "Affectionate": "Afetuoso",
            "Confident": "Confiante",
            "Obedient": "Obediente",
            "Strong": "Forte",
            "Energetic": "Energético",
            "Bold": "Audacioso",
            "Calm": "Calmo",
            "Good-natured": "De bom coração",
            "Protective": "Protetor",
            "Nervous": "Nervoso",
            "Sensitive": "Sensível",
            "Extroverted": "Extrovertido",
            "Stubborn": "Teimoso",
            "Aloof": "Indiferente",
            "Clownish": "Palhaço",
            "Dignified": "Digna",
            "Happy": "Feliz",
            "Wild": "Selvagem",
            "Hardworking": "Trabalhador",
            "Dutiful": "Obediente",
            "Fun-loving": "Amante da diversão",
            "Adventurous": "Aventureiro",
            "Outgoing": "Extrovertido",
            "Alert": "Alerta",
            "Brave": "Corajoso",
            "Responsive": "Responsivo",
            "Composed": "Composto",
            "Receptive": "Receptivo",
            "Faithful":  "Fiel",
            "Loving": "Amoroso",
            "Trainable": "Treinável",
            "Responsible": "Responsável",
            "Devoted": "Devotado",
            "Assertive":  "Assertivo",
            "Willed": "Determinado",
            "Reserved": "Reservado",
            "Sweet-Tempered": "Temperamento doce",
            "Kind": "Amável",
            "Tenacious": "Tenaz",
            "Attentive": "Atento",
            "Reliable": "Confiável",
            "Fearless": "Destemido",
        };

        // A API retorna um array de objetos. Vamos exibir o nome e a imagem das raças
        dados.forEach(raca => {
            // Tradução do temperamento
            let descricao = raca.temperament ? raca.temperament : "Temperamento não disponível";
            
            // Traduz as palavras separadas por vírgulas
            let descricaoTraduzida = descricao.split(", ").map(temp => {
                // Se a palavra não estiver no dicionário, ela será mantida em inglês
                return traducaoTemperamento[temp] || temp;
            }).join(", ");

            // Se o nome da raça não for informado, podemos dar uma descrição padrão
            let nome = raca.name ? raca.name : "Nome da raça não disponível";

            saida += `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${nome}</h5>
                        <p class="card-text"><strong>Temperamento:</strong> ${descricaoTraduzida}</p>
                        <img src="${raca.image.url}" alt="${nome}" class="img-fluid" />
                    </div>
                </div>
            `;
        });

        // Exibe os dados na div com id="apiResponse"
        document.getElementById("apiResponse").innerHTML = saida;
    })
    .catch(erro => {
        // Em caso de erro, exibe uma mensagem
        console.error("Erro:", erro);
        document.getElementById("apiResponse").innerHTML = "<p>Ocorreu um erro ao buscar os dados.</p>";
    });
});
