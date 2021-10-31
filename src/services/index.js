import axios from 'axios';



async function authentication(body) {
  const result = await axios
  .post('http://localhost:3000/login', body)
  .then((response) => response)
  .catch((error) => {
    console.log(error);
  });
  return result;
}

const services = {
  authentication,
}
  export default services;