import { SignJWT, jwtVerify } from "jose";

export const generateToken = async (req, res, next) => {

  try {
    const encoder = new TextEncoder();
    const jwtconstructor = new SignJWT(req.body);
    req.body.auth = await jwtconstructor
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
    res.data = await jwtVerify(
      authorization,
      encoder.encode(process.env.JWT_PRIVATE_KEY)
    );
    next();
  } catch (error) {
    res.status(401).send({ token: "Algo salio mal en el token, genere uno nuevo" });
  }
};