const mockApplicationUsers = [
  {
    id: 1,
    applicationId: 1,
    userId: 1,
    email: "john.doe@example.com",
    name: "John Doe",
    role: "owner",
    status: "active",
    joinedAt: "2024-12-01"
  },
  {
    id: 2,
    applicationId: 1,
    userId: 2,
    email: "jane.smith@example.com",
    name: "Jane Smith",
    role: "admin",
    status: "active",
    joinedAt: "2024-12-05"
  },
  {
    id: 3,
    applicationId: 2,
    userId: 1,
    email: "john.doe@example.com",
    name: "John Doe",
    role: "owner",
    status: "active",
    joinedAt: "2024-12-10"
  },
  {
    id: 4,
    applicationId: 3,
    userId: 1,
    email: "john.doe@example.com",
    name: "John Doe",
    role: "owner",
    status: "active",
    joinedAt: "2024-12-15"
  }
];

export default mockApplicationUsers;
