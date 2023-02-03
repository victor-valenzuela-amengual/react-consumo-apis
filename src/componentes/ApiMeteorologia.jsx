import { useState } from "react";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Buscador from "./Buscador";

const ApiMetereologia = ({ url }) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [arrOriginal, setArrOriginal] = useState([]);
  const [orden, setOrden] = useState(false);

  const buscar = (e) => {

    let filtro = e.target.value.toLowerCase();
    let arr = [];
    
    arrOriginal.forEach(element => {
      if (element.name.toLowerCase().indexOf(filtro) !== -1) {
        arr.push(element)
      }
    });
    
    if (filtro !== "")
      setItems([...arr]);
    else {
      setItems([...arrOriginal]);
    }
  };

  const ordenar = () => {
    if (orden) {
      setOrden(false);
    } else {
      setOrden(true);
    }

    items.sort((a, b) => {
      a = a.name.toLowerCase();
      b = b.name.toLowerCase();
      if (orden) {
        if (a > b) return -1;
        if (a < b) return 1;
      } else {
        if (a < b) return -1;
        if (a > b) return 1;
      }

      return 0;
    });
  };
  const ordenarNumeros = () => {
    if (orden) {
      setOrden(false);
    } else {
      setOrden(true);
    }


    items.sort((a, b) => {
      a = a.code;
      b = b.code;
      if (orden) {
        if (a > b) return -1;
        if (a < b) return 1;
      } else {
        if (a < b) return -1;
        if (a > b) return 1;
      }

      return 0;
    });
  };

  const GetData = async () => {
    await fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data);
          setArrOriginal(result.data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    GetData();

  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {    
    return (
      <div className="container-fluid">
        <div className=""><Buscador onChange={(e) => {
          buscar(e);
        }}></Buscador></div>
        <Table striped bordered hover variant="dark">
          <thead className="text-center bg-primary">
            <tr>
              <th>
                Estación
                <Button
                  variant="dark"
                  size="sm"
                  onClick={ordenar}
                >
                  <i className="fas fa-sort"></i>
                </Button>
              </th>
              <th>
                Temperatura °C
              </th>
              <th>
                Código
                <Button
                  variant="dark"
                  size="sm"
                  onClick={ordenarNumeros}                  
                >
                  <i className="fas fa-sort"></i>
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>

            {items.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>
                    {item.temperature === undefined ? "N/A" : item.temperature}
                  </td>
                  <td>{item.code}</td>
                  {/* <td><Moment format='DD/MM/YYYY' {...item.last_report}/> </td> */}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
};
export default ApiMetereologia;
