import { SignJWT, jwtVerify } from "jose";

export const generateToken = async (req, res, next) => {

  let structura;
  let expirationTime;
  switch (req.url) {
    case "/token":
      if (req.body.userName && req.body.password) {
        structura ={
          userName: req.body.userName,
          password: req.body.password
        };
        expirationTime = "30m";
      }else{
        return res.status(401).send({message: "Error en los parametros de entrada"})
      }
      break;
    case "/tokenPost":
      if (req.baseUrl == "/usuario") {
        structura = {
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
        };
        expirationTime = "2m"; 
      }
      break;
    default:
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
    if (req.method == "POST") {
      //validacion de si se esta utilizando el token del post a usuario
      if (!Object.keys(req.data.payload).includes("tel")) return res.status(401).send({ token: "Error. Generar el token del post" });
      switch (req.baseUrl) {
        case "/usuario":
          let arrayKeysEstructura = Object.keys(req.data.payload);
          arrayKeysEstructura.pop();
          arrayKeysEstructura.pop();
          let arrayKeysdata = Object.keys(req.body);
          if (arrayKeysEstructura.toString() != arrayKeysdata.toString()) return res.status(401).send({ message: "Error. en la estructura de entrada", structure: req.body});
          else next();
          break;
        default:
          break;
      }
    }else{
      next();
    }
    
  } catch (error) {
    res.status(401).send({ token: "Algo salio mal en el token, genere uno nuevo" });
  }
};