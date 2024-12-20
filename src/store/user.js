import { create } from "zustand";

// Global state
export const useUserStore = create((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  createUser: async (newUser) => {
    if (!newUser.name || !newUser.email) {
      return { success: false, message:"Please fill in all fields." };
    }
    const res = await fetch("https://full-stack-mern-back-end.onrender.com/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    const result = await res.json();
    set((state) => ({ users: [...state.users, result.data] }));
    return { success: true, message:"User created successfully." };
  },
  fetchUsers: async () => {
    const res = await fetch("https://full-stack-mern-back-end.onrender.com/api/users");
    const results = await res.json();
    set({ users: results.data });
  },
  deleteUser: async (userId) => {
    const res = await fetch(`https://full-stack-mern-back-end.onrender.com/api/users/${userId}`, {
      method: "DELETE",
    });
    const result = await res.json();
    if (!result.success) return { sucess: false, message: result.message };

    //Update the UI immediately, without needing a refresh
    set((state) => ({ users: state.users.filter(user => user._id !== userId) }));
    return { sucess: true, message: result.message };
  },
  updateUser: async (userId, updatedUser) => {
    const res = await fetch(`https://full-stack-mern-back-end.onrender.com/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });
    const result = await res.json();
    if (!result.success) return { sucess: false, message: result.message };

    //Update the UI immediately, without needing a refresh
    set((state) => ({ 
      users: state.users.map((user) => (user._id === userId ? result.data : user)),
    }));
    return { sucess: true, message: result.message };
  }
}));

// Local state
//const [state, setState] = useState([]);