import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    Credential: true
}));
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'health_mgt_system'
});

app.get('/', (req, res) => {
    return res.json('Hello')
});

app.post('/login/doctor', (req, res) => {

    const { email, doctor_id } = req.body;
    console.log('Received:', email, doctor_id);
    const sql = 'SELECT * FROM doctors WHERE email = ? AND doctor_id = ?';
    db.query(sql, [email, doctor_id], (err, data) => {
        if (err) return res.json({ success: false, error: err });

        if (data.length > 0) {
            return res.json({ success: true, user: data[0] })
        } else {
            return res.json({ success: false, error: 'Doctor not found?' })
        }
    });
});

app.post('/login/patient', (req, res)=>{

    const { email, patient_id } = req.body;
    const sql = 'SELECT * FROM patients WHERE email = ? AND patient_id = ?';
    db.query(sql, [email, patient_id], (err, data) => {
        if (err) return res.json({ success: false, error: err });

        if (data.length > 0) {
            return res.json({ success: true, user: data[0] })
        } else {
            return res.json({ success: false, error: 'Patient not found?' })
        }
    });

})

app.listen(8082, () => {
    console.log('listening')
});
