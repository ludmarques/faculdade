// ============================================
// ROTA CARREIRA - APP DE ESTUDOS
// ============================================

// ===== VARIÁVEIS GLOBAIS =====
let respostas = {
    area: '',
    tempo: ''
};

let aulas = [];
let aulaAtualIndex = 0;
let aulasConcluidas = [];

// ===== PLANOS DE ESTUDO POR ÁREA =====
const planos = {
    frontend: {
        nome: 'Front-end',
        emoji: '🎨',
        aulas: [
            { titulo: 'Introdução ao HTML', descricao: 'Estruturas básicas', tempo: '15 min' },
            { titulo: 'CSS - Estilizando sua página', descricao: 'Cores, fontes e layout', tempo: '20 min' },
            { titulo: 'JavaScript - Interatividade', descricao: 'Eventos e DOM', tempo: '25 min' },
            { titulo: 'Responsividade', descricao: 'Design para celular', tempo: '20 min' },
            { titulo: 'Projeto Prático', descricao: 'Crie sua primeira página', tempo: '30 min' }
        ]
    },
    backend: {
        nome: 'Back-end',
        emoji: '⚙️',
        aulas: [
            { titulo: 'Introdução ao Node.js', descricao: 'O que é back-end', tempo: '15 min' },
            { titulo: 'APIs REST', descricao: 'Como funcionam as APIs', tempo: '20 min' },
            { titulo: 'Bancos de Dados', descricao: 'SQL e NoSQL', tempo: '25 min' },
            { titulo: 'Autenticação', descricao: 'Login e segurança', tempo: '20 min' },
            { titulo: 'Deploy', descricao: 'Colocando no ar', tempo: '30 min' }
        ]
    },
    dados: {
        nome: 'Dados',
        emoji: '📊',
        aulas: [
            { titulo: 'Introdução à Análise', descricao: 'O que são dados', tempo: '15 min' },
            { titulo: 'Python para Dados', descricao: 'Pandas e NumPy', tempo: '25 min' },
            { titulo: 'Visualização', descricao: 'Gráficos com Matplotlib', tempo: '20 min' },
            { titulo: 'Machine Learning', descricao: 'Conceitos básicos', tempo: '30 min' },
            { titulo: 'Projeto Prático', descricao: 'Analise um dataset real', tempo: '35 min' }
        ]
    }
};

// ===== FUNÇÕES DE NAVEGAÇÃO =====
function mostrarTela(id) {
    const telas = document.querySelectorAll('.tela');
    telas.forEach(tela => tela.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    
    // Se for a tela de plano, gera o conteúdo
    if (id === 'telaPlano') {
        gerarPlano();
    }
    
    // Se for checkpoint, mostra a aula atual
    if (id === 'telaCheckpoint') {
        mostrarAulaAtual();
    }
}

// ===== SELEÇÃO DE OPÇÕES =====
function selecionarOpcao(elemento, valor) {
    // Remove seleção anterior
    const parent = elemento.parentElement;
    parent.querySelectorAll('.opcao').forEach(el => el.classList.remove('selecionado'));
    
    // Seleciona o atual
    elemento.classList.add('selecionado');
    
    // Habilita o botão Próximo
    const btn = document.getElementById('btnProximo1');
    btn.disabled = false;
    
    // Guarda a resposta
    respostas.area = valor;
}

function selecionarOpcao2(elemento, valor) {
    // Remove seleção anterior
    const parent = elemento.parentElement;
    parent.querySelectorAll('.opcao').forEach(el => el.classList.remove('selecionado'));
    
    // Seleciona o atual
    elemento.classList.add('selecionado');
    
    // Habilita o botão Próximo
    const btn = document.getElementById('btnProximo2');
    btn.disabled = false;
    
    // Guarda a resposta
    respostas.tempo = valor;
}

// ===== PRÓXIMOS PASSOS =====
function proximoPasso() {
    if (respostas.area) {
        mostrarTela('telaQuestionario2');
    }
}

function proximoPasso2() {
    if (respostas.tempo) {
        mostrarTela('telaPlano');
    }
}

// ===== GERAR PLANO DE ESTUDOS =====
function gerarPlano() {
    const plano = planos[respostas.area];
    const tempoMap = {
        '30min': '30 min/dia',
        '1h': '1 hora/dia',
        'mais': 'Mais de 1 hora/dia'
    };
    
    // Atualiza descrição
    document.getElementById('descricaoPlano').textContent = 
        `${plano.emoji} ${plano.nome} - ${tempoMap[respostas.tempo]}`;
    
    // Gera lista de aulas
    const lista = document.getElementById('listaAulas');
    lista.innerHTML = '';
    
    const diasSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    
    aulas = plano.aulas;
    aulasConcluidas = [];
    
    aulas.forEach((aula, index) => {
        const dia = diasSemana[index % diasSemana.length];
        const div = document.createElement('div');
        div.className = 'aula-item';
        div.innerHTML = `
            <div class="info">
                <strong>${aula.titulo}</strong>
                <span>${aula.descricao}</span>
            </div>
            <div class="dia">${dia}</div>
        `;
        lista.appendChild(div);
    });
}

// ===== MOSTRAR AULA ATUAL =====
function mostrarAulaAtual() {
    if (aulaAtualIndex >= aulas.length) {
        document.getElementById('aulaAtual').innerHTML = `
            <div class="icone-aula">🎉</div>
            <div class="titulo-aula">Parabéns!</div>
            <div class="descricao-aula">Você concluiu todas as aulas!</div>
        `;
        document.getElementById('btnConcluir').style.display = 'none';
        return;
    }
    
    const aula = aulas[aulaAtualIndex];
    const aulaDiv = document.getElementById('aulaAtual');
    aulaDiv.innerHTML = `
        <div class="icone-aula">📚</div>
        <div class="titulo-aula">${aula.titulo}</div>
        <div class="descricao-aula">${aula.descricao}</div>
        <div class="tempo-aula">⏱️ ${aula.tempo}</div>
    `;
    
    // Atualiza o progresso semanal
    atualizarProgressoSemanal();
}

// ===== MARCAR COMO CONCLUÍDO =====
function marcarConcluido() {
    if (aulaAtualIndex < aulas.length) {
        aulasConcluidas.push(aulaAtualIndex);
        aulaAtualIndex++;
        mostrarAulaAtual();
        atualizarProgressoSemanal();
        
        // Atualiza a lista de aulas no plano
        gerarPlano();
    }
}

// ===== ATUALIZAR PROGRESSO SEMANAL =====
function atualizarProgressoSemanal() {
    const container = document.getElementById('progressoSemanal');
    const diasSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    const totalDias = Math.min(aulas.length, 7);
    
    let html = '';
    for (let i = 0; i < totalDias; i++) {
        const concluido = i < aulasConcluidas.length;
        html += `
            <div class="dia-semana ${concluido ? 'concluido' : ''}">
                <div class="dia-nome">${diasSemana[i]}</div>
                <div class="dia-status ${concluido ? 'concluido' : ''}">${concluido ? '✅' : '⬜'}</div>
            </div>
        `;
    }
    container.innerHTML = html;
}

// ===== INICIALIZAR =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎓 Rota Carreira - App de Estudos');
    console.log('Vamos começar sua jornada!');
});