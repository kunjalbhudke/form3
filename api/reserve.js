import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, date, time, guests } = req.body;

    try {
      // Database connection
      const connection = await mysql.createConnection({
        host: 'localhost', // Your database host
        user: 'root',      // Your MySQL username
        password: 'Ksbn046497', // Add your database password here
        database: 'restaurant', // The name of your database
      });

      // Insert data into the database
      const query = `INSERT INTO reservations (name, email, phone, date, time, guests)
                     VALUES (?, ?, ?, ?, ?, ?)`;
      const values = [name, email, phone, date, time, guests];

      await connection.execute(query, values);

      res.status(200).json({ message: 'Reservation saved successfully!' });
      await connection.end();
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Error saving reservation!' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
