const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const os = require('os');

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
  ]
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
      if (!Array.isArray(db[key])) {
        db[key] = seed[key];
        changed = true;
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

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', chunk => {
      raw += chunk;
      if (raw.length > 1_000_000) {
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
