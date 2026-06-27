* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.container {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 30px;
    padding: 40px;
    max-width: 500px;
    width: 100%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

h1 {
    text-align: center;
    color: #2d3436;
    margin-bottom: 30px;
    font-size: 2.2em;
}

.card {
    background: #f8f9fa;
    border-radius: 15px;
    padding: 25px;
    margin-bottom: 20px;
}

.btn-localizacao {
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
    color: white;
    border: none;
    border-radius: 50px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
}

.btn-localizacao:hover {
    transform: scale(1.02);
    box-shadow: 0 5px 20px rgba(0, 206, 201, 0.4);
}

.btn-localizacao:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.status {
    text-align: center;
    color: #6c757d;
    margin-top: 15px;
    font-size: 0.95em;
}

.resultado-clima {
    text-align: center;
}

.icone-tempo {
    font-size: 4em;
    margin-bottom: 10px;
}

.cidade {
    font-size: 1.5em;
    font-weight: bold;
    color: #2d3436;
}

.temperatura {
    font-size: 3em;
    font-weight: bold;
    color: #6c5ce7;
    margin: 10px 0;
}

.descricao {
    font-size: 1.1em;
    color: #636e72;
    text-transform: capitalize;
}

.conversoes {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin: 20px 0;
}

.conversoes button {
    padding: 8px 20px;
    background: #dfe6e9;
    border: none;
    border-radius: 20px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
}

.conversoes button:hover {
    background: #6c5ce7;
    color: white;
    transform: scale(1.05);
}

.detalhes {
    display: flex;
    justify-content: space-around;
    color: #2d3436;
    font-size: 0.95em;
    padding-top: 15px;
    border-top: 2px solid #dfe6e9;
}

.erro {
    background: #ffeaa7;
    color: #d63031;
    padding: 15px;
    border-radius: 10px;
    text-align: center;
    font-weight: bold;
}

/* Loading animation */
@keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
}

.carregando {
    animation: pulse 1s infinite;
}

@media (max-width: 600px) {
    .container {
        padding: 20px;
    }
    
    .temperatura {
        font-size: 2.5em;
    }
    
    .detalhes {
        flex-direction: column;
        gap: 5px;
    }
}