document.addEventListener('DOMContentLoaded', function () {

   getOcorrencias()

});

function atualizarOcorrencias(data){

console.log(data)

}

function getOcorrencias(){
  
    fetch(`/captura/${sessionStorage.ID_EMPRESA}/listar`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.error('Erro ao buscar informações do totem:', error);
    });

}