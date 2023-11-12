const idTotem = Number(window.location.search.replace('?idTotem=', ''));
const IDEAL_TIME_USAGE = 15 * 86400; //15 dias em segundos

const usbStatus = document.getElementById('usbStatus');
const kpiCPU = document.getElementById('kpiCPU');
const kpiRAM = document.getElementById('kpiRAM');
const kpiHD = document.getElementById('kpiHD');
const totemDisks = document.getElementById('totemDisks');

const usageTime = {
    dayUsage: document.getElementById('dayUsage'),
    hoursUsage: document.getElementById('hoursUsage'),
    minutesUsage: document.getElementById('minutesUsage'),
}

const previousTotemButton = document.getElementById("previousTotemButton");
const nextTotemButton = document.getElementById("nextTotemButton");

window.addEventListener('load', () => {
    displayAllDisks();
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

        switch (element.tipo) {
            case "MEMORIA":
                memoryData.push(element);
                break;
            case "PROCESSADOR":
                cpuData.push(element);
                break;
            case "TAXA_TRANSFERENCIA":
                discData.push(element);
                break;
        }
    });

    drawChartData(formatData(memoryData, "MEMORIA"), RAMChart);
    drawChartData(formatData(cpuData, "PROCESSADOR"), cpuChart);
    drawChartData(formatData(discData, "DISCO"), HDChart);
}

async function displayTotemInfo() {
    const data = await getTotemInfo();
    const totemInfo = data[0];

    if(data.length === 0) {
        alert("Esse totem não existe :(");
        history.back();
    }

    if(!totemInfo.totemAnteriorExiste) {
        previousTotemButton.classList.add("disableButton");
        previousTotemButton.onclick = "";
    }

    if(!totemInfo.proximoTotemExiste) {
        nextTotemButton.classList.add("disableButton");
        nextTotemButton.onclick = ""
    }

    document.getElementById("totemName").innerHTML = totemInfo.nome;
    document.getElementById("totemKey").innerHTML += totemInfo.chaveDeAcesso;
    document.getElementById("totemProcessador").innerHTML += totemInfo.nomeProcessador;
    document.getElementById("totemSO").innerHTML += totemInfo.sistemaOperacional;
    document.getElementById("totemRAM").innerHTML += (totemInfo.capacidadeRam/1000000000).toFixed(2) + " GB";
    
    totemDisks.innerHTML += `
        <p>
            <br>
            <strong>Capacidade total dos discos: </strong>
            ${(totemInfo.capacidadeDisco/1000000000).toFixed(2)}GB
        </p>
    `;
}

async function displayKPIs() {
    const data = await getKPIsData();
    console.log(data);

    usbStatus.innerText = data.find(item => item.tipo === "USB").valorCaptura === 1 ? "Ativo" : "Inativo";
    kpiCPU.innerText = data.find(item => item.tipo === "PROCESSADOR").valorCaptura.toFixed(2) + "%";
    kpiRAM.innerText = data.find(item => item.tipo === "MEMORIA").valorCaptura.toFixed(2) + "%";
    kpiHD.innerText = data.find(item => item.tipo === "TAXA_TRANSFERENCIA").valorCaptura.toFixed(2) + "%";

    const time = formatUsageTime(data.find(item => item.tipo === "TEMPO_ATIVIDADE").valorCaptura);
    
    usageTime.dayUsage.innerText = String(time.days).padStart(2, "0");
    usageTime.hoursUsage.innerText = String(time.hours).padStart(2, "0");
    usageTime.minutesUsage.innerText = String(time.minutes).padStart(2, "0");

    setPercentTimeUsage(data.find(item => item.tipo === "TEMPO_ATIVIDADE").valorCaptura);
}

function setPercentTimeUsage(time) {
    let usagePercent = (time * 100)/IDEAL_TIME_USAGE;
    
    usagePercent > 100 && (usagePercent = 100);
    
    let chartColor = "#E3B90F";
    
    chartColor = usagePercent > 50 ? "#F0951A" : chartColor;
    chartColor = usagePercent > 80 ? "#DC4444" : chartColor;
    
    gaugeChart.data.datasets[0].data = [usagePercent, (100 - usagePercent)];
    gaugeChart.data.datasets[0].backgroundColor = [chartColor, "transparent"];
    gaugeChart.update();
}

async function displayAllDisks() {
    const data = await getTotemInfoDisks();

    const diskChartDefaultConfig = {
        data: [],
        tension: .4,
        fill: true,
        backgroundColor: '#BD06DD',
        borderRadius: 10,
    }

    data.forEach((item, index) => {
        const backgroundColor = tinycolor(diskChartDefaultConfig.backgroundColor).darken(10 * index).toHexString();
        
        let chartConfig = {...diskChartDefaultConfig, backgroundColor, label: item.nomeComponente };

        HDChart.data.datasets.push(chartConfig);

        totemDisks.innerHTML += `
            <div>
                <strong>• ${item.nomeComponente}</strong>
            </div>
        `;  
    });

    displayTotemInfo();
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

async function getTotemInfo() {
    const response = await fetch(`/totem/${idTotem}/info`);

    const data = await response.json();

    return data;
}

async function getTotemInfoDisks() {
    const response = await fetch(`/totem/${idTotem}/infoDiscos`);

    const data = await response.json();

    return data;
}

function drawChartData(componentData, chart) {
    chart.data.labels = [];
    chart.data.datasets.map((item) => item.data = []);

    for(let captura of componentData) {
        if(Array.isArray(captura)) {
            chart.data.labels.push(captura[0].dataMes);
            captura.forEach((item, index) => {
                chart.data.datasets[index].data.push(item.valorCaptura);
            });
        } else {
            chart.data.labels.push(captura.dataMes);
            chart.data.datasets[0].data.push(captura.valorCaptura);
        }
    }

    chart.update();
}

function formatData(componentData, componentName) {
    let component = [];

    const today = new Date();

    const isArrayData = componentData.length > 1;

    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);

        date.setDate(today.getDate() - i);
        
        const formattedDate = [days[date.getDay()], `(${formatDate(date)})`];
        componentData.map((item) => {
            if(item.dataMes === formatDate(date)) {
                return item.dataMes = formattedDate;
            }
        });
        
        let currentItems = componentData.filter(item => item.dataMes === formattedDate);
        if(currentItems.length > 0) {
            component[i] = currentItems.length > 1 ? currentItems : currentItems[0];
        } else {
            const defaultValue = { dataMes: formattedDate, tipoComponente: componentName, valorCaptura: 0 };

            if(isArrayData) {
                component[i] = [];

                componentData.forEach(() => component[i].push(defaultValue));
            } else {
                component[i] = defaultValue; 
            }
        }
    }

    return component.reverse();
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

function formatDate(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');

    return `${dia}/${mes}`;
}

const days = [
    "Dom",
    "Seg",
    "Ter",
    "Qua",
    "Qui",
    "Sex",
    "Sab",
];
