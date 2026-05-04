using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.Extensions.Logging;

namespace Decypher.Web.Services.AI
{
    public class MatchingAgentService : IAgentService
    {
        private readonly HttpClient _http;
        private readonly ILogger<MatchingAgentService> _log;

        public string AgentName => "Matching Agent";
        public string PromptVersion => "matching-v3.3.0";
        private const string MODEL = "text-embedding-3-small";

        public MatchingAgentService(IHttpClientFactory factory, ILogger<MatchingAgentService> log)
        {
            _http = factory.CreateClient("OpenAI");
            _log = log;
        }

        public async Task<AgentResult> ProcessAsync(AgentInput input, CancellationToken ct = default)
        {
            // Extract candidate skills from ParsedData (set by ParsingAgent before Matching runs)
            var candidateSkills = ExtractParsedSkills(input);
            var jdKeywords      = ExtractJdKeywords(input.JobDescription ?? "");

            try
            {
                var jdEmb  = await GetEmbeddingAsync(input.JobDescription ?? "", ct);
                var cvEmb  = await GetEmbeddingAsync(input.ResumeText    ?? "", ct);
                var similarity = CosineSimilarity(jdEmb, cvEmb);

                var (matched, missing) = CompareSkills(candidateSkills, jdKeywords);

                return new AgentResult
                {
                    Success = true,
                    Data = new
                    {
                        MatchPercentage = Math.Round(similarity * 100, 1),
                        Similarity      = similarity,
                        MatchedSkills   = matched,
                        MissingSkills   = missing
                    },
                    Confidence   = similarity,
                    Status       = "complete",
                    ModelVersion = MODEL,
                    PromptVersion = PromptVersion
                };
            }
            catch (Exception ex)
            {
                _log.LogWarning(ex, "MatchingAgent embedding call failed — using keyword-based fallback");
                return BuildKeywordFallback(candidateSkills, jdKeywords);
            }
        }

        // ── Skill comparison ──────────────────────────────────────────────────

        private static (string[] matched, string[] missing) CompareSkills(
            string[] candidateSkills, string[] jdKeywords)
        {
            if (jdKeywords.Length == 0) return (Array.Empty<string>(), Array.Empty<string>());

            var cvSet = new HashSet<string>(
                candidateSkills.Select(s => s.ToLowerInvariant()), StringComparer.OrdinalIgnoreCase);

            var matched = jdKeywords.Where(k => cvSet.Contains(k.ToLowerInvariant())).ToArray();
            var missing = jdKeywords.Where(k => !cvSet.Contains(k.ToLowerInvariant())).ToArray();
            return (matched, missing);
        }

        private AgentResult BuildKeywordFallback(string[] candidateSkills, string[] jdKeywords)
        {
            var (matched, missing) = CompareSkills(candidateSkills, jdKeywords);
            double matchPct = jdKeywords.Length > 0
                ? Math.Round((double)matched.Length / jdKeywords.Length * 100, 1)
                : 65.0;

            return new AgentResult
            {
                Success = true,
                Data = new
                {
                    MatchPercentage = matchPct,
                    Similarity      = matchPct / 100.0,
                    MatchedSkills   = matched,
                    MissingSkills   = missing
                },
                Confidence   = matchPct / 100.0,
                Status       = "complete",
                ModelVersion = "keyword-fallback-v1",
                PromptVersion = PromptVersion
            };
        }

        // ── Skill extraction helpers ──────────────────────────────────────────

        private static string[] ExtractParsedSkills(AgentInput input)
        {
            try
            {
                if (!input.Context.TryGetValue("ParsedData", out var pd) || pd == null)
                    return ExtractResumeKeywords(input.ResumeText ?? "");

                using var doc = JsonDocument.Parse(JsonSerializer.Serialize(pd));
                if (doc.RootElement.TryGetProperty("skills", out var sk) && sk.ValueKind == JsonValueKind.Array)
                {
                    var skills = sk.EnumerateArray()
                        .Select(x => x.GetString() ?? "").Where(s => s.Length > 0).ToArray();
                    if (skills.Length > 0) return skills;
                }
            }
            catch { }
            return ExtractResumeKeywords(input.ResumeText ?? "");
        }

        private static string[] ExtractJdKeywords(string jd)
        {
            if (string.IsNullOrWhiteSpace(jd)) return Array.Empty<string>();

            // Common tech keywords to look for in JDs
            var techTerms = new[]
            {
                "Python","Java","C#","C++","JavaScript","TypeScript","Go","Rust","Kotlin","Swift",
                "React","Angular","Vue","Node.js","Django","FastAPI","Spring","ASP.NET",".NET",
                "SQL","PostgreSQL","MySQL","MongoDB","Redis","Elasticsearch","Kafka","RabbitMQ",
                "AWS","Azure","GCP","Docker","Kubernetes","Terraform","CI/CD","DevOps","Linux",
                "REST","GraphQL","gRPC","Microservices","API","Machine Learning","AI","ML",
                "TensorFlow","PyTorch","Scikit-learn","Data Science","Analytics","Power BI","Excel",
                "Agile","Scrum","Git","JIRA","Communication","Leadership","Problem Solving",
                "Teamwork","Project Management","Strategic Planning","Analytical",
                "HTML","CSS","PHP","Ruby","Scala","R","MATLAB","Tableau","Spark","Hadoop",
                "ServiceNow","Salesforce","SAP","Oracle","SharePoint"
            };

            return techTerms
                .Where(t => jd.Contains(t, StringComparison.OrdinalIgnoreCase))
                .Distinct(StringComparer.OrdinalIgnoreCase)
                .ToArray();
        }

        private static string[] ExtractResumeKeywords(string resumeText)
        {
            if (string.IsNullOrWhiteSpace(resumeText)) return Array.Empty<string>();

            var techTerms = new[]
            {
                "Python","Java","C#","C++","JavaScript","TypeScript","Go","Rust","Kotlin","Swift",
                "React","Angular","Vue","Node.js","Django","FastAPI","Spring","ASP.NET",".NET",
                "SQL","PostgreSQL","MySQL","MongoDB","Redis","Elasticsearch","Kafka","RabbitMQ",
                "AWS","Azure","GCP","Docker","Kubernetes","Terraform","CI/CD","DevOps","Linux",
                "REST","GraphQL","gRPC","Microservices","Machine Learning","AI","TensorFlow","PyTorch",
                "Power BI","Excel","Agile","Scrum","Git","JIRA","Salesforce","SAP","Oracle"
            };

            return techTerms
                .Where(t => resumeText.Contains(t, StringComparison.OrdinalIgnoreCase))
                .Distinct(StringComparer.OrdinalIgnoreCase)
                .ToArray();
        }

        // ── OpenAI embedding ──────────────────────────────────────────────────

        private async Task<float[]> GetEmbeddingAsync(string text, CancellationToken ct)
        {
            var resp = await _http.PostAsJsonAsync("embeddings", new { model = MODEL, input = text }, ct);
            resp.EnsureSuccessStatusCode();
            var result = await resp.Content.ReadFromJsonAsync<OpenAIEmbeddingResponse>(ct);
            return result?.Data?[0]?.Embedding
                ?? throw new InvalidOperationException("Empty embedding response from OpenAI");
        }

        private static double CosineSimilarity(float[] a, float[] b)
        {
            double dot = 0, normA = 0, normB = 0;
            for (int i = 0; i < a.Length; i++) { dot += a[i] * b[i]; normA += a[i] * a[i]; normB += b[i] * b[i]; }
            return dot / (Math.Sqrt(normA) * Math.Sqrt(normB));
        }
    }
}
