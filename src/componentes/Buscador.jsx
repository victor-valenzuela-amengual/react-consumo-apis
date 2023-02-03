import Form from "react-bootstrap/Form";


const Buscador = (props) => {
  const {onChange} = props;
  
  return (
    <div className="">      
      <Form className="pt-2">
        <Form.Control className="text-bg-dark"
          type="search"
          placeholder="Buscar..."          
          aria-label="Search"
          onChange={onChange}
        />
      </Form>      
    </div>
  );
};

export default Buscador;
