const bcrypt = require('bcryptjs');


export default function encrypt(password: string): string{


  const salt = bcrypt.genSaltSync(12  );
  const hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;

}
