// Verifica se o Chart.js está disponível
if (typeof Chart !== 'undefined') {

    // Gráfico de Utilização de Tecnologia
    const ctxUtilizacao = document.getElementById('chartUtilizacao').getContext('2d');
    const chartUtilizacao = new Chart(ctxUtilizacao, {
        type: 'pie',
        data: {
            labels: ['Blockchain', 'IA', 'Conectividade'],
            datasets: [{
                data: [40, 35, 25],
                backgroundColor: ['#00c3ff', '#008ecf', '#006d9c'],
                borderColor: '#1a1a1a',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // Gráfico de Adoção da Tecnologia ao Longo do Tempo
    const ctxAdocao = document.getElementById('chartAdocao').getContext('2d');
    const chartAdocao = new Chart(ctxAdocao, {
        type: 'line',
        data: {
            labels: ['2021', '2022', '2023', '2024', '2025'],
            datasets: [{
                label: 'Adoção',
                data: [20, 35, 50, 75, 90],
                borderColor: '#00c3ff',
                backgroundColor: '#008ecf',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#333'
                    }
                },
                x: {
                    grid: {
                        color: '#333'
                    }
                }
            }
        }
    });

    // Gráfico de Nível de Segurança
    const ctxSeguranca = document.getElementById('chartSeguranca').getContext('2d');
    const chartSeguranca = new Chart(ctxSeguranca, {
        type: 'bar',
        data: {
            labels: ['Autenticação', 'Criptografia', 'Backup'],
            datasets: [{
                label: 'Nível de Segurança',
                data: [85, 90, 75],
                backgroundColor: ['#00c3ff', '#008ecf', '#006d9c'],
                borderColor: '#1a1a1a',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#333'
                    }
                },
                x: {
                    grid: {
                        color: '#333'
                    }
                }
            }
        }
    });

} else {
    console.error("Chart.js não encontrado. Certifique-se de que está incluído no projeto.");
}
