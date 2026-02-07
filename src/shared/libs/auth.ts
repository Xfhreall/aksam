const STATIC_USERS = [
  { username: "admin", password: "admin123", fullName: "Admin" },
  { username: "user", password: "user123", fullName: "User" },
];

export function validateCredentials(username: string, password: string) {
  const user = STATIC_USERS.find(
    (u) => u.username === username && u.password === password,
  );
  return user ?? null;
}
