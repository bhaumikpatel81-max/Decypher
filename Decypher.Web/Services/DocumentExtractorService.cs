using System.Net.Http.Json;
using System.Text;
using System.Text.RegularExpressions;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using UglyToad.PdfPig;
using UglyToad.PdfPig.Content;
using Decypher.Web.Services.AI;

namespace Decypher.Web.Services
{
    public interface IDocumentExtractorService
    {
        Task<string> ExtractTextAsync(byte[] fileBytes, string fileName, string mimeType, CancellationToken ct = default);
    }

    public class DocumentExtractorService : IDocumentExtractorService
    {
        private readonly HttpClient _http;
        private readonly ILogger<DocumentExtractorService> _log;

        public DocumentExtractorService(IHttpClientFactory factory, ILogger<DocumentExtractorService> log)
        {
            _http = factory.CreateClient("OpenAI");
            _log  = log;
        }

        public async Task<string> ExtractTextAsync(byte[] fileBytes, string fileName, string mimeType, CancellationToken ct = default)
        {
            var ext = Path.GetExtension(fileName).ToLowerInvariant();
            try
            {
                return ext switch
                {
                    ".pdf"              => ExtractPdf(fileBytes),
                    ".docx"             => ExtractDocx(fileBytes),
                    ".doc"              => ExtractDocLegacy(fileBytes),
                    ".jpg" or ".jpeg" or ".png" => await ExtractVisionAsync(fileBytes, mimeType, ct),
                    _ => throw new NotSupportedException($"Unsupported file type: {ext}")
                };
            }
            catch (Exception ex)
            {
                _log.LogError(ex, "Text extraction failed for {FileName}", fileName);
                throw;
            }
        }

        // ── PDF via PdfPig ────────────────────────────────────────────
        private static string ExtractPdf(byte[] bytes)
        {
            using var doc = PdfDocument.Open(bytes);
            var sb = new StringBuilder();
            foreach (Page page in doc.GetPages())
                sb.AppendLine(string.Join(" ", page.GetWords().Select(w => w.Text)));
            return sb.ToString().Trim();
        }

        // ── DOCX via DocumentFormat.OpenXml ──────────────────────────
        private static string ExtractDocx(byte[] bytes)
        {
            using var ms  = new MemoryStream(bytes);
            using var doc = WordprocessingDocument.Open(ms, false);
            var body = doc.MainDocumentPart?.Document?.Body
                ?? throw new InvalidOperationException("DOCX contains no body.");
            var sb = new StringBuilder();
            foreach (var para in body.Descendants<Paragraph>())
            {
                var line = para.InnerText.Trim();
                if (line.Length > 0) sb.AppendLine(line);
            }
            return sb.ToString().Trim();
        }

        // ── Legacy .doc — scan binary for printable ASCII runs ────────
        private static string ExtractDocLegacy(byte[] bytes)
        {
            var sb  = new StringBuilder();
            var run = new StringBuilder();
            foreach (byte b in bytes)
            {
                if ((b >= 0x20 && b < 0x7F) || b == 0x09 || b == 0x0A || b == 0x0D)
                {
                    run.Append((char)b);
                }
                else
                {
                    if (run.Length >= 5) { sb.Append(run); sb.Append(' '); }
                    run.Clear();
                }
            }
            if (run.Length >= 5) sb.Append(run);
            return Regex.Replace(sb.ToString().Trim(), @"\s{3,}", "\n").Trim();
        }

        // ── Images via GPT-4o Vision ──────────────────────────────────
        private async Task<string> ExtractVisionAsync(byte[] bytes, string mimeType, CancellationToken ct)
        {
            var base64 = Convert.ToBase64String(bytes);
            var body = new
            {
                model    = "gpt-4o-2024-05-13",
                messages = new[]
                {
                    new
                    {
                        role    = "user",
                        content = new object[]
                        {
                            new { type = "text", text = "Extract all text from this resume/document image. Return only the extracted text, preserving line breaks. No commentary." },
                            new { type = "image_url", image_url = new { url = $"data:{mimeType};base64,{base64}", detail = "high" } }
                        }
                    }
                },
                max_tokens = 4096
            };

            var resp   = await _http.PostAsJsonAsync("chat/completions", body, ct);
            resp.EnsureSuccessStatusCode();
            var result = await resp.Content.ReadFromJsonAsync<OpenAIChatResponse>(ct);
            return result?.Choices?[0]?.Message?.Content?.Trim() ?? "";
        }
    }
}
