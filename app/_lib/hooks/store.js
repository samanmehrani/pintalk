import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useUserStore = create(
    persist(
        (set, get) => ({
            user: {},
            updateUser: (updatedFields) => set((state) => ({
                user: { ...state.user, ...updatedFields }
            })),
            removeUser: () => set({ user: initialUser }),
        }),
        {
            name: 'user', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)