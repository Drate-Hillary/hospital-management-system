import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true  // Fixed typo (was 'Credential')
}));

app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'health_mgt_system'
});

// Connect to database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database');
});

// JWT middleware
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Routes
app.get('/', (req, res) => {
    return res.json({ message: 'Health Management System API' });
});

// Unified Login Endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt for:', email);

    try {
        // First try to find as doctor
        let sql = 'SELECT * FROM doctors WHERE email = ?';
        db.query(sql, [email], async (err, results) => {
            if (err) return res.status(500).json({ error: 'Database error' });

            if (results.length > 0) {
                const user = results[0];
                const isMatch = password === user.password;

                if (isMatch) {
                    const token = jwt.sign(
                        {
                            id: user.doctor_id,
                            name: user.name,
                            email: user.email,
                            role: 'doctor'
                        },
                        process.env.JWT_SECRET,
                        { expiresIn: '1h' }
                    );

                    return res.json({
                        success: true,
                        token,
                        userType: 'doctor',
                        user: {
                            id: user.doctor_id,
                            name: user.name,
                            email: user.email
                        }
                    });
                }
            }

            // If not found as doctor, try as patient
            sql = 'SELECT * FROM patients WHERE email = ?';
            db.query(sql, [email], async (err, results) => {
                if (err) return res.status(500).json({ error: 'Database error' });

                if (results.length > 0) {
                    const user = results[0];

                    if (!user.password) {
                        console.error('No password found for patient: ', user.email)
                    }
                    const isMatch = password === user.password;

                    if (isMatch) {
                        const token = jwt.sign(
                            {
                                id: user.patient_id,
                                name: user.name,
                                email: user.email,
                                role: 'patient'
                            },
                            process.env.JWT_SECRET,
                            { expiresIn: '1h' }
                        );

                        return res.json({
                            success: true,
                            token,
                            userType: 'patient',
                            user: {
                                id: user.patient_id,
                                name: user.name,
                                email: user.email,
                                profile_image: user.profile_image
                            }
                        });
                    }
                }

                return res.status(401).json({ error: 'Invalid credentials' });
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});



// Protected profile route
// In your server.js (backend)
app.get('/doctor/profile', authenticateJWT, (req, res) => {
    if (req.user.role !== 'doctor') return res.sendStatus(403);

    const sql = 'SELECT * FROM doctors WHERE doctor_id = ?';
    db.query(sql, [req.user.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json({ user: results[0] });
    });
});

app.get('/patient/profile', authenticateJWT, (req, res) => {
    if (req.user.role !== 'patient') return res.sendStatus(403);

    const sql = 'SELECT * FROM patients WHERE email = ?';
    db.query(sql, [req.user.email], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json({ user: results[0] });
    });
});

// Start server
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});