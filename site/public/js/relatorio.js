    function getTotens() {

        fetch(`/totem/${sessionStorage.ID_EMPRESA}/listar`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                atualizarNomes(data);
            })
            .catch(error => {
                console.error('Erro ao buscar informações do totem:', error);
            });

    }

    async function getData() {

        var dataInicial = document.getElementById(`dataInicial${tipoRelatorio}`);
        var dataFinal = document.getElementById(`dataFinal${tipoRelatorio}`);

        const idEmpresa = sessionStorage.ID_EMPRESA;

        try {
            const response = await fetch(`/relatorio/${idEmpresa}/${dataInicial.value}/${dataFinal.value}/${tipoRelatorio}/undefined/gerar`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();

            if (data.length > 0) {
                gerarRelatorio(data)
            } else {
                gerarRelatorio('Nenhum dado encontrado no intervalo selecionado')
            }

        } catch (error) {
            console.error('Erro ao buscar informações do totem:', error);
            return false;
        }

    }

    async function getDataLog() {

        var dataInicial = document.getElementById(`dataInicial${tipoRelatorio}`);
        var dataFinal = document.getElementById(`dataFinal${tipoRelatorio}`);
        var totem = document.getElementById('totens');

        const idEmpresa = sessionStorage.ID_EMPRESA;

        try {
            const response = await fetch(`/relatorio/${idEmpresa}/${dataInicial.value}/${dataFinal.value}/${tipoRelatorio}/${totem.value}/gerar`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();

            if (data.length > 0) {
                gerarRelatorio(data)
            } else {
                gerarRelatorio('Nenhum dado encontrado no intervalo selecionado')
            }

        } catch (error) {
            console.error('Erro ao buscar informações do totem:', error);
            return false;
        }

    }

    var tipoRelatorio;

    function validarCampos() {

        var errorMsgElement = document.getElementById('errorMessage');
        var errorMsgText;

        var dataInicial = document.getElementById(`dataInicial${tipoRelatorio}`).value;
        var dataFinal = document.getElementById(`dataFinal${tipoRelatorio}`).value;

        var dataInicialObj = new Date(dataInicial);
        var dataFinalObj = new Date(dataFinal);

        var anoAtual = new Date().getFullYear();

        if (dataInicial === '' || dataFinal === '') {
            errorMsgText = 'Por favor, preencha ambas as datas.';
        } else if (dataInicialObj > dataFinalObj) {
            errorMsgText = 'A data inicial não pode ser maior que a data final.';
        } else if (dataInicialObj.getFullYear() !== anoAtual || dataFinalObj.getFullYear() !== anoAtual) {
            errorMsgText = 'As datas devem ser do ano atual.';
        } else if (tipoRelatorio === 'logs') {
            getDataLog()
        } else {
            getData();
        }

        errorMsgElement.textContent = errorMsgText

        setTimeout(() => {
            errorMsgElement.textContent = ""
        }, "2000");

    }

    function mudarCard(tipo) {
        tipoRelatorio = tipo;

        const cards = document.querySelectorAll('.relatorio-get-card');

        cards.forEach(card => {
            if (card.id === `${tipo}-card`) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }


    const { jsPDF } = window.jspdf;

    function gerarRelatorio(data) {

        console.log(data)

        const doc = new jsPDF();

        doc.text(`Relatório de ${tipoRelatorio}`, 20, 10);

        switch (tipoRelatorio) {
            case "capturas":

                doc.setFontSize(12);
                doc.text("Tipo", 20, 20);
                doc.text("Total de Capturas", 80, 20);
                doc.text("Média de Capturas por Dia", 150, 20);

                doc.setFontSize(10);
                let linhaCaptura = 30;
                data.forEach((item, index) => {
                    doc.text(item.tipo, 20, linhaCaptura);
                    doc.text(item.totalCapturas.toString(), 80, linhaCaptura);
                    doc.text(item.mediaCapturasPorDia.toString(), 150, linhaCaptura);
                    linhaCaptura += 10;
                });
                break;

            case "totens":
                doc.setFontSize(12);
                doc.text("ID do Totem", 20, 20);
                doc.text("Nome do Totem", 70, 20);
                doc.text("Data de Criação", 150, 20);
                doc.text("Status do Totem", 250, 20);
                doc.text("JAR", 350, 20);

                doc.setFontSize(10);
                let linhaTotens = 30;
                data.forEach((item, index) => {
                    doc.text(item.idTotem.toString(), 20, linhaTotens);
                    doc.text(item.nome, 70, linhaTotens);
                    doc.text(formatarData(item.dtCriacao), 150, linhaTotens);
                    doc.text(item.statusTotem, 250, linhaTotens);
                    doc.text(item.jar, 350, linhaTotens);

                    linhaTotens += 10;
                });
                break;

            case "parametros":
                doc.setFontSize(12);
                doc.text("ID", 20, 20);
                doc.text("Tipo", 70, 20);
                doc.text("Data", 150, 20);
                doc.text("Valor 1", 250, 20);
                doc.text("Valor 2", 350, 20);
                doc.text("Valor 3", 450, 20);
                doc.text("Valor 4", 550, 20);

                doc.setFontSize(10);
                let linhaParametros = 30;
                data.forEach((item, index) => {
                    doc.text(item.id.toString(), 20, linhaParametros);
                    doc.text(item.tipo, 70, linhaParametros);
                    doc.text(formatarData(item.data), 150, linhaParametros);
                    doc.text(item.valor1.toString(), 250, linhaParametros);
                    doc.text(item.valor2.toString(), 350, linhaParametros);
                    doc.text(item.valor3.toString(), 450, linhaParametros);
                    doc.text(item.valor4.toString(), 550, linhaParametros);

                    linhaParametros += 10;
                });
                break;

            case "funcionarios":
                doc.setFontSize(12);
                doc.text("ID", 20, 20);
                doc.text("Nome", 70, 20);
                doc.text("Status", 150, 20);
                doc.text("Cargo", 250, 20);
                doc.text("Data de Criação", 350, 20);

                doc.setFontSize(10);
                let linhaFuncionarios = 30;
                data.forEach((item, index) => {
                    doc.text(item.id.toString(), 20, linhaFuncionarios);
                    doc.text(item.nome, 70, linhaFuncionarios);
                    doc.text(item.status, 150, linhaFuncionarios);
                    doc.text(item.cargo, 250, linhaFuncionarios);
                    doc.text(formatarData(item.dataCriacao), 350, linhaFuncionarios);

                    linhaFuncionarios += 10;
                });
                break;

            case "logs":

                doc.setFontSize(10);
                let linhaLogs = 30;
                data.forEach((item, index) => {
                    doc.text(item.infos, 20, linhaLogs);
                    doc.save(`${item.dtCriacao}.pdf`);
                    linhaLogs += 10;
                });
                return;
                break;

            default:
                doc.text("Não há informações para exibir", 20, 20);

        }

        doc.save(`relatorio${tipoRelatorio}.pdf`);
    }

    function formatarData(data) {
        const dataObj = new Date(data);
        return `${dataObj.toLocaleDateString()} ${dataObj.toLocaleTimeString()}`;
    }

    function atualizarNomes(data) {

        const selectTotens = document.getElementById('totens');

        const opcaoPadrao = document.createElement('option');
        opcaoPadrao.text = 'Selecione um Totem';
        opcaoPadrao.value = '';
        selectTotens.add(opcaoPadrao);

        const nomesTotens = [...new Set(data.map(item => item.nome))];

        nomesTotens.forEach(nomeTotem => {
            const opcaoTotem = document.createElement('option');
            opcaoTotem.text = nomeTotem;
            opcaoTotem.value = nomeTotem;
            selectTotens.add(opcaoTotem);
        });

    }