const [ form ] = document.forms;
const { email, password } = form;

const allInputs = document.querySelectorAll('input');

allInputs.forEach((item) => item.addEventListener('input', () => {
    if(item.value === '') {
        let alertPreenchimento = document.createElement('span');
        alertPreenchimento.textContent = "*Campo obrigatório";

        item.insertAdjacentElement('afterend', alertPreenchimento);
    } else {
        let alertPreenchimento = item.nextElementSibling;

        if (alertPreenchimento && alertPreenchimento.textContent === "*Campo obrigatório") {
            alertPreenchimento.remove();
        }
    }
}));

form.addEventListener('submit', (event) => {
    event.preventDefault();
    login();
})

function login() {
    let inputsSaoValidos = true;
    const emailVar = document.querySelector('input[name="email"]').value;
    const senhaVar = document.querySelector('input[name="senha"]').value;

    allInputs.forEach((item) => {
        if(item.value === '') {
            inputsSaoValidos = false;

            let alertPreenchimento = item.nextElementSibling;

            if (alertPreenchimento && alertPreenchimento.textContent === "*Campo obrigatório") 
                return;

            alertPreenchimento = document.createElement('span');
            alertPreenchimento.textContent = "*Campo obrigatório";
    
            item.insertAdjacentElement('afterend', alertPreenchimento);
        }
    });

    if(inputsSaoValidos) {
        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: emailVar,
                senhaServer: senhaVar
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                    const usuario = json[0];

                    sessionStorage.ID_USUARIO = usuario.UsuarioID;
                    sessionStorage.NOME_USUARIO = usuario.Nome;
                    sessionStorage.EMAIL_USUARIO = usuario.Email;
                    sessionStorage.NVL_ACESSO_USUARIO = usuario.NivelDeAcesso;
                    sessionStorage.ID_EMPRESA = usuario.EmpresaID;

                    setTimeout(function () {
                        alert('Usuário autenticado com sucesso!');
                        window.location = "dashboard.html";
                    }, 1000);
                });
            } else {
                alert('Email ou Senha incorretos');

                resposta.text().then(texto => {
                    console.error(texto);
                });
    
            }
        });
    }
}
