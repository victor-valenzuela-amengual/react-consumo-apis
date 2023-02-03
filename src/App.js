import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";

import MiApi from "./componentes/MiApi.jsx";
import ApiMetereologia from "./componentes/ApiMeteorologia";
import ApiFeriados from "./componentes/ApiFeriados";

function App() {
  const urlUes = "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=7146c15f0d7f9bb1878d833a0e907846&hash=0290bf25a56f15c32a1f6023333dee8e";  
  const urlMeteor = "https://api.libreapi.cl/weather/stations";
  const urlRandom = "https://randomuser.me/api/?results=10";
  const primario = "dark";
  const secundario = "secondary";

  const [api, setApi] = useState("");
  const [colorUes, setColorUes] = useState(primario);
  const [colorFer, setColorFer] = useState(primario);
  const [colorMet, setColorMet] = useState(primario);

  const colorFondo = (numLink) => {
    if (numLink === "ues") {
      setColorUes(secundario);
      setColorMet(primario);
      setColorFer(primario);
    } else if (numLink === "met") {
      setColorUes(primario);
      setColorMet(secundario);
      setColorFer(primario);
    } else if (numLink === "fer") {
      setColorUes(primario);
      setColorMet(primario);
      setColorFer(secundario);
    }
  };

  const handleClickUes = () => {
    setApi(<MiApi url={urlUes} carga="1"></MiApi>);
    colorFondo("ues");
  };

  const handleClickMeteor = () => {
    setApi(<ApiMetereologia url={urlMeteor}></ApiMetereologia>);
    colorFondo("met");
  };

  const handleClickFeriados = () => {
    setApi(<ApiFeriados url={urlRandom}></ApiFeriados>);
    colorFondo("fer");
  };

  useEffect(() => {
    handleClickUes();
  }, []);

  return (
    <div>
      <header>
        <h1 id="tru" className="text-center text-light">
          El mundo de las API's
        </h1>
      </header>

      <div className="container-fluid d-flex gap-1">
        <aside className="col-xs-4">
          <p className="bg-primary text-light m-0 mb-1 mt-2 text-center h5">
            Selecciona API
          </p>
          <ListGroup defaultActiveKey="#link1" className="bg-danger">
            <ListGroup.Item
              id="ues"
              action
              href="#link1"
              onClick={handleClickUes}
              variant={colorUes}
            >
              Universidades
            </ListGroup.Item>
            <ListGroup.Item
              id="meteor"
              action
              href="#link1"
              onClick={handleClickMeteor}
              variant={colorMet}
            >
              Estaciones metereológicas
            </ListGroup.Item>
            <ListGroup.Item
              id="feriado"
              action
              href="#link1"
              onClick={handleClickFeriados}
              variant={colorFer}
            >
              Personas al azar
            </ListGroup.Item>
          </ListGroup>
        </aside>
        {api}
      </div>
    </div>
  );
}

export default App;
