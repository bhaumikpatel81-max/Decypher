using System.Net.Http.Json;
using Microsoft.Extensions.Logging;

namespace Decypher.Web.Services.AI
{
    public class MatchingAgentService : IAgentService
    {
        private readonly HttpClient _http;
        private readonly ILogger<MatchingAgentService> _log;

        public string AgentName => "Matching Agent";
        public string PromptVersion => "matching-v3.2.1";
        private const string MODEL = "text-embedding-3-small";

        public MatchingAgentService(IHttpClientFactory factory, ILogger<MatchingAgentService> log)
        {
            _http = factory.CreateClient("OpenAI");
            _log = log;
        }

        public async Task<AgentResult> ProcessAsync(AgentInput input, CancellationToken ct = default)
        {
            try
            {
                var jdEmb = await GetEmbeddingAsync(input.JobDescription, ct);
                var cvEmb = await GetEmbeddingAsync(input.ResumeText, ct);
                var similarity = CosineSimilarity(jdEmb, cvEmb);

                return new AgentResult
                {
                    Success = true,
                    Data = new { MatchPercentage = Math.Round(similarity * 100, 1), Similarity = similarity },
                    Confidence = similarity,
                    Status = "complete", ModelVersion = MODEL, PromptVersion = PromptVersion
                };
            }
            catch (Exception ex)
            {
                _log.LogError(ex, "MatchingAgent failed");
                return new AgentResult { Success = false, Status = "failed", Confidence = 0, ErrorMessage = ex.Message };
            }
        }

        private async Task<float[]> GetEmbeddingAsync(string text, CancellationToken ct)
        {
            var resp = await _http.PostAsJsonAsync("embeddings", new { model = MODEL, input = text }, ct);
            resp.EnsureSuccessStatusCode();
            var result = await resp.Content.ReadFromJsonAsync<OpenAIEmbeddingResponse>(ct);
            return result.Data[0].Embedding;
        }

        private static double CosineSimilarity(float[] a, float[] b)
        {
            double dot = 0, normA = 0, normB = 0;
            for (int i = 0; i < a.Length; i++) { dot += a[i] * b[i]; normA += a[i] * a[i]; normB += b[i] * b[i]; }
            return dot / (Math.Sqrt(normA) * Math.Sqrt(normB));
        }
    }
}
