using System.Threading.Tasks;

namespace Decypher.Web.Services
{
    public interface IAIService
    {
        Task<dynamic> ScoreResumeAsync(string resumeText, string jobTitle);
        Task<dynamic> MatchCvJdAsync(string resume, string jobDescription);
        Task<dynamic> GenerateInterviewQuestionsAsync(string jobTitle, string[] skills);
        Task<dynamic> ChatbotAsync(string message, string context = "");
        Task<dynamic> AnalyzeJobDescriptionAsync(string jobDescription);
        Task<dynamic> PredictDropoutRiskAsync(string candidateProfile);
        Task<dynamic> RankCompetenciesAsync(string[] candidateSkills, string[] jobRequirements);
        Task<dynamic> ExtractKeywordsAsync(string text);
    }
}
