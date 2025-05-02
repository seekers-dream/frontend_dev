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

export interface PropretyMedia {
  id: string;
  url: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  address: string;
  price: string;
  status: string;
  city: string;
  state: string;
  isVerified: boolean;
  views: number;
  listingType: string;
  flatType: string;
  createdAt: string;
  updatedAt: string;
  media: PropretyMedia[];
  listedBy: {
    id: string;
    email: string;
  };
  listingDocuments: [];
}

export interface PropertyResponse {
  houseListing: Property[];
}

export interface Params {
  page: number;
  limit: number;
  search?: string;
  city?: string;
  state?: string;
  price?: string;
  status?: string;
  listingType?: string;
  flatType?: string;
}
