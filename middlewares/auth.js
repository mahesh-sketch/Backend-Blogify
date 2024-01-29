import authService from "../services/auth.js";

function checkForAuthCokkie(cookieName) {
  return (req, res, next) => {
    const tokenCookieName = req.cookies[cookieName];
    if (!tokenCookieName) {
      return next();
    }
    try {
      const userPayload = authService.validateToken(tokenCookieName);
      req.user = userPayload;
    } catch (error) {}
    return next();
  };
}

export default checkForAuthCokkie;
