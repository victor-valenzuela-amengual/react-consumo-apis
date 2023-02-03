import { useState } from "react";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Buscador from "./Buscador";
import Button from "react-bootstrap/Button";

const ApiFeriados = ({ url }) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState({});
  const [arrOriginal, setArrOriginal] = useState([]);
  const [orden, setOrden] = useState(false);

  const buscar = (e) => {
    let filtro = e.target.value.toLowerCase();
    let arr = [];

    arrOriginal.forEach(element => {
      if (element.name.first.toLowerCase().indexOf(filtro) !== -1) {
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
    try {
      if (orden) {
        setOrden(false);
      } else {
        setOrden(true);
      }

      items.sort((a, b) => {
        a = (a.name.first + a.name.last).toLowerCase();
        b = (b.name.first + b.name.last).toLowerCase();

        if (orden) {
          if (a > b) return -1;
          if (a < b) return 1;
        } else {
          if (a < b) return -1;
          if (a > b) return 1;
        }

        return 0;
      });
    } catch (error) {}
  };

  const ordenarPais = () => {
    try {
      if (orden) {
        setOrden(false);
      } else {
        setOrden(true);
      }

      items.sort((a, b) => {
        a = a.location.country.toLowerCase();
        b = b.location.country.toLowerCase();

        if (orden) {
          if (a > b) return -1;
          if (a < b) return 1;
        } else {
          if (a < b) return -1;
          if (a > b) return 1;
        }

        return 0;
      });
    } catch (error) {}
  };

  const GetData = async () => {
    await fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.results);
          setArrOriginal(result.results);
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
    return <div className="text-light">{error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="container-fluid">
        <div className="">
          <Buscador
            onChange={(e) => {
              buscar(e);
            }}
          ></Buscador>
        </div>
        <Table striped bordered hover variant="dark">
          <thead className="text-center bg-primary">
            <tr>
              <th>
                Nombre
                <Button
                  variant="dark"
                  size="sm"
                  onClick={() => {
                    ordenar();
                  }}
                >
                  <i className="fas fa-sort"></i>
                </Button>
              </th>
              <th>
                Pais
                <Button
                  variant="dark"
                  size="sm"
                  onClick={() => {
                    ordenarPais();
                  }}
                >
                  <i className="fas fa-sort"></i>
                </Button>
              </th>
              <th>Foto</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>
                  {item.name.first} {item.name.last}
                </td>
                <td>{item.location.country}</td>
                <td>
                  {" "}
                  <img
                    src={item.picture.thumbnail}
                    alt={`${item.name.first} + ${item.name.last}`}
                  ></img>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
};
export default ApiFeriados;
