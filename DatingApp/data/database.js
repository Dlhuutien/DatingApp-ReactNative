import * as SQLite from 'expo-sqlite';

const db = await SQLite.openDatabaseAsync('databaseName');

// Create Users table
await db.execAsync(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    age TEXT NOT NULL,
    phoneNumber TEXT NOT NULL,
    image TEXT NOT NULL
  );
`);

// Create Profile Details table
await db.execAsync(`
  CREATE TABLE IF NOT EXISTS profile_details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    occupation TEXT,
    gender TEXT,
    education TEXT,
    location TEXT,
    height TEXT,
    zodiac TEXT,
    religion TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

// Create Messages table
await db.execAsync(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY NOT NULL,
    content TEXT NOT NULL,
    sentAt TEXT NOT NULL,
    senderId INTEGER,
    receiverId INTEGER,
    FOREIGN KEY (senderId) REFERENCES users(id),
    FOREIGN KEY (receiverId) REFERENCES users(id)
  );
`);

// Insert users into the Users table
await db.runAsync('INSERT INTO users (id, name, age, phoneNumber, image) VALUES (?, ?, ?, ?, ?)', [1, 'HuwTien', '22', '0386474751', 'path_to_image/HuwTien.jpg']);
await db.runAsync('INSERT INTO users (id, name, age, phoneNumber, image) VALUES (?, ?, ?, ?, ?)', [2, 'Kio', '22', '03', 'path_to_image/HuwTien2.jpg']);
await db.runAsync('INSERT INTO users (id, name, age, phoneNumber, image) VALUES (?, ?, ?, ?, ?)', [3, 'HuwTienNe', '21', '0386474752', 'path_to_image/HuwTien.jpg']);

// Insert profile details for each user
await db.runAsync('INSERT INTO profile_details (user_id, occupation, gender, education, location, height, zodiac, religion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
  [1, 'Engineer', 'Male', 'Bachelor', 'New York', '170cm', 'Aries', 'None']);
await db.runAsync('INSERT INTO profile_details (user_id, occupation, gender, education, location, height, zodiac, religion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
  [2, 'Designer', 'Female', 'Master', 'Los Angeles', '165cm', 'Taurus', 'Christianity']);
await db.runAsync('INSERT INTO profile_details (user_id, occupation, gender, education, location, height, zodiac, religion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
  [3, 'Engineer', 'Male', 'Bachelor', 'New York', '170cm', 'Aries', 'None']);

// Insert messages
await db.runAsync('INSERT INTO messages (id, content, sentAt, senderId, receiverId) VALUES (?, ?, ?, ?, ?)', [1, 'Hello!', '2024-11-18T10:30:00Z', 1, 2]);
await db.runAsync('INSERT INTO messages (id, content, sentAt, senderId, receiverId) VALUES (?, ?, ?, ?, ?)', [2, 'Khưa khưa!', '2024-11-18T10:31:00Z', 1, 2]);
await db.runAsync('INSERT INTO messages (id, content, sentAt, senderId, receiverId) VALUES (?, ?, ?, ?, ?)', [3, 'Hi there!', '2024-10-18T11:00:00Z', 2, 1]);
await db.runAsync('INSERT INTO messages (id, content, sentAt, senderId, receiverId) VALUES (?, ?, ?, ?, ?)', [4, 'Khưa khưa!', '2024-10-18T11:01:00Z', 2, 1]);
await db.runAsync('INSERT INTO messages (id, content, sentAt, senderId, receiverId) VALUES (?, ?, ?, ?, ?)', [5, 'Hello!', '2024-11-18T10:30:00Z', 1, 2]);

// Fetch all users and their details
const allUsers = await db.getAllAsync(`
  SELECT u.id, u.name, u.age, u.phoneNumber, u.image, p.occupation, p.gender, p.education, p.location, p.height, p.zodiac, p.religion
  FROM users u
  LEFT JOIN profile_details p ON u.id = p.user_id;
`);
console.log(allUsers);

// Fetch all messages
const allMessages = await db.getAllAsync('SELECT * FROM messages');
console.log(allMessages);
