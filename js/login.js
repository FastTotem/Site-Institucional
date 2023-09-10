const [ form ] = document.forms;
const { email, password } = form;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    login();
})

function login() {
    if(email.value === 'fastTotem@gmail.com' && password.value === 'fg@Ea254') {
        alert('Usuário autenticado com sucesso!');
    } else {
        alert('Usuário e/ou senha incorretos!');
    }
}