using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Decypher.Web.Services
{
    public class AIService : IAIService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AIService> _logger;
        private readonly string _apiKey;
        private readonly string _model;
        private const string OpenAiApiUrl = "https://api.openai.com/v1/chat/completions";

        public AIService(HttpClient httpClient, IConfiguration configuration, ILogger<AIService> logger)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _logger = logger;
            _apiKey = configuration["OpenAI:ApiKey"] ?? Environment.GetEnvironmentVariable("OPENAI_API_KEY") ?? string.Empty;
            _model = configuration["OpenAI:Model"] ?? "gpt-4o-mini";
        }

        public async Task<dynamic> ScoreResumeAsync(string resumeText, string jobTitle)
        {
            try
            {
                var prompt = $@"Score this resume against job title '{jobTitle}' on a scale of 0-100.
Resume:
{resumeText}

Provide JSON response with: score (0-100), strengths (array), weaknesses (array), recommendation (string)";

                return await CallOpenAIAsync(prompt);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error scoring resume");
                return new { error = ex.Message, score = 0 };
            }
        }

        public async Task<dynamic> MatchCvJdAsync(string resume, string jobDescription)
        {
            try
            {
                var prompt = $@"Analyze the match between this resume and job description.
Resume:
{resume}

Job Description:
{jobDescription}

Provide JSON response with: matchScore (0-100), matchedSkills (array), missingSkills (array), recommendation (string)";

                return await CallOpenAIAsync(prompt);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error matching CV to JD");
                return new { error = ex.Message, matchScore = 0 };
            }
        }

        public async Task<dynamic> GenerateInterviewQuestionsAsync(string jobTitle, string[] skills)
        {
            try
            {
                var skillsStr = string.Join(", ", skills);
                var prompt = $@"Generate 5 technical interview questions for a {jobTitle} position requiring skills: {skillsStr}
Provide JSON response with: questions (array of strings), difficulty (Easy/Medium/Hard)";

                return await CallOpenAIAsync(prompt);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating interview questions");
                return new { error = ex.Message, questions = Array.Empty<string>() };
            }
        }

        public async Task<dynamic> ChatbotAsync(string message, string context = "")
        {
            try
            {
                var prompt = $@"You are a helpful HR chatbot. Respond to this question about recruitment and hiring.
Context: {context}
Question: {message}

Provide JSON response with: response (string), confidence (0-100), suggestedActions (array)";

                return await CallOpenAIAsync(prompt);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in chatbot");
                return new { error = ex.Message, response = "I encountered an error processing your request." };
            }
        }

        public async Task<dynamic> AnalyzeJobDescriptionAsync(string jobDescription)
        {
            try
            {
                var prompt = $@"Analyze this job description for completeness and quality.
Job Description:
{jobDescription}

Provide JSON response with: requiredSkills (array), keywordAnalysis (object), recommendations (array), qualityScore (0-100)";

                return await CallOpenAIAsync(prompt);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error analyzing job description");
                return new { error = ex.Message, qualityScore = 0 };
            }
        }

        public async Task<dynamic> PredictDropoutRiskAsync(string candidateProfile)
        {
            try
            {
                var prompt = $@"Based on this candidate profile, predict dropout risk in recruitment pipeline.
Profile:
{candidateProfile}

Provide JSON response with: riskScore (0-100), riskFactors (array), recommendations (array)";

                return await CallOpenAIAsync(prompt);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error predicting dropout risk");
                return new { error = ex.Message, riskScore = 0 };
            }
        }

        public async Task<dynamic> RankCompetenciesAsync(string[] candidateSkills, string[] jobRequirements)
        {
            try
            {
                var candidateSkillsStr = string.Join(", ", candidateSkills);
                var jobReqStr = string.Join(", ", jobRequirements);
                
                var prompt = $@"Rank these candidate skills against job requirements.
Candidate Skills: {candidateSkillsStr}
Job Requirements: {jobReqStr}

Provide JSON response with: ranking (array with score for each skill), overallFit (0-100), gaps (array)";

                return await CallOpenAIAsync(prompt);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error ranking competencies");
                return new { error = ex.Message, overallFit = 0 };
            }
        }

        public async Task<dynamic> ExtractKeywordsAsync(string text)
        {
            try
            {
                var prompt = $@"Extract important keywords from this text:
{text}

Provide JSON response with: keywords (array), frequency (object), categories (array)";

                return await CallOpenAIAsync(prompt);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error extracting keywords");
                return new { error = ex.Message, keywords = Array.Empty<string>() };
            }
        }

        private async Task<dynamic> CallOpenAIAsync(string prompt)
        {
            if (string.IsNullOrEmpty(_apiKey))
            {
                throw new InvalidOperationException("OpenAI API key not configured");
            }

            var requestBody = new
            {
                model = _model,
                messages = new[]
                {
                    new { role = "system", content = "You are an expert HR assistant. Always respond with valid JSON." },
                    new { role = "user", content = prompt }
                },
                temperature = 0.7,
                max_tokens = 1000
            };

            var request = new HttpRequestMessage(HttpMethod.Post, OpenAiApiUrl)
            {
                Content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json")
            };

            request.Headers.Add("Authorization", $"Bearer {_apiKey}");

            var response = await _httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();

            var responseContent = await response.Content.ReadAsStringAsync();
            var jsonResponse = JsonDocument.Parse(responseContent);
            
            var content = jsonResponse.RootElement
                .GetProperty("choices")[0]
                .GetProperty("message")
                .GetProperty("content")
                .GetString();

            // Parse the JSON response from Claude
            if (!string.IsNullOrEmpty(content))
            {
                try
                {
                    return JsonSerializer.Deserialize<dynamic>(content) ?? new { response = content };
                }
                catch
                {
                    return new { response = content };
                }
            }

            return new { response = "No response from AI" };
        }
    }
}
