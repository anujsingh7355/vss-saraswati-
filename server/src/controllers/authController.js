import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'vss_saraswati_vidya_mandir_secret_jwt_key_2026_arkha';
let adminAccount = {
  email: process.env.ADMIN_EMAIL || 'admin@vsssvm.edu.in',
  passwordHash: bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin123', 10),
  name: 'VSS SVM Administrator',
  role: 'superadmin'
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const isMatchEmail = email.toLowerCase().trim() === adminAccount.email.toLowerCase().trim();
    const isMatchPass = isMatchEmail && bcrypt.compareSync(password, adminAccount.passwordHash);

    if (!isMatchEmail || !isMatchPass) {
      return res.status(401).json({
        success: false,
        message: 'Invalid administrator credentials. Please check email and password.'
      });
    }

    const token = jwt.sign(
      { email: adminAccount.email, role: adminAccount.role, name: adminAccount.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Admin authentication successful.',
      token,
      admin: {
        email: adminAccount.email,
        name: adminAccount.name,
        role: adminAccount.role
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const verifySession = async (req, res) => {
  return res.status(200).json({
    success: true,
    admin: req.admin
  });
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    if (!bcrypt.compareSync(currentPassword, adminAccount.passwordHash)) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
    }

    adminAccount.passwordHash = bcrypt.hashSync(newPassword, 10);
    return res.status(200).json({ success: true, message: 'Admin password changed successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
