export type ListingCategory =
  | "apartment"
  | "house"
  | "room"
  | "studio"
  | "villa";

export interface Listing {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  price: number;
  location: string;
  category: ListingCategory;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  rating: number;
  reviewCount: number;
  hostId: string;
  hostName: string;
  createdAt: string;
}

export interface Review {
  _id: string;
  listingId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ListingsResponse {
  items: Listing[];
  total: number;
  page: number;
  totalPages: number;
}
