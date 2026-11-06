import { create } from "zustand";

type UserRole = "customer" | "worker" | null;
type SessionState = { role: UserRole; setRole: (role: UserRole) => void; };
export const useSessionStore = create<SessionState>((set) => ({ role: null, setRole: (role) => set({ role }) }));
