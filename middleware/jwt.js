import { SignJWT, jwtVerify } from "jose";

let estructuras = [
  {
    userName: null,
    password: null
  },
  {
    "tel": null,
    "nombre_completo": null,
    "password":null,
    "apodo": null,
    "genero_id": null,
    "edad": null,
    "ciudad_id": null,
    "direccion": null,
    "descripcion": null,
    "image": null
  }
]

export const generateToken = async (req, res, next) => {
  let structura;
  let expirationTime;
  switch (req.url) {
    case "/token":
      if (req.body.userName && req.body.password) {
        structura = estructuras[0];
        structura.userName = req.body.userName;
        structura.password = req.body.password;
        expirationTime = "30m";
      }else{
        return res.status(401).send({message: "Error en los parametros de entrada"})
      }
      break;
    case "/tokenPost":
      if (req.baseUrl == "/usuario") {
        structura = estructuras[1];
        expirationTime = "15m"; 
      }else{
        return res.status(404).send({ message: "Ruta no válida para generar el token de post" });
  }
      break;
  }
  try {
    const encoder = new TextEncoder();
    const jwtconstructor = new SignJWT(structura);
    req.body.auth = await jwtconstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime(expirationTime)
      .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
    next();
  } catch (error) {
    res.status(error.status).send(error.message);
  }
};

export const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send({ token: "Error. Generar token" });
  try {
    const encoder = new TextEncoder();
    req.data = await jwtVerify(
      authorization,
      encoder.encode(process.env.JWT_PRIVATE_KEY)
    );
    if (req.method === "POST" && req.baseUrl === "/usuario") {
      //se traen las keys de la data que viene en el token y se eliminan los ultimos dos datos que no hacen refecncia a la data 
      let payloadKeys = Object.keys(req.data.payload);
      payloadKeys.pop();
      payloadKeys.pop();
      //se traen las keys de la estructura
      let estructuraKeys = Object.keys(estructuras[1]);
      //validacion de si se esta utilizando el token del post a usuario
      if (payloadKeys.toString() !== estructuraKeys.toString()) return res.status(401).send({ token: "Error. Generar el token del post" });
      let dataKeys = Object.keys(req.body);
      //se validad si la estructura de la data que se quiere hcaer post corresponde a la estructura que tenemos por defecto
      if (payloadKeys.toString() !== dataKeys.toString()) return res.status(401).send({ message: "Error. en la estructura de entrada", structure: req.body});
      else next();
    }else{
      next();
    }
    
  } catch (error) {
    res.status(401).send({ token: "Algo salio mal en el token, genere uno nuevo" });
  }
};