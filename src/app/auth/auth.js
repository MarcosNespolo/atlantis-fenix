import Atlantis from '../api/api';

const login = ({ email, senha }) => {
    Atlantis.post('usuarios/login', { email, senha })
        .then(res => {
            if (res.status === 200) {
                sessionStorage.removeItem('aquario');
                sessionStorage.setItem('usuario', JSON.stringify(res.data.usuario));
            }
            //window.location = '/listaAquarios';
        })
        .catch((error) => {
            console.log(error);
        });
};

const logout = () => {
    Atlantis.get('usuarios/logout')
        .then(res => {
            if (res.data.sucess) {
                sessionStorage.removeItem('aquario');
                sessionStorage.removeItem('usuario');
                window.location = '/listaAquarios';
            }
        })
        .catch((error) => {
            console.log(error.message);
        });
};

const isAuthenticated = () => sessionStorage.getItem('usuario') !== null;

const usuario = () => {
    if(sessionStorage.getItem('usuario'))
        return JSON.parse(sessionStorage.getItem('usuario'));
    else
        return {id:"",nome:"",email:"",role:""};
};

export { login, logout, isAuthenticated, usuario };