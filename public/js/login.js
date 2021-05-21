let userLoginURL = '/api/users/login';

const newUserCheckbox = document.querySelector('#flexCheckDefault');
const userNameField = document.querySelector('#new-user-field-user-name');
const passwordVerificationField = document.querySelector('#new-user-field-validate-password');
passwordVerificationField.style.display = 'none';

const loginFormHandler = async (event) => {
  event.preventDefault();

  const user_name = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  
  let body;
  if(newUserCheckbox.checked){
    const passwordVerification = document.querySelector('#password-verification').value.trim();
    if(password === passwordVerification){
      body = {email, user_name, password}
    } else {
      document.querySelector('#error-message').style.display = 'block';
      document.querySelector('#error-message').textContent = 'Passwords must match!';
    }
  } else {
    body = {user_name, password}
  }

  if (user_name && password) {
    const response = await fetch(userLoginURL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(window.location.pathname);
    } else {
      console.log(response.message);
      alert('Failed to log in');
    }
  }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

const createNewUserWatcher = () => {
  if(newUserCheckbox.checked){
    userLoginURL = '/api/users/';
    passwordVerificationField.style.display = 'block';
  } else {
    userLoginURL = '/api/users/login';
    passwordVerificationField.style.display = 'none';
  }
}

newUserCheckbox.addEventListener('click', createNewUserWatcher);