import {
  MenuItemProps,
  NewCustomerItemProps,
  TopWorkspace,
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
