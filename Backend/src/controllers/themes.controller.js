import Theme from "../models/themes.model.js";

export const getThemes = async (req, res) => {
  try {
    const themes = await Theme.find().populate("user");
    res.json(themes);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createTheme = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const newTheme = new Theme({
      title,
      description,
      date,
      user: req.user.id,
      comentarios: [], // Inicialmente no hay comentarios
    });
    const savedTheme = await newTheme.save();
    res.json(savedTheme);
  } catch (error) {
    console.error("Error creating theme:", error);
    return res.status(500).json({ message: "Failed to create theme" });
  }
};
export const getThemeById = async (req, res) => {
  const { id } = req.params;

  try {
    const theme = await Theme.findById(id).populate('user').populate('comentarios');
    if (!theme) {
      return res.status(404).json({ error: 'Theme not found' });
    }
    res.status(200).json(theme);
  } catch (error) {
    console.error('Error fetching theme by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const deleteTheme = async (req, res) => {
  try {
    const deletedTheme = await Theme.findByIdAndDelete(req.params.id);
    if (!deletedTheme)
      return res.status(404).json({ message: "Theme not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Theme not found" });
  }
};

export const updateTheme = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const themeUpdated = await Theme.findOneAndUpdate(
      { _id: req.params.id },
      { title, description, date },
      { new: true }
    );
    return res.json(themeUpdated);
  } catch (error) {
    return res.status(404).json({ message: "Theme not found" });
  }
};
export const addComment = async (req, res) => {
  const { id } = req.params;
  const { comentario, email } = req.body;

  try {
    const theme = await Theme.findById(id);

    if (!theme) {
      return res.status(404).json({ message: "Theme not found" });
    }

    // Añadir el comentario al tema
    theme.comentarios.push({ email, comentario });
    const savedTheme = await theme.save();

    res.status(201).json(savedTheme);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Failed to add comment" });
  }
};