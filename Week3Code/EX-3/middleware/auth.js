export const auth = (req, res, next) => {
  const { token } = req.query;
  const validToken = "xyz123";
  if (!token || token !== validToken) {
    return res.status(401).json({ error: "Invalid token" });
  }
  next();
};
