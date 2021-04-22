// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import { useEffect, useReducer, useState } from "react";
import { usuarioReducer } from "../utils/reducers/usuarioReducer";
import { ContextoUsuario } from "./ContextoUsuario";
import useFetch from "../utils/hooks/useFetch";

const ContextoUsuarioProvider = props => {
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  const [usuario, dispatch] = useReducer(usuarioReducer, {});
  const { datos: usuarioFetch, pideDatos: pideUsuarioFetch } = useFetch();
  const [existeToken, setExisteToken] = useState(true);
  const getUsuario = {
    usuario,
    existeToken,
    setExisteToken
  };
  useEffect(() => {
    if (existeToken) {
      const token = localStorage.getItem("token-usuario");
      const idUsuario = jwt_decode(token).id;
      pideUsuarioFetch(true, `usuarios/${idUsuario}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  }, [existeToken]);
  useEffect(() => {
    if (usuarioFetch) {
      dispatch({
        type: "cargarUsuario",
        usuario: usuarioFetch
      });
    }
  }, [usuarioFetch]);
  return (
    <ContextoUsuario.Provider value={{
      dispatch, getUsuario
    }}
    >
      {
        children
      }
    </ContextoUsuario.Provider>
  );
};

export default ContextoUsuarioProvider;
