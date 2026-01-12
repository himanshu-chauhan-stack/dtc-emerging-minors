<p align="center">
  <img src="public/dtc-logo.png" alt="Delhi Technical Campus Logo" width="120" height="120">
</p>

<h1 align="center">🎓 Delhi Technical Campus</h1>
<h3 align="center">Elective Allocation Intelligence Dashboard</h3>

<p align="center">
  <strong>A modern, interactive dashboard for analyzing student elective allocation data</strong>
</p>

<p align="center">
  <a href="https://dtc-emerging-minors.vercel.app">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-Vercel-black?style=for-the-badge" alt="Live Demo">
  </a>
  <img src="https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind">
  <img src="https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite" alt="Vite">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Students-225-blue?style=flat-square" alt="Students">
  <img src="https://img.shields.io/badge/Sections-4-green?style=flat-square" alt="Sections">
  <img src="https://img.shields.io/badge/Electives-AIML%20%7C%20DS-purple?style=flat-square" alt="Electives">
</p>

---

## ✨ Features

### 📊 Summary Cards
| Card | Description |
|------|-------------|
| 👥 Total Students | Display of all 225 students |
| 🤖 AIML Students | Count & percentage of AIML elective |
| 📈 DS Students | Count & percentage of Data Science |
| 👨 Male Students | Total male student count |
| 👩 Female Students | Total female student count |
| 🏆 Top Section | Most populated section |

### 📈 Visual Analytics
- **🥧 Elective Pie Chart** - Global distribution of AIML vs DS
- **📊 Section Bar Chart** - Section-wise breakdown with elective preferences
- **👥 Gender Pie Chart** - Male vs Female distribution
- **📉 Gender Elective Chart** - Gender-wise elective choices

### 🧠 Master Mind Insights
AI-powered analysis panel with programmatic insights:
- 📌 Overall elective preference trends
- 📌 Section-specific analysis
- 📌 Gender distribution patterns
- 📌 Balance analysis across sections

### 📋 Student Directory
- 🔍 Search by name or enrollment number
- 🏷️ Filter by Section (CSE A, CSE B, CSE C, CST D)
- 📚 Filter by Elective (AIML, DS)
- 👤 Filter by Gender (Male, Female)
- 📄 Paginated table with 10 students per page

### 📥 Export Features
| Format | Features |
|--------|----------|
| 📄 **PDF** | Logo, filters, IP tracking, page numbers |
| 📊 **Excel** | Logo, styled headers, alternating rows |

---

## 🛠️ Tech Stack

<table>
  <tr>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=react" width="48" height="48" alt="React" />
      <br>React 19
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=vite" width="48" height="48" alt="Vite" />
      <br>Vite 7
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=tailwind" width="48" height="48" alt="Tailwind" />
      <br>Tailwind 4
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=vercel" width="48" height="48" alt="Vercel" />
      <br>Vercel
    </td>
  </tr>
</table>

**Additional Libraries:**
- 📊 **Recharts** - Data visualization
- 🎨 **Lucide React** - Beautiful icons
- 📄 **jsPDF** - PDF generation
- 📊 **ExcelJS** - Excel file creation

---

## 🚀 Quick Start

### Prerequisites
```bash
Node.js v18+ required
```

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/dtc-emerging-minors.git

# Navigate to project
cd dtc-emerging-minors

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
📦 Analysis
├── 📂 public
│   └── 🖼️ dtc-logo.png          # College logo
├── 📂 src
│   ├── 📂 components
│   │   ├── 📊 Header.jsx         # Dashboard header
│   │   ├── 📊 SummaryCards.jsx   # Summary statistics
│   │   ├── 📊 ElectivePieChart.jsx
│   │   ├── 📊 SectionBarChart.jsx
│   │   ├── 📊 GenderPieChart.jsx
│   │   ├── 📊 GenderElectiveChart.jsx
│   │   ├── 🧠 InsightsPanel.jsx  # AI insights
│   │   └── 📋 DataGrid.jsx       # Data table + Export
│   ├── 📂 data
│   │   ├── 📄 studentData.js     # 225 student records
│   │   └── 🖼️ logoData.js        # Embedded logo (base64)
│   ├── 📂 hooks
│   │   └── 🔧 useAnalytics.js    # Data processing
│   ├── 📱 App.jsx                # Main application
│   └── 🎨 index.css              # Custom styles
└── 📄 package.json
```

---

## 📊 Data Structure

```javascript
{
  id: "1",
  enrollment: "00118002723",
  name: "Student Name",
  section: "CSE A",        // CSE A | CSE B | CSE C | CST D
  elective: "AIML",        // AIML | DS
  gender: "MALE"           // MALE | FEMALE
}
```

---

## 🌐 Live Demo

<p align="center">
  <a href="https://dtc-emerging-minors.vercel.app">
    <img src="https://img.shields.io/badge/Visit_Live_Dashboard-4F46E5?style=for-the-badge&logo=vercel&logoColor=white" alt="Visit Dashboard">
  </a>
</p>

---

## 👨‍💻 Authors

<p align="center">
  Made with ❤️ by <strong>Himanshu & Ritesh</strong>
</p>

<p align="center">
  <strong>Delhi Technical Campus</strong><br>
  Greater Noida, Uttar Pradesh
</p>

---

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square" alt="PRs Welcome">
</p>
