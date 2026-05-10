import { Component, OnInit } from '@angular/core';
import { AgenticAIService } from '../services/agentic-ai.service';

@Component({ selector: 'app-ai-features',
  template: `
    <div class="ai-hub-container page-enter">
      <div class="ai-hub-header">
        <div>
          <h1 class="text-page-title">🤖 AI Features Hub</h1>
          <p class="text-body text-secondary">Powered by Agentic AI - Make recruitment 10x faster</p>
        </div>
        <span class="chip chip-brand">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right: 4px;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
          Agentic AI Enabled
        </span>
      </div>

      <!-- AI Features Grid -->
      <div class="ai-features-grid">
        <!-- Feature 1: Auto JD Matching -->
        <div class="ai-feature-card" (click)="activeFeature = 'auto-match'">
          <div class="feature-icon gradient-violet">
            <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <h3 class="feature-title">Auto JD to Candidate Matching</h3>
          <p class="feature-description">Paste job description → AI finds best candidates instantly with match scores</p>
          <div class="feature-stats">
            <div class="stat">
              <span class="stat-value">1,247</span>
              <span class="stat-label">candidates analyzed</span>
            </div>
            <div class="stat">
              <span class="stat-value">~3s</span>
              <span class="stat-label">avg match time</span>
            </div>
          </div>
          <button class="btn btn-primary w-full">Try Now →</button>
        </div>

        <!-- Feature 2: Resume vs JD Score -->
        <div class="ai-feature-card" (click)="activeFeature = 'resume-score'">
          <div class="feature-icon gradient-cyan">
            <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h3 class="feature-title">Resume vs JD Score</h3>
          <p class="feature-description">Get detailed match analysis with skill mapping, gaps, and recommendations</p>
          <div class="feature-stats">
            <div class="stat">
              <span class="stat-value">89%</span>
              <span class="stat-label">avg accuracy</span>
            </div>
            <div class="stat">
              <span class="stat-value">15+</span>
              <span class="stat-label">factors analyzed</span>
            </div>
          </div>
          <button class="btn btn-primary w-full">Analyze Resume →</button>
        </div>

        <!-- Feature 3: AI Interview Questions -->
        <div class="ai-feature-card" (click)="activeFeature = 'interview-questions'">
          <div class="feature-icon gradient-magenta">
            <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="feature-title">AI Interview Questions Generator</h3>
          <p class="feature-description">Generate personalized interview questions based on candidate profile</p>
          <div class="feature-stats">
            <div class="stat">
              <span class="stat-value">15</span>
              <span class="stat-label">questions generated</span>
            </div>
            <div class="stat">
              <span class="stat-value">4</span>
              <span class="stat-label">categories</span>
            </div>
          </div>
          <button class="btn btn-primary w-full">Generate Questions →</button>
        </div>

        <!-- Feature 4: Candidate Chatbot -->
        <div class="ai-feature-card" (click)="activeFeature = 'chatbot'">
          <div class="feature-icon gradient-amber">
            <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
          </div>
          <h3 class="feature-title">Candidate Screening Chatbot</h3>
          <p class="feature-description">Auto-screen candidates via WhatsApp/Web chat - 24x7 intelligent screening</p>
          <div class="feature-stats">
            <div class="stat">
              <span class="stat-value">156</span>
              <span class="stat-label">candidates screened</span>
            </div>
            <div class="stat">
              <span class="stat-value">24x7</span>
              <span class="stat-label">availability</span>
            </div>
          </div>
          <button class="btn btn-primary w-full">Launch Chatbot →</button>
        </div>
      </div>

      <!-- Active Feature Detail View -->
      <div class="ai-feature-detail" *ngIf="activeFeature">
        <!-- Auto Match Detail -->
        <div class="card" *ngIf="activeFeature === 'auto-match'">
          <div class="card-header">
            <h3 class="card-title">🤖 Auto JD to Candidate Matching</h3>
            <button class="btn btn-ghost btn-sm" (click)="activeFeature = null">Close</button>
          </div>

          <div class="feature-detail-body">
            <div class="input-section">
              <label class="form-label">Paste Job Description</label>
              <textarea 
                class="input textarea" 
                rows="8" 
                [(ngModel)]="jobDescription"
                placeholder="Paste the complete job description here..."
              ></textarea>
              <button 
                class="btn btn-primary" 
                (click)="findMatches()" 
                [disabled]="!jobDescription || matching"
              >
                {{ matching ? 'Finding matches...' : '🔍 Find Best Matches' }}
              </button>
            </div>

            <div class="results-section" *ngIf="matchResults.length > 0">
              <h4 class="section-title">Top {{ matchResults.length }} Matches</h4>
              <div class="matches-list">
                <div class="match-card" *ngFor="let match of matchResults">
                  <div class="match-header">
                    <div class="flex items-center gap-3">
                      <div class="avatar-md">{{ match.candidateName.charAt(0) }}</div>
                      <div>
                        <div class="match-name">{{ match.candidateName }}</div>
                        <div class="match-meta">{{ match.experience }} yrs • {{ match.location }}</div>
                      </div>
                    </div>
                    <div class="match-score" [class.high]="match.matchScore >= 80">
                      {{ match.matchScore }}%
                    </div>
                  </div>

                  <div class="match-skills">
                    <div class="skill-section">
                      <span class="skill-label">✅ Matched Skills:</span>
                      <div class="skills-list">
                        <span class="chip chip-success" *ngFor="let skill of match.matchedSkills">{{ skill }}</span>
                      </div>
                    </div>
                    <div class="skill-section" *ngIf="match.missingSkills.length > 0">
                      <span class="skill-label">❌ Missing Skills:</span>
                      <div class="skills-list">
                        <span class="chip chip-neutral" *ngFor="let skill of match.missingSkills">{{ skill }}</span>
                      </div>
                    </div>
                  </div>

                  <div class="match-actions">
                    <button class="btn btn-secondary btn-sm">View Profile</button>
                    <button class="btn btn-primary btn-sm">Schedule Interview</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Resume Score Detail -->
        <div class="card" *ngIf="activeFeature === 'resume-score'">
          <div class="card-header">
            <h3 class="card-title">📊 Resume vs JD Analysis</h3>
            <button class="btn btn-ghost btn-sm" (click)="activeFeature = null">Close</button>
          </div>

          <div class="feature-detail-body">
            <div class="analysis-inputs">
              <div class="input-col">
                <label class="form-label">Job Description</label>
                <textarea 
                  class="input textarea" 
                  rows="10" 
                  [(ngModel)]="analysisJD"
                  placeholder="Paste job description..."
                ></textarea>
              </div>
              <div class="input-col">
                <label class="form-label">Resume / CV</label>
                <textarea 
                  class="input textarea" 
                  rows="10" 
                  [(ngModel)]="analysisResume"
                  placeholder="Paste resume text..."
                ></textarea>
              </div>
            </div>
            <button 
              class="btn btn-primary" 
              (click)="analyzeMatch()"
              [disabled]="!analysisJD || !analysisResume || analyzing"
            >
              {{ analyzing ? 'Analyzing...' : '🔬 Analyze Match' }}
            </button>

            <div class="analysis-results" *ngIf="analysisResult">
              <div class="overall-score-card">
                <div class="score-circle">
                  <svg viewBox="0 0 100 100" width="200" height="200">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#eef0f4" stroke-width="8"/>
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="none" 
                      stroke="#6b4df0" 
                      stroke-width="8"
                      stroke-dasharray="{{ analysisResult.overallScore * 2.83 }} 283"
                      transform="rotate(-90 50 50)"
                      stroke-linecap="round"
                    />
                    <text x="50" y="55" text-anchor="middle" class="score-big">{{ analysisResult.overallScore }}%</text>
                  </svg>
                </div>
                <div class="score-label">
                  <div class="recommendation">{{ analysisResult.recommendation }}</div>
                  <div class="recommendation-subtitle">Overall Match Score</div>
                </div>
              </div>

              <div class="analysis-sections">
                <div class="analysis-section">
                  <h4>Strengths</h4>
                  <ul>
                    <li *ngFor="let strength of analysisResult.strengths">✅ {{ strength }}</li>
                  </ul>
                </div>
                <div class="analysis-section">
                  <h4>Concerns</h4>
                  <ul>
                    <li *ngFor="let concern of analysisResult.concerns">⚠️ {{ concern }}</li>
                  </ul>
                </div>
                <div class="analysis-section">
                  <h4>Interview Topics</h4>
                  <ul>
                    <li *ngFor="let topic of analysisResult.interviewTopics">💡 {{ topic }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Interview Questions Detail -->
        <div class="card" *ngIf="activeFeature === 'interview-questions'">
          <div class="card-header">
            <h3 class="card-title">💬 AI Interview Questions Generator</h3>
            <button class="btn btn-ghost btn-sm" (click)="activeFeature = null">Close</button>
          </div>

          <div class="feature-detail-body">
            <div class="questions-input">
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">Candidate Name</label>
                  <input type="text" class="input" [(ngModel)]="questionGenRequest.candidateName" />
                </div>
                <div class="form-group">
                  <label class="form-label">Job Title</label>
                  <input type="text" class="input" [(ngModel)]="questionGenRequest.jobTitle" />
                </div>
                <div class="form-group">
                  <label class="form-label">Experience (years)</label>
                  <input type="number" class="input" [(ngModel)]="questionGenRequest.experience" />
                </div>
                <div class="form-group full-width">
                  <label class="form-label">Skills (comma separated)</label>
                  <input type="text" class="input" [(ngModel)]="questionGenRequest.skills" placeholder="C#, .NET, Azure, SQL" />
                </div>
              </div>
              <button 
                class="btn btn-primary" 
                (click)="generateQuestions()"
                [disabled]="generatingQuestions"
              >
                {{ generatingQuestions ? 'Generating...' : '✨ Generate Interview Questions' }}
              </button>
            </div>

            <div class="questions-results" *ngIf="generatedQuestions">
              <div class="questions-category" *ngFor="let category of questionCategories">
                <h4 class="category-title">{{ category.title }}</h4>
                <div class="questions-list">
                  <div class="question-card" *ngFor="let q of category.questions; let i = index">
                    <div class="question-number">Q{{ i + 1 }}</div>
                    <div class="question-content">
                      <div class="question-text">{{ q.questionText }}</div>
                      <div class="question-meta">
                        <span class="chip" [ngClass]="getDifficultyChip(q.difficulty)">{{ q.difficulty }}</span>
                      </div>
                      <div class="question-expected">
                        <strong>Expected Answer:</strong> {{ q.expectedAnswer }}
                      </div>
                      <div class="question-followup" *ngIf="q.followUp">
                        <strong>Follow-up:</strong> {{ q.followUp }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chatbot Detail -->
        <div class="card" *ngIf="activeFeature === 'chatbot'">
          <div class="card-header">
            <h3 class="card-title">💬 Candidate Screening Chatbot</h3>
            <button class="btn btn-ghost btn-sm" (click)="activeFeature = null">Close</button>
          </div>

          <div class="chatbot-container">
            <div class="chatbot-sidebar">
              <h4>Conversations</h4>
              <div class="conversation-list">
                <div class="conversation-item" *ngFor="let conv of conversations" (click)="selectConversation(conv)">
                  <div class="conversation-avatar">{{ conv.candidateName.charAt(0) }}</div>
                  <div>
                    <div class="conversation-name">{{ conv.candidateName }}</div>
                    <div class="conversation-last">{{ conv.lastMessage }}</div>
                  </div>
                  <span class="chip chip-success" *ngIf="conv.status === 'completed'">✓</span>
                </div>
              </div>
            </div>

            <div class="chatbot-main">
              <div class="chat-messages">
                <div class="chat-message" *ngFor="let msg of currentMessages" [class.user]="msg.role === 'user'">
                  <div class="message-bubble">{{ msg.content }}</div>
                </div>
              </div>
              <div class="chat-input">
                <input 
                  type="text" 
                  class="input" 
                  [(ngModel)]="chatMessage" 
                  placeholder="Type a message..."
                  (keyup.enter)="sendMessage()"
                />
                <button class="btn btn-primary" (click)="sendMessage()">Send</button>
              </div>
            </div>

            <div class="chatbot-info">
              <h4>Screening Progress</h4>
              <div class="screening-checklist">
                <div class="checklist-item" *ngFor="let item of screeningChecklist">
                  <span class="check" [class.checked]="item.completed">{{ item.completed ? '✓' : '○' }}</span>
                  <span>{{ item.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ai-hub-header { display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 32px; }

    .ai-features-grid { display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
      margin-bottom: 32px; }

    .ai-feature-card { background: var(--surface);
      border: 2px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 24px;
      cursor: pointer;
      transition: all var(--transition-base); }

    .ai-feature-card:hover { border-color: var(--brand-violet-500);
      box-shadow: var(--shadow-md);
      transform: translateY(-2px); }

    .feature-icon { width: 64px;
      height: 64px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      color: white; }

    .gradient-violet { background: var(--brand-gradient); }
    .gradient-cyan { background: linear-gradient(135deg, #3bbdea 0%, #22a3d2 100%); }
    .gradient-magenta { background: linear-gradient(135deg, #c56bff 0%, #a94ee6 100%); }
    .gradient-amber { background: linear-gradient(135deg, #e8912a 0%, #c37416 100%); }

    .feature-title { font-size: 18px;
      font-weight: 600;
      color: var(--text);
      margin-bottom: 8px; }

    .feature-description { font-size: 14px;
      color: var(--text-2);
      margin-bottom: 20px;
      line-height: 1.6; }

    .feature-stats { display: flex;
      gap: 24px;
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--border); }

    .stat-value { font-family: 'Space Grotesk', sans-serif;
      font-size: 24px;
      font-weight: 700;
      color: var(--brand-violet-500);
      display: block; }

    .stat-label { font-size: 12px;
      color: var(--text-3);
      display: block;
      margin-top: 4px; }

    .match-card { background: var(--surface-alt);
      border-radius: var(--radius-md);
      padding: 20px;
      margin-bottom: 16px; }

    .match-score { font-family: 'Space Grotesk', sans-serif;
      font-size: 32px;
      font-weight: 700;
      color: var(--text-3); }

    .match-score.high { color: var(--success-500); }

    .overall-score-card { display: flex;
      align-items: center;
      gap: 32px;
      padding: 32px;
      background: var(--brand-gradient-soft);
      border-radius: var(--radius-lg);
      margin-bottom: 32px; }

    .score-big { font-family: 'Space Grotesk', sans-serif;
      font-size: 32px;
      font-weight: 700;
      fill: var(--brand-violet-500); }

    .recommendation { font-size: 24px;
      font-weight: 700;
      color: var(--text);
      margin-bottom: 4px; }

    .chatbot-container { display: grid;
      grid-template-columns: 280px 1fr 280px;
      gap: 20px;
      height: 600px; }

    .chat-messages { flex: 1;
      overflow-y: auto;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 12px; }

    .chat-message { display: flex; }

    .chat-message.user { justify-content: flex-end; }

    .message-bubble { max-width: 70%;
      padding: 12px 16px;
      border-radius: var(--radius-md);
      background: var(--surface-alt);
      color: var(--text); }

    .chat-message.user .message-bubble { background: var(--brand-violet-500);
      color: white; }
  `] })
export class AIFeaturesComponent implements OnInit { activeFeature: string | null = null;
  jobDescription = '';
  matching = false;
  matchResults: any[] = [];
  
  analysisJD = '';
  analysisResume = '';
  analyzing = false;
  analysisResult: any = null;

  questionGenRequest = { candidateName: '',
    jobTitle: '',
    experience: 0,
    skills: '' };
  generatingQuestions = false;
  generatedQuestions: any = null;
  questionCategories: any[] = [];

  conversations: any[] = [];
  currentMessages: any[] = [];
  chatMessage = '';
  screeningChecklist: any[] = [];

  constructor(private aiService: AgenticAIService) {}

  ngOnInit() { this.loadConversations(); }

  async findMatches() { this.matching = true;
    try { const result = await this.aiService.autoMatch(this.jobDescription);
      this.matchResults = result.topMatches; } catch (error) { console.error('Match error:', error); } finally { this.matching = false; } }

  async analyzeMatch() { this.analyzing = true;
    try { this.analysisResult = await this.aiService.analyzeMatch(this.analysisJD, this.analysisResume); } catch (error) { console.error('Analysis error:', error); } finally { this.analyzing = false; } }

  async generateQuestions() { this.generatingQuestions = true;
    try { const request = { ...this.questionGenRequest,
        skills: this.questionGenRequest.skills.split(',').map(s => s.trim()) };
      this.generatedQuestions = await this.aiService.generateQuestions(request);
      this.questionCategories = [
        { title: 'Technical Questions', questions: this.generatedQuestions.technicalQuestions },
        { title: 'Behavioral Questions', questions: this.generatedQuestions.behavioralQuestions },
        { title: 'Situational Questions', questions: this.generatedQuestions.situationalQuestions },
        { title: 'Custom Questions', questions: this.generatedQuestions.customQuestions }
      ]; } catch (error) { console.error('Generation error:', error); } finally { this.generatingQuestions = false; } }

  loadConversations() { this.conversations = [
      { id: '1', candidateName: 'Alex Kumar',  lastMessage: 'Thank you for the opportunity!',       status: 'completed' },
      { id: '2', candidateName: 'Priya Singh', lastMessage: 'When can I expect the next step?',     status: 'in-progress' },
      { id: '3', candidateName: 'Raj Mehta',   lastMessage: 'I am available from next Monday.',     status: 'in-progress' },
    ];
    this.screeningChecklist = [
      { label: 'Introduction sent',        completed: true },
      { label: 'Basic screening done',     completed: true },
      { label: 'Technical questions asked',completed: false },
      { label: 'Availability confirmed',   completed: false },
      { label: 'Summary generated',        completed: false },
    ];
    if (this.conversations.length) this.selectConversation(this.conversations[0]); }

  selectConversation(conv: any) { this.currentMessages = [
      { role: 'assistant', content: `Hi ${conv.candidateName}, I'm Decypher's AI screening assistant. Let's get started with a few quick questions!` },
      { role: 'user',      content: conv.lastMessage },
    ]; }

  async sendMessage() { const msg = this.chatMessage.trim();
    if (!msg) return;
    this.currentMessages.push({ role: 'user', content: msg });
    this.chatMessage = '';
    try { const reply = await this.aiService.chat(msg, 'candidate-screening');
      this.currentMessages.push({ role: 'assistant', content: reply }); } catch { this.currentMessages.push({ role: 'assistant', content: 'Sorry, I could not connect to the AI right now. Please try again.' }); } }

  getDifficultyChip(difficulty: string): string { const chips: any = { 'Easy': 'chip-success',
      'Medium': 'chip-warning',
      'Hard': 'chip-danger' };
    return chips[difficulty] || 'chip-neutral'; } }

