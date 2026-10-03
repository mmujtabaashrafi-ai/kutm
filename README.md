# KUTM — KU Transformer Model

An enterprise-grade, on-premise, curriculum-grounded AI academic assistant engineered specifically for **Kishkinda University** (Department of Computer Science & Engineering). Powered by quantized local open-weight LLMs (Ollama + Qwen3:8B), PostgreSQL with `pgvector` HNSW index, hybrid BM25 + dense retrieval with Reciprocal Rank Fusion (RRF), and academic metadata access controls.

---

## Key Capabilities

- **Role-Based Architecture**: Distinct experiences for **Students** and **Faculty/Administrators**.
  - **Student View**: Curriculum-grounded AI Academic Chat, syllabus question answering, page-cited source grounding, and one-click University-Branded Study Notes & Exam Revision PDF Generation.
  - **Faculty / Admin View**: University Command Core, Academic Curriculum Registry, Subject/Branch/Section drill-down hierarchy, Class Roster inspection, and Course Material Upload with academic metadata (Subject, Branch, Semester, Section, Unit, Material Type).
- **Academic Grounding & Verification**: Answers strictly adhere to authorized university textbooks, faculty lecture notes, and question banks. Zero hallucination policy with fallback educational notices.
- **Cross-Branch Access Control**: Backend authorization rule preventing students from retrieving curriculum materials outside their registered department (e.g. CSE students cannot access EEE/ECE resources).
- **Institutional PDF Study Sheet Generation**: Generates clean, university-branded PDF study guides formatted with student name, USN, subject, unit, and curriculum-verified answers.
- **Local-First Deployment**: All LLM inference, embedding calculation, and vector queries execute locally with zero external cloud dependencies.

---

## System Architecture

| Tier | Technology | Description |
|---|---|---|
| **Frontend** | React 19 + Vite + TailwindCSS + Lucide | Clean, responsive, light-themed university academic interface |
| **Backend API** | FastAPI (Python 3.13) + Uvicorn | High-performance asynchronous REST endpoints |
| **Local LLM** | Ollama + Qwen3:8B | On-premise air-gapped language model |
| **Embeddings** | `sentence-transformers/all-MiniLM-L6-v2` | 384-dimensional dense semantic representations |
| **Database & Vector Store**| PostgreSQL 16 + `pgvector` (HNSW) | Hybrid BM25 keyword matching + vector similarity with RRF |
| **PDF Extraction & OCR** | PyPDF + pypdfium2 + RapidOCR | OCR-enabled document parsing and chunking pipeline |
| **PDF Generation** | ReportLab | Formatted study note and exam revision sheet compilation |
| **Authentication** | JWT (HS256) | Role-based authentication (Student, Teacher, Admin) |

---

## Demo Accounts

| Role | Username | Password | Profile / Access Scope |
|---|---|---|---|
| **Student** | `mujtaba` | `student123` | Mohammed Mujtaba (`KUB25CSE626`) • CSE Sem 5 Sec A |
| **Faculty** | `prof.xyz` | `teacher123` | Prof. XYZ • Dept. of Computer Science & Engineering |
| **Admin** | `admin` | `admin123` | University Academic Enclave Administrator |

---

## Quickstart & Local Development

### 1. Backend Service (FastAPI)

```bash
cd backend

# Activate virtual environment
.\.venv\Scripts\Activate.ps1

# Install requirements (if running fresh)
pip install -r requirements.txt

# Start backend server
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

The API docs will be available at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

### 2. Frontend Application (React + Vite)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) to access the portal.

---

## Institutional Credits

- **Institution**: Kishkinda University
- **Department**: Department of Computer Science & Engineering
- **Designed by**: Mohammed Mujtaba
