const idTotem = Number(window.location.search.replace('?idTotem=', ''));

window.addEventListener('load', () => {
    generateChartsData();
});

async function generateChartsData() {
    const data = await getChartsData();

    var memoryData = [];
    var cpuData = [];
    var discData = [];

    data.forEach(element => {
        element.dataCaptura = days[element.dataCaptura];

        switch (element.tipoComponente) {
            case "MEMORIA":
                memoryData.push(element);
                break;
            case "PROCESSADOR":
                cpuData.push(element);
                break;
            case "DISCO":
                discData.push(element);
                break;
        }
    });

    drawChartData(formatData(memoryData, "MEMORIA"), RAMChart);
    drawChartData(formatData(cpuData, "PROCESSADOR"), cpuChart);
    drawChartData(formatData(discData, "DISCO"), HDChart);
}

async function getChartsData() {
    const response = await fetch(`/dadosComponentes/buscarDadosGraficos/${idTotem}`);

    const data = await response.json();

    return data;
}

function formatData(componentData, componentName) {
    let component = [];

    days.forEach((element, index) => {
        if(componentData.find(item => item.dataCaptura === element)) {
            component[index] = componentData.find(item => item.dataCaptura === element);
        } else {
            component[index] = { dataCaptura: element, tipoComponente: componentName, valorCaptura: 0 };
        }
    });

    return component;
}

function drawChartData(componentData, chart) {
    let labelChart = [];
    let dataChart = [];

    for(let captura of componentData) {
        labelChart.push(captura.dataCaptura);
        dataChart.push(captura.valorCaptura);
    }

    chart.data.labels = labelChart;
    chart.data.datasets[0].data = dataChart;

    chart.update();
}

const days = [
    "Seg",
    "Ter",
    "Qua",
    "Qui",
    "Sex",
    "Sab",
    "Dom"
];
