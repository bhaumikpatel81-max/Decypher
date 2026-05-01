const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const os = require('os');

// Load only API keys from .env.prod (never override PORT or other runtime settings)
(function loadEnv() {
  const envPath = path.join(__dirname, '.env.prod');
  if (!fs.existsSync(envPath)) return;
  const keysToLoad = ['OPENAI_API_KEY'];
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_]+)=(.+)$/);
    if (m && keysToLoad.includes(m[1]) && !(m[1] in process.env)) process.env[m[1]] = m[2].trim();
  }
})();

function getLocalIP() {
  for (const ifaces of Object.values(os.networkInterfaces())) {
    for (const iface of ifaces) {
      if (iface.family === 'IPv4' && !iface.internal) return iface.address;
    }
  }
  return 'localhost';
}

const port = Number(process.env.PORT || 5000);
const root = __dirname;
const staticRoot = path.join(root, 'Decypher.Web', 'wwwroot');
const dataDir = path.join(root, 'data');
const dbPath = path.join(dataDir, 'local-db.json');

const now = () => new Date().toISOString();

const seed = {
  users: [
    {
      id: 'u-super-admin',
      fullName: 'Bhaumik Patel',
      email: 'admin@decypher.app',
      password: 'Admin@2024',
      role: 'SuperAdmin',
      initials: 'BP',
      access: ['dashboard', 'vendors', 'recruiters', 'cvDatabase', 'aiTools', 'users'],
      status: 'Active'
    },
    {
      id: 'u-recruiter',
      fullName: 'Demo Recruiter',
      email: 'recruiter@decypher.app',
      password: 'Recruiter@2024',
      role: 'Recruiter',
      initials: 'DR',
      access: ['dashboard', 'vendors', 'cvDatabase', 'aiTools'],
      status: 'Active'
    },
    {
      id: 'u-guest',
      fullName: 'Guest User',
      email: 'guest@decypher.app',
      password: '',
      role: 'Viewer',
      initials: 'GU',
      access: ['dashboard', 'vendors', 'cvDatabase'],
      status: 'Active'
    }
  ],
  vendors: [
    {
      id: '2f57ab4a-1a17-44d7-9d7d-000000000001',
      name: 'TechStaff Solutions',
      contactPerson: 'Rajesh Kumar',
      email: 'rajesh@techstaff.com',
      phone: '+91 9876543210',
      category: 'General',
      totalSubmissions: 45,
      successfulPlacements: 32,
      requirementsAssigned: 4,
      assignedBy: 'Neha Iyer',
      qualityScore: 85.5,
      slaScore: 92,
      status: 'Active',
      createdAt: now(),
      updatedAt: now()
    },
    {
      id: '2f57ab4a-1a17-44d7-9d7d-000000000002',
      name: 'HireRight India',
      contactPerson: 'Priya Sharma',
      email: 'priya@hireright.in',
      phone: '+91 9876543211',
      category: 'General',
      totalSubmissions: 38,
      successfulPlacements: 25,
      requirementsAssigned: 3,
      assignedBy: 'Priya Sharma',
      qualityScore: 78,
      slaScore: 85,
      status: 'Active',
      createdAt: now(),
      updatedAt: now()
    },
    {
      id: '2f57ab4a-1a17-44d7-9d7d-000000000003',
      name: 'QuickHire Consultancy',
      contactPerson: 'Amit Patel',
      email: 'amit@quickhire.co.in',
      phone: '+91 9876543212',
      category: 'General',
      totalSubmissions: 52,
      successfulPlacements: 41,
      requirementsAssigned: 6,
      assignedBy: 'Amit Patel',
      qualityScore: 90,
      slaScore: 95,
      status: 'Active',
      createdAt: now(),
      updatedAt: now()
    }
  ],
  candidates: [
    {
      id: '3f57ab4a-1a17-44d7-9d7d-000000000001',
      vendorId: '2f57ab4a-1a17-44d7-9d7d-000000000001',
      firstName: 'Rahul',
      lastName: 'Verma',
      email: 'rahul.verma@example.com',
      phone: '+91 9876543213',
      currentRole: 'Software Engineer',
      currentCompany: 'TCS',
      yearsOfExperience: 6,
      skills: ['C#', '.NET Core', 'Azure', 'SQL Server'],
      currentSalary: 18,
      stage: 'L2',
      daysInPipeline: 15,
      dropoutRisk: 25,
      resumeScore: 87.5,
      submissionDate: new Date(Date.now() - 15 * 86400000).toISOString(),
      createdAt: now()
    },
    {
      id: '3f57ab4a-1a17-44d7-9d7d-000000000002',
      vendorId: '2f57ab4a-1a17-44d7-9d7d-000000000002',
      firstName: 'Priya',
      lastName: 'Desai',
      email: 'priya.desai@example.com',
      phone: '+91 9876543214',
      currentRole: 'Senior Software Engineer',
      currentCompany: 'Infosys',
      yearsOfExperience: 7,
      skills: ['C#', '.NET Core', 'AWS', 'PostgreSQL', 'Docker'],
      currentSalary: 20,
      stage: 'Selected',
      daysInPipeline: 10,
      dropoutRisk: 15,
      resumeScore: 92,
      submissionDate: new Date(Date.now() - 10 * 86400000).toISOString(),
      createdAt: now()
    },
    {
      id: '3f57ab4a-1a17-44d7-9d7d-000000000003',
      vendorId: '2f57ab4a-1a17-44d7-9d7d-000000000003',
      firstName: 'Ankit',
      lastName: 'Sharma',
      email: 'ankit.sharma@example.com',
      phone: '+91 9876543215',
      currentRole: 'Tech Lead',
      currentCompany: 'Wipro',
      yearsOfExperience: 8,
      skills: ['Azure', 'Microservices', 'Kubernetes', 'System Design'],
      currentSalary: 24,
      stage: 'Submitted',
      daysInPipeline: 5,
      dropoutRisk: 72,
      resumeScore: 95,
      submissionDate: new Date(Date.now() - 5 * 86400000).toISOString(),
      createdAt: now()
    }
  ],
  recruiters: [
    { id: 'r1', name: 'Priya Sharma', role: 'Senior Recruiter', submissions: 42, selections: 18, joinings: 12, selectionRatio: 43 },
    { id: 'r2', name: 'Amit Patel', role: 'Recruiter', submissions: 36, selections: 16, joinings: 9, selectionRatio: 44 },
    { id: 'r3', name: 'Neha Iyer', role: 'Team Lead', submissions: 54, selections: 25, joinings: 17, selectionRatio: 46 }
  ],
  cvs: [
    {
      id: 'cv1',
      name: 'Rahul Verma',
      email: 'rahul.verma@example.com',
      currentRole: 'Software Engineer',
      company: 'TCS',
      experience: 6,
      skills: ['C#', '.NET Core', 'Azure', 'SQL Server'],
      summary: 'Backend engineer with cloud migration, APIs, and enterprise .NET experience.',
      cvText: 'C# .NET Core Azure SQL Server microservices REST API recruitment platform',
      fileName: 'Rahul-Verma-CV.pdf',
      fileType: 'application/pdf',
      fileData: '',
      interviewedEarlier: true
    },
    {
      id: 'cv2',
      name: 'Priya Desai',
      email: 'priya.desai@example.com',
      currentRole: 'Senior Software Engineer',
      company: 'Infosys',
      experience: 7,
      skills: ['C#', '.NET Core', 'AWS', 'PostgreSQL', 'Docker'],
      summary: 'Senior engineer with AWS, containers, PostgreSQL, and distributed systems work.',
      cvText: 'C# .NET Core AWS PostgreSQL Docker distributed systems candidate matching',
      fileName: 'Priya-Desai-Resume.docx',
      fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      fileData: '',
      interviewedEarlier: true
    },
    {
      id: 'cv3',
      name: 'Ankit Sharma',
      email: 'ankit.sharma@example.com',
      currentRole: 'Tech Lead',
      company: 'Wipro',
      experience: 8,
      skills: ['Azure', 'Microservices', 'Kubernetes', 'System Design'],
      summary: 'Technical lead focused on Azure, Kubernetes, microservices, and architecture.',
      cvText: 'Azure Kubernetes microservices architecture system design team leadership',
      fileName: 'Ankit-Sharma-CV.pdf',
      fileType: 'application/pdf',
      fileData: '',
      interviewedEarlier: false
    }
  ],
  requisitions: [
    { id: 'req-001', title: 'Senior .NET Developer', department: 'Engineering', headcount: 2, budgetMin: 1800000, budgetMax: 2500000, priority: 'High', status: 'Approved', justification: 'Team expansion for new product line', createdAt: new Date(Date.now() - 10 * 86400000).toISOString() },
    { id: 'req-002', title: 'Product Manager', department: 'Product', headcount: 1, budgetMin: 2000000, budgetMax: 2800000, priority: 'Critical', status: 'Approved', justification: 'Lead Q3 roadmap delivery', createdAt: new Date(Date.now() - 7 * 86400000).toISOString() },
    { id: 'req-003', title: 'UI/UX Designer', department: 'Design', headcount: 1, budgetMin: 1200000, budgetMax: 1800000, priority: 'Medium', status: 'Pending', justification: 'Redesign candidate portal', createdAt: new Date(Date.now() - 3 * 86400000).toISOString() },
    { id: 'req-004', title: 'DevOps Engineer', department: 'Engineering', headcount: 1, budgetMin: 1600000, budgetMax: 2200000, priority: 'High', status: 'Approved', justification: 'CI/CD pipeline ownership', createdAt: new Date(Date.now() - 5 * 86400000).toISOString() }
  ],
  broadcasts: [],
  commMessages: [],
  onboarding: [],
  videoInterviews: [],
  integrations: [],
  fiscalYears: [],
  allocations: [],
  lineItems: [],
  actuals: [],
  costCategories: [
    { id: 'cc1', categoryName: 'Job Boards', categoryCode: 'JB', isActive: true, displayOrder: 1, defaultEstimatePerHire: 5000 },
    { id: 'cc2', categoryName: 'Agency Fees', categoryCode: 'AF', isActive: true, displayOrder: 2, defaultEstimatePerHire: 15000 },
    { id: 'cc3', categoryName: 'Background Checks', categoryCode: 'BC', isActive: true, displayOrder: 3, defaultEstimatePerHire: 500 },
    { id: 'cc4', categoryName: 'Onboarding', categoryCode: 'OB', isActive: true, displayOrder: 4, defaultEstimatePerHire: 2000 },
    { id: 'cc5', categoryName: 'Referral Bonus', categoryCode: 'RB', isActive: true, displayOrder: 5, defaultEstimatePerHire: 3000 }
  ],
  budgetConfig: {
    id: 'cfg-default',
    fiscalYearStartMonth: 4,
    defaultCurrency: 'INR',
    budgetApprovalRequired: false,
    costPerHireTargetAmount: 50000,
    approvalThresholdAmount: 100000,
    brandColor: '#6C3EB8'
  }
};

function ensureDb() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(seed, null, 2));
  } else {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    let changed = false;
    for (const key of Object.keys(seed)) {
      if (db[key] === undefined || db[key] === null) {
        db[key] = seed[key];
        changed = true;
      } else if (!Array.isArray(db[key]) && Array.isArray(seed[key])) {
        db[key] = seed[key];
        changed = true;
      } else if (!Array.isArray(db[key])) {
        // non-array (object) key already exists — leave user data intact
      } else {
        for (const seededItem of seed[key]) {
          const existingItem = seededItem.id ? db[key].find(item => item.id === seededItem.id) : null;
          if (existingItem) {
            for (const [field, value] of Object.entries(seededItem)) {
              if (existingItem[field] === undefined) {
                existingItem[field] = value;
                changed = true;
              }
            }
          } else if (seededItem.id) {
            db[key].push(seededItem);
            changed = true;
          }
        }
      }
    }
    if (changed) {
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    }
  }
}

function readDb() {
  ensureDb();
  return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

function writeDb(db) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

function sendJson(res, status, body) {
  const json = JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(json),
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  res.end(json);
}

function readBody(req, maxBytes = 1_000_000) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', chunk => {
      raw += chunk;
      if (raw.length > maxBytes) {
        reject(new Error('Request body too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });
  });
}

function readBodyBuffer(req, maxBytes = 50_000_000) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let total = 0;
    req.on('data', chunk => {
      total += chunk.length;
      if (total > maxBytes) { reject(new Error('Request body too large')); req.destroy(); return; }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function parseMultipartFile(buf, boundary) {
  const delim = Buffer.from('\r\n--' + boundary);
  const headerSep = Buffer.from('\r\n\r\n');
  let pos = buf.indexOf('--' + boundary);
  if (pos === -1) return null;
  pos += ('--' + boundary).length;
  while (pos < buf.length) {
    if (buf[pos] === 13) pos += 2;
    const hEnd = buf.indexOf(headerSep, pos);
    if (hEnd === -1) break;
    const header = buf.slice(pos, hEnd).toString();
    const bodyStart = hEnd + 4;
    const nextBound = buf.indexOf(delim, bodyStart);
    const bodyEnd = nextBound === -1 ? buf.length : nextBound;
    if (/name="file"/i.test(header)) return buf.slice(bodyStart, bodyEnd);
    pos = nextBound === -1 ? buf.length : nextBound + delim.length;
  }
  return null;
}

function callOpenAIVision(base64Data, mimeType, apiKey) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      model: 'gpt-4o',
      messages: [{
        role: 'user',
        content: [
          { type: 'text', text: 'Extract all the text from this resume or CV image. Return only the raw text content, preserving structure with line breaks. Do not add any commentary.' },
          { type: 'image_url', image_url: { url: `data:${mimeType};base64,${base64Data}`, detail: 'high' } }
        ]
      }],
      max_tokens: 3000
    });
    const options = {
      hostname: 'api.openai.com',
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Length': Buffer.byteLength(payload)
      }
    };
    const req = https.request(options, r => {
      let data = '';
      r.on('data', c => data += c);
      r.on('end', () => {
        try {
          const result = JSON.parse(data);
          const text = result.choices?.[0]?.message?.content;
          if (text) resolve(text);
          else reject(new Error(result.error?.message || 'No content returned from OpenAI'));
        } catch { reject(new Error('Failed to parse OpenAI response')); }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.ico': 'image/x-icon'
  }[ext] || 'application/octet-stream';
}

function serveStatic(req, res) {
  const url = new URL(req.url, `http://localhost:${port}`);
  const requestPath = decodeURIComponent(url.pathname);
  const relativePath = requestPath === '/' ? 'index.html' : requestPath.replace(/^\/+/, '');
  let filePath = path.resolve(staticRoot, relativePath);

  if (!filePath.startsWith(staticRoot)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(staticRoot, 'index.html');
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Unable to read static asset');
      return;
    }
    res.writeHead(200, {
      'Content-Type': contentType(filePath),
      'Cache-Control': filePath.endsWith('index.html') ? 'no-store' : 'public, max-age=31536000',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
    });
    res.end(content);
  });
}

async function handleApi(req, res, url) {
  const db = readDb();
  const route = url.pathname.toLowerCase();

  if (route === '/health') {
    return sendJson(res, 200, { status: 'ok', mode: 'node-single-port' });
  }

  if (route === '/health/db') {
    return sendJson(res, 200, { status: 'ok', database: 'connected', path: dbPath });
  }

  if (route === '/api/auth/login' && req.method === 'POST') {
    const body = await readBody(req);
    const user = db.users.find(u => u.email.toLowerCase() === String(body.email || '').toLowerCase() && u.password === body.password);
    if (!user) {
      return sendJson(res, 401, { error: 'Invalid email or password' });
    }
    const { password, ...safeUser } = user;
    return sendJson(res, 200, { token: `local-${user.id}`, user: safeUser });
  }

  if (route === '/api/auth/guest' && req.method === 'POST') {
    const user = db.users.find(u => u.id === 'u-guest');
    const { password, ...safeUser } = user;
    return sendJson(res, 200, { token: 'local-guest', user: safeUser });
  }

  if (route === '/api/users' && req.method === 'GET') {
    return sendJson(res, 200, db.users.map(({ password, ...user }) => user));
  }

  if (route === '/api/users' && req.method === 'POST') {
    const body = await readBody(req);
    const names = String(body.fullName || 'New User').split(' ').filter(Boolean);
    const user = {
      id: crypto.randomUUID(),
      fullName: body.fullName || 'New User',
      email: body.email || `user-${Date.now()}@decypher.app`,
      password: body.password || 'Welcome@2024',
      role: body.role || 'Recruiter',
      initials: `${names[0]?.[0] || 'U'}${names[1]?.[0] || ''}`.toUpperCase(),
      access: Array.isArray(body.access) ? body.access : ['dashboard'],
      status: 'Active'
    };
    db.users.push(user);
    writeDb(db);
    const { password, ...safeUser } = user;
    return sendJson(res, 201, safeUser);
  }

  if (route === '/api/dashboard/metrics') {
    const submitted = db.candidates.filter(c => c.stage === 'Submitted').length || db.candidates.length;
    const hired = db.candidates.filter(c => c.stage === 'Joined' || c.stage === 'Hired').length;
    const stages = ['Submitted', 'L2', 'Selected', 'Joined'];
    const maxStage = Math.max(...stages.map(stage => db.candidates.filter(c => c.stage === stage).length), 1);
    const skillCounts = {};
    for (const cv of db.cvs) {
      for (const skill of cv.skills || []) {
        skillCounts[skill] = (skillCounts[skill] || 0) + 1;
      }
    }
    return sendJson(res, 200, {
      totalCandidates: db.candidates.length,
      totalCVs: db.cvs.length,
      interviewedEarlier: db.cvs.filter(cv => cv.interviewedEarlier).length,
      totalVendors: db.vendors.length,
      totalJobs: 2,
      hiredCandidates: hired,
      selectionRate: submitted ? Number(((hired * 100) / submitted).toFixed(2)) : 0,
      highRiskCandidates: db.candidates.filter(c => c.dropoutRisk >= 70).length,
      activeVendors: db.vendors.filter(v => String(v.status).toLowerCase() === 'active').length,
      hiringFunnel: stages.map(stage => {
        const count = db.candidates.filter(c => c.stage === stage).length;
        return { stage, count, width: Math.max(35, (count / maxStage) * 100) };
      }),
      topVendors: [...db.vendors].sort((a, b) => b.qualityScore - a.qualityScore).slice(0, 5),
      topSkills: Object.entries(skillCounts)
        .map(([skill, count]) => ({ skill, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 8),
      recentActivity: [
        { action: 'Dashboard refreshed from local database', time: 'Now' },
        { action: `${db.cvs.length} CV profiles indexed`, time: 'Today' },
        { action: `${db.users.length} users configured`, time: 'Today' }
      ]
    });
  }

  if (route === '/api/vendors/performance-metrics') {
    const avgQualityScore = db.vendors.length
      ? db.vendors.reduce((sum, v) => sum + Number(v.qualityScore || 0), 0) / db.vendors.length
      : 0;
    return sendJson(res, 200, {
      avgQualityScore: Number(avgQualityScore.toFixed(2)),
      submissionsThisMonth: db.vendors.reduce((sum, v) => sum + Number(v.totalSubmissions || 0), 0),
      totalVendors: db.vendors.length
    });
  }

  if (route === '/api/vendors' && req.method === 'GET') {
    return sendJson(res, 200, db.vendors);
  }

  if (route === '/api/vendors' && req.method === 'POST') {
    const body = await readBody(req);
    const vendor = {
      id: crypto.randomUUID(),
      name: body.name || 'New Vendor',
      contactPerson: body.contactPerson || '',
      email: body.email || '',
      phone: body.phone || '',
      category: body.category || 'General',
      totalSubmissions: 0,
      successfulPlacements: 0,
      requirementsAssigned: Number(body.requirementsAssigned || 0),
      assignedBy: body.assignedBy || '',
      qualityScore: 0,
      slaScore: 0,
      status: 'Active',
      createdAt: now(),
      updatedAt: now()
    };
    db.vendors.push(vendor);
    writeDb(db);
    return sendJson(res, 201, vendor);
  }

  const vendorMatch = route.match(/^\/api\/vendors\/([^/]+)$/);
  if (vendorMatch && req.method === 'DELETE') {
    const before = db.vendors.length;
    db.vendors = db.vendors.filter(v => v.id !== vendorMatch[1]);
    writeDb(db);
    res.writeHead(before === db.vendors.length ? 404 : 204);
    res.end();
    return;
  }

  if (route === '/api/candidates' && req.method === 'GET') {
    return sendJson(res, 200, db.candidates);
  }

  if (route === '/api/candidates/duplicates' && req.method === 'GET') {
    // Group by normalized email, then by normalized name
    const norm = s => (s || '').trim().toLowerCase();
    const groups = [];
    const seen = new Set();
    const byEmail = {};
    db.candidates.forEach(c => {
      if (!c.email) return;
      const key = norm(c.email);
      (byEmail[key] = byEmail[key] || []).push(c);
    });
    Object.values(byEmail).filter(g => g.length > 1).forEach(g => {
      const sorted = [...g].sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
      sorted.forEach(c => seen.add(c.id));
      groups.push({ matchReason: 'Same email', candidates: sorted.map(c => ({ id: c.id, name: c.name || c.candidateName, email: c.email, phone: c.phone, stage: c.stage, submissionDate: c.createdAt })) });
    });
    const byName = {};
    db.candidates.filter(c => !seen.has(c.id)).forEach(c => {
      const key = norm(c.name || c.candidateName || '');
      if (key.length < 4) return;
      (byName[key] = byName[key] || []).push(c);
    });
    Object.values(byName).filter(g => g.length > 1).forEach(g => {
      const sorted = [...g].sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
      groups.push({ matchReason: 'Same name', candidates: sorted.map(c => ({ id: c.id, name: c.name || c.candidateName, email: c.email, phone: c.phone, stage: c.stage, submissionDate: c.createdAt })) });
    });
    return sendJson(res, 200, groups);
  }

  if (route === '/api/candidates/merge' && req.method === 'POST') {
    return withBody(req, body => {
      const { primaryId, duplicateIds } = body;
      db.candidates = db.candidates.filter(c => !duplicateIds.includes(c.id));
      save();
      sendJson(res, 200, { merged: true });
    });
  }

  if (route === '/api/candidates/dismiss-duplicate' && req.method === 'POST') {
    return withBody(req, () => sendJson(res, 200, { dismissed: true }));
  }

  if (route === '/api/recruiters' && req.method === 'GET') {
    return sendJson(res, 200, db.recruiters);
  }

  if (route === '/api/cv-database' && req.method === 'GET') {
    const query = String(url.searchParams.get('skills') || '').toLowerCase();
    const tokens = query.split(/[,\s]+/).filter(Boolean);
    const cvs = !tokens.length ? db.cvs : db.cvs.filter(cv => {
      const haystack = [cv.name, cv.email, cv.currentRole, cv.company, cv.summary, cv.cvText, ...(cv.skills || [])].join(' ').toLowerCase();
      return tokens.every(token => haystack.includes(token));
    });
    return sendJson(res, 200, cvs);
  }

  if (route === '/api/cv-database' && req.method === 'POST') {
    const body = await readBody(req);
    const cv = {
      id: crypto.randomUUID(),
      name: body.name || 'Unnamed Candidate',
      email: body.email || '',
      currentRole: body.currentRole || '',
      company: body.company || '',
      experience: Number(body.experience || 0),
      skills: Array.isArray(body.skills) ? body.skills : [],
      summary: body.summary || `${body.currentRole || 'Candidate'} with skills in ${(body.skills || []).join(', ')}`,
      cvText: body.cvText || '',
      fileName: body.fileName || '',
      fileType: body.fileType || '',
      fileData: body.fileData || '',
      interviewedEarlier: !!body.interviewedEarlier
    };
    db.cvs.push(cv);
    db.candidates.push({
      id: crypto.randomUUID(),
      vendorId: db.vendors[0]?.id || '',
      firstName: cv.name.split(' ')[0] || cv.name,
      lastName: cv.name.split(' ').slice(1).join(' '),
      email: cv.email,
      phone: '',
      currentRole: cv.currentRole,
      currentCompany: cv.company,
      yearsOfExperience: cv.experience,
      skills: cv.skills,
      currentSalary: 0,
      stage: 'Submitted',
      daysInPipeline: 0,
      dropoutRisk: 10,
      resumeScore: 70,
      submissionDate: now(),
      createdAt: now()
    });
    writeDb(db);
    return sendJson(res, 201, cv);
  }

  // ── AI Agent endpoints ────────────────────────────────────────────────────

  if (route === '/api/aiagents/sla-dashboard' && req.method === 'GET') {
    const db = readDb();
    const stages = ['Sourcing', 'Screening', 'Interview L1', 'Interview L2', 'Offer', 'Onboarding'];
    const statuses = ['OnTrack', 'OnTrack', 'Warning', 'OnTrack', 'Overdue', 'OnTrack'];
    const targets   = [7, 5, 7, 5, 3, 10];
    const days      = [4, 3, 11, 4, 8, 2];
    const tracks = stages.map((stage, i) => ({
      id: `sla-${i + 1}`,
      requirementId: `req-0000000${i + 1}`,
      stage,
      stageStartDate: new Date(Date.now() - days[i] * 86400000).toISOString(),
      stageEndDate: null,
      daysInStage: days[i],
      targetDays: targets[i],
      status: statuses[i],
      predictedCompletionDate: statuses[i] === 'Overdue' ? null : new Date(Date.now() + (targets[i] - days[i]) * 86400000).toISOString(),
      predictionConfidence: statuses[i] === 'Overdue' ? 0 : statuses[i] === 'Warning' ? 0.68 : 0.88,
      tenantId: 'default',
      updatedAt: now()
    }));
    return sendJson(res, 200, tracks);
  }

  if (route === '/api/aiagents/run-screening' && req.method === 'POST') {
    const body = await readBody(req);
    const jd     = String(body.jobDescription || '');
    const resume = String(body.resumeText || '');
    if (!jd || !resume) return sendJson(res, 400, { error: 'jobDescription and resumeText are required' });

    const skillBank   = ['c#', '.net', 'azure', 'aws', 'sql', 'docker', 'angular', 'react', 'kubernetes', 'python', 'java', 'typescript'];
    const jdWords     = jd.toLowerCase();
    const resumeWords = resume.toLowerCase();
    const matched  = skillBank.filter(s => jdWords.includes(s) && resumeWords.includes(s));
    const missing  = skillBank.filter(s => jdWords.includes(s) && !resumeWords.includes(s)).slice(0, 4);
    const score    = Math.min(95, 55 + matched.length * 6);
    const confidence     = score >= 80 ? 0.88 : score >= 65 ? 0.72 : 0.55;
    const strong         = matched.length >= 2;
    const recommendation = matched.length >= 3 ? 'SHORTLIST' : matched.length >= 1 ? 'REVIEW' : 'REJECT';
    const matchStr       = matched.length ? matched.slice(0, 3).map(s => s.toUpperCase()).join(', ') : 'none';

    return sendJson(res, 200, {
      requiresHumanReview: confidence < 0.6,
      humanReviewReason: confidence < 0.6 ? 'Low confidence — manual review recommended' : null,
      timestamp: new Date().toISOString(),

      matchingResult: {
        data: {
          matchPercentage: score,
          matchedSkills: matched,
          missingSkills: missing
        }
      },

      rankingResult: {
        confidence,
        data: {
          overallScore: score,
          breakdown: {
            skillsMatch:     Math.min(100, score + 6),
            experienceMatch: Math.min(100, score - 2),
            educationMatch:  Math.min(100, score - 8),
            cultureFit:      Math.min(100, score - 4),
            dropoutRisk:     strong ? 22 : 58
          }
        }
      },

      behavioralResult: {
        data: {
          behavioralScores: {
            problemSolving:   strong ? 78 : 52,
            criticalThinking: strong ? 74 : 48,
            ownership:        strong ? 82 : 58,
            leadership:       strong ? 66 : 44,
            communication:    strong ? 72 : 56,
            integrity:        strong ? 85 : 64,
            adaptability:     strong ? 76 : 50,
            collaboration:    strong ? 79 : 60
          },
          evidence: {
            problemSolving:   strong ? 'CV demonstrates systematic debugging and root-cause analysis with measurable production impact.' : 'Some problem-solving indicators present; limited quantified outcomes.',
            criticalThinking: strong ? 'Technical decisions reflect data-driven reasoning and architectural trade-off analysis across multiple projects.' : 'Basic technical decision-making present; deeper analytical evidence is limited.',
            ownership:        strong ? 'Led end-to-end delivery of multiple projects with clear accountability and outcome statements.' : 'Contributes to team deliverables; clear individual ownership examples are limited.',
            leadership:       strong ? 'Mentored junior engineers and drove sprint planning and cross-team alignment activities.' : 'Some team collaboration noted; formal leadership or mentoring evidence is minimal.',
            communication:    strong ? 'Presented technical solutions to senior stakeholders; authored architecture documentation and runbooks.' : 'Communication indicators present in team-collaboration contexts.',
            integrity:        strong ? 'Consistent career progression with strong tenure; no red flags or unexplained gaps detected.' : 'Career stability is present; explicit trust-signal evidence is limited.',
            adaptability:     strong ? 'Successfully transitioned across 2+ technology stacks within the same employment period.' : 'Some technology diversity present; cross-stack adaptability evidence is moderate.',
            collaboration:    strong ? 'Active cross-functional collaboration with product, design, QA, and data teams throughout CV.' : 'Works within team settings; demonstrated collaborative leadership is moderate.'
          },
          summary: strong
            ? `This candidate demonstrates a strong behavioral profile with particularly high scores in Ownership (82) and Integrity (85). The CV language reflects a results-driven professional who takes accountability for outcomes and works effectively across teams. Leadership potential is evidenced by mentoring and planning activities, consistent with senior contributor or lead-level placement.`
            : `The candidate shows moderate behavioral signals with adequate indicators across problem-solving and communication. There is limited direct evidence of strong ownership, leadership, or cross-functional collaboration. A structured behavioral interview is recommended to validate competencies before advancing in the pipeline.`,
          confidence: strong ? 0.84 : 0.63
        }
      },

      explanationResult: {
        data: {
          overallAssessment: strong
            ? `The candidate presents a compelling profile with demonstrated expertise in ${matchStr}. The overall match score of ${score}% reflects strong alignment across core technical requirements, supported by consistent career progression and cross-functional delivery experience. The profile indicates readiness for the responsibilities outlined in the role.`
            : `The candidate profile shows limited direct alignment with the stated role requirements. Matched skills include ${matchStr}, yielding a match score of ${score}%. Significant skill gaps and limited evidence of role-specific experience suggest this candidate would require substantial onboarding investment.`,

          keyStrengths: strong ? [
            `Demonstrated hands-on proficiency in ${matched.slice(0, 2).join(' and ').toUpperCase()} — directly required by the role`,
            'Consistent career progression indicating reliability, growth mindset, and stability',
            'Strong technical background with evidence of scalable solution design and delivery',
            matched.length >= 3 ? `Additional expertise in ${matched[2].toUpperCase()} adds breadth and versatility to the technical profile` : 'Cross-functional collaboration and team leadership signals evident throughout CV',
            'High ownership and integrity behavioral scores support senior-level placement'
          ] : [
            matched.length ? `Partial exposure to ${matched[0].toUpperCase()} noted in CV` : 'General software engineering background present',
            'Career stability suggests reliability and low flight risk'
          ],

          skillGaps: missing.length > 0 ? [
            ...missing.map(s => `No evidence of ${s.toUpperCase()} experience — listed as a core requirement in the JD`),
            'Depth of expertise in matched skills requires technical interview validation'
          ] : ['No critical skill gaps detected — strong technical match across all required competency areas'],

          experienceFit: strong
            ? `The candidate's experience level and project scope align well with the role expectations. Tenure and delivery breadth suggest readiness for the responsibilities and seniority described in the job description.`
            : `The candidate's experience shows some relevant background but gaps in scope and depth relative to the role's expectations. Seniority alignment and project complexity require validation in a screening call.`,

          educationFit: 'Educational background meets the standard requirements for this role. No concerns identified in the academic profile.',

          behavioralSummary: strong
            ? `Behavioral analysis indicates high Ownership (82) and Integrity (85) scores. The CV language reflects a results-oriented professional with strong accountability, cross-functional collaboration, and emerging leadership signals — consistent with high-performing senior contributors.`
            : `Behavioral indicators are moderate. Ownership, leadership, and communication signals are present but lack the depth expected for senior roles. A structured behavioral interview is recommended before advancing.`,

          riskFactors: strong ? [
            'Dropout risk is LOW (22%) — strong career stability and role-engagement indicators present',
            missing.length ? `Minor skill gaps in ${missing.slice(0, 2).map(s => s.toUpperCase()).join(' and ')} should be confirmed during the technical interview round` : 'No material risk factors identified — proceed to technical interview'
          ] : [
            `Skill gaps in ${missing.slice(0, 2).map(s => s.toUpperCase()).join(', ') || 'key required areas'} may require extended ramp-up and structured onboarding`,
            `Dropout risk is ELEVATED (58%) — limited engagement signals; recommend early culture-fit discussion`,
            'AI confidence is below threshold — human recruiter review is required before shortlisting this profile'
          ],

          recommendation,

          recommendationRationale: recommendation === 'SHORTLIST'
            ? `Strong technical and behavioral alignment makes this a high-priority shortlist candidate. Recommend scheduling a technical interview to validate depth in ${matched[0] ? matched[0].toUpperCase() : 'core skills'} and confirm leadership readiness.`
            : recommendation === 'REVIEW'
            ? `Partial alignment warrants a 30-minute screening call to clarify skill depth in ${missing.length ? missing[0].toUpperCase() : 'key areas'} and assess cultural fit before advancing to the technical round.`
            : `Insufficient alignment with role requirements at this time. Consider re-evaluating if JD requirements are adjusted, or revisit this profile after the candidate upskills in ${missing.slice(0, 2).map(s => s.toUpperCase()).join(' and ') || 'the required areas'}.`
        },
        modelVersion: 'local-mock-v1',
        promptVersion: 'v2.1'
      },

      biasDetectionResult: {
        data: {
          overallBiasFreeScore: 0.96,
          genderBias:   { detected: false, details: 'No gender-specific language detected' },
          locationBias: { detected: false, details: 'Location-neutral evaluation applied' },
          collegeBias:  { detected: false, details: 'No institution preference detected' },
          ageBias:      { detected: false, details: 'No age indicators found in evaluation' }
        }
      }
    });
  }

  if (route === '/api/aiagents/generate-jd' && req.method === 'POST') {
    const body = await readBody(req);
    if (!body.jobTitle) return sendJson(res, 400, { error: 'jobTitle is required' });
    const skills = Array.isArray(body.requiredSkills) ? body.requiredSkills : [];
    const min = body.minYearsExperience ?? 2;
    const max = body.maxYearsExperience ?? 5;

    return sendJson(res, 200, {
      data: {
        title: body.jobTitle,
        overview: `We are seeking a talented ${body.jobTitle} to join our ${body.department || 'Engineering'} team. You will build and maintain scalable solutions that directly impact business outcomes.`,
        responsibilities: [
          `Design and develop robust ${skills[0] || 'software'} solutions`,
          'Collaborate with cross-functional teams on product requirements',
          'Write clean, well-tested, and well-documented code',
          'Participate in code reviews and uphold engineering standards',
          'Troubleshoot and resolve production issues quickly'
        ],
        requirements: [
          `${min}–${max} years of professional development experience`,
          ...skills.map(s => `Hands-on proficiency in ${s}`),
          'Strong analytical and problem-solving mindset',
          'Experience with Agile/Scrum delivery'
        ],
        niceToHave: [
          'Experience with cloud platforms (AWS / Azure / GCP)',
          'Familiarity with CI/CD and DevOps practices',
          'Open-source contributions'
        ],
        benefits: [
          'Competitive salary and equity',
          'Flexible / remote-first environment',
          'Health, dental, and vision insurance',
          'Annual learning & development budget'
        ],
        employmentType: body.employmentType || 'Full-time',
        experienceRange: `${min}–${max} years`
      },
      modelVersion: 'local-mock-v1',
      timestamp: new Date().toISOString()
    });
  }

  // ─────────────────────────────────────────────────────────────────────────

  if (route === '/api/ai/analyze' && req.method === 'POST') {
    const body = await readBody(req);
    const text = [body.text, body.jdText, body.resumeText, body.jdFile?.fileName, body.resumeFile?.fileName].filter(Boolean).join(' ');
    const words = text.toLowerCase().match(/[a-z+#.]+/g) || [];
    const skillBank = ['c#', '.net', 'azure', 'aws', 'postgresql', 'sql', 'docker', 'kubernetes', 'angular', 'react', 'microservices'];
    const matchedSkills = skillBank.filter(skill => words.join(' ').includes(skill));
    return sendJson(res, 200, {
      type: body.type,
      score: Math.min(100, 45 + matchedSkills.length * 8),
      matchedSkills,
      filesReceived: [body.jdFile?.fileName, body.resumeFile?.fileName].filter(Boolean),
      recommendations: matchedSkills.length
        ? ['Shortlist matching CVs from CV Database', 'Validate depth of top skills in interview']
        : ['Add more technical detail to improve matching', 'Include required skills explicitly']
    });
  }

  if (route === '/api/resume-parser/extract-text' && req.method === 'POST') {
    const body = await readBody(req, 25_000_000); // 25 MB – base64 inflates ~33%
    const { fileData, fileName, mimeType } = body;
    if (!fileData || !fileName) return sendJson(res, 400, { error: 'fileData and fileName are required' });

    const ext = path.extname(fileName).toLowerCase();
    const buf = Buffer.from(fileData, 'base64');

    try {
      let text = '';
      if (ext === '.pdf') {
        const pdfParse = require('pdf-parse');
        const data = await pdfParse(buf);
        text = data.text;
      } else if (ext === '.docx' || ext === '.doc') {
        const mammoth = require('mammoth');
        const result = await mammoth.extractRawText({ buffer: buf });
        text = result.value;
      } else if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) return sendJson(res, 500, { error: 'OpenAI API key not configured for image extraction' });
        text = await callOpenAIVision(fileData, mimeType || 'image/jpeg', apiKey);
      } else {
        return sendJson(res, 400, { error: 'Unsupported file type. Allowed: PDF, DOCX, DOC, JPG, PNG' });
      }
      return sendJson(res, 200, { text: text.trim() });
    } catch (err) {
      return sendJson(res, 500, { error: `Text extraction failed: ${err.message}` });
    }
  }

  // ── Budget Module ─────────────────────────────────────────────────────────

  if (route.startsWith('/api/budget')) {
    if (!db.fiscalYears) db.fiscalYears = [];
    if (!db.allocations) db.allocations = [];
    if (!db.lineItems) db.lineItems = [];
    if (!db.actuals) db.actuals = [];
    if (!db.costCategories) db.costCategories = [];
    if (!db.budgetConfig) db.budgetConfig = { id: 'cfg-default', fiscalYearStartMonth: 4, defaultCurrency: 'INR', budgetApprovalRequired: false, costPerHireTargetAmount: 50000, approvalThresholdAmount: 100000, brandColor: '#6C3EB8' };

    // ── Fiscal Years ─────────────────────────────────────────────────────────
    if (route === '/api/budget/fiscal-years' && req.method === 'GET') {
      const fys = db.fiscalYears.map(fy => {
        const allocs = db.allocations.filter(a => a.fiscalYearId === fy.id);
        const acts = db.actuals.filter(a => a.fiscalYearId === fy.id);
        const totalAllocated = allocs.reduce((s, a) => s + Number(a.allottedAmount || 0), 0);
        const totalSpent = acts.reduce((s, a) => s + Number(a.amount || 0), 0);
        return { ...fy, totalAllocated, totalSpent, remaining: Number(fy.totalBudgetAmount || 0) - totalSpent };
      });
      return sendJson(res, 200, fys);
    }

    if (route === '/api/budget/fiscal-years' && req.method === 'POST') {
      const body = await readBody(req);
      const fy = { id: crypto.randomUUID(), fiscalYearLabel: body.fiscalYearLabel || 'FY-New', startDate: body.startDate || '', endDate: body.endDate || '', totalBudgetAmount: Number(body.totalBudgetAmount || 0), currency: body.currency || 'INR', status: body.status || 'Active', notes: body.notes || '', createdAt: now(), updatedAt: now() };
      db.fiscalYears.push(fy);
      writeDb(db);
      return sendJson(res, 201, { ...fy, totalAllocated: 0, totalSpent: 0, remaining: fy.totalBudgetAmount });
    }

    const fyMatch = route.match(/^\/api\/budget\/fiscal-years\/([^/]+)$/);
    if (fyMatch) {
      const fyId = fyMatch[1];
      if (req.method === 'PUT') {
        const body = await readBody(req);
        const idx = db.fiscalYears.findIndex(f => f.id === fyId);
        if (idx === -1) return sendJson(res, 404, { error: 'Fiscal year not found' });
        db.fiscalYears[idx] = { ...db.fiscalYears[idx], ...body, id: fyId, updatedAt: now() };
        writeDb(db);
        return sendJson(res, 200, db.fiscalYears[idx]);
      }
      if (req.method === 'DELETE') {
        db.fiscalYears = db.fiscalYears.filter(f => f.id !== fyId);
        writeDb(db);
        res.writeHead(204); res.end(); return;
      }
    }

    if (route.match(/^\/api\/budget\/fiscal-years\/([^/]+)\/lock$/) && req.method === 'POST') {
      const fyId = route.match(/^\/api\/budget\/fiscal-years\/([^/]+)\/lock$/)[1];
      const idx = db.fiscalYears.findIndex(f => f.id === fyId);
      if (idx === -1) return sendJson(res, 404, { error: 'Fiscal year not found' });
      db.fiscalYears[idx].status = 'Locked'; db.fiscalYears[idx].updatedAt = now();
      writeDb(db);
      return sendJson(res, 200, db.fiscalYears[idx]);
    }

    if (route.match(/^\/api\/budget\/fiscal-years\/([^/]+)\/clone$/) && req.method === 'POST') {
      const fyId = route.match(/^\/api\/budget\/fiscal-years\/([^/]+)\/clone$/)[1];
      const orig = db.fiscalYears.find(f => f.id === fyId);
      if (!orig) return sendJson(res, 404, { error: 'Fiscal year not found' });
      const clone = { ...orig, id: crypto.randomUUID(), fiscalYearLabel: orig.fiscalYearLabel + ' (Copy)', status: 'Draft', createdAt: now(), updatedAt: now() };
      db.fiscalYears.push(clone);
      writeDb(db);
      return sendJson(res, 201, clone);
    }

    // ── Allocations ──────────────────────────────────────────────────────────
    if (route === '/api/budget/allocations' && req.method === 'GET') {
      const { fiscalYearId, dept } = Object.fromEntries(url.searchParams);
      let allocs = db.allocations;
      if (fiscalYearId) allocs = allocs.filter(a => a.fiscalYearId === fiscalYearId);
      if (dept) allocs = allocs.filter(a => (a.departmentName || '').toLowerCase().includes(dept.toLowerCase()));
      const enriched = allocs.map(a => {
        const acts = db.actuals.filter(x => x.allocationId === a.id);
        const actualSpend = acts.reduce((s, x) => s + Number(x.amount || 0), 0);
        const variance = Number(a.allottedAmount || 0) - actualSpend;
        const utilizationPct = a.allottedAmount ? Math.round((actualSpend / a.allottedAmount) * 100) : 0;
        return { ...a, actualSpend, variance, utilizationPct };
      });
      return sendJson(res, 200, enriched);
    }

    if (route === '/api/budget/allocations' && req.method === 'POST') {
      const body = await readBody(req);
      const alloc = { id: crypto.randomUUID(), fiscalYearId: body.fiscalYearId || '', departmentName: body.departmentName || '', departmentCode: body.departmentCode || '', headcountPlanned: Number(body.headcountPlanned || 0), allottedAmount: Number(body.allottedAmount || 0), category: body.category || 'General', quarter: body.quarter || 'Q1', notes: body.notes || '', createdAt: now(), updatedAt: now() };
      db.allocations.push(alloc);
      writeDb(db);
      return sendJson(res, 201, { ...alloc, actualSpend: 0, variance: alloc.allottedAmount, utilizationPct: 0 });
    }

    const allocMatch = route.match(/^\/api\/budget\/allocations\/([^/]+)$/);
    if (allocMatch) {
      const allocId = allocMatch[1];
      if (req.method === 'PUT') {
        const body = await readBody(req);
        const idx = db.allocations.findIndex(a => a.id === allocId);
        if (idx === -1) return sendJson(res, 404, { error: 'Allocation not found' });
        db.allocations[idx] = { ...db.allocations[idx], ...body, id: allocId, updatedAt: now() };
        writeDb(db);
        return sendJson(res, 200, db.allocations[idx]);
      }
      if (req.method === 'DELETE') {
        db.allocations = db.allocations.filter(a => a.id !== allocId);
        writeDb(db);
        res.writeHead(204); res.end(); return;
      }
    }

    // ── Line Items ───────────────────────────────────────────────────────────
    if (route === '/api/budget/line-items' && req.method === 'GET') {
      const { allocationId } = Object.fromEntries(url.searchParams);
      let items = db.lineItems;
      if (allocationId) items = items.filter(i => i.allocationId === allocationId);
      return sendJson(res, 200, items);
    }

    if (route === '/api/budget/line-items' && req.method === 'POST') {
      const body = await readBody(req);
      const item = { id: crypto.randomUUID(), allocationId: body.allocationId || '', lineItemType: body.lineItemType || '', plannedAmount: Number(body.plannedAmount || 0), actualAmount: Number(body.actualAmount || 0) || undefined, notes: body.notes || '', createdAt: now(), updatedAt: now() };
      db.lineItems.push(item);
      writeDb(db);
      return sendJson(res, 201, item);
    }

    const liMatch = route.match(/^\/api\/budget\/line-items\/([^/]+)$/);
    if (liMatch) {
      const liId = liMatch[1];
      if (req.method === 'PUT') {
        const body = await readBody(req);
        const idx = db.lineItems.findIndex(i => i.id === liId);
        if (idx === -1) return sendJson(res, 404, { error: 'Line item not found' });
        db.lineItems[idx] = { ...db.lineItems[idx], ...body, id: liId, updatedAt: now() };
        writeDb(db);
        return sendJson(res, 200, db.lineItems[idx]);
      }
      if (req.method === 'DELETE') {
        db.lineItems = db.lineItems.filter(i => i.id !== liId);
        writeDb(db);
        res.writeHead(204); res.end(); return;
      }
    }

    // ── Actuals ──────────────────────────────────────────────────────────────
    if (route === '/api/budget/actuals' && req.method === 'GET') {
      const { fiscalYearId, from, to, dept } = Object.fromEntries(url.searchParams);
      let acts = db.actuals;
      if (fiscalYearId) acts = acts.filter(a => a.fiscalYearId === fiscalYearId);
      if (from) acts = acts.filter(a => a.spendDate >= from);
      if (to) acts = acts.filter(a => a.spendDate <= to);
      if (dept) acts = acts.filter(a => (a.departmentName || '').toLowerCase().includes(dept.toLowerCase()));
      return sendJson(res, 200, acts);
    }

    if (route === '/api/budget/actuals' && req.method === 'POST') {
      const body = await readBody(req);
      const act = { id: crypto.randomUUID(), fiscalYearId: body.fiscalYearId || '', allocationId: body.allocationId || undefined, spendCategory: body.spendCategory || '', amount: Number(body.amount || 0), spendDate: body.spendDate || now().slice(0, 10), invoiceReference: body.invoiceReference || '', vendorId: body.vendorId || undefined, vendorName: body.vendorName || '', departmentName: body.departmentName || '', isApproved: Boolean(body.isApproved), notes: body.notes || '', createdAt: now() };
      db.actuals.push(act);
      writeDb(db);
      return sendJson(res, 201, act);
    }

    const actMatch = route.match(/^\/api\/budget\/actuals\/([^/]+)$/);
    if (actMatch) {
      const actId = actMatch[1];
      if (req.method === 'PUT') {
        const body = await readBody(req);
        const idx = db.actuals.findIndex(a => a.id === actId);
        if (idx === -1) return sendJson(res, 404, { error: 'Actual not found' });
        db.actuals[idx] = { ...db.actuals[idx], ...body, id: actId };
        writeDb(db);
        return sendJson(res, 200, db.actuals[idx]);
      }
      if (req.method === 'DELETE') {
        db.actuals = db.actuals.filter(a => a.id !== actId);
        writeDb(db);
        res.writeHead(204); res.end(); return;
      }
    }

    // ── Analytics ────────────────────────────────────────────────────────────
    if (route === '/api/budget/dashboard' && req.method === 'GET') {
      const fyId = url.searchParams.get('fiscalYearId') || '';
      const fy = db.fiscalYears.find(f => f.id === fyId);
      const allocs = db.allocations.filter(a => a.fiscalYearId === fyId);
      const acts = db.actuals.filter(a => a.fiscalYearId === fyId);
      const totalBudget = Number(fy?.totalBudgetAmount || 0);
      const totalSpent = acts.reduce((s, a) => s + Number(a.amount || 0), 0);
      const totalCommitted = allocs.reduce((s, a) => s + Number(a.allottedAmount || 0), 0);
      const remaining = totalBudget - totalSpent;
      const headcountPlanned = allocs.reduce((s, a) => s + Number(a.headcountPlanned || 0), 0);
      const deptMap = {};
      for (const a of allocs) {
        if (!deptMap[a.departmentName]) deptMap[a.departmentName] = { department: a.departmentName, planned: 0, actual: 0 };
        deptMap[a.departmentName].planned += Number(a.allottedAmount || 0);
      }
      for (const a of acts) {
        if (a.departmentName && deptMap[a.departmentName]) deptMap[a.departmentName].actual += Number(a.amount || 0);
      }
      const catMap = {};
      for (const a of acts) {
        const cat = a.spendCategory || 'Other';
        catMap[cat] = (catMap[cat] || 0) + Number(a.amount || 0);
      }
      const budgetByCategory = Object.entries(catMap).map(([category, amount]) => ({ category, amount, pct: totalSpent ? Math.round((amount / totalSpent) * 100) : 0 }));
      const qMap = { Q1: { q: 'Q1', planned: 0, actual: 0, hc: 0 }, Q2: { q: 'Q2', planned: 0, actual: 0, hc: 0 }, Q3: { q: 'Q3', planned: 0, actual: 0, hc: 0 }, Q4: { q: 'Q4', planned: 0, actual: 0, hc: 0 } };
      for (const a of allocs) { if (qMap[a.quarter]) { qMap[a.quarter].planned += Number(a.allottedAmount || 0); qMap[a.quarter].hc += Number(a.headcountPlanned || 0); } }
      const vendMap = {};
      for (const a of acts) {
        if (a.vendorName) {
          if (!vendMap[a.vendorName]) vendMap[a.vendorName] = { vendorId: a.vendorId, vendorName: a.vendorName, totalSpend: 0, transactionCount: 0 };
          vendMap[a.vendorName].totalSpend += Number(a.amount || 0);
          vendMap[a.vendorName].transactionCount++;
        }
      }
      return sendJson(res, 200, {
        totalBudget, totalSpent, totalCommitted, remaining,
        utilizationPct: totalBudget ? Math.round((totalSpent / totalBudget) * 100) : 0,
        headcountPlanned, headcountFilled: 0, headcountInProgress: 0,
        costPerHireActual: 0, costPerHireTarget: Number(db.budgetConfig?.costPerHireTargetAmount || 0),
        budgetByDepartment: Object.values(deptMap),
        budgetByCategory,
        budgetByQuarter: Object.values(qMap).map(q => ({ quarter: q.q, planned: q.planned, actual: q.actual, headcountPlanned: q.hc })),
        topVendorsBySpend: Object.values(vendMap).sort((a, b) => b.totalSpend - a.totalSpend).slice(0, 5),
        monthlyTrend: []
      });
    }

    if (route === '/api/budget/forecast' && req.method === 'GET') {
      const fyId = url.searchParams.get('fiscalYearId') || '';
      const fy = db.fiscalYears.find(f => f.id === fyId);
      const allocs = db.allocations.filter(a => a.fiscalYearId === fyId);
      const acts = db.actuals.filter(a => a.fiscalYearId === fyId);
      const deptMap = {};
      for (const a of allocs) {
        if (!deptMap[a.departmentName]) deptMap[a.departmentName] = { department: a.departmentName, departmentCode: a.departmentCode || '', q1Planned: 0, q2Planned: 0, q3Planned: 0, q4Planned: 0, totalPlanned: 0, q1Actual: 0, q2Actual: 0, q3Actual: 0, q4Actual: 0, totalActual: 0, headcountPlanned: 0 };
        const q = a.quarter && ['Q1','Q2','Q3','Q4'].includes(a.quarter) ? a.quarter.toLowerCase() : 'q1';
        deptMap[a.departmentName][q + 'Planned'] += Number(a.allottedAmount || 0);
        deptMap[a.departmentName].totalPlanned += Number(a.allottedAmount || 0);
        deptMap[a.departmentName].headcountPlanned += Number(a.headcountPlanned || 0);
      }
      for (const a of acts) {
        if (a.departmentName && deptMap[a.departmentName]) {
          const month = new Date(a.spendDate).getMonth();
          const q = month < 3 ? 'q1' : month < 6 ? 'q2' : month < 9 ? 'q3' : 'q4';
          deptMap[a.departmentName][q + 'Actual'] += Number(a.amount || 0);
          deptMap[a.departmentName].totalActual += Number(a.amount || 0);
        }
      }
      const rows = Object.values(deptMap);
      const totals = rows.reduce((t, r) => ({ q1Planned: t.q1Planned + r.q1Planned, q2Planned: t.q2Planned + r.q2Planned, q3Planned: t.q3Planned + r.q3Planned, q4Planned: t.q4Planned + r.q4Planned, total: t.total + r.totalPlanned }), { q1Planned: 0, q2Planned: 0, q3Planned: 0, q4Planned: 0, total: 0 });
      return sendJson(res, 200, { fiscalYearId: fyId, fiscalYearLabel: fy?.fiscalYearLabel || '', rows, totals });
    }

    if (route === '/api/budget/cost-per-hire' && req.method === 'GET') {
      const fyId = url.searchParams.get('fiscalYearId') || '';
      const acts = db.actuals.filter(a => a.fiscalYearId === fyId);
      const totalSpend = acts.reduce((s, a) => s + Number(a.amount || 0), 0);
      return sendJson(res, 200, { overallCostPerHire: 0, targetCostPerHire: Number(db.budgetConfig?.costPerHireTargetAmount || 0), totalHires: 0, totalSpend, byDepartment: [], byCategory: [] });
    }

    if (route === '/api/budget/vendor-spend' && req.method === 'GET') {
      const fyId = url.searchParams.get('fiscalYearId') || '';
      const acts = db.actuals.filter(a => a.fiscalYearId === fyId && a.vendorName);
      const map = {};
      for (const a of acts) { if (!map[a.vendorName]) map[a.vendorName] = { vendorId: a.vendorId, vendorName: a.vendorName, totalSpend: 0, transactionCount: 0 }; map[a.vendorName].totalSpend += Number(a.amount || 0); map[a.vendorName].transactionCount++; }
      return sendJson(res, 200, Object.values(map).sort((a, b) => b.totalSpend - a.totalSpend));
    }

    if (route === '/api/budget/department-breakdown' && req.method === 'GET') {
      const fyId = url.searchParams.get('fiscalYearId') || '';
      const allocs = db.allocations.filter(a => a.fiscalYearId === fyId);
      const acts = db.actuals.filter(a => a.fiscalYearId === fyId);
      const map = {};
      for (const a of allocs) { if (!map[a.departmentName]) map[a.departmentName] = { department: a.departmentName, departmentCode: a.departmentCode || '', plannedBudget: 0, actualSpend: 0, headcountPlanned: 0, headcountFilled: 0 }; map[a.departmentName].plannedBudget += Number(a.allottedAmount || 0); map[a.departmentName].headcountPlanned += Number(a.headcountPlanned || 0); }
      for (const a of acts) { if (a.departmentName && map[a.departmentName]) map[a.departmentName].actualSpend += Number(a.amount || 0); }
      const rows = Object.values(map).map(r => ({ ...r, variance: r.plannedBudget - r.actualSpend, utilizationPct: r.plannedBudget ? Math.round((r.actualSpend / r.plannedBudget) * 100) : 0 }));
      return sendJson(res, 200, rows);
    }

    // ── Config ───────────────────────────────────────────────────────────────
    if (route === '/api/budget/config' && req.method === 'GET') {
      return sendJson(res, 200, db.budgetConfig);
    }

    if (route === '/api/budget/config' && req.method === 'PUT') {
      const body = await readBody(req);
      db.budgetConfig = { ...db.budgetConfig, ...body, id: 'cfg-default' };
      writeDb(db);
      return sendJson(res, 200, db.budgetConfig);
    }

    if (route === '/api/budget/cost-categories' && req.method === 'GET') {
      return sendJson(res, 200, db.costCategories.sort((a, b) => a.displayOrder - b.displayOrder));
    }

    if (route === '/api/budget/cost-categories' && req.method === 'POST') {
      const body = await readBody(req);
      const cat = { id: crypto.randomUUID(), categoryName: body.categoryName || '', categoryCode: body.categoryCode || '', isActive: body.isActive !== false, displayOrder: Number(body.displayOrder || db.costCategories.length + 1), defaultEstimatePerHire: Number(body.defaultEstimatePerHire || 0) || undefined };
      db.costCategories.push(cat);
      writeDb(db);
      return sendJson(res, 201, cat);
    }

    const catMatch = route.match(/^\/api\/budget\/cost-categories\/([^/]+)$/);
    if (catMatch) {
      const catId = catMatch[1];
      if (req.method === 'PUT') {
        const body = await readBody(req);
        const idx = db.costCategories.findIndex(c => c.id === catId);
        if (idx === -1) return sendJson(res, 404, { error: 'Cost category not found' });
        db.costCategories[idx] = { ...db.costCategories[idx], ...body, id: catId };
        writeDb(db);
        return sendJson(res, 200, db.costCategories[idx]);
      }
    }

    // ── Import ───────────────────────────────────────────────────────────────
    if (route === '/api/budget/import-template' && req.method === 'GET') {
      const XLSX = require('xlsx');
      const wb = XLSX.utils.book_new();
      const instrData = [['Sheet', 'Column', 'Required', 'Description'], ['FiscalYear', 'FiscalYearLabel', 'Yes', 'e.g. FY2025'], ['FiscalYear', 'StartDate', 'Yes', 'YYYY-MM-DD'], ['FiscalYear', 'EndDate', 'Yes', 'YYYY-MM-DD'], ['FiscalYear', 'TotalBudgetAmount', 'Yes', 'Number'], ['FiscalYear', 'Currency', 'No', 'Default INR'], ['FiscalYear', 'Status', 'No', 'Active / Draft'], ['Allocations', 'FiscalYearLabel', 'Yes', 'Must match FiscalYear sheet'], ['Allocations', 'DepartmentName', 'Yes', 'e.g. Engineering'], ['Allocations', 'AllottedAmount', 'Yes', 'Number'], ['Allocations', 'HeadcountPlanned', 'No', 'Number'], ['Allocations', 'Quarter', 'No', 'Q1/Q2/Q3/Q4'], ['Allocations', 'Category', 'No', 'e.g. Permanent'], ['ActualSpend', 'FiscalYearLabel', 'Yes', 'Must match FiscalYear'], ['ActualSpend', 'SpendCategory', 'Yes', 'e.g. Agency Fees'], ['ActualSpend', 'Amount', 'Yes', 'Number'], ['ActualSpend', 'SpendDate', 'Yes', 'YYYY-MM-DD'], ['ActualSpend', 'DepartmentName', 'No', ''], ['ActualSpend', 'VendorName', 'No', ''], ['ActualSpend', 'InvoiceReference', 'No', '']];
      XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(instrData), 'Instructions');
      XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([['FiscalYearLabel', 'StartDate', 'EndDate', 'TotalBudgetAmount', 'Currency', 'Status', 'Notes'], ['FY2025', '2025-04-01', '2026-03-31', 5000000, 'INR', 'Active', '']]), 'FiscalYear');
      XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([['FiscalYearLabel', 'DepartmentName', 'DepartmentCode', 'HeadcountPlanned', 'AllottedAmount', 'Category', 'Quarter', 'Notes'], ['FY2025', 'Engineering', 'ENG', 10, 2000000, 'Permanent', 'Q1', '']]), 'Allocations');
      XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([['FiscalYearLabel', 'SpendCategory', 'Amount', 'SpendDate', 'DepartmentName', 'VendorName', 'InvoiceReference', 'Notes'], ['FY2025', 'Agency Fees', 50000, '2025-05-15', 'Engineering', 'TechStaff Solutions', 'INV-001', '']]), 'ActualSpend');
      const xlsBuf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
      res.writeHead(200, { 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'Content-Disposition': 'attachment; filename="Budget_Import_Template.xlsx"', 'Content-Length': xlsBuf.length });
      res.end(xlsBuf);
      return;
    }

    if (route === '/api/budget/import-excel' && req.method === 'POST') {
      const ctHeader = req.headers['content-type'] || '';
      const boundaryMatch = ctHeader.match(/boundary=([^\s;]+)/);
      if (!boundaryMatch) return sendJson(res, 400, { error: 'Expected multipart/form-data' });
      const rawBuf = await readBodyBuffer(req, 50_000_000);
      const fileBuf = parseMultipartFile(rawBuf, boundaryMatch[1]);
      if (!fileBuf || fileBuf.length === 0) return sendJson(res, 400, { error: 'No file found in request' });
      try {
        const XLSX = require('xlsx');
        const wb = XLSX.read(fileBuf, { type: 'buffer', cellDates: true });
        const result = { fiscalYears: { imported: 0, updated: 0, errors: [] }, allocations: { imported: 0, updated: 0, errors: [] }, lineItems: { imported: 0, updated: 0, errors: [] }, actuals: { imported: 0, updated: 0, errors: [] }, totalErrors: 0 };

        const fySheetName = wb.SheetNames.find(n => n.toLowerCase().includes('fiscal'));
        if (fySheetName) {
          const rows = XLSX.utils.sheet_to_json(wb.Sheets[fySheetName]);
          for (const row of rows) {
            const label = String(row['FiscalYearLabel'] || row['Fiscal Year Label'] || row['Label'] || '').trim();
            if (!label) continue;
            const existing = db.fiscalYears.find(f => f.fiscalYearLabel === label);
            const startDate = row['StartDate'] || row['Start Date'] || '';
            const endDate = row['EndDate'] || row['End Date'] || '';
            const amount = Number(row['TotalBudgetAmount'] || row['Total Budget Amount'] || row['BudgetAmount'] || 0);
            if (existing) {
              Object.assign(existing, { startDate: String(startDate), endDate: String(endDate), totalBudgetAmount: amount || existing.totalBudgetAmount, currency: String(row['Currency'] || existing.currency), status: String(row['Status'] || existing.status), notes: String(row['Notes'] || existing.notes || ''), updatedAt: now() });
              result.fiscalYears.updated++;
            } else {
              db.fiscalYears.push({ id: crypto.randomUUID(), fiscalYearLabel: label, startDate: String(startDate), endDate: String(endDate), totalBudgetAmount: amount, currency: String(row['Currency'] || 'INR'), status: String(row['Status'] || 'Active'), notes: String(row['Notes'] || ''), createdAt: now(), updatedAt: now() });
              result.fiscalYears.imported++;
            }
          }
        }

        const allocSheetName = wb.SheetNames.find(n => n.toLowerCase().includes('alloc'));
        if (allocSheetName) {
          const rows = XLSX.utils.sheet_to_json(wb.Sheets[allocSheetName]);
          for (const row of rows) {
            const fyLabel = String(row['FiscalYearLabel'] || row['Fiscal Year Label'] || '').trim();
            const dept = String(row['DepartmentName'] || row['Department Name'] || row['Department'] || '').trim();
            if (!dept) continue;
            const fy = db.fiscalYears.find(f => f.fiscalYearLabel === fyLabel);
            const fyId = fy?.id || '';
            const existing = fyId ? db.allocations.find(a => a.fiscalYearId === fyId && a.departmentName === dept && (a.quarter || 'Q1') === (String(row['Quarter'] || row['quarter'] || 'Q1'))) : null;
            const allottedAmount = Number(row['AllottedAmount'] || row['Allotted Amount'] || row['Amount'] || 0);
            if (existing) {
              Object.assign(existing, { allottedAmount, headcountPlanned: Number(row['HeadcountPlanned'] || row['Headcount'] || existing.headcountPlanned || 0), category: String(row['Category'] || existing.category || 'General'), quarter: String(row['Quarter'] || existing.quarter || 'Q1'), notes: String(row['Notes'] || existing.notes || ''), updatedAt: now() });
              result.allocations.updated++;
            } else {
              db.allocations.push({ id: crypto.randomUUID(), fiscalYearId: fyId, departmentName: dept, departmentCode: String(row['DepartmentCode'] || row['Department Code'] || ''), headcountPlanned: Number(row['HeadcountPlanned'] || row['Headcount'] || 0), allottedAmount, category: String(row['Category'] || 'General'), quarter: String(row['Quarter'] || 'Q1'), notes: String(row['Notes'] || ''), createdAt: now(), updatedAt: now() });
              result.allocations.imported++;
            }
          }
        }

        const actSheetName = wb.SheetNames.find(n => n.toLowerCase().includes('actual'));
        if (actSheetName) {
          const rows = XLSX.utils.sheet_to_json(wb.Sheets[actSheetName]);
          for (const row of rows) {
            const fyLabel = String(row['FiscalYearLabel'] || row['Fiscal Year Label'] || '').trim();
            const amount = Number(row['Amount'] || 0);
            const spendDate = row['SpendDate'] || row['Spend Date'] || row['Date'] || '';
            if (!amount && !spendDate) continue;
            const fy = db.fiscalYears.find(f => f.fiscalYearLabel === fyLabel);
            const dept = String(row['DepartmentName'] || row['Department Name'] || row['Department'] || '');
            const alloc = fy ? db.allocations.find(a => a.fiscalYearId === fy.id && a.departmentName === dept) : null;
            db.actuals.push({ id: crypto.randomUUID(), fiscalYearId: fy?.id || '', allocationId: alloc?.id || undefined, spendCategory: String(row['SpendCategory'] || row['Spend Category'] || row['Category'] || ''), amount, spendDate: String(spendDate).slice(0, 10), invoiceReference: String(row['InvoiceReference'] || row['Invoice Reference'] || row['Invoice'] || ''), vendorName: String(row['VendorName'] || row['Vendor Name'] || row['Vendor'] || ''), departmentName: dept, isApproved: false, notes: String(row['Notes'] || ''), createdAt: now() });
            result.actuals.imported++;
          }
        }

        writeDb(db);
        result.totalErrors = result.fiscalYears.errors.length + result.allocations.errors.length + result.actuals.errors.length;
        return sendJson(res, 200, result);
      } catch (err) {
        return sendJson(res, 500, { error: `Import failed: ${err.message}` });
      }
    }

    // CSV import — parses and saves allocations or actuals based on detected headers
    if (route === '/api/budget/import-csv' && req.method === 'POST') {
      const ctHeader = req.headers['content-type'] || '';
      const boundaryMatch = ctHeader.match(/boundary=([^\s;]+)/);
      let csvText = '';
      if (boundaryMatch) {
        const rawBuf = await readBodyBuffer(req, 10_000_000);
        const fileBuf = parseMultipartFile(rawBuf, boundaryMatch[1]);
        csvText = fileBuf ? fileBuf.toString('utf8') : '';
      } else {
        const body = await readBodyBuffer(req, 10_000_000);
        csvText = body.toString('utf8');
      }
      if (!csvText.trim()) return sendJson(res, 400, { error: 'No CSV data found in request' });
      const lines = csvText.split(/\r?\n/).filter(l => l.trim());
      if (lines.length < 2) return sendJson(res, 400, { error: 'CSV must have a header row and at least one data row' });
      const parseCSVLine = line => {
        const result = []; let cur = ''; let inQ = false;
        for (let i = 0; i < line.length; i++) {
          const c = line[i];
          if (c === '"') { inQ = !inQ; } else if (c === ',' && !inQ) { result.push(cur.trim()); cur = ''; } else { cur += c; }
        }
        result.push(cur.trim());
        return result;
      };
      const headers = parseCSVLine(lines[0]).map(h => h.replace(/^"|"$/g, ''));
      const rows = lines.slice(1).map(l => Object.fromEntries(headers.map((h, i) => [h, (parseCSVLine(l)[i] || '').replace(/^"|"$/g, '')])));

      const result = { imported: 0, updated: 0, errors: [] };
      const isActuals = headers.some(h => /amount|spend|invoice/i.test(h)) && !headers.some(h => /allott|headcount/i.test(h));

      if (isActuals) {
        for (const row of rows) {
          const fyLabel = String(row['FiscalYearLabel'] || row['Fiscal Year Label'] || '').trim();
          const amount = Number(row['Amount'] || 0);
          const spendDate = String(row['SpendDate'] || row['Spend Date'] || row['Date'] || '').slice(0, 10);
          if (!amount && !spendDate) { result.errors.push('Skipped row: missing Amount and SpendDate'); continue; }
          const fy = db.fiscalYears.find(f => f.fiscalYearLabel === fyLabel);
          const dept = String(row['DepartmentName'] || row['Department Name'] || row['Department'] || '');
          const alloc = fy ? db.allocations.find(a => a.fiscalYearId === fy.id && a.departmentName === dept) : null;
          db.actuals.push({ id: crypto.randomUUID(), fiscalYearId: fy?.id || '', allocationId: alloc?.id || undefined, spendCategory: String(row['SpendCategory'] || row['Spend Category'] || row['Category'] || ''), amount, spendDate, invoiceReference: String(row['InvoiceReference'] || row['Invoice Reference'] || row['Invoice'] || ''), vendorName: String(row['VendorName'] || row['Vendor Name'] || row['Vendor'] || ''), departmentName: dept, isApproved: false, notes: String(row['Notes'] || ''), createdAt: now() });
          result.imported++;
        }
      } else {
        for (const row of rows) {
          const fyLabel = String(row['FiscalYearLabel'] || row['Fiscal Year Label'] || '').trim();
          const dept = String(row['DepartmentName'] || row['Department Name'] || row['Department'] || '').trim();
          if (!dept) { result.errors.push('Skipped row: missing DepartmentName'); continue; }
          const fy = db.fiscalYears.find(f => f.fiscalYearLabel === fyLabel);
          const fyId = fy?.id || '';
          const quarter = String(row['Quarter'] || 'Q1');
          const existing = fyId ? db.allocations.find(a => a.fiscalYearId === fyId && a.departmentName === dept && (a.quarter || 'Q1') === quarter) : null;
          const allottedAmount = Number(row['AllottedAmount'] || row['Allotted Amount'] || row['Amount'] || 0);
          if (existing) {
            Object.assign(existing, { allottedAmount, headcountPlanned: Number(row['HeadcountPlanned'] || row['Headcount'] || existing.headcountPlanned || 0), category: String(row['Category'] || existing.category || 'General'), quarter, notes: String(row['Notes'] || existing.notes || ''), updatedAt: now() });
            result.updated++;
          } else {
            db.allocations.push({ id: crypto.randomUUID(), fiscalYearId: fyId, departmentName: dept, departmentCode: String(row['DepartmentCode'] || row['Department Code'] || ''), headcountPlanned: Number(row['HeadcountPlanned'] || row['Headcount'] || 0), allottedAmount, category: String(row['Category'] || 'General'), quarter, notes: String(row['Notes'] || ''), createdAt: now(), updatedAt: now() });
            result.imported++;
          }
        }
      }
      writeDb(db);
      result.totalErrors = result.errors.length;
      return sendJson(res, 200, { type: isActuals ? 'actuals' : 'allocations', ...result });
    }

    // CSV export — generates real data from DB as downloadable CSV
    if (route.startsWith('/api/budget/export-csv') && req.method === 'GET') {
      const type = url.searchParams.get('type') || 'allocations';
      const fyId = url.searchParams.get('fiscalYearId') || '';
      let csvLines = [];
      if (type === 'actuals') {
        csvLines.push('FiscalYearLabel,DepartmentName,SpendCategory,Amount,SpendDate,InvoiceReference,VendorName,Notes');
        const items = fyId ? db.actuals.filter(a => a.fiscalYearId === fyId) : db.actuals;
        for (const a of items) {
          const fy = db.fiscalYears.find(f => f.id === a.fiscalYearId);
          const q = v => `"${String(v || '').replace(/"/g, '""')}"`;
          csvLines.push([q(fy?.fiscalYearLabel || ''), q(a.departmentName), q(a.spendCategory), a.amount, q(a.spendDate), q(a.invoiceReference), q(a.vendorName), q(a.notes)].join(','));
        }
      } else {
        csvLines.push('FiscalYearLabel,DepartmentName,DepartmentCode,AllottedAmount,HeadcountPlanned,Category,Quarter,Notes');
        const items = fyId ? db.allocations.filter(a => a.fiscalYearId === fyId) : db.allocations;
        for (const a of items) {
          const fy = db.fiscalYears.find(f => f.id === a.fiscalYearId);
          const q = v => `"${String(v || '').replace(/"/g, '""')}"`;
          csvLines.push([q(fy?.fiscalYearLabel || ''), q(a.departmentName), q(a.departmentCode), a.allottedAmount, a.headcountPlanned, q(a.category), q(a.quarter), q(a.notes)].join(','));
        }
      }
      const csvBuf = Buffer.from(csvLines.join('\r\n'), 'utf8');
      const fname = `Budget_${type}_${new Date().toISOString().slice(0,10)}.csv`;
      res.writeHead(200, { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="${fname}"`, 'Content-Length': csvBuf.length });
      res.end(csvBuf);
      return;
    }

    // Export stubs (return empty xlsx)
    if (route.startsWith('/api/budget/export/') && req.method === 'GET') {
      const XLSX = require('xlsx');
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([['No data']]), 'Sheet1');
      const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
      const isPpt = route.includes('/ppt');
      res.writeHead(200, { 'Content-Type': isPpt ? 'application/vnd.openxmlformats-officedocument.presentationml.presentation' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'Content-Disposition': `attachment; filename="BudgetReport.${isPpt ? 'pptx' : 'xlsx'}"`, 'Content-Length': buf.length });
      res.end(buf);
      return;
    }

    return sendJson(res, 404, { error: 'Budget API route not found', path: url.pathname });
  }

  // ─── Requisitions ─────────────────────────────────────────────────────────
  if (route === '/api/requisitions' && req.method === 'GET') {
    const db = readDb();
    const status = url.searchParams.get('status');
    const items = status ? (db.requisitions || []).filter(r => r.status === status) : (db.requisitions || []);
    return sendJson(res, 200, items);
  }

  if (route === '/api/requisitions' && req.method === 'POST') {
    const db = readDb();
    const body = await readBody(req);
    const item = {
      id: crypto.randomUUID(),
      title: body.title || 'Untitled',
      department: body.department || 'General',
      headcount: Number(body.headcount || 1),
      budgetMin: body.budgetMin || null,
      budgetMax: body.budgetMax || null,
      priority: body.priority || 'Medium',
      status: 'Pending',
      justification: body.justification || '',
      createdAt: now()
    };
    db.requisitions = db.requisitions || [];
    db.requisitions.push(item);
    writeDb(db);
    return sendJson(res, 200, item);
  }

  const reqApproveMatch = route.match(/^\/api\/requisitions\/([^/]+)\/approve$/);
  if (reqApproveMatch && req.method === 'PUT') {
    const db = readDb();
    const r = (db.requisitions || []).find(x => x.id === reqApproveMatch[1]);
    if (!r) return sendJson(res, 404, { error: 'Not found' });
    r.status = 'Approved';
    writeDb(db);
    return sendJson(res, 200, r);
  }

  const reqRejectMatch = route.match(/^\/api\/requisitions\/([^/]+)\/reject$/);
  if (reqRejectMatch && req.method === 'PUT') {
    const db = readDb();
    const body = await readBody(req);
    const r = (db.requisitions || []).find(x => x.id === reqRejectMatch[1]);
    if (!r) return sendJson(res, 404, { error: 'Not found' });
    r.status = 'Rejected';
    r.rejectionReason = body.reason || '';
    writeDb(db);
    return sendJson(res, 200, r);
  }

  // ─── Onboarding ───────────────────────────────────────────────────────────
  const OB_ITEMS = [
    { category: 'ITSetup',         title: 'Laptop & Equipment Provisioned',  requiresSignature: false },
    { category: 'ITSetup',         title: 'Email & System Access Created',   requiresSignature: false },
    { category: 'Documents',       title: 'Offer Letter Collected',          requiresSignature: false },
    { category: 'Documents',       title: 'ID & Address Proof Verified',     requiresSignature: false },
    { category: 'Documents',       title: 'Bank Details Submitted',          requiresSignature: false },
    { category: 'Orientation',     title: 'Induction Session Scheduled',     requiresSignature: false },
    { category: 'Orientation',     title: 'Team Introduction Completed',     requiresSignature: false },
    { category: 'BackgroundCheck', title: 'Employment History Verified',     requiresSignature: false },
    { category: 'BackgroundCheck', title: 'Education Credentials Verified',  requiresSignature: false },
    { category: 'ESignature',      title: 'Employment Agreement Signed',     requiresSignature: true  },
    { category: 'ESignature',      title: 'NDA / Confidentiality Agreement', requiresSignature: true  },
  ];

  if (route === '/api/onboarding' && req.method === 'GET') {
    const db = readDb();
    return sendJson(res, 200, db.onboarding || []);
  }

  if (route === '/api/onboarding' && req.method === 'POST') {
    const db = readDb();
    const body = await readBody(req);
    db.onboarding = db.onboarding || [];
    const existing = db.onboarding.find(o => o.candidateId === body.candidateId);
    if (existing) return sendJson(res, 200, existing);
    const record = {
      id: crypto.randomUUID(),
      candidateId: body.candidateId || '',
      candidateName: body.candidateName || body.candidateId || '',
      jobTitle: body.jobTitle || '',
      offerId: body.offerId || '',
      overallStatus: 'Pending',
      expectedStartDate: body.expectedStartDate || null,
      createdAt: now(),
      items: OB_ITEMS.map(t => ({
        id: crypto.randomUUID(), category: t.category, title: t.title,
        requiresSignature: t.requiresSignature, status: 'Pending',
        signed: false, notes: null, completedAt: null
      }))
    };
    db.onboarding.push(record);
    writeDb(db);
    return sendJson(res, 200, record);
  }

  const obCandidateMatch = route.match(/^\/api\/onboarding\/candidate\/([^/]+)$/);
  if (obCandidateMatch && req.method === 'GET') {
    const db = readDb();
    const r = (db.onboarding || []).find(o => o.candidateId === obCandidateMatch[1]);
    return r ? sendJson(res, 200, r) : sendJson(res, 404, { error: 'Not found' });
  }

  const obItemMatch = route.match(/^\/api\/onboarding\/([^/]+)\/item$/);
  if (obItemMatch && req.method === 'PATCH') {
    const db = readDb();
    const body = await readBody(req);
    const itemId = obItemMatch[1];
    let updated = null;
    for (const rec of (db.onboarding || [])) {
      const item = (rec.items || []).find(i => i.id === itemId);
      if (item) {
        if (body.status != null) item.status = body.status;
        if (body.notes  != null) item.notes  = body.notes;
        if (body.signed != null) item.signed = body.signed;
        if (item.status === 'Complete') item.completedAt = now();
        const all = rec.items || [];
        rec.overallStatus = all.every(i => i.status === 'Complete') ? 'Complete'
          : all.some(i => i.status === 'InProgress' || i.status === 'Complete') ? 'InProgress' : 'Pending';
        updated = item;
        break;
      }
    }
    writeDb(db);
    return updated ? sendJson(res, 200, updated) : sendJson(res, 404, { error: 'Item not found' });
  }

  // ─── Notifications / Communication Center ─────────────────────────────────
  if (route === '/api/notifications/history' && req.method === 'GET') {
    const db = readDb();
    const items = (db.commMessages || []).slice().reverse().slice(0, 100);
    return sendJson(res, 200, items);
  }

  if (route === '/api/notifications/email' && req.method === 'POST') {
    const db = readDb();
    const body = await readBody(req);
    const ids = Array.isArray(body.candidateIds) ? body.candidateIds : [];
    db.commMessages = db.commMessages || [];
    for (const id of ids) {
      const c = (db.candidates || []).find(x => x.id === id);
      db.commMessages.push({
        id: crypto.randomUUID(),
        channel: 'Email',
        candidateId: id,
        candidateName: c ? `${c.firstName} ${c.lastName}` : id,
        recipientAddress: c ? c.email : '',
        subject: body.subject || '',
        body: body.body || '',
        status: 'Sent',
        sentAt: now()
      });
    }
    writeDb(db);
    return sendJson(res, 200, { sent: ids.length });
  }

  if (route === '/api/notifications/sms' && req.method === 'POST') {
    const db = readDb();
    const body = await readBody(req);
    const ids = Array.isArray(body.candidateIds) ? body.candidateIds : [];
    db.commMessages = db.commMessages || [];
    for (const id of ids) {
      const c = (db.candidates || []).find(x => x.id === id);
      db.commMessages.push({
        id: crypto.randomUUID(),
        channel: 'SMS',
        candidateId: id,
        candidateName: c ? `${c.firstName} ${c.lastName}` : id,
        recipientAddress: c ? c.phone : '',
        subject: '',
        body: body.message || '',
        status: 'Sent',
        sentAt: now()
      });
    }
    writeDb(db);
    return sendJson(res, 200, { sent: ids.length });
  }

  if (route === '/api/notifications/whatsapp' && req.method === 'POST') {
    const db = readDb();
    const body = await readBody(req);
    const ids = Array.isArray(body.candidateIds) ? body.candidateIds : [];
    db.commMessages = db.commMessages || [];
    for (const id of ids) {
      const c = (db.candidates || []).find(x => x.id === id);
      db.commMessages.push({
        id: crypto.randomUUID(),
        channel: 'WhatsApp',
        candidateId: id,
        candidateName: c ? `${c.firstName} ${c.lastName}` : id,
        recipientAddress: c ? c.phone : '',
        subject: body.templateId || '',
        body: JSON.stringify(body.variables || {}),
        status: 'Sent',
        sentAt: now()
      });
    }
    writeDb(db);
    return sendJson(res, 200, { sent: ids.length });
  }

  // ─── Job Broadcasting ──────────────────────────────────────────────────────
  const broadcastMatch = route.match(/^\/api\/requisitions\/([^/]+)\/broadcast$/);
  if (broadcastMatch && req.method === 'POST') {
    const db = readDb();
    const body = await readBody(req);
    const channels = Array.isArray(body.channels) ? body.channels : [];
    const record = { id: crypto.randomUUID(), requisitionId: broadcastMatch[1], channels, broadcastAt: now() };
    db.broadcasts = db.broadcasts || [];
    db.broadcasts.push(record);
    writeDb(db);
    return sendJson(res, 200, { success: true, broadcastedChannels: channels, broadcastAt: record.broadcastAt });
  }

  const broadcastStatusMatch = route.match(/^\/api\/requisitions\/([^/]+)\/broadcast-status$/);
  if (broadcastStatusMatch && req.method === 'GET') {
    const db = readDb();
    const reqId = broadcastStatusMatch[1];
    const history = (db.broadcasts || []).filter(b => b.requisitionId === reqId);
    const channelMap = {};
    for (const b of history) {
      for (const ch of (b.channels || [])) {
        channelMap[ch] = { channelId: ch, lastPosted: b.broadcastAt, status: 'Posted' };
      }
    }
    return sendJson(res, 200, { channels: Object.values(channelMap), history: history.slice().reverse() });
  }

  // ── Integrations Hub ─────────────────────────────────────────────────────
  if (route === '/api/integrations' && req.method === 'GET') {
    const db = readDb();
    return sendJson(res, 200, db.integrations || []);
  }

  const intgMatch = route.match(/^\/api\/integrations\/([^/]+)$/);
  if (intgMatch && req.method === 'POST') {
    return withBody(req, body => {
      const db = readDb();
      db.integrations = db.integrations || [];
      const idx = db.integrations.findIndex(i => i.id === intgMatch[1]);
      const record = { id: intgMatch[1], connected: !!body.connected, lastSync: body.connected ? now() : null };
      if (idx >= 0) db.integrations[idx] = { ...db.integrations[idx], ...record };
      else db.integrations.push(record);
      writeDb(db);
      sendJson(res, 200, record);
    });
  }

  // ── Video Interviews ─────────────────────────────────────────────────────
  if (route === '/api/interviews/video' && req.method === 'GET') {
    const db = readDb();
    return sendJson(res, 200, (db.videoInterviews || []).map(v => ({
      ...v, questionCount: (v.questions || []).length,
      responses: (v.responses || []).length
    })));
  }

  if (route === '/api/interviews/video-link' && req.method === 'POST') {
    return withBody(req, body => {
      const db = readDb();
      db.videoInterviews = db.videoInterviews || [];
      const token = Math.random().toString(36).slice(2, 14);
      const inv = {
        id: crypto.randomUUID(),
        candidateId: body.candidateId || '',
        candidateName: body.candidateName || '',
        jobTitle: body.jobTitle || '',
        questions: body.questions || [],
        deadline: body.deadline || null,
        link: `https://interviews.decypher.app/v/${token}`,
        status: 'Sent',
        createdAt: now(),
        responses: []
      };
      db.videoInterviews.push(inv);
      writeDb(db);
      sendJson(res, 200, { id: inv.id, link: inv.link, status: inv.status });
    });
  }

  const videoResponseMatch = route.match(/^\/api\/interviews\/video-responses\/([^/]+)$/);
  if (videoResponseMatch && req.method === 'GET') {
    const db = readDb();
    const inv = (db.videoInterviews || []).find(v => v.id === videoResponseMatch[1]);
    if (!inv) return sendJson(res, 404, { error: 'Not found' });
    // Seed mock responses for demo
    const mockResponses = (inv.questions || []).slice(0, Math.max(1, Math.floor((inv.questions || []).length / 2))).map((_, qi) => ({
      id: crypto.randomUUID(), questionIndex: qi,
      transcript: ['Strong technical background demonstrated with concrete examples.', 'Candidate showed enthusiasm and clear communication skills.', 'Relevant experience aligned with role requirements.'][qi % 3],
      sentiment: ['Confident', 'Enthusiastic', 'Clear'][qi % 3],
      aiScore: 72 + qi * 5,
      duration: `0:${30 + qi * 7}`,
      recordedAt: now()
    }));
    const enriched = { ...inv, responses: inv.responses.length ? inv.responses : mockResponses };
    if (!inv.responses.length && mockResponses.length) {
      inv.responses = mockResponses;
      inv.status = mockResponses.length >= (inv.questions || []).length ? 'Completed' : 'Partial';
      writeDb(db);
    }
    return sendJson(res, 200, enriched);
  }

  return sendJson(res, 404, { error: 'API route not found', path: url.pathname });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  try {
    if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/health')) {
      await handleApi(req, res, url);
      return;
    }
    serveStatic(req, res);
  } catch (error) {
    sendJson(res, 500, { error: error.message || 'Unexpected server error' });
  }
});

ensureDb();
server.listen(port, '0.0.0.0', () => {
  const localIP = getLocalIP();
  console.log('');
  console.log('  Decypher is running:');
  console.log(`    Local:   http://localhost:${port}`);
  console.log(`    Network: http://${localIP}:${port}  (open on mobile / other devices)`);
  console.log(`    DB:      ${dbPath}`);
  console.log('');
});
