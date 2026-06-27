
// Função principal que converte temperaturas
function converter() {
    // Pega o valor digitado e as unidades selecionadas
    let valor = parseFloat(document.getElementById('valor').value);
    let unidadeOrigem = document.getElementById('unidadeOrigem').value;
    let unidadeDestino = document.getElementById('unidadeDestino').value;
    
    // Verifica se o valor é válido
    if (isNaN(valor)) {
        document.getElementById('resultado').textContent = '⚠️ Digite um número válido!';
        document.getElementById('resultado').style.color = '#dc3545';
        return;
    }
    
    // Primeiro converte para Celsius (base)
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
    
    // Agora converte de Celsius para a unidade destino
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
    
    // Arredonda para 2 casas decimais (igual ao metfloor mas com arredondamento)
    resultado = Math.round(resultado * 100) / 100;
    
    // Exibe o resultado
    let resultadoElement = document.getElementById('resultado');
    resultadoElement.textContent = `${valor} ${unidadeOrigem} = ${resultado} ${simbolo}`;
    resultadoElement.style.color = '#28a745';
}

// ============================================
// FUNÇÕES ADICIONAIS 
// ============================================


function testarConversao() {
    // Como você fez originalmente
    const kelvin = 300;
    const celsius = kelvin - 273.15;
    const fahrenheit = Math.floor(celsius * (9/5) + 32);
    
    console.log(`🌡️ Teste com Kelvin ${kelvin}K:`);
    console.log(`Celsius: ${celsius}°C`);
    console.log(`Fahrenheit: ${fahrenheit}°F`);
    
    
    const newton = Math.floor(celsius * (33/100));
    console.log(`Newton: ${newton}°N`);
}

// Executa o teste automaticamente quando a página carrega
console.log('🔥 Calculadora de Temperatura carregada!');
console.log('Digite testarConversao() no console para ver seu código original funcionando!');
testarConversao();

// ============================================
// VALIDAÇÕES EXTRAS (para o zero absoluto)
// ============================================

// Adiciona validação quando o usuário digita
document.addEventListener('DOMContentLoaded', function() {
    const inputValor = document.getElementById('valor');
    
    inputValor.addEventListener('input', function() {
        let valor = parseFloat(this.value);
        let unidade = document.getElementById('unidadeOrigem').value;
        
        // Zero absoluto em cada unidade
        let limite = 0;
        switch(unidade) {
            case 'celsius': limite = -273.15; break;
            case 'fahrenheit': limite = -459.67; break;
            case 'kelvin': limite = 0; break;
        }
        
        if (valor < limite) {
            document.getElementById('resultado').textContent = 
                `⚠️ Atenção: ${valor} está abaixo do zero absoluto! (${limite})`;
            document.getElementById('resultado').style.color = '#ffc107';
        }
    });
});