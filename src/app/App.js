import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Navmain from "../components/structure/navbarmain.component";
import Azula from "../components/aquario/azula.component";
import ListaAquarios from "../components/aquario/listaAquarios.component";
import NovoAquario from "../components/aquario/novoAquario.component";
import ListaTipoAquarios from "../components/aquario/listaTipoAquarios.component";
import NovoTipoAquario from "../components/aquario/novoTipoAquario.component";
import ListaEspecies from "../components/especie/listaEspecies.component";
import NovaEspecie from "../components/especie/novaEspecie.component";
import ListaItens from "../components/item/listaItens.component";
import NovoItem from "../components/item/novoItem.component";
import Login from "../components/usuario/login.component";
import ListaUsuarios from "../components/usuario/listaUsuarios.component";
import NovoUsuario from "../components/usuario/novoUsuario.component";


function App() {
  return (
        <Router>
          <Navmain />
          <Route exact path="/listaAquarios" component={ListaAquarios} />
          <Route path="/azula/:nome" component={Azula} />
          <Route path="/novoAquario/:id" component={NovoAquario} />
          <Route exact path="/listaTipoAquarios" component={ListaTipoAquarios} />
          <Route path="/novoTipoAquario/:id" component={NovoTipoAquario} />
          <Route exact path="/listaEspecies" component={ListaEspecies} />
          <Route path="/novaEspecie/:id" component={NovaEspecie} />
          <Route exact path="/listaItens" component={ListaItens} />
          <Route path="/novoItem/:id" component={NovoItem} />
          <Route path="/login" component={Login} />
          <Route exact path="/listaUsuarios" component={ListaUsuarios} />
          <Route path="/novoUsuario/:id" component={NovoUsuario} />
        </Router>
  );
}

export default App;
