import { useState } from "react";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Buscador from "./Buscador";

const MiApi = ({ url }) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [itemsUes, setItemsUes] = useState([]);
  const [arrOriginal, setArrOriginal] = useState([]);
  const [orden, setOrden] = useState(false);

  //const style={{style:"height:100"}} ;
  const buscar = (e) => {
    let filtro = e.target.value.toLowerCase();
    let arr = [];
    //Filtrar por campo nombre y apellido
    arr = arrOriginal.filter(
      (items) => items.name.toLowerCase().indexOf(filtro) !== -1
    );

    if (filtro !== "") setItemsUes([...arr]);
    else {
      setItemsUes([...arrOriginal]);
    }
  };

  const ordenar = () => {
    if (orden) {
      setOrden(false);
    } else {
      setOrden(true);
    }

    itemsUes.sort((a, b) => {
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

  const GetData = async () => {
    await fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItemsUes(result.data.results);
          setArrOriginal(result);
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
    console.log(itemsUes[0].comics);
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
                Personaje
                <Button variant="dark" size="sm" onClick={() => ordenar()}>
                  <i className="fas fa-sort"></i>
                </Button>
              </th>
              <th>Imagen</th>
              <th>
                Comic
                <Button variant="dark" size="sm" onClick={() => ordenar()}>
                  <i className="fas fa-sort"></i>
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {itemsUes.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.name}</td>                  
                  <td>
                    <img
                      src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                      className="img-thumbnail rounded mx-auto d-block"
                      style={{ height: 150 }}
                    ></img>
                  </td>                  
                  
                    {item.comics.items.map((comic, index) => {                      
                      return (                        
                          <td key={index}>
                            {comic.name}
                          </td>                         
                      );

                    }).slice(0,1)}
                                                      
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
};
export default MiApi;
