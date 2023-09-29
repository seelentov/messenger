interface UserInformation {
  id: string;
  name: string;
  img: string;
  birth: string;
  email: string;
}

interface UserForm {
  name: string;
  birth: string;
  email: string;
  pass: string
}

type AllUsers = UserInformation[]