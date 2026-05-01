import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface SendEmailRequest {
  candidateIds: string[];
  templateId: string;
  subject: string;
  body: string;
}

export interface SendSmsRequest {
  candidateIds: string[];
  message: string;
}

export interface SendWhatsAppRequest {
  candidateIds: string[];
  templateId: string;
  variables: Record<string, string>;
}

export interface CommHistoryEntry {
  id: string;
  channel: string;
  candidateName: string;
  recipientAddress: string;
  subject: string;
  status: string;
  sentAt: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private base = `${environment.apiUrl}/api/notifications`;

  constructor(private http: HttpClient) {}

  sendEmail(req: SendEmailRequest): Observable<any> {
    return this.http.post(`${this.base}/email`, req);
  }

  sendSMS(candidateId: string, message: string): Observable<any> {
    return this.http.post(`${this.base}/sms`, { candidateIds: [candidateId], message });
  }

  sendSMSBulk(req: SendSmsRequest): Observable<any> {
    return this.http.post(`${this.base}/sms`, req);
  }

  sendWhatsApp(candidateId: string, templateId: string, variables: Record<string, string>): Observable<any> {
    return this.http.post(`${this.base}/whatsapp`, { candidateIds: [candidateId], templateId, variables });
  }

  sendWhatsAppBulk(req: SendWhatsAppRequest): Observable<any> {
    return this.http.post(`${this.base}/whatsapp`, req);
  }

  getHistory(): Observable<CommHistoryEntry[]> {
    return this.http.get<CommHistoryEntry[]>(`${this.base}/history`);
  }
}
