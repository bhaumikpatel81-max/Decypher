using ClosedXML.Excel;
using Decypher.Web.DTOs;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Drawing;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Presentation;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using D = DocumentFormat.OpenXml.Drawing;
using P = DocumentFormat.OpenXml.Presentation;

namespace Decypher.Web.Services
{
    public interface IBudgetExportService
    {
        Task<byte[]> GenerateExcelAsync(
            ExcelExportRequest req,
            string fyLabel,
            DashboardKpiDto kpis,
            IEnumerable<BudgetAllocationDto> allocations,
            IEnumerable<BudgetActualDto> actuals,
            CostPerHireDto cph,
            IEnumerable<VendorSpendDto> vendors,
            IEnumerable<DepartmentBreakdownDto> departments);

        Task<byte[]> GeneratePptAsync(
            DashboardKpiDto kpis,
            IEnumerable<DepartmentBreakdownDto> departments,
            IEnumerable<VendorSpendDto> vendors,
            CostPerHireDto cph,
            string fyLabel,
            string tenantName);
    }

    public class BudgetExportService : IBudgetExportService
    {
        // ══════════════════════════════════════════════════════════════════════
        //  EXCEL — ClosedXML
        // ══════════════════════════════════════════════════════════════════════

        public Task<byte[]> GenerateExcelAsync(
            ExcelExportRequest req,
            string fyLabel,
            DashboardKpiDto kpis,
            IEnumerable<BudgetAllocationDto> allocations,
            IEnumerable<BudgetActualDto> actuals,
            CostPerHireDto cph,
            IEnumerable<VendorSpendDto> vendors,
            IEnumerable<DepartmentBreakdownDto> departments)
        {
            using var wb = new XLWorkbook();

            AddSummarySheet(wb, fyLabel, kpis);
            AddAllocationsSheet(wb, allocations);
            AddActualsSheet(wb, actuals);
            AddCostPerHireSheet(wb, cph);
            AddVendorSpendSheet(wb, vendors);
            AddDepartmentSheet(wb, departments);

            using var ms = new MemoryStream();
            wb.SaveAs(ms);
            return Task.FromResult(ms.ToArray());
        }

        private static XLColor HeaderColor => XLColor.FromHtml("#1565C0");
        private static XLColor HeaderFontColor => XLColor.White;
        private static XLColor AltRowColor => XLColor.FromHtml("#EEF4FB");

        private static void StyleHeader(IXLRow row, int colCount)
        {
            var range = row.Worksheet.Range(row.RowNumber(), 1, row.RowNumber(), colCount);
            range.Style.Fill.BackgroundColor = HeaderColor;
            range.Style.Font.FontColor = HeaderFontColor;
            range.Style.Font.Bold = true;
            range.Worksheet.SheetView.FreezeRows(1);
        }

        private static void ApplyAltRows(IXLWorksheet ws, int dataStartRow, int dataEndRow, int colCount)
        {
            for (int r = dataStartRow; r <= dataEndRow; r += 2)
            {
                ws.Range(r, 1, r, colCount).Style.Fill.BackgroundColor = AltRowColor;
            }
        }

        private static void AutoFitCols(IXLWorksheet ws, int colCount)
        {
            for (int c = 1; c <= colCount; c++)
                ws.Column(c).AdjustToContents();
        }

        private static string Cur(decimal value) => value.ToString("N2");

        // Sheet 1: Summary
        private static void AddSummarySheet(XLWorkbook wb, string fyLabel, DashboardKpiDto kpis)
        {
            var ws = wb.Worksheets.Add("Summary");

            ws.Cell(1, 1).Value = $"Hiring Budget Summary — {fyLabel}";
            ws.Cell(1, 1).Style.Font.Bold = true;
            ws.Cell(1, 1).Style.Font.FontSize = 14;
            ws.Range(1, 1, 1, 3).Merge();

            var headers = new[] { "Metric", "Value", "Notes" };
            int row = 3;
            for (int i = 0; i < headers.Length; i++)
                ws.Cell(row, i + 1).Value = headers[i];
            StyleHeader(ws.Row(row), headers.Length);
            row++;

            var data = new[]
            {
                ("Total Budget", Cur(kpis.TotalBudget), ""),
                ("Total Spent", Cur(kpis.TotalSpent), ""),
                ("Total Committed (Pending)", Cur(kpis.TotalCommitted), "Actuals pending approval"),
                ("Remaining", Cur(kpis.Remaining), ""),
                ("Utilization %", $"{kpis.UtilizationPct:N1}%", ""),
                ("Headcount Planned", kpis.HeadcountPlanned.ToString(), ""),
                ("Headcount Filled", kpis.HeadcountFilled.ToString(), "Joined within FY"),
                ("Headcount In-Progress", kpis.HeadcountInProgress.ToString(), ""),
                ("Cost Per Hire (Actual)", Cur(kpis.CostPerHireActual), ""),
                ("Cost Per Hire (Target)", Cur(kpis.CostPerHireTarget), "")
            };

            for (int i = 0; i < data.Length; i++)
            {
                ws.Cell(row + i, 1).Value = data[i].Item1;
                ws.Cell(row + i, 2).Value = data[i].Item2;
                ws.Cell(row + i, 3).Value = data[i].Item3;
            }
            ApplyAltRows(ws, row, row + data.Length - 1, 3);
            AutoFitCols(ws, 3);
        }

        // Sheet 2: Allocations
        private static void AddAllocationsSheet(XLWorkbook wb, IEnumerable<BudgetAllocationDto> allocations)
        {
            var ws = wb.Worksheets.Add("Allocations");
            var headers = new[] { "Department", "Code", "Quarter", "Category", "Headcount Planned", "Allotted Amount", "Actual Spend", "Variance", "Utilization %" };
            for (int i = 0; i < headers.Length; i++)
                ws.Cell(1, i + 1).Value = headers[i];
            StyleHeader(ws.Row(1), headers.Length);

            int row = 2;
            foreach (var a in allocations)
            {
                ws.Cell(row, 1).Value = a.DepartmentName;
                ws.Cell(row, 2).Value = a.DepartmentCode;
                ws.Cell(row, 3).Value = a.Quarter;
                ws.Cell(row, 4).Value = a.Category;
                ws.Cell(row, 5).Value = a.HeadcountPlanned;
                ws.Cell(row, 6).Value = a.AllottedAmount;
                ws.Cell(row, 7).Value = a.ActualSpend;
                ws.Cell(row, 8).Value = a.Variance;
                ws.Cell(row, 9).Value = $"{a.UtilizationPct:N1}%";
                // currency format
                ws.Cell(row, 6).Style.NumberFormat.Format = "#,##0.00";
                ws.Cell(row, 7).Style.NumberFormat.Format = "#,##0.00";
                ws.Cell(row, 8).Style.NumberFormat.Format = "#,##0.00";
                row++;
            }
            if (row > 2) ApplyAltRows(ws, 2, row - 1, headers.Length);
            AutoFitCols(ws, headers.Length);
        }

        // Sheet 3: Actuals
        private static void AddActualsSheet(XLWorkbook wb, IEnumerable<BudgetActualDto> actuals)
        {
            var ws = wb.Worksheets.Add("Actuals");
            var headers = new[] { "Date", "Department", "Category", "Amount", "Vendor", "Invoice Ref", "Approved", "Notes" };
            for (int i = 0; i < headers.Length; i++)
                ws.Cell(1, i + 1).Value = headers[i];
            StyleHeader(ws.Row(1), headers.Length);

            int row = 2;
            foreach (var a in actuals)
            {
                ws.Cell(row, 1).Value = a.SpendDate.ToString("yyyy-MM-dd");
                ws.Cell(row, 2).Value = a.DepartmentName;
                ws.Cell(row, 3).Value = a.SpendCategory;
                ws.Cell(row, 4).Value = a.Amount;
                ws.Cell(row, 4).Style.NumberFormat.Format = "#,##0.00";
                ws.Cell(row, 5).Value = a.VendorName;
                ws.Cell(row, 6).Value = a.InvoiceReference;
                ws.Cell(row, 7).Value = a.IsApproved ? "Yes" : "No";
                ws.Cell(row, 8).Value = a.Notes;
                row++;
            }
            if (row > 2) ApplyAltRows(ws, 2, row - 1, headers.Length);
            AutoFitCols(ws, headers.Length);
        }

        // Sheet 4: Cost Per Hire
        private static void AddCostPerHireSheet(XLWorkbook wb, CostPerHireDto cph)
        {
            var ws = wb.Worksheets.Add("Cost Per Hire");
            ws.Cell(1, 1).Value = "Cost Per Hire Summary";
            ws.Cell(1, 1).Style.Font.Bold = true;
            ws.Range(1, 1, 1, 4).Merge();

            ws.Cell(2, 1).Value = "Total Hires"; ws.Cell(2, 2).Value = cph.TotalHires;
            ws.Cell(3, 1).Value = "Total Spend"; ws.Cell(3, 2).Value = cph.TotalSpend; ws.Cell(3, 2).Style.NumberFormat.Format = "#,##0.00";
            ws.Cell(4, 1).Value = "Overall CPH"; ws.Cell(4, 2).Value = cph.OverallCostPerHire; ws.Cell(4, 2).Style.NumberFormat.Format = "#,##0.00";
            ws.Cell(5, 1).Value = "Target CPH"; ws.Cell(5, 2).Value = cph.TargetCostPerHire; ws.Cell(5, 2).Style.NumberFormat.Format = "#,##0.00";

            int row = 7;
            var headers = new[] { "Category", "Amount", "% of Total" };
            for (int i = 0; i < headers.Length; i++)
                ws.Cell(row, i + 1).Value = headers[i];
            StyleHeader(ws.Row(row), headers.Length);
            row++;
            foreach (var cat in cph.ByCategory)
            {
                ws.Cell(row, 1).Value = cat.Category;
                ws.Cell(row, 2).Value = cat.Amount; ws.Cell(row, 2).Style.NumberFormat.Format = "#,##0.00";
                ws.Cell(row, 3).Value = $"{cat.PctOfTotal:N1}%";
                row++;
            }
            if (row > 8) ApplyAltRows(ws, 8, row - 1, headers.Length);
            AutoFitCols(ws, headers.Length);
        }

        // Sheet 5: Vendor Spend
        private static void AddVendorSpendSheet(XLWorkbook wb, IEnumerable<VendorSpendDto> vendors)
        {
            var ws = wb.Worksheets.Add("Vendor Spend");
            var headers = new[] { "Vendor", "Total Spend", "Transactions" };
            for (int i = 0; i < headers.Length; i++)
                ws.Cell(1, i + 1).Value = headers[i];
            StyleHeader(ws.Row(1), headers.Length);

            int row = 2;
            foreach (var v in vendors.OrderByDescending(x => x.TotalSpend))
            {
                ws.Cell(row, 1).Value = v.VendorName;
                ws.Cell(row, 2).Value = v.TotalSpend; ws.Cell(row, 2).Style.NumberFormat.Format = "#,##0.00";
                ws.Cell(row, 3).Value = v.TransactionCount;
                row++;
            }
            if (row > 2) ApplyAltRows(ws, 2, row - 1, headers.Length);
            AutoFitCols(ws, headers.Length);
        }

        // Sheet 6: Department Breakdown
        private static void AddDepartmentSheet(XLWorkbook wb, IEnumerable<DepartmentBreakdownDto> departments)
        {
            var ws = wb.Worksheets.Add("Department Breakdown");
            var headers = new[] { "Department", "Code", "Planned Budget", "Actual Spend", "Variance", "Utilization %", "HC Planned", "HC Filled" };
            for (int i = 0; i < headers.Length; i++)
                ws.Cell(1, i + 1).Value = headers[i];
            StyleHeader(ws.Row(1), headers.Length);

            int row = 2;
            foreach (var d in departments)
            {
                ws.Cell(row, 1).Value = d.Department;
                ws.Cell(row, 2).Value = d.DepartmentCode;
                ws.Cell(row, 3).Value = d.PlannedBudget; ws.Cell(row, 3).Style.NumberFormat.Format = "#,##0.00";
                ws.Cell(row, 4).Value = d.ActualSpend; ws.Cell(row, 4).Style.NumberFormat.Format = "#,##0.00";
                ws.Cell(row, 5).Value = d.Variance; ws.Cell(row, 5).Style.NumberFormat.Format = "#,##0.00";
                ws.Cell(row, 6).Value = $"{d.UtilizationPct:N1}%";
                ws.Cell(row, 7).Value = d.HeadcountPlanned;
                ws.Cell(row, 8).Value = d.HeadcountFilled;
                row++;
            }
            if (row > 2) ApplyAltRows(ws, 2, row - 1, headers.Length);
            AutoFitCols(ws, headers.Length);
        }

        // ══════════════════════════════════════════════════════════════════════
        //  POWERPOINT — DocumentFormat.OpenXml
        // ══════════════════════════════════════════════════════════════════════

        public Task<byte[]> GeneratePptAsync(
            DashboardKpiDto kpis,
            IEnumerable<DepartmentBreakdownDto> departments,
            IEnumerable<VendorSpendDto> vendors,
            CostPerHireDto cph,
            string fyLabel,
            string tenantName)
        {
            using var ms = new MemoryStream();
            using (var doc = PresentationDocument.Create(ms, PresentationDocumentType.Presentation))
            {
                var mainPart = doc.AddNewPart<PresentationPart>(
                    "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml",
                    "rId1");
                mainPart.Presentation = BuildPresentation();

                var slideLayoutPart = CreateSlideLayoutPart(mainPart);
                var slideMasterPart = slideLayoutPart.SlideMasterPart!;

                var slides = new List<SlidePart>
                {
                    AddSlide(mainPart, slideLayoutPart, BuildTitleSlide($"Hiring Budget Report — {fyLabel}", tenantName)),
                    AddSlide(mainPart, slideLayoutPart, BuildKpiSlide(kpis)),
                    AddSlide(mainPart, slideLayoutPart, BuildMonthlyTrendSlide(kpis.MonthlyTrend)),
                    AddSlide(mainPart, slideLayoutPart, BuildDeptSlide(departments)),
                    AddSlide(mainPart, slideLayoutPart, BuildVendorSlide(vendors)),
                    AddSlide(mainPart, slideLayoutPart, BuildCphSlide(cph))
                };

                var slideIdList = new SlideIdList();
                uint slideId = 256;
                foreach (var slide in slides)
                {
                    var id = mainPart.GetIdOfPart(slide);
                    slideIdList.Append(new SlideId { Id = slideId++, RelationshipId = id });
                }
                mainPart.Presentation.SlideIdList = slideIdList;
                mainPart.Presentation.Save();
            }
            return Task.FromResult(ms.ToArray());
        }

        private static Presentation BuildPresentation()
        {
            return new Presentation(
                new SlideMasterIdList(),
                new SlideIdList(),
                new SlideSize { Cx = 9144000, Cy = 5143500 },
                new NotesSize { Cx = 6858000, Cy = 9144000 }
            );
        }

        private static SlideLayoutPart CreateSlideLayoutPart(PresentationPart mainPart)
        {
            var masterPart = mainPart.AddNewPart<SlideMasterPart>();
            masterPart.SlideMaster = new SlideMaster(
                new P.CommonSlideData(new ShapeTree(
                    new P.NonVisualGroupShapeProperties(
                        new P.NonVisualDrawingProperties { Id = 1, Name = "" },
                        new P.NonVisualGroupShapeDrawingProperties(),
                        new ApplicationNonVisualDrawingProperties()),
                    new GroupShapeProperties(new D.TransformGroup()))),
                new P.ColorMap
                {
                    Background1 = D.ColorSchemeIndexValues.Light1,
                    Text1 = D.ColorSchemeIndexValues.Dark1,
                    Background2 = D.ColorSchemeIndexValues.Light2,
                    Text2 = D.ColorSchemeIndexValues.Dark2,
                    Accent1 = D.ColorSchemeIndexValues.Accent1,
                    Accent2 = D.ColorSchemeIndexValues.Accent2,
                    Accent3 = D.ColorSchemeIndexValues.Accent3,
                    Accent4 = D.ColorSchemeIndexValues.Accent4,
                    Accent5 = D.ColorSchemeIndexValues.Accent5,
                    Accent6 = D.ColorSchemeIndexValues.Accent6,
                    Hyperlink = D.ColorSchemeIndexValues.Hyperlink,
                    FollowedHyperlink = D.ColorSchemeIndexValues.FollowedHyperlink
                },
                new SlideLayoutIdList()
            );

            var smId = mainPart.GetIdOfPart(masterPart);
            mainPart.Presentation.SlideMasterIdList = new SlideMasterIdList(
                new SlideMasterId { Id = 2147483648U, RelationshipId = smId });

            var layoutPart = masterPart.AddNewPart<SlideLayoutPart>();
            layoutPart.SlideLayout = new SlideLayout(
                new P.CommonSlideData(new ShapeTree(
                    new P.NonVisualGroupShapeProperties(
                        new P.NonVisualDrawingProperties { Id = 1, Name = "" },
                        new P.NonVisualGroupShapeDrawingProperties(),
                        new ApplicationNonVisualDrawingProperties()),
                    new GroupShapeProperties(new D.TransformGroup()))),
                new ColorMapOverride(new MasterColorMapping())
            );
            layoutPart.SlideLayout.Type = SlideLayoutValues.Blank;

            var lid = masterPart.GetIdOfPart(layoutPart);
            masterPart.SlideMaster.SlideLayoutIdList = new SlideLayoutIdList(
                new SlideLayoutId { Id = 2147483649U, RelationshipId = lid });

            masterPart.SlideMaster.Save();
            layoutPart.SlideLayout.Save();
            return layoutPart;
        }

        private static SlidePart AddSlide(PresentationPart mainPart, SlideLayoutPart layoutPart, P.Slide slide)
        {
            var slidePart = mainPart.AddNewPart<SlidePart>();
            slidePart.Slide = slide;
            slidePart.AddPart(layoutPart);
            slide.Save();
            return slidePart;
        }

        // ── Slide builders ────────────────────────────────────────────────────

        private static P.Slide BuildTitleSlide(string title, string subtitle)
        {
            return new P.Slide(
                new P.CommonSlideData(new ShapeTree(
                    NvGroupProps(),
                    new GroupShapeProperties(new D.TransformGroup()),
                    MakeTextBox(1, "title", 457200, 274638, 8229600, 1143000, title, 4000, bold: true, colorHex: "1565C0"),
                    MakeTextBox(2, "subtitle", 457200, 1600200, 8229600, 600000, subtitle, 2400)
                )),
                new P.ColorMapOverride(new MasterColorMapping()));
        }

        private static P.Slide BuildKpiSlide(DashboardKpiDto kpis)
        {
            var kpiData = new[]
            {
                ("Total Budget", $"${kpis.TotalBudget:N0}"),
                ("Total Spent", $"${kpis.TotalSpent:N0}"),
                ("Remaining", $"${kpis.Remaining:N0}"),
                ("Utilization", $"{kpis.UtilizationPct:N1}%"),
                ("Headcount Filled", $"{kpis.HeadcountFilled} / {kpis.HeadcountPlanned}"),
                ("Cost Per Hire", $"${kpis.CostPerHireActual:N0}")
            };

            var shapes = new List<OpenXmlElement> { NvGroupProps(), new GroupShapeProperties(new D.TransformGroup()) };
            shapes.Add(MakeTextBox(1, "heading", 457200, 200000, 8229600, 500000, "KPI Summary", 2800, bold: true, colorHex: "1565C0"));

            for (int i = 0; i < kpiData.Length; i++)
            {
                int col = i % 3;
                int row = i / 3;
                long x = 457200 + col * 2800000L;
                long y = 800000 + row * 1600000L;
                shapes.Add(MakeKpiBox((uint)(i + 2), x, y, 2600000, 1300000, kpiData[i].Item1, kpiData[i].Item2));
            }

            return new P.Slide(
                new P.CommonSlideData(new ShapeTree(shapes.ToArray())),
                new P.ColorMapOverride(new MasterColorMapping()));
        }

        private static P.Slide BuildMonthlyTrendSlide(List<MonthlyTrendPoint> trend)
        {
            var shapes = new List<OpenXmlElement> { NvGroupProps(), new GroupShapeProperties(new D.TransformGroup()) };
            shapes.Add(MakeTextBox(1, "heading", 457200, 200000, 8229600, 500000, "Budget vs Actual — Monthly Trend", 2800, bold: true, colorHex: "1565C0"));

            if (trend.Any())
            {
                var headers = new[] { "Month", "Planned", "Actual" };
                var rows = trend.Select(t => new[] { t.Month, $"${t.Planned:N0}", $"${t.Actual:N0}" }).ToList();
                shapes.Add(MakeTable((uint)2, 457200, 800000, 8229600, 4000000, headers, rows));
            }
            return new P.Slide(
                new P.CommonSlideData(new ShapeTree(shapes.ToArray())),
                new P.ColorMapOverride(new MasterColorMapping()));
        }

        private static P.Slide BuildDeptSlide(IEnumerable<DepartmentBreakdownDto> departments)
        {
            var shapes = new List<OpenXmlElement> { NvGroupProps(), new GroupShapeProperties(new D.TransformGroup()) };
            shapes.Add(MakeTextBox(1, "heading", 457200, 200000, 8229600, 500000, "Department Breakdown", 2800, bold: true, colorHex: "1565C0"));

            var headers = new[] { "Department", "Planned", "Actual", "Variance", "Utilization %" };
            var rows = departments.Take(12).Select(d => new[]
            {
                d.Department,
                $"${d.PlannedBudget:N0}",
                $"${d.ActualSpend:N0}",
                $"${d.Variance:N0}",
                $"{d.UtilizationPct:N1}%"
            }).ToList();
            shapes.Add(MakeTable((uint)2, 457200, 800000, 8229600, 4100000, headers, rows));

            return new P.Slide(
                new P.CommonSlideData(new ShapeTree(shapes.ToArray())),
                new P.ColorMapOverride(new MasterColorMapping()));
        }

        private static P.Slide BuildVendorSlide(IEnumerable<VendorSpendDto> vendors)
        {
            var shapes = new List<OpenXmlElement> { NvGroupProps(), new GroupShapeProperties(new D.TransformGroup()) };
            shapes.Add(MakeTextBox(1, "heading", 457200, 200000, 8229600, 500000, "Top Vendors by Spend", 2800, bold: true, colorHex: "1565C0"));

            var headers = new[] { "Vendor", "Total Spend", "Transactions" };
            var rows = vendors.OrderByDescending(v => v.TotalSpend).Take(12).Select(v => new[]
            {
                v.VendorName,
                $"${v.TotalSpend:N0}",
                v.TransactionCount.ToString()
            }).ToList();
            shapes.Add(MakeTable((uint)2, 457200, 800000, 8229600, 4100000, headers, rows));

            return new P.Slide(
                new P.CommonSlideData(new ShapeTree(shapes.ToArray())),
                new P.ColorMapOverride(new MasterColorMapping()));
        }

        private static P.Slide BuildCphSlide(CostPerHireDto cph)
        {
            var shapes = new List<OpenXmlElement> { NvGroupProps(), new GroupShapeProperties(new D.TransformGroup()) };
            shapes.Add(MakeTextBox(1, "heading", 457200, 200000, 8229600, 500000, "Cost Per Hire Breakdown", 2800, bold: true, colorHex: "1565C0"));
            shapes.Add(MakeTextBox(2, "summary", 457200, 780000, 4000000, 400000,
                $"Overall CPH: ${cph.OverallCostPerHire:N0}  |  Target: ${cph.TargetCostPerHire:N0}  |  Hires: {cph.TotalHires}", 1800));

            var headers = new[] { "Category", "Amount", "% of Total" };
            var rows = cph.ByCategory.Take(10).Select(c => new[]
            {
                c.Category,
                $"${c.Amount:N0}",
                $"{c.PctOfTotal:N1}%"
            }).ToList();
            shapes.Add(MakeTable((uint)3, 457200, 1300000, 8229600, 3600000, headers, rows));

            return new P.Slide(
                new P.CommonSlideData(new ShapeTree(shapes.ToArray())),
                new P.ColorMapOverride(new MasterColorMapping()));
        }

        // ── OpenXml helper builders ───────────────────────────────────────────

        private static P.NonVisualGroupShapeProperties NvGroupProps() =>
            new P.NonVisualGroupShapeProperties(
                new P.NonVisualDrawingProperties { Id = 1, Name = "" },
                new P.NonVisualGroupShapeDrawingProperties(),
                new ApplicationNonVisualDrawingProperties());

        private static P.Shape MakeTextBox(uint id, string name, long x, long y, long cx, long cy,
            string text, int fontSize, bool bold = false, string? colorHex = null)
        {
            var runProps = new D.RunProperties { Language = "en-US", FontSize = fontSize, Bold = bold };
            if (colorHex != null)
                runProps.Append(new D.SolidFill(new D.RgbColorModelHex { Val = colorHex }));

            return new P.Shape(
                new P.NonVisualShapeProperties(
                    new P.NonVisualDrawingProperties { Id = id, Name = name },
                    new P.NonVisualShapeDrawingProperties(new D.ShapeLocks { NoGrouping = true }),
                    new ApplicationNonVisualDrawingProperties(new PlaceholderShape())),
                new P.ShapeProperties(
                    new D.Transform2D(
                        new D.Offset { X = x, Y = y },
                        new D.Extents { Cx = cx, Cy = cy })),
                new P.TextBody(
                    new D.BodyProperties(),
                    new D.ListStyle(),
                    new D.Paragraph(new D.Run(runProps, new D.Text(text)))));
        }

        private static P.Shape MakeKpiBox(uint id, long x, long y, long cx, long cy, string label, string value)
        {
            return new P.Shape(
                new P.NonVisualShapeProperties(
                    new P.NonVisualDrawingProperties { Id = id, Name = label },
                    new P.NonVisualShapeDrawingProperties(),
                    new ApplicationNonVisualDrawingProperties()),
                new P.ShapeProperties(
                    new D.Transform2D(new D.Offset { X = x, Y = y }, new D.Extents { Cx = cx, Cy = cy }),
                    new D.PresetGeometry(new D.AdjustValueList()) { Preset = D.ShapeTypeValues.Rectangle },
                    new D.SolidFill(new D.RgbColorModelHex { Val = "EEF4FB" }),
                    new D.Outline(new D.SolidFill(new D.RgbColorModelHex { Val = "1565C0" })) { Width = 12700 }),
                new P.TextBody(
                    new D.BodyProperties { Anchor = D.TextAnchoringTypeValues.Center },
                    new D.ListStyle(),
                    new D.Paragraph(
                        new D.ParagraphProperties { Alignment = D.TextAlignmentTypeValues.Center },
                        new D.Run(
                            new D.RunProperties { Language = "en-US", FontSize = 2400, Bold = true },
                            new D.Text(value))),
                    new D.Paragraph(
                        new D.ParagraphProperties { Alignment = D.TextAlignmentTypeValues.Center },
                        new D.Run(
                            new D.RunProperties { Language = "en-US", FontSize = 1400 },
                            new D.Text(label)))));
        }

        private static D.Table MakeRawTable(string[] headers, List<string[]> rows)
        {
            var table = new D.Table();
            var tableProps = new D.TableProperties { FirstRow = true };
            table.Append(tableProps);

            var tableGrid = new D.TableGrid();
            int colCount = headers.Length;
            for (int i = 0; i < colCount; i++)
                tableGrid.Append(new D.GridColumn { Width = 1200000L });
            table.Append(tableGrid);

            // Header row
            var headerRow = new D.TableRow { Height = 370840 };
            foreach (var h in headers)
            {
                var cell = new D.TableCell();
                var tcp = new D.TableCellProperties();
                tcp.Append(new D.SolidFill(new D.RgbColorModelHex { Val = "1565C0" }));
                cell.Append(new D.TextBody(
                    new D.BodyProperties(),
                    new D.ListStyle(),
                    new D.Paragraph(new D.Run(
                        new D.RunProperties { Language = "en-US", FontSize = 1200, Bold = true,
                            Dirty = false,
                            SmartTagClean = false },
                        new D.Text(h)))));
                cell.Append(tcp);
                headerRow.Append(cell);
            }
            table.Append(headerRow);

            // Data rows
            bool alt = false;
            foreach (var row in rows)
            {
                var tr = new D.TableRow { Height = 370840 };
                foreach (var cell in row)
                {
                    var tc = new D.TableCell();
                    if (alt)
                    {
                        var tcp = new D.TableCellProperties();
                        tcp.Append(new D.SolidFill(new D.RgbColorModelHex { Val = "EEF4FB" }));
                        tc.Append(tcp);
                    }
                    tc.Append(new D.TextBody(
                        new D.BodyProperties(),
                        new D.ListStyle(),
                        new D.Paragraph(new D.Run(
                            new D.RunProperties { Language = "en-US", FontSize = 1100 },
                            new D.Text(cell ?? "")))));
                    tr.Append(tc);
                }
                table.Append(tr);
                alt = !alt;
            }
            return table;
        }

        private static P.GraphicFrame MakeTable(uint id, long x, long y, long cx, long cy,
            string[] headers, List<string[]> rows)
        {
            var gf = new P.GraphicFrame(
                new P.NonVisualGraphicFrameProperties(
                    new P.NonVisualDrawingProperties { Id = id, Name = $"Table{id}" },
                    new P.NonVisualGraphicFrameDrawingProperties(new D.GraphicFrameLocks { NoGrouping = true }),
                    new ApplicationNonVisualDrawingProperties()),
                new P.Transform(
                    new D.Offset { X = x, Y = y },
                    new D.Extents { Cx = cx, Cy = cy }),
                new D.Graphic(
                    new D.GraphicData(MakeRawTable(headers, rows))
                    { Uri = "http://schemas.openxmlformats.org/drawingml/2006/table" }));
            return gf;
        }
    }
}
