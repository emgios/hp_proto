const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

const db = new sqlite3.Database('./database.db', (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log('Database connection successful.');
});

app.use(express.json());

app.get('/data', (req, res) => {
	const sql = 'SELECT * FROM breakfast';
	db.all(sql, [], (err, rows) => {
	if (err) {
		throw err;
	}
	res.json(rows);
	});
});

app.post('/data', (req, res) => {
	const { name, color, season} = req.body;
	const sql = 'INSERT INTO breakfast (name, color, season) VALUES (?, ?, ?,)';
	db.run(sql, [name, color, season], (err) => {
		if (err) {
			return console.error(err.message)
		}
		res.send('Item added successfully.');
	});
});

app.listen(port, () => {
	console.log(`Server running on PORT${port}`);
});
