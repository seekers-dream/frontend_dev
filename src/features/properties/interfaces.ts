export interface CreatePropertyPayload {
  id?: string;
  title: string;
  description: string;
  address: string;
  price: string;
  listing_type: string;
  status: string;
  city: string;
  state: string;
  isVerified: string;
  views: string;
  flatType: string;
}

export interface UploadImagePayload {
  id: string;
  media: FormData;
}
