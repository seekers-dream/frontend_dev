export interface UpdatePayload {
  bio: string;
  address: string;
  country: string;
  state: string;
  gender: string;
  date_of_birth: string;
  username: string;
}

export interface ChangePasswordPayload {
  password: string;
  confirmPassword: string;
}

export interface UpdateProfilePicturePayload {
  id: string;
  avatar: FormData;
}
