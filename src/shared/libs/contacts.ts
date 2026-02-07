export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "aksam-contacts";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

function getInitialData(): Contact[] {
  return [
    {
      id: generateId(),
      name: "Agus Santoso",
      email: "agus@example.com",
      phone: "081234567890",
      address: "Jl. Merdeka No. 1, Jakarta",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: generateId(),
      name: "Budi Raharjo",
      email: "budi@example.com",
      phone: "081234567891",
      address: "Jl. Sudirman No. 2, Bandung",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: generateId(),
      name: "Citra Dewi",
      email: "citra@example.com",
      phone: "081234567892",
      address: "Jl. Ahmad Yani No. 3, Surabaya",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: generateId(),
      name: "Dewi Lestari",
      email: "dewi@example.com",
      phone: "081234567893",
      address: "Jl. Diponegoro No. 4, Yogyakarta",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: generateId(),
      name: "Eko Prasetyo",
      email: "eko@example.com",
      phone: "081234567894",
      address: "Jl. Gatot Subroto No. 5, Semarang",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: generateId(),
      name: "Fitri Handayani",
      email: "fitri@example.com",
      phone: "081234567895",
      address: "Jl. Pahlawan No. 6, Malang",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: generateId(),
      name: "Gunawan Wibowo",
      email: "gunawan@example.com",
      phone: "081234567896",
      address: "Jl. Pemuda No. 7, Denpasar",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: generateId(),
      name: "Hani Susanti",
      email: "hani@example.com",
      phone: "081234567897",
      address: "Jl. Kartini No. 8, Medan",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: generateId(),
      name: "Irfan Hakim",
      email: "irfan@example.com",
      phone: "081234567898",
      address: "Jl. Veteran No. 9, Makassar",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}

export function getContacts(): Contact[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    const initial = getInitialData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(data);
}

export function saveContacts(contacts: Contact[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}

export function addContact(
  contact: Omit<Contact, "id" | "createdAt" | "updatedAt">,
): Contact {
  const contacts = getContacts();
  const newContact: Contact = {
    ...contact,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  contacts.push(newContact);
  saveContacts(contacts);
  return newContact;
}

export function updateContact(
  id: string,
  data: Partial<Omit<Contact, "id" | "createdAt" | "updatedAt">>,
): Contact | null {
  const contacts = getContacts();
  const index = contacts.findIndex((c) => c.id === id);
  if (index === -1) return null;
  contacts[index] = {
    ...contacts[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  saveContacts(contacts);
  return contacts[index];
}

export function deleteContact(id: string): boolean {
  const contacts = getContacts();
  const filtered = contacts.filter((c) => c.id !== id);
  if (filtered.length === contacts.length) return false;
  saveContacts(filtered);
  return true;
}

export function getContactById(id: string): Contact | null {
  const contacts = getContacts();
  return contacts.find((c) => c.id === id) ?? null;
}
