document.addEventListener('DOMContentLoaded', function () {

    getData()
 
 });

 function getData() {

    const dataAtual = new Date();

    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataAtual.getFullYear();

    const dataFormatada = `${dia}/${mes}/${ano}`;

    const datas = document.getElementsByClassName("date");
    for (let i = 0; i < datas.length; i++) {
        datas[i].textContent = dataFormatada;
    }
}