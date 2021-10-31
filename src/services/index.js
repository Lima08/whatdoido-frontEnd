import axios from 'axios';

/* Faz uma requisição do tipo GET */
async function addNewUser(body) {
  axios
  .post('http://localhost:3000/users/', body)
  .then((response) => response)
  .catch((error) => {
    console.log(error);
  });
}




  export default addNewUser;