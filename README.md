# 🧠 Braines – Online Jobs & Digital Opportunities Platform

## 📌 Overview

**Braines
** is a full-stack web platform that connects users to 
**online earning opportunities
** such as affiliate marketing, transcription, web design, and network marketing.

The goal of Braines is to empower individuals—especially students and beginners to discover, learn, and earn through digital skills and online jobs.


## 🚀 Tech Stack

### Frontend

* React.js
* CSS
* Axios

### Backend

* Node.js
* Express.js

### Database

* MySQL


## ✨ Features

### 👤 User Features

* User registration & login (authentication)
* Explore different online job opportunities
* Categories (Affiliate Marketing, Transcription, Web Design, etc.)
* Access guides/tutorials for each opportunity
* Save/bookmark opportunities
* Personalized dashboard


### 💼 Opportunity Categories

* Affiliate Marketing
* Network Marketing
* Transcription Jobs
* Web Design & Development
* Freelancing
* Other Online Gigs


### 🛠️ Admin Features

* Add, update, and delete job opportunities
* Manage users
* Moderate content
* Dashboard analytics


## 📂 Project Structure

```
id="wz3k1n"
braines/
│
├── client/        # React frontend
├── server/        # Node + Express backend
├── database/      # MySQL schema & queries
└── README.md
```


## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash id="m9x4lq"
git clone https://github.com/your-username/braines.git
cd braines
```


### 2️⃣ Install dependencies

#### Frontend

```bash id="p2l7kv"
cd client
npm install
```

#### Backend

```bash id="v8n2dz"
cd ../server
npm install
```


### 3️⃣ Configure Environment Variables

Create a `.env` file in the `server` folder:

```env id="b5q7xe"
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=braines_db
JWT_SECRET=your_secret_key
```


### 4️⃣ Run the Application

#### Start Backend

```bash id="c1u4nm"
cd server
npm start
```

#### Start Frontend

```bash id="j7k3sd"
cd client
npm start
```


## 🗄️ Database Setup

1. Install MySQL
2. Create database:

```sql id="q9d2la"
CREATE DATABASE braines_db;
```


## 🔐 Authentication

* JWT-based authentication
* Secure user sessions
* Protected routes


## 🌍 Vision

Braines aims to become a **central hub for digital income opportunities**, helping users:

* Learn valuable online skills
* Discover legit earning platforms
* Build sustainable online income


## 🚀 Future Improvements

* M-Pesa integration for payouts or premium features
* User skill tracking system
* Ratings & reviews for opportunities
* AI-based recommendations
* Community/forum feature


## 🤝 Contributing

Contributions are welcome!

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to GitHub
5. Open a Pull Request


## 👨‍💻 Author

**Karani (Brian Karani)**

* Full-stack developer
* Creator of Braines


## 📄 License

This project is licensed under the MIT License.

---
