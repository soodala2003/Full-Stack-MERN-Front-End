import { create } from "zustand";

export const useSourceStore = create((set) => ({
  sources: [],
  setSources: (sources) => set({ sources }),
  createSource: async (newSource) => {
    if (!newSource.author || !newSource.title || !newSource.description || !newSource.url) {
      return { success: false, message:"Please provide fields of Author, Title, Description, and URL.." };
    }
      
    const res = await fetch("https://full-stack-mern-back-end.onrender.com/api/sources", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSource),
    });
    const result = await res.json();
    set((state) => ({ sources: [...state.sources, result.data] }));
    return { success: true, message:"Source posted successfully." };
  },
  fetchSources: async () => {
    const res = await fetch("https://full-stack-mern-back-end.onrender.com/api/sources");
    const results = await res.json();
    set({ Sources: results.data });
  },
  deleteSource: async (sourceId) => {
    const res = await fetch(`https://full-stack-mern-back-end.onrender.com/api/sources/${sourceId}`, {
      method: "DELETE",
    });
    const result = await res.json();
    if (!result.success) return { sucess: false, message: result.message };

    //Update the UI immediately, without needing a refresh
    set((state) => ({ sources: state.sources.filter(source => source._id !== sourceId) }));
    return { sucess: true, message: result.message };
  },
  updateSource: async (sourceId, updatedSource) => {
    const res = await fetch(`https://full-stack-mern-back-end.onrender.com/api/sources/${sourceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSource),
    });
    const result = await res.json();
    if (!result.success) return { sucess: false, message: result.message };

    //Update the UI immediately, without needing a refresh
    set((state) => ({ 
      sources: state.sources.map((source) => (source._id === sourceId ? result.data : source)),
    }));
    return { sucess: true, message: result.message };
  }
}));
