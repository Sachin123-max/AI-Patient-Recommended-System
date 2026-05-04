export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  const cookieName =
    user.role === "Admin" ? "adminToken" : "patientToken";

  const expireDays = Number(process.env.COOKIE_EXPIRES) || 7;

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(Date.now() + expireDays * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: false, // production me true karna
      sameSite: "Lax",
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};