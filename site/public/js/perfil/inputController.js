const confirmPasswordContainer = document.getElementById('confirmPasswordContainer');
const modalPassword = document.getElementById('modalPassword');
const profileImageInput = document.getElementById('profileImageInput');

// profileImageInput.addEventListener('change', (event) => {
//     const file = event.target.files[0];

//     if(file) {
//         const reader = new FileReader();
        
//         reader.addEventListener('load', (e) => {
//             const image = e.target.result;
            
//             const profileImageText = document.querySelector(".profileImage h1");
//             const profileImage = document.querySelector(".formContainer label");

//             profileImageText.style.display = "none";
//             profileImage.style.backgroundImage = `url(${image})`;
//         })

//         reader.readAsDataURL(file);
//     }
// });

function toggleLock(containerTargetId) {
    const elementContainer = document.getElementById(containerTargetId);
    const elementLockIcon = elementContainer.getElementsByClassName('iconify')[0];
    const elementInput = elementContainer.getElementsByTagName('input')[0];
    
    if(elementInput.disabled) {
        elementInput.disabled = false;
        elementLockIcon.dataset.icon = "material-symbols:lock-open";
    } else {
        elementInput.disabled = true;
        elementLockIcon.dataset.icon = "material-symbols:lock";
    }
};

function toggleModal() {
    passwordModal.classList.toggle('modal--active');
}

async function enablePasswordEdit() {
    const data = await fetch('/usuario/checarSenha', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idServer: sessionStorage.ID_USUARIO,
            senhaServer: modalPassword.value
        })
    });

    const response = await data.json();

    if(response.length > 0) {
        toggleModal();
        toggleLock('password');
        confirmPasswordContainer.style.display = 'flex';
    } else {
        alert('Senha inválida');
    }
}
