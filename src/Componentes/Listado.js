import { useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { ContextoToken } from "../contextos/ContextoToken";
import FiltrosIncidencias from "./FiltrosIncidencias";
import Incidencia from "./Incidencia";

const Listado = () => {
  const history = useHistory();
  const linkNuevaIncidencia = () => {
    history.push("/nueva-incidencia");
  };
  const { existeToken } = useContext(ContextoToken);
  return (
    <>
      <Row as="h2">
        Lista de Incidencias Generales
        <Col>
          {existeToken && (
            <Button onClick={linkNuevaIncidencia} className="nueva-incidencia ">
              + Incidencia
            </Button>
          )}
        </Col>
      </Row>
      <FiltrosIncidencias />
      <Incidencia />
    </>
  );
};

export default Listado;
