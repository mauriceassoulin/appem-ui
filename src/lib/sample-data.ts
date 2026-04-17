export const sampleUsers = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah.chen@appem.io",
    role: "Admin",
    status: "Active",
    avatar: null,
    department: "Engineering",
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    email: "marcus.j@appem.io",
    role: "Editor",
    status: "Active",
    avatar: null,
    department: "Design",
    joinDate: "2024-03-22",
  },
  {
    id: 3,
    name: "Aiko Tanaka",
    email: "aiko.t@appem.io",
    role: "Viewer",
    status: "Inactive",
    avatar: null,
    department: "Marketing",
    joinDate: "2023-11-05",
  },
  {
    id: 4,
    name: "David Park",
    email: "david.park@appem.io",
    role: "Editor",
    status: "Active",
    avatar: null,
    department: "Product",
    joinDate: "2024-06-10",
  },
  {
    id: 5,
    name: "Elena Vasquez",
    email: "elena.v@appem.io",
    role: "Admin",
    status: "Active",
    avatar: null,
    department: "Engineering",
    joinDate: "2023-08-17",
  },
  {
    id: 6,
    name: "James Miller",
    email: "james.m@appem.io",
    role: "Viewer",
    status: "Pending",
    avatar: null,
    department: "Sales",
    joinDate: "2024-09-01",
  },
];

export const sampleProducts = [
  {
    id: 1,
    name: "Wireless Keyboard Pro",
    price: 89.99,
    category: "Electronics",
    stock: 142,
    sku: "WKB-PRO-001",
  },
  {
    id: 2,
    name: "Ergonomic Mouse",
    price: 49.99,
    category: "Electronics",
    stock: 238,
    sku: "EMO-002",
  },
  {
    id: 3,
    name: "USB-C Hub 7-in-1",
    price: 34.99,
    category: "Accessories",
    stock: 67,
    sku: "HUB-7IN1-003",
  },
  {
    id: 4,
    name: "Monitor Stand",
    price: 129.00,
    category: "Furniture",
    stock: 0,
    sku: "MST-004",
  },
  {
    id: 5,
    name: "Webcam HD 1080p",
    price: 59.99,
    category: "Electronics",
    stock: 91,
    sku: "WCM-HD-005",
  },
  {
    id: 6,
    name: "Desk Pad XL",
    price: 24.99,
    category: "Accessories",
    stock: 310,
    sku: "DPD-XL-006",
  },
];

export const sampleTabs = [
  { key: "all", label: "All Records", color: "#0a7fff", badge: 156 },
  { key: "active", label: "Active", color: "#22c55e", badge: 98 },
  { key: "pending", label: "Pending Review", color: "#f59e0b", badge: 23 },
  { key: "archived", label: "Archived", color: "#94a3b8", badge: 35 },
];

export const sampleFilters = [
  {
    key: "status",
    label: "Status",
    type: "select" as const,
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
      { value: "pending", label: "Pending" },
    ],
  },
  {
    key: "role",
    label: "Role",
    type: "multiselect" as const,
    options: [
      { value: "admin", label: "Admin" },
      { value: "editor", label: "Editor" },
      { value: "viewer", label: "Viewer" },
    ],
  },
  {
    key: "search",
    label: "Name",
    type: "text" as const,
  },
  {
    key: "verified",
    label: "Verified Only",
    type: "toggle" as const,
  },
];

export const sampleSubtableColumns = [
  { key: "item", header: "Item Name", editable: true, type: "text" as const },
  { key: "qty", header: "Qty", editable: true, type: "number" as const, width: 80 },
  { key: "unit_price", header: "Unit Price", editable: true, type: "currency" as const, width: 120 },
  { key: "total", header: "Total", editable: false, type: "currency" as const, width: 120 },
];

export const sampleSubtableRows = [
  { _id: "1", item: "Laptop Stand Pro", qty: 2, unit_price: 45.00, total: 90.00 },
  { _id: "2", item: "USB-C Cable (2m)", qty: 5, unit_price: 12.99, total: 64.95 },
  { _id: "3", item: "Screen Protector", qty: 10, unit_price: 8.50, total: 85.00 },
];

export const sampleBreadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Electronics", href: "/products/electronics" },
  { label: "Wireless Keyboard Pro" },
];

export const sampleSavedViews = [
  { key: "my-records", label: "My Records" },
  { key: "recent", label: "Recently Modified" },
  { key: "flagged", label: "Flagged Items" },
];
