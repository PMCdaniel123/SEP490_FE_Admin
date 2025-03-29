import {
  MenuItemProps,
  NewCustomerItemProps,
  TopWorkspace,
  VerifyProps,
} from "@/types";

export const menuItems: MenuItemProps[] = [
  { name: "Trang chủ", path: "/" },
  { name: "Giới thiệu", path: "/about-us" },
  { name: "Không gian", path: "/workspace" },
  { name: "Liên hệ", path: "/contact" },
  // { name: "Tải WorkHive", path: "/download" },
];

export const topWorkspace: TopWorkspace[] = [
  {
    id: "1",
    title: "Workspace 1",
    booking: "20",
    price: "$100",
    image: "/logo.png",
    amount: 100,
    roomType: "Bàn cá nhân",
  },
  {
    id: "2",
    title: "Workspace 2",
    booking: "22",
    price: "$100",
    image: "/logo.png",
    amount: 100,
    roomType: "Văn phòng",
  },
  {
    id: "3",
    title: "Workspace 3",
    booking: "12",
    price: "$100",
    image: "/logo.png",
    amount: 100,
    roomType: "Phòng hội thảo",
  },
  {
    id: "4",
    title: "Workspace 4",
    booking: "20",
    price: "$100",
    image: "/logo.png",
    amount: 100,
    roomType: "Bàn cá nhân",
  },
  {
    id: "5",
    title: "Workspace 5",
    booking: "22",
    price: "$100",
    image: "/logo.png",
    amount: 100,
    roomType: "Văn phòng",
  },
  {
    id: "6",
    title: "Workspace 6",
    booking: "12",
    price: "$100",
    image: "/logo.png",
    amount: 100,
    roomType: "Phòng hội thảo",
  },
  {
    id: "7",
    title: "Workspace 7",
    booking: "20",
    price: "$100",
    image: "/logo.png",
    amount: 100,
    roomType: "Bàn cá nhân",
  },
  {
    id: "8",
    title: "Workspace 8",
    booking: "22",
    price: "$100",
    image: "/logo.png",
    amount: 100,
    roomType: "Văn phòng",
  },
  {
    id: "9",
    title: "Workspace 9",
    booking: "12",
    price: "$100",
    image: "/logo.png",
    amount: 100,
    roomType: "Phòng hội thảo",
  },
  {
    id: "10",
    title: "Workspace 10",
    booking: "12",
    price: "$100",
    image: "/logo.png",
    amount: 100,
    roomType: "Phòng hội thảo",
  },
];

export const newCustomers: NewCustomerItemProps[] = [
  {
    avatar: "/logo.png",
    name: "Nguyễn Văn A",
    location: "Hà Nội, Việt Nam",
  },
  {
    avatar: "/logo.png",
    name: "Nguyễn Văn B",
    location: "Hà Nội, Việt Nam",
  },
  {
    avatar: "/logo.png",
    name: "Nguyễn Văn C",
    location: "Hà Nội, Việt Nam",
  },
];

export const verifyList: VerifyProps[] = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    location: "Hà Nội, Việt Nam",
    phone: "0123456789",
    status: "Đang chờ",
    createdAt: "01/01/2025",
    identify: {
      id: "1",
      name: "Nguyễn Văn A",
      number: "123456789",
      dateOfBirth: "14/02/2005",
      gender: "Nam",
      nationality: "Việt Nam",
      placeOfOrigin: "Hà Nội",
      placeOfResidence: "Hà Nội",
      dateOfExpiry: "14/02/2035",
      dateOfCreation: "14/02/2020",
      file: "/path/to/file",
    },
    social: {
      id: "1",
      facebook: "facebook.com/nguyenvana",
      instagram: "instagram.com/nguyenvana",
      twitter: "twitter.com/nguyenvana",
      youtube: "youtube.com/nguyenvana",
      other: "other.com/nguyenvana",
    },
    license: {
      id: "1",
      name: "Công ty TNHH A",
      number: "123456789",
      address: "Hà Nội, Việt Nam",
      charterCapital: "1 tỷ VND",
      file: "/path/to/file",
    },
    verifyPhone: {
      id: "1",
      phone: "0123456789",
    },
  },
  {
    id: "2",
    name: "Nguyễn Văn B",
    email: "nguyenvanb@example.com",
    location: "Hà Nội, Việt Nam",
    phone: "0123456789",
    status: "Đã xác minh",
    createdAt: "01/01/2025",
    identify: {
      id: "2",
      name: "Nguyễn Văn B",
      number: "987654321",
      dateOfBirth: "14/02/2005",
      gender: "Nữ",
      nationality: "Việt Nam",
      placeOfOrigin: "Hà Nội",
      placeOfResidence: "Hà Nội",
      dateOfExpiry: "14/02/2035",
      dateOfCreation: "14/02/2020",
      file: "/path/to/file",
    },
    social: {
      id: "2",
      facebook: "facebook.com/nguyenvanb",
      instagram: "instagram.com/nguyenvanb",
      twitter: "twitter.com/nguyenvanb",
      youtube: "youtube.com/nguyenvanb",
      other: "other.com/nguyenvanb",
    },
    license: {
      id: "2",
      name: "Công ty TNHH B",
      number: "987654321",
      address: "Hà Nội, Việt Nam",
      charterCapital: "2 tỷ VND",
      file: "/path/to/file",
    },
    verifyPhone: {
      id: "2",
      phone: "0123456789",
    },
  },
];
