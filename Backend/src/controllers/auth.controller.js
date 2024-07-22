import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from '../libs/jwt.js';
import { sendVerificationEmail } from '../services/emailService.js';

export const register = async (req, res) => {
  const { email, password, confirmPassword, username } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Las contraseñas no coinciden " });
  }

  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      console.log('Email already in use');
      return res.status(400).json({ message: "El email ya está en uso" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: passwordHash, isVerified: false });
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });

    res.cookie('token', token);
    await sendVerificationEmail(email, token);

    res.json({
      message: 'Por favor, verifica tu email para activar tu cuenta.',
      id: userSaved._id,
      username: userSaved.username,
      isVerified: userSaved.isVerified,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Error al registrar el usuario. Inténtelo de nuevo más tarde.' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request body:', req.body);

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) {
      console.log('User not found');
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      console.log('Password incorrect');
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    if (!userFound.isVerified) {
      const token = await createAccessToken({ id: userFound._id });
      await sendVerificationEmail(email, token);
      console.log('User not verified, email sent');
      return res.status(400).json({ message: "Por favor, verifica tu email. Se ha enviado un nuevo enlace de verificación." });
    }

    const token = await createAccessToken({ id: userFound._id });
    res.cookie('token', token);

    res.json({
      id: userFound._id,
      username: userFound.username,
      isVerified: userFound.isVerified,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie('token', "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  console.log(req.user);
  try {
    const userFound = await User.findById(req.user.id);
    if (!userFound) return res.status(404).json({ message: "User not found" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Error al obtener el perfil. Inténtelo de nuevo más tarde.' });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    try {
      const userFound = await User.findById(user.id);
      if (!userFound) return res.status(401).json({ message: "Unauthorized" });

      return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      });
    } catch (error) {
      console.error('Verify token error:', error);
      res.status(500).json({ message: 'Error al verificar el token. Inténtelo de nuevo más tarde.' });
    }
  });
};

export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ message: "Token inválido" });
    }

    user.isVerified = true;
    await user.save();

    res.json({ message: "Email verificado exitosamente" });
  } catch (error) {
    console.error('Error al verificar el email:', error);
    res.status(500).json({ message: "Error al verificar el email. Inténtelo de nuevo más tarde." });
  }
};
