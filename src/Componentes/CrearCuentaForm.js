import { useEffect, useState } from "react";
import {
  Button, Col, Form, Row, Toast
} from "react-bootstrap";
import { useHistory } from "react-router";
import useForm from "../utils/hooks/useForm";
import useFetch from "../utils/hooks/useFetch";

const CrearCuentaForm = () => {
  const [ventana, setVentana] = useState(false);
  const toggleVentana = () => setVentana(!ventana);
  const [error, setError] = useState("");
  const history = useHistory();
  const linkAcceder = () => {
    history.push("/registro/acceder");
  };
  const { datos, pideDatos: postNuevoUsuario } = useFetch();
  const { datosForm, modificarDatos } = useForm({
    nombre: "",
    apellidos: "",
    email: "",
    contrasenya: "",
    direccion: "",
    telefono: "",
    codigoPostal: "",
  });
  const registraUsuario = e => {
    e.preventDefault();
    postNuevoUsuario(true, "usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datosForm)
    });
  };
  useEffect(() => {
    if (datos?.error) {
      setError("Revisa tus datos y vuelve a introducirlos correctamente");
    } else if (datos) {
      toggleVentana();
    }
  }, [datos]);
  return (
    <>
      <Col sm={12} as="h2" className="pt-4 text-left">Crea tu cuenta</Col>
      <Col sm={12} as="section" className="crear-cuenta">
        <Form className={`crear-cuenta ${!ventana ? "" : "oculto"} col`} onSubmit={registraUsuario}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Nombre:</Form.Label>
              <Form.Control name="nombre" type="text" id="nombre" value={datosForm.nombre} required onChange={modificarDatos} />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Apellidos:</Form.Label>
              <Form.Control name="apellidos" type="text" id="apellidos" value={datosForm.apellidos} onChange={modificarDatos} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Email:</Form.Label>
              <Form.Control name="email" type="email" id="email" required value={datosForm.email} onChange={modificarDatos} />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control name="contrasenya" type="password" placeholder="min 8 caracteres" id="contrasenya" required value={datosForm.contrasenya} onChange={modificarDatos} />
            </Form.Group>
          </Form.Row>

          <Form.Group>
            <Form.Label>Dirección</Form.Label>
            <Form.Control name="direccion" type="text" required value={datosForm.direccion} id="direccion" onChange={modificarDatos} />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Teléfono</Form.Label>
              <Form.Control id="telefono" name="telefono" type="text" required value={datosForm.telefono} onChange={modificarDatos} />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Código postal</Form.Label>
              <Form.Control id="codigoPostal" name="codigoPostal" type="text" required value={datosForm.codigoPostal} onChange={modificarDatos} />
            </Form.Group>
          </Form.Row>
          <Button className="boton-crear" type="submit" variant="info">Registrar</Button>
          <p className="error">{error}</p>
          {/* cambio onClick={nuevoUsuario} */}
        </Form>
      </Col>
      <Col sm={12} as={Toast} show={ventana} className="ventana" onClose={linkAcceder}>
        <Toast.Header>
          <i className="fas fa-check-circle mr-2" />
          <strong className="mr-auto">Cuenta Creada</strong>
          <small>cerrar</small>
        </Toast.Header>
        <Toast.Body>
          <p className="creada">Su cuenta se ha creado correctamente.</p>
          <p>
            Por favor
            {" "}
            <span className="importante">diríjase a la bandeja de entrada </span>
            de su email para confirmar el registro.
          </p>
        </Toast.Body>
      </Col>
    </>
  );
};
export default CrearCuentaForm;
