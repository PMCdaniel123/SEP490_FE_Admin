import { LucideIcon } from "lucide-react";

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

export interface SignInFormProps {
  className?: string;
  onClose: () => void;
}

export interface ValidatePayload {
  input: string;
}

export interface MenuItemProps {
  name: string;
  path: string;
}

export interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export interface TopWorkspace {
  id: string;
  title: string;
  booking: string;
  price: string;
  image: string;
  amount: number;
  roomType: string;
}

export interface NewCustomerItemProps {
  avatar: string;
  name: string;
  location: string;
}

export interface LabelIconProps {
  icon: LucideIcon;
  label: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface CustomerProps {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: string;
  avatar: string;
  location: string;
  dateOfBirth: string;
  sex: string;
}

export interface OwnerProps {
  id: number;
  phone: string;
  email: string;
  identityName: string;
  identityNumber: string;
  dateOfBirth: string;
  sex: string;
  nationality: string;
  placeOfOrigin: string;
  placeOfResidence: string;
  identityExpiredDate: string;
  identityCreatedDate: string;
  identityFile: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  licenseName: string;
  licenseNumber: string;
  licenseAddress: string;
  googleMapUrl: string;
  charterCapital: string;
  licenseFile: string;
  status: string;
  updatedAt: string;
}

export interface EmployeeProps {
  id: string;
  avatar: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  location: string;
  sex: string;
  roleName: string;
  dateOfBirth: string;
  status: string;
}

export interface Image {
  id: string;
  imgUrl: string;
}

export interface Price {
  id: string;
  category: string;
  price: number;
}

export interface Facilities {
  id: string;
  facilityName: string;
}

export interface Policies {
  id: string;
  policyName: string;
}

export interface Workspace {
  id: string;
  name: string;
  description: string;
  capacity: string;
  category: string;
  status: string;
  cleanTime: string;
  area: string;
  ownerId: string;
  openTime: string;
  closeTime: string;
  is24h: number;
  shortTermPrice: string;
  longTermPrice: string;
  prices: Price[];
  facilities: Facilities[];
  policies: Policies[];
  images: Image[];
  pricesStr: string[];
  facilitiesStr: string[];
  policiesStr: string[];
  imagesStr: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IdentifyProps {
  id: string;
  name: string;
  number: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  placeOfOrigin: string;
  placeOfResidence: string;
  dateOfExpiry: string;
  dateOfCreation: string;
  file: string;
}

export interface SocialProps {
  id: string;
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  other: string;
}

export interface LicenseProps {
  id: string;
  name: string;
  number: string;
  address: string;
  charterCapital: string;
  file: string;
}

export interface PhoneProps {
  id: string;
  phone: string;
}

export interface VerifyProps {
  id: string;
  name: string;
  email: string;
  location: string;
  phone: string;
  status: string;
  createdAt: string;
  identify: IdentifyProps;
  social: SocialProps;
  license: LicenseProps;
  verifyPhone: PhoneProps;
}
export interface UserProps {
  name: string;
  dob: string;
  email: string;
  phone: string;
}

export interface WithdrawalRequestProps {
  id: string;
  number: string;
  bank: string;
  money: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: UserProps;
}

export interface AdminEmailSignInProps {
  email: string;
  password: string;
}

export interface AdminPhoneSignInProps {
  phone: string;
  password: string;
}

export interface BookingProps {
  bookingId: string;
  start_Date: string;
  end_Date: string;
  price: string;
  status: string;
  created_At: string;
  payment_Method: string;
  userId: string;
  workspaceId: string;
  promotionId: string;
  amenities: {
    amenityId: string;
    quantity: string;
    amenityName: string;
    image: string;
    unitPrice: string;
  }[];
  beverages: {
    beverageId: string;
    quantity: string;
    beverageName: string;
    image: string;
    unitPrice: string;
  }[];
}

export interface WithdrawalProps {
  id: string;
  number: string;
  bank: string;
  money: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
