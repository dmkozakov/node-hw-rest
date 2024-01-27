const verifyEmail = (email: string, token: string) => {
  return {
    to: email,
    subject: `Welcome on board`,
    html: `
              <p>To confirm your registration, please click on link below</p>
              <p>
                <a href="${process.env.BASE_URL}/api/users/verify/${token}">Click me</a>
              </p>
            `,
    text: `
              To confirm your registration, please click on link below\n
              ${process.env.BASE_URL}/api/users/verify/${token}
            `,
  };
};

export default verifyEmail;
