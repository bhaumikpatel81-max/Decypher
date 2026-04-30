using System.Text.Json.Serialization;

namespace Decypher.Web.Services.AI
{
    public class OpenAIChatResponse
    {
        [JsonPropertyName("choices")]
        public ChatChoice[]? Choices { get; set; }
    }

    public class ChatChoice
    {
        [JsonPropertyName("message")]
        public ChatMessage? Message { get; set; }
    }

    public class ChatMessage
    {
        [JsonPropertyName("content")]
        public string? Content { get; set; }
    }

    public class OpenAIEmbeddingResponse
    {
        [JsonPropertyName("data")]
        public EmbeddingData[]? Data { get; set; }
    }

    public class EmbeddingData
    {
        [JsonPropertyName("embedding")]
        public float[]? Embedding { get; set; }
    }
}
