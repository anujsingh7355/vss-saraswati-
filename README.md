# VSS Saraswati Vidya Mandir Inter College, Arkha, Raebareli
### Official School Website & Management Portal
**वि.सं.स्मा. सरस्वती विद्या मन्दिर इण्टर कॉलेज, अरखा, रायबरेली, उत्तर प्रदेश**

---

A modern, responsive, high-performance, and bilingual (Hindi & English) institutional web portal built with **React**, **Vite**, **Tailwind CSS**, **Node.js**, **Express**, and **MongoDB**. Designed according to the rich pedagogical tradition of Vidya Bharati and the UP Madhyamik Shiksha Parishad (UP Board).

---

## 🌟 Key Features

### 1. Bilingual Institutional Design (Hindi + English)
- One-click language switcher across all pages and navigation elements.
- Cultural aesthetic reflecting Vidya Mandir ethos (*"सा विद्या या विमुक्तये"*), saffron, navy, and gold accents.
- 100% mobile, tablet, and desktop responsive with smooth animations.

### 2. Comprehensive Academic & Admission Sections
- **Academics**: Covers Bal Vatika (Nursery to 5th), Junior (6th to 8th), High School (9th-10th), and Intermediate (11th-12th) with Science (PCM/PCB), Commerce, and Arts streams.
- **Admissions**: Step-by-step procedures, mandatory document checklist, important session dates, and an **interactive admission enquiry form** that records submissions directly into the database.

### 3. Online Examination Results Portal
- Students and parents can verify board marks by entering **Roll Number** and **Date of Birth**.
- Displays an official, watermarked statement of marks with individual subject grades, aggregate percentage, and division.
- Integrated **1-Click "Print Marksheet / Save PDF"** feature optimized for standard A4 printing.

### 4. Dynamic Digital Notice Board & Events Calendar
- Real-time circulars with categories (*Admissions, Examinations, Sports, Academic, General*).
- Highlighted "Important" notices with pulsating tags.
- Direct downloadable PDF links.
- Upcoming and past event timeline (*Annual Function, Saraswati Puja, Science Day, Independence Day*).

### 5. Campus Facilities & Interactive Media Gallery
- Comprehensive showcases for Smart Classrooms, Physics, Chemistry & Biology Laboratories, Computer Lab, Central Library, Sports Complex, RO Drinking Water, and Transportation.
- High-definition photo gallery categorized by albums (*Campus, Classroom, Sports, Cultural, Annual Function*) with an interactive **Lightbox preview modal**.

### 6. Central Downloads Repository
- Download official Admission Forms, UP Board Syllabus (Class 10th & 12th), Academic Calendar, and Examination Schedules.

### 7. Secure Admin Control Dashboard (`/admin`)
- Protected by JWT authentication and password hashing.
- Management tabs:
  - **Overview**: Real-time stats (enquiries, notices, events, results, downloads).
  - **Admissions Management**: Review incoming admission enquiries, change status (*Pending / Contacted / Admitted*), and delete.
  - **Notices Manager**: Add, edit, delete, toggle Important badge, link PDFs.
  - **Events Manager**: Schedule school events with photos, times, and venues.
  - **Faculty Manager**: Add, update, and manage teacher profiles, designations, and qualifications.
  - **Result Uploader**: Add or update student marks and board examination results.
  - **Downloads Manager**: Upload and publish school documents.
  - **Contact Inquiries**: Review public messages sent via the contact form.
  - **School Settings (Requirement #21)**: Live editable controls for Principal Name, Phone Numbers, Email, Campus Address, Timings, Affiliation Code, Social Links, and Fee notices.

---

## 📁 Project Structure

```
vss-arkha/
├── client/                     # Frontend Application (React + Vite + Tailwind CSS)
│   ├── public/
│   │   ├── logo.svg            # Official School Crest / Emblem SVG
│   │   ├── robots.txt          # SEO Crawl Configuration
│   │   └── sitemap.xml         # Search Engine Sitemap
│   ├── src/
│   │   ├── components/         # Navbar, Footer, BannerTicker, LightboxModal, MarksheetCard
│   │   ├── context/            # LanguageContext (EN/HI), AuthContext (Admin Session)
│   │   ├── pages/              # Home, About, Academics, Admissions, Faculty, Facilities,
│   │   │                       # Gallery, Notices, Events, Results, Downloads, Contact, Admin
│   │   ├── services/           # api.js (Unified REST Client)
│   │   ├── App.jsx             # React Router Configuration
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Custom styles & Print media queries
│   ├── index.html              # SEO Meta tags & Google Fonts
│   ├── tailwind.config.js      # School color palette & typography
│   ├── vite.config.js          # Vite config with API proxy
│   └── package.json
│
├── server/                     # Backend API (Node.js + Express + MongoDB)
│   ├── src/
│   │   ├── config/             # db.js (MongoDB Connection + Fallback Engine)
│   │   ├── controllers/        # authController.js, apiControllers.js
│   │   ├── middleware/         # auth.js (JWT Bearer Token Guard)
│   │   ├── routes/             # authRoutes.js, apiRoutes.js
│   │   ├── data/               # seedData.js (Realistic Authentic Default Data)
│   │   ├── utils/              # dbStore.js (Hybrid Storage Engine)
│   │   └── server.js           # Express App Server
│   ├── data/
│   │   └── db.json             # Persistent Local Store (auto-generated)
│   ├── .env                    # Environment Variables
│   ├── .env.example
│   └── package.json
│
├── package.json                # Root Concurrently Scripts
└── README.md                   # Complete Documentation
```

---

## 🚀 1. Running the Project Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Step-by-Step Local Startup:

1. **Install All Dependencies:**
   Run from the project root:
   ```bash
   npm run install:all
   ```
   *(Or individually inside `client/` and `server/` with `npm install`)*

2. **Start Both Client and Server in Development Mode:**
   ```bash
   npm run dev
   ```
   This starts:
   - Backend API: `http://localhost:5000`
   - Frontend Web Portal: `http://localhost:5173`

3. **Open the Website:**
   Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## 🍃 2. Connecting MongoDB

The application includes a **dual-engine database architecture**:
- **Automatic Fallback Mode**: If MongoDB is not running locally, the application automatically uses the integrated JSON database engine (`server/data/db.json`). Everything works seamlessly with zero crashes!
- **MongoDB Atlas / Local MongoDB**: To connect to a live MongoDB instance:

1. Open `server/.env`.
2. Set your `MONGODB_URI` string:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/vss_svm?retryWrites=true&w=majority
   ```
   *(For local MongoDB instance: `MONGODB_URI=mongodb://127.0.0.1:27017/vss_svm`)*
3. Restart the server. You will see:
   ```
   [MongoDB] Connected successfully: cluster0-shard-...
   ```

---

## 🔐 3. Creating & Accessing Admin Account

The admin login URL is:
```
http://localhost:5173/admin/login
```

### Default Credentials:
- **Email:** `admin@vsssvm.edu.in`
- **Password:** `admin123`

*(You can also click the **"Fill Default Demo Credentials"** button on the login screen for instant 1-click access)*

### Changing Admin Password & Credentials:
In `server/.env`:
```env
ADMIN_EMAIL=your_preferred_admin@vsssvm.edu.in
ADMIN_PASSWORD=your_new_secure_password
JWT_SECRET=your_custom_jwt_secret_token
```

---

## 📝 4. Adding School Content

All content can be updated without touching any code:

1. **Edit Principal, Phone, Email & Address**:
   - Go to `/admin/login` → Sign In → Select **School Settings** tab.
   - Edit Principal Name, School Timings, Phone Number, College Code, Social Links, etc.
   - Click **Save All Settings**. The changes reflect instantly across the entire website!

2. **Publish Notices**:
   - Select **Notices** tab → Enter Notice Title (English & Hindi), select category, date, PDF URL, toggle **Important** if urgent → Click **Publish Notice**.

3. **Upload Student Results**:
   - Select **Results** tab → Enter Student Roll Number, Name, Class, Marks, and Percentage → Click **Record Student Result**.
   - Students can immediately look up this marksheet on `/results`.

4. **Add Photos to Gallery**:
   - Select **Gallery** tab → Enter Title, choose Album (*Campus, Sports, Cultural, etc.*), and paste Image URL → Click **Add Photo**.

---

## 🌐 5. Deploying Frontend (Vercel)

1. Push this project to your GitHub repository.
2. Sign in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your repository and configure:
   - **Root Directory**: `client`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variable:
   - `VITE_API_URL` = `https://your-backend-render-app.onrender.com` (your deployed backend URL).
5. Click **Deploy**.

---

## ⚙️ 6. Deploying Backend (Render / Railway)

### On Render:
1. Sign in to [Render](https://render.com/) and click **New → Web Service**.
2. Select your repository.
3. Configure:
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node src/server.js`
4. In **Environment Variables**, add:
   ```env
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/vss_svm
   JWT_SECRET=your_jwt_secret_key
   ADMIN_EMAIL=admin@vsssvm.edu.in
   ADMIN_PASSWORD=your_secure_password
   CLIENT_URL=https://your-frontend.vercel.app
   ```
5. Click **Create Web Service**.

---

## 🔗 7. Connecting Custom Domain (e.g. `vsssvm.edu.in` or `.in`)

1. Purchase your domain from GoDaddy, Namecheap, or Hostinger.
2. In **Vercel Project Settings → Domains**:
   - Add your custom domain (e.g., `vsssvm.edu.in` and `www.vsssvm.edu.in`).
3. In your Domain Registrar's DNS Management, add the records provided by Vercel:
   - **A Record**: Host `@` pointing to `76.76.21.21`
   - **CNAME Record**: Host `www` pointing to `cname.vercel-dns.com`
4. Vercel will automatically provision free SSL (HTTPS) within a few minutes.

---

## 🎯 Target SEO Keywords
- `VSS Saraswati Vidya Mandir Inter College Arkha`
- `Saraswati Vidya Mandir Arkha Raebareli`
- `School in Arkha Raebareli`
- `UP Board Inter College Arkha`
- `Best School in Salon Raebareli`

---

## 👨‍🏫 Testing Candidate Roll Numbers
To test the online Result Scorecard on `/results`:
| Roll Number | Date of Birth | Student Name | Class | Result |
| :--- | :--- | :--- | :--- | :--- |
| `2026101` | `2008-05-15` | Aman Verma | Class 10th | 89.33% (First Division) |
| `2026102` | `2008-08-22` | Priya Sharma | Class 10th | 94.33% (Distinction / Rank 1) |
| `2026121` | `2006-03-10` | Rahul Kumar Singh | Class 12th (Science PCM) | 91.00% (First Division with Honors) |
| `2026122` | `2006-11-04` | Anjali Gupta | Class 12th (Commerce) | 88.40% (First Division) |

---
*© VSS Saraswati Vidya Mandir Inter College, Arkha, Raebareli, Uttar Pradesh.*
