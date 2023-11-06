const idTotem = Number(window.location.search.replace('?idTotem=', ''));
const IDEAL_TIME_USAGE = 15 * 86400; //15 dias em segundos

const usbStatus = document.getElementById('usbStatus');
const kpiCPU = document.getElementById('kpiCPU');
const kpiRAM = document.getElementById('kpiRAM');
const kpiHD = document.getElementById('kpiHD');

const usageTime = {
    dayUsage: document.getElementById('dayUsage'),
    hoursUsage: document.getElementById('hoursUsage'),
    minutesUsage: document.getElementById('minutesUsage'),
}

window.addEventListener('load', () => {
    generateChartsData();
    displayKPIs();
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

async function displayKPIs() {
    const data = await getKPIsData();

    usbStatus.innerText = data.find(item => item.tipo === "USB").valorCaptura === 1 ? "Ativo" : "Inativo";
    kpiCPU.innerText = data.find(item => item.tipo === "PROCESSADOR").valorCaptura.toFixed(2) + "%";
    kpiRAM.innerText = data.find(item => item.tipo === "MEMORIA").valorCaptura.toFixed(2) + "%";

    const time = formatUsageTime(data.find(item => item.tipo === "TEMPO_ATIVIDADE").valorCaptura);
    
    usageTime.dayUsage.innerText = String(time.days).padStart(2, "0");
    usageTime.hoursUsage.innerText = String(time.hours).padStart(2, "0");
    usageTime.minutesUsage.innerText = String(time.minutes).padStart(2, "0");

    setPercentTimeUsage(data.find(item => item.tipo === "TEMPO_ATIVIDADE").valorCaptura);
}

function setPercentTimeUsage(time) {
    let usagePercent = (time * 100)/IDEAL_TIME_USAGE;
    
    usagePercent > 100 && (usagePercent = 100);
    
    gaugeChart.data.datasets[0].data = [usagePercent, (100 - usagePercent)];
    gaugeChart.update();
}

async function getKPIsData() {
    const response = await fetch(`/dadosComponentes/buscarDadosKPIs/${idTotem}`);

    const data = await response.json();

    return data;
}

async function getChartsData() {
    const response = await fetch(`/dadosComponentes/buscarDadosGraficos/${idTotem}`);

    const data = await response.json();

    return data;
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

function formatUsageTime(time) {
    let restTime = time;

    const days = Math.floor(restTime/86400);
    restTime %= 86400;
    
    const hours = Math.floor(restTime/3600);
    restTime %= 3600;
    
    const minutes = Math.floor(restTime/60);
    restTime %= 60;
    
    return { days, hours, minutes };
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
