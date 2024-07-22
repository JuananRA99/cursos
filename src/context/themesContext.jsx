import { createContext, useContext, useState, useEffect } from "react";
import {
  createThemeRequest,
  deleteThemeRequest,
  getThemesRequest,
  getThemeByIdRequest,
  updateThemeRequest,
  addCommentRequest,
} from "../api/themes";

const ThemesContext = createContext();

export const useThemes = () => {
  const context = useContext(ThemesContext);
  if (!context)
    throw new Error("useThemes must be used within a ThemesProvider");
  return context;
};

export function ThemesProvider({ children }) {
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    getThemes();
  }, []);

  const getThemes = async () => {
    try {
      const response = await getThemesRequest();
      setThemes(response.data);
    } catch (error) {
      console.error("Error fetching themes:", error);
    }
  };

  const deleteTheme = async (id) => {
    try {
      await deleteThemeRequest(id);
      setThemes(themes.filter((theme) => theme._id !== id));
    } catch (error) {
      console.error("Error deleting theme:", error);
    }
  };

  const createTheme = async (theme) => {
    try {
      const response = await createThemeRequest(theme);
      setThemes([...themes, response.data]);
    } catch (error) {
      console.error("Error creating theme:", error);
    }
  };

  const getThemeById = async (id) => {
    try {
      const response = await getThemeByIdRequest(id);
      return response.data;
    } catch (error) {
      console.error("Error fetching theme by ID:", error);
    }
  };

  const updateTheme = async (id, theme) => {
    try {
      await updateThemeRequest(id, theme);
      setThemes(themes.map((t) => (t._id === id ? { ...t, ...theme } : t)));
    } catch (error) {
      console.error("Error updating theme:", error);
    }
  };

  const addComment = async (id, comment) => {
    try {
      const response = await addCommentRequest(id, comment);
      setThemes(themes.map((theme) => {
        if (theme._id === id) {
          return {
            ...theme,
            comentarios: [...theme.comentarios, response.data.comentarios],
          };
        }
        return theme;
      }));
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <ThemesContext.Provider
      value={{
        themes,
        getThemes,
        createTheme,
        deleteTheme,
        getThemeById,
        updateTheme,
        addComment,
      }}
    >
      {children}
    </ThemesContext.Provider>
  );
}
