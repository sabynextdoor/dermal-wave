export interface AIConsultant {
  id: string;
  name: string;
  specialty: string;
  precision: number;
  avatar: string;
  description: string;
}

export interface Medicine {
  id: string;
  name: string;
  price: number;
  image: string;
  type: string;
}

export interface Garment {
  id: string;
  name: string;
  fabric: string;
  price: number;
  image: string;
  benefits: string[];
  gender: "Men" | "Women" | "Unisex";
}

export interface Order {
  id: string;
  productName: string;
  status: "Active" | "Pending" | "Delivered" | "Critical";
  date: string;
  type: "Medicine" | "Garment";
}
