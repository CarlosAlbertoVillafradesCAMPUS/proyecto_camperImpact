import { SignJWT, jwtVerify } from "jose";

let estructuras = [
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
  try {
    const encoder = new TextEncoder();
    const jwtconstructor = new SignJWT(req.body);
    req.token = await jwtconstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("30m")
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
    next();
  } catch (error) {
    res.status(401).send({ token: "Algo salio mal en el token, genere uno nuevo" });
  }
};

export const validateTokenEndpoints = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send({ token: "Error. Generar token" });
  try {
    const encoder = new TextEncoder();
    let jwtData  = await jwtVerify(
      req.token,
      encoder.encode(process.env.JWT_PRIVATE_KEY)
    );
    
    let dataTokenKeys = Object.keys(jwtData.payload)
    dataTokenKeys.pop();
    dataTokenKeys.pop();
    if (req.method === "POST") {
      switch (req.baseUrl) {
        case "/usuario":
          if (dataTokenKeys.toString() != Object.keys(estructuras[0]).toString()) {
            return res.status(401).send({ message: "Error. en la estructura de entrada", structure: req.body});
          }
          break;
        default:
          break;
      }
    }
    next();
  } catch (error) {
    res.status(401).send({ token: "Algo salio mal en el token, genere uno nuevo" });
  }
};

