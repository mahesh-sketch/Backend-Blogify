import JwT from "jsonwebtoken";

const secret = "mahesh@123";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
    fullName: user.fullName,
  };
  const token = JwT.sign(payload, secret);
  return token;
}

function validateToken(token) {
  const payload = JwT.verify(token, secret);
  return payload;
}

const authService = {
  createTokenForUser,
  validateToken,
};
export default authService;
