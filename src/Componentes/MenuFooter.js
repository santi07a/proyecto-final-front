import {
  Col, Nav
} from "react-bootstrap";

const MenuFooter = () => (
  <Col xs={12}>
    <Nav className="navMenu">
      <Nav.Item className="navLista"><Nav.Link className="navItem"> Cómo funciona?</Nav.Link></Nav.Item>
      <Nav.Item className="navLista"><Nav.Link className="navItem">Contacto</Nav.Link></Nav.Item>
      <Nav.Item className="navLista"><Nav.Link className="navItem">Registro</Nav.Link></Nav.Item>
    </Nav>
  </Col>
);

export default MenuFooter;
