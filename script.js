// ============================================
// CONFIGURAÇÃO DA API
// ============================================

const API_KEY = '158f29137995727cdcae10f700272c5d'; // ⚠️ COLOQUE SUA CHAVE AQUI!

// ============================================
// VARIÁVEIS
// ============================================

let temperaturaClima = null;

// ============================================
// FUNÇÃO PARA BUSCAR CLIMA
// ============================================

function buscarClima() {
    const botao = document.getElementById('btnClima');
    const status = document.getElementById('statusClima');
    
    // Verifica se o navegador suporta geolocalização
    if (!navigator.geolocation) {
        status.textContent = '❌ Seu navegador não suporta geolocalização.';
        return;
    }
    
    // Desabilita o botão
    botao.disabled = true;
    botao.textContent = '⏳ Buscando localização...';
    status.textContent = '⏳ Obtendo sua localização...';
    status.className = 'status-clima carregando';
    
    // Pega a localização
    navigator.geolocation.getCurrentPosition(
        // Sucesso
        function(posicao) {
            const lat = posicao.coords.latitude;
            const lon = posicao.coords.longitude;
            status.textContent = '📍 Localização encontrada! Buscando clima...';
            buscarClimaPorCoordenadas(lat, lon);
        },
        // Erro
        function(erro) {
            botao.disabled = false;
            botao.textContent = '🌤️ Buscar Clima da Minha Cidade';
            status.className = 'status-clima';
            
            let mensagem = '';
            switch(erro.code) {
                case erro.PERMISSION_DENIED:
                    mensagem = '❌ Você negou o acesso à localização. Permita no navegador.';
                    break;
                case erro.POSITION_UNAVAILABLE:
                    mensagem = '❌ Não foi possível obter a localização.';
                    break;
                case erro.TIMEOUT:
                    mensagem = '⏰ Tempo esgotado. Tente novamente.';
                    break;
                default:
                    mensagem = '❌ Erro ao obter localização.';
            }
            status.textContent = mensagem;
        }
    );
}

// ============================================
// BUSCAR CLIMA POR COORDENADAS
// ============================================

function buscarClimaPorCoordenadas(lat, lon) {
    const status = document.getElementById('statusClima');
    const botao = document.getElementById('btnClima');
    
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            return response.json();
        })
        .then(dados => {
            // Guarda a temperatura
            temperaturaClima = Math.round(dados.main.temp);
            
            // Mostra no campo da calculadora
            document.getElementById('valor').value = temperaturaClima;
            document.getElementById('unidadeOrigem').value = 'celsius';
            
            // Atualiza status
            const cidade = dados.name;
            const pais = dados.sys.country;
            const descricao = dados.weather[0].description;
            const icone = converterIcone(dados.weather[0].icon);
            
            status.innerHTML = `
                ✅ Clima de ${cidade}, ${pais}: ${icone} ${temperaturaClima}°C - ${descricao}
                <br><small>💧 Umidade: ${dados.main.humidity}% | 💨 Vento: ${Math.round(dados.wind.speed * 3.6)} km/h</small>
            `;
            status.className = 'status-clima';
            
            // Habilita o botão
            botao.disabled = false;
            botao.textContent = '🌤️ Atualizar Clima';
            
            // Mostra a conversão automaticamente
            converter();
        })
        .catch(erro => {
            botao.disabled = false;
            botao.textContent = '🌤️ Buscar Clima da Minha Cidade';
            status.className = 'status-clima';
            status.textContent = '❌ Erro ao buscar clima: ' + erro.message;
        });
}

// ============================================
// FUNÇÃO DE CONVERSÃO (SUA ORIGINAL MELHORADA)
// ============================================

function converter() {
    let valor = parseFloat(document.getElementById('valor').value);
    let unidadeOrigem = document.getElementById('unidadeOrigem').value;
    let unidadeDestino = document.getElementById('unidadeDestino').value;
    
    if (isNaN(valor)) {
        document.getElementById('resultado').textContent = '⚠️ Digite um número válido!';
        document.getElementById('resultado').style.color = '#dc3545';
        return;
    }
    
    // Converte para Celsius (base)
    let celsius = 0;
    switch(unidadeOrigem) {
        case 'celsius':
            celsius = valor;
            break;
        case 'fahrenheit':
            celsius = (valor - 32) * 5/9;
            break;
        case 'kelvin':
            celsius = valor - 273.15;
            break;
    }
    
    // Converte para a unidade destino
    let resultado = 0;
    let simbolo = '';
    switch(unidadeDestino) {
        case 'celsius':
            resultado = celsius;
            simbolo = '°C';
            break;
        case 'fahrenheit':
            resultado = celsius * 9/5 + 32;
            simbolo = '°F';
            break;
        case 'kelvin':
            resultado = celsius + 273.15;
            simbolo = 'K';
            break;
    }
    
    resultado = Math.round(resultado * 100) / 100;
    
    let resultadoElement = document.getElementById('resultado');
    resultadoElement.textContent = `${valor} ${unidadeOrigem} = ${resultado} ${simbolo}`;
    resultadoElement.style.color = '#28a745';
}

// ============================================
// FUNÇÃO AUXILIAR - CONVERTER ÍCONE
// ============================================

function converterIcone(icone) {
    const map = {
        '01d': '☀️', '01n': '🌙',
        '02d': '⛅', '02n': '☁️',
        '03d': '☁️', '03n': '☁️',
        '04d': '☁️', '04n': '☁️',
        '09d': '🌧️', '09n': '🌧️',
        '10d': '🌦️', '10n': '🌧️',
        '11d': '⛈️', '11n': '⛈️',
        '13d': '❄️', '13n': '❄️',
        '50d': '🌫️', '50n': '🌫️'
    };
    return map[icone] || '🌡️';
}

// ============================================
// EXECUTAR QUANDO A PÁGINA CARREGAR
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌡️ Calculadora de Temperatura + Clima carregada!');
    console.log('Clique em "Buscar Clima" para usar sua localização!');
});

// ============================================
// FUNÇÃO LEGADO (SEU CÓDIGO ORIGINAL)
// ============================================

function testarConversao() {
    const kelvin = 300;
    const celsius = kelvin - 273.15;
    const fahrenheit = Math.floor(celsius * (9/5) + 32);
    
    console.log(`🌡️ Teste com Kelvin ${kelvin}K:`);
    console.log(`Celsius: ${celsius}°C`);
    console.log(`Fahrenheit: ${fahrenheit}°F`);
    
    const newton = Math.floor(celsius * (33/100));
    console.log(`Newton: ${newton}°N`);
}

// Executa o teste
testarConversao();