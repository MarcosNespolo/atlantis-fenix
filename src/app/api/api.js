import axios from 'axios';

//local do seu pc na rede local 
const Atlantis = axios.create({
    baseURL: "http://200.236.3.206:5000/",
}
);

export default Atlantis;
