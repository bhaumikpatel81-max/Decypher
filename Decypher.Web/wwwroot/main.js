"use strict";
(self["webpackChunkdecypher_frontend"] = self["webpackChunkdecypher_frontend"] || []).push([["main"],{

/***/ 5764:
/*!********************************************************!*\
  !*** ./src/app/ai-scorecard/ai-scorecard.component.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AIScorecardComponent: () => (/* binding */ AIScorecardComponent)
/* harmony export */ });
/* harmony import */ var C_Users_bhaumik_patel_Desktop_Decypher_Dechypher_v1_Decypher_v1_angular_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 4456);






const _c0 = ["jdFileInput"];
const _c1 = ["resumeFileInput"];
function AIScorecardComponent_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AIScorecardComponent_button_7_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r2);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.exportResults());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Export JSON");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function AIScorecardComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" \u26A0 ", ctx_r2.errorMessage, " ");
  }
}
function AIScorecardComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" \uD83D\uDD0D Human Review Required \u2014 ", ctx_r2.results.humanReviewReason, " ");
  }
}
function AIScorecardComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 27)(1, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "\uD83D\uDCCE");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Upload JD or ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "browse");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "PDF \u00B7 DOCX \u00B7 DOC \u00B7 JPG \u00B7 PNG");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}
function AIScorecardComponent_div_18_span_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "\u23F3 Extracting...");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function AIScorecardComponent_div_18_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "\u2714 Ready");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function AIScorecardComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 32)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, AIScorecardComponent_div_18_span_5_Template, 2, 0, "span", 34)(6, AIScorecardComponent_div_18_span_6_Template, 2, 0, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AIScorecardComponent_div_18_Template_button_click_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r5);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.clearJdFile($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "\u2715");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r2.jdFileIcon);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r2.jdFile.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r2.jdExtracting);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx_r2.jdExtracting && ctx_r2.jdText);
  }
}
function AIScorecardComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("\u26A0 ", ctx_r2.jdExtractError, "");
  }
}
function AIScorecardComponent_div_30_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 27)(1, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "\uD83D\uDCCE");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Upload Resume or ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "browse");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "PDF \u00B7 DOCX \u00B7 DOC \u00B7 JPG \u00B7 PNG");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}
function AIScorecardComponent_div_31_span_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "\u23F3 Extracting...");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function AIScorecardComponent_div_31_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "\u2714 Ready");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function AIScorecardComponent_div_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 32)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, AIScorecardComponent_div_31_span_5_Template, 2, 0, "span", 34)(6, AIScorecardComponent_div_31_span_6_Template, 2, 0, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AIScorecardComponent_div_31_Template_button_click_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r7);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.clearResumeFile($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "\u2715");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r2.resumeFileIcon);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r2.resumeFile.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r2.resumeExtracting);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx_r2.resumeExtracting && ctx_r2.resumeText);
  }
}
function AIScorecardComponent_div_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("\u26A0 ", ctx_r2.resumeExtractError, "");
  }
}
function AIScorecardComponent_span_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "\u26A1 Run AI Agents");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function AIScorecardComponent_span_40_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "\uD83D\uDD04 Processing...");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function AIScorecardComponent_div_41_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 42)(1, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const a_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", a_r8.status);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](a_r8.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](a_r8.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](a_r8.statusText);
  }
}
function AIScorecardComponent_div_41_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, AIScorecardComponent_div_41_div_1_Template, 7, 4, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r2.agents);
  }
}
function AIScorecardComponent_div_42_div_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 47)(1, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Behavioral Score");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "svg", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "circle", 50)(5, "circle", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "text", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "Avg. of 8 skills");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("stroke", ctx_r2.getGaugeColour(ctx_r2.getBehavioralAverage(ctx_r2.results.behavioral.scores)))("stroke-dasharray", ctx_r2.getBehavioralAverage(ctx_r2.results.behavioral.scores) / 100 * 314 + " 314");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("fill", ctx_r2.getGaugeColour(ctx_r2.getBehavioralAverage(ctx_r2.results.behavioral.scores)));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r2.getBehavioralAverage(ctx_r2.results.behavioral.scores), "% ");
  }
}
function AIScorecardComponent_div_42_div_43_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const skill_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](skill_r9);
  }
}
function AIScorecardComponent_div_42_div_43_em_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "em", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "None identified");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function AIScorecardComponent_div_42_div_43_span_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const skill_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](skill_r10);
  }
}
function AIScorecardComponent_div_42_div_43_em_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "em", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "None \u2014 great match!");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function AIScorecardComponent_div_42_div_43_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 55)(1, "h3", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Skills Gap Analysis");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 70)(4, "div")(5, "div", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Matched Skills");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, AIScorecardComponent_div_42_div_43_span_8_Template, 2, 1, "span", 73)(9, AIScorecardComponent_div_42_div_43_em_9_Template, 2, 0, "em", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "div")(11, "div", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Missing Skills");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](14, AIScorecardComponent_div_42_div_43_span_14_Template, 2, 1, "span", 76)(15, AIScorecardComponent_div_42_div_43_em_15_Template, 2, 0, "em", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r2.results.matchedSkills);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !(ctx_r2.results.matchedSkills == null ? null : ctx_r2.results.matchedSkills.length));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r2.results.missingSkills);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !(ctx_r2.results.missingSkills == null ? null : ctx_r2.results.missingSkills.length));
  }
}
function AIScorecardComponent_div_42_div_68__svg_line_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "line", 106);
  }
  if (rf & 2) {
    const ax_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("x2", ax_r11.x2)("y2", ax_r11.y2);
  }
}
function AIScorecardComponent_div_42_div_68__svg_circle_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "circle", 107);
  }
  if (rf & 2) {
    const dot_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("cx", dot_r12.x)("cy", dot_r12.y);
  }
}
function AIScorecardComponent_div_42_div_68_div_41_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 118)(1, "span", 119);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "\uD83D\uDCA1");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const skill_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r2.results.behavioral.evidence[skill_r14.key] || "No specific evidence found in CV.", " ");
  }
}
function AIScorecardComponent_div_42_div_68_div_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 108)(1, "div", 109)(2, "span", 110)(3, "span", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 112)(7, "span", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "button", 114);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AIScorecardComponent_div_42_div_68_div_41_Template_button_click_9_listener() {
      const skill_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r13).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.toggleEvidence(skill_r14.key));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](12, "div", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](13, AIScorecardComponent_div_42_div_68_div_41_div_13_Template, 4, 1, "div", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const skill_r14 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](skill_r14.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", skill_r14.label, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", ctx_r2.getBehavioralScoreClass(ctx_r2.results.behavioral.scores[skill_r14.key]));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r2.results.behavioral.scores[skill_r14.key], " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("title", ctx_r2.expandedEvidence[skill_r14.key] ? "Hide evidence" : "Show evidence");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r2.expandedEvidence[skill_r14.key] ? "\u25B2" : "\u25BC", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("width", ctx_r2.results.behavioral.scores[skill_r14.key], "%")("background", ctx_r2.getBehavioralBarColor(ctx_r2.results.behavioral.scores[skill_r14.key]));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r2.expandedEvidence[skill_r14.key]);
  }
}
function AIScorecardComponent_div_42_div_68_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 80)(1, "div", 81)(2, "div")(3, "h3", 82)(4, "span", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "\uD83E\uDDE0");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, " Behavioral Intelligence ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "p", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "Inferred soft skills from CV language, achievements & career patterns");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 85)(10, "div", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "Behavioral Archetype");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "div", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "div", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "div", 89)(17, "div", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "svg", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](19, "polygon", 92)(20, "polygon", 92)(21, "polygon", 92)(22, "polygon", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](23, AIScorecardComponent_div_42_div_68__svg_line_23_Template, 1, 2, "line", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](24, "polygon", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](25, AIScorecardComponent_div_42_div_68__svg_circle_25_Template, 1, 2, "circle", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "div", 97)(27, "span", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28, "25");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "span", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](30, "50");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "span", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](32, "75");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](33, "span", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](34, "100");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](35, "div", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](36, " Confidence:\u00A0");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](37, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](38);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](39, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](40, "div", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](41, AIScorecardComponent_div_42_div_68_div_41_Template, 14, 11, "div", 102);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](42, "div", 103)(43, "div", 104);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](44, "Behavioral Profile Summary");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](45, "p", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](46);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("background", ctx_r2.getBehavioralArchetype(ctx_r2.results.behavioral.scores).color + "18")("border-color", ctx_r2.getBehavioralArchetype(ctx_r2.results.behavioral.scores).color)("color", ctx_r2.getBehavioralArchetype(ctx_r2.results.behavioral.scores).color);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r2.getBehavioralArchetype(ctx_r2.results.behavioral.scores).title);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r2.getBehavioralArchetype(ctx_r2.results.behavioral.scores).description);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("points", ctx_r2.getRadarBackground(0.25));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("points", ctx_r2.getRadarBackground(0.5));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("points", ctx_r2.getRadarBackground(0.75));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("points", ctx_r2.getRadarBackground(1));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r2.getRadarAxes());
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("points", ctx_r2.getRadarPoints(ctx_r2.results.behavioral.scores));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r2.getBehavioralRadarDots(ctx_r2.results.behavioral.scores));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](39, 18, ctx_r2.results.behavioral.confidence * 100, "1.0-0"), "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r2.behavioralSkills);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r2.results.behavioral.summary);
  }
}
function AIScorecardComponent_div_42_div_77_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 120)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span")(4, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const c_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](c_r15.passed ? "\u2705" : "\u26A0\uFE0F");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", c_r15.label, ":");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", c_r15.passed ? "No bias detected" : c_r15.detail, "");
  }
}
function AIScorecardComponent_div_42_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div")(1, "div", 46)(2, "div", 47)(3, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "CV \u2194 JD Match");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "svg", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "circle", 50)(7, "circle", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "text", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "div", 47)(11, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Competency Score");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "svg", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](14, "circle", 50)(15, "circle", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "text", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](18, AIScorecardComponent_div_42_div_18_Template, 10, 4, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "div", 47)(20, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21, "Overall Score");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "svg", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](23, "circle", 50)(24, "circle", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "text", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "div", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "div", 55)(30, "h3", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](31, "Risk Indicators");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](32, "div", 56)(33, "div", 57)(34, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](35, "\u2696\uFE0F Bias Risk");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](36, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](37);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](38, "div", 57)(39, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](40, "\uD83D\uDEAA Dropout Risk");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](41, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](42);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](43, AIScorecardComponent_div_42_div_43_Template, 16, 4, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](44, "div", 55)(45, "h3", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](46, "Score Breakdown");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](47, "div", 59)(48, "div", 60)(49, "div", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](50);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](51, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](52, "Skills Match");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](53, "div", 60)(54, "div", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](55);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](56, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](57, "Experience");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](58, "div", 60)(59, "div", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](60);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](61, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](62, "Education");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](63, "div", 60)(64, "div", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](65);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](66, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](67, "Culture Fit");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](68, AIScorecardComponent_div_42_div_68_Template, 47, 21, "div", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](69, "div", 55)(70, "h3", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](71, "Bias Safety Analysis");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](72, "div", 64)(73, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](74);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](75, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](76, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](77, AIScorecardComponent_div_42_div_77_Template, 7, 3, "div", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](78, "div", 55)(79, "h3", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](80, "AI Explanation");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](81, "div", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](82);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](83, "div", 69)(84, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](85);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](86, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](87);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](88, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](89);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](90, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("stroke", ctx_r2.getGaugeColour(ctx_r2.results.cvJdMatchScore))("stroke-dasharray", ctx_r2.results.cvJdMatchScore / 100 * 314 + " 314");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("fill", ctx_r2.getGaugeColour(ctx_r2.results.cvJdMatchScore));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx_r2.results.cvJdMatchScore, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("stroke", ctx_r2.getGaugeColour(ctx_r2.results.competencyScore))("stroke-dasharray", ctx_r2.results.competencyScore / 100 * 314 + " 314");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("fill", ctx_r2.getGaugeColour(ctx_r2.results.competencyScore));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx_r2.results.competencyScore, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r2.results.behavioral);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("stroke", ctx_r2.getGaugeColour(ctx_r2.results.overallScore))("stroke-dasharray", ctx_r2.results.overallScore / 100 * 314 + " 314");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("fill", ctx_r2.getGaugeColour(ctx_r2.results.overallScore));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx_r2.results.overallScore, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r2.getConfidenceLabel(ctx_r2.results.confidence));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", ctx_r2.getRiskClass(ctx_r2.results.biasRiskLevel));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r2.results.biasRiskLevel);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", ctx_r2.getRiskClass(ctx_r2.results.dropoutRiskLevel));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r2.results.dropoutRiskLevel);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (ctx_r2.results.matchedSkills == null ? null : ctx_r2.results.matchedSkills.length) || (ctx_r2.results.missingSkills == null ? null : ctx_r2.results.missingSkills.length));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx_r2.results.breakdown == null ? null : ctx_r2.results.breakdown.skillsMatch, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx_r2.results.breakdown == null ? null : ctx_r2.results.breakdown.experienceMatch, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx_r2.results.breakdown == null ? null : ctx_r2.results.breakdown.educationMatch, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx_r2.results.breakdown == null ? null : ctx_r2.results.breakdown.cultureFit, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r2.results.behavioral);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", ctx_r2.getBiasClass(ctx_r2.results.biasScore));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](75, 31, ctx_r2.results.biasScore * 100, "1.0-0"), "% Bias-Free");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r2.results.biasChecks);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r2.results.explanation);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("Model: ", ctx_r2.results.modelVersion, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("Prompt Version: ", ctx_r2.results.promptVersion, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("Generated: ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](90, 34, ctx_r2.results.timestamp, "medium"), "");
  }
}
class AIScorecardComponent {
  constructor(http) {
    this.http = http;
    this.jdText = '';
    this.resumeText = '';
    this.isProcessing = false;
    this.results = null;
    this.errorMessage = '';
    // JD file upload
    this.jdFile = null;
    this.jdExtracting = false;
    this.jdExtractError = '';
    this.jdDragOver = false;
    // Resume file upload
    this.resumeFile = null;
    this.resumeExtracting = false;
    this.resumeExtractError = '';
    this.resumeDragOver = false;
    // Behavioral evidence expand/collapse state
    this.expandedEvidence = {};
    this.behavioralSkills = [{
      key: 'problemSolving',
      label: 'Problem Solving',
      icon: '🧩'
    }, {
      key: 'criticalThinking',
      label: 'Critical Thinking',
      icon: '🔬'
    }, {
      key: 'ownership',
      label: 'Ownership',
      icon: '🎯'
    }, {
      key: 'leadership',
      label: 'Leadership',
      icon: '👑'
    }, {
      key: 'communication',
      label: 'Communication',
      icon: '💬'
    }, {
      key: 'integrity',
      label: 'Integrity',
      icon: '🛡️'
    }, {
      key: 'adaptability',
      label: 'Adaptability',
      icon: '🔄'
    }, {
      key: 'collaboration',
      label: 'Collaboration',
      icon: '🤝'
    }];
    this.agents = [{
      name: 'Parsing Agent',
      icon: '📄',
      status: 'pending',
      statusText: 'Waiting...'
    }, {
      name: 'Matching Agent',
      icon: '🔍',
      status: 'pending',
      statusText: 'Waiting...'
    }, {
      name: 'Ranking Agent',
      icon: '📊',
      status: 'pending',
      statusText: 'Waiting...'
    }, {
      name: 'Behavioral Intelligence Agent',
      icon: '🧠',
      status: 'pending',
      statusText: 'Waiting...'
    }, {
      name: 'Explanation Agent',
      icon: '💬',
      status: 'pending',
      statusText: 'Waiting...'
    }, {
      name: 'Bias Detection Agent',
      icon: '⚖️',
      status: 'pending',
      statusText: 'Waiting...'
    }];
  }
  runAIAgents() {
    var _this = this;
    return (0,C_Users_bhaumik_patel_Desktop_Decypher_Dechypher_v1_Decypher_v1_angular_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this.jdText.trim() || !_this.resumeText.trim()) {
        _this.errorMessage = 'Please provide both Job Description and Resume text.';
        return;
      }
      _this.isProcessing = true;
      _this.results = null;
      _this.errorMessage = '';
      _this.expandedEvidence = {};
      _this.resetAgents();
      for (let i = 0; i < _this.agents.length; i++) {
        _this.agents[i].status = 'processing';
        _this.agents[i].statusText = 'Processing...';
        yield _this.delay(400);
      }
      try {
        const response = yield _this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.apiUrl}/api/aiagents/run-screening`, {
          jobDescription: _this.jdText,
          resumeText: _this.resumeText
        }).toPromise();
        _this.agents.forEach(a => {
          a.status = 'complete';
          a.statusText = 'Complete';
        });
        _this.results = _this.mapResults(response);
      } catch (err) {
        _this.agents.forEach(a => {
          if (a.status === 'processing') {
            a.status = 'failed';
            a.statusText = 'Failed';
          }
        });
        _this.errorMessage = err?.error?.error ?? 'AI processing failed. Please try again.';
      } finally {
        _this.isProcessing = false;
      }
    })();
  }
  mapResults(r) {
    const ranking = r.rankingResult?.data ?? {};
    const explanation = r.explanationResult?.data ?? {};
    const bias = r.biasDetectionResult?.data ?? {};
    const matching = r.matchingResult?.data ?? {};
    const behavData = r.behavioralResult?.data;
    const cvJdMatchScore = matching.matchPercentage ?? 0;
    const competencyScore = ranking.breakdown?.skillsMatch ?? 0;
    const biasScore = bias.overallBiasFreeScore ?? 1;
    const dropoutRisk = ranking.breakdown?.dropoutRisk ?? 0;
    const behavioral = behavData ? {
      scores: behavData.behavioralScores ?? {},
      evidence: behavData.evidence ?? {},
      summary: behavData.summary ?? '',
      confidence: behavData.confidence ?? 0
    } : null;
    return {
      overallScore: ranking.overallScore ?? 0,
      cvJdMatchScore,
      competencyScore,
      behavioral,
      biasRiskLevel: biasScore >= 0.9 ? 'Low' : biasScore >= 0.7 ? 'Medium' : 'High',
      dropoutRiskLevel: dropoutRisk < 40 ? 'Low' : dropoutRisk < 70 ? 'Medium' : 'High',
      matchedSkills: matching.matchedSkills ?? [],
      missingSkills: matching.missingSkills ?? [],
      confidence: r.rankingResult?.confidence ?? 0,
      requiresHumanReview: r.requiresHumanReview,
      humanReviewReason: r.humanReviewReason,
      breakdown: ranking.breakdown ?? {},
      explanation: explanation.explanation ?? 'No explanation generated.',
      biasScore,
      biasChecks: [{
        passed: !bias.genderBias?.detected,
        label: 'Gender Bias',
        detail: bias.genderBias?.details ?? '—'
      }, {
        passed: !bias.locationBias?.detected,
        label: 'Location Bias',
        detail: bias.locationBias?.details ?? '—'
      }, {
        passed: !bias.collegeBias?.detected,
        label: 'College Bias',
        detail: bias.collegeBias?.details ?? '—'
      }, {
        passed: !bias.ageBias?.detected,
        label: 'Age Bias',
        detail: bias.ageBias?.details ?? '—'
      }],
      modelVersion: r.explanationResult?.modelVersion ?? '—',
      promptVersion: r.explanationResult?.promptVersion ?? '—',
      timestamp: r.timestamp
    };
  }
  // ── Behavioral Intelligence helpers ──────────────────────────
  toggleEvidence(key) {
    this.expandedEvidence[key] = !this.expandedEvidence[key];
  }
  /** SVG polygon points for the score shape */
  getRadarPoints(scores) {
    if (!scores) return '';
    return this.behavioralSkills.map((skill, i) => {
      const {
        x,
        y
      } = this.polarToCartesian(i, (scores[skill.key] ?? 50) / 100);
      return `${x},${y}`;
    }).join(' ');
  }
  /** SVG polygon points for a background ring (0–1 fraction of max) */
  getRadarBackground(fraction) {
    return Array.from({
      length: 8
    }, (_, i) => {
      const {
        x,
        y
      } = this.polarToCartesian(i, fraction);
      return `${x},${y}`;
    }).join(' ');
  }
  /** SVG axis line endpoints (from center to outer vertex) */
  getRadarAxes() {
    return Array.from({
      length: 8
    }, (_, i) => {
      const {
        x,
        y
      } = this.polarToCartesian(i, 1);
      return {
        x2: x,
        y2: y
      };
    });
  }
  /** SVG dot positions for individual skill scores */
  getBehavioralRadarDots(scores) {
    if (!scores) return [];
    return this.behavioralSkills.map((skill, i) => this.polarToCartesian(i, (scores[skill.key] ?? 50) / 100));
  }
  /** Returns archetype title, description, and accent color from top skills */
  getBehavioralArchetype(scores) {
    if (!scores) return {
      title: 'Evaluating...',
      description: '',
      color: '#6b7280'
    };
    const entries = Object.entries(scores);
    const top3 = new Set(entries.sort((a, b) => b[1] - a[1]).slice(0, 3).map(p => p[0]));
    if (top3.has('leadership') && top3.has('ownership')) return {
      title: 'Visionary Leader',
      description: 'Drives teams with clarity and accountability',
      color: '#7c3aed'
    };
    if (top3.has('problemSolving') && top3.has('criticalThinking')) return {
      title: 'Analytical Innovator',
      description: 'Tackles complexity with systematic thinking',
      color: '#0891b2'
    };
    if (top3.has('collaboration') && top3.has('communication')) return {
      title: 'Trusted Collaborator',
      description: 'Builds bridges with reliability and empathy',
      color: '#059669'
    };
    if (top3.has('ownership') && top3.has('adaptability')) return {
      title: 'Accountable Achiever',
      description: 'Takes charge and delivers in dynamic environments',
      color: '#d97706'
    };
    if (top3.has('adaptability') && top3.has('criticalThinking')) return {
      title: 'Strategic Adapter',
      description: 'Evolves with change while staying analytically sharp',
      color: '#db2777'
    };
    if (top3.has('integrity')) return {
      title: 'Principled Executor',
      description: 'Consistent, trustworthy, and dependable',
      color: '#16a34a'
    };
    return {
      title: 'Versatile Professional',
      description: 'Balanced across multiple behavioral dimensions',
      color: '#6b7280'
    };
  }
  getBehavioralScoreClass(score) {
    return score >= 75 ? 'bscore-high' : score >= 50 ? 'bscore-mid' : 'bscore-low';
  }
  getBehavioralBarColor(score) {
    return score >= 75 ? 'linear-gradient(90deg,#10b981,#34d399)' : score >= 50 ? 'linear-gradient(90deg,#f59e0b,#fbbf24)' : 'linear-gradient(90deg,#ef4444,#f87171)';
  }
  getBehavioralAverage(scores) {
    if (!scores) return 0;
    const vals = Object.values(scores);
    return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
  }
  polarToCartesian(index, fraction) {
    const cx = 100,
      cy = 100,
      maxR = 75;
    const angle = (index * 45 - 90) * Math.PI / 180;
    const r = fraction * maxR;
    return {
      x: +(cx + r * Math.cos(angle)).toFixed(2),
      y: +(cy + r * Math.sin(angle)).toFixed(2)
    };
  }
  // ── Existing helpers ─────────────────────────────────────────
  fileIconFor(file) {
    const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
    return {
      pdf: '📄',
      docx: '📝',
      doc: '📝',
      jpg: '🖼️',
      jpeg: '🖼️',
      png: '🖼️'
    }[ext] ?? '📎';
  }
  get jdFileIcon() {
    return this.jdFile ? this.fileIconFor(this.jdFile) : '';
  }
  get resumeFileIcon() {
    return this.resumeFile ? this.fileIconFor(this.resumeFile) : '';
  }
  extractFile(file, onText, onError, onDone) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.apiUrl}/api/resume-parser/extract-text`, {
        fileData: base64,
        fileName: file.name,
        mimeType: file.type
      }).subscribe({
        next: r => {
          onText(r.text);
          onDone();
        },
        error: err => {
          onError(err?.error?.error ?? 'Extraction failed');
          onDone();
        }
      });
    };
    reader.readAsDataURL(file);
  }
  onJdFileSelect(e) {
    const f = e.target.files?.[0];
    if (f) this.loadJdFile(f);
  }
  onJdDrop(e) {
    e.preventDefault();
    this.jdDragOver = false;
    const f = e.dataTransfer?.files[0];
    if (f) this.loadJdFile(f);
  }
  loadJdFile(file) {
    this.jdFile = file;
    this.jdExtracting = true;
    this.jdExtractError = '';
    this.jdText = '';
    this.extractFile(file, t => this.jdText = t, e => this.jdExtractError = e, () => this.jdExtracting = false);
  }
  clearJdFile(e) {
    e.stopPropagation();
    this.jdFile = null;
    this.jdText = '';
    this.jdExtractError = '';
    if (this.jdFileInput?.nativeElement) this.jdFileInput.nativeElement.value = '';
  }
  onResumeFileSelect(e) {
    const f = e.target.files?.[0];
    if (f) this.loadResumeFile(f);
  }
  onResumeDrop(e) {
    e.preventDefault();
    this.resumeDragOver = false;
    const f = e.dataTransfer?.files[0];
    if (f) this.loadResumeFile(f);
  }
  loadResumeFile(file) {
    this.resumeFile = file;
    this.resumeExtracting = true;
    this.resumeExtractError = '';
    this.resumeText = '';
    this.extractFile(file, t => this.resumeText = t, e => this.resumeExtractError = e, () => this.resumeExtracting = false);
  }
  clearResumeFile(e) {
    e.stopPropagation();
    this.resumeFile = null;
    this.resumeText = '';
    this.resumeExtractError = '';
    if (this.resumeFileInput?.nativeElement) this.resumeFileInput.nativeElement.value = '';
  }
  getGaugeColour(score) {
    return score >= 70 ? '#10b981' : score >= 40 ? '#f59e0b' : '#ef4444';
  }
  getRiskClass(level) {
    return level === 'Low' ? 'risk-low' : level === 'Medium' ? 'risk-medium' : 'risk-high';
  }
  getConfidenceClass(c) {
    return c >= 0.8 ? 'high' : c >= 0.6 ? 'medium' : 'low';
  }
  getConfidenceLabel(c) {
    return c >= 0.8 ? 'High Confidence' : c >= 0.6 ? 'Medium Confidence' : 'Low Confidence — Human Review Required';
  }
  getBiasClass(s) {
    return s >= 0.9 ? 'safe' : s >= 0.7 ? 'warning' : 'alert';
  }
  exportResults() {
    const blob = new Blob([JSON.stringify(this.results, null, 2)], {
      type: 'application/json'
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `ai-scorecard-${Date.now()}.json`;
    a.click();
  }
  resetAgents() {
    this.agents.forEach(a => {
      a.status = 'pending';
      a.statusText = 'Waiting...';
    });
  }
  delay(ms) {
    return new Promise(r => setTimeout(r, ms));
  }
  static {
    this.ɵfac = function AIScorecardComponent_Factory(t) {
      return new (t || AIScorecardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: AIScorecardComponent,
      selectors: [["app-ai-scorecard"]],
      viewQuery: function AIScorecardComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c1, 5);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.jdFileInput = _t.first);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.resumeFileInput = _t.first);
        }
      },
      decls: 43,
      vars: 24,
      consts: [["jdFileInput", ""], ["resumeFileInput", ""], [1, "page-container", "page-enter"], [1, "flex", "justify-between", "items-center", "mb-6"], [1, "page-title"], [1, "text-sm", 2, "color", "var(--text-3)"], ["class", "btn btn-secondary", 3, "click", 4, "ngIf"], ["class", "human-review-banner", "style", "border-color:var(--sla-overdue);background:rgba(239,68,68,0.08);color:var(--sla-overdue)", 4, "ngIf"], ["class", "human-review-banner", 4, "ngIf"], [1, "grid", "grid-cols-2", "gap-6", "mb-6"], [1, "card"], [1, "card-title", "mb-4"], [1, "sc-upload-zone", 3, "click", "dragover", "dragleave", "drop"], ["type", "file", "accept", ".pdf,.docx,.doc,.jpg,.jpeg,.png", 2, "display", "none", 3, "change"], ["class", "sc-dz-idle", 4, "ngIf"], ["class", "sc-dz-file", 4, "ngIf"], ["style", "color:#ef4444;font-size:12px;margin:4px 0;", 4, "ngIf"], [1, "sc-or-divider"], ["rows", "8", "placeholder", "Paste job description here...", 1, "input", 3, "ngModelChange", "ngModel"], ["rows", "8", "placeholder", "Paste resume text here...", 1, "input", 3, "ngModelChange", "ngModel"], [1, "text-center", "mb-8"], [1, "btn", "btn-primary", 3, "click", "disabled"], [4, "ngIf"], ["class", "agent-tracker", 4, "ngIf"], [1, "btn", "btn-secondary", 3, "click"], [1, "human-review-banner", 2, "border-color", "var(--sla-overdue)", "background", "rgba(239,68,68,0.08)", "color", "var(--sla-overdue)"], [1, "human-review-banner"], [1, "sc-dz-idle"], [2, "font-size", "22px"], [1, "sc-dz-label"], [1, "sc-dz-link"], [1, "sc-dz-hint"], [1, "sc-dz-file"], [2, "font-size", "13px", "font-weight", "600", "flex", "1", "overflow", "hidden", "text-overflow", "ellipsis", "white-space", "nowrap"], ["style", "font-size:12px;color:var(--text-3);", 4, "ngIf"], ["style", "font-size:12px;color:#10b981;", 4, "ngIf"], [1, "sc-dz-remove", 3, "click"], [2, "font-size", "12px", "color", "var(--text-3)"], [2, "font-size", "12px", "color", "#10b981"], [2, "color", "#ef4444", "font-size", "12px", "margin", "4px 0"], [1, "agent-tracker"], ["class", "agent-card", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "agent-card", 3, "ngClass"], [1, "agent-icon"], [1, "agent-name"], [1, "agent-status"], [1, "score-breakdown", "mb-6", 2, "grid-template-columns", "repeat(4,1fr)"], [1, "card", 2, "text-align", "center", "padding", "24px 16px"], [1, "card-title", "mb-2"], ["viewBox", "0 0 120 120", "width", "100", "height", "100", 2, "margin", "0 auto", "display", "block"], ["cx", "60", "cy", "60", "r", "50", "fill", "none", "stroke", "#e2e8f0", "stroke-width", "12"], ["cx", "60", "cy", "60", "r", "50", "fill", "none", "stroke-width", "12", "stroke-linecap", "round", "stroke-dashoffset", "78.5", "transform", "rotate(-90 60 60)"], ["x", "60", "y", "66", "text-anchor", "middle", "font-size", "22", "font-weight", "800"], ["class", "card", "style", "text-align:center;padding:24px 16px;", 4, "ngIf"], [1, "text-sm", "mt-1", 2, "color", "var(--text-3)"], [1, "card", "mb-6"], [2, "display", "flex", "gap", "16px", "flex-wrap", "wrap"], [1, "risk-badge", 3, "ngClass"], ["class", "card mb-6", 4, "ngIf"], [1, "score-breakdown"], [1, "score-card"], [1, "score-value"], [1, "score-label"], ["class", "card mb-6 behavioral-card", 4, "ngIf"], [1, "bias-card", 3, "ngClass"], [1, "bias-score"], [1, "bias-checks"], ["class", "bias-check-item", 4, "ngFor", "ngForOf"], [1, "ai-explanation"], [1, "model-info"], [2, "display", "grid", "grid-template-columns", "1fr 1fr", "gap", "24px"], [1, "text-sm", "font-bold", "mb-2", 2, "color", "#10b981"], [2, "display", "flex", "flex-wrap", "wrap", "gap", "6px"], ["class", "chip", "style", "background:#d1fae5;color:#065f46;", 4, "ngFor", "ngForOf"], ["style", "color:var(--text-3)", 4, "ngIf"], [1, "text-sm", "font-bold", "mb-2", 2, "color", "#ef4444"], ["class", "chip", "style", "background:#fee2e2;color:#991b1b;", 4, "ngFor", "ngForOf"], [1, "chip", 2, "background", "#d1fae5", "color", "#065f46"], [2, "color", "var(--text-3)"], [1, "chip", 2, "background", "#fee2e2", "color", "#991b1b"], [1, "card", "mb-6", "behavioral-card"], [1, "bi-header"], [1, "card-title", 2, "display", "flex", "align-items", "center", "gap", "8px"], [1, "bi-brain-icon"], [1, "bi-subtitle"], [1, "archetype-badge"], [1, "archetype-label"], [1, "archetype-title"], [1, "archetype-desc"], [1, "bi-body"], [1, "bi-radar-wrap"], ["viewBox", "0 0 200 200", "width", "200", "height", "200", 1, "bi-radar-svg"], ["fill", "none", "stroke", "#e2e8f0", "stroke-width", "0.8"], ["fill", "none", "stroke", "#d1d5db", "stroke-width", "1.2"], ["x1", "100", "y1", "100", "stroke", "#e2e8f0", "stroke-width", "0.8", 4, "ngFor", "ngForOf"], ["fill", "rgba(109,68,240,0.15)", "stroke", "#6d44f0", "stroke-width", "2", "stroke-linejoin", "round", "stroke-linecap", "round"], ["r", "4.5", "fill", "#6d44f0", "stroke", "white", "stroke-width", "2", 4, "ngFor", "ngForOf"], [1, "radar-rings-legend"], [1, "ring-chip", 2, "background", "#f8f0ff", "color", "#6d44f0"], [1, "ring-chip", 2, "background", "#6d44f0", "color", "#fff"], [1, "bi-confidence-pill"], [1, "bi-skills-col"], ["class", "bi-skill-row", 4, "ngFor", "ngForOf"], [1, "bi-summary"], [1, "bi-summary-label"], [1, "bi-summary-text"], ["x1", "100", "y1", "100", "stroke", "#e2e8f0", "stroke-width", "0.8"], ["r", "4.5", "fill", "#6d44f0", "stroke", "white", "stroke-width", "2"], [1, "bi-skill-row"], [1, "bi-skill-header"], [1, "bi-skill-label"], [1, "bi-skill-icon"], [2, "display", "flex", "align-items", "center", "gap", "6px"], [1, "bi-score-badge", 3, "ngClass"], [1, "bi-evidence-btn", 3, "click", "title"], [1, "bi-bar-track"], [1, "bi-bar-fill"], ["class", "bi-evidence-text", 4, "ngIf"], [1, "bi-evidence-text"], [1, "bi-evidence-icon"], [1, "bias-check-item"]],
      template: function AIScorecardComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 2)(1, "div", 3)(2, "div")(3, "h1", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "AI Resume Scorecard");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "p", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "6-agent AI screening \u2014 CV match, competency, behavioral intelligence, bias & dropout risk");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, AIScorecardComponent_button_7_Template, 2, 0, "button", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, AIScorecardComponent_div_8_Template, 2, 1, "div", 7)(9, AIScorecardComponent_div_9_Template, 2, 1, "div", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "div", 9)(11, "div", 10)(12, "h3", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, "Job Description");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "div", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AIScorecardComponent_Template_div_click_14_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            const jdFileInput_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](16);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](jdFileInput_r4.click());
          })("dragover", function AIScorecardComponent_Template_div_dragover_14_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            ctx.jdDragOver = true;
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event.preventDefault());
          })("dragleave", function AIScorecardComponent_Template_div_dragleave_14_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.jdDragOver = false);
          })("drop", function AIScorecardComponent_Template_div_drop_14_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.onJdDrop($event));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "input", 13, 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function AIScorecardComponent_Template_input_change_15_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.onJdFileSelect($event));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](17, AIScorecardComponent_div_17_Template, 9, 0, "div", 14)(18, AIScorecardComponent_div_18_Template, 9, 4, "div", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](19, AIScorecardComponent_div_19_Template, 2, 1, "div", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "div", 17)(21, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22, "or paste text");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "textarea", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function AIScorecardComponent_Template_textarea_ngModelChange_23_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.jdText, $event) || (ctx.jdText = $event);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "div", 10)(25, "h3", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](26, "Resume / CV");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "div", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AIScorecardComponent_Template_div_click_27_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            const resumeFileInput_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](29);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](resumeFileInput_r6.click());
          })("dragover", function AIScorecardComponent_Template_div_dragover_27_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            ctx.resumeDragOver = true;
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event.preventDefault());
          })("dragleave", function AIScorecardComponent_Template_div_dragleave_27_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.resumeDragOver = false);
          })("drop", function AIScorecardComponent_Template_div_drop_27_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.onResumeDrop($event));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](28, "input", 13, 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function AIScorecardComponent_Template_input_change_28_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.onResumeFileSelect($event));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](30, AIScorecardComponent_div_30_Template, 9, 0, "div", 14)(31, AIScorecardComponent_div_31_Template, 9, 4, "div", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](32, AIScorecardComponent_div_32_Template, 2, 1, "div", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](33, "div", 17)(34, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](35, "or paste text");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](36, "textarea", 19);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function AIScorecardComponent_Template_textarea_ngModelChange_36_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.resumeText, $event) || (ctx.resumeText = $event);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](37, "div", 20)(38, "button", 21);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AIScorecardComponent_Template_button_click_38_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.runAIAgents());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](39, AIScorecardComponent_span_39_Template, 2, 0, "span", 22)(40, AIScorecardComponent_span_40_Template, 2, 0, "span", 22);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](41, AIScorecardComponent_div_41_Template, 2, 1, "div", 23)(42, AIScorecardComponent_div_42_Template, 91, 37, "div", 22);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.results);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.errorMessage);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.results == null ? null : ctx.results.requiresHumanReview);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("sc-dz-hover", ctx.jdDragOver)("sc-dz-loaded", !!ctx.jdFile);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.jdFile);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.jdFile);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.jdExtractError);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.jdText);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("sc-dz-hover", ctx.resumeDragOver)("sc-dz-loaded", !!ctx.resumeFile);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.resumeFile);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.resumeFile);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.resumeExtractError);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.resumeText);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx.isProcessing || ctx.jdExtracting || ctx.resumeExtracting || !ctx.jdText || !ctx.resumeText);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.isProcessing);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isProcessing);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isProcessing || ctx.results);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.results);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_4__.DecimalPipe, _angular_common__WEBPACK_IMPORTED_MODULE_4__.DatePipe],
      styles: ["\n\n  .sc-upload-zone[_ngcontent-%COMP%] {\n    border: 2px dashed var(--border-strong);\n    border-radius: 10px; padding: 14px 16px; cursor: pointer;\n    transition: border-color .2s, background .2s;\n    background: var(--surface-alt); margin-bottom: 4px;\n  }\n  .sc-upload-zone[_ngcontent-%COMP%]:hover, .sc-upload-zone.sc-dz-hover[_ngcontent-%COMP%] {\n    border-color: var(--brand-violet-500); background: #f4f1ff;\n  }\n  .sc-upload-zone.sc-dz-loaded[_ngcontent-%COMP%] {\n    border-style: solid; border-color: var(--brand-violet-400); background: #f4f1ff;\n  }\n  .sc-dz-idle[_ngcontent-%COMP%] { display:flex; align-items:center; gap:10px; color:var(--text-3); font-size:13px; }\n  .sc-dz-label[_ngcontent-%COMP%] { color:var(--text-2); }\n  .sc-dz-link[_ngcontent-%COMP%]  { color:#6b4df0; font-weight:600; }\n  .sc-dz-hint[_ngcontent-%COMP%]  { font-size:11px; color:var(--text-3); margin-left:auto; }\n  .sc-dz-file[_ngcontent-%COMP%]  { display:flex; align-items:center; gap:8px; }\n  .sc-dz-remove[_ngcontent-%COMP%] {\n    background:none; border:none; cursor:pointer;\n    font-size:13px; color:var(--text-3); padding:2px 6px; border-radius:4px; flex-shrink:0;\n  }\n  .sc-dz-remove[_ngcontent-%COMP%]:hover { background:#fee2e2; color:#dc2626; }\n  .sc-or-divider[_ngcontent-%COMP%] {\n    display:flex; align-items:center; gap:10px;\n    color:var(--text-3); font-size:12px; margin:10px 0 8px;\n  }\n  .sc-or-divider[_ngcontent-%COMP%]::before, .sc-or-divider[_ngcontent-%COMP%]::after {\n    content:''; flex:1; height:1px; background:var(--border);\n  }\n\n  \n\n  .risk-badge[_ngcontent-%COMP%] {\n    display:inline-flex; flex-direction:column; align-items:center;\n    gap:4px; padding:12px 20px; border-radius:10px; font-size:13px;\n    min-width:120px; text-align:center;\n  }\n  .risk-badge[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { font-size:16px; font-weight:800; }\n  .risk-low[_ngcontent-%COMP%]    { background:#d1fae5; color:#065f46; }\n  .risk-medium[_ngcontent-%COMP%] { background:#fef3c7; color:#92400e; }\n  .risk-high[_ngcontent-%COMP%]   { background:#fee2e2; color:#991b1b; }\n\n  \n\n  .behavioral-card[_ngcontent-%COMP%] {\n    border: 1.5px solid rgba(109,68,240,0.2);\n    background: linear-gradient(135deg, #faf8ff 0%, #fff 100%);\n  }\n\n  .bi-header[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: flex-start;\n    margin-bottom: 20px;\n    gap: 16px;\n    flex-wrap: wrap;\n  }\n\n  .bi-brain-icon[_ngcontent-%COMP%] { font-size: 20px; }\n\n  .bi-subtitle[_ngcontent-%COMP%] {\n    font-size: 12px;\n    color: var(--text-3);\n    margin-top: 3px;\n  }\n\n  .archetype-badge[_ngcontent-%COMP%] {\n    border: 1.5px solid;\n    border-radius: 12px;\n    padding: 10px 16px;\n    min-width: 220px;\n    max-width: 280px;\n    text-align: center;\n    flex-shrink: 0;\n  }\n  .archetype-label[_ngcontent-%COMP%] {\n    font-size: 10px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.06em;\n    opacity: 0.65;\n    margin-bottom: 4px;\n  }\n  .archetype-title[_ngcontent-%COMP%] {\n    font-size: 15px;\n    font-weight: 800;\n    line-height: 1.2;\n    margin-bottom: 4px;\n  }\n  .archetype-desc[_ngcontent-%COMP%] {\n    font-size: 11px;\n    opacity: 0.75;\n    line-height: 1.4;\n  }\n\n  .bi-body[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 220px 1fr;\n    gap: 28px;\n    align-items: start;\n  }\n\n  \n\n  .bi-radar-wrap[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 8px;\n  }\n  .bi-radar-svg[_ngcontent-%COMP%] { overflow: visible; }\n\n  .radar-rings-legend[_ngcontent-%COMP%] {\n    display: flex; gap: 4px; align-items: center;\n  }\n  .ring-chip[_ngcontent-%COMP%] {\n    font-size: 10px; font-weight: 700;\n    padding: 2px 6px; border-radius: 4px;\n  }\n\n  .bi-confidence-pill[_ngcontent-%COMP%] {\n    font-size: 11px;\n    color: var(--text-3);\n    background: #f3f0ff;\n    border-radius: 20px;\n    padding: 3px 12px;\n  }\n  .bi-confidence-pill[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: #6d44f0; }\n\n  \n\n  .bi-skills-col[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n  }\n\n  .bi-skill-row[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 4px; }\n\n  .bi-skill-header[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n  }\n\n  .bi-skill-label[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 600;\n    display: flex;\n    align-items: center;\n    gap: 6px;\n    color: var(--text-1);\n  }\n  .bi-skill-icon[_ngcontent-%COMP%] { font-size: 15px; }\n\n  .bi-score-badge[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 800;\n    padding: 2px 8px;\n    border-radius: 6px;\n    min-width: 36px;\n    text-align: center;\n  }\n  .bscore-high[_ngcontent-%COMP%] { background: #d1fae5; color: #065f46; }\n  .bscore-mid[_ngcontent-%COMP%]  { background: #fef3c7; color: #92400e; }\n  .bscore-low[_ngcontent-%COMP%]  { background: #fee2e2; color: #991b1b; }\n\n  .bi-evidence-btn[_ngcontent-%COMP%] {\n    background: none; border: 1px solid var(--border);\n    border-radius: 4px; cursor: pointer;\n    font-size: 10px; padding: 2px 6px;\n    color: var(--text-3); line-height: 1;\n    transition: background .15s;\n  }\n  .bi-evidence-btn[_ngcontent-%COMP%]:hover { background: #f3f0ff; border-color: #6d44f0; color: #6d44f0; }\n\n  .bi-bar-track[_ngcontent-%COMP%] {\n    height: 8px;\n    background: #f1f5f9;\n    border-radius: 4px;\n    overflow: hidden;\n  }\n  .bi-bar-fill[_ngcontent-%COMP%] {\n    height: 100%;\n    border-radius: 4px;\n    transition: width .6s cubic-bezier(.4,0,.2,1);\n  }\n\n  .bi-evidence-text[_ngcontent-%COMP%] {\n    font-size: 11.5px;\n    color: var(--text-2);\n    background: #f8f7ff;\n    border-left: 3px solid #6d44f0;\n    border-radius: 0 6px 6px 0;\n    padding: 6px 10px;\n    line-height: 1.5;\n    display: flex;\n    gap: 6px;\n    align-items: flex-start;\n  }\n  .bi-evidence-icon[_ngcontent-%COMP%] { flex-shrink: 0; }\n\n  \n\n  .bi-summary[_ngcontent-%COMP%] {\n    margin-top: 20px;\n    padding: 16px 18px;\n    background: linear-gradient(135deg, #f3f0ff, #f8f7ff);\n    border-radius: 10px;\n    border-left: 3px solid #6d44f0;\n  }\n  .bi-summary-label[_ngcontent-%COMP%] {\n    font-size: 10px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.07em;\n    color: #6d44f0;\n    margin-bottom: 8px;\n  }\n  .bi-summary-text[_ngcontent-%COMP%] {\n    font-size: 13px;\n    line-height: 1.65;\n    color: var(--text-2);\n    margin: 0;\n  }"]
    });
  }
}

/***/ }),

/***/ 92:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/auth.service */ 4796);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/menu */ 1034);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/divider */ 4102);







function AppComponent_section_0_div_38_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.loginError);
  }
}
function AppComponent_section_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "section", 3)(1, "div", 4)(2, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "img", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "div", 8)(6, "div", 9)(7, "div", 10)(8, "div", 11)(9, "div", 12)(10, "span", 13)(11, "span", 14)(12, "span", 15)(13, "span", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Decypher - The Command Center for Smarter Hiring");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "Centralize your hiring, gain real-time insights, and make faster, smarter decisions.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "form", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function AppComponent_section_0_Template_form_ngSubmit_18_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.login());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](20, "img", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22, "Welcome back");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "p", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](24, "Choose your login structure");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "div", 21)(26, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AppComponent_section_0_Template_button_click_26_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.usePreset("super"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](27, "Super Admin");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AppComponent_section_0_Template_button_click_28_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.usePreset("team"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](29, "Team User");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AppComponent_section_0_Template_button_click_30_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.guestLogin());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](31, "Guest Login");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](33, "Email");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](34, "input", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function AppComponent_section_0_Template_input_ngModelChange_34_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r1.email, $event) || (ctx_r1.email = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](35, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](36, "Password");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "input", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function AppComponent_section_0_Template_input_ngModelChange_37_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r1.password, $event) || (ctx_r1.password = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](38, AppComponent_section_0_div_38_Template, 2, 1, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](39, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](40, "Sign in");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](41, "div", 27)(42, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](43, "Demo credentials");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](44, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](45, "Super Admin: admin@decypher.app / Admin@2024");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](46, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](47, "Recruiter: recruiter@decypher.app / Recruiter@2024");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("active", ctx_r1.selectedLogin === "super");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("active", ctx_r1.selectedLogin === "team");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("active", ctx_r1.selectedLogin === "guest");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.email);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.password);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.loginError);
  }
}
function AppComponent_div_1_div_13_a_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 72)(1, "div", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", item_r4.path)("title", item_r4.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("background", item_r4.color);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r4.symbol);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r4.shortLabel || item_r4.label);
  }
}
function AppComponent_div_1_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 40)(1, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Recent Apps");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, AppComponent_div_1_div_13_a_4_Template, 5, 6, "a", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.recentApps);
  }
}
function AppComponent_div_1_a_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 72)(1, "div", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", item_r5.path)("title", item_r5.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("background", item_r5.color);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r5.symbol);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r5.shortLabel || item_r5.label);
  }
}
function AppComponent_div_1_button_61_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Users & Access");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function AppComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 29)(1, "aside", 30)(2, "div", 31)(3, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "D");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 33)(6, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Decypher");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Recruitment Intelligence");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "nav", 36)(11, "div", 37)(12, "input", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("input", function AppComponent_div_1_Template_input_input_12_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.onAppSearch($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](13, AppComponent_div_1_div_13_Template, 5, 1, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 40)(15, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](18, AppComponent_div_1_a_18_Template, 5, 6, "a", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "div", 44)(20, "div", 45)(21, "div", 46)(22, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23, "AI");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](25, "AI ASSIST");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "button", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](29, "View insights");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "button", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AppComponent_div_1_Template_button_click_30_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.toggleSidebar());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](31, "\u2039\u203A");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "div", 52)(33, "header", 53)(34, "div", 54)(35, "h1", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "div", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](39, "div", 57)(40, "div", 58)(41, "span", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](42, "/");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](43, "input", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("keyup.enter", function AppComponent_div_1_Template_input_keyup_enter_43_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.globalSearch($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](44, "div", 61)(45, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](46, "Last 30 days");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](47, "button", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AppComponent_div_1_Template_button_click_47_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.logout());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](48, "Logout");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](49, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](50);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](51, "mat-menu", null, 0)(53, "div", 65)(54, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](55);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](56, "div", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](57);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](58, "div", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](59);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](60, "mat-divider");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](61, AppComponent_div_1_button_61_Template, 2, 0, "button", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](62, "button", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AppComponent_div_1_Template_button_click_62_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.logout());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](63, "Logout");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](64, "div", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](65, "router-outlet");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const userMenu_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](52);
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("collapsed", ctx_r1.sidebarCollapsed);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx_r1.appSearch);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r1.appSearch);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.appSearch ? "Results" : "All Apps");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.filteredApps);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.insightText);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("sidebar-collapsed", ctx_r1.sidebarCollapsed);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.currentPageTitle);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.currentBreadcrumb);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("matMenuTriggerFor", userMenu_r6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.currentUser == null ? null : ctx_r1.currentUser.initials);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.currentUser == null ? null : ctx_r1.currentUser.fullName);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.currentUser == null ? null : ctx_r1.currentUser.email);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.currentUser == null ? null : ctx_r1.currentUser.role);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.canAccessAdmin);
  }
}
class AppComponent {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
    this.sidebarCollapsed = false;
    this.isAuthenticated = false;
    this.currentUser = null;
    this.currentPageTitle = 'Dashboard';
    this.currentBreadcrumb = 'Home / Dashboard';
    this.canAccessAdmin = false;
    this.email = 'admin@decypher.app';
    this.password = 'Admin@2024';
    this.selectedLogin = 'super';
    this.loginError = '';
    this.insightText = 'Live pipeline risk is calculated from current candidate records.';
    this.allApps = [{
      path: '/dashboard',
      label: 'Dashboard',
      shortLabel: 'Dashboard',
      symbol: 'D',
      color: '#292966',
      adminOnly: false
    }, {
      path: '/vendors',
      label: 'Vendors',
      shortLabel: 'Vendors',
      symbol: 'V',
      color: '#22a3d2',
      adminOnly: false
    }, {
      path: '/budget',
      label: 'Budget Vs Forecasting',
      shortLabel: 'Budget VF',
      symbol: '💰',
      color: '#059669',
      adminOnly: false
    }, {
      path: '/recruiters',
      label: 'Recruiters',
      shortLabel: 'Recruiters',
      symbol: 'R',
      color: '#6b4df0',
      adminOnly: false
    }, {
      path: '/cv-database',
      label: 'CV Database',
      shortLabel: 'CV DB',
      symbol: 'CV',
      color: '#5C5C99',
      adminOnly: false
    }, {
      path: '/pipeline-board',
      label: 'Pipeline Board',
      shortLabel: 'Pipeline',
      symbol: 'PB',
      color: '#a94ee6',
      adminOnly: false
    }, {
      path: '/requisitions',
      label: 'Requisitions',
      shortLabel: 'Reqs',
      symbol: 'RQ',
      color: '#e8912a',
      adminOnly: false
    }, {
      path: '/interview-scheduler',
      label: 'Interview Scheduler',
      shortLabel: 'Interviews',
      symbol: 'IS',
      color: '#2563eb',
      adminOnly: false
    }, {
      path: '/offer-management',
      label: 'Offer Management',
      shortLabel: 'Offers',
      symbol: 'OM',
      color: '#5C5C99',
      adminOnly: false
    }, {
      path: '/talent-pool',
      label: 'Talent Pool',
      shortLabel: 'Talent',
      symbol: 'TP',
      color: '#c56bff',
      adminOnly: false
    }, {
      path: '/source-tracking',
      label: 'Source Tracking',
      shortLabel: 'Sources',
      symbol: 'ST',
      color: '#3bbdea',
      adminOnly: false
    }, {
      path: '/sla-dashboard',
      label: 'SLA Dashboard',
      shortLabel: 'SLA',
      symbol: 'SL',
      color: '#dc2626',
      adminOnly: false
    }, {
      path: '/reports',
      label: 'Reports',
      shortLabel: 'Reports',
      symbol: '📊',
      color: '#0f766e',
      adminOnly: false
    }, {
      path: '/internal-job-postings',
      label: 'Internal Job Postings',
      shortLabel: 'Int. Jobs',
      symbol: '📌',
      color: '#b45309',
      adminOnly: false
    }, {
      path: '/resume-parser',
      label: 'Resume Parser',
      shortLabel: 'Resume',
      symbol: 'RP',
      color: '#6b4df0',
      adminOnly: false
    }, {
      path: '/ai-scorecard',
      label: 'AI Scorecard',
      shortLabel: 'AI Score',
      symbol: 'AS',
      color: '#a94ee6',
      adminOnly: false
    }, {
      path: '/dropout-predictor',
      label: 'Dropout Predictor',
      shortLabel: 'Dropout',
      symbol: 'DR',
      color: '#dc2626',
      adminOnly: false
    }, {
      path: '/competency-ranker',
      label: 'Competency Ranker',
      shortLabel: 'Competency',
      symbol: 'CR',
      color: '#16a34a',
      adminOnly: false
    }, {
      path: '/jd-checker',
      label: 'JD Checker',
      shortLabel: 'JD Check',
      symbol: 'JD',
      color: '#e8912a',
      adminOnly: false
    }, {
      path: '/jd-generator',
      label: 'JD Generator',
      shortLabel: 'JD Gen',
      symbol: 'JG',
      color: '#22a3d2',
      adminOnly: false
    }, {
      path: '/import-center',
      label: 'Import Center',
      shortLabel: 'Import',
      symbol: '📥',
      color: '#0891b2',
      adminOnly: false
    }, {
      path: '/users',
      label: 'Users & Access',
      shortLabel: 'Users',
      symbol: 'UA',
      color: '#343a48',
      adminOnly: true
    }, {
      path: '/compliance',
      label: 'Compliance',
      shortLabel: 'Compliance',
      symbol: 'CO',
      color: '#5C5C99',
      adminOnly: true
    }];
    this.recentApps = [];
    this.filteredApps = [];
    this.appSearch = '';
    /* kept for updatePageTitle() */
    this.coreNav = this.allApps.filter(a => !a.adminOnly).slice(0, 12);
    this.aiNav = this.allApps.slice(12, 18);
    this.adminNav = this.allApps.filter(a => a.adminOnly);
  }
  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
      this.currentUser = user;
      this.canAccessAdmin = user?.role === 'SuperAdmin';
      this.refreshApps();
    });
    this.router.events.subscribe(() => {
      this.updatePageTitle();
      this.trackRecentApp();
    });
    this.refreshApps();
  }
  refreshApps() {
    const visible = this.allApps.filter(a => !a.adminOnly || this.canAccessAdmin);
    this.recentApps = visible.slice(0, 9);
    this.filteredApps = visible;
  }
  onAppSearch(event) {
    this.appSearch = event.target.value.trim();
    const q = this.appSearch.toLowerCase();
    const visible = this.allApps.filter(a => !a.adminOnly || this.canAccessAdmin);
    this.filteredApps = q ? visible.filter(a => a.label.toLowerCase().includes(q)) : visible;
  }
  trackRecentApp() {
    const url = this.router.url.split('?')[0];
    const found = this.allApps.find(a => url.startsWith(a.path) && (!a.adminOnly || this.canAccessAdmin));
    if (!found) return;
    const list = [found, ...this.recentApps.filter(a => a.path !== found.path)].slice(0, 9);
    this.recentApps = list;
  }
  usePreset(type) {
    this.selectedLogin = type;
    if (type === 'super') {
      this.email = 'admin@decypher.app';
      this.password = 'Admin@2024';
    } else if (type === 'team') {
      this.email = 'recruiter@decypher.app';
      this.password = 'Recruiter@2024';
    }
  }
  login() {
    this.loginError = '';
    this.authService.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: err => this.loginError = err?.error?.error || 'Login failed'
    });
  }
  guestLogin() {
    this.selectedLogin = 'guest';
    this.loginError = '';
    this.authService.guestLogin().subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => this.loginError = 'Guest login failed'
    });
  }
  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
  globalSearch(event) {
    const query = event.target.value.trim();
    if (query) {
      this.router.navigate(['/cv-database'], {
        queryParams: {
          skills: query
        }
      });
    }
  }
  updatePageTitle() {
    const titles = {
      // Core
      '/dashboard': {
        title: 'Dashboard',
        breadcrumb: 'Home / Dashboard'
      },
      '/vendors': {
        title: 'Vendors',
        breadcrumb: 'Home / Vendors'
      },
      '/budget': {
        title: 'Budget Vs Forecasting',
        breadcrumb: 'Home / Budget Vs Forecasting'
      },
      '/recruiters': {
        title: 'Recruiters',
        breadcrumb: 'Home / Recruiters'
      },
      '/cv-database': {
        title: 'CV Database',
        breadcrumb: 'Home / CV Search'
      },
      '/pipeline-board': {
        title: 'Pipeline Board',
        breadcrumb: 'Core / Pipeline Board'
      },
      '/requisitions': {
        title: 'Requisitions',
        breadcrumb: 'Core / Requisitions'
      },
      '/candidate-portal': {
        title: 'Candidate Portal',
        breadcrumb: 'Core / Candidate Portal'
      },
      '/interview-scheduler': {
        title: 'Interview Scheduler',
        breadcrumb: 'Core / Interview Scheduler'
      },
      '/offer-management': {
        title: 'Offer Management',
        breadcrumb: 'Core / Offer Management'
      },
      '/talent-pool': {
        title: 'Talent Pool',
        breadcrumb: 'Core / Talent Pool'
      },
      '/source-tracking': {
        title: 'Source Tracking',
        breadcrumb: 'Core / Source Tracking'
      },
      '/sla-dashboard': {
        title: 'SLA Dashboard',
        breadcrumb: 'Core / SLA Dashboard'
      },
      // AI Tools
      '/resume-parser': {
        title: 'Resume Parser',
        breadcrumb: 'AI Tools / Resume Parser'
      },
      '/ai-scorecard': {
        title: 'AI Scorecard',
        breadcrumb: 'AI Tools / AI Scorecard'
      },
      '/dropout-predictor': {
        title: 'Dropout Predictor',
        breadcrumb: 'AI Tools / Dropout Predictor'
      },
      '/competency-ranker': {
        title: 'Competency Ranker',
        breadcrumb: 'AI Tools / Competency Ranker'
      },
      '/jd-checker': {
        title: 'JD Checker',
        breadcrumb: 'AI Tools / JD Checker'
      },
      '/jd-generator': {
        title: 'JD Generator',
        breadcrumb: 'AI Tools / JD Generator'
      },
      // Admin
      '/users': {
        title: 'Users & Access',
        breadcrumb: 'Admin / Users'
      },
      '/compliance': {
        title: 'Compliance',
        breadcrumb: 'Admin / Compliance'
      }
    };
    const match = Object.keys(titles).find(key => this.router.url.startsWith(key));
    if (match) {
      this.currentPageTitle = titles[match].title;
      this.currentBreadcrumb = titles[match].breadcrumb;
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
  static {
    this.ɵfac = function AppComponent_Factory(t) {
      return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: AppComponent,
      selectors: [["app-root"]],
      decls: 2,
      vars: 2,
      consts: [["userMenu", "matMenu"], ["class", "login-screen", 4, "ngIf"], ["class", "app-container", 4, "ngIf"], [1, "login-screen"], [1, "login-art"], [1, "brand-lockup"], ["src", "assets/images/Decypher%20logo-%20white.png", "alt", "Decypher", 1, "login-logo-white"], ["aria-hidden", "true", 1, "circuit-logo"], [1, "panel", "panel-back"], [1, "panel", "panel-front"], [1, "wire", "wire-a"], [1, "wire", "wire-b"], [1, "wire", "wire-c"], [1, "node", "n1"], [1, "node", "n2"], [1, "node", "n3"], [1, "node", "n4"], [1, "login-panel", 3, "ngSubmit"], [1, "login-panel-header"], ["src", "assets/images/Decypher%20logo-%20black.png", "alt", "Decypher", 1, "login-logo-black"], [1, "panel-subtitle"], [1, "role-tabs"], ["type", "button", 3, "click"], ["name", "email", "type", "email", "autocomplete", "email", 1, "input", 3, "ngModelChange", "ngModel"], ["name", "password", "type", "password", "autocomplete", "current-password", 1, "input", 3, "ngModelChange", "ngModel"], ["class", "login-error", 4, "ngIf"], ["type", "submit", 1, "btn", "btn-primary", "login-btn"], [1, "credential-hint"], [1, "login-error"], [1, "app-container"], [1, "sidebar"], [1, "sidebar-header"], [1, "sidebar-logo"], [1, "sidebar-brand"], [1, "sidebar-brand-name"], [1, "sidebar-brand-tagline"], [1, "sidebar-nav"], [1, "apps-search-wrap"], ["placeholder", "Search apps...", 1, "apps-search-input", 3, "input", "value"], ["class", "apps-section", 4, "ngIf"], [1, "apps-section"], [1, "apps-section-title"], [1, "apps-grid"], ["routerLinkActive", "active", "class", "app-tile", 3, "routerLink", "title", 4, "ngFor", "ngForOf"], [1, "sidebar-footer"], [1, "sidebar-ai-assist"], [1, "sidebar-ai-assist-header"], [1, "nav-symbol"], [1, "sidebar-ai-assist-kicker"], [1, "sidebar-ai-assist-content"], ["routerLink", "/dropout-predictor", 1, "btn", "btn-primary", "btn-sm"], [1, "sidebar-collapse-btn", 3, "click"], [1, "main-content"], [1, "topbar"], [1, "topbar-left"], [1, "topbar-title"], [1, "topbar-breadcrumb"], [1, "topbar-center"], [1, "topbar-search"], [1, "topbar-search-icon"], ["placeholder", "Search candidates, vendors, skills...", 1, "topbar-search-input", 3, "keyup.enter"], [1, "topbar-right"], [1, "topbar-date-picker"], ["type", "button", 1, "btn", "btn-ghost", "btn-sm", 3, "click"], [1, "topbar-avatar", 3, "matMenuTriggerFor"], [1, "user-menu-header"], [1, "user-menu-name"], [1, "user-menu-email"], [1, "chip", "chip-brand", 2, "margin-top", "8px"], ["mat-menu-item", "", "routerLink", "/users", 4, "ngIf"], ["mat-menu-item", "", 3, "click"], [1, "page-container", "page-enter"], ["routerLinkActive", "active", 1, "app-tile", 3, "routerLink", "title"], [1, "app-tile-icon"], [1, "app-tile-label"], ["mat-menu-item", "", "routerLink", "/users"]],
      template: function AppComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, AppComponent_section_0_Template, 48, 9, "section", 1)(1, AppComponent_div_1_Template, 66, 17, "div", 2);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.isAuthenticated);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isAuthenticated);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgForm, _angular_material_menu__WEBPACK_IMPORTED_MODULE_5__.MatMenu, _angular_material_menu__WEBPACK_IMPORTED_MODULE_5__.MatMenuItem, _angular_material_menu__WEBPACK_IMPORTED_MODULE_5__.MatMenuTrigger, _angular_material_divider__WEBPACK_IMPORTED_MODULE_6__.MatDivider, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterOutlet, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLink, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLinkActive],
      styles: [".login-screen[_ngcontent-%COMP%] {\n      height: 100vh;\n      width: 100vw;\n      overflow: hidden;\n      position: relative;\n      background: linear-gradient(120deg, #20d4e8 0%, #0798ef 46%, #1255df 100%);\n    }\n    .login-art[_ngcontent-%COMP%] {\n      position: relative;\n      width: 100%;\n      height: 100%;\n      padding: 24px 44px;\n      background: transparent;\n      color: #fff;\n      overflow: hidden;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n    }\n    .login-art[_ngcontent-%COMP%]::before, .login-art[_ngcontent-%COMP%]::after {\n      content: \"\";\n      position: absolute;\n      border-radius: 50%;\n      background: rgba(255, 255, 255, 0.08);\n    }\n    .login-art[_ngcontent-%COMP%]::before {\n      width: 720px;\n      height: 720px;\n      left: -180px;\n      bottom: -260px;\n    }\n    .login-art[_ngcontent-%COMP%]::after {\n      width: 260px;\n      height: 260px;\n      right: 180px;\n      top: 210px;\n    }\n    .brand-lockup[_ngcontent-%COMP%], .login-panel-header[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 14px;\n    }\n    .brand-lockup[_ngcontent-%COMP%] {\n      position: absolute;\n      top: 40px;\n      left: 44px;\n      z-index: 2;\n    }\n    .login-logo-white[_ngcontent-%COMP%] {\n      width: 150px;\n      height: auto;\n      border-radius: 18px;\n      background: rgba(255, 255, 255, 0.95);\n      padding: 14px;\n      box-shadow: 0 18px 50px rgba(15, 23, 42, 0.16);\n    }\n    .login-logo-black[_ngcontent-%COMP%] {\n      width: 158px;\n      height: auto;\n      margin: 0 auto 14px;\n      display: block;\n      border-radius: 16px;\n      box-shadow: 0 14px 34px rgba(15, 23, 42, 0.14);\n    }\n    .brand-mark[_ngcontent-%COMP%], .sidebar-logo[_ngcontent-%COMP%] {\n      width: 42px;\n      height: 42px;\n      border-radius: 10px;\n      display: grid;\n      place-items: center;\n      background: #111827;\n      color: #fff;\n      font-weight: 800;\n      letter-spacing: 0;\n    }\n    .brand-name[_ngcontent-%COMP%] {\n      font-size: 20px;\n      font-weight: 800;\n      letter-spacing: 0;\n    }\n    .brand-subtitle[_ngcontent-%COMP%] {\n      font-size: 11px;\n      text-transform: uppercase;\n      color: #94a3b8;\n      font-weight: 700;\n      letter-spacing: 2px;\n    }\n    .login-art[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n      max-width: 620px;\n      font-size: 38px;\n      line-height: 1.05;\n      margin: 360px 0 14px;\n      position: relative;\n      z-index: 2;\n    }\n    .login-art[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n      max-width: 540px;\n      color: #cbd5e1;\n      font-size: 16px;\n      position: relative;\n      z-index: 2;\n    }\n    .circuit-logo[_ngcontent-%COMP%] {\n      position: absolute;\n      top: 128px;\n      left: min(24vw, 420px);\n      width: 450px;\n      height: 285px;\n      filter: drop-shadow(0 20px 60px rgba(124, 58, 237, 0.35));\n      z-index: 1;\n    }\n    .panel[_ngcontent-%COMP%] {\n      position: absolute;\n      width: 235px;\n      height: 170px;\n      border: 2px solid rgba(103, 232, 249, 0.6);\n      background: linear-gradient(135deg, rgba(126, 34, 206, 0.74), rgba(29, 78, 216, 0.52));\n      transform: skewY(16deg);\n    }\n    .panel-back[_ngcontent-%COMP%] { left: 175px; top: 18px; }\n    .panel-front[_ngcontent-%COMP%] { left: 70px; top: 82px; border-color: rgba(37, 99, 235, 0.7); }\n    .wire[_ngcontent-%COMP%] {\n      position: absolute;\n      height: 8px;\n      border-radius: 999px;\n      background: linear-gradient(90deg, #22d3ee, #8b5cf6);\n      transform-origin: left center;\n    }\n    .wire-a[_ngcontent-%COMP%] { width: 380px; left: 20px; top: 150px; transform: rotate(16deg); }\n    .wire-b[_ngcontent-%COMP%] { width: 270px; left: 110px; top: 172px; transform: rotate(-14deg); background: linear-gradient(90deg, #67e8f9, #60a5fa); }\n    .wire-c[_ngcontent-%COMP%] { width: 245px; left: 190px; top: 112px; transform: rotate(17deg); background: linear-gradient(90deg, #c084fc, #2563eb); }\n    .node[_ngcontent-%COMP%] {\n      position: absolute;\n      width: 34px;\n      height: 34px;\n      border-radius: 50%;\n      background: #67e8f9;\n      box-shadow: 0 0 24px currentColor;\n    }\n    .n1[_ngcontent-%COMP%] { left: 12px; top: 132px; background: #c084fc; }\n    .n2[_ngcontent-%COMP%] { left: 258px; top: 134px; }\n    .n3[_ngcontent-%COMP%] { left: 195px; top: 208px; background: #60a5fa; }\n    .n4[_ngcontent-%COMP%] { left: 370px; top: 121px; }\n    .login-panel[_ngcontent-%COMP%] {\n      position: absolute;\n      right: 72px;\n      top: 50%;\n      transform: translateY(-50%);\n      background: #fff;\n      border-radius: 10px;\n      width: 390px;\n      max-height: calc(100vh - 48px);\n      overflow: auto;\n      padding: 28px 34px;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      gap: 11px;\n      box-shadow: 0 28px 80px rgba(15, 23, 42, 0.28);\n      z-index: 5;\n    }\n    .login-panel[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n      margin: 0;\n      font-size: 27px;\n      text-align: center;\n    }\n    .panel-subtitle[_ngcontent-%COMP%] {\n      margin: 4px 0 0;\n      color: #64748b;\n      text-align: center;\n    }\n    .role-tabs[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(3, 1fr);\n      gap: 8px;\n      margin: 12px 0 4px;\n    }\n    .role-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n      border: 1px solid #dbe2ea;\n      background: #f8fafc;\n      border-radius: 8px;\n      padding: 9px;\n      cursor: pointer;\n      font-weight: 700;\n      color: #334155;\n    }\n    .role-tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n      border-color: #7048e8;\n      color: #4f32d6;\n      background: #f1edff;\n    }\n    .login-btn[_ngcontent-%COMP%] {\n      width: 100%;\n      height: 48px;\n      font-size: 16px;\n      font-weight: 600;\n      margin-top: 4px;\n      border-radius: 8px;\n    }\n    .login-panel[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%] {\n      width: 100%;\n      min-height: 48px;\n      font-size: 15px;\n      padding: 12px 16px;\n      border-radius: 8px;\n      border: 1.5px solid #dde2ef;\n      box-sizing: border-box;\n    }\n    .login-error[_ngcontent-%COMP%] {\n      color: #dc2626;\n      font-size: 13px;\n    }\n    .credential-hint[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 4px;\n      margin-top: 8px;\n      font-size: 12px;\n      color: #64748b;\n      background: #f8fafc;\n      border: 1px solid #e2e8f0;\n      border-radius: 8px;\n      padding: 10px;\n    }\n    .login-panel[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n      font-size: 13px;\n      font-weight: 700;\n      color: #0f172a;\n    }\n    .nav-symbol[_ngcontent-%COMP%] {\n      width: 22px;\n      min-width: 22px;\n      font-size: 12px;\n      font-weight: 800;\n      color: #64748b;\n    }\n    .user-menu-header[_ngcontent-%COMP%] { padding: 12px 16px; }\n    .user-menu-name[_ngcontent-%COMP%] { font-weight: 700; font-size: 14px; color: var(--text); }\n    .user-menu-email[_ngcontent-%COMP%] { font-size: 12px; color: var(--text-3); margin-top: 2px; }\n    .btn-sm[_ngcontent-%COMP%] { height: 28px; font-size: 12px; padding: 0 12px; }\n    @media (max-width: 900px) {\n      .login-screen[_ngcontent-%COMP%] {\n        height: auto;\n        min-height: 100vh;\n        overflow: auto;\n      }\n      .login-art[_ngcontent-%COMP%] {\n        min-height: 100vh;\n        padding: 24px;\n      }\n      .brand-lockup[_ngcontent-%COMP%] {\n        left: 24px;\n        top: 24px;\n      }\n      .login-art[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n        margin-top: 250px;\n        font-size: 30px;\n      }\n      .login-art[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n        max-width: 360px;\n      }\n      .circuit-logo[_ngcontent-%COMP%] {\n        left: 0;\n        top: 100px;\n        transform: scale(.62);\n        transform-origin: top left;\n      }\n      .login-panel[_ngcontent-%COMP%] {\n        position: relative;\n        right: auto;\n        top: auto;\n        transform: none;\n        width: auto;\n        margin: 24px;\n        padding: 28px;\n        max-height: none;\n      }\n    }\n  \n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXBwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0lBQ0k7TUFDRSxhQUFhO01BQ2IsWUFBWTtNQUNaLGdCQUFnQjtNQUNoQixrQkFBa0I7TUFDbEIsMEVBQTBFO0lBQzVFO0lBQ0E7TUFDRSxrQkFBa0I7TUFDbEIsV0FBVztNQUNYLFlBQVk7TUFDWixrQkFBa0I7TUFDbEIsdUJBQXVCO01BQ3ZCLFdBQVc7TUFDWCxnQkFBZ0I7TUFDaEIsYUFBYTtNQUNiLHNCQUFzQjtNQUN0Qix1QkFBdUI7SUFDekI7SUFDQTs7TUFFRSxXQUFXO01BQ1gsa0JBQWtCO01BQ2xCLGtCQUFrQjtNQUNsQixxQ0FBcUM7SUFDdkM7SUFDQTtNQUNFLFlBQVk7TUFDWixhQUFhO01BQ2IsWUFBWTtNQUNaLGNBQWM7SUFDaEI7SUFDQTtNQUNFLFlBQVk7TUFDWixhQUFhO01BQ2IsWUFBWTtNQUNaLFVBQVU7SUFDWjtJQUNBO01BQ0UsYUFBYTtNQUNiLG1CQUFtQjtNQUNuQixTQUFTO0lBQ1g7SUFDQTtNQUNFLGtCQUFrQjtNQUNsQixTQUFTO01BQ1QsVUFBVTtNQUNWLFVBQVU7SUFDWjtJQUNBO01BQ0UsWUFBWTtNQUNaLFlBQVk7TUFDWixtQkFBbUI7TUFDbkIscUNBQXFDO01BQ3JDLGFBQWE7TUFDYiw4Q0FBOEM7SUFDaEQ7SUFDQTtNQUNFLFlBQVk7TUFDWixZQUFZO01BQ1osbUJBQW1CO01BQ25CLGNBQWM7TUFDZCxtQkFBbUI7TUFDbkIsOENBQThDO0lBQ2hEO0lBQ0E7TUFDRSxXQUFXO01BQ1gsWUFBWTtNQUNaLG1CQUFtQjtNQUNuQixhQUFhO01BQ2IsbUJBQW1CO01BQ25CLG1CQUFtQjtNQUNuQixXQUFXO01BQ1gsZ0JBQWdCO01BQ2hCLGlCQUFpQjtJQUNuQjtJQUNBO01BQ0UsZUFBZTtNQUNmLGdCQUFnQjtNQUNoQixpQkFBaUI7SUFDbkI7SUFDQTtNQUNFLGVBQWU7TUFDZix5QkFBeUI7TUFDekIsY0FBYztNQUNkLGdCQUFnQjtNQUNoQixtQkFBbUI7SUFDckI7SUFDQTtNQUNFLGdCQUFnQjtNQUNoQixlQUFlO01BQ2YsaUJBQWlCO01BQ2pCLG9CQUFvQjtNQUNwQixrQkFBa0I7TUFDbEIsVUFBVTtJQUNaO0lBQ0E7TUFDRSxnQkFBZ0I7TUFDaEIsY0FBYztNQUNkLGVBQWU7TUFDZixrQkFBa0I7TUFDbEIsVUFBVTtJQUNaO0lBQ0E7TUFDRSxrQkFBa0I7TUFDbEIsVUFBVTtNQUNWLHNCQUFzQjtNQUN0QixZQUFZO01BQ1osYUFBYTtNQUNiLHlEQUF5RDtNQUN6RCxVQUFVO0lBQ1o7SUFDQTtNQUNFLGtCQUFrQjtNQUNsQixZQUFZO01BQ1osYUFBYTtNQUNiLDBDQUEwQztNQUMxQyxzRkFBc0Y7TUFDdEYsdUJBQXVCO0lBQ3pCO0lBQ0EsY0FBYyxXQUFXLEVBQUUsU0FBUyxFQUFFO0lBQ3RDLGVBQWUsVUFBVSxFQUFFLFNBQVMsRUFBRSxvQ0FBb0MsRUFBRTtJQUM1RTtNQUNFLGtCQUFrQjtNQUNsQixXQUFXO01BQ1gsb0JBQW9CO01BQ3BCLG9EQUFvRDtNQUNwRCw2QkFBNkI7SUFDL0I7SUFDQSxVQUFVLFlBQVksRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLHdCQUF3QixFQUFFO0lBQzFFLFVBQVUsWUFBWSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUseUJBQXlCLEVBQUUsb0RBQW9ELEVBQUU7SUFDbEksVUFBVSxZQUFZLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSx3QkFBd0IsRUFBRSxvREFBb0QsRUFBRTtJQUNqSTtNQUNFLGtCQUFrQjtNQUNsQixXQUFXO01BQ1gsWUFBWTtNQUNaLGtCQUFrQjtNQUNsQixtQkFBbUI7TUFDbkIsaUNBQWlDO0lBQ25DO0lBQ0EsTUFBTSxVQUFVLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixFQUFFO0lBQ25ELE1BQU0sV0FBVyxFQUFFLFVBQVUsRUFBRTtJQUMvQixNQUFNLFdBQVcsRUFBRSxVQUFVLEVBQUUsbUJBQW1CLEVBQUU7SUFDcEQsTUFBTSxXQUFXLEVBQUUsVUFBVSxFQUFFO0lBQy9CO01BQ0Usa0JBQWtCO01BQ2xCLFdBQVc7TUFDWCxRQUFRO01BQ1IsMkJBQTJCO01BQzNCLGdCQUFnQjtNQUNoQixtQkFBbUI7TUFDbkIsWUFBWTtNQUNaLDhCQUE4QjtNQUM5QixjQUFjO01BQ2Qsa0JBQWtCO01BQ2xCLGFBQWE7TUFDYixzQkFBc0I7TUFDdEIsdUJBQXVCO01BQ3ZCLFNBQVM7TUFDVCw4Q0FBOEM7TUFDOUMsVUFBVTtJQUNaO0lBQ0E7TUFDRSxTQUFTO01BQ1QsZUFBZTtNQUNmLGtCQUFrQjtJQUNwQjtJQUNBO01BQ0UsZUFBZTtNQUNmLGNBQWM7TUFDZCxrQkFBa0I7SUFDcEI7SUFDQTtNQUNFLGFBQWE7TUFDYixxQ0FBcUM7TUFDckMsUUFBUTtNQUNSLGtCQUFrQjtJQUNwQjtJQUNBO01BQ0UseUJBQXlCO01BQ3pCLG1CQUFtQjtNQUNuQixrQkFBa0I7TUFDbEIsWUFBWTtNQUNaLGVBQWU7TUFDZixnQkFBZ0I7TUFDaEIsY0FBYztJQUNoQjtJQUNBO01BQ0UscUJBQXFCO01BQ3JCLGNBQWM7TUFDZCxtQkFBbUI7SUFDckI7SUFDQTtNQUNFLFdBQVc7TUFDWCxZQUFZO01BQ1osZUFBZTtNQUNmLGdCQUFnQjtNQUNoQixlQUFlO01BQ2Ysa0JBQWtCO0lBQ3BCO0lBQ0E7TUFDRSxXQUFXO01BQ1gsZ0JBQWdCO01BQ2hCLGVBQWU7TUFDZixrQkFBa0I7TUFDbEIsa0JBQWtCO01BQ2xCLDJCQUEyQjtNQUMzQixzQkFBc0I7SUFDeEI7SUFDQTtNQUNFLGNBQWM7TUFDZCxlQUFlO0lBQ2pCO0lBQ0E7TUFDRSxhQUFhO01BQ2IsUUFBUTtNQUNSLGVBQWU7TUFDZixlQUFlO01BQ2YsY0FBYztNQUNkLG1CQUFtQjtNQUNuQix5QkFBeUI7TUFDekIsa0JBQWtCO01BQ2xCLGFBQWE7SUFDZjtJQUNBO01BQ0UsZUFBZTtNQUNmLGdCQUFnQjtNQUNoQixjQUFjO0lBQ2hCO0lBQ0E7TUFDRSxXQUFXO01BQ1gsZUFBZTtNQUNmLGVBQWU7TUFDZixnQkFBZ0I7TUFDaEIsY0FBYztJQUNoQjtJQUNBLG9CQUFvQixrQkFBa0IsRUFBRTtJQUN4QyxrQkFBa0IsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLGtCQUFrQixFQUFFO0lBQ3pFLG1CQUFtQixlQUFlLEVBQUUsb0JBQW9CLEVBQUUsZUFBZSxFQUFFO0lBQzNFLFVBQVUsWUFBWSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUU7SUFDMUQ7TUFDRTtRQUNFLFlBQVk7UUFDWixpQkFBaUI7UUFDakIsY0FBYztNQUNoQjtNQUNBO1FBQ0UsaUJBQWlCO1FBQ2pCLGFBQWE7TUFDZjtNQUNBO1FBQ0UsVUFBVTtRQUNWLFNBQVM7TUFDWDtNQUNBO1FBQ0UsaUJBQWlCO1FBQ2pCLGVBQWU7TUFDakI7TUFDQTtRQUNFLGdCQUFnQjtNQUNsQjtNQUNBO1FBQ0UsT0FBTztRQUNQLFVBQVU7UUFDVixxQkFBcUI7UUFDckIsMEJBQTBCO01BQzVCO01BQ0E7UUFDRSxrQkFBa0I7UUFDbEIsV0FBVztRQUNYLFNBQVM7UUFDVCxlQUFlO1FBQ2YsV0FBVztRQUNYLFlBQVk7UUFDWixhQUFhO1FBQ2IsZ0JBQWdCO01BQ2xCO0lBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAubG9naW4tc2NyZWVuIHtcbiAgICAgIGhlaWdodDogMTAwdmg7XG4gICAgICB3aWR0aDogMTAwdnc7XG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEyMGRlZywgIzIwZDRlOCAwJSwgIzA3OThlZiA0NiUsICMxMjU1ZGYgMTAwJSk7XG4gICAgfVxuICAgIC5sb2dpbi1hcnQge1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICBwYWRkaW5nOiAyNHB4IDQ0cHg7XG4gICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgfVxuICAgIC5sb2dpbi1hcnQ6OmJlZm9yZSxcbiAgICAubG9naW4tYXJ0OjphZnRlciB7XG4gICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA4KTtcbiAgICB9XG4gICAgLmxvZ2luLWFydDo6YmVmb3JlIHtcbiAgICAgIHdpZHRoOiA3MjBweDtcbiAgICAgIGhlaWdodDogNzIwcHg7XG4gICAgICBsZWZ0OiAtMTgwcHg7XG4gICAgICBib3R0b206IC0yNjBweDtcbiAgICB9XG4gICAgLmxvZ2luLWFydDo6YWZ0ZXIge1xuICAgICAgd2lkdGg6IDI2MHB4O1xuICAgICAgaGVpZ2h0OiAyNjBweDtcbiAgICAgIHJpZ2h0OiAxODBweDtcbiAgICAgIHRvcDogMjEwcHg7XG4gICAgfVxuICAgIC5icmFuZC1sb2NrdXAsIC5sb2dpbi1wYW5lbC1oZWFkZXIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDE0cHg7XG4gICAgfVxuICAgIC5icmFuZC1sb2NrdXAge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiA0MHB4O1xuICAgICAgbGVmdDogNDRweDtcbiAgICAgIHotaW5kZXg6IDI7XG4gICAgfVxuICAgIC5sb2dpbi1sb2dvLXdoaXRlIHtcbiAgICAgIHdpZHRoOiAxNTBweDtcbiAgICAgIGhlaWdodDogYXV0bztcbiAgICAgIGJvcmRlci1yYWRpdXM6IDE4cHg7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOTUpO1xuICAgICAgcGFkZGluZzogMTRweDtcbiAgICAgIGJveC1zaGFkb3c6IDAgMThweCA1MHB4IHJnYmEoMTUsIDIzLCA0MiwgMC4xNik7XG4gICAgfVxuICAgIC5sb2dpbi1sb2dvLWJsYWNrIHtcbiAgICAgIHdpZHRoOiAxNThweDtcbiAgICAgIGhlaWdodDogYXV0bztcbiAgICAgIG1hcmdpbjogMCBhdXRvIDE0cHg7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gICAgICBib3gtc2hhZG93OiAwIDE0cHggMzRweCByZ2JhKDE1LCAyMywgNDIsIDAuMTQpO1xuICAgIH1cbiAgICAuYnJhbmQtbWFyaywgLnNpZGViYXItbG9nbyB7XG4gICAgICB3aWR0aDogNDJweDtcbiAgICAgIGhlaWdodDogNDJweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcbiAgICAgIGJhY2tncm91bmQ6ICMxMTE4Mjc7XG4gICAgICBjb2xvcjogI2ZmZjtcbiAgICAgIGZvbnQtd2VpZ2h0OiA4MDA7XG4gICAgICBsZXR0ZXItc3BhY2luZzogMDtcbiAgICB9XG4gICAgLmJyYW5kLW5hbWUge1xuICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDgwMDtcbiAgICAgIGxldHRlci1zcGFjaW5nOiAwO1xuICAgIH1cbiAgICAuYnJhbmQtc3VidGl0bGUge1xuICAgICAgZm9udC1zaXplOiAxMXB4O1xuICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgIGNvbG9yOiAjOTRhM2I4O1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIGxldHRlci1zcGFjaW5nOiAycHg7XG4gICAgfVxuICAgIC5sb2dpbi1hcnQgaDEge1xuICAgICAgbWF4LXdpZHRoOiA2MjBweDtcbiAgICAgIGZvbnQtc2l6ZTogMzhweDtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjA1O1xuICAgICAgbWFyZ2luOiAzNjBweCAwIDE0cHg7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB6LWluZGV4OiAyO1xuICAgIH1cbiAgICAubG9naW4tYXJ0IHAge1xuICAgICAgbWF4LXdpZHRoOiA1NDBweDtcbiAgICAgIGNvbG9yOiAjY2JkNWUxO1xuICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgei1pbmRleDogMjtcbiAgICB9XG4gICAgLmNpcmN1aXQtbG9nbyB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDEyOHB4O1xuICAgICAgbGVmdDogbWluKDI0dncsIDQyMHB4KTtcbiAgICAgIHdpZHRoOiA0NTBweDtcbiAgICAgIGhlaWdodDogMjg1cHg7XG4gICAgICBmaWx0ZXI6IGRyb3Atc2hhZG93KDAgMjBweCA2MHB4IHJnYmEoMTI0LCA1OCwgMjM3LCAwLjM1KSk7XG4gICAgICB6LWluZGV4OiAxO1xuICAgIH1cbiAgICAucGFuZWwge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgd2lkdGg6IDIzNXB4O1xuICAgICAgaGVpZ2h0OiAxNzBweDtcbiAgICAgIGJvcmRlcjogMnB4IHNvbGlkIHJnYmEoMTAzLCAyMzIsIDI0OSwgMC42KTtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsIHJnYmEoMTI2LCAzNCwgMjA2LCAwLjc0KSwgcmdiYSgyOSwgNzgsIDIxNiwgMC41MikpO1xuICAgICAgdHJhbnNmb3JtOiBza2V3WSgxNmRlZyk7XG4gICAgfVxuICAgIC5wYW5lbC1iYWNrIHsgbGVmdDogMTc1cHg7IHRvcDogMThweDsgfVxuICAgIC5wYW5lbC1mcm9udCB7IGxlZnQ6IDcwcHg7IHRvcDogODJweDsgYm9yZGVyLWNvbG9yOiByZ2JhKDM3LCA5OSwgMjM1LCAwLjcpOyB9XG4gICAgLndpcmUge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgaGVpZ2h0OiA4cHg7XG4gICAgICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzIyZDNlZSwgIzhiNWNmNik7XG4gICAgICB0cmFuc2Zvcm0tb3JpZ2luOiBsZWZ0IGNlbnRlcjtcbiAgICB9XG4gICAgLndpcmUtYSB7IHdpZHRoOiAzODBweDsgbGVmdDogMjBweDsgdG9wOiAxNTBweDsgdHJhbnNmb3JtOiByb3RhdGUoMTZkZWcpOyB9XG4gICAgLndpcmUtYiB7IHdpZHRoOiAyNzBweDsgbGVmdDogMTEwcHg7IHRvcDogMTcycHg7IHRyYW5zZm9ybTogcm90YXRlKC0xNGRlZyk7IGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzY3ZThmOSwgIzYwYTVmYSk7IH1cbiAgICAud2lyZS1jIHsgd2lkdGg6IDI0NXB4OyBsZWZ0OiAxOTBweDsgdG9wOiAxMTJweDsgdHJhbnNmb3JtOiByb3RhdGUoMTdkZWcpOyBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICNjMDg0ZmMsICMyNTYzZWIpOyB9XG4gICAgLm5vZGUge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgd2lkdGg6IDM0cHg7XG4gICAgICBoZWlnaHQ6IDM0cHg7XG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICBiYWNrZ3JvdW5kOiAjNjdlOGY5O1xuICAgICAgYm94LXNoYWRvdzogMCAwIDI0cHggY3VycmVudENvbG9yO1xuICAgIH1cbiAgICAubjEgeyBsZWZ0OiAxMnB4OyB0b3A6IDEzMnB4OyBiYWNrZ3JvdW5kOiAjYzA4NGZjOyB9XG4gICAgLm4yIHsgbGVmdDogMjU4cHg7IHRvcDogMTM0cHg7IH1cbiAgICAubjMgeyBsZWZ0OiAxOTVweDsgdG9wOiAyMDhweDsgYmFja2dyb3VuZDogIzYwYTVmYTsgfVxuICAgIC5uNCB7IGxlZnQ6IDM3MHB4OyB0b3A6IDEyMXB4OyB9XG4gICAgLmxvZ2luLXBhbmVsIHtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHJpZ2h0OiA3MnB4O1xuICAgICAgdG9wOiA1MCU7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgIHdpZHRoOiAzOTBweDtcbiAgICAgIG1heC1oZWlnaHQ6IGNhbGMoMTAwdmggLSA0OHB4KTtcbiAgICAgIG92ZXJmbG93OiBhdXRvO1xuICAgICAgcGFkZGluZzogMjhweCAzNHB4O1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIGdhcDogMTFweDtcbiAgICAgIGJveC1zaGFkb3c6IDAgMjhweCA4MHB4IHJnYmEoMTUsIDIzLCA0MiwgMC4yOCk7XG4gICAgICB6LWluZGV4OiA1O1xuICAgIH1cbiAgICAubG9naW4tcGFuZWwgaDIge1xuICAgICAgbWFyZ2luOiAwO1xuICAgICAgZm9udC1zaXplOiAyN3B4O1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIH1cbiAgICAucGFuZWwtc3VidGl0bGUge1xuICAgICAgbWFyZ2luOiA0cHggMCAwO1xuICAgICAgY29sb3I6ICM2NDc0OGI7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgfVxuICAgIC5yb2xlLXRhYnMge1xuICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XG4gICAgICBnYXA6IDhweDtcbiAgICAgIG1hcmdpbjogMTJweCAwIDRweDtcbiAgICB9XG4gICAgLnJvbGUtdGFicyBidXR0b24ge1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2RiZTJlYTtcbiAgICAgIGJhY2tncm91bmQ6ICNmOGZhZmM7XG4gICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICBwYWRkaW5nOiA5cHg7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgY29sb3I6ICMzMzQxNTU7XG4gICAgfVxuICAgIC5yb2xlLXRhYnMgYnV0dG9uLmFjdGl2ZSB7XG4gICAgICBib3JkZXItY29sb3I6ICM3MDQ4ZTg7XG4gICAgICBjb2xvcjogIzRmMzJkNjtcbiAgICAgIGJhY2tncm91bmQ6ICNmMWVkZmY7XG4gICAgfVxuICAgIC5sb2dpbi1idG4ge1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBoZWlnaHQ6IDQ4cHg7XG4gICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgbWFyZ2luLXRvcDogNHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgIH1cbiAgICAubG9naW4tcGFuZWwgLmlucHV0IHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgbWluLWhlaWdodDogNDhweDtcbiAgICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICAgIHBhZGRpbmc6IDEycHggMTZweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgIGJvcmRlcjogMS41cHggc29saWQgI2RkZTJlZjtcbiAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgfVxuICAgIC5sb2dpbi1lcnJvciB7XG4gICAgICBjb2xvcjogI2RjMjYyNjtcbiAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICB9XG4gICAgLmNyZWRlbnRpYWwtaGludCB7XG4gICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgZ2FwOiA0cHg7XG4gICAgICBtYXJnaW4tdG9wOiA4cHg7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBjb2xvcjogIzY0NzQ4YjtcbiAgICAgIGJhY2tncm91bmQ6ICNmOGZhZmM7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjZTJlOGYwO1xuICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgICAgcGFkZGluZzogMTBweDtcbiAgICB9XG4gICAgLmxvZ2luLXBhbmVsIGxhYmVsIHtcbiAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICBjb2xvcjogIzBmMTcyYTtcbiAgICB9XG4gICAgLm5hdi1zeW1ib2wge1xuICAgICAgd2lkdGg6IDIycHg7XG4gICAgICBtaW4td2lkdGg6IDIycHg7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBmb250LXdlaWdodDogODAwO1xuICAgICAgY29sb3I6ICM2NDc0OGI7XG4gICAgfVxuICAgIC51c2VyLW1lbnUtaGVhZGVyIHsgcGFkZGluZzogMTJweCAxNnB4OyB9XG4gICAgLnVzZXItbWVudS1uYW1lIHsgZm9udC13ZWlnaHQ6IDcwMDsgZm9udC1zaXplOiAxNHB4OyBjb2xvcjogdmFyKC0tdGV4dCk7IH1cbiAgICAudXNlci1tZW51LWVtYWlsIHsgZm9udC1zaXplOiAxMnB4OyBjb2xvcjogdmFyKC0tdGV4dC0zKTsgbWFyZ2luLXRvcDogMnB4OyB9XG4gICAgLmJ0bi1zbSB7IGhlaWdodDogMjhweDsgZm9udC1zaXplOiAxMnB4OyBwYWRkaW5nOiAwIDEycHg7IH1cbiAgICBAbWVkaWEgKG1heC13aWR0aDogOTAwcHgpIHtcbiAgICAgIC5sb2dpbi1zY3JlZW4ge1xuICAgICAgICBoZWlnaHQ6IGF1dG87XG4gICAgICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xuICAgICAgICBvdmVyZmxvdzogYXV0bztcbiAgICAgIH1cbiAgICAgIC5sb2dpbi1hcnQge1xuICAgICAgICBtaW4taGVpZ2h0OiAxMDB2aDtcbiAgICAgICAgcGFkZGluZzogMjRweDtcbiAgICAgIH1cbiAgICAgIC5icmFuZC1sb2NrdXAge1xuICAgICAgICBsZWZ0OiAyNHB4O1xuICAgICAgICB0b3A6IDI0cHg7XG4gICAgICB9XG4gICAgICAubG9naW4tYXJ0IGgxIHtcbiAgICAgICAgbWFyZ2luLXRvcDogMjUwcHg7XG4gICAgICAgIGZvbnQtc2l6ZTogMzBweDtcbiAgICAgIH1cbiAgICAgIC5sb2dpbi1hcnQgcCB7XG4gICAgICAgIG1heC13aWR0aDogMzYwcHg7XG4gICAgICB9XG4gICAgICAuY2lyY3VpdC1sb2dvIHtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgdG9wOiAxMDBweDtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSguNjIpO1xuICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiB0b3AgbGVmdDtcbiAgICAgIH1cbiAgICAgIC5sb2dpbi1wYW5lbCB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgcmlnaHQ6IGF1dG87XG4gICAgICAgIHRvcDogYXV0bztcbiAgICAgICAgdHJhbnNmb3JtOiBub25lO1xuICAgICAgICB3aWR0aDogYXV0bztcbiAgICAgICAgbWFyZ2luOiAyNHB4O1xuICAgICAgICBwYWRkaW5nOiAyOHB4O1xuICAgICAgICBtYXgtaGVpZ2h0OiBub25lO1xuICAgICAgfVxuICAgIH1cbiAgIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 635:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppModule: () => (/* binding */ AppModule),
/* harmony export */   CvDatabaseComponent: () => (/* binding */ CvDatabaseComponent),
/* harmony export */   DropoutPageComponent: () => (/* binding */ DropoutPageComponent),
/* harmony export */   GenericToolComponent: () => (/* binding */ GenericToolComponent),
/* harmony export */   RecruitersPageComponent: () => (/* binding */ RecruitersPageComponent),
/* harmony export */   SafeHtmlPipe: () => (/* binding */ SafeHtmlPipe),
/* harmony export */   TimeAgoPipe: () => (/* binding */ TimeAgoPipe),
/* harmony export */   UsersAdminComponent: () => (/* binding */ UsersAdminComponent)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/platform-browser */ 436);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/platform-browser/animations */ 3835);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/menu */ 1034);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/divider */ 4102);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/tabs */ 8223);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/card */ 3777);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/material/table */ 7697);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/paginator */ 4624);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/material/sort */ 2047);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/material/input */ 5541);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/material/select */ 5175);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @angular/material/icon */ 3840);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! @angular/material/form-field */ 4950);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! @angular/material/datepicker */ 1977);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @angular/material/core */ 4646);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! @angular/material/checkbox */ 7024);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! @angular/material/progress-bar */ 6354);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! @angular/material/slide-toggle */ 8827);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! @angular/material/tooltip */ 640);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! @angular/material/dialog */ 2587);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! @angular/material/sidenav */ 7049);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! @angular/material/chips */ 2772);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! @angular/material/progress-spinner */ 1134);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! @angular/material/snack-bar */ 3347);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _budget_budget_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./budget/budget.component */ 4168);
/* harmony import */ var _import_center_import_center_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./import-center/import-center.component */ 5156);
/* harmony import */ var _internal_job_postings_internal_job_postings_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal-job-postings/internal-job-postings.component */ 5588);
/* harmony import */ var _reports_reports_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reports/reports.component */ 8952);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ 92);
/* harmony import */ var _http_config_interceptor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./http-config.interceptor */ 3698);
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dashboard/dashboard.component */ 2320);
/* harmony import */ var _vendors_vendors_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./vendors/vendors.component */ 5144);
/* harmony import */ var _ai_scorecard_ai_scorecard_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ai-scorecard/ai-scorecard.component */ 5764);
/* harmony import */ var _sla_dashboard_sla_dashboard_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./sla-dashboard/sla-dashboard.component */ 4536);
/* harmony import */ var _jd_generator_jd_generator_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./jd-generator/jd-generator.component */ 8806);
/* harmony import */ var _resume_parser_resume_parser_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./resume-parser/resume-parser.component */ 1380);
/* harmony import */ var _pipeline_board_pipeline_board_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./pipeline-board/pipeline-board.component */ 2084);
/* harmony import */ var _candidate_portal_candidate_portal_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./candidate-portal/candidate-portal.component */ 7890);
/* harmony import */ var _interview_scheduler_interview_scheduler_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./interview-scheduler/interview-scheduler.component */ 3016);
/* harmony import */ var _offer_management_offer_management_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./offer-management/offer-management.component */ 7518);
/* harmony import */ var _talent_pool_talent_pool_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./talent-pool/talent-pool.component */ 4104);
/* harmony import */ var _requisitions_requisitions_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./requisitions/requisitions.component */ 4776);
/* harmony import */ var _source_tracking_source_tracking_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./source-tracking/source-tracking.component */ 3652);
/* harmony import */ var _compliance_compliance_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./compliance/compliance.component */ 1044);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/core */ 7580);
























































function UsersAdminComponent_label_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "label")(1, "input", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("change", function UsersAdminComponent_label_17_Template_input_change_1_listener() {
      const key_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵresetView"](ctx_r2.toggleAccess(key_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const key_r2 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("checked", ctx_r2.draft.access.includes(key_r2));
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", key_r2, " ");
  }
}
function UsersAdminComponent_tr_35_span_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"](item_r4);
  }
}
function UsersAdminComponent_tr_35_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "tr")(1, "td")(2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](4, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](5, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](10, UsersAdminComponent_tr_35_span_10_Template, 2, 1, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](11, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const user_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"](user_r5.fullName);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"](user_r5.email);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"](user_r5.role);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngForOf", user_r5.access);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"](user_r5.status);
  }
}
function CvDatabaseComponent_article_26_span_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const skill_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"](skill_r1);
  }
}
function CvDatabaseComponent_article_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "article", 19)(1, "div", 20)(2, "div")(3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](7, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](9, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](10, CvDatabaseComponent_article_26_span_10_Template, 2, 1, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](11, "div", 23)(12, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](13, "Source file");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](14, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](16, "div", 23)(17, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](18, "Interviewed earlier");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](19, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](21, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const cv_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"](cv_r2.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate2"]("", cv_r2.currentRole, " at ", cv_r2.company, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"]("", cv_r2.experience, " yrs");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngForOf", cv_r2.skills);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"](cv_r2.fileName || "Manual entry");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"](cv_r2.interviewedEarlier ? "Yes" : "No");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"](cv_r2.summary);
  }
}
function RecruitersPageComponent_article_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "article", 2)(1, "div", 3)(2, "div")(3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](7, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](9, "div", 4)(10, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](11, "Submissions");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](12, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](14, "div", 4)(15, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](16, "Selections");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](17, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](19, "div", 4)(20, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](21, "Selection Ratio");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](22, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const recruiter_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"](recruiter_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"](recruiter_r1.role);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"]("", recruiter_r1.joinings, " joins");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"](recruiter_r1.submissions);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"](recruiter_r1.selections);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"]("", recruiter_r1.selectionRatio, "%");
  }
}
function DropoutPageComponent_article_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "article", 3)(1, "div", 4)(2, "div")(3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](7, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](9, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate2"]("", item_r1.firstName, " ", item_r1.lastName, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate2"]("", item_r1.stage, " - ", item_r1.currentCompany, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵclassProp"]("risk-high", item_r1.dropoutRisk >= 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"]("", item_r1.dropoutRisk, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"](item_r1.dropoutRisk >= 70 ? "Immediate recruiter follow-up recommended." : "Risk level is currently manageable.");
  }
}
function GenericToolComponent_label_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "label", 8)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](3, "input", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("change", function GenericToolComponent_label_4_Template_input_change_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵresetView"](ctx_r1.onUpload($event, "jd"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"]((ctx_r1.jdFile == null ? null : ctx_r1.jdFile.fileName) || "Upload JD (.pdf, .docx, .doc, .jpg, .png)");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("accept", ctx_r1.allowedTypes);
  }
}
function GenericToolComponent_textarea_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "textarea", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayListener"]("ngModelChange", function GenericToolComponent_textarea_5_Template_textarea_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayBindingSet"](ctx_r1.jdText, $event) || (ctx_r1.jdText = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.jdText);
  }
}
function GenericToolComponent_label_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "label", 8)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](3, "input", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("change", function GenericToolComponent_label_6_Template_input_change_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r4);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵresetView"](ctx_r1.onUpload($event, "resume"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"]((ctx_r1.resumeFile == null ? null : ctx_r1.resumeFile.fileName) || "Upload resume (.pdf, .docx, .doc, .jpg, .png)");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("accept", ctx_r1.allowedTypes);
  }
}
function GenericToolComponent_textarea_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "textarea", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayListener"]("ngModelChange", function GenericToolComponent_textarea_7_Template_textarea_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r5);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayBindingSet"](ctx_r1.resumeText, $event) || (ctx_r1.resumeText = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.resumeText);
  }
}
function GenericToolComponent_textarea_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "textarea", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayListener"]("ngModelChange", function GenericToolComponent_textarea_8_Template_textarea_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayBindingSet"](ctx_r1.input, $event) || (ctx_r1.input = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.input);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("placeholder", ctx_r1.placeholder);
  }
}
function GenericToolComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "div", 13)(1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](2, "Result");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](3, "pre");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](5, "json");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](5, 1, ctx_r1.result));
  }
}
class SafeHtmlPipe {
  constructor(sanitizer) {
    this.sanitizer = sanitizer;
  }
  transform(value) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
  static {
    this.ɵfac = function SafeHtmlPipe_Factory(t) {
      return new (t || SafeHtmlPipe)(_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_22__.DomSanitizer, 16));
    };
  }
  static {
    this.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdefinePipe"]({
      name: "safeHtml",
      type: SafeHtmlPipe,
      pure: true
    });
  }
}
class TimeAgoPipe {
  transform(value) {
    const date = new Date(value);
    const seconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  }
  static {
    this.ɵfac = function TimeAgoPipe_Factory(t) {
      return new (t || TimeAgoPipe)();
    };
  }
  static {
    this.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdefinePipe"]({
      name: "timeAgo",
      type: TimeAgoPipe,
      pure: true
    });
  }
}
class UsersAdminComponent {
  constructor(http) {
    this.http = http;
    this.users = [];
    this.accessKeys = ['dashboard', 'vendors', 'recruiters', 'cvDatabase', 'aiTools', 'users'];
    this.draft = {
      fullName: '',
      email: '',
      password: '',
      role: 'Recruiter',
      access: ['dashboard', 'cvDatabase']
    };
    this.api = `${_environments_environment__WEBPACK_IMPORTED_MODULE_20__.environment.apiUrl}/api/users`;
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.http.get(this.api).subscribe(users => this.users = users);
  }
  toggleAccess(key) {
    this.draft.access = this.draft.access.includes(key) ? this.draft.access.filter(item => item !== key) : [...this.draft.access, key];
  }
  createUser() {
    this.http.post(this.api, this.draft).subscribe(user => {
      this.users = [...this.users, user];
      this.draft = {
        fullName: '',
        email: '',
        password: '',
        role: 'Recruiter',
        access: ['dashboard', 'cvDatabase']
      };
    });
  }
  static {
    this.ɵfac = function UsersAdminComponent_Factory(t) {
      return new (t || UsersAdminComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_23__.HttpClient));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdefineComponent"]({
      type: UsersAdminComponent,
      selectors: [["app-users-admin"]],
      decls: 36,
      vars: 6,
      consts: [[1, "grid-page"], [1, "card", "form-card"], ["placeholder", "Full name", 1, "input", 3, "ngModelChange", "ngModel"], ["placeholder", "Email", 1, "input", 3, "ngModelChange", "ngModel"], ["placeholder", "Password", "type", "password", 1, "input", 3, "ngModelChange", "ngModel"], [1, "select", 3, "ngModelChange", "ngModel"], [1, "access-grid"], [4, "ngFor", "ngForOf"], [1, "btn", "btn-primary", 3, "click"], [1, "card", "table-card"], [1, "table"], ["type", "checkbox", 3, "change", "checked"], ["class", "chip chip-brand", 4, "ngFor", "ngForOf"], [1, "chip", "chip-brand"]],
      template: function UsersAdminComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "section", 0)(1, "div", 1)(2, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](3, "Create User");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](4, "input", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayListener"]("ngModelChange", function UsersAdminComponent_Template_input_ngModelChange_4_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayBindingSet"](ctx.draft.fullName, $event) || (ctx.draft.fullName = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](5, "input", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayListener"]("ngModelChange", function UsersAdminComponent_Template_input_ngModelChange_5_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayBindingSet"](ctx.draft.email, $event) || (ctx.draft.email = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](6, "input", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayListener"]("ngModelChange", function UsersAdminComponent_Template_input_ngModelChange_6_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayBindingSet"](ctx.draft.password, $event) || (ctx.draft.password = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](7, "select", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayListener"]("ngModelChange", function UsersAdminComponent_Template_select_ngModelChange_7_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayBindingSet"](ctx.draft.role, $event) || (ctx.draft.role = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](8, "option");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](9, "TenantAdmin");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](10, "option");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](11, "TeamLead");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](12, "option");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](13, "Recruiter");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](14, "option");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](15, "Viewer");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](16, "div", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](17, UsersAdminComponent_label_17_Template, 3, 2, "label", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](18, "button", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("click", function UsersAdminComponent_Template_button_click_18_listener() {
            return ctx.createUser();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](19, "Create user");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](20, "div", 9)(21, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](22, "Users & Custom Access");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](23, "table", 10)(24, "thead")(25, "tr")(26, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](27, "User");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](28, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](29, "Role");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](30, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](31, "Access");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](32, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](33, "Status");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](34, "tbody");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](35, UsersAdminComponent_tr_35_Template, 13, 5, "tr", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayProperty"]("ngModel", ctx.draft.fullName);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayProperty"]("ngModel", ctx.draft.email);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayProperty"]("ngModel", ctx.draft.password);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayProperty"]("ngModel", ctx.draft.role);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](10);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngForOf", ctx.accessKeys);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](18);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngForOf", ctx.users);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_24__.NgForOf, _angular_forms__WEBPACK_IMPORTED_MODULE_25__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_25__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_25__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_25__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_25__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_25__.NgModel],
      encapsulation: 2
    });
  }
}
class CvDatabaseComponent {
  constructor(http, route) {
    this.http = http;
    this.route = route;
    this.cvs = [];
    this.query = '';
    this.allowedTypes = '.pdf,.docx,.doc,.jpg,.png';
    this.draft = {
      name: '',
      email: '',
      currentRole: '',
      company: '',
      skillsText: '',
      experience: 0,
      cvText: '',
      interviewedEarlier: false,
      fileName: '',
      fileType: '',
      fileData: ''
    };
    this.api = `${_environments_environment__WEBPACK_IMPORTED_MODULE_20__.environment.apiUrl}/api/cv-database`;
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = params['skills'] || '';
      this.search();
    });
  }
  search() {
    this.http.get(`${this.api}?skills=${encodeURIComponent(this.query)}`).subscribe(cvs => this.cvs = cvs);
  }
  addCv() {
    const payload = {
      ...this.draft,
      skills: this.draft.skillsText.split(',').map(skill => skill.trim()).filter(Boolean)
    };
    this.http.post(this.api, payload).subscribe(() => {
      this.draft = {
        name: '',
        email: '',
        currentRole: '',
        company: '',
        skillsText: '',
        experience: 0,
        cvText: '',
        interviewedEarlier: false,
        fileName: '',
        fileType: '',
        fileData: ''
      };
      this.search();
    });
  }
  onFile(event) {
    const input = event.target;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.draft.fileName = file.name;
      this.draft.fileType = file.type || file.name.split('.').pop();
      this.draft.fileData = String(reader.result || '');
      if (!this.draft.name) {
        this.draft.name = file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
      }
    };
    reader.readAsDataURL(file);
  }
  static {
    this.ɵfac = function CvDatabaseComponent_Factory(t) {
      return new (t || CvDatabaseComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_23__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_26__.ActivatedRoute));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdefineComponent"]({
      type: CvDatabaseComponent,
      selectors: [["app-cv-database"]],
      decls: 27,
      vars: 12,
      consts: [[1, "stack-page"], [1, "card", "form-row"], ["placeholder", "Search by skill, name, role, company...", 1, "input", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "btn", "btn-primary", 3, "click"], [1, "card", "form-card"], [1, "form-grid"], ["placeholder", "Candidate name", 1, "input", 3, "ngModelChange", "ngModel"], ["placeholder", "Email", 1, "input", 3, "ngModelChange", "ngModel"], ["placeholder", "Current role", 1, "input", 3, "ngModelChange", "ngModel"], ["placeholder", "Company", 1, "input", 3, "ngModelChange", "ngModel"], ["placeholder", "Skills comma separated", 1, "input", 3, "ngModelChange", "ngModel"], ["placeholder", "Experience years", "type", "number", 1, "input", 3, "ngModelChange", "ngModel"], [1, "upload-box"], ["type", "file", 3, "change", "accept"], [1, "check-row"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], ["placeholder", "Paste CV text here", 1, "textarea", 3, "ngModelChange", "ngModel"], [1, "cards-grid"], ["class", "card candidate-card", 4, "ngFor", "ngForOf"], [1, "card", "candidate-card"], [1, "candidate-head"], [1, "skill-row"], ["class", "chip", 4, "ngFor", "ngForOf"], [1, "metric-line"], [1, "chip"]],
      template: function CvDatabaseComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "section", 0)(1, "div", 1)(2, "input", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayListener"]("ngModelChange", function CvDatabaseComponent_Template_input_ngModelChange_2_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayBindingSet"](ctx.query, $event) || (ctx.query = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("keyup.enter", function CvDatabaseComponent_Template_input_keyup_enter_2_listener() {
            return ctx.search();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](3, "button", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("click", function CvDatabaseComponent_Template_button_click_3_listener() {
            return ctx.search();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](4, "Search CVs");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](5, "div", 4)(6, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](7, "Add CV Profile");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](8, "div", 5)(9, "input", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayListener"]("ngModelChange", function CvDatabaseComponent_Template_input_ngModelChange_9_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayBindingSet"](ctx.draft.name, $event) || (ctx.draft.name = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](10, "input", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayListener"]("ngModelChange", function CvDatabaseComponent_Template_input_ngModelChange_10_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayBindingSet"](ctx.draft.email, $event) || (ctx.draft.email = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](11, "input", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayListener"]("ngModelChange", function CvDatabaseComponent_Template_input_ngModelChange_11_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayBindingSet"](ctx.draft.currentRole, $event) || (ctx.draft.currentRole = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](12, "input", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayListener"]("ngModelChange", function CvDatabaseComponent_Template_input_ngModelChange_12_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayBindingSet"](ctx.draft.company, $event) || (ctx.draft.company = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](13, "input", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayListener"]("ngModelChange", function CvDatabaseComponent_Template_input_ngModelChange_13_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayBindingSet"](ctx.draft.skillsText, $event) || (ctx.draft.skillsText = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](14, "input", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayListener"]("ngModelChange", function CvDatabaseComponent_Template_input_ngModelChange_14_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayBindingSet"](ctx.draft.experience, $event) || (ctx.draft.experience = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](15, "label", 12)(16, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](17);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](18, "input", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("change", function CvDatabaseComponent_Template_input_change_18_listener($event) {
            return ctx.onFile($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](19, "label", 14)(20, "input", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayListener"]("ngModelChange", function CvDatabaseComponent_Template_input_ngModelChange_20_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayBindingSet"](ctx.draft.interviewedEarlier, $event) || (ctx.draft.interviewedEarlier = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](21, " Interviewed earlier ");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](22, "textarea", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayListener"]("ngModelChange", function CvDatabaseComponent_Template_textarea_ngModelChange_22_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayBindingSet"](ctx.draft.cvText, $event) || (ctx.draft.cvText = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](23, "button", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("click", function CvDatabaseComponent_Template_button_click_23_listener() {
            return ctx.addCv();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](24, "Add to CV database");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](25, "div", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](26, CvDatabaseComponent_article_26_Template, 23, 8, "article", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayProperty"]("ngModel", ctx.query);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayProperty"]("ngModel", ctx.draft.name);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayProperty"]("ngModel", ctx.draft.email);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayProperty"]("ngModel", ctx.draft.currentRole);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayProperty"]("ngModel", ctx.draft.company);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayProperty"]("ngModel", ctx.draft.skillsText);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayProperty"]("ngModel", ctx.draft.experience);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"](ctx.draft.fileName || "Upload CV (.pdf, .docx, .doc, .jpg, .png)");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("accept", ctx.allowedTypes);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayProperty"]("ngModel", ctx.draft.interviewedEarlier);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtwoWayProperty"]("ngModel", ctx.draft.cvText);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngForOf", ctx.cvs);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_24__.NgForOf, _angular_forms__WEBPACK_IMPORTED_MODULE_25__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_25__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_25__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_25__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_25__.NgModel],
      encapsulation: 2
    });
  }
}
class RecruitersPageComponent {
  constructor(http) {
    this.http = http;
    this.recruiters = [];
  }
  ngOnInit() {
    this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_20__.environment.apiUrl}/api/recruiters`).subscribe(data => this.recruiters = data);
  }
  static {
    this.ɵfac = function RecruitersPageComponent_Factory(t) {
      return new (t || RecruitersPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_23__.HttpClient));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdefineComponent"]({
      type: RecruitersPageComponent,
      selectors: [["app-recruiters"]],
      decls: 2,
      vars: 1,
      consts: [[1, "cards-grid"], ["class", "card candidate-card", 4, "ngFor", "ngForOf"], [1, "card", "candidate-card"], [1, "candidate-head"], [1, "metric-line"]],
      template: function RecruitersPageComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "section", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](1, RecruitersPageComponent_article_1_Template, 24, 6, "article", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngForOf", ctx.recruiters);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_24__.NgForOf],
      encapsulation: 2
    });
  }
}
class DropoutPageComponent {
  constructor(http) {
    this.http = http;
    this.candidates = [];
  }
  ngOnInit() {
    this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_20__.environment.apiUrl}/api/candidates`).subscribe(data => this.candidates = data);
  }
  static {
    this.ɵfac = function DropoutPageComponent_Factory(t) {
      return new (t || DropoutPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_23__.HttpClient));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdefineComponent"]({
      type: DropoutPageComponent,
      selectors: [["app-dropout"]],
      decls: 3,
      vars: 1,
      consts: [[1, "stack-page"], [1, "cards-grid"], ["class", "card candidate-card", 4, "ngFor", "ngForOf"], [1, "card", "candidate-card"], [1, "candidate-head"]],
      template: function DropoutPageComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "section", 0)(1, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](2, DropoutPageComponent_article_2_Template, 11, 8, "article", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngForOf", ctx.candidates);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_24__.NgForOf],
      encapsulation: 2
    });
  }
}
class GenericToolComponent {
  constructor(http, route) {
    this.http = http;
    this.route = route;
    this.title = 'AI Assistant';
    this.placeholder = 'Paste CV, JD, or skills here...';
    this.input = '';
    this.jdText = '';
    this.resumeText = '';
    this.jdFile = null;
    this.resumeFile = null;
    this.allowedTypes = '.pdf,.docx,.doc,.jpg,.png';
    this.needsJd = false;
    this.needsResume = false;
    this.route.url.subscribe(url => {
      const path = url.map(x => x.path).join('/');
      this.title = path.includes('jd-checker') ? 'JD Checker' : path.includes('cv-jd-matcher') ? 'CV-JD Matcher' : path.includes('competency-ranker') ? 'Competency Ranker' : 'AI Assistant';
      this.needsJd = this.title === 'JD Checker' || this.title === 'CV-JD Matcher' || this.title === 'Competency Ranker';
      this.needsResume = this.title === 'CV-JD Matcher';
    });
  }
  analyze() {
    this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_20__.environment.apiUrl}/api/ai/analyze`, {
      type: this.title,
      text: this.input,
      jdText: this.jdText,
      resumeText: this.resumeText,
      jdFile: this.jdFile,
      resumeFile: this.resumeFile
    }).subscribe(result => this.result = result);
  }
  onUpload(event, target) {
    const input = event.target;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const payload = {
        fileName: file.name,
        fileType: file.type || file.name.split('.').pop(),
        fileData: String(reader.result || '')
      };
      if (target === 'jd') this.jdFile = payload;
      if (target === 'resume') this.resumeFile = payload;
    };
    reader.readAsDataURL(file);
  }
  static {
    this.ɵfac = function GenericToolComponent_Factory(t) {
      return new (t || GenericToolComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_23__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_26__.ActivatedRoute));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdefineComponent"]({
      type: GenericToolComponent,
      selectors: [["app-tool"]],
      decls: 12,
      vars: 7,
      consts: [[1, "stack-page"], [1, "card", "form-card"], ["class", "upload-box", 4, "ngIf"], ["class", "textarea", "placeholder", "Or type / paste JD here", 3, "ngModel", "ngModelChange", 4, "ngIf"], ["class", "textarea", "placeholder", "Or paste resume text here", 3, "ngModel", "ngModelChange", 4, "ngIf"], ["class", "textarea", 3, "ngModel", "placeholder", "ngModelChange", 4, "ngIf"], [1, "btn", "btn-primary", 3, "click"], ["class", "card", 4, "ngIf"], [1, "upload-box"], ["type", "file", 3, "change", "accept"], ["placeholder", "Or type / paste JD here", 1, "textarea", 3, "ngModelChange", "ngModel"], ["placeholder", "Or paste resume text here", 1, "textarea", 3, "ngModelChange", "ngModel"], [1, "textarea", 3, "ngModelChange", "ngModel", "placeholder"], [1, "card"]],
      template: function GenericToolComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "section", 0)(1, "div", 1)(2, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](4, GenericToolComponent_label_4_Template, 4, 2, "label", 2)(5, GenericToolComponent_textarea_5_Template, 1, 1, "textarea", 3)(6, GenericToolComponent_label_6_Template, 4, 2, "label", 2)(7, GenericToolComponent_textarea_7_Template, 1, 1, "textarea", 4)(8, GenericToolComponent_textarea_8_Template, 1, 2, "textarea", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](9, "button", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("click", function GenericToolComponent_Template_button_click_9_listener() {
            return ctx.analyze();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](10, "Analyze");
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](11, GenericToolComponent_div_11_Template, 6, 3, "div", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"](ctx.title);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", ctx.needsJd);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", ctx.needsJd);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", ctx.needsResume);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", ctx.needsResume);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", !ctx.needsJd && !ctx.needsResume);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", ctx.result);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_24__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_25__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_25__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_25__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_24__.JsonPipe],
      encapsulation: 2
    });
  }
}
const routes = [{
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full'
},
// Core
{
  path: 'dashboard',
  component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_6__.DashboardComponent
}, {
  path: 'vendors',
  component: _vendors_vendors_component__WEBPACK_IMPORTED_MODULE_7__.VendorsComponent
}, {
  path: 'recruiters',
  component: RecruitersPageComponent
}, {
  path: 'cv-database',
  component: CvDatabaseComponent
}, {
  path: 'pipeline-board',
  component: _pipeline_board_pipeline_board_component__WEBPACK_IMPORTED_MODULE_12__.PipelineBoardComponent
}, {
  path: 'requisitions',
  component: _requisitions_requisitions_component__WEBPACK_IMPORTED_MODULE_17__.RequisitionsComponent
}, {
  path: 'candidate-portal',
  component: _candidate_portal_candidate_portal_component__WEBPACK_IMPORTED_MODULE_13__.CandidatePortalComponent
}, {
  path: 'interview-scheduler',
  component: _interview_scheduler_interview_scheduler_component__WEBPACK_IMPORTED_MODULE_14__.InterviewSchedulerComponent
}, {
  path: 'offer-management',
  component: _offer_management_offer_management_component__WEBPACK_IMPORTED_MODULE_15__.OfferManagementComponent
}, {
  path: 'talent-pool',
  component: _talent_pool_talent_pool_component__WEBPACK_IMPORTED_MODULE_16__.TalentPoolComponent
}, {
  path: 'source-tracking',
  component: _source_tracking_source_tracking_component__WEBPACK_IMPORTED_MODULE_18__.SourceTrackingComponent
}, {
  path: 'sla-dashboard',
  component: _sla_dashboard_sla_dashboard_component__WEBPACK_IMPORTED_MODULE_9__.SlaDashboardComponent
},
// AI Tools
{
  path: 'resume-parser',
  component: _resume_parser_resume_parser_component__WEBPACK_IMPORTED_MODULE_11__.ResumeParserComponent
}, {
  path: 'ai-scorecard',
  component: _ai_scorecard_ai_scorecard_component__WEBPACK_IMPORTED_MODULE_8__.AIScorecardComponent
}, {
  path: 'dropout-predictor',
  component: DropoutPageComponent
}, {
  path: 'competency-ranker',
  component: GenericToolComponent
}, {
  path: 'jd-checker',
  component: GenericToolComponent
}, {
  path: 'jd-generator',
  component: _jd_generator_jd_generator_component__WEBPACK_IMPORTED_MODULE_10__.JdGeneratorComponent
},
// Budget Module
{
  path: 'budget',
  component: _budget_budget_component__WEBPACK_IMPORTED_MODULE_0__.BudgetComponent
},
// Import Center
{
  path: 'import-center',
  component: _import_center_import_center_component__WEBPACK_IMPORTED_MODULE_1__.ImportCenterComponent
},
// Internal Job Postings
{
  path: 'internal-job-postings',
  component: _internal_job_postings_internal_job_postings_component__WEBPACK_IMPORTED_MODULE_2__.InternalJobPostingsComponent
},
// Reports
{
  path: 'reports',
  component: _reports_reports_component__WEBPACK_IMPORTED_MODULE_3__.ReportsComponent
},
// Admin
{
  path: 'users',
  component: UsersAdminComponent
}, {
  path: 'compliance',
  component: _compliance_compliance_component__WEBPACK_IMPORTED_MODULE_19__.ComplianceComponent
}, {
  path: '**',
  redirectTo: 'dashboard'
}];
class AppModule {
  static {
    this.ɵfac = function AppModule_Factory(t) {
      return new (t || AppModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdefineNgModule"]({
      type: AppModule,
      bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__.AppComponent]
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdefineInjector"]({
      providers: [{
        provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_23__.HTTP_INTERCEPTORS,
        useClass: _http_config_interceptor__WEBPACK_IMPORTED_MODULE_5__.HttpConfigInterceptor,
        multi: true
      }, _angular_common__WEBPACK_IMPORTED_MODULE_24__.CurrencyPipe, _angular_common__WEBPACK_IMPORTED_MODULE_24__.DecimalPipe, _angular_common__WEBPACK_IMPORTED_MODULE_24__.DatePipe],
      imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_22__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_27__.BrowserAnimationsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_25__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_25__.ReactiveFormsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_23__.HttpClientModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_28__.MatMenuModule, _angular_material_divider__WEBPACK_IMPORTED_MODULE_29__.MatDividerModule, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_30__.MatTabsModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_31__.MatCardModule, _angular_material_table__WEBPACK_IMPORTED_MODULE_32__.MatTableModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_33__.MatPaginatorModule, _angular_material_sort__WEBPACK_IMPORTED_MODULE_34__.MatSortModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_35__.MatInputModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_36__.MatSelectModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_37__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_38__.MatIconModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_39__.MatFormFieldModule, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_40__.MatDatepickerModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_41__.MatNativeDateModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_42__.MatCheckboxModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_43__.MatProgressBarModule, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_44__.MatSlideToggleModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_45__.MatTooltipModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_46__.MatDialogModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_47__.MatSidenavModule, _angular_material_chips__WEBPACK_IMPORTED_MODULE_48__.MatChipsModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_49__.MatProgressSpinnerModule, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_50__.MatSnackBarModule, _angular_router__WEBPACK_IMPORTED_MODULE_26__.RouterModule.forRoot(routes)]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_4__.AppComponent, _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_6__.DashboardComponent, _vendors_vendors_component__WEBPACK_IMPORTED_MODULE_7__.VendorsComponent, RecruitersPageComponent, CvDatabaseComponent, DropoutPageComponent, GenericToolComponent, UsersAdminComponent, SafeHtmlPipe, TimeAgoPipe, _ai_scorecard_ai_scorecard_component__WEBPACK_IMPORTED_MODULE_8__.AIScorecardComponent, _sla_dashboard_sla_dashboard_component__WEBPACK_IMPORTED_MODULE_9__.SlaDashboardComponent, _jd_generator_jd_generator_component__WEBPACK_IMPORTED_MODULE_10__.JdGeneratorComponent,
    // New ATS modules
    _resume_parser_resume_parser_component__WEBPACK_IMPORTED_MODULE_11__.ResumeParserComponent, _pipeline_board_pipeline_board_component__WEBPACK_IMPORTED_MODULE_12__.PipelineBoardComponent, _candidate_portal_candidate_portal_component__WEBPACK_IMPORTED_MODULE_13__.CandidatePortalComponent, _interview_scheduler_interview_scheduler_component__WEBPACK_IMPORTED_MODULE_14__.InterviewSchedulerComponent, _offer_management_offer_management_component__WEBPACK_IMPORTED_MODULE_15__.OfferManagementComponent, _talent_pool_talent_pool_component__WEBPACK_IMPORTED_MODULE_16__.TalentPoolComponent, _requisitions_requisitions_component__WEBPACK_IMPORTED_MODULE_17__.RequisitionsComponent, _source_tracking_source_tracking_component__WEBPACK_IMPORTED_MODULE_18__.SourceTrackingComponent, _compliance_compliance_component__WEBPACK_IMPORTED_MODULE_19__.ComplianceComponent, _budget_budget_component__WEBPACK_IMPORTED_MODULE_0__.BudgetComponent, _import_center_import_center_component__WEBPACK_IMPORTED_MODULE_1__.ImportCenterComponent, _internal_job_postings_internal_job_postings_component__WEBPACK_IMPORTED_MODULE_2__.InternalJobPostingsComponent, _reports_reports_component__WEBPACK_IMPORTED_MODULE_3__.ReportsComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_22__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_27__.BrowserAnimationsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_25__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_25__.ReactiveFormsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_23__.HttpClientModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_28__.MatMenuModule, _angular_material_divider__WEBPACK_IMPORTED_MODULE_29__.MatDividerModule, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_30__.MatTabsModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_31__.MatCardModule, _angular_material_table__WEBPACK_IMPORTED_MODULE_32__.MatTableModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_33__.MatPaginatorModule, _angular_material_sort__WEBPACK_IMPORTED_MODULE_34__.MatSortModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_35__.MatInputModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_36__.MatSelectModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_37__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_38__.MatIconModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_39__.MatFormFieldModule, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_40__.MatDatepickerModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_41__.MatNativeDateModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_42__.MatCheckboxModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_43__.MatProgressBarModule, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_44__.MatSlideToggleModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_45__.MatTooltipModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_46__.MatDialogModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_47__.MatSidenavModule, _angular_material_chips__WEBPACK_IMPORTED_MODULE_48__.MatChipsModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_49__.MatProgressSpinnerModule, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_50__.MatSnackBarModule, _angular_router__WEBPACK_IMPORTED_MODULE_26__.RouterModule]
  });
})();

/***/ }),

/***/ 4168:
/*!********************************************!*\
  !*** ./src/app/budget/budget.component.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BudgetComponent: () => (/* binding */ BudgetComponent)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _budget_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./budget.service */ 1296);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 4456);







function BudgetComponent_option_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const fy_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", fy_r2.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](fy_r2.fiscalYearLabel);
  }
}
function BudgetComponent_div_34_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("\u2705 Import complete \u2014 ", ctx_r3.budgetImportResult.fiscalYears.imported + ctx_r3.budgetImportResult.allocations.imported + ctx_r3.budgetImportResult.lineItems.imported + ctx_r3.budgetImportResult.actuals.imported, " rows imported across all sheets.");
  }
}
function BudgetComponent_div_34_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate5"]("\u26A0\uFE0F Import complete with ", ctx_r3.budgetImportResult.totalErrors, " error(s). Fiscal Years: ", ctx_r3.budgetImportResult.fiscalYears.imported, " | Allocations: ", ctx_r3.budgetImportResult.allocations.imported, " | Line Items: ", ctx_r3.budgetImportResult.lineItems.imported, " | Actuals: ", ctx_r3.budgetImportResult.actuals.imported, "");
  }
}
function BudgetComponent_div_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, BudgetComponent_div_34_span_1_Template, 2, 1, "span", 26)(2, BudgetComponent_div_34_span_2_Template, 2, 5, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.budgetImportResult.totalErrors === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.budgetImportResult.totalErrors > 0);
  }
}
function BudgetComponent_button_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_button_36_Template_button_click_0_listener() {
      const tab_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r5).$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.setTab(tab_r6.key));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const tab_r6 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("active", ctx_r3.activeTab === tab_r6.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](tab_r6.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", tab_r6.label, " ");
  }
}
function BudgetComponent_div_37_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Loading dashboard\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function BudgetComponent_div_37_ng_container_2_div_56_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 59)(1, "div", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "div", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](3, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](5, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "span", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const m_r7 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("height", ctx_r3.scaleBar(m_r7.planned, ctx_r3.maxMonthly), "px");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("title", "Planned: " + _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](3, 7, m_r7.planned, "INR", "symbol", "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("height", ctx_r3.scaleBar(m_r7.actual, ctx_r3.maxMonthly), "px");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("title", "Actual: " + _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](5, 12, m_r7.actual, "INR", "symbol", "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](m_r7.month);
  }
}
function BudgetComponent_div_37_ng_container_2_div_56_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 53)(1, "div", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, BudgetComponent_div_37_ng_container_2_div_56_div_2_Template, 8, 17, "div", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "span", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, " Planned \u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "span", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, " Actual ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r3.kpi.monthlyTrend);
  }
}
function BudgetComponent_div_37_ng_container_2_div_57_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "No trend data yet");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function BudgetComponent_div_37_ng_container_2_div_61_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 67)(1, "span", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "div", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "span", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](7, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const d_r8 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](d_r8.department);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("width", d_r8.planned > 0 ? ctx_r3.min100(d_r8.actual / d_r8.planned * 100) : 0, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("hbar-fill--warn", d_r8.actual / d_r8.planned > 0.9)("hbar-fill--danger", d_r8.actual > d_r8.planned);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", d_r8.planned > 0 ? _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](7, 8, d_r8.actual / d_r8.planned * 100, "1.0-0") : 0, "%");
  }
}
function BudgetComponent_div_37_ng_container_2_div_61_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, BudgetComponent_div_37_ng_container_2_div_61_div_1_Template, 8, 11, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r3.kpi.budgetByDepartment);
  }
}
function BudgetComponent_div_37_ng_container_2_div_62_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "No department data");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function BudgetComponent_div_37_ng_container_2_div_66_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "span", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](4, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const c_r9 = ctx.$implicit;
    const i_r10 = ctx.index;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("background", ctx_r3.categoryColors[i_r10 % ctx_r3.categoryColors.length]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"]("", c_r9.category, " (", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](4, 4, c_r9.pct, "1.0-0"), "%)");
  }
}
function BudgetComponent_div_37_ng_container_2_div_66_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "div", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, BudgetComponent_div_37_ng_container_2_div_66_div_3_Template, 5, 7, "div", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("background", ctx_r3.buildConicGradient(ctx_r3.kpi.budgetByCategory));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r3.kpi.budgetByCategory);
  }
}
function BudgetComponent_div_37_ng_container_2_div_67_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "No spend data");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function BudgetComponent_div_37_ng_container_2_div_71_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 80)(1, "div", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "div", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](3, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "div", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](5, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "span", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const q_r11 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("height", ctx_r3.scaleBar(q_r11.planned, ctx_r3.maxQuarterly), "px");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("title", "Planned: " + _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](3, 7, q_r11.planned, "INR", "symbol", "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("height", ctx_r3.scaleBar(q_r11.actual, ctx_r3.maxQuarterly), "px");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("title", "Actual: " + _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](5, 12, q_r11.actual, "INR", "symbol", "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](q_r11.quarter);
  }
}
function BudgetComponent_div_37_ng_container_2_div_71_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, BudgetComponent_div_37_ng_container_2_div_71_div_1_Template, 8, 17, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r3.kpi.budgetByQuarter);
  }
}
function BudgetComponent_div_37_ng_container_2_div_72_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "No quarterly data");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function BudgetComponent_div_37_ng_container_2_div_76_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 67)(1, "span", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "div", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "span", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](7, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const v_r12 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](v_r12.vendorName);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("width", ctx_r3.maxVendorSpend > 0 ? v_r12.totalSpend / ctx_r3.maxVendorSpend * 100 : 0, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](7, 4, v_r12.totalSpend, "INR", "symbol", "1.0-0"));
  }
}
function BudgetComponent_div_37_ng_container_2_div_76_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, BudgetComponent_div_37_ng_container_2_div_76_div_1_Template, 8, 9, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r3.kpi.topVendorsBySpend);
  }
}
function BudgetComponent_div_37_ng_container_2_div_77_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "No vendor data");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function BudgetComponent_div_37_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 36)(2, "div", 37)(3, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Total Budget");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](7, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "div", 41)(11, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Total Spent");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](15, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](18, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "div", 37)(20, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21, "Remaining");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](24, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](27, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](28, "div", 37)(29, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](30, "Utilization");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](32);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](33, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](34, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](35, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](36, "div", 37)(37, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](38, "Headcount");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](39, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](40);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](41, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](42);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](43, "div", 37)(44, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](45, "Cost Per Hire");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](46, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](47);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](48, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](49, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](50);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](51, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](52, "div", 44)(53, "div", 45)(54, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](55, "Budget vs Actual \u2014 Monthly Trend");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](56, BudgetComponent_div_37_ng_container_2_div_56_Template, 8, 1, "div", 47)(57, BudgetComponent_div_37_ng_container_2_div_57_Template, 2, 0, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](58, "div", 49)(59, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](60, "Utilization by Department");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](61, BudgetComponent_div_37_ng_container_2_div_61_Template, 2, 1, "div", 50)(62, BudgetComponent_div_37_ng_container_2_div_62_Template, 2, 0, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](63, "div", 49)(64, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](65, "Spend by Category");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](66, BudgetComponent_div_37_ng_container_2_div_66_Template, 4, 3, "div", 51)(67, BudgetComponent_div_37_ng_container_2_div_67_Template, 2, 0, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](68, "div", 49)(69, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](70, "Quarterly Budget Phasing");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](71, BudgetComponent_div_37_ng_container_2_div_71_Template, 2, 1, "div", 52)(72, BudgetComponent_div_37_ng_container_2_div_72_Template, 2, 0, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](73, "div", 49)(74, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](75, "Top Vendors by Spend");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](76, BudgetComponent_div_37_ng_container_2_div_76_Template, 2, 1, "div", 50)(77, BudgetComponent_div_37_ng_container_2_div_77_Template, 2, 0, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](7, 32, ctx_r3.kpi.totalBudget, "INR", "symbol", "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r3.selectedFyLabel);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](15, 37, ctx_r3.kpi.totalSpent, "INR", "symbol", "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](18, 42, ctx_r3.kpi.utilizationPct, "1.1-1"), "% utilized");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("kpi-card--warn", ctx_r3.kpi.remaining < ctx_r3.kpi.totalBudget * 0.1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](24, 45, ctx_r3.kpi.remaining, "INR", "symbol", "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("Committed: ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](27, 50, ctx_r3.kpi.totalCommitted, "INR", "symbol", "1.0-0"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](33, 55, ctx_r3.kpi.utilizationPct, "1.1-1"), "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("width", ctx_r3.kpi.utilizationPct, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("progress-bar--warn", ctx_r3.kpi.utilizationPct > 90)("progress-bar--danger", ctx_r3.kpi.utilizationPct > 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"]("", ctx_r3.kpi.headcountFilled, " / ", ctx_r3.kpi.headcountPlanned, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx_r3.kpi.headcountInProgress, " in-progress");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("kpi-card--warn", ctx_r3.kpi.costPerHireActual > ctx_r3.kpi.costPerHireTarget * 1.1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](48, 58, ctx_r3.kpi.costPerHireActual, "INR", "symbol", "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("Target: ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](51, 63, ctx_r3.kpi.costPerHireTarget, "INR", "symbol", "1.0-0"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.kpi.monthlyTrend == null ? null : ctx_r3.kpi.monthlyTrend.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !(ctx_r3.kpi.monthlyTrend == null ? null : ctx_r3.kpi.monthlyTrend.length));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.kpi.budgetByDepartment == null ? null : ctx_r3.kpi.budgetByDepartment.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !(ctx_r3.kpi.budgetByDepartment == null ? null : ctx_r3.kpi.budgetByDepartment.length));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.kpi.budgetByCategory == null ? null : ctx_r3.kpi.budgetByCategory.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !(ctx_r3.kpi.budgetByCategory == null ? null : ctx_r3.kpi.budgetByCategory.length));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.kpi.budgetByQuarter == null ? null : ctx_r3.kpi.budgetByQuarter.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !(ctx_r3.kpi.budgetByQuarter == null ? null : ctx_r3.kpi.budgetByQuarter.length));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.kpi.topVendorsBySpend == null ? null : ctx_r3.kpi.topVendorsBySpend.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !(ctx_r3.kpi.topVendorsBySpend == null ? null : ctx_r3.kpi.topVendorsBySpend.length));
  }
}
function BudgetComponent_div_37_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, BudgetComponent_div_37_div_1_Template, 2, 0, "div", 33)(2, BudgetComponent_div_37_ng_container_2_Template, 78, 68, "ng-container", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.loading);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx_r3.loading && ctx_r3.kpi);
  }
}
function BudgetComponent_div_38_div_6_tr_23_span_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_div_38_div_6_tr_23_span_8_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r15);
      const row_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.startEditCell(row_r16, "Q1"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](2, 1, row_r16.q1Planned, "INR", "symbol", "1.0-0"), " ");
  }
}
function BudgetComponent_div_38_div_6_tr_23_input_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "input", 118);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("blur", function BudgetComponent_div_38_div_6_tr_23_input_9_Template_input_blur_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r17);
      const row_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.saveAllocationQuarter(row_r16, "Q1", $event));
    })("keyup.enter", function BudgetComponent_div_38_div_6_tr_23_input_9_Template_input_keyup_enter_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r17);
      const row_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.saveAllocationQuarter(row_r16, "Q1", $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", row_r16.q1Planned);
  }
}
function BudgetComponent_div_38_div_6_tr_23_span_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_div_38_div_6_tr_23_span_11_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r18);
      const row_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.startEditCell(row_r16, "Q2"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](2, 1, row_r16.q2Planned, "INR", "symbol", "1.0-0"), " ");
  }
}
function BudgetComponent_div_38_div_6_tr_23_input_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "input", 118);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("blur", function BudgetComponent_div_38_div_6_tr_23_input_12_Template_input_blur_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r19);
      const row_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.saveAllocationQuarter(row_r16, "Q2", $event));
    })("keyup.enter", function BudgetComponent_div_38_div_6_tr_23_input_12_Template_input_keyup_enter_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r19);
      const row_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.saveAllocationQuarter(row_r16, "Q2", $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", row_r16.q2Planned);
  }
}
function BudgetComponent_div_38_div_6_tr_23_span_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_div_38_div_6_tr_23_span_14_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r20);
      const row_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.startEditCell(row_r16, "Q3"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](2, 1, row_r16.q3Planned, "INR", "symbol", "1.0-0"), " ");
  }
}
function BudgetComponent_div_38_div_6_tr_23_input_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "input", 118);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("blur", function BudgetComponent_div_38_div_6_tr_23_input_15_Template_input_blur_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r21);
      const row_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.saveAllocationQuarter(row_r16, "Q3", $event));
    })("keyup.enter", function BudgetComponent_div_38_div_6_tr_23_input_15_Template_input_keyup_enter_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r21);
      const row_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.saveAllocationQuarter(row_r16, "Q3", $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", row_r16.q3Planned);
  }
}
function BudgetComponent_div_38_div_6_tr_23_span_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_div_38_div_6_tr_23_span_17_Template_span_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r22);
      const row_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.startEditCell(row_r16, "Q4"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](2, 1, row_r16.q4Planned, "INR", "symbol", "1.0-0"), " ");
  }
}
function BudgetComponent_div_38_div_6_tr_23_input_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "input", 118);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("blur", function BudgetComponent_div_38_div_6_tr_23_input_18_Template_input_blur_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r23);
      const row_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.saveAllocationQuarter(row_r16, "Q4", $event));
    })("keyup.enter", function BudgetComponent_div_38_div_6_tr_23_input_18_Template_input_keyup_enter_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r23);
      const row_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.saveAllocationQuarter(row_r16, "Q4", $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", row_r16.q4Planned);
  }
}
function BudgetComponent_div_38_div_6_tr_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr")(1, "td")(2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, BudgetComponent_div_38_div_6_tr_23_span_8_Template, 3, 6, "span", 114)(9, BudgetComponent_div_38_div_6_tr_23_input_9_Template, 1, 1, "input", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](11, BudgetComponent_div_38_div_6_tr_23_span_11_Template, 3, 6, "span", 114)(12, BudgetComponent_div_38_div_6_tr_23_input_12_Template, 1, 1, "input", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](14, BudgetComponent_div_38_div_6_tr_23_span_14_Template, 3, 6, "span", 114)(15, BudgetComponent_div_38_div_6_tr_23_input_15_Template, 1, 1, "input", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](17, BudgetComponent_div_38_div_6_tr_23_span_17_Template, 3, 6, "span", 114)(18, BudgetComponent_div_38_div_6_tr_23_input_18_Template, 1, 1, "input", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "td", 112);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](21, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](24, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "td")(28, "button", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_div_38_div_6_tr_23_Template_button_click_28_listener() {
      const row_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r14).$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.toggleLineItems(row_r16.department));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](29);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const row_r16 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](row_r16.department);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](row_r16.departmentCode);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx_r3.editingRow[row_r16.department + "_Q1"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.editingRow[row_r16.department + "_Q1"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx_r3.editingRow[row_r16.department + "_Q2"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.editingRow[row_r16.department + "_Q2"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx_r3.editingRow[row_r16.department + "_Q3"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.editingRow[row_r16.department + "_Q3"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx_r3.editingRow[row_r16.department + "_Q4"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.editingRow[row_r16.department + "_Q4"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](21, 16, row_r16.totalPlanned, "INR", "symbol", "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("over-budget", row_r16.totalActual > row_r16.totalPlanned);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](24, 21, row_r16.totalActual, "INR", "symbol", "1.0-0"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](row_r16.headcountPlanned);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r3.expandedDepts[row_r16.department] ? "\u25B2" : "\u25BC", " Details ");
  }
}
function BudgetComponent_div_38_div_6_tr_24_div_2_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 126)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](5, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](8, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](11, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const li_r24 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](li_r24.lineItemType);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](5, 6, li_r24.plannedAmount, "INR", "symbol", "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](8, 11, li_r24.actualAmount || 0, "INR", "symbol", "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("text-danger", li_r24.plannedAmount < (li_r24.actualAmount || 0));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](11, 16, li_r24.plannedAmount - (li_r24.actualAmount || 0), "INR", "symbol", "1.0-0"), " ");
  }
}
function BudgetComponent_div_38_div_6_tr_24_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 123)(1, "div", 124)(2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Type");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Planned");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "Actual");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "Variance");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](10, BudgetComponent_div_38_div_6_tr_24_div_2_div_10_Template, 12, 21, "div", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r3.lineItemsByDept[ctx_r3.row.department]);
  }
}
function BudgetComponent_div_38_div_6_tr_24_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 127);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " No line items yet. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "button", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_div_38_div_6_tr_24_div_3_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r25);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.addLineItemForDept(ctx_r3.row.department));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "+ Add");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}
function BudgetComponent_div_38_div_6_tr_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr", 119)(1, "td", 120);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, BudgetComponent_div_38_div_6_tr_24_div_2_Template, 11, 1, "div", 121)(3, BudgetComponent_div_38_div_6_tr_24_div_3_Template, 4, 0, "div", 122);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.lineItemsByDept[ctx_r3.row.department] == null ? null : ctx_r3.lineItemsByDept[ctx_r3.row.department].length);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !(ctx_r3.lineItemsByDept[ctx_r3.row.department] == null ? null : ctx_r3.lineItemsByDept[ctx_r3.row.department].length));
  }
}
function BudgetComponent_div_38_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div")(1, "div", 106)(2, "table", 107)(3, "thead")(4, "tr")(5, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Department");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "Q1 Planned");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Q2 Planned");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Q3 Planned");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "Q4 Planned");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "Total Planned");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18, "Total Actual");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, "Headcount");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](21, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](23, BudgetComponent_div_38_div_6_tr_23_Template, 30, 26, "tr", 108)(24, BudgetComponent_div_38_div_6_tr_24_Template, 4, 2, "tr", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "tfoot")(26, "tr", 110)(27, "td")(28, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](29, "TOTAL");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](30, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](31);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](32, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](33, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](34);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](35, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](36, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](37);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](38, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](39, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](40);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](41, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](42, "td", 112);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](43);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](44, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](45, "td", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r3.forecast.rows);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.expandedDepts[ctx_r3.row.department]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](32, 7, ctx_r3.forecast.totals.q1Planned, "INR", "symbol", "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](35, 12, ctx_r3.forecast.totals.q2Planned, "INR", "symbol", "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](38, 17, ctx_r3.forecast.totals.q3Planned, "INR", "symbol", "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](41, 22, ctx_r3.forecast.totals.q4Planned, "INR", "symbol", "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](44, 27, ctx_r3.forecast.totals.total, "INR", "symbol", "1.0-0"));
  }
}
function BudgetComponent_div_38_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 128);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Select a fiscal year to view the forecast.");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function BudgetComponent_div_38_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 129);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_div_38_div_8_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r26);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.showAllocDrawer = false);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function BudgetComponent_div_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 32)(1, "div", 86)(2, "button", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_div_38_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r13);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.openAddAllocationDrawer());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "+ Add Allocation");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "button", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_div_38_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r13);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.loadForecast());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "\u21BB Refresh");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, BudgetComponent_div_38_div_6_Template, 46, 32, "div", 34)(7, BudgetComponent_div_38_div_7_Template, 2, 0, "div", 89)(8, BudgetComponent_div_38_div_8_Template, 1, 0, "div", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 91)(10, "div", 92)(11, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Add Allocation");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "button", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_div_38_Template_button_click_13_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r13);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.showAllocDrawer = false);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "\u2715");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "div", 94)(16, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, "Department Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "input", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_38_Template_input_ngModelChange_18_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r13);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.newAlloc.departmentName, $event) || (ctx_r3.newAlloc.departmentName = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, "Department Code");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "input", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_38_Template_input_ngModelChange_21_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r13);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.newAlloc.departmentCode, $event) || (ctx_r3.newAlloc.departmentCode = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23, "Quarter");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "select", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_38_Template_select_ngModelChange_24_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r13);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.newAlloc.quarter, $event) || (ctx_r3.newAlloc.quarter = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "option", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](26, "Q1");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "option", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28, "Q2");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "option", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](30, "Q3");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "option", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](32, "Q4");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](33, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](34, "Category");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](35, "select", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_38_Template_select_ngModelChange_35_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r13);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.newAlloc.category, $event) || (ctx_r3.newAlloc.category = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](36, "option", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](37, "Permanent");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](38, "option", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](39, "Contract");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](40, "option", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](41, "Intern");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](42, "option", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](43, "Replacement");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](44, "option", 102);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](45, "NewRole");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](46, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](47, "Headcount Planned");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](48, "input", 103);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_38_Template_input_ngModelChange_48_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r13);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.newAlloc.headcountPlanned, $event) || (ctx_r3.newAlloc.headcountPlanned = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](49, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](50, "Allotted Amount");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](51, "input", 103);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_38_Template_input_ngModelChange_51_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r13);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.newAlloc.allottedAmount, $event) || (ctx_r3.newAlloc.allottedAmount = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](52, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](53, "Notes");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](54, "textarea", 104);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_38_Template_textarea_ngModelChange_54_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r13);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.newAlloc.notes, $event) || (ctx_r3.newAlloc.notes = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](55, "button", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_div_38_Template_button_click_55_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r13);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.saveAllocation());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](56, "Save Allocation");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.forecast);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx_r3.forecast);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.showAllocDrawer);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("drawer--open", ctx_r3.showAllocDrawer);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.newAlloc.departmentName);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.newAlloc.departmentCode);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.newAlloc.quarter);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.newAlloc.category);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.newAlloc.headcountPlanned);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.newAlloc.allottedAmount);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.newAlloc.notes);
  }
}
function BudgetComponent_div_39_option_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const c_r28 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", c_r28);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](c_r28);
  }
}
function BudgetComponent_div_39_tr_34_button_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_div_39_tr_34_button_24_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r30);
      const a_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.approveActual(a_r31));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Approve");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function BudgetComponent_div_39_tr_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](3, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "td")(7, "span", 141);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](11, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "td")(17, "span", 142);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](19, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "td")(21, "span", 143);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](24, BudgetComponent_div_39_tr_34_button_24_Template, 2, 0, "button", 144);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "button", 145);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_div_39_tr_34_Template_button_click_25_listener() {
      const a_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r29).$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.deleteActualEntry(a_r31.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](26, "Del");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const a_r31 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](3, 17, a_r31.spendDate, "mediumDate"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](a_r31.departmentName);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](a_r31.spendCategory);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](11, 20, a_r31.amount, "INR", "symbol", "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](a_r31.vendorName);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](a_r31.invoiceReference);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("pill--green", ctx_r3.getVariance(a_r31) >= 0)("pill--red", ctx_r3.getVariance(a_r31) < 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](19, 25, ctx_r3.getVariance(a_r31), "INR", "symbol", "1.0-0"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("dot--green", a_r31.isApproved)("dot--amber", !a_r31.isApproved);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", a_r31.isApproved ? "\u2713 Approved" : "\u23F3 Pending", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !a_r31.isApproved);
  }
}
function BudgetComponent_div_39_tr_35_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr")(1, "td", 146);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "No actuals found.");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}
function BudgetComponent_div_39_div_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 129);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_div_39_div_36_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r32);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.showActualDrawer = false);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function BudgetComponent_div_39_option_53_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const c_r33 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", c_r33);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](c_r33);
  }
}
function BudgetComponent_div_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 32)(1, "div", 130)(2, "input", 131);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_39_Template_input_ngModelChange_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r27);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.actualsFilter.dept, $event) || (ctx_r3.actualsFilter.dept = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("input", function BudgetComponent_div_39_Template_input_input_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r27);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.filterActuals());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "select", 132);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_39_Template_select_ngModelChange_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r27);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.actualsFilter.category, $event) || (ctx_r3.actualsFilter.category = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function BudgetComponent_div_39_Template_select_change_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r27);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.filterActuals());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "option", 133);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "All Categories");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, BudgetComponent_div_39_option_6_Template, 2, 2, "option", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "input", 134);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_39_Template_input_ngModelChange_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r27);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.actualsFilter.from, $event) || (ctx_r3.actualsFilter.from = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function BudgetComponent_div_39_Template_input_change_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r27);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.filterActuals());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "input", 135);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_39_Template_input_ngModelChange_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r27);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.actualsFilter.to, $event) || (ctx_r3.actualsFilter.to = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function BudgetComponent_div_39_Template_input_change_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r27);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.filterActuals());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "button", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_div_39_Template_button_click_9_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r27);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.showActualDrawer = true);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "+ Add Actual");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 136)(12, "table", 137)(13, "thead")(14, "tr")(15, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "Date");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18, "Department");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, "Category");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "th", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22, "Amount");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](24, "Vendor");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](26, "Invoice Ref");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28, "Variance");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](30, "Approved");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](32, "Actions");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](33, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](34, BudgetComponent_div_39_tr_34_Template, 27, 30, "tr", 108)(35, BudgetComponent_div_39_tr_35_Template, 3, 0, "tr", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](36, BudgetComponent_div_39_div_36_Template, 1, 0, "div", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](37, "div", 91)(38, "div", 92)(39, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](40, "Log Actual Spend");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](41, "button", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_div_39_Template_button_click_41_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r27);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.showActualDrawer = false);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](42, "\u2715");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](43, "div", 94)(44, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](45, "Spend Date");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](46, "input", 139);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_39_Template_input_ngModelChange_46_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r27);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.newActual.spendDate, $event) || (ctx_r3.newActual.spendDate = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](47, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](48, "Department");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](49, "input", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_39_Template_input_ngModelChange_49_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r27);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.newActual.departmentName, $event) || (ctx_r3.newActual.departmentName = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](50, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](51, "Category");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](52, "select", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_39_Template_select_ngModelChange_52_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r27);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.newActual.spendCategory, $event) || (ctx_r3.newActual.spendCategory = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](53, BudgetComponent_div_39_option_53_Template, 2, 2, "option", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](54, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](55, "Amount");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](56, "input", 103);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_39_Template_input_ngModelChange_56_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r27);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.newActual.amount, $event) || (ctx_r3.newActual.amount = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](57, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](58, "Invoice Reference");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](59, "input", 140);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_39_Template_input_ngModelChange_59_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r27);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.newActual.invoiceReference, $event) || (ctx_r3.newActual.invoiceReference = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](60, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](61, "Notes");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](62, "textarea", 104);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_39_Template_textarea_ngModelChange_62_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r27);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.newActual.notes, $event) || (ctx_r3.newActual.notes = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](63, "button", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_div_39_Template_button_click_63_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r27);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.saveActual());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](64, "Save");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.actualsFilter.dept);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.actualsFilter.category);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r3.spendCategories);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.actualsFilter.from);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.actualsFilter.to);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r3.filteredActuals);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx_r3.filteredActuals.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.showActualDrawer);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("drawer--open", ctx_r3.showActualDrawer);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.newActual.spendDate);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.newActual.departmentName);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.newActual.spendCategory);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r3.spendCategories);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.newActual.amount);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.newActual.invoiceReference);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.newActual.notes);
  }
}
function BudgetComponent_div_40_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 149);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_div_40_button_2_Template_button_click_0_listener() {
      const r_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r34).$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.activeReport = r_r35.key);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const r_r35 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("active", ctx_r3.activeReport === r_r35.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", r_r35.label, " ");
  }
}
function BudgetComponent_div_40_div_3_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 153)(1, "table", 137)(2, "tr")(3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Total Budget");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](7, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "tr")(9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Total Spent");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](13, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "tr")(15, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "Remaining");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](19, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "tr")(21, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22, "Utilization %");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](25, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "tr")(27, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28, "Headcount Planned");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](30);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "tr")(32, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](33, "Headcount Filled");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](34, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](35);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](36, "tr")(37, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](38, "Cost Per Hire (Actual)");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](39, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](40);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](41, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](42, "tr")(43, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](44, "Cost Per Hire (Target)");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](45, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](46);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](47, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](7, 8, ctx_r3.kpi.totalBudget));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](13, 10, ctx_r3.kpi.totalSpent));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](19, 12, ctx_r3.kpi.remaining));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](25, 14, ctx_r3.kpi.utilizationPct, "1.1-1"), "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r3.kpi.headcountPlanned);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r3.kpi.headcountFilled);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](41, 17, ctx_r3.kpi.costPerHireActual));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](47, 19, ctx_r3.kpi.costPerHireTarget));
  }
}
function BudgetComponent_div_40_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r36 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div")(1, "div", 150)(2, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Budget Summary Report");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 151)(5, "button", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_div_40_div_3_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r36);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.exportExcel("summary"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "\u2B07 Excel");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "button", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_div_40_div_3_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r36);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.exportPpt());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "\uD83D\uDCCA PPT");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](9, BudgetComponent_div_40_div_3_div_9_Template, 48, 21, "div", 152);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.kpi);
  }
}
function BudgetComponent_div_40_div_4_tr_40_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](5, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](8, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const c_r38 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](c_r38.category);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](5, 3, c_r38.amount));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](8, 5, c_r38.pctOfTotal, "1.1-1"), "%");
  }
}
function BudgetComponent_div_40_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div")(1, "div", 150)(2, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Cost Per Hire Report");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "button", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_div_40_div_4_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r37);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.exportExcel("cost-per-hire"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "\u2B07 Excel");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 154)(7, "div", 155)(8, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "Overall CPH");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](12, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div", 155)(14, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "Target CPH");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](18, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "div", 155)(20, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21, "Total Hires");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "div", 155)(25, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](26, "Total Spend");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](29, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](30, "table", 137)(31, "thead")(32, "tr")(33, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](34, "Category");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](35, "th", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](36, "Amount");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](37, "th", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](38, "% of Total");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](39, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](40, BudgetComponent_div_40_div_4_tr_40_Template, 9, 8, "tr", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](12, 5, ctx_r3.cph.overallCostPerHire));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](18, 7, ctx_r3.cph.targetCostPerHire));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r3.cph.totalHires);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](29, 9, ctx_r3.cph.totalSpend));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r3.cph.byCategory);
  }
}
function BudgetComponent_div_40_div_5_tr_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](5, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](8, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](11, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "td", 111)(13, "div", 156);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](14, "div", 157);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](16, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const d_r40 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](d_r40.department);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](5, 14, d_r40.plannedBudget, "INR", "symbol", "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](8, 19, d_r40.actualSpend, "INR", "symbol", "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("text-danger", d_r40.variance < 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](11, 24, d_r40.variance, "INR", "symbol", "1.0-0"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("width", ctx_r3.min100(d_r40.utilizationPct), "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("mini-bar--warn", d_r40.utilizationPct > 90)("mini-bar--danger", d_r40.utilizationPct > 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](16, 29, d_r40.utilizationPct, "1.0-0"), "% ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](d_r40.headcountPlanned);
  }
}
function BudgetComponent_div_40_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r39 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div")(1, "div", 150)(2, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Department Budget Report");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "button", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_div_40_div_5_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r39);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.exportExcel("department"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "\u2B07 Excel");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "table", 137)(7, "thead")(8, "tr")(9, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Department");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "th", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Planned");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "th", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "Actual");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "th", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "Variance");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "th", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18, "Utilization");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "th", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, "HC Planned");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](22, BudgetComponent_div_40_div_5_tr_22_Template, 19, 32, "tr", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r3.departments);
  }
}
function BudgetComponent_div_40_div_6_tr_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](5, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const v_r42 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](v_r42.vendorName);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](5, 3, v_r42.totalSpend));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](v_r42.transactionCount);
  }
}
function BudgetComponent_div_40_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div")(1, "div", 150)(2, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Vendor Spend Report");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "button", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_div_40_div_6_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r41);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.exportExcel("vendor-spend"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "\u2B07 Excel");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "table", 137)(7, "thead")(8, "tr")(9, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Vendor");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "th", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Total Spend");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "th", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "Transactions");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](16, BudgetComponent_div_40_div_6_tr_16_Template, 8, 5, "tr", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r3.vendorSpend);
  }
}
function BudgetComponent_div_40_div_7_tr_40_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](5, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](8, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](11, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const d_r44 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](d_r44.department);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](5, 4, d_r44.planned, "INR", "symbol", "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](8, 9, d_r44.actual, "INR", "symbol", "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", d_r44.planned > 0 ? _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](11, 14, d_r44.actual / d_r44.planned * 100, "1.0-0") : 0, "%");
  }
}
function BudgetComponent_div_40_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r43 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div")(1, "div", 150)(2, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Headcount vs Budget Report");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "button", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_div_40_div_7_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r43);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.exportExcel("summary"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "\u2B07 Excel");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 154)(7, "div", 155)(8, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "HC Planned");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "div", 155)(13, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "HC Filled");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "div", 155)(18, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, "In Progress");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "div", 155)(23, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](24, "Fill Rate");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](27, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](28, "table", 137)(29, "thead")(30, "tr")(31, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](32, "Department");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](33, "th", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](34, "Planned");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](35, "th", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](36, "Actual Spend");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](37, "th", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](38, "Utilization");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](39, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](40, BudgetComponent_div_40_div_7_tr_40_Template, 12, 17, "tr", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r3.kpi.headcountPlanned);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r3.kpi.headcountFilled);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r3.kpi.headcountInProgress);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx_r3.kpi.headcountPlanned ? _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](27, 5, ctx_r3.kpi.headcountFilled / ctx_r3.kpi.headcountPlanned * 100, "1.0-0") : 0, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r3.kpi.budgetByDepartment);
  }
}
function BudgetComponent_div_40_div_8_tr_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](3, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "td", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](10, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "td")(12, "span", 141);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const a_r45 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](3, 10, a_r45.spendDate, "mediumDate"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](a_r45.departmentName);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](a_r45.spendCategory);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](10, 13, a_r45.amount));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("chip-green", a_r45.isApproved)("chip-amber", !a_r45.isApproved);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", a_r45.isApproved ? "Approved" : "Pending", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](a_r45.invoiceReference);
  }
}
function BudgetComponent_div_40_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div")(1, "div", 150)(2, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Compliance / Audit Trail");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "table", 137)(5, "thead")(6, "tr")(7, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "Date");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Dept");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Category");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "th", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "Amount");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "Approved");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18, "Invoice");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](20, BudgetComponent_div_40_div_8_tr_20_Template, 16, 15, "tr", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r3.actuals);
  }
}
function BudgetComponent_div_40_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 128);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Select a fiscal year to generate reports.");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function BudgetComponent_div_40_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 32)(1, "div", 147);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, BudgetComponent_div_40_button_2_Template, 2, 3, "button", 148);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, BudgetComponent_div_40_div_3_Template, 10, 1, "div", 34)(4, BudgetComponent_div_40_div_4_Template, 41, 11, "div", 34)(5, BudgetComponent_div_40_div_5_Template, 23, 1, "div", 34)(6, BudgetComponent_div_40_div_6_Template, 17, 1, "div", 34)(7, BudgetComponent_div_40_div_7_Template, 41, 8, "div", 34)(8, BudgetComponent_div_40_div_8_Template, 21, 1, "div", 34)(9, BudgetComponent_div_40_div_9_Template, 2, 0, "div", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r3.reportTypes);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.activeReport === "summary");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.activeReport === "cph" && ctx_r3.cph);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.activeReport === "dept" && (ctx_r3.departments == null ? null : ctx_r3.departments.length));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.activeReport === "vendor" && (ctx_r3.vendorSpend == null ? null : ctx_r3.vendorSpend.length));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.activeReport === "hc" && ctx_r3.kpi);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.activeReport === "audit");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx_r3.selectedFyId);
  }
}
function BudgetComponent_div_41_div_6_button_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r48 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_div_41_div_6_button_12_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r48);
      const fy_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.lockFY(fy_r49));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "\uD83D\uDD12 Lock");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function BudgetComponent_div_41_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r47 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 174)(1, "div", 175)(2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "span", 141);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 176);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](8, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](9, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](10, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 177);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](12, BudgetComponent_div_41_div_6_button_12_Template, 2, 0, "button", 144);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "button", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_div_41_div_6_Template_button_click_13_listener() {
      const fy_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r47).$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.cloneFY(fy_r49));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "\uD83D\uDCCB Clone");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const fy_r49 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](fy_r49.fiscalYearLabel);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMap"]("status-" + fy_r49.status.toLowerCase());
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](fy_r49.status);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate3"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](8, 8, fy_r49.startDate, "mediumDate"), " \u2013 ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](9, 11, fy_r49.endDate, "mediumDate"), " \u00A0|\u00A0 ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind4"](10, 14, fy_r49.totalBudgetAmount, "INR", "symbol", "1.0-0"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", fy_r49.status !== "Locked");
  }
}
function BudgetComponent_div_41_ng_container_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r50 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Fiscal Year Start Month (1=Jan, 4=Apr)");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "input", 178);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_41_ng_container_20_Template_input_ngModelChange_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r50);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.tenantConfig.fiscalYearStartMonth, $event) || (ctx_r3.tenantConfig.fiscalYearStartMonth = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Default Currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "select", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_41_ng_container_20_Template_select_ngModelChange_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r50);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.tenantConfig.defaultCurrency, $event) || (ctx_r3.tenantConfig.defaultCurrency = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "option", 179);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "USD");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "option", 180);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "EUR");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "option", 181);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "GBP");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "option", 182);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "INR");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "option", 183);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "CAD");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "option", 184);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18, "AUD");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, "Cost Per Hire Target");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "input", 103);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_41_ng_container_20_Template_input_ngModelChange_21_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r50);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.tenantConfig.costPerHireTargetAmount, $event) || (ctx_r3.tenantConfig.costPerHireTargetAmount = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23, "Approval Threshold Amount");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "input", 103);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_41_ng_container_20_Template_input_ngModelChange_24_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r50);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.tenantConfig.approvalThresholdAmount, $event) || (ctx_r3.tenantConfig.approvalThresholdAmount = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](26, "Brand Color");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "input", 185);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_41_ng_container_20_Template_input_ngModelChange_27_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r50);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.tenantConfig.brandColor, $event) || (ctx_r3.tenantConfig.brandColor = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](28, "label", 186)(29, "input", 187);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_41_ng_container_20_Template_input_ngModelChange_29_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r50);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.tenantConfig.budgetApprovalRequired, $event) || (ctx_r3.tenantConfig.budgetApprovalRequired = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](30, " Budget Approval Required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "button", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_div_41_ng_container_20_Template_button_click_31_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r50);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.saveConfig());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](32, "Save Configuration");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.tenantConfig.fiscalYearStartMonth);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.tenantConfig.defaultCurrency);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.tenantConfig.costPerHireTargetAmount);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.tenantConfig.approvalThresholdAmount);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.tenantConfig.brandColor);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.tenantConfig.budgetApprovalRequired);
  }
}
function BudgetComponent_div_41_div_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r51 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 188)(1, "span", 189);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "\u283F");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "input", 190);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_41_div_27_Template_input_ngModelChange_3_listener($event) {
      const cat_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r51).$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](cat_r52.categoryName, $event) || (cat_r52.categoryName = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "input", 191);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_41_div_27_Template_input_ngModelChange_4_listener($event) {
      const cat_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r51).$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](cat_r52.categoryCode, $event) || (cat_r52.categoryCode = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "input", 173);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_41_div_27_Template_input_ngModelChange_5_listener($event) {
      const cat_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r51).$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](cat_r52.defaultEstimatePerHire, $event) || (cat_r52.defaultEstimatePerHire = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "label", 186)(7, "input", 187);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_41_div_27_Template_input_ngModelChange_7_listener($event) {
      const cat_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r51).$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](cat_r52.isActive, $event) || (cat_r52.isActive = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, " Active ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "button", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_div_41_div_27_Template_button_click_9_listener() {
      const cat_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r51).$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.saveCostCategory(cat_r52));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Save");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const cat_r52 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", cat_r52.categoryName);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", cat_r52.categoryCode);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", cat_r52.defaultEstimatePerHire);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", cat_r52.isActive);
  }
}
function BudgetComponent_div_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r46 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 32)(1, "div", 158)(2, "div", 159)(3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Fiscal Year Management");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 160);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, BudgetComponent_div_41_div_6_Template, 15, 19, "div", 161);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 162)(8, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "Create New Fiscal Year");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "input", 163);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_41_Template_input_ngModelChange_10_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r46);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.newFy.label, $event) || (ctx_r3.newFy.label = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 164)(12, "input", 139);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_41_Template_input_ngModelChange_12_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r46);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.newFy.startDate, $event) || (ctx_r3.newFy.startDate = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "input", 139);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_41_Template_input_ngModelChange_13_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r46);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.newFy.endDate, $event) || (ctx_r3.newFy.endDate = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "input", 165);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_41_Template_input_ngModelChange_14_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r46);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.newFy.totalBudgetAmount, $event) || (ctx_r3.newFy.totalBudgetAmount = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "button", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_div_41_Template_button_click_15_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r46);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.createFiscalYear());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "Create Fiscal Year");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "div", 159)(18, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, "Tenant Configuration");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](20, BudgetComponent_div_41_ng_container_20_Template, 33, 6, "ng-container", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "div", 166)(22, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23, "Cost Categories");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "p", 167);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](25, "Tenant-customizable spend categories used throughout the budget module.");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "div", 168);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](27, BudgetComponent_div_41_div_27_Template, 11, 4, "div", 169);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](28, "div", 170)(29, "input", 171);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_41_Template_input_ngModelChange_29_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r46);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.newCat.categoryName, $event) || (ctx_r3.newCat.categoryName = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](30, "input", 172);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_41_Template_input_ngModelChange_30_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r46);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.newCat.categoryCode, $event) || (ctx_r3.newCat.categoryCode = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "input", 173);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_div_41_Template_input_ngModelChange_31_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r46);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.newCat.defaultEstimatePerHire, $event) || (ctx_r3.newCat.defaultEstimatePerHire = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](32, "button", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_div_41_Template_button_click_32_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r46);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.addCostCategory());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](33, "+ Add Category");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r3.fiscalYears);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.newFy.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.newFy.startDate);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.newFy.endDate);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.newFy.totalBudgetAmount);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.tenantConfig);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r3.costCategories);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.newCat.categoryName);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.newCat.categoryCode);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.newCat.defaultEstimatePerHire);
  }
}
// ─────────────────────────────────────────────────────────────────────────────
class BudgetComponent {
  // Chart scale helpers
  get maxMonthly() {
    if (!this.kpi?.monthlyTrend?.length) return 1;
    return Math.max(...this.kpi.monthlyTrend.flatMap(m => [m.planned, m.actual]), 1);
  }
  get maxQuarterly() {
    if (!this.kpi?.budgetByQuarter?.length) return 1;
    return Math.max(...this.kpi.budgetByQuarter.flatMap(q => [q.planned, q.actual]), 1);
  }
  get maxVendorSpend() {
    if (!this.kpi?.topVendorsBySpend?.length) return 1;
    return Math.max(...this.kpi.topVendorsBySpend.map(v => v.totalSpend), 1);
  }
  scaleBar(value, max) {
    return max > 0 ? Math.round(value / max * 120) : 0;
  }
  min100(v) {
    return Math.min(v, 100);
  }
  buildConicGradient(cats) {
    let stops = '';
    let cumulative = 0;
    cats.forEach((c, i) => {
      const color = this.categoryColors[i % this.categoryColors.length];
      stops += `${color} ${cumulative}% ${cumulative + c.pct}%, `;
      cumulative += c.pct;
    });
    return `conic-gradient(${stops.slice(0, -2)})`;
  }
  getVariance(actual) {
    // Return allocated amount - actual (positive = under budget)
    const allocation = this.allocations.find(a => a.id === actual.allocationId || a.departmentName === actual.departmentName);
    if (!allocation) return 0;
    return allocation.allottedAmount - actual.amount;
  }
  constructor(svc, route, router, http) {
    this.svc = svc;
    this.route = route;
    this.router = router;
    this.http = http;
    this.activeTab = 'dashboard';
    this.selectedFyId = '';
    this.selectedFyLabel = '';
    this.loading = false;
    this.fiscalYears = [];
    this.kpi = null;
    this.forecast = null;
    this.cph = null;
    this.vendorSpend = [];
    this.departments = [];
    this.actuals = [];
    this.filteredActuals = [];
    this.allocations = [];
    this.tenantConfig = null;
    this.costCategories = [];
    this.budgetImportResult = null;
    this.tabs = [{
      key: 'dashboard',
      label: 'Dashboard',
      icon: '📊'
    }, {
      key: 'forecast',
      label: 'Forecast',
      icon: '📅'
    }, {
      key: 'actuals',
      label: 'Actuals',
      icon: '💰'
    }, {
      key: 'reports',
      label: 'Reports',
      icon: '📋'
    }, {
      key: 'settings',
      label: 'Settings',
      icon: '⚙️'
    }];
    this.reportTypes = [{
      key: 'summary',
      label: 'Budget Summary'
    }, {
      key: 'cph',
      label: 'Cost Per Hire'
    }, {
      key: 'dept',
      label: 'Department Budget'
    }, {
      key: 'vendor',
      label: 'Vendor Spend'
    }, {
      key: 'hc',
      label: 'Headcount vs Budget'
    }, {
      key: 'audit',
      label: 'Compliance / Audit'
    }];
    this.activeReport = 'summary';
    this.spendCategories = ['BaseSalary', 'SigningBonus', 'AgencyFee', 'BackgroundCheck', 'RelocationCost', 'TrainingCost', 'EquipmentCost', 'Other'];
    this.categoryColors = ['#1565C0', '#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#06b6d4'];
    this.editingRow = {};
    this.expandedDepts = {};
    this.lineItemsByDept = {};
    this.actualsFilter = {
      dept: '',
      category: '',
      from: '',
      to: ''
    };
    this.showActualDrawer = false;
    this.showAllocDrawer = false;
    this.newActual = {
      spendDate: new Date().toISOString().slice(0, 10),
      departmentName: '',
      spendCategory: 'Other',
      amount: 0,
      invoiceReference: '',
      notes: ''
    };
    this.newAlloc = {
      departmentName: '',
      departmentCode: '',
      quarter: 0,
      category: 0,
      headcountPlanned: 1,
      allottedAmount: 0,
      notes: ''
    };
    this.newFy = {
      label: '',
      startDate: '',
      endDate: '',
      totalBudgetAmount: 0
    };
    this.newCat = {
      categoryName: '',
      categoryCode: '',
      defaultEstimatePerHire: null
    };
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['fy']) this.selectedFyId = params['fy'];
      if (params['tab']) this.activeTab = params['tab'];
    });
    this.loadFiscalYears();
    this.loadConfig();
    this.loadCostCategories();
  }
  setTab(tab) {
    this.activeTab = tab;
    this.router.navigate([], {
      queryParams: {
        tab,
        fy: this.selectedFyId || undefined
      },
      queryParamsHandling: 'merge'
    });
    this.loadTabData(tab);
  }
  onFyChange() {
    const fy = this.fiscalYears.find(f => f.id === this.selectedFyId);
    this.selectedFyLabel = fy?.fiscalYearLabel ?? '';
    this.router.navigate([], {
      queryParams: {
        fy: this.selectedFyId
      },
      queryParamsHandling: 'merge'
    });
    this.loadTabData(this.activeTab);
  }
  loadTabData(tab) {
    if (!this.selectedFyId) return;
    switch (tab) {
      case 'dashboard':
        this.loadDashboard();
        break;
      case 'forecast':
        this.loadForecast();
        break;
      case 'actuals':
        this.loadActuals();
        break;
      case 'reports':
        this.loadReportsData();
        break;
    }
  }
  loadFiscalYears() {
    this.svc.getFiscalYears().subscribe(fys => {
      this.fiscalYears = fys;
      if (!this.selectedFyId && fys.length) {
        const active = fys.find(f => f.status === 'Active') ?? fys[0];
        this.selectedFyId = active.id;
        this.selectedFyLabel = active.fiscalYearLabel;
        this.loadDashboard();
      }
    });
  }
  loadDashboard() {
    if (!this.selectedFyId) return;
    this.loading = true;
    this.svc.getDashboard(this.selectedFyId).subscribe({
      next: kpi => {
        this.kpi = kpi;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
  loadForecast() {
    if (!this.selectedFyId) return;
    this.svc.getForecast(this.selectedFyId).subscribe(f => this.forecast = f);
    this.svc.getAllocations(this.selectedFyId).subscribe(a => this.allocations = a);
  }
  loadActuals() {
    if (!this.selectedFyId) return;
    this.svc.getActuals(this.selectedFyId).subscribe(a => {
      this.actuals = a;
      this.filteredActuals = [...a];
    });
    this.svc.getAllocations(this.selectedFyId).subscribe(a => this.allocations = a);
  }
  loadReportsData() {
    if (!this.selectedFyId) return;
    if (!this.kpi) this.loadDashboard();
    this.svc.getCostPerHire(this.selectedFyId).subscribe(c => this.cph = c);
    this.svc.getVendorSpend(this.selectedFyId).subscribe(v => this.vendorSpend = v);
    this.svc.getDepartmentBreakdown(this.selectedFyId).subscribe(d => this.departments = d);
    this.svc.getActuals(this.selectedFyId).subscribe(a => this.actuals = a);
  }
  loadConfig() {
    this.svc.getConfig().subscribe(c => this.tenantConfig = c);
  }
  loadCostCategories() {
    this.svc.getCostCategories().subscribe(c => this.costCategories = c);
  }
  filterActuals() {
    this.filteredActuals = this.actuals.filter(a => {
      if (this.actualsFilter.dept && a.departmentName?.toLowerCase().indexOf(this.actualsFilter.dept.toLowerCase()) < 0) return false;
      if (this.actualsFilter.category && a.spendCategory !== this.actualsFilter.category) return false;
      if (this.actualsFilter.from && a.spendDate < this.actualsFilter.from) return false;
      if (this.actualsFilter.to && a.spendDate > this.actualsFilter.to) return false;
      return true;
    });
  }
  saveActual() {
    const payload = {
      ...this.newActual,
      fiscalYearId: this.selectedFyId
    };
    this.svc.createActual(payload).subscribe(() => {
      this.showActualDrawer = false;
      this.newActual = {
        spendDate: new Date().toISOString().slice(0, 10),
        departmentName: '',
        spendCategory: 'Other',
        amount: 0
      };
      this.loadActuals();
    });
  }
  approveActual(actual) {
    this.svc.updateActual(actual.id, {
      isApproved: true
    }).subscribe(() => this.loadActuals());
  }
  deleteActualEntry(id) {
    if (!confirm('Delete this actual entry?')) return;
    this.svc.deleteActual(id).subscribe(() => this.loadActuals());
  }
  openAddAllocationDrawer() {
    this.showAllocDrawer = true;
  }
  saveAllocation() {
    const payload = {
      ...this.newAlloc,
      fiscalYearId: this.selectedFyId,
      quarter: +this.newAlloc.quarter,
      category: +this.newAlloc.category
    };
    this.svc.createAllocation(payload).subscribe(() => {
      this.showAllocDrawer = false;
      this.newAlloc = {
        departmentName: '',
        departmentCode: '',
        quarter: 0,
        category: 0,
        headcountPlanned: 1,
        allottedAmount: 0,
        notes: ''
      };
      this.loadForecast();
    });
  }
  startEditCell(row, quarter) {
    this.editingRow[row.department + '_' + quarter] = true;
  }
  saveAllocationQuarter(row, quarter, event) {
    this.editingRow[row.department + '_' + quarter] = false;
    const value = +event.target.value;
    const alloc = this.allocations.find(a => a.departmentName === row.department && a.quarter === quarter);
    if (alloc) {
      this.svc.updateAllocation(alloc.id, {
        allottedAmount: value
      }).subscribe(() => this.loadForecast());
    } else {
      this.svc.createAllocation({
        fiscalYearId: this.selectedFyId,
        departmentName: row.department,
        quarter: ['Q1', 'Q2', 'Q3', 'Q4'].indexOf(quarter),
        category: 0,
        headcountPlanned: row.headcountPlanned,
        allottedAmount: value
      }).subscribe(() => this.loadForecast());
    }
  }
  toggleLineItems(dept) {
    this.expandedDepts[dept] = !this.expandedDepts[dept];
    if (this.expandedDepts[dept] && !this.lineItemsByDept[dept]) {
      const alloc = this.allocations.find(a => a.departmentName === dept);
      if (alloc) {
        this.svc.getLineItems(alloc.id).subscribe(li => this.lineItemsByDept[dept] = li);
      }
    }
  }
  addLineItemForDept(dept) {
    const alloc = this.allocations.find(a => a.departmentName === dept);
    if (!alloc) return;
    this.svc.createLineItem({
      allocationId: alloc.id,
      lineItemType: 0,
      plannedAmount: 0
    }).subscribe(() => this.toggleLineItems(dept));
  }
  createFiscalYear() {
    this.svc.createFiscalYear({
      fiscalYearLabel: this.newFy.label,
      startDate: this.newFy.startDate,
      endDate: this.newFy.endDate,
      totalBudgetAmount: +this.newFy.totalBudgetAmount,
      currency: this.tenantConfig?.defaultCurrency ?? 'USD'
    }).subscribe(() => {
      this.newFy = {
        label: '',
        startDate: '',
        endDate: '',
        totalBudgetAmount: 0
      };
      this.loadFiscalYears();
    });
  }
  lockFY(fy) {
    if (!confirm(`Lock ${fy.fiscalYearLabel}? No further edits will be allowed.`)) return;
    this.svc.lockFiscalYear(fy.id).subscribe(() => this.loadFiscalYears());
  }
  cloneFY(fy) {
    this.svc.cloneFiscalYear(fy.id).subscribe(() => this.loadFiscalYears());
  }
  saveConfig() {
    if (!this.tenantConfig) return;
    this.svc.updateConfig(this.tenantConfig).subscribe(c => this.tenantConfig = c);
  }
  saveCostCategory(cat) {
    this.svc.updateCostCategory(cat.id, cat).subscribe();
  }
  addCostCategory() {
    const order = this.costCategories.length + 1;
    this.svc.createCostCategory({
      ...this.newCat,
      displayOrder: order,
      isActive: true
    }).subscribe(() => {
      this.newCat = {
        categoryName: '',
        categoryCode: '',
        defaultEstimatePerHire: null
      };
      this.loadCostCategories();
    });
  }
  exportExcel(reportType = 'all') {
    if (!this.selectedFyId) return;
    this.svc.exportExcel(this.selectedFyId, reportType).subscribe(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Budget_${this.selectedFyLabel}_${reportType}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }
  exportPpt() {
    if (!this.selectedFyId) return;
    this.svc.exportPpt(this.selectedFyId).subscribe(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Budget_${this.selectedFyLabel}.pptx`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }
  downloadBudgetTemplate() {
    const apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl;
    this.http.get(`${apiUrl}/api/budget/import-template`, {
      responseType: 'blob'
    }).subscribe(blob => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'Budget_Import_Template.xlsx';
      a.click();
      URL.revokeObjectURL(a.href);
    });
  }
  downloadBudgetSample() {
    this.downloadBudgetTemplate();
  }
  onBudgetExcelUpload(event) {
    const input = event.target;
    const file = input.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    const apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl;
    this.http.post(`${apiUrl}/api/budget/import-excel`, fd).subscribe({
      next: res => {
        this.budgetImportResult = res;
        this.loadFiscalYears();
      },
      error: err => {
        alert('Import failed: ' + (err?.error?.error ?? 'Unknown error'));
      }
    });
    input.value = '';
  }
  static {
    this.ɵfac = function BudgetComponent_Factory(t) {
      return new (t || BudgetComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_budget_service__WEBPACK_IMPORTED_MODULE_1__.BudgetService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: BudgetComponent,
      selectors: [["app-budget"]],
      decls: 42,
      vars: 11,
      consts: [["budgetExcelInput", ""], [1, "budget-shell"], [1, "budget-topbar"], [1, "budget-topbar-left"], [1, "fy-selector"], [1, "select", 3, "ngModelChange", "change", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], [1, "budget-topbar-right"], [1, "btn", "btn-outline", "btn-sm", 3, "click", "disabled"], [1, "budget-import-strip"], [1, "import-strip-body"], [1, "import-strip-left"], [2, "font-size", "20px"], [1, "import-strip-title"], [1, "import-strip-desc"], [1, "import-strip-actions"], [1, "btn", "btn-sm", "btn-outline-import", 3, "click"], ["type", "file", "accept", ".xlsx", 2, "display", "none", 3, "change"], [1, "import-strip-sample"], [1, "import-strip-link", 3, "click"], ["class", "import-strip-result", 4, "ngIf"], [1, "budget-tabs"], ["class", "budget-tab", 3, "active", "click", 4, "ngFor", "ngForOf"], ["class", "tab-content", 4, "ngIf"], [3, "value"], [1, "import-strip-result"], ["style", "color:#059669", 4, "ngIf"], ["style", "color:#d97706", 4, "ngIf"], [2, "color", "#059669"], [2, "color", "#d97706"], [1, "budget-tab", 3, "click"], [1, "tab-icon"], [1, "tab-content"], ["class", "loading-state", 4, "ngIf"], [4, "ngIf"], [1, "loading-state"], [1, "kpi-grid"], [1, "kpi-card"], [1, "kpi-label"], [1, "kpi-value"], [1, "kpi-sub"], [1, "kpi-card", "kpi-card--spent"], [1, "progress-bar-wrap"], [1, "progress-bar"], [1, "charts-grid"], [1, "chart-card", "chart-card--wide"], [1, "chart-title"], ["class", "bar-chart", 4, "ngIf"], ["class", "empty-chart", 4, "ngIf"], [1, "chart-card"], ["class", "hbar-list", 4, "ngIf"], ["class", "donut-wrap", 4, "ngIf"], ["class", "quarter-bars", 4, "ngIf"], [1, "bar-chart"], [1, "bar-chart-inner"], ["class", "bar-group", 4, "ngFor", "ngForOf"], [1, "chart-legend"], [1, "legend-dot", "legend-dot--planned"], [1, "legend-dot", "legend-dot--actual"], [1, "bar-group"], [1, "bar-pair"], [1, "bar", "bar--planned", 3, "title"], [1, "bar", "bar--actual", 3, "title"], [1, "bar-label"], [1, "empty-chart"], [1, "hbar-list"], ["class", "hbar-row", 4, "ngFor", "ngForOf"], [1, "hbar-row"], [1, "hbar-label"], [1, "hbar-track"], [1, "hbar-fill"], [1, "hbar-pct"], [1, "donut-wrap"], [1, "donut"], [1, "donut-legend"], ["class", "donut-legend-item", 4, "ngFor", "ngForOf"], [1, "donut-legend-item"], [1, "donut-swatch"], [1, "quarter-bars"], ["class", "quarter-bar-group", 4, "ngFor", "ngForOf"], [1, "quarter-bar-group"], [1, "quarter-bar-wrap"], [1, "quarter-bar", "quarter-bar--planned", 3, "title"], [1, "quarter-bar", "quarter-bar--actual", 3, "title"], [1, "quarter-label"], [1, "hbar-fill", "hbar-fill--vendor"], [1, "tab-toolbar"], [1, "btn", "btn-primary", "btn-sm", 3, "click"], [1, "btn", "btn-outline", "btn-sm", 3, "click"], ["class", "empty-state", 4, "ngIf"], ["class", "drawer-overlay", 3, "click", 4, "ngIf"], [1, "drawer"], [1, "drawer-header"], [1, "btn", "btn-ghost", "btn-sm", 3, "click"], [1, "drawer-body"], ["placeholder", "Engineering", 1, "input", 3, "ngModelChange", "ngModel"], ["placeholder", "ENG", 1, "input", 3, "ngModelChange", "ngModel"], [1, "select", 3, "ngModelChange", "ngModel"], ["value", "0"], ["value", "1"], ["value", "2"], ["value", "3"], ["value", "4"], ["type", "number", 1, "input", 3, "ngModelChange", "ngModel"], ["rows", "2", 1, "textarea", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-primary", 3, "click"], [1, "forecast-table-wrap"], [1, "forecast-table"], [4, "ngFor", "ngForOf"], ["class", "line-item-row", 4, "ngIf"], [1, "totals-row"], [1, "num-cell"], [1, "num-cell", "total-cell"], ["colspan", "3"], ["class", "editable-cell", 3, "click", 4, "ngIf"], ["type", "number", "class", "cell-input", 3, "value", "blur", "keyup.enter", 4, "ngIf"], [1, "btn", "btn-ghost", "btn-xs", 3, "click"], [1, "editable-cell", 3, "click"], ["type", "number", 1, "cell-input", 3, "blur", "keyup.enter", "value"], [1, "line-item-row"], ["colspan", "9"], ["class", "line-item-panel", 4, "ngIf"], ["class", "empty-line-items", 4, "ngIf"], [1, "line-item-panel"], [1, "line-item-grid-header"], ["class", "line-item-grid-row", 4, "ngFor", "ngForOf"], [1, "line-item-grid-row"], [1, "empty-line-items"], [1, "empty-state"], [1, "drawer-overlay", 3, "click"], [1, "filter-bar"], ["placeholder", "Filter department\u2026", 1, "input", "input--sm", 3, "ngModelChange", "input", "ngModel"], [1, "select", "select--sm", 3, "ngModelChange", "change", "ngModel"], ["value", ""], ["type", "date", "placeholder", "From", 1, "input", "input--sm", 3, "ngModelChange", "change", "ngModel"], ["type", "date", "placeholder", "To", 1, "input", "input--sm", 3, "ngModelChange", "change", "ngModel"], [1, "table-wrap"], [1, "data-table"], [1, "num-th"], ["type", "date", 1, "input", 3, "ngModelChange", "ngModel"], [1, "input", 3, "ngModelChange", "ngModel"], [1, "chip", "chip-sm"], [1, "variance-pill"], [1, "status-dot"], ["class", "btn btn-ghost btn-xs", 3, "click", 4, "ngIf"], [1, "btn", "btn-ghost", "btn-xs", "btn--danger", 3, "click"], ["colspan", "9", 1, "empty-state"], [1, "reports-tabs"], ["class", "report-tab", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "report-tab", 3, "click"], [1, "report-toolbar"], [1, "report-actions"], ["class", "report-table-wrap", 4, "ngIf"], [1, "report-table-wrap"], [1, "kpi-mini-grid"], [1, "kpi-mini"], [1, "mini-progress"], [1, "mini-bar"], [1, "settings-grid"], [1, "settings-card"], [1, "fy-list"], ["class", "fy-item", 4, "ngFor", "ngForOf"], [1, "fy-create"], ["placeholder", "Label e.g. FY 2026-27", 1, "input", 3, "ngModelChange", "ngModel"], [1, "date-row"], ["type", "number", "placeholder", "Total Budget", 1, "input", 3, "ngModelChange", "ngModel"], [1, "settings-card", "settings-card--wide"], [1, "settings-hint"], [1, "category-list"], ["class", "category-row", 4, "ngFor", "ngForOf"], [1, "add-category-form"], ["placeholder", "Category Name", 1, "input", "input--sm", 3, "ngModelChange", "ngModel"], ["placeholder", "Code", 1, "input", "input--sm", "code-input", 3, "ngModelChange", "ngModel"], ["type", "number", "placeholder", "Default CPH", 1, "input", "input--sm", "num-input", 3, "ngModelChange", "ngModel"], [1, "fy-item"], [1, "fy-item-info"], [1, "fy-item-meta"], [1, "fy-actions"], ["type", "number", "min", "1", "max", "12", 1, "input", 3, "ngModelChange", "ngModel"], ["value", "USD"], ["value", "EUR"], ["value", "GBP"], ["value", "INR"], ["value", "CAD"], ["value", "AUD"], ["type", "color", 1, "input", 3, "ngModelChange", "ngModel"], [1, "toggle-label"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], [1, "category-row"], [1, "drag-handle"], [1, "input", "input--sm", 3, "ngModelChange", "ngModel"], [1, "input", "input--sm", "code-input", 3, "ngModelChange", "ngModel"]],
      template: function BudgetComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "label");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Fiscal Year");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "select", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function BudgetComponent_Template_select_ngModelChange_6_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx.selectedFyId, $event) || (ctx.selectedFyId = $event);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function BudgetComponent_Template_select_change_6_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.onFyChange());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, BudgetComponent_option_7_Template, 2, 2, "option", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 7)(9, "button", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_Template_button_click_9_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.exportExcel());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, " \u2B07 Export Excel ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "button", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_Template_button_click_11_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.exportPpt());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, " \uD83D\uDCCA Export PPT ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div", 9)(14, "div", 10)(15, "div", 11)(16, "span", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, "\uD83D\uDCE5");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "div")(19, "div", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, "Import Budget Data");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "div", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22, "Upload your budget Excel file to populate all budget data across all periods");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "div", 15)(24, "button", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_Template_button_click_24_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.downloadBudgetTemplate());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](25, "\uD83D\uDCE5 DOWNLOAD BLANK TEMPLATE");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "button", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_Template_button_click_26_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            const budgetExcelInput_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](29);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](budgetExcelInput_r3.click());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](27, "\uD83D\uDCE4 UPLOAD BUDGET EXCEL");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](28, "input", 17, 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function BudgetComponent_Template_input_change_28_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.onBudgetExcelUpload($event));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](30, "div", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](31, " Are you a first timer? ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](32, "a", 19);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function BudgetComponent_Template_a_click_32_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.downloadBudgetSample());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](33, "\uD83D\uDCCE VIEW & DOWNLOAD SAMPLE (pre-filled example)");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](34, BudgetComponent_div_34_Template, 3, 2, "div", 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](35, "div", 21);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](36, BudgetComponent_button_36_Template, 4, 4, "button", 22);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](37, BudgetComponent_div_37_Template, 3, 2, "div", 23)(38, BudgetComponent_div_38_Template, 57, 12, "div", 23)(39, BudgetComponent_div_39_Template, 65, 17, "div", 23)(40, BudgetComponent_div_40_Template, 10, 8, "div", 23)(41, BudgetComponent_div_41_Template, 34, 10, "div", 23);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx.selectedFyId);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.fiscalYears);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", !ctx.selectedFyId);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", !ctx.selectedFyId);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](23);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.budgetImportResult);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.tabs);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.activeTab === "dashboard");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.activeTab === "forecast");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.activeTab === "actuals");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.activeTab === "reports");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.activeTab === "settings");
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.MinValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.MaxValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_5__.DecimalPipe, _angular_common__WEBPACK_IMPORTED_MODULE_5__.CurrencyPipe, _angular_common__WEBPACK_IMPORTED_MODULE_5__.DatePipe],
      styles: [".budget-shell[_ngcontent-%COMP%] {\n      padding: 0;\n      height: 100%;\n    }\n    .budget-topbar[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      padding: 12px 24px;\n      background: var(--surface, #fff);\n      border-bottom: 1px solid var(--border, #e2e8f0);\n      gap: 16px;\n      flex-wrap: wrap;\n    }\n    .budget-topbar-left[_ngcontent-%COMP%], .budget-topbar-right[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 12px; }\n    .fy-selector[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 8px; }\n    .fy-selector[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] { font-size: 12px; font-weight: 700; color: #64748b; white-space: nowrap; }\n    .budget-tabs[_ngcontent-%COMP%] {\n      display: flex;\n      background: var(--surface, #fff);\n      border-bottom: 2px solid #e2e8f0;\n      padding: 0 24px;\n      overflow-x: auto;\n    }\n    .budget-tab[_ngcontent-%COMP%] {\n      padding: 12px 20px;\n      border: none;\n      background: none;\n      cursor: pointer;\n      font-weight: 600;\n      font-size: 13px;\n      color: #64748b;\n      border-bottom: 3px solid transparent;\n      margin-bottom: -2px;\n      white-space: nowrap;\n      transition: color .15s, border-color .15s;\n    }\n    .budget-tab.active[_ngcontent-%COMP%] { color: #1565C0; border-bottom-color: #1565C0; }\n    .tab-icon[_ngcontent-%COMP%] { margin-right: 6px; }\n    .tab-content[_ngcontent-%COMP%] { padding: 24px; overflow-y: auto; }\n\n    \n\n    .kpi-grid[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n      gap: 16px;\n      margin-bottom: 24px;\n    }\n    .kpi-card[_ngcontent-%COMP%] {\n      background: #fff;\n      border: 1px solid #e2e8f0;\n      border-radius: 12px;\n      padding: 18px 20px;\n      box-shadow: 0 1px 4px rgba(0,0,0,.06);\n    }\n    .kpi-card--spent[_ngcontent-%COMP%] { border-left: 4px solid #1565C0; }\n    .kpi-card--warn[_ngcontent-%COMP%] { border-left: 4px solid #f59e0b; }\n    .kpi-label[_ngcontent-%COMP%] { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: .5px; }\n    .kpi-value[_ngcontent-%COMP%] { font-size: 24px; font-weight: 800; color: #0f172a; margin: 4px 0; }\n    .kpi-sub[_ngcontent-%COMP%] { font-size: 12px; color: #94a3b8; }\n    .progress-bar-wrap[_ngcontent-%COMP%] { height: 6px; background: #e2e8f0; border-radius: 3px; margin-top: 8px; overflow: hidden; }\n    .progress-bar[_ngcontent-%COMP%] { height: 100%; background: #1565C0; border-radius: 3px; transition: width .3s; }\n    .progress-bar--warn[_ngcontent-%COMP%] { background: #f59e0b; }\n    .progress-bar--danger[_ngcontent-%COMP%] { background: #ef4444; }\n\n    \n\n    .charts-grid[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 20px;\n    }\n    @media (max-width: 900px) { .charts-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; } }\n    .chart-card[_ngcontent-%COMP%] {\n      background: #fff;\n      border: 1px solid #e2e8f0;\n      border-radius: 12px;\n      padding: 20px;\n      box-shadow: 0 1px 4px rgba(0,0,0,.06);\n    }\n    .chart-card--wide[_ngcontent-%COMP%] { grid-column: 1 / -1; }\n    .chart-title[_ngcontent-%COMP%] { font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 16px; }\n    .empty-chart[_ngcontent-%COMP%] { color: #94a3b8; font-size: 13px; text-align: center; padding: 32px; }\n\n    \n\n    .bar-chart[_ngcontent-%COMP%] { overflow-x: auto; }\n    .bar-chart-inner[_ngcontent-%COMP%] { display: flex; align-items: flex-end; gap: 8px; min-height: 120px; padding-bottom: 24px; }\n    .bar-group[_ngcontent-%COMP%] { display: flex; flex-direction: column; align-items: center; gap: 4px; }\n    .bar-pair[_ngcontent-%COMP%] { display: flex; align-items: flex-end; gap: 2px; }\n    .bar[_ngcontent-%COMP%] { width: 18px; border-radius: 3px 3px 0 0; min-height: 2px; transition: height .3s; }\n    .bar--planned[_ngcontent-%COMP%] { background: #bfdbfe; }\n    .bar--actual[_ngcontent-%COMP%] { background: #1565C0; }\n    .bar-label[_ngcontent-%COMP%] { font-size: 10px; color: #64748b; white-space: nowrap; }\n    .chart-legend[_ngcontent-%COMP%] { display: flex; gap: 16px; margin-top: 8px; font-size: 12px; color: #64748b; }\n    .legend-dot[_ngcontent-%COMP%] { display: inline-block; width: 10px; height: 10px; border-radius: 2px; }\n    .legend-dot--planned[_ngcontent-%COMP%] { background: #bfdbfe; }\n    .legend-dot--actual[_ngcontent-%COMP%] { background: #1565C0; }\n\n    \n\n    .hbar-list[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 10px; }\n    .hbar-row[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 8px; }\n    .hbar-label[_ngcontent-%COMP%] { font-size: 12px; color: #334155; min-width: 100px; max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n    .hbar-track[_ngcontent-%COMP%] { flex: 1; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden; }\n    .hbar-fill[_ngcontent-%COMP%] { height: 100%; background: #1565C0; border-radius: 4px; transition: width .3s; }\n    .hbar-fill--warn[_ngcontent-%COMP%] { background: #f59e0b; }\n    .hbar-fill--danger[_ngcontent-%COMP%] { background: #ef4444; }\n    .hbar-fill--vendor[_ngcontent-%COMP%] { background: #7c3aed; }\n    .hbar-pct[_ngcontent-%COMP%] { font-size: 11px; color: #64748b; min-width: 60px; text-align: right; }\n\n    \n\n    .donut-wrap[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 20px; }\n    .donut[_ngcontent-%COMP%] { width: 120px; height: 120px; border-radius: 50%; flex-shrink: 0; }\n    .donut-legend[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 6px; flex: 1; }\n    .donut-legend-item[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #334155; }\n    .donut-swatch[_ngcontent-%COMP%] { width: 10px; height: 10px; border-radius: 2px; flex-shrink: 0; }\n\n    \n\n    .quarter-bars[_ngcontent-%COMP%] { display: flex; gap: 20px; align-items: flex-end; padding-bottom: 20px; min-height: 100px; }\n    .quarter-bar-group[_ngcontent-%COMP%] { display: flex; flex-direction: column; align-items: center; gap: 4px; }\n    .quarter-bar-wrap[_ngcontent-%COMP%] { display: flex; align-items: flex-end; gap: 3px; }\n    .quarter-bar[_ngcontent-%COMP%] { width: 28px; border-radius: 3px 3px 0 0; min-height: 2px; }\n    .quarter-bar--planned[_ngcontent-%COMP%] { background: #bfdbfe; }\n    .quarter-bar--actual[_ngcontent-%COMP%] { background: #1565C0; }\n    .quarter-label[_ngcontent-%COMP%] { font-size: 12px; color: #64748b; font-weight: 700; }\n\n    \n\n    .tab-toolbar[_ngcontent-%COMP%] { display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }\n    .forecast-table-wrap[_ngcontent-%COMP%] { overflow-x: auto; }\n    .forecast-table[_ngcontent-%COMP%] { width: 100%; border-collapse: collapse; font-size: 13px; }\n    .forecast-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .forecast-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n      padding: 10px 12px;\n      border-bottom: 1px solid #e2e8f0;\n      text-align: left;\n    }\n    .forecast-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] { background: #1565C0; color: #fff; font-weight: 600; font-size: 12px; }\n    .forecast-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover { background: #f8fafc; }\n    .num-cell[_ngcontent-%COMP%] { text-align: right; font-variant-numeric: tabular-nums; }\n    .total-cell[_ngcontent-%COMP%] { font-weight: 700; }\n    .over-budget[_ngcontent-%COMP%] { color: #ef4444; }\n    .totals-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] { background: #f1f5f9; font-weight: 700; }\n    .editable-cell[_ngcontent-%COMP%] { cursor: pointer; border-bottom: 1px dashed #94a3b8; }\n    .editable-cell[_ngcontent-%COMP%]:hover { color: #1565C0; }\n    .cell-input[_ngcontent-%COMP%] { width: 100%; border: 1px solid #1565C0; border-radius: 4px; padding: 4px 6px; font-size: 13px; }\n    .line-item-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] { background: #f8fafc; }\n    .line-item-panel[_ngcontent-%COMP%] { padding: 8px 0; }\n    .line-item-grid-header[_ngcontent-%COMP%], .line-item-grid-row[_ngcontent-%COMP%] {\n      display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 12px;\n      padding: 4px 8px; font-size: 12px;\n    }\n    .line-item-grid-header[_ngcontent-%COMP%] { font-weight: 700; color: #64748b; }\n    .empty-line-items[_ngcontent-%COMP%] { color: #94a3b8; font-size: 12px; padding: 8px; }\n\n    \n\n    .filter-bar[_ngcontent-%COMP%] { display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; align-items: center; }\n    .input--sm[_ngcontent-%COMP%] { height: 34px; font-size: 13px; padding: 0 10px; }\n    .select--sm[_ngcontent-%COMP%] { height: 34px; font-size: 13px; padding: 0 8px; }\n\n    \n\n    .table-wrap[_ngcontent-%COMP%] { overflow-x: auto; }\n    .data-table[_ngcontent-%COMP%] { width: 100%; border-collapse: collapse; font-size: 13px; }\n    .data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; text-align: left; }\n    .data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] { background: #1565C0; color: #fff; font-weight: 600; font-size: 12px; }\n    .data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(even) { background: #f8fafc; }\n    .data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover { background: #eff6ff; }\n    .num-th[_ngcontent-%COMP%] { text-align: right; }\n\n    \n\n    .variance-pill[_ngcontent-%COMP%] {\n      display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 700;\n    }\n    .pill--green[_ngcontent-%COMP%] { background: #dcfce7; color: #166534; }\n    .pill--red[_ngcontent-%COMP%] { background: #fee2e2; color: #991b1b; }\n    .status-dot[_ngcontent-%COMP%] { font-size: 12px; }\n    .dot--green[_ngcontent-%COMP%] { color: #16a34a; }\n    .dot--amber[_ngcontent-%COMP%] { color: #d97706; }\n\n    \n\n    .drawer-overlay[_ngcontent-%COMP%] { position: fixed; inset: 0; background: rgba(0,0,0,.3); z-index: 100; }\n    .drawer[_ngcontent-%COMP%] {\n      position: fixed; right: 0; top: 0; bottom: 0; width: 380px;\n      background: #fff; box-shadow: -4px 0 24px rgba(0,0,0,.1);\n      z-index: 101; transform: translateX(100%); transition: transform .25s;\n      display: flex; flex-direction: column;\n    }\n    .drawer--open[_ngcontent-%COMP%] { transform: translateX(0); }\n    .drawer-header[_ngcontent-%COMP%] { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px; border-bottom: 1px solid #e2e8f0; }\n    .drawer-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 0; font-size: 16px; }\n    .drawer-body[_ngcontent-%COMP%] { flex: 1; overflow-y: auto; padding: 20px 24px; display: flex; flex-direction: column; gap: 12px; }\n    .drawer-body[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] { font-size: 12px; font-weight: 700; color: #475569; }\n\n    \n\n    .reports-tabs[_ngcontent-%COMP%] {\n      display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px;\n    }\n    .report-tab[_ngcontent-%COMP%] {\n      padding: 6px 16px; border: 1px solid #e2e8f0; border-radius: 20px;\n      background: #f8fafc; cursor: pointer; font-size: 13px; font-weight: 600; color: #334155;\n    }\n    .report-tab.active[_ngcontent-%COMP%] { background: #1565C0; color: #fff; border-color: #1565C0; }\n    .report-toolbar[_ngcontent-%COMP%] { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }\n    .report-toolbar[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 0; font-size: 16px; }\n    .report-actions[_ngcontent-%COMP%] { display: flex; gap: 8px; }\n    .report-table-wrap[_ngcontent-%COMP%] { overflow-x: auto; }\n    .kpi-mini-grid[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; }\n    .kpi-mini[_ngcontent-%COMP%] { background: #f1f5f9; border-radius: 8px; padding: 12px 16px; display: flex; flex-direction: column; gap: 2px; min-width: 140px; }\n    .kpi-mini[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { font-size: 11px; color: #64748b; font-weight: 600; }\n    .kpi-mini[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { font-size: 18px; font-weight: 800; color: #0f172a; }\n    .mini-progress[_ngcontent-%COMP%] { display: inline-block; width: 60px; height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden; vertical-align: middle; margin-right: 4px; }\n    .mini-bar[_ngcontent-%COMP%] { height: 100%; background: #1565C0; border-radius: 3px; }\n    .mini-bar--warn[_ngcontent-%COMP%] { background: #f59e0b; }\n    .mini-bar--danger[_ngcontent-%COMP%] { background: #ef4444; }\n\n    \n\n    .settings-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }\n    @media (max-width: 900px) { .settings-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; } }\n    .settings-card[_ngcontent-%COMP%] { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; }\n    .settings-card--wide[_ngcontent-%COMP%] { grid-column: 1 / -1; }\n    .settings-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 0 0 16px; font-size: 15px; color: #0f172a; }\n    .settings-hint[_ngcontent-%COMP%] { font-size: 12px; color: #64748b; margin: -8px 0 16px; }\n    .fy-list[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }\n    .fy-item[_ngcontent-%COMP%] { background: #f8fafc; border-radius: 8px; padding: 12px 16px; }\n    .fy-item-info[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 10px; margin-bottom: 4px; }\n    .fy-item-meta[_ngcontent-%COMP%] { font-size: 12px; color: #64748b; }\n    .fy-actions[_ngcontent-%COMP%] { display: flex; gap: 8px; margin-top: 8px; }\n    .fy-create[_ngcontent-%COMP%] { border-top: 1px solid #e2e8f0; padding-top: 16px; display: flex; flex-direction: column; gap: 10px; }\n    .fy-create[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] { margin: 0; font-size: 13px; color: #475569; }\n    .date-row[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }\n    .toggle-label[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer; }\n    .category-list[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }\n    .category-row[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }\n    .drag-handle[_ngcontent-%COMP%] { color: #94a3b8; cursor: grab; font-size: 16px; }\n    .code-input[_ngcontent-%COMP%] { max-width: 80px; }\n    .num-input[_ngcontent-%COMP%] { max-width: 100px; }\n    .add-category-form[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; padding-top: 12px; border-top: 1px solid #e2e8f0; }\n    .status-draft[_ngcontent-%COMP%] { background: #f1f5f9; color: #475569; }\n    .status-active[_ngcontent-%COMP%] { background: #dcfce7; color: #166534; }\n    .status-locked[_ngcontent-%COMP%] { background: #fee2e2; color: #991b1b; }\n    .status-archived[_ngcontent-%COMP%] { background: #fef9c3; color: #92400e; }\n\n    .chip-sm[_ngcontent-%COMP%] { font-size: 10px; padding: 2px 8px; border-radius: 10px; display: inline-block; background: #f1f5f9; }\n    .chip-green[_ngcontent-%COMP%] { background: #dcfce7; color: #166534; }\n    .chip-amber[_ngcontent-%COMP%] { background: #fef3c7; color: #92400e; }\n    .text-danger[_ngcontent-%COMP%] { color: #ef4444; }\n    .empty-state[_ngcontent-%COMP%] { text-align: center; color: #94a3b8; padding: 48px; font-size: 14px; }\n    .loading-state[_ngcontent-%COMP%] { text-align: center; color: #1565C0; padding: 48px; font-size: 14px; }\n\n    .btn-xs[_ngcontent-%COMP%] { height: 24px; font-size: 11px; padding: 0 8px; }\n    .btn--danger[_ngcontent-%COMP%] { color: #ef4444; }\n    .btn-outline[_ngcontent-%COMP%] { border: 1px solid #e2e8f0; background: #fff; color: #334155; }\n    .btn-outline[_ngcontent-%COMP%]:hover { background: #f8fafc; }\n\n    .budget-import-strip[_ngcontent-%COMP%] {\n      background: #f0f9ff;\n      border: 1px solid #bae6fd;\n      border-radius: 10px;\n      margin: 12px 24px 4px;\n      padding: 14px 20px;\n    }\n    .import-strip-body[_ngcontent-%COMP%] { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }\n    .import-strip-left[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 12px; }\n    .import-strip-title[_ngcontent-%COMP%] { font-size: 14px; font-weight: 700; color: #0c4a6e; }\n    .import-strip-desc[_ngcontent-%COMP%] { font-size: 12px; color: #0369a1; margin-top: 2px; }\n    .import-strip-actions[_ngcontent-%COMP%] { display: flex; gap: 10px; flex-wrap: wrap; }\n    .btn-outline-import[_ngcontent-%COMP%] { background: #fff; border: 1.5px solid #0891b2; color: #0891b2; border-radius: 7px; padding: 7px 14px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all .15s; white-space: nowrap; }\n    .btn-outline-import[_ngcontent-%COMP%]:hover { background: #e0f2fe; }\n    .import-strip-sample[_ngcontent-%COMP%] { margin-top: 10px; font-size: 12px; color: #374151; }\n    .import-strip-link[_ngcontent-%COMP%] { color: #0891b2; font-weight: 600; cursor: pointer; text-decoration: underline; margin-left: 4px; }\n    .import-strip-link[_ngcontent-%COMP%]:hover { color: #0369a1; }\n    .import-strip-result[_ngcontent-%COMP%] { margin-top: 8px; font-size: 13px; font-weight: 500; }\n  \n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYnVkZ2V0L2J1ZGdldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtJQUNJO01BQ0UsVUFBVTtNQUNWLFlBQVk7SUFDZDtJQUNBO01BQ0UsYUFBYTtNQUNiLG1CQUFtQjtNQUNuQiw4QkFBOEI7TUFDOUIsa0JBQWtCO01BQ2xCLGdDQUFnQztNQUNoQywrQ0FBK0M7TUFDL0MsU0FBUztNQUNULGVBQWU7SUFDakI7SUFDQSw0Q0FBNEMsYUFBYSxFQUFFLG1CQUFtQixFQUFFLFNBQVMsRUFBRTtJQUMzRixlQUFlLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUU7SUFDN0QscUJBQXFCLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsbUJBQW1CLEVBQUU7SUFDN0Y7TUFDRSxhQUFhO01BQ2IsZ0NBQWdDO01BQ2hDLGdDQUFnQztNQUNoQyxlQUFlO01BQ2YsZ0JBQWdCO0lBQ2xCO0lBQ0E7TUFDRSxrQkFBa0I7TUFDbEIsWUFBWTtNQUNaLGdCQUFnQjtNQUNoQixlQUFlO01BQ2YsZ0JBQWdCO01BQ2hCLGVBQWU7TUFDZixjQUFjO01BQ2Qsb0NBQW9DO01BQ3BDLG1CQUFtQjtNQUNuQixtQkFBbUI7TUFDbkIseUNBQXlDO0lBQzNDO0lBQ0EscUJBQXFCLGNBQWMsRUFBRSw0QkFBNEIsRUFBRTtJQUNuRSxZQUFZLGlCQUFpQixFQUFFO0lBQy9CLGVBQWUsYUFBYSxFQUFFLGdCQUFnQixFQUFFOztJQUVoRCxjQUFjO0lBQ2Q7TUFDRSxhQUFhO01BQ2IsNERBQTREO01BQzVELFNBQVM7TUFDVCxtQkFBbUI7SUFDckI7SUFDQTtNQUNFLGdCQUFnQjtNQUNoQix5QkFBeUI7TUFDekIsbUJBQW1CO01BQ25CLGtCQUFrQjtNQUNsQixxQ0FBcUM7SUFDdkM7SUFDQSxtQkFBbUIsOEJBQThCLEVBQUU7SUFDbkQsa0JBQWtCLDhCQUE4QixFQUFFO0lBQ2xELGFBQWEsZUFBZSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSx5QkFBeUIsRUFBRSxvQkFBb0IsRUFBRTtJQUNqSCxhQUFhLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFO0lBQy9FLFdBQVcsZUFBZSxFQUFFLGNBQWMsRUFBRTtJQUM1QyxxQkFBcUIsV0FBVyxFQUFFLG1CQUFtQixFQUFFLGtCQUFrQixFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRTtJQUM5RyxnQkFBZ0IsWUFBWSxFQUFFLG1CQUFtQixFQUFFLGtCQUFrQixFQUFFLHFCQUFxQixFQUFFO0lBQzlGLHNCQUFzQixtQkFBbUIsRUFBRTtJQUMzQyx3QkFBd0IsbUJBQW1CLEVBQUU7O0lBRTdDLFdBQVc7SUFDWDtNQUNFLGFBQWE7TUFDYiw4QkFBOEI7TUFDOUIsU0FBUztJQUNYO0lBQ0EsNEJBQTRCLGVBQWUsMEJBQTBCLEVBQUUsRUFBRTtJQUN6RTtNQUNFLGdCQUFnQjtNQUNoQix5QkFBeUI7TUFDekIsbUJBQW1CO01BQ25CLGFBQWE7TUFDYixxQ0FBcUM7SUFDdkM7SUFDQSxvQkFBb0IsbUJBQW1CLEVBQUU7SUFDekMsZUFBZSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixFQUFFO0lBQ3ZGLGVBQWUsY0FBYyxFQUFFLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxhQUFhLEVBQUU7O0lBRW5GLGNBQWM7SUFDZCxhQUFhLGdCQUFnQixFQUFFO0lBQy9CLG1CQUFtQixhQUFhLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLG9CQUFvQixFQUFFO0lBQzVHLGFBQWEsYUFBYSxFQUFFLHNCQUFzQixFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRTtJQUNuRixZQUFZLGFBQWEsRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUU7SUFDNUQsT0FBTyxXQUFXLEVBQUUsMEJBQTBCLEVBQUUsZUFBZSxFQUFFLHNCQUFzQixFQUFFO0lBQ3pGLGdCQUFnQixtQkFBbUIsRUFBRTtJQUNyQyxlQUFlLG1CQUFtQixFQUFFO0lBQ3BDLGFBQWEsZUFBZSxFQUFFLGNBQWMsRUFBRSxtQkFBbUIsRUFBRTtJQUNuRSxnQkFBZ0IsYUFBYSxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRTtJQUM1RixjQUFjLHFCQUFxQixFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUU7SUFDcEYsdUJBQXVCLG1CQUFtQixFQUFFO0lBQzVDLHNCQUFzQixtQkFBbUIsRUFBRTs7SUFFM0MsbUJBQW1CO0lBQ25CLGFBQWEsYUFBYSxFQUFFLHNCQUFzQixFQUFFLFNBQVMsRUFBRTtJQUMvRCxZQUFZLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUU7SUFDMUQsY0FBYyxlQUFlLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLHVCQUF1QixFQUFFLG1CQUFtQixFQUFFO0lBQ25KLGNBQWMsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRTtJQUMvRixhQUFhLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxrQkFBa0IsRUFBRSxxQkFBcUIsRUFBRTtJQUMzRixtQkFBbUIsbUJBQW1CLEVBQUU7SUFDeEMscUJBQXFCLG1CQUFtQixFQUFFO0lBQzFDLHFCQUFxQixtQkFBbUIsRUFBRTtJQUMxQyxZQUFZLGVBQWUsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLGlCQUFpQixFQUFFOztJQUVqRixVQUFVO0lBQ1YsY0FBYyxhQUFhLEVBQUUsbUJBQW1CLEVBQUUsU0FBUyxFQUFFO0lBQzdELFNBQVMsWUFBWSxFQUFFLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxjQUFjLEVBQUU7SUFDMUUsZ0JBQWdCLGFBQWEsRUFBRSxzQkFBc0IsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFO0lBQzFFLHFCQUFxQixhQUFhLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUU7SUFDcEcsZ0JBQWdCLFdBQVcsRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUFFOztJQUUvRSxpQkFBaUI7SUFDakIsZ0JBQWdCLGFBQWEsRUFBRSxTQUFTLEVBQUUscUJBQXFCLEVBQUUsb0JBQW9CLEVBQUUsaUJBQWlCLEVBQUU7SUFDMUcscUJBQXFCLGFBQWEsRUFBRSxzQkFBc0IsRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUU7SUFDM0Ysb0JBQW9CLGFBQWEsRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUU7SUFDcEUsZUFBZSxXQUFXLEVBQUUsMEJBQTBCLEVBQUUsZUFBZSxFQUFFO0lBQ3pFLHdCQUF3QixtQkFBbUIsRUFBRTtJQUM3Qyx1QkFBdUIsbUJBQW1CLEVBQUU7SUFDNUMsaUJBQWlCLGVBQWUsRUFBRSxjQUFjLEVBQUUsZ0JBQWdCLEVBQUU7O0lBRXBFLG1CQUFtQjtJQUNuQixlQUFlLGFBQWEsRUFBRSxTQUFTLEVBQUUsbUJBQW1CLEVBQUUsZUFBZSxFQUFFO0lBQy9FLHVCQUF1QixnQkFBZ0IsRUFBRTtJQUN6QyxrQkFBa0IsV0FBVyxFQUFFLHlCQUF5QixFQUFFLGVBQWUsRUFBRTtJQUMzRTtNQUNFLGtCQUFrQjtNQUNsQixnQ0FBZ0M7TUFDaEMsZ0JBQWdCO0lBQ2xCO0lBQ0EscUJBQXFCLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUU7SUFDMUYsaUNBQWlDLG1CQUFtQixFQUFFO0lBQ3RELFlBQVksaUJBQWlCLEVBQUUsa0NBQWtDLEVBQUU7SUFDbkUsY0FBYyxnQkFBZ0IsRUFBRTtJQUNoQyxlQUFlLGNBQWMsRUFBRTtJQUMvQixpQkFBaUIsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUU7SUFDeEQsaUJBQWlCLGVBQWUsRUFBRSxpQ0FBaUMsRUFBRTtJQUNyRSx1QkFBdUIsY0FBYyxFQUFFO0lBQ3ZDLGNBQWMsV0FBVyxFQUFFLHlCQUF5QixFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRTtJQUM3RyxvQkFBb0IsbUJBQW1CLEVBQUU7SUFDekMsbUJBQW1CLGNBQWMsRUFBRTtJQUNuQztNQUNFLGFBQWEsRUFBRSxzQ0FBc0MsRUFBRSxTQUFTO01BQ2hFLGdCQUFnQixFQUFFLGVBQWU7SUFDbkM7SUFDQSx5QkFBeUIsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFO0lBQzNELG9CQUFvQixjQUFjLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRTs7SUFFbkUsZUFBZTtJQUNmLGNBQWMsYUFBYSxFQUFFLFNBQVMsRUFBRSxtQkFBbUIsRUFBRSxlQUFlLEVBQUUsbUJBQW1CLEVBQUU7SUFDbkcsYUFBYSxZQUFZLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRTtJQUM3RCxjQUFjLFlBQVksRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFOztJQUU3RCxlQUFlO0lBQ2YsY0FBYyxnQkFBZ0IsRUFBRTtJQUNoQyxjQUFjLFdBQVcsRUFBRSx5QkFBeUIsRUFBRSxlQUFlLEVBQUU7SUFDdkUsaUNBQWlDLGtCQUFrQixFQUFFLGdDQUFnQyxFQUFFLGdCQUFnQixFQUFFO0lBQ3pHLGlCQUFpQixtQkFBbUIsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFO0lBQ3RGLHVDQUF1QyxtQkFBbUIsRUFBRTtJQUM1RCw2QkFBNkIsbUJBQW1CLEVBQUU7SUFDbEQsVUFBVSxpQkFBaUIsRUFBRTs7SUFFN0Isc0JBQXNCO0lBQ3RCO01BQ0UscUJBQXFCLEVBQUUsZ0JBQWdCLEVBQUUsbUJBQW1CLEVBQUUsZUFBZSxFQUFFLGdCQUFnQjtJQUNqRztJQUNBLGVBQWUsbUJBQW1CLEVBQUUsY0FBYyxFQUFFO0lBQ3BELGFBQWEsbUJBQW1CLEVBQUUsY0FBYyxFQUFFO0lBQ2xELGNBQWMsZUFBZSxFQUFFO0lBQy9CLGNBQWMsY0FBYyxFQUFFO0lBQzlCLGNBQWMsY0FBYyxFQUFFOztJQUU5QixXQUFXO0lBQ1gsa0JBQWtCLGVBQWUsRUFBRSxRQUFRLEVBQUUsMEJBQTBCLEVBQUUsWUFBWSxFQUFFO0lBQ3ZGO01BQ0UsZUFBZSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFlBQVk7TUFDMUQsZ0JBQWdCLEVBQUUsc0NBQXNDO01BQ3hELFlBQVksRUFBRSwyQkFBMkIsRUFBRSwwQkFBMEI7TUFDckUsYUFBYSxFQUFFLHNCQUFzQjtJQUN2QztJQUNBLGdCQUFnQix3QkFBd0IsRUFBRTtJQUMxQyxpQkFBaUIsYUFBYSxFQUFFLG1CQUFtQixFQUFFLDhCQUE4QixFQUFFLGtCQUFrQixFQUFFLGdDQUFnQyxFQUFFO0lBQzNJLG9CQUFvQixTQUFTLEVBQUUsZUFBZSxFQUFFO0lBQ2hELGVBQWUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGtCQUFrQixFQUFFLGFBQWEsRUFBRSxzQkFBc0IsRUFBRSxTQUFTLEVBQUU7SUFDaEgscUJBQXFCLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUU7O0lBRXhFLFlBQVk7SUFDWjtNQUNFLGFBQWEsRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFLGdDQUFnQyxFQUFFLG9CQUFvQjtJQUN2SDtJQUNBO01BQ0UsaUJBQWlCLEVBQUUseUJBQXlCLEVBQUUsbUJBQW1CO01BQ2pFLG1CQUFtQixFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYztJQUN6RjtJQUNBLHFCQUFxQixtQkFBbUIsRUFBRSxXQUFXLEVBQUUscUJBQXFCLEVBQUU7SUFDOUUsa0JBQWtCLGFBQWEsRUFBRSw4QkFBOEIsRUFBRSxtQkFBbUIsRUFBRSxtQkFBbUIsRUFBRTtJQUMzRyxxQkFBcUIsU0FBUyxFQUFFLGVBQWUsRUFBRTtJQUNqRCxrQkFBa0IsYUFBYSxFQUFFLFFBQVEsRUFBRTtJQUMzQyxxQkFBcUIsZ0JBQWdCLEVBQUU7SUFDdkMsaUJBQWlCLGFBQWEsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFFO0lBQ2pGLFlBQVksbUJBQW1CLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsYUFBYSxFQUFFLHNCQUFzQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRTtJQUM1SSxpQkFBaUIsZUFBZSxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRTtJQUNwRSxtQkFBbUIsZUFBZSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRTtJQUN0RSxpQkFBaUIscUJBQXFCLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxzQkFBc0IsRUFBRSxpQkFBaUIsRUFBRTtJQUN4SyxZQUFZLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxrQkFBa0IsRUFBRTtJQUNuRSxrQkFBa0IsbUJBQW1CLEVBQUU7SUFDdkMsb0JBQW9CLG1CQUFtQixFQUFFOztJQUV6QyxhQUFhO0lBQ2IsaUJBQWlCLGFBQWEsRUFBRSw4QkFBOEIsRUFBRSxTQUFTLEVBQUU7SUFDM0UsNEJBQTRCLGlCQUFpQiwwQkFBMEIsRUFBRSxFQUFFO0lBQzNFLGlCQUFpQixnQkFBZ0IsRUFBRSx5QkFBeUIsRUFBRSxtQkFBbUIsRUFBRSxhQUFhLEVBQUU7SUFDbEcsdUJBQXVCLG1CQUFtQixFQUFFO0lBQzVDLG9CQUFvQixnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFO0lBQ3ZFLGlCQUFpQixlQUFlLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixFQUFFO0lBQ3ZFLFdBQVcsYUFBYSxFQUFFLHNCQUFzQixFQUFFLFNBQVMsRUFBRSxtQkFBbUIsRUFBRTtJQUNsRixXQUFXLG1CQUFtQixFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFO0lBQ3hFLGdCQUFnQixhQUFhLEVBQUUsbUJBQW1CLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFO0lBQ25GLGdCQUFnQixlQUFlLEVBQUUsY0FBYyxFQUFFO0lBQ2pELGNBQWMsYUFBYSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUU7SUFDeEQsYUFBYSw2QkFBNkIsRUFBRSxpQkFBaUIsRUFBRSxhQUFhLEVBQUUsc0JBQXNCLEVBQUUsU0FBUyxFQUFFO0lBQ2pILGdCQUFnQixTQUFTLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRTtJQUM1RCxZQUFZLGFBQWEsRUFBRSw4QkFBOEIsRUFBRSxRQUFRLEVBQUU7SUFDckUsZ0JBQWdCLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRTtJQUNoRyxpQkFBaUIsYUFBYSxFQUFFLHNCQUFzQixFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRTtJQUN2RixnQkFBZ0IsYUFBYSxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUU7SUFDL0UsZUFBZSxjQUFjLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRTtJQUM5RCxjQUFjLGVBQWUsRUFBRTtJQUMvQixhQUFhLGdCQUFnQixFQUFFO0lBQy9CLHFCQUFxQixhQUFhLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSw2QkFBNkIsRUFBRTtJQUN0SSxnQkFBZ0IsbUJBQW1CLEVBQUUsY0FBYyxFQUFFO0lBQ3JELGlCQUFpQixtQkFBbUIsRUFBRSxjQUFjLEVBQUU7SUFDdEQsaUJBQWlCLG1CQUFtQixFQUFFLGNBQWMsRUFBRTtJQUN0RCxtQkFBbUIsbUJBQW1CLEVBQUUsY0FBYyxFQUFFOztJQUV4RCxXQUFXLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBRSxxQkFBcUIsRUFBRSxtQkFBbUIsRUFBRTtJQUMvRyxjQUFjLG1CQUFtQixFQUFFLGNBQWMsRUFBRTtJQUNuRCxjQUFjLG1CQUFtQixFQUFFLGNBQWMsRUFBRTtJQUNuRCxlQUFlLGNBQWMsRUFBRTtJQUMvQixlQUFlLGtCQUFrQixFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFO0lBQ25GLGlCQUFpQixrQkFBa0IsRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRTs7SUFFckYsVUFBVSxZQUFZLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRTtJQUN6RCxlQUFlLGNBQWMsRUFBRTtJQUMvQixlQUFlLHlCQUF5QixFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRTtJQUM1RSxxQkFBcUIsbUJBQW1CLEVBQUU7O0lBRTFDO01BQ0UsbUJBQW1CO01BQ25CLHlCQUF5QjtNQUN6QixtQkFBbUI7TUFDbkIscUJBQXFCO01BQ3JCLGtCQUFrQjtJQUNwQjtJQUNBLHFCQUFxQixhQUFhLEVBQUUsbUJBQW1CLEVBQUUsOEJBQThCLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRTtJQUNySCxxQkFBcUIsYUFBYSxFQUFFLG1CQUFtQixFQUFFLFNBQVMsRUFBRTtJQUNwRSxzQkFBc0IsZUFBZSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRTtJQUN6RSxxQkFBcUIsZUFBZSxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUU7SUFDdkUsd0JBQXdCLGFBQWEsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFO0lBQ25FLHNCQUFzQixnQkFBZ0IsRUFBRSwyQkFBMkIsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxvQkFBb0IsRUFBRSxtQkFBbUIsRUFBRTtJQUMzTiw0QkFBNEIsbUJBQW1CLEVBQUU7SUFDakQsdUJBQXVCLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUU7SUFDMUUscUJBQXFCLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsMEJBQTBCLEVBQUUsZ0JBQWdCLEVBQUU7SUFDdEgsMkJBQTJCLGNBQWMsRUFBRTtJQUMzQyx1QkFBdUIsZUFBZSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIC5idWRnZXQtc2hlbGwge1xuICAgICAgcGFkZGluZzogMDtcbiAgICAgIGhlaWdodDogMTAwJTtcbiAgICB9XG4gICAgLmJ1ZGdldC10b3BiYXIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICBwYWRkaW5nOiAxMnB4IDI0cHg7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1zdXJmYWNlLCAjZmZmKTtcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1ib3JkZXIsICNlMmU4ZjApO1xuICAgICAgZ2FwOiAxNnB4O1xuICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgIH1cbiAgICAuYnVkZ2V0LXRvcGJhci1sZWZ0LCAuYnVkZ2V0LXRvcGJhci1yaWdodCB7IGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGdhcDogMTJweDsgfVxuICAgIC5meS1zZWxlY3RvciB7IGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGdhcDogOHB4OyB9XG4gICAgLmZ5LXNlbGVjdG9yIGxhYmVsIHsgZm9udC1zaXplOiAxMnB4OyBmb250LXdlaWdodDogNzAwOyBjb2xvcjogIzY0NzQ4Yjsgd2hpdGUtc3BhY2U6IG5vd3JhcDsgfVxuICAgIC5idWRnZXQtdGFicyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZSwgI2ZmZik7XG4gICAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgI2UyZThmMDtcbiAgICAgIHBhZGRpbmc6IDAgMjRweDtcbiAgICAgIG92ZXJmbG93LXg6IGF1dG87XG4gICAgfVxuICAgIC5idWRnZXQtdGFiIHtcbiAgICAgIHBhZGRpbmc6IDEycHggMjBweDtcbiAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgICAgY29sb3I6ICM2NDc0OGI7XG4gICAgICBib3JkZXItYm90dG9tOiAzcHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICBtYXJnaW4tYm90dG9tOiAtMnB4O1xuICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgIHRyYW5zaXRpb246IGNvbG9yIC4xNXMsIGJvcmRlci1jb2xvciAuMTVzO1xuICAgIH1cbiAgICAuYnVkZ2V0LXRhYi5hY3RpdmUgeyBjb2xvcjogIzE1NjVDMDsgYm9yZGVyLWJvdHRvbS1jb2xvcjogIzE1NjVDMDsgfVxuICAgIC50YWItaWNvbiB7IG1hcmdpbi1yaWdodDogNnB4OyB9XG4gICAgLnRhYi1jb250ZW50IHsgcGFkZGluZzogMjRweDsgb3ZlcmZsb3cteTogYXV0bzsgfVxuXG4gICAgLyogS1BJIENhcmRzICovXG4gICAgLmtwaS1ncmlkIHtcbiAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpbGwsIG1pbm1heCgyMDBweCwgMWZyKSk7XG4gICAgICBnYXA6IDE2cHg7XG4gICAgICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuICAgIH1cbiAgICAua3BpLWNhcmQge1xuICAgICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNlMmU4ZjA7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgcGFkZGluZzogMThweCAyMHB4O1xuICAgICAgYm94LXNoYWRvdzogMCAxcHggNHB4IHJnYmEoMCwwLDAsLjA2KTtcbiAgICB9XG4gICAgLmtwaS1jYXJkLS1zcGVudCB7IGJvcmRlci1sZWZ0OiA0cHggc29saWQgIzE1NjVDMDsgfVxuICAgIC5rcGktY2FyZC0td2FybiB7IGJvcmRlci1sZWZ0OiA0cHggc29saWQgI2Y1OWUwYjsgfVxuICAgIC5rcGktbGFiZWwgeyBmb250LXNpemU6IDExcHg7IGZvbnQtd2VpZ2h0OiA3MDA7IGNvbG9yOiAjNjQ3NDhiOyB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOyBsZXR0ZXItc3BhY2luZzogLjVweDsgfVxuICAgIC5rcGktdmFsdWUgeyBmb250LXNpemU6IDI0cHg7IGZvbnQtd2VpZ2h0OiA4MDA7IGNvbG9yOiAjMGYxNzJhOyBtYXJnaW46IDRweCAwOyB9XG4gICAgLmtwaS1zdWIgeyBmb250LXNpemU6IDEycHg7IGNvbG9yOiAjOTRhM2I4OyB9XG4gICAgLnByb2dyZXNzLWJhci13cmFwIHsgaGVpZ2h0OiA2cHg7IGJhY2tncm91bmQ6ICNlMmU4ZjA7IGJvcmRlci1yYWRpdXM6IDNweDsgbWFyZ2luLXRvcDogOHB4OyBvdmVyZmxvdzogaGlkZGVuOyB9XG4gICAgLnByb2dyZXNzLWJhciB7IGhlaWdodDogMTAwJTsgYmFja2dyb3VuZDogIzE1NjVDMDsgYm9yZGVyLXJhZGl1czogM3B4OyB0cmFuc2l0aW9uOiB3aWR0aCAuM3M7IH1cbiAgICAucHJvZ3Jlc3MtYmFyLS13YXJuIHsgYmFja2dyb3VuZDogI2Y1OWUwYjsgfVxuICAgIC5wcm9ncmVzcy1iYXItLWRhbmdlciB7IGJhY2tncm91bmQ6ICNlZjQ0NDQ7IH1cblxuICAgIC8qIENoYXJ0cyAqL1xuICAgIC5jaGFydHMtZ3JpZCB7XG4gICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xuICAgICAgZ2FwOiAyMHB4O1xuICAgIH1cbiAgICBAbWVkaWEgKG1heC13aWR0aDogOTAwcHgpIHsgLmNoYXJ0cy1ncmlkIHsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7IH0gfVxuICAgIC5jaGFydC1jYXJkIHtcbiAgICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjZTJlOGYwO1xuICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgICBib3gtc2hhZG93OiAwIDFweCA0cHggcmdiYSgwLDAsMCwuMDYpO1xuICAgIH1cbiAgICAuY2hhcnQtY2FyZC0td2lkZSB7IGdyaWQtY29sdW1uOiAxIC8gLTE7IH1cbiAgICAuY2hhcnQtdGl0bGUgeyBmb250LXNpemU6IDEzcHg7IGZvbnQtd2VpZ2h0OiA3MDA7IGNvbG9yOiAjMGYxNzJhOyBtYXJnaW4tYm90dG9tOiAxNnB4OyB9XG4gICAgLmVtcHR5LWNoYXJ0IHsgY29sb3I6ICM5NGEzYjg7IGZvbnQtc2l6ZTogMTNweDsgdGV4dC1hbGlnbjogY2VudGVyOyBwYWRkaW5nOiAzMnB4OyB9XG5cbiAgICAvKiBCYXIgQ2hhcnQgKi9cbiAgICAuYmFyLWNoYXJ0IHsgb3ZlcmZsb3cteDogYXV0bzsgfVxuICAgIC5iYXItY2hhcnQtaW5uZXIgeyBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogZmxleC1lbmQ7IGdhcDogOHB4OyBtaW4taGVpZ2h0OiAxMjBweDsgcGFkZGluZy1ib3R0b206IDI0cHg7IH1cbiAgICAuYmFyLWdyb3VwIHsgZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgYWxpZ24taXRlbXM6IGNlbnRlcjsgZ2FwOiA0cHg7IH1cbiAgICAuYmFyLXBhaXIgeyBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogZmxleC1lbmQ7IGdhcDogMnB4OyB9XG4gICAgLmJhciB7IHdpZHRoOiAxOHB4OyBib3JkZXItcmFkaXVzOiAzcHggM3B4IDAgMDsgbWluLWhlaWdodDogMnB4OyB0cmFuc2l0aW9uOiBoZWlnaHQgLjNzOyB9XG4gICAgLmJhci0tcGxhbm5lZCB7IGJhY2tncm91bmQ6ICNiZmRiZmU7IH1cbiAgICAuYmFyLS1hY3R1YWwgeyBiYWNrZ3JvdW5kOiAjMTU2NUMwOyB9XG4gICAgLmJhci1sYWJlbCB7IGZvbnQtc2l6ZTogMTBweDsgY29sb3I6ICM2NDc0OGI7IHdoaXRlLXNwYWNlOiBub3dyYXA7IH1cbiAgICAuY2hhcnQtbGVnZW5kIHsgZGlzcGxheTogZmxleDsgZ2FwOiAxNnB4OyBtYXJnaW4tdG9wOiA4cHg7IGZvbnQtc2l6ZTogMTJweDsgY29sb3I6ICM2NDc0OGI7IH1cbiAgICAubGVnZW5kLWRvdCB7IGRpc3BsYXk6IGlubGluZS1ibG9jazsgd2lkdGg6IDEwcHg7IGhlaWdodDogMTBweDsgYm9yZGVyLXJhZGl1czogMnB4OyB9XG4gICAgLmxlZ2VuZC1kb3QtLXBsYW5uZWQgeyBiYWNrZ3JvdW5kOiAjYmZkYmZlOyB9XG4gICAgLmxlZ2VuZC1kb3QtLWFjdHVhbCB7IGJhY2tncm91bmQ6ICMxNTY1QzA7IH1cblxuICAgIC8qIEhvcml6b250YWwgQmFyICovXG4gICAgLmhiYXItbGlzdCB7IGRpc3BsYXk6IGZsZXg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IGdhcDogMTBweDsgfVxuICAgIC5oYmFyLXJvdyB7IGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGdhcDogOHB4OyB9XG4gICAgLmhiYXItbGFiZWwgeyBmb250LXNpemU6IDEycHg7IGNvbG9yOiAjMzM0MTU1OyBtaW4td2lkdGg6IDEwMHB4OyBtYXgtd2lkdGg6IDEyMHB4OyBvdmVyZmxvdzogaGlkZGVuOyB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpczsgd2hpdGUtc3BhY2U6IG5vd3JhcDsgfVxuICAgIC5oYmFyLXRyYWNrIHsgZmxleDogMTsgaGVpZ2h0OiA4cHg7IGJhY2tncm91bmQ6ICNlMmU4ZjA7IGJvcmRlci1yYWRpdXM6IDRweDsgb3ZlcmZsb3c6IGhpZGRlbjsgfVxuICAgIC5oYmFyLWZpbGwgeyBoZWlnaHQ6IDEwMCU7IGJhY2tncm91bmQ6ICMxNTY1QzA7IGJvcmRlci1yYWRpdXM6IDRweDsgdHJhbnNpdGlvbjogd2lkdGggLjNzOyB9XG4gICAgLmhiYXItZmlsbC0td2FybiB7IGJhY2tncm91bmQ6ICNmNTllMGI7IH1cbiAgICAuaGJhci1maWxsLS1kYW5nZXIgeyBiYWNrZ3JvdW5kOiAjZWY0NDQ0OyB9XG4gICAgLmhiYXItZmlsbC0tdmVuZG9yIHsgYmFja2dyb3VuZDogIzdjM2FlZDsgfVxuICAgIC5oYmFyLXBjdCB7IGZvbnQtc2l6ZTogMTFweDsgY29sb3I6ICM2NDc0OGI7IG1pbi13aWR0aDogNjBweDsgdGV4dC1hbGlnbjogcmlnaHQ7IH1cblxuICAgIC8qIERvbnV0ICovXG4gICAgLmRvbnV0LXdyYXAgeyBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBnYXA6IDIwcHg7IH1cbiAgICAuZG9udXQgeyB3aWR0aDogMTIwcHg7IGhlaWdodDogMTIwcHg7IGJvcmRlci1yYWRpdXM6IDUwJTsgZmxleC1zaHJpbms6IDA7IH1cbiAgICAuZG9udXQtbGVnZW5kIHsgZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgZ2FwOiA2cHg7IGZsZXg6IDE7IH1cbiAgICAuZG9udXQtbGVnZW5kLWl0ZW0geyBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBnYXA6IDhweDsgZm9udC1zaXplOiAxMnB4OyBjb2xvcjogIzMzNDE1NTsgfVxuICAgIC5kb251dC1zd2F0Y2ggeyB3aWR0aDogMTBweDsgaGVpZ2h0OiAxMHB4OyBib3JkZXItcmFkaXVzOiAycHg7IGZsZXgtc2hyaW5rOiAwOyB9XG5cbiAgICAvKiBRdWFydGVyIGJhcnMgKi9cbiAgICAucXVhcnRlci1iYXJzIHsgZGlzcGxheTogZmxleDsgZ2FwOiAyMHB4OyBhbGlnbi1pdGVtczogZmxleC1lbmQ7IHBhZGRpbmctYm90dG9tOiAyMHB4OyBtaW4taGVpZ2h0OiAxMDBweDsgfVxuICAgIC5xdWFydGVyLWJhci1ncm91cCB7IGRpc3BsYXk6IGZsZXg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGdhcDogNHB4OyB9XG4gICAgLnF1YXJ0ZXItYmFyLXdyYXAgeyBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogZmxleC1lbmQ7IGdhcDogM3B4OyB9XG4gICAgLnF1YXJ0ZXItYmFyIHsgd2lkdGg6IDI4cHg7IGJvcmRlci1yYWRpdXM6IDNweCAzcHggMCAwOyBtaW4taGVpZ2h0OiAycHg7IH1cbiAgICAucXVhcnRlci1iYXItLXBsYW5uZWQgeyBiYWNrZ3JvdW5kOiAjYmZkYmZlOyB9XG4gICAgLnF1YXJ0ZXItYmFyLS1hY3R1YWwgeyBiYWNrZ3JvdW5kOiAjMTU2NUMwOyB9XG4gICAgLnF1YXJ0ZXItbGFiZWwgeyBmb250LXNpemU6IDEycHg7IGNvbG9yOiAjNjQ3NDhiOyBmb250LXdlaWdodDogNzAwOyB9XG5cbiAgICAvKiBGb3JlY2FzdCBUYWJsZSAqL1xuICAgIC50YWItdG9vbGJhciB7IGRpc3BsYXk6IGZsZXg7IGdhcDogMTJweDsgbWFyZ2luLWJvdHRvbTogMTZweDsgZmxleC13cmFwOiB3cmFwOyB9XG4gICAgLmZvcmVjYXN0LXRhYmxlLXdyYXAgeyBvdmVyZmxvdy14OiBhdXRvOyB9XG4gICAgLmZvcmVjYXN0LXRhYmxlIHsgd2lkdGg6IDEwMCU7IGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7IGZvbnQtc2l6ZTogMTNweDsgfVxuICAgIC5mb3JlY2FzdC10YWJsZSB0aCwgLmZvcmVjYXN0LXRhYmxlIHRkIHtcbiAgICAgIHBhZGRpbmc6IDEwcHggMTJweDtcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTJlOGYwO1xuICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICB9XG4gICAgLmZvcmVjYXN0LXRhYmxlIHRoIHsgYmFja2dyb3VuZDogIzE1NjVDMDsgY29sb3I6ICNmZmY7IGZvbnQtd2VpZ2h0OiA2MDA7IGZvbnQtc2l6ZTogMTJweDsgfVxuICAgIC5mb3JlY2FzdC10YWJsZSB0Ym9keSB0cjpob3ZlciB7IGJhY2tncm91bmQ6ICNmOGZhZmM7IH1cbiAgICAubnVtLWNlbGwgeyB0ZXh0LWFsaWduOiByaWdodDsgZm9udC12YXJpYW50LW51bWVyaWM6IHRhYnVsYXItbnVtczsgfVxuICAgIC50b3RhbC1jZWxsIHsgZm9udC13ZWlnaHQ6IDcwMDsgfVxuICAgIC5vdmVyLWJ1ZGdldCB7IGNvbG9yOiAjZWY0NDQ0OyB9XG4gICAgLnRvdGFscy1yb3cgdGQgeyBiYWNrZ3JvdW5kOiAjZjFmNWY5OyBmb250LXdlaWdodDogNzAwOyB9XG4gICAgLmVkaXRhYmxlLWNlbGwgeyBjdXJzb3I6IHBvaW50ZXI7IGJvcmRlci1ib3R0b206IDFweCBkYXNoZWQgIzk0YTNiODsgfVxuICAgIC5lZGl0YWJsZS1jZWxsOmhvdmVyIHsgY29sb3I6ICMxNTY1QzA7IH1cbiAgICAuY2VsbC1pbnB1dCB7IHdpZHRoOiAxMDAlOyBib3JkZXI6IDFweCBzb2xpZCAjMTU2NUMwOyBib3JkZXItcmFkaXVzOiA0cHg7IHBhZGRpbmc6IDRweCA2cHg7IGZvbnQtc2l6ZTogMTNweDsgfVxuICAgIC5saW5lLWl0ZW0tcm93IHRkIHsgYmFja2dyb3VuZDogI2Y4ZmFmYzsgfVxuICAgIC5saW5lLWl0ZW0tcGFuZWwgeyBwYWRkaW5nOiA4cHggMDsgfVxuICAgIC5saW5lLWl0ZW0tZ3JpZC1oZWFkZXIsIC5saW5lLWl0ZW0tZ3JpZC1yb3cge1xuICAgICAgZGlzcGxheTogZ3JpZDsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAyZnIgMWZyIDFmciAxZnI7IGdhcDogMTJweDtcbiAgICAgIHBhZGRpbmc6IDRweCA4cHg7IGZvbnQtc2l6ZTogMTJweDtcbiAgICB9XG4gICAgLmxpbmUtaXRlbS1ncmlkLWhlYWRlciB7IGZvbnQtd2VpZ2h0OiA3MDA7IGNvbG9yOiAjNjQ3NDhiOyB9XG4gICAgLmVtcHR5LWxpbmUtaXRlbXMgeyBjb2xvcjogIzk0YTNiODsgZm9udC1zaXplOiAxMnB4OyBwYWRkaW5nOiA4cHg7IH1cblxuICAgIC8qIEZpbHRlciBCYXIgKi9cbiAgICAuZmlsdGVyLWJhciB7IGRpc3BsYXk6IGZsZXg7IGdhcDogMTJweDsgbWFyZ2luLWJvdHRvbTogMTZweDsgZmxleC13cmFwOiB3cmFwOyBhbGlnbi1pdGVtczogY2VudGVyOyB9XG4gICAgLmlucHV0LS1zbSB7IGhlaWdodDogMzRweDsgZm9udC1zaXplOiAxM3B4OyBwYWRkaW5nOiAwIDEwcHg7IH1cbiAgICAuc2VsZWN0LS1zbSB7IGhlaWdodDogMzRweDsgZm9udC1zaXplOiAxM3B4OyBwYWRkaW5nOiAwIDhweDsgfVxuXG4gICAgLyogRGF0YSBUYWJsZSAqL1xuICAgIC50YWJsZS13cmFwIHsgb3ZlcmZsb3cteDogYXV0bzsgfVxuICAgIC5kYXRhLXRhYmxlIHsgd2lkdGg6IDEwMCU7IGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7IGZvbnQtc2l6ZTogMTNweDsgfVxuICAgIC5kYXRhLXRhYmxlIHRoLCAuZGF0YS10YWJsZSB0ZCB7IHBhZGRpbmc6IDEwcHggMTJweDsgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlMmU4ZjA7IHRleHQtYWxpZ246IGxlZnQ7IH1cbiAgICAuZGF0YS10YWJsZSB0aCB7IGJhY2tncm91bmQ6ICMxNTY1QzA7IGNvbG9yOiAjZmZmOyBmb250LXdlaWdodDogNjAwOyBmb250LXNpemU6IDEycHg7IH1cbiAgICAuZGF0YS10YWJsZSB0Ym9keSB0cjpudGgtY2hpbGQoZXZlbikgeyBiYWNrZ3JvdW5kOiAjZjhmYWZjOyB9XG4gICAgLmRhdGEtdGFibGUgdGJvZHkgdHI6aG92ZXIgeyBiYWNrZ3JvdW5kOiAjZWZmNmZmOyB9XG4gICAgLm51bS10aCB7IHRleHQtYWxpZ246IHJpZ2h0OyB9XG5cbiAgICAvKiBWYXJpYW5jZSAmIFN0YXR1cyAqL1xuICAgIC52YXJpYW5jZS1waWxsIHtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsgcGFkZGluZzogMnB4IDhweDsgYm9yZGVyLXJhZGl1czogMTJweDsgZm9udC1zaXplOiAxMXB4OyBmb250LXdlaWdodDogNzAwO1xuICAgIH1cbiAgICAucGlsbC0tZ3JlZW4geyBiYWNrZ3JvdW5kOiAjZGNmY2U3OyBjb2xvcjogIzE2NjUzNDsgfVxuICAgIC5waWxsLS1yZWQgeyBiYWNrZ3JvdW5kOiAjZmVlMmUyOyBjb2xvcjogIzk5MWIxYjsgfVxuICAgIC5zdGF0dXMtZG90IHsgZm9udC1zaXplOiAxMnB4OyB9XG4gICAgLmRvdC0tZ3JlZW4geyBjb2xvcjogIzE2YTM0YTsgfVxuICAgIC5kb3QtLWFtYmVyIHsgY29sb3I6ICNkOTc3MDY7IH1cblxuICAgIC8qIERyYXdlciAqL1xuICAgIC5kcmF3ZXItb3ZlcmxheSB7IHBvc2l0aW9uOiBmaXhlZDsgaW5zZXQ6IDA7IGJhY2tncm91bmQ6IHJnYmEoMCwwLDAsLjMpOyB6LWluZGV4OiAxMDA7IH1cbiAgICAuZHJhd2VyIHtcbiAgICAgIHBvc2l0aW9uOiBmaXhlZDsgcmlnaHQ6IDA7IHRvcDogMDsgYm90dG9tOiAwOyB3aWR0aDogMzgwcHg7XG4gICAgICBiYWNrZ3JvdW5kOiAjZmZmOyBib3gtc2hhZG93OiAtNHB4IDAgMjRweCByZ2JhKDAsMCwwLC4xKTtcbiAgICAgIHotaW5kZXg6IDEwMTsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMCUpOyB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gLjI1cztcbiAgICAgIGRpc3BsYXk6IGZsZXg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgfVxuICAgIC5kcmF3ZXItLW9wZW4geyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7IH1cbiAgICAuZHJhd2VyLWhlYWRlciB7IGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgcGFkZGluZzogMjBweCAyNHB4OyBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2UyZThmMDsgfVxuICAgIC5kcmF3ZXItaGVhZGVyIGgzIHsgbWFyZ2luOiAwOyBmb250LXNpemU6IDE2cHg7IH1cbiAgICAuZHJhd2VyLWJvZHkgeyBmbGV4OiAxOyBvdmVyZmxvdy15OiBhdXRvOyBwYWRkaW5nOiAyMHB4IDI0cHg7IGRpc3BsYXk6IGZsZXg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IGdhcDogMTJweDsgfVxuICAgIC5kcmF3ZXItYm9keSBsYWJlbCB7IGZvbnQtc2l6ZTogMTJweDsgZm9udC13ZWlnaHQ6IDcwMDsgY29sb3I6ICM0NzU1Njk7IH1cblxuICAgIC8qIFJlcG9ydHMgKi9cbiAgICAucmVwb3J0cy10YWJzIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7IGZsZXgtd3JhcDogd3JhcDsgZ2FwOiA4cHg7IG1hcmdpbi1ib3R0b206IDIwcHg7IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTJlOGYwOyBwYWRkaW5nLWJvdHRvbTogMTJweDtcbiAgICB9XG4gICAgLnJlcG9ydC10YWIge1xuICAgICAgcGFkZGluZzogNnB4IDE2cHg7IGJvcmRlcjogMXB4IHNvbGlkICNlMmU4ZjA7IGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gICAgICBiYWNrZ3JvdW5kOiAjZjhmYWZjOyBjdXJzb3I6IHBvaW50ZXI7IGZvbnQtc2l6ZTogMTNweDsgZm9udC13ZWlnaHQ6IDYwMDsgY29sb3I6ICMzMzQxNTU7XG4gICAgfVxuICAgIC5yZXBvcnQtdGFiLmFjdGl2ZSB7IGJhY2tncm91bmQ6ICMxNTY1QzA7IGNvbG9yOiAjZmZmOyBib3JkZXItY29sb3I6ICMxNTY1QzA7IH1cbiAgICAucmVwb3J0LXRvb2xiYXIgeyBkaXNwbGF5OiBmbGV4OyBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47IGFsaWduLWl0ZW1zOiBjZW50ZXI7IG1hcmdpbi1ib3R0b206IDE2cHg7IH1cbiAgICAucmVwb3J0LXRvb2xiYXIgaDMgeyBtYXJnaW46IDA7IGZvbnQtc2l6ZTogMTZweDsgfVxuICAgIC5yZXBvcnQtYWN0aW9ucyB7IGRpc3BsYXk6IGZsZXg7IGdhcDogOHB4OyB9XG4gICAgLnJlcG9ydC10YWJsZS13cmFwIHsgb3ZlcmZsb3cteDogYXV0bzsgfVxuICAgIC5rcGktbWluaS1ncmlkIHsgZGlzcGxheTogZmxleDsgZmxleC13cmFwOiB3cmFwOyBnYXA6IDEycHg7IG1hcmdpbi1ib3R0b206IDE2cHg7IH1cbiAgICAua3BpLW1pbmkgeyBiYWNrZ3JvdW5kOiAjZjFmNWY5OyBib3JkZXItcmFkaXVzOiA4cHg7IHBhZGRpbmc6IDEycHggMTZweDsgZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgZ2FwOiAycHg7IG1pbi13aWR0aDogMTQwcHg7IH1cbiAgICAua3BpLW1pbmkgc3BhbiB7IGZvbnQtc2l6ZTogMTFweDsgY29sb3I6ICM2NDc0OGI7IGZvbnQtd2VpZ2h0OiA2MDA7IH1cbiAgICAua3BpLW1pbmkgc3Ryb25nIHsgZm9udC1zaXplOiAxOHB4OyBmb250LXdlaWdodDogODAwOyBjb2xvcjogIzBmMTcyYTsgfVxuICAgIC5taW5pLXByb2dyZXNzIHsgZGlzcGxheTogaW5saW5lLWJsb2NrOyB3aWR0aDogNjBweDsgaGVpZ2h0OiA2cHg7IGJhY2tncm91bmQ6ICNlMmU4ZjA7IGJvcmRlci1yYWRpdXM6IDNweDsgb3ZlcmZsb3c6IGhpZGRlbjsgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgbWFyZ2luLXJpZ2h0OiA0cHg7IH1cbiAgICAubWluaS1iYXIgeyBoZWlnaHQ6IDEwMCU7IGJhY2tncm91bmQ6ICMxNTY1QzA7IGJvcmRlci1yYWRpdXM6IDNweDsgfVxuICAgIC5taW5pLWJhci0td2FybiB7IGJhY2tncm91bmQ6ICNmNTllMGI7IH1cbiAgICAubWluaS1iYXItLWRhbmdlciB7IGJhY2tncm91bmQ6ICNlZjQ0NDQ7IH1cblxuICAgIC8qIFNldHRpbmdzICovXG4gICAgLnNldHRpbmdzLWdyaWQgeyBkaXNwbGF5OiBncmlkOyBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7IGdhcDogMjRweDsgfVxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA5MDBweCkgeyAuc2V0dGluZ3MtZ3JpZCB7IGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyOyB9IH1cbiAgICAuc2V0dGluZ3MtY2FyZCB7IGJhY2tncm91bmQ6ICNmZmY7IGJvcmRlcjogMXB4IHNvbGlkICNlMmU4ZjA7IGJvcmRlci1yYWRpdXM6IDEycHg7IHBhZGRpbmc6IDI0cHg7IH1cbiAgICAuc2V0dGluZ3MtY2FyZC0td2lkZSB7IGdyaWQtY29sdW1uOiAxIC8gLTE7IH1cbiAgICAuc2V0dGluZ3MtY2FyZCBoMyB7IG1hcmdpbjogMCAwIDE2cHg7IGZvbnQtc2l6ZTogMTVweDsgY29sb3I6ICMwZjE3MmE7IH1cbiAgICAuc2V0dGluZ3MtaGludCB7IGZvbnQtc2l6ZTogMTJweDsgY29sb3I6ICM2NDc0OGI7IG1hcmdpbjogLThweCAwIDE2cHg7IH1cbiAgICAuZnktbGlzdCB7IGRpc3BsYXk6IGZsZXg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IGdhcDogMTJweDsgbWFyZ2luLWJvdHRvbTogMjRweDsgfVxuICAgIC5meS1pdGVtIHsgYmFja2dyb3VuZDogI2Y4ZmFmYzsgYm9yZGVyLXJhZGl1czogOHB4OyBwYWRkaW5nOiAxMnB4IDE2cHg7IH1cbiAgICAuZnktaXRlbS1pbmZvIHsgZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgZ2FwOiAxMHB4OyBtYXJnaW4tYm90dG9tOiA0cHg7IH1cbiAgICAuZnktaXRlbS1tZXRhIHsgZm9udC1zaXplOiAxMnB4OyBjb2xvcjogIzY0NzQ4YjsgfVxuICAgIC5meS1hY3Rpb25zIHsgZGlzcGxheTogZmxleDsgZ2FwOiA4cHg7IG1hcmdpbi10b3A6IDhweDsgfVxuICAgIC5meS1jcmVhdGUgeyBib3JkZXItdG9wOiAxcHggc29saWQgI2UyZThmMDsgcGFkZGluZy10b3A6IDE2cHg7IGRpc3BsYXk6IGZsZXg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IGdhcDogMTBweDsgfVxuICAgIC5meS1jcmVhdGUgaDQgeyBtYXJnaW46IDA7IGZvbnQtc2l6ZTogMTNweDsgY29sb3I6ICM0NzU1Njk7IH1cbiAgICAuZGF0ZS1yb3cgeyBkaXNwbGF5OiBncmlkOyBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7IGdhcDogOHB4OyB9XG4gICAgLnRvZ2dsZS1sYWJlbCB7IGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGdhcDogOHB4OyBmb250LXNpemU6IDEzcHg7IGN1cnNvcjogcG9pbnRlcjsgfVxuICAgIC5jYXRlZ29yeS1saXN0IHsgZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgZ2FwOiA4cHg7IG1hcmdpbi1ib3R0b206IDE2cHg7IH1cbiAgICAuY2F0ZWdvcnktcm93IHsgZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgZ2FwOiA4cHg7IGZsZXgtd3JhcDogd3JhcDsgfVxuICAgIC5kcmFnLWhhbmRsZSB7IGNvbG9yOiAjOTRhM2I4OyBjdXJzb3I6IGdyYWI7IGZvbnQtc2l6ZTogMTZweDsgfVxuICAgIC5jb2RlLWlucHV0IHsgbWF4LXdpZHRoOiA4MHB4OyB9XG4gICAgLm51bS1pbnB1dCB7IG1heC13aWR0aDogMTAwcHg7IH1cbiAgICAuYWRkLWNhdGVnb3J5LWZvcm0geyBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBnYXA6IDhweDsgZmxleC13cmFwOiB3cmFwOyBwYWRkaW5nLXRvcDogMTJweDsgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlMmU4ZjA7IH1cbiAgICAuc3RhdHVzLWRyYWZ0IHsgYmFja2dyb3VuZDogI2YxZjVmOTsgY29sb3I6ICM0NzU1Njk7IH1cbiAgICAuc3RhdHVzLWFjdGl2ZSB7IGJhY2tncm91bmQ6ICNkY2ZjZTc7IGNvbG9yOiAjMTY2NTM0OyB9XG4gICAgLnN0YXR1cy1sb2NrZWQgeyBiYWNrZ3JvdW5kOiAjZmVlMmUyOyBjb2xvcjogIzk5MWIxYjsgfVxuICAgIC5zdGF0dXMtYXJjaGl2ZWQgeyBiYWNrZ3JvdW5kOiAjZmVmOWMzOyBjb2xvcjogIzkyNDAwZTsgfVxuXG4gICAgLmNoaXAtc20geyBmb250LXNpemU6IDEwcHg7IHBhZGRpbmc6IDJweCA4cHg7IGJvcmRlci1yYWRpdXM6IDEwcHg7IGRpc3BsYXk6IGlubGluZS1ibG9jazsgYmFja2dyb3VuZDogI2YxZjVmOTsgfVxuICAgIC5jaGlwLWdyZWVuIHsgYmFja2dyb3VuZDogI2RjZmNlNzsgY29sb3I6ICMxNjY1MzQ7IH1cbiAgICAuY2hpcC1hbWJlciB7IGJhY2tncm91bmQ6ICNmZWYzYzc7IGNvbG9yOiAjOTI0MDBlOyB9XG4gICAgLnRleHQtZGFuZ2VyIHsgY29sb3I6ICNlZjQ0NDQ7IH1cbiAgICAuZW1wdHktc3RhdGUgeyB0ZXh0LWFsaWduOiBjZW50ZXI7IGNvbG9yOiAjOTRhM2I4OyBwYWRkaW5nOiA0OHB4OyBmb250LXNpemU6IDE0cHg7IH1cbiAgICAubG9hZGluZy1zdGF0ZSB7IHRleHQtYWxpZ246IGNlbnRlcjsgY29sb3I6ICMxNTY1QzA7IHBhZGRpbmc6IDQ4cHg7IGZvbnQtc2l6ZTogMTRweDsgfVxuXG4gICAgLmJ0bi14cyB7IGhlaWdodDogMjRweDsgZm9udC1zaXplOiAxMXB4OyBwYWRkaW5nOiAwIDhweDsgfVxuICAgIC5idG4tLWRhbmdlciB7IGNvbG9yOiAjZWY0NDQ0OyB9XG4gICAgLmJ0bi1vdXRsaW5lIHsgYm9yZGVyOiAxcHggc29saWQgI2UyZThmMDsgYmFja2dyb3VuZDogI2ZmZjsgY29sb3I6ICMzMzQxNTU7IH1cbiAgICAuYnRuLW91dGxpbmU6aG92ZXIgeyBiYWNrZ3JvdW5kOiAjZjhmYWZjOyB9XG5cbiAgICAuYnVkZ2V0LWltcG9ydC1zdHJpcCB7XG4gICAgICBiYWNrZ3JvdW5kOiAjZjBmOWZmO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2JhZTZmZDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICBtYXJnaW46IDEycHggMjRweCA0cHg7XG4gICAgICBwYWRkaW5nOiAxNHB4IDIwcHg7XG4gICAgfVxuICAgIC5pbXBvcnQtc3RyaXAtYm9keSB7IGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgZ2FwOiAxNnB4OyBmbGV4LXdyYXA6IHdyYXA7IH1cbiAgICAuaW1wb3J0LXN0cmlwLWxlZnQgeyBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBnYXA6IDEycHg7IH1cbiAgICAuaW1wb3J0LXN0cmlwLXRpdGxlIHsgZm9udC1zaXplOiAxNHB4OyBmb250LXdlaWdodDogNzAwOyBjb2xvcjogIzBjNGE2ZTsgfVxuICAgIC5pbXBvcnQtc3RyaXAtZGVzYyB7IGZvbnQtc2l6ZTogMTJweDsgY29sb3I6ICMwMzY5YTE7IG1hcmdpbi10b3A6IDJweDsgfVxuICAgIC5pbXBvcnQtc3RyaXAtYWN0aW9ucyB7IGRpc3BsYXk6IGZsZXg7IGdhcDogMTBweDsgZmxleC13cmFwOiB3cmFwOyB9XG4gICAgLmJ0bi1vdXRsaW5lLWltcG9ydCB7IGJhY2tncm91bmQ6ICNmZmY7IGJvcmRlcjogMS41cHggc29saWQgIzA4OTFiMjsgY29sb3I6ICMwODkxYjI7IGJvcmRlci1yYWRpdXM6IDdweDsgcGFkZGluZzogN3B4IDE0cHg7IGZvbnQtc2l6ZTogMTJweDsgZm9udC13ZWlnaHQ6IDYwMDsgY3Vyc29yOiBwb2ludGVyOyB0cmFuc2l0aW9uOiBhbGwgLjE1czsgd2hpdGUtc3BhY2U6IG5vd3JhcDsgfVxuICAgIC5idG4tb3V0bGluZS1pbXBvcnQ6aG92ZXIgeyBiYWNrZ3JvdW5kOiAjZTBmMmZlOyB9XG4gICAgLmltcG9ydC1zdHJpcC1zYW1wbGUgeyBtYXJnaW4tdG9wOiAxMHB4OyBmb250LXNpemU6IDEycHg7IGNvbG9yOiAjMzc0MTUxOyB9XG4gICAgLmltcG9ydC1zdHJpcC1saW5rIHsgY29sb3I6ICMwODkxYjI7IGZvbnQtd2VpZ2h0OiA2MDA7IGN1cnNvcjogcG9pbnRlcjsgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IG1hcmdpbi1sZWZ0OiA0cHg7IH1cbiAgICAuaW1wb3J0LXN0cmlwLWxpbms6aG92ZXIgeyBjb2xvcjogIzAzNjlhMTsgfVxuICAgIC5pbXBvcnQtc3RyaXAtcmVzdWx0IHsgbWFyZ2luLXRvcDogOHB4OyBmb250LXNpemU6IDEzcHg7IGZvbnQtd2VpZ2h0OiA1MDA7IH1cbiAgIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 1296:
/*!******************************************!*\
  !*** ./src/app/budget/budget.service.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BudgetService: () => (/* binding */ BudgetService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);




const BASE = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/budget`;
class BudgetService {
  constructor(http) {
    this.http = http;
  }
  // Fiscal Years
  getFiscalYears() {
    return this.http.get(`${BASE}/fiscal-years`);
  }
  createFiscalYear(body) {
    return this.http.post(`${BASE}/fiscal-years`, body);
  }
  updateFiscalYear(id, body) {
    return this.http.put(`${BASE}/fiscal-years/${id}`, body);
  }
  lockFiscalYear(id) {
    return this.http.post(`${BASE}/fiscal-years/${id}/lock`, {});
  }
  cloneFiscalYear(id) {
    return this.http.post(`${BASE}/fiscal-years/${id}/clone`, {});
  }
  // Allocations
  getAllocations(fiscalYearId, dept) {
    let params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpParams();
    if (fiscalYearId) params = params.set('fiscalYearId', fiscalYearId);
    if (dept) params = params.set('dept', dept);
    return this.http.get(`${BASE}/allocations`, {
      params
    });
  }
  createAllocation(body) {
    return this.http.post(`${BASE}/allocations`, body);
  }
  updateAllocation(id, body) {
    return this.http.put(`${BASE}/allocations/${id}`, body);
  }
  deleteAllocation(id) {
    return this.http.delete(`${BASE}/allocations/${id}`);
  }
  // Line Items
  getLineItems(allocationId) {
    let params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpParams();
    if (allocationId) params = params.set('allocationId', allocationId);
    return this.http.get(`${BASE}/line-items`, {
      params
    });
  }
  createLineItem(body) {
    return this.http.post(`${BASE}/line-items`, body);
  }
  updateLineItem(id, body) {
    return this.http.put(`${BASE}/line-items/${id}`, body);
  }
  deleteLineItem(id) {
    return this.http.delete(`${BASE}/line-items/${id}`);
  }
  // Actuals
  getActuals(fiscalYearId, from, to, dept) {
    let params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpParams();
    if (fiscalYearId) params = params.set('fiscalYearId', fiscalYearId);
    if (from) params = params.set('from', from);
    if (to) params = params.set('to', to);
    if (dept) params = params.set('dept', dept);
    return this.http.get(`${BASE}/actuals`, {
      params
    });
  }
  createActual(body) {
    return this.http.post(`${BASE}/actuals`, body);
  }
  updateActual(id, body) {
    return this.http.put(`${BASE}/actuals/${id}`, body);
  }
  deleteActual(id) {
    return this.http.delete(`${BASE}/actuals/${id}`);
  }
  // Analytics
  getDashboard(fiscalYearId) {
    return this.http.get(`${BASE}/dashboard?fiscalYearId=${fiscalYearId}`);
  }
  getForecast(fiscalYearId) {
    return this.http.get(`${BASE}/forecast?fiscalYearId=${fiscalYearId}`);
  }
  getCostPerHire(fiscalYearId) {
    return this.http.get(`${BASE}/cost-per-hire?fiscalYearId=${fiscalYearId}`);
  }
  getVendorSpend(fiscalYearId) {
    return this.http.get(`${BASE}/vendor-spend?fiscalYearId=${fiscalYearId}`);
  }
  getDepartmentBreakdown(fiscalYearId) {
    return this.http.get(`${BASE}/department-breakdown?fiscalYearId=${fiscalYearId}`);
  }
  // Config
  getConfig() {
    return this.http.get(`${BASE}/config`);
  }
  updateConfig(body) {
    return this.http.put(`${BASE}/config`, body);
  }
  getCostCategories() {
    return this.http.get(`${BASE}/cost-categories`);
  }
  createCostCategory(body) {
    return this.http.post(`${BASE}/cost-categories`, body);
  }
  updateCostCategory(id, body) {
    return this.http.put(`${BASE}/cost-categories/${id}`, body);
  }
  // Exports
  exportExcel(fiscalYearId, reportType = 'all') {
    return this.http.get(`${BASE}/export/excel?fiscalYearId=${fiscalYearId}&reportType=${reportType}`, {
      responseType: 'blob'
    });
  }
  exportPpt(fiscalYearId) {
    return this.http.get(`${BASE}/export/ppt?fiscalYearId=${fiscalYearId}`, {
      responseType: 'blob'
    });
  }
  static {
    this.ɵfac = function BudgetService_Factory(t) {
      return new (t || BudgetService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
      token: BudgetService,
      factory: BudgetService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 7890:
/*!****************************************************************!*\
  !*** ./src/app/candidate-portal/candidate-portal.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CandidatePortalComponent: () => (/* binding */ CandidatePortalComponent)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);





function CandidatePortalComponent_div_8_article_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "article", 8)(1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 9)(6, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Posted");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](10, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CandidatePortalComponent_div_8_article_1_Template_button_click_11_listener() {
      const job_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.applyTo(job_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "Apply");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const job_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](job_r2.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("", job_r2.department, " \u00B7 ", job_r2.location, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](10, 4, job_r2.createdAt, "d MMM y"));
  }
}
function CandidatePortalComponent_div_8_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " No open positions at this time. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function CandidatePortalComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, CandidatePortalComponent_div_8_article_1_Template, 13, 7, "article", 6)(2, CandidatePortalComponent_div_8_div_2_Template, 2, 0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r2.jobs);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r2.jobs.length);
  }
}
function CandidatePortalComponent_div_9_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Application received! Reference: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.submittedRef);
  }
}
function CandidatePortalComponent_div_9_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.submitError);
  }
}
function CandidatePortalComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 12)(1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Apply for a Position");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "input", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function CandidatePortalComponent_div_9_Template_input_ngModelChange_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r2.form.applicantName, $event) || (ctx_r2.form.applicantName = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "input", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function CandidatePortalComponent_div_9_Template_input_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r2.form.applicantEmail, $event) || (ctx_r2.form.applicantEmail = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "input", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function CandidatePortalComponent_div_9_Template_input_ngModelChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r2.form.jobId, $event) || (ctx_r2.form.jobId = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "textarea", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function CandidatePortalComponent_div_9_Template_textarea_ngModelChange_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r2.form.coverLetter, $event) || (ctx_r2.form.coverLetter = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CandidatePortalComponent_div_9_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.submit());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, CandidatePortalComponent_div_9_div_9_Template, 4, 1, "div", 18)(10, CandidatePortalComponent_div_9_div_10_Template, 2, 1, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.form.applicantName);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.form.applicantEmail);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.form.jobId);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.form.coverLetter);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx_r2.submitting);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r2.submitting ? "Submitting\u2026" : "Submit Application", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r2.submitted);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r2.submitError);
  }
}
function CandidatePortalComponent_div_10_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "td", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](7, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "td")(9, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](13, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const a_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](a_r5.applicantName);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](a_r5.applicantEmail);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind3"](7, 5, a_r5.jobId, 0, 8), "\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](a_r5.status);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](13, 9, a_r5.appliedAt, "d MMM y"));
  }
}
function CandidatePortalComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 12)(1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Incoming Portal Applications");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "table", 22)(4, "thead")(5, "tr")(6, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Email");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Job ID");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Status");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Applied");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](17, CandidatePortalComponent_div_10_tr_17_Template, 14, 12, "tr", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r2.incoming);
  }
}
class CandidatePortalComponent {
  constructor(http) {
    this.http = http;
    this.tab = 'jobs';
    this.jobs = [];
    this.incoming = [];
    this.submitting = false;
    this.submitted = false;
    this.submittedRef = '';
    this.submitError = '';
    this.form = {
      applicantName: '',
      applicantEmail: '',
      jobId: '',
      coverLetter: ''
    };
  }
  ngOnInit() {
    this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/candidate-portal/jobs`).subscribe({
      next: d => this.jobs = d,
      error: () => {}
    });
  }
  applyTo(job) {
    this.form.jobId = job.id;
    this.tab = 'apply';
  }
  submit() {
    this.submitting = true;
    this.submitError = '';
    this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/candidate-portal/apply`, this.form).subscribe({
      next: r => {
        this.submitted = true;
        this.submittedRef = r.id;
        this.submitting = false;
      },
      error: err => {
        this.submitError = err?.error?.error ?? 'Submission failed';
        this.submitting = false;
      }
    });
  }
  loadIncoming() {
    this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/candidate-portal/incoming`).subscribe({
      next: d => this.incoming = d,
      error: () => {}
    });
  }
  static {
    this.ɵfac = function CandidatePortalComponent_Factory(t) {
      return new (t || CandidatePortalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: CandidatePortalComponent,
      selectors: [["app-candidate-portal"]],
      decls: 11,
      vars: 9,
      consts: [[1, "stack-page"], [1, "card", 2, "display", "flex", "gap", "0", "padding", "0", "margin-bottom", "0", "overflow", "hidden", "border-radius", "10px 10px 0 0"], [1, "tab-btn", 3, "click"], ["class", "cards-grid", "style", "margin-top:16px;", 4, "ngIf"], ["class", "card", "style", "margin-top:16px;", 4, "ngIf"], [1, "cards-grid", 2, "margin-top", "16px"], ["class", "card candidate-card", 4, "ngFor", "ngForOf"], ["style", "grid-column:1/-1;text-align:center;color:var(--text-3);padding:40px;", 4, "ngIf"], [1, "card", "candidate-card"], [1, "metric-line"], [1, "btn", "btn-primary", "btn-sm", 2, "margin-top", "8px", 3, "click"], [2, "grid-column", "1/-1", "text-align", "center", "color", "var(--text-3)", "padding", "40px"], [1, "card", 2, "margin-top", "16px"], ["placeholder", "Your name", 1, "input", 3, "ngModelChange", "ngModel"], ["placeholder", "Your email", "type", "email", 1, "input", 3, "ngModelChange", "ngModel"], ["placeholder", "Job ID", 1, "input", 3, "ngModelChange", "ngModel"], ["placeholder", "Cover letter\u2026", "rows", "6", 1, "textarea", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-primary", 3, "click", "disabled"], ["style", "color:#10b981;margin-top:8px;", 4, "ngIf"], ["style", "color:#ef4444;margin-top:8px;", 4, "ngIf"], [2, "color", "#10b981", "margin-top", "8px"], [2, "color", "#ef4444", "margin-top", "8px"], [1, "table"], [4, "ngFor", "ngForOf"], [2, "font-size", "11px"], [1, "chip", "chip-brand"]],
      template: function CandidatePortalComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "section", 0)(1, "div", 1)(2, "button", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CandidatePortalComponent_Template_button_click_2_listener() {
            return ctx.tab = "jobs";
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Public Job Listings");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "button", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CandidatePortalComponent_Template_button_click_4_listener() {
            return ctx.tab = "apply";
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Apply");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "button", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CandidatePortalComponent_Template_button_click_6_listener() {
            ctx.tab = "incoming";
            return ctx.loadIncoming();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Incoming Applications");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, CandidatePortalComponent_div_8_Template, 3, 2, "div", 3)(9, CandidatePortalComponent_div_9_Template, 11, 8, "div", 4)(10, CandidatePortalComponent_div_10_Template, 18, 1, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("active", ctx.tab === "jobs");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("active", ctx.tab === "apply");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("active", ctx.tab === "incoming");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.tab === "jobs");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.tab === "apply");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.tab === "incoming");
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_3__.SlicePipe, _angular_common__WEBPACK_IMPORTED_MODULE_3__.DatePipe],
      styles: [".tab-btn[_ngcontent-%COMP%] { flex:1; padding:12px 16px; border:none; background:#f8fafc; cursor:pointer; font-weight:600; font-size:13px; color:var(--text-3); }\n    .tab-btn.active[_ngcontent-%COMP%] { background:var(--brand); color:#fff; }\n  \n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY2FuZGlkYXRlLXBvcnRhbC9jYW5kaWRhdGUtcG9ydGFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0lBQ0ksV0FBVyxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixFQUFFO0lBQzdJLGtCQUFrQix1QkFBdUIsRUFBRSxVQUFVLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAudGFiLWJ0biB7IGZsZXg6MTsgcGFkZGluZzoxMnB4IDE2cHg7IGJvcmRlcjpub25lOyBiYWNrZ3JvdW5kOiNmOGZhZmM7IGN1cnNvcjpwb2ludGVyOyBmb250LXdlaWdodDo2MDA7IGZvbnQtc2l6ZToxM3B4OyBjb2xvcjp2YXIoLS10ZXh0LTMpOyB9XG4gICAgLnRhYi1idG4uYWN0aXZlIHsgYmFja2dyb3VuZDp2YXIoLS1icmFuZCk7IGNvbG9yOiNmZmY7IH1cbiAgIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 1044:
/*!****************************************************!*\
  !*** ./src/app/compliance/compliance.component.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComplianceComponent: () => (/* binding */ ComplianceComponent)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);




function ComplianceComponent_div_8_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "td", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](7, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](10, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](13, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const a_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](a_r1.eventType);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](a_r1.agentName);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind3"](7, 5, a_r1.entityId, 0, 12), "\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](10, 9, a_r1.confidence * 100, "1.0-0"), "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](13, 12, a_r1.createdAt, "d MMM y HH:mm"));
  }
}
function ComplianceComponent_div_8_tr_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "tr")(1, "td", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "No audit entries.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
function ComplianceComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 4)(1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "AI Audit Log");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "table", 5)(4, "thead")(5, "tr")(6, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Event");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Agent");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Entity");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Confidence");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](17, ComplianceComponent_div_8_tr_17_Template, 14, 15, "tr", 6)(18, ComplianceComponent_div_8_tr_18_Template, 3, 0, "tr", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.auditLog);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r1.auditLog.length);
  }
}
function ComplianceComponent_div_9_tr_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](7, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "td")(9, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ComplianceComponent_div_9_tr_15_Template_button_click_9_listener() {
      const c_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.erase(c_r4.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Erase");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const c_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](c_r4.candidateName);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](c_r4.email);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](7, 3, c_r4.createdAt, "d MMM y"));
  }
}
function ComplianceComponent_div_9_tr_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "tr")(1, "td", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "No candidates.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
function ComplianceComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 4)(1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "GDPR Candidate Data");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "table", 5)(4, "thead")(5, "tr")(6, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Email");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Created");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Action");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](15, ComplianceComponent_div_9_tr_15_Template, 11, 6, "tr", 6)(16, ComplianceComponent_div_9_tr_16_Template, 3, 0, "tr", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.gdprCandidates);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r1.gdprCandidates.length);
  }
}
function ComplianceComponent_div_10_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div")(1, "div", 12)(2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Total Candidates");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "p", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.eeoReport.totalCandidates);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.eeoReport.note);
  }
}
function ComplianceComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 4)(1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "EEO / Diversity Report");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, ComplianceComponent_div_10_div_3_Template, 8, 2, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.eeoReport);
  }
}
class ComplianceComponent {
  constructor(http) {
    this.http = http;
    this.tab = 'audit';
    this.auditLog = [];
    this.gdprCandidates = [];
    this.eeoReport = null;
  }
  ngOnInit() {
    this.loadAuditLog();
  }
  loadAuditLog() {
    this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/compliance/audit-log`).subscribe({
      next: d => this.auditLog = d.items ?? [],
      error: () => {}
    });
  }
  loadGdprCandidates() {
    this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/compliance/gdpr/candidates`).subscribe({
      next: d => this.gdprCandidates = d,
      error: () => {}
    });
  }
  loadEeo() {
    this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/compliance/eeo-report`).subscribe({
      next: d => this.eeoReport = d,
      error: () => {}
    });
  }
  erase(id) {
    if (!confirm('Permanently erase this candidate\'s personal data?')) return;
    this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/compliance/gdpr/erase/${id}`, {}).subscribe({
      next: () => this.loadGdprCandidates(),
      error: () => {}
    });
  }
  static {
    this.ɵfac = function ComplianceComponent_Factory(t) {
      return new (t || ComplianceComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: ComplianceComponent,
      selectors: [["app-compliance"]],
      decls: 11,
      vars: 9,
      consts: [[1, "stack-page"], [1, "card", 2, "display", "flex", "gap", "0", "padding", "0", "margin-bottom", "0", "overflow", "hidden", "border-radius", "10px 10px 0 0"], [1, "tab-btn", 3, "click"], ["class", "card", "style", "margin-top:0;border-radius:0 0 10px 10px;", 4, "ngIf"], [1, "card", 2, "margin-top", "0", "border-radius", "0 0 10px 10px"], [1, "table"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [2, "font-size", "11px"], ["colspan", "5", 2, "text-align", "center", "color", "var(--text-3)"], [1, "btn", "btn-ghost", "btn-sm", 2, "color", "#ef4444", 3, "click"], ["colspan", "4", 2, "text-align", "center", "color", "var(--text-3)"], [1, "metric-line"], [2, "color", "var(--text-3)", "margin-top", "12px", "font-size", "13px"]],
      template: function ComplianceComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "section", 0)(1, "div", 1)(2, "button", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ComplianceComponent_Template_button_click_2_listener() {
            ctx.tab = "audit";
            return ctx.loadAuditLog();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Audit Log");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "button", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ComplianceComponent_Template_button_click_4_listener() {
            ctx.tab = "gdpr";
            return ctx.loadGdprCandidates();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "GDPR Candidates");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "button", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ComplianceComponent_Template_button_click_6_listener() {
            ctx.tab = "eeo";
            return ctx.loadEeo();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "EEO Report");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, ComplianceComponent_div_8_Template, 19, 2, "div", 3)(9, ComplianceComponent_div_9_Template, 17, 2, "div", 3)(10, ComplianceComponent_div_10_Template, 4, 1, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("active", ctx.tab === "audit");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("active", ctx.tab === "gdpr");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("active", ctx.tab === "eeo");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.tab === "audit");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.tab === "gdpr");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.tab === "eeo");
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.SlicePipe, _angular_common__WEBPACK_IMPORTED_MODULE_3__.DecimalPipe, _angular_common__WEBPACK_IMPORTED_MODULE_3__.DatePipe],
      styles: [".tab-btn[_ngcontent-%COMP%] { flex:1; padding:12px 16px; border:none; background:#f8fafc; cursor:pointer; font-weight:600; font-size:13px; color:var(--text-3); }\n    .tab-btn.active[_ngcontent-%COMP%] { background:var(--brand); color:#fff; }\n  \n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcGxpYW5jZS9jb21wbGlhbmNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0lBQ0ksV0FBVyxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixFQUFFO0lBQzdJLGtCQUFrQix1QkFBdUIsRUFBRSxVQUFVLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAudGFiLWJ0biB7IGZsZXg6MTsgcGFkZGluZzoxMnB4IDE2cHg7IGJvcmRlcjpub25lOyBiYWNrZ3JvdW5kOiNmOGZhZmM7IGN1cnNvcjpwb2ludGVyOyBmb250LXdlaWdodDo2MDA7IGZvbnQtc2l6ZToxM3B4OyBjb2xvcjp2YXIoLS10ZXh0LTMpOyB9XG4gICAgLnRhYi1idG4uYWN0aXZlIHsgYmFja2dyb3VuZDp2YXIoLS1icmFuZCk7IGNvbG9yOiNmZmY7IH1cbiAgIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 2320:
/*!**************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DashboardComponent: () => (/* binding */ DashboardComponent)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);




function DashboardComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 59)(1, "div", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 61)(4, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 64)(9, "span", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "span", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const k_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("background", k_r1.color);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](k_r1.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](k_r1.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](k_r1.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("trend-up", k_r1.up)("trend-dn", !k_r1.up);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"](" ", k_r1.up ? "\u25B2" : "\u25BC", " ", k_r1.change, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](k_r1.meta);
  }
}
function DashboardComponent__svg_line_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "line", 67);
  }
  if (rf & 2) {
    const y_r2 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("x1", 0)("y1", y_r2)("x2", ctx_r2.svgW)("y2", y_r2);
  }
}
function DashboardComponent__svg_circle_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "circle", 68);
  }
  if (rf & 2) {
    const p_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("cx", p_r4.x)("cy", p_r4.y);
  }
}
function DashboardComponent__svg_circle_30_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "circle", 69);
  }
  if (rf & 2) {
    const p_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("cx", p_r5.x)("cy", p_r5.y);
  }
}
function DashboardComponent_span_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const m_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](m_r6.month);
  }
}
function DashboardComponent_div_75_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 70)(1, "span", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "div", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "span", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const s_r7 = ctx.$implicit;
    const i_r8 = ctx.index;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](s_r7.stage);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("width", s_r7.pct, "%")("background", ctx_r2.funnelColors[i_r8 % ctx_r2.funnelColors.length]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](s_r7.count);
  }
}
function DashboardComponent_div_83_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 75)(1, "div", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 77)(4, "span", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "div", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "span", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const v_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](v_r9.name[0]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](v_r9.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("width", v_r9.qualityScore, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("sc-hi", v_r9.qualityScore >= 85)("sc-md", v_r9.qualityScore >= 70 && v_r9.qualityScore < 85)("sc-lo", v_r9.qualityScore < 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", v_r9.qualityScore, "%");
  }
}
function DashboardComponent_div_91_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 82)(1, "span", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "div", 85)(5, "div", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "span", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const r_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](r_r10.role);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("width", r_r10.days / 45 * 100, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("ttf-ok", r_r10.days <= r_r10.target)("ttf-ov", r_r10.days > r_r10.target);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("left", r_r10.target / 45 * 100, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("ttf-ov", r_r10.days > r_r10.target);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", r_r10.days, "d");
  }
}
function DashboardComponent_div_100_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 88)(1, "span", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "div", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "span", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const s_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](s_r11.skill);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("width", s_r11.pct, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](s_r11.count);
  }
}
function DashboardComponent_tr_124_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "tr")(1, "td")(2, "div", 93)(3, "div", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "td")(14, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "td")(17, "span", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const r_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("background", r_r12.color);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](r_r12.name[0]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](r_r12.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](r_r12.submissions);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](r_r12.shortlisted);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](r_r12.joinings);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", r_r12.selectionRatio, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("g-a", r_r12.grade === "A")("g-b", r_r12.grade === "B")("g-c", r_r12.grade === "C");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](r_r12.grade);
  }
}
function DashboardComponent_div_130_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "div", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 98)(3, "span", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "span", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const a_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("dot-skill", a_r13.time === "Top skill")("dot-today", a_r13.time === "Today");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](a_r13.action);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](a_r13.time);
  }
}
class DashboardComponent {
  constructor(http) {
    this.http = http;
    this.kpis = [];
    this.funnel = [];
    this.topVendors = [];
    this.enrichedRecruiters = [];
    this.activity = [];
    this.selectionRate = 0;
    this.joinedCount = 0;
    this.totalCandidates = 0;
    this.openReqs = 0;
    /* SVG chart state */
    this.svgW = 580;
    this.svgH = 160;
    this.submitLine = '';
    this.submitArea = '';
    this.joinLine = '';
    this.joinArea = '';
    this.submitDots = [];
    this.joinDots = [];
    this.yGrids = [];
    this.donutDash = '0 327';
    this.funnelColors = ['#6b4df0', '#a94ee6', '#3bbdea', '#16a34a', '#e8912a'];
    this.monthlyTrend = [{
      month: 'Nov',
      submitted: 18,
      joined: 4
    }, {
      month: 'Dec',
      submitted: 22,
      joined: 6
    }, {
      month: 'Jan',
      submitted: 28,
      joined: 8
    }, {
      month: 'Feb',
      submitted: 35,
      joined: 10
    }, {
      month: 'Mar',
      submitted: 30,
      joined: 9
    }, {
      month: 'Apr',
      submitted: 42,
      joined: 12
    }];
    this.topSkills = [{
      skill: 'React',
      count: 24,
      pct: 80
    }, {
      skill: '.NET Core',
      count: 21,
      pct: 70
    }, {
      skill: 'Angular',
      count: 18,
      pct: 60
    }, {
      skill: 'AWS',
      count: 15,
      pct: 50
    }, {
      skill: 'PostgreSQL',
      count: 12,
      pct: 40
    }, {
      skill: 'Docker',
      count: 9,
      pct: 30
    }];
    this.timeToFill = [{
      role: 'Frontend',
      days: 18,
      target: 30
    }, {
      role: 'Backend',
      days: 24,
      target: 30
    }, {
      role: 'DevOps',
      days: 35,
      target: 30
    }, {
      role: 'Data Analyst',
      days: 12,
      target: 30
    }, {
      role: 'QA Engineer',
      days: 20,
      target: 30
    }];
  }
  ngOnInit() {
    this.buildSvgChart();
    this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/dashboard/metrics`).subscribe(metrics => {
      this.selectionRate = metrics.selectionRate || 0;
      this.totalCandidates = metrics.totalCandidates || 0;
      this.openReqs = metrics.totalJobs || 0;
      const circumference = 2 * Math.PI * 52;
      const filled = this.selectionRate / 100 * circumference;
      this.donutDash = `${filled.toFixed(1)} ${circumference.toFixed(1)}`;
      this.joinedCount = (metrics.hiringFunnel || []).find(f => f.stage?.toLowerCase() === 'joined')?.count || 0;
      this.kpis = [{
        label: 'Total Candidates',
        value: metrics.totalCandidates,
        meta: 'All sources',
        change: '+12%',
        up: true,
        color: '#6b4df0',
        icon: '👥'
      }, {
        label: 'Total CVs',
        value: metrics.totalCVs,
        meta: `${metrics.interviewedEarlier || 0} interviewed`,
        change: '+8%',
        up: true,
        color: '#3bbdea',
        icon: '📋'
      }, {
        label: 'Open Reqs',
        value: metrics.totalJobs,
        meta: 'Active demand',
        change: '+2',
        up: true,
        color: '#e8912a',
        icon: '📌'
      }, {
        label: 'Active Vendors',
        value: metrics.activeVendors,
        meta: `${metrics.totalVendors || 0} total`,
        change: '—',
        up: true,
        color: '#16a34a',
        icon: '🏢'
      }, {
        label: 'Selection Rate',
        value: `${metrics.selectionRate || 0}%`,
        meta: 'Live',
        change: '-2%',
        up: false,
        color: '#dc2626',
        icon: '🎯'
      }];
      const maxCount = Math.max(...(metrics.hiringFunnel || [1]).map(f => f.count || 1));
      this.funnel = (metrics.hiringFunnel || []).map(f => ({
        ...f,
        pct: Math.max(8, (f.count || 0) / maxCount * 100)
      }));
      this.topVendors = metrics.topVendors || [];
      const skillActivity = (metrics.topSkills || []).map(s => ({
        action: `${s.skill}: ${s.count} CV(s)`,
        time: 'Top skill'
      }));
      this.activity = [...skillActivity, ...(metrics.recentActivity || [])];
    });
    this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/recruiters`).subscribe(data => {
      const colors = ['#6b4df0', '#a94ee6', '#3bbdea', '#16a34a', '#e8912a'];
      this.enrichedRecruiters = (data || []).map((r, i) => ({
        ...r,
        shortlisted: Math.round((r.submissions || 0) * 0.42),
        color: colors[i % colors.length],
        grade: r.selectionRatio >= 40 ? 'A' : r.selectionRatio >= 25 ? 'B' : 'C'
      }));
    });
  }
  buildSvgChart() {
    const W = this.svgW,
      H = this.svgH,
      PAD = 18;
    const sub = this.monthlyTrend.map(m => m.submitted);
    const joi = this.monthlyTrend.map(m => m.joined);
    const maxV = Math.max(...sub);
    const n = sub.length;
    const pt = (v, i) => ({
      x: PAD + i / (n - 1) * (W - PAD * 2),
      y: H - PAD - v / maxV * (H - PAD * 2)
    });
    const sP = sub.map((v, i) => pt(v, i));
    const jP = joi.map((v, i) => pt(v, i));
    this.submitLine = sP.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    this.joinLine = jP.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    this.submitDots = sP;
    this.joinDots = jP;
    const areaPath = pts => `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)} ` + pts.slice(1).map(p => `L ${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ') + ` L ${pts[pts.length - 1].x.toFixed(1)},${H} L ${pts[0].x.toFixed(1)},${H} Z`;
    this.submitArea = areaPath(sP);
    this.joinArea = areaPath(jP);
    this.yGrids = [H * 0.2, H * 0.5, H * 0.8].map(v => +v.toFixed(1));
  }
  static {
    this.ɵfac = function DashboardComponent_Factory(t) {
      return new (t || DashboardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: DashboardComponent,
      selectors: [["app-dashboard"]],
      decls: 131,
      vars: 21,
      consts: [[1, "dash"], [1, "kpi-row"], ["class", "kpi-card", 4, "ngFor", "ngForOf"], [1, "row-2col", "wide-left"], [1, "card"], [1, "card-head"], [1, "legend-row"], [1, "leg-dot", 2, "background", "#6b4df0"], [1, "leg-text"], [1, "leg-dot", 2, "background", "#3bbdea", "margin-left", "14px"], [1, "chart-wrap"], ["preserveAspectRatio", "none", 1, "trend-svg"], ["id", "gSubmit", "x1", "0", "y1", "0", "x2", "0", "y2", "1"], ["offset", "0%", "stop-color", "#6b4df0", "stop-opacity", "0.28"], ["offset", "100%", "stop-color", "#6b4df0", "stop-opacity", "0.02"], ["id", "gJoin", "x1", "0", "y1", "0", "x2", "0", "y2", "1"], ["offset", "0%", "stop-color", "#3bbdea", "stop-opacity", "0.22"], ["offset", "100%", "stop-color", "#3bbdea", "stop-opacity", "0.02"], ["stroke", "#eef0f4", "stroke-width", "1", 4, "ngFor", "ngForOf"], ["fill", "url(#gSubmit)"], ["fill", "none", "stroke", "#6b4df0", "stroke-width", "2.5", "stroke-linejoin", "round", "stroke-linecap", "round"], ["fill", "url(#gJoin)"], ["fill", "none", "stroke", "#3bbdea", "stroke-width", "2", "stroke-linejoin", "round", "stroke-linecap", "round"], ["r", "4", "fill", "#6b4df0", "stroke", "#fff", "stroke-width", "2", 4, "ngFor", "ngForOf"], ["r", "3.5", "fill", "#3bbdea", "stroke", "#fff", "stroke-width", "2", 4, "ngFor", "ngForOf"], [1, "chart-x-labels"], [4, "ngFor", "ngForOf"], [1, "card", "donut-card"], [1, "donut-center"], ["viewBox", "0 0 130 130", 1, "donut-svg"], ["id", "dGrad", "x1", "0", "y1", "0", "x2", "1", "y2", "0"], ["offset", "0%", "stop-color", "#6b4df0"], ["offset", "100%", "stop-color", "#3bbdea"], ["cx", "65", "cy", "65", "r", "52", "fill", "none", "stroke", "#eef0f4", "stroke-width", "13"], ["cx", "65", "cy", "65", "r", "52", "fill", "none", "stroke", "url(#dGrad)", "stroke-width", "13", "stroke-linecap", "round", "transform", "rotate(-90 65 65)"], ["x", "65", "y", "62", "text-anchor", "middle", "font-size", "22", "font-weight", "700", "fill", "#0f1320"], ["x", "65", "y", "79", "text-anchor", "middle", "font-size", "9", "fill", "#9aa2b2", "letter-spacing", "1"], [1, "donut-stats"], [1, "donut-stat"], [1, "ds-val"], [1, "ds-lbl"], [1, "donut-divider"], [1, "ds-val", 2, "color", "#16a34a"], [1, "ds-val", 2, "color", "#6b4df0"], [1, "row-3col"], [1, "tag"], [1, "funnel-wrap"], ["class", "funnel-row", 4, "ngFor", "ngForOf"], [1, "vendor-list"], ["class", "vendor-row", 4, "ngFor", "ngForOf"], [1, "ttf-list"], ["class", "ttf-row", 4, "ngFor", "ngForOf"], [1, "row-3col", "bottom"], [1, "skill-list"], ["class", "skill-row", 4, "ngFor", "ngForOf"], [1, "table-scroll"], [1, "perf-tbl"], [1, "activity-feed"], ["class", "act-item", 4, "ngFor", "ngForOf"], [1, "kpi-card"], [1, "kpi-icon"], [1, "kpi-body"], [1, "kpi-label"], [1, "kpi-value"], [1, "kpi-foot"], [1, "kpi-trend"], [1, "kpi-sub"], ["stroke", "#eef0f4", "stroke-width", "1"], ["r", "4", "fill", "#6b4df0", "stroke", "#fff", "stroke-width", "2"], ["r", "3.5", "fill", "#3bbdea", "stroke", "#fff", "stroke-width", "2"], [1, "funnel-row"], [1, "funnel-lbl"], [1, "funnel-track"], [1, "funnel-fill"], [1, "funnel-cnt"], [1, "vendor-row"], [1, "v-avatar"], [1, "v-info"], [1, "v-name"], [1, "v-bar-track"], [1, "v-bar-fill"], [1, "v-score"], [1, "ttf-row"], [1, "ttf-role"], [1, "ttf-track"], [1, "ttf-fill"], [1, "ttf-marker"], [1, "ttf-days"], [1, "skill-row"], [1, "skill-name"], [1, "skill-track"], [1, "skill-fill"], [1, "skill-cnt"], [1, "r-cell"], [1, "r-av"], [1, "grade"], [1, "act-item"], [1, "act-dot"], [1, "act-body"], [1, "act-text"], [1, "act-time"]],
      template: function DashboardComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "section", 0)(1, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, DashboardComponent_div_2_Template, 13, 12, "div", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Monthly Hiring Trend");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "span", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "span", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Submitted");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "span", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "span", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "Joined");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "div", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "svg", 11)(17, "defs")(18, "linearGradient", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](19, "stop", 13)(20, "stop", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "linearGradient", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](22, "stop", 16)(23, "stop", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](24, DashboardComponent__svg_line_24_Template, 1, 4, "line", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](25, "path", 19)(26, "polyline", 20)(27, "path", 21)(28, "polyline", 22);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](29, DashboardComponent__svg_circle_29_Template, 1, 2, "circle", 23)(30, DashboardComponent__svg_circle_30_Template, 1, 2, "circle", 24);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceHTML"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "div", 25);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](32, DashboardComponent_span_32_Template, 2, 1, "span", 26);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "div", 27)(34, "div", 5)(35, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](36, "Selection Rate");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "div", 28);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](38, "svg", 29)(39, "defs")(40, "linearGradient", 30);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](41, "stop", 31)(42, "stop", 32);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](43, "circle", 33)(44, "circle", 34);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](45, "text", 35);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](46);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](47, "text", 36);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](48, "SELECTION");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceHTML"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](49, "div", 37)(50, "div", 38)(51, "div", 39);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](52);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](53, "div", 40);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](54, "Total");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](55, "div", 41);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](56, "div", 38)(57, "div", 42);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](58);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](59, "div", 40);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](60, "Joined");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](61, "div", 41);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](62, "div", 38)(63, "div", 43);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](64);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](65, "div", 40);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](66, "Open Reqs");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](67, "div", 44)(68, "div", 4)(69, "div", 5)(70, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](71, "Hiring Funnel");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](72, "span", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](73, "Live");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](74, "div", 46);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](75, DashboardComponent_div_75_Template, 7, 6, "div", 47);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](76, "div", 4)(77, "div", 5)(78, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](79, "Top Vendors");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](80, "span", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](81, "Quality Score");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](82, "div", 48);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](83, DashboardComponent_div_83_Template, 10, 11, "div", 49);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](84, "div", 4)(85, "div", 5)(86, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](87, "Time to Fill");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](88, "span", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](89, "vs 30d target");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](90, "div", 50);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](91, DashboardComponent_div_91_Template, 8, 12, "div", 51);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](92, "div", 52)(93, "div", 4)(94, "div", 5)(95, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](96, "Skill Demand");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](97, "span", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](98, "Top 6");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](99, "div", 53);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](100, DashboardComponent_div_100_Template, 7, 4, "div", 54);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](101, "div", 4)(102, "div", 5)(103, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](104, "Recruiter Performance");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](105, "span", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](106, "This Quarter");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](107, "div", 55)(108, "table", 56)(109, "thead")(110, "tr")(111, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](112, "Recruiter");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](113, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](114, "Sub.");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](115, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](116, "Short.");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](117, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](118, "Joined");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](119, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](120, "Rate");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](121, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](122, "Grade");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](123, "tbody");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](124, DashboardComponent_tr_124_Template, 19, 15, "tr", 26);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](125, "div", 4)(126, "div", 5)(127, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](128, "Recent Activity");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](129, "div", 57);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](130, DashboardComponent_div_130_Template, 7, 6, "div", 58);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.kpis);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](14);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("viewBox", "0 0 " + ctx.svgW + " " + ctx.svgH);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.yGrids);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("d", ctx.submitArea);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("points", ctx.submitLine);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("d", ctx.joinArea);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("points", ctx.joinLine);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.submitDots);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.joinDots);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.monthlyTrend);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](12);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("stroke-dasharray", ctx.donutDash);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx.selectionRate, "%");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.totalCandidates);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.joinedCount);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.openReqs);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](11);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.funnel);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.topVendors);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.timeToFill);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.topSkills);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](24);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.enrichedRecruiters);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.activity);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf],
      styles: [".dash[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 18px; }\n\n    \n\n    .kpi-row[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; }\n    .kpi-card[_ngcontent-%COMP%] {\n      background: #fff; border: 1px solid #e1e4eb; border-radius: 12px;\n      padding: 16px; display: flex; gap: 13px; align-items: flex-start;\n      box-shadow: 0 1px 3px rgba(17,20,45,.05);\n      transition: box-shadow 180ms, transform 180ms;\n    }\n    .kpi-card[_ngcontent-%COMP%]:hover { box-shadow: 0 6px 20px rgba(107,77,240,.13); transform: translateY(-1px); }\n    .kpi-icon[_ngcontent-%COMP%] {\n      width: 44px; height: 44px; border-radius: 10px;\n      display: flex; align-items: center; justify-content: center;\n      font-size: 19px; flex-shrink: 0;\n    }\n    .kpi-body[_ngcontent-%COMP%] { flex: 1; min-width: 0; }\n    .kpi-label[_ngcontent-%COMP%] { font-size: 10px; font-weight: 700; color: #6e7686; text-transform: uppercase; letter-spacing: .07em; }\n    .kpi-value[_ngcontent-%COMP%] { font-size: 30px; font-weight: 800; color: #0f1320; line-height: 1.05; margin: 3px 0 5px; }\n    .kpi-foot[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }\n    .kpi-trend[_ngcontent-%COMP%] { font-size: 11px; font-weight: 700; }\n    .trend-up[_ngcontent-%COMP%] { color: #16a34a; }\n    .trend-dn[_ngcontent-%COMP%] { color: #dc2626; }\n    .kpi-sub[_ngcontent-%COMP%] { font-size: 11px; color: #9aa2b2; }\n\n    \n\n    .card[_ngcontent-%COMP%] {\n      background: #fff; border: 1px solid #e1e4eb; border-radius: 12px;\n      padding: 20px; box-shadow: 0 1px 3px rgba(17,20,45,.05);\n    }\n    .card-head[_ngcontent-%COMP%] {\n      display: flex; justify-content: space-between; align-items: center;\n      margin-bottom: 16px;\n    }\n    .card-head[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 0; font-size: 14px; font-weight: 700; color: #0f1320; }\n    .tag[_ngcontent-%COMP%] {\n      font-size: 10px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase;\n      color: #5C5C99; background: rgba(92,92,153,.1); padding: 3px 8px; border-radius: 99px;\n    }\n\n    .row-2col[_ngcontent-%COMP%] { display: grid; gap: 14px; }\n    .wide-left[_ngcontent-%COMP%] { grid-template-columns: 1fr 260px; }\n    .row-3col[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }\n    .bottom[_ngcontent-%COMP%] { }\n\n    \n\n    .chart-wrap[_ngcontent-%COMP%] { position: relative; }\n    .trend-svg[_ngcontent-%COMP%] { width: 100%; height: 160px; display: block; }\n    .chart-x-labels[_ngcontent-%COMP%] {\n      display: flex; justify-content: space-between;\n      font-size: 11px; color: #9aa2b2; margin-top: 6px; padding: 0 2px;\n    }\n    .legend-row[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 5px; font-size: 12px; color: #6e7686; }\n    .leg-dot[_ngcontent-%COMP%] { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }\n    .leg-text[_ngcontent-%COMP%] { margin-right: 2px; }\n\n    \n\n    .donut-card[_ngcontent-%COMP%] { display: flex; flex-direction: column; }\n    .donut-center[_ngcontent-%COMP%] { display: flex; flex-direction: column; align-items: center; gap: 14px; flex: 1; padding-top: 6px; }\n    .donut-svg[_ngcontent-%COMP%] { width: 150px; height: 150px; }\n    .donut-stats[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 12px; width: 100%; justify-content: center; }\n    .donut-stat[_ngcontent-%COMP%] { text-align: center; }\n    .ds-val[_ngcontent-%COMP%] { font-size: 20px; font-weight: 800; color: #0f1320; }\n    .ds-lbl[_ngcontent-%COMP%] { font-size: 10px; color: #9aa2b2; text-transform: uppercase; letter-spacing: .05em; margin-top: 2px; }\n    .donut-divider[_ngcontent-%COMP%] { width: 1px; height: 32px; background: #e1e4eb; }\n\n    \n\n    .funnel-wrap[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 10px; }\n    .funnel-row[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 10px; }\n    .funnel-lbl[_ngcontent-%COMP%] { width: 80px; font-size: 12px; color: #4b5262; flex-shrink: 0; }\n    .funnel-track[_ngcontent-%COMP%] { flex: 1; height: 26px; background: #f6f7fa; border-radius: 6px; overflow: hidden; }\n    .funnel-fill[_ngcontent-%COMP%] { height: 100%; border-radius: 6px; transition: width 900ms cubic-bezier(.4,0,.2,1); }\n    .funnel-cnt[_ngcontent-%COMP%] { width: 28px; text-align: right; font-size: 13px; font-weight: 700; color: #0f1320; }\n\n    \n\n    .vendor-list[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 13px; }\n    .vendor-row[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 10px; }\n    .v-avatar[_ngcontent-%COMP%] { width: 34px; height: 34px; border-radius: 8px; background: #5C5C99; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; flex-shrink: 0; }\n    .v-info[_ngcontent-%COMP%] { flex: 1; min-width: 0; }\n    .v-name[_ngcontent-%COMP%] { font-size: 13px; font-weight: 600; color: #0f1320; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n    .v-bar-track[_ngcontent-%COMP%] { height: 5px; background: #eef0f4; border-radius: 99px; margin-top: 5px; overflow: hidden; }\n    .v-bar-fill[_ngcontent-%COMP%] { height: 100%; background: linear-gradient(90deg, #6b4df0, #3bbdea); border-radius: 99px; transition: width 900ms; }\n    .v-score[_ngcontent-%COMP%] { font-size: 12px; font-weight: 800; width: 40px; text-align: right; }\n    .sc-hi[_ngcontent-%COMP%] { color: #16a34a; }\n    .sc-md[_ngcontent-%COMP%] { color: #e8912a; }\n    .sc-lo[_ngcontent-%COMP%] { color: #dc2626; }\n\n    \n\n    .ttf-list[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 12px; }\n    .ttf-row[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 10px; }\n    .ttf-role[_ngcontent-%COMP%] { width: 95px; font-size: 12px; color: #4b5262; flex-shrink: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n    .ttf-track[_ngcontent-%COMP%] { flex: 1; height: 8px; background: #f6f7fa; border-radius: 99px; position: relative; overflow: visible; }\n    .ttf-fill[_ngcontent-%COMP%] { height: 100%; border-radius: 99px; transition: width 900ms; }\n    .ttf-ok[_ngcontent-%COMP%] { background: #16a34a; }\n    .ttf-ov[_ngcontent-%COMP%] { background: #dc2626; }\n    .ttf-marker[_ngcontent-%COMP%] { position: absolute; top: -3px; width: 2px; height: 14px; background: #343a48; border-radius: 1px; }\n    .ttf-days[_ngcontent-%COMP%] { font-size: 12px; font-weight: 700; width: 32px; text-align: right; color: #0f1320; }\n    .ttf-days.ttf-ov[_ngcontent-%COMP%] { color: #dc2626; }\n\n    \n\n    .skill-list[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 11px; }\n    .skill-row[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 10px; }\n    .skill-name[_ngcontent-%COMP%] { width: 80px; font-size: 12px; color: #4b5262; flex-shrink: 0; }\n    .skill-track[_ngcontent-%COMP%] { flex: 1; height: 8px; background: #f6f7fa; border-radius: 99px; overflow: hidden; }\n    .skill-fill[_ngcontent-%COMP%] { height: 100%; background: linear-gradient(90deg, #5C5C99, #CCCCFF); border-radius: 99px; transition: width 900ms; }\n    .skill-cnt[_ngcontent-%COMP%] { font-size: 12px; font-weight: 700; color: #0f1320; width: 24px; text-align: right; }\n\n    \n\n    .table-scroll[_ngcontent-%COMP%] { overflow-x: auto; }\n    .perf-tbl[_ngcontent-%COMP%] { width: 100%; border-collapse: collapse; font-size: 13px; }\n    .perf-tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n      padding: 7px 10px; text-align: left; font-size: 10px; font-weight: 700;\n      text-transform: uppercase; letter-spacing: .06em; color: #6e7686;\n      border-bottom: 2px solid #e1e4eb; white-space: nowrap;\n    }\n    .perf-tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] { padding: 9px 10px; border-bottom: 1px solid #f6f7fa; color: #0f1320; }\n    .perf-tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] { border-bottom: none; }\n    .perf-tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] { background: #f6f7fa; }\n    .r-cell[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 8px; }\n    .r-av[_ngcontent-%COMP%] { width: 26px; height: 26px; border-radius: 6px; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 11px; flex-shrink: 0; }\n    .grade[_ngcontent-%COMP%] { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 6px; font-size: 11px; font-weight: 800; }\n    .g-a[_ngcontent-%COMP%] { background: rgba(22,163,74,.14); color: #16a34a; }\n    .g-b[_ngcontent-%COMP%] { background: rgba(232,145,42,.14); color: #e8912a; }\n    .g-c[_ngcontent-%COMP%] { background: rgba(220,38,38,.14); color: #dc2626; }\n\n    \n\n    .activity-feed[_ngcontent-%COMP%] { display: flex; flex-direction: column; }\n    .act-item[_ngcontent-%COMP%] { display: flex; gap: 10px; align-items: flex-start; padding: 8px 0; border-bottom: 1px solid #f6f7fa; }\n    .act-item[_ngcontent-%COMP%]:last-child { border-bottom: none; }\n    .act-dot[_ngcontent-%COMP%] { width: 8px; height: 8px; border-radius: 50%; background: #cbd0da; flex-shrink: 0; margin-top: 4px; }\n    .act-dot.dot-skill[_ngcontent-%COMP%] { background: #6b4df0; }\n    .act-dot.dot-today[_ngcontent-%COMP%] { background: #16a34a; }\n    .act-body[_ngcontent-%COMP%] { flex: 1; min-width: 0; }\n    .act-text[_ngcontent-%COMP%] { display: block; font-size: 13px; color: #343a48; line-height: 1.4; }\n    .act-time[_ngcontent-%COMP%] { font-size: 11px; color: #9aa2b2; }\n\n    @media (max-width: 1200px) {\n      .kpi-row[_ngcontent-%COMP%] { grid-template-columns: repeat(3, 1fr); }\n      .row-2col.wide-left[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n      .row-3col[_ngcontent-%COMP%] { grid-template-columns: 1fr 1fr; }\n    }\n    @media (max-width: 860px) {\n      .kpi-row[_ngcontent-%COMP%], .row-2col[_ngcontent-%COMP%], .row-3col[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n    }\n  \n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtJQUNJLFFBQVEsYUFBYSxFQUFFLHNCQUFzQixFQUFFLFNBQVMsRUFBRTs7SUFFMUQsb0JBQW9CO0lBQ3BCLFdBQVcsYUFBYSxFQUFFLHFDQUFxQyxFQUFFLFNBQVMsRUFBRTtJQUM1RTtNQUNFLGdCQUFnQixFQUFFLHlCQUF5QixFQUFFLG1CQUFtQjtNQUNoRSxhQUFhLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSx1QkFBdUI7TUFDaEUsd0NBQXdDO01BQ3hDLDZDQUE2QztJQUMvQztJQUNBLGtCQUFrQiwyQ0FBMkMsRUFBRSwyQkFBMkIsRUFBRTtJQUM1RjtNQUNFLFdBQVcsRUFBRSxZQUFZLEVBQUUsbUJBQW1CO01BQzlDLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSx1QkFBdUI7TUFDM0QsZUFBZSxFQUFFLGNBQWM7SUFDakM7SUFDQSxZQUFZLE9BQU8sRUFBRSxZQUFZLEVBQUU7SUFDbkMsYUFBYSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLHlCQUF5QixFQUFFLHFCQUFxQixFQUFFO0lBQ2xILGFBQWEsZUFBZSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRTtJQUN0RyxZQUFZLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFO0lBQzNFLGFBQWEsZUFBZSxFQUFFLGdCQUFnQixFQUFFO0lBQ2hELFlBQVksY0FBYyxFQUFFO0lBQzVCLFlBQVksY0FBYyxFQUFFO0lBQzVCLFdBQVcsZUFBZSxFQUFFLGNBQWMsRUFBRTs7SUFFNUMsaUJBQWlCO0lBQ2pCO01BQ0UsZ0JBQWdCLEVBQUUseUJBQXlCLEVBQUUsbUJBQW1CO01BQ2hFLGFBQWEsRUFBRSx3Q0FBd0M7SUFDekQ7SUFDQTtNQUNFLGFBQWEsRUFBRSw4QkFBOEIsRUFBRSxtQkFBbUI7TUFDbEUsbUJBQW1CO0lBQ3JCO0lBQ0EsZ0JBQWdCLFNBQVMsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFO0lBQzlFO01BQ0UsZUFBZSxFQUFFLGdCQUFnQixFQUFFLHFCQUFxQixFQUFFLHlCQUF5QjtNQUNuRixjQUFjLEVBQUUsOEJBQThCLEVBQUUsZ0JBQWdCLEVBQUUsbUJBQW1CO0lBQ3ZGOztJQUVBLFlBQVksYUFBYSxFQUFFLFNBQVMsRUFBRTtJQUN0QyxhQUFhLGdDQUFnQyxFQUFFO0lBQy9DLFlBQVksYUFBYSxFQUFFLHFDQUFxQyxFQUFFLFNBQVMsRUFBRTtJQUM3RSxVQUFVOztJQUVWLDBCQUEwQjtJQUMxQixjQUFjLGtCQUFrQixFQUFFO0lBQ2xDLGFBQWEsV0FBVyxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUU7SUFDekQ7TUFDRSxhQUFhLEVBQUUsOEJBQThCO01BQzdDLGVBQWUsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLGNBQWM7SUFDbEU7SUFDQSxjQUFjLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRTtJQUM3RixXQUFXLFdBQVcsRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUscUJBQXFCLEVBQUU7SUFDakYsWUFBWSxpQkFBaUIsRUFBRTs7SUFFL0IsZ0JBQWdCO0lBQ2hCLGNBQWMsYUFBYSxFQUFFLHNCQUFzQixFQUFFO0lBQ3JELGdCQUFnQixhQUFhLEVBQUUsc0JBQXNCLEVBQUUsbUJBQW1CLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRTtJQUNsSCxhQUFhLFlBQVksRUFBRSxhQUFhLEVBQUU7SUFDMUMsZUFBZSxhQUFhLEVBQUUsbUJBQW1CLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSx1QkFBdUIsRUFBRTtJQUNwRyxjQUFjLGtCQUFrQixFQUFFO0lBQ2xDLFVBQVUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRTtJQUM3RCxVQUFVLGVBQWUsRUFBRSxjQUFjLEVBQUUseUJBQXlCLEVBQUUscUJBQXFCLEVBQUUsZUFBZSxFQUFFO0lBQzlHLGlCQUFpQixVQUFVLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFOztJQUVoRSxpQkFBaUI7SUFDakIsZUFBZSxhQUFhLEVBQUUsc0JBQXNCLEVBQUUsU0FBUyxFQUFFO0lBQ2pFLGNBQWMsYUFBYSxFQUFFLG1CQUFtQixFQUFFLFNBQVMsRUFBRTtJQUM3RCxjQUFjLFdBQVcsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRTtJQUM1RSxnQkFBZ0IsT0FBTyxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRTtJQUNsRyxlQUFlLFlBQVksRUFBRSxrQkFBa0IsRUFBRSwrQ0FBK0MsRUFBRTtJQUNsRyxjQUFjLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFOztJQUVqRyxrQkFBa0I7SUFDbEIsZUFBZSxhQUFhLEVBQUUsc0JBQXNCLEVBQUUsU0FBUyxFQUFFO0lBQ2pFLGNBQWMsYUFBYSxFQUFFLG1CQUFtQixFQUFFLFNBQVMsRUFBRTtJQUM3RCxZQUFZLFdBQVcsRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSx1QkFBdUIsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFO0lBQzdNLFVBQVUsT0FBTyxFQUFFLFlBQVksRUFBRTtJQUNqQyxVQUFVLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixFQUFFLGdCQUFnQixFQUFFLHVCQUF1QixFQUFFO0lBQzdJLGVBQWUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLG1CQUFtQixFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRTtJQUN6RyxjQUFjLFlBQVksRUFBRSxvREFBb0QsRUFBRSxtQkFBbUIsRUFBRSx1QkFBdUIsRUFBRTtJQUNoSSxXQUFXLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUU7SUFDOUUsU0FBUyxjQUFjLEVBQUU7SUFDekIsU0FBUyxjQUFjLEVBQUU7SUFDekIsU0FBUyxjQUFjLEVBQUU7O0lBRXpCLHVCQUF1QjtJQUN2QixZQUFZLGFBQWEsRUFBRSxzQkFBc0IsRUFBRSxTQUFTLEVBQUU7SUFDOUQsV0FBVyxhQUFhLEVBQUUsbUJBQW1CLEVBQUUsU0FBUyxFQUFFO0lBQzFELFlBQVksV0FBVyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixFQUFFLGdCQUFnQixFQUFFLHVCQUF1QixFQUFFO0lBQzFJLGFBQWEsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxtQkFBbUIsRUFBRSxrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRTtJQUNwSCxZQUFZLFlBQVksRUFBRSxtQkFBbUIsRUFBRSx1QkFBdUIsRUFBRTtJQUN4RSxVQUFVLG1CQUFtQixFQUFFO0lBQy9CLFVBQVUsbUJBQW1CLEVBQUU7SUFDL0IsY0FBYyxrQkFBa0IsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxrQkFBa0IsRUFBRTtJQUNoSCxZQUFZLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFO0lBQy9GLG1CQUFtQixjQUFjLEVBQUU7O0lBRW5DLGlCQUFpQjtJQUNqQixjQUFjLGFBQWEsRUFBRSxzQkFBc0IsRUFBRSxTQUFTLEVBQUU7SUFDaEUsYUFBYSxhQUFhLEVBQUUsbUJBQW1CLEVBQUUsU0FBUyxFQUFFO0lBQzVELGNBQWMsV0FBVyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFO0lBQzVFLGVBQWUsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRTtJQUNqRyxjQUFjLFlBQVksRUFBRSxvREFBb0QsRUFBRSxtQkFBbUIsRUFBRSx1QkFBdUIsRUFBRTtJQUNoSSxhQUFhLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFOztJQUVoRywwQkFBMEI7SUFDMUIsZ0JBQWdCLGdCQUFnQixFQUFFO0lBQ2xDLFlBQVksV0FBVyxFQUFFLHlCQUF5QixFQUFFLGVBQWUsRUFBRTtJQUNyRTtNQUNFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxnQkFBZ0I7TUFDdEUseUJBQXlCLEVBQUUscUJBQXFCLEVBQUUsY0FBYztNQUNoRSxnQ0FBZ0MsRUFBRSxtQkFBbUI7SUFDdkQ7SUFDQSxlQUFlLGlCQUFpQixFQUFFLGdDQUFnQyxFQUFFLGNBQWMsRUFBRTtJQUNwRixtQ0FBbUMsbUJBQW1CLEVBQUU7SUFDeEQsOEJBQThCLG1CQUFtQixFQUFFO0lBQ25ELFVBQVUsYUFBYSxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRTtJQUN4RCxRQUFRLFdBQVcsRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSx1QkFBdUIsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFO0lBQ3BMLFNBQVMsb0JBQW9CLEVBQUUsbUJBQW1CLEVBQUUsdUJBQXVCLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUU7SUFDL0osT0FBTywrQkFBK0IsRUFBRSxjQUFjLEVBQUU7SUFDeEQsT0FBTyxnQ0FBZ0MsRUFBRSxjQUFjLEVBQUU7SUFDekQsT0FBTywrQkFBK0IsRUFBRSxjQUFjLEVBQUU7O0lBRXhELG1CQUFtQjtJQUNuQixpQkFBaUIsYUFBYSxFQUFFLHNCQUFzQixFQUFFO0lBQ3hELFlBQVksYUFBYSxFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBRSxjQUFjLEVBQUUsZ0NBQWdDLEVBQUU7SUFDakgsdUJBQXVCLG1CQUFtQixFQUFFO0lBQzVDLFdBQVcsVUFBVSxFQUFFLFdBQVcsRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFO0lBQzlHLHFCQUFxQixtQkFBbUIsRUFBRTtJQUMxQyxxQkFBcUIsbUJBQW1CLEVBQUU7SUFDMUMsWUFBWSxPQUFPLEVBQUUsWUFBWSxFQUFFO0lBQ25DLFlBQVksY0FBYyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsZ0JBQWdCLEVBQUU7SUFDL0UsWUFBWSxlQUFlLEVBQUUsY0FBYyxFQUFFOztJQUU3QztNQUNFLFdBQVcscUNBQXFDLEVBQUU7TUFDbEQsc0JBQXNCLDBCQUEwQixFQUFFO01BQ2xELFlBQVksOEJBQThCLEVBQUU7SUFDOUM7SUFDQTtNQUNFLGlDQUFpQywwQkFBMEIsRUFBRTtJQUMvRCIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIC5kYXNoIHsgZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgZ2FwOiAxOHB4OyB9XG5cbiAgICAvKiDDosKUwoDDosKUwoAgS1BJIFNUUklQIMOiwpTCgMOiwpTCgCAqL1xuICAgIC5rcGktcm93IHsgZGlzcGxheTogZ3JpZDsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNSwgMWZyKTsgZ2FwOiAxNHB4OyB9XG4gICAgLmtwaS1jYXJkIHtcbiAgICAgIGJhY2tncm91bmQ6ICNmZmY7IGJvcmRlcjogMXB4IHNvbGlkICNlMWU0ZWI7IGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICBwYWRkaW5nOiAxNnB4OyBkaXNwbGF5OiBmbGV4OyBnYXA6IDEzcHg7IGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgICAgYm94LXNoYWRvdzogMCAxcHggM3B4IHJnYmEoMTcsMjAsNDUsLjA1KTtcbiAgICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMTgwbXMsIHRyYW5zZm9ybSAxODBtcztcbiAgICB9XG4gICAgLmtwaS1jYXJkOmhvdmVyIHsgYm94LXNoYWRvdzogMCA2cHggMjBweCByZ2JhKDEwNyw3NywyNDAsLjEzKTsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xcHgpOyB9XG4gICAgLmtwaS1pY29uIHtcbiAgICAgIHdpZHRoOiA0NHB4OyBoZWlnaHQ6IDQ0cHg7IGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIGZvbnQtc2l6ZTogMTlweDsgZmxleC1zaHJpbms6IDA7XG4gICAgfVxuICAgIC5rcGktYm9keSB7IGZsZXg6IDE7IG1pbi13aWR0aDogMDsgfVxuICAgIC5rcGktbGFiZWwgeyBmb250LXNpemU6IDEwcHg7IGZvbnQtd2VpZ2h0OiA3MDA7IGNvbG9yOiAjNmU3Njg2OyB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOyBsZXR0ZXItc3BhY2luZzogLjA3ZW07IH1cbiAgICAua3BpLXZhbHVlIHsgZm9udC1zaXplOiAzMHB4OyBmb250LXdlaWdodDogODAwOyBjb2xvcjogIzBmMTMyMDsgbGluZS1oZWlnaHQ6IDEuMDU7IG1hcmdpbjogM3B4IDAgNXB4OyB9XG4gICAgLmtwaS1mb290IHsgZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgZ2FwOiA2cHg7IGZsZXgtd3JhcDogd3JhcDsgfVxuICAgIC5rcGktdHJlbmQgeyBmb250LXNpemU6IDExcHg7IGZvbnQtd2VpZ2h0OiA3MDA7IH1cbiAgICAudHJlbmQtdXAgeyBjb2xvcjogIzE2YTM0YTsgfVxuICAgIC50cmVuZC1kbiB7IGNvbG9yOiAjZGMyNjI2OyB9XG4gICAgLmtwaS1zdWIgeyBmb250LXNpemU6IDExcHg7IGNvbG9yOiAjOWFhMmIyOyB9XG5cbiAgICAvKiDDosKUwoDDosKUwoAgTEFZT1VUIMOiwpTCgMOiwpTCgCAqL1xuICAgIC5jYXJkIHtcbiAgICAgIGJhY2tncm91bmQ6ICNmZmY7IGJvcmRlcjogMXB4IHNvbGlkICNlMWU0ZWI7IGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICBwYWRkaW5nOiAyMHB4OyBib3gtc2hhZG93OiAwIDFweCAzcHggcmdiYSgxNywyMCw0NSwuMDUpO1xuICAgIH1cbiAgICAuY2FyZC1oZWFkIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7IGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gICAgfVxuICAgIC5jYXJkLWhlYWQgaDMgeyBtYXJnaW46IDA7IGZvbnQtc2l6ZTogMTRweDsgZm9udC13ZWlnaHQ6IDcwMDsgY29sb3I6ICMwZjEzMjA7IH1cbiAgICAudGFnIHtcbiAgICAgIGZvbnQtc2l6ZTogMTBweDsgZm9udC13ZWlnaHQ6IDcwMDsgbGV0dGVyLXNwYWNpbmc6IC4wNWVtOyB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgY29sb3I6ICM1QzVDOTk7IGJhY2tncm91bmQ6IHJnYmEoOTIsOTIsMTUzLC4xKTsgcGFkZGluZzogM3B4IDhweDsgYm9yZGVyLXJhZGl1czogOTlweDtcbiAgICB9XG5cbiAgICAucm93LTJjb2wgeyBkaXNwbGF5OiBncmlkOyBnYXA6IDE0cHg7IH1cbiAgICAud2lkZS1sZWZ0IHsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMjYwcHg7IH1cbiAgICAucm93LTNjb2wgeyBkaXNwbGF5OiBncmlkOyBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpOyBnYXA6IDE0cHg7IH1cbiAgICAuYm90dG9tIHsgfVxuXG4gICAgLyogw6LClMKAw6LClMKAIFNWRyBUUkVORCBDSEFSVCDDosKUwoDDosKUwoAgKi9cbiAgICAuY2hhcnQtd3JhcCB7IHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxuICAgIC50cmVuZC1zdmcgeyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxNjBweDsgZGlzcGxheTogYmxvY2s7IH1cbiAgICAuY2hhcnQteC1sYWJlbHMge1xuICAgICAgZGlzcGxheTogZmxleDsganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgZm9udC1zaXplOiAxMXB4OyBjb2xvcjogIzlhYTJiMjsgbWFyZ2luLXRvcDogNnB4OyBwYWRkaW5nOiAwIDJweDtcbiAgICB9XG4gICAgLmxlZ2VuZC1yb3cgeyBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBnYXA6IDVweDsgZm9udC1zaXplOiAxMnB4OyBjb2xvcjogIzZlNzY4NjsgfVxuICAgIC5sZWctZG90IHsgd2lkdGg6IDEwcHg7IGhlaWdodDogMTBweDsgYm9yZGVyLXJhZGl1czogNTAlOyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cbiAgICAubGVnLXRleHQgeyBtYXJnaW4tcmlnaHQ6IDJweDsgfVxuXG4gICAgLyogw6LClMKAw6LClMKAIERPTlVUIMOiwpTCgMOiwpTCgCAqL1xuICAgIC5kb251dC1jYXJkIHsgZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgfVxuICAgIC5kb251dC1jZW50ZXIgeyBkaXNwbGF5OiBmbGV4OyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBhbGlnbi1pdGVtczogY2VudGVyOyBnYXA6IDE0cHg7IGZsZXg6IDE7IHBhZGRpbmctdG9wOiA2cHg7IH1cbiAgICAuZG9udXQtc3ZnIHsgd2lkdGg6IDE1MHB4OyBoZWlnaHQ6IDE1MHB4OyB9XG4gICAgLmRvbnV0LXN0YXRzIHsgZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgZ2FwOiAxMnB4OyB3aWR0aDogMTAwJTsganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IH1cbiAgICAuZG9udXQtc3RhdCB7IHRleHQtYWxpZ246IGNlbnRlcjsgfVxuICAgIC5kcy12YWwgeyBmb250LXNpemU6IDIwcHg7IGZvbnQtd2VpZ2h0OiA4MDA7IGNvbG9yOiAjMGYxMzIwOyB9XG4gICAgLmRzLWxibCB7IGZvbnQtc2l6ZTogMTBweDsgY29sb3I6ICM5YWEyYjI7IHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7IGxldHRlci1zcGFjaW5nOiAuMDVlbTsgbWFyZ2luLXRvcDogMnB4OyB9XG4gICAgLmRvbnV0LWRpdmlkZXIgeyB3aWR0aDogMXB4OyBoZWlnaHQ6IDMycHg7IGJhY2tncm91bmQ6ICNlMWU0ZWI7IH1cblxuICAgIC8qIMOiwpTCgMOiwpTCgCBGVU5ORUwgw6LClMKAw6LClMKAICovXG4gICAgLmZ1bm5lbC13cmFwIHsgZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgZ2FwOiAxMHB4OyB9XG4gICAgLmZ1bm5lbC1yb3cgeyBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBnYXA6IDEwcHg7IH1cbiAgICAuZnVubmVsLWxibCB7IHdpZHRoOiA4MHB4OyBmb250LXNpemU6IDEycHg7IGNvbG9yOiAjNGI1MjYyOyBmbGV4LXNocmluazogMDsgfVxuICAgIC5mdW5uZWwtdHJhY2sgeyBmbGV4OiAxOyBoZWlnaHQ6IDI2cHg7IGJhY2tncm91bmQ6ICNmNmY3ZmE7IGJvcmRlci1yYWRpdXM6IDZweDsgb3ZlcmZsb3c6IGhpZGRlbjsgfVxuICAgIC5mdW5uZWwtZmlsbCB7IGhlaWdodDogMTAwJTsgYm9yZGVyLXJhZGl1czogNnB4OyB0cmFuc2l0aW9uOiB3aWR0aCA5MDBtcyBjdWJpYy1iZXppZXIoLjQsMCwuMiwxKTsgfVxuICAgIC5mdW5uZWwtY250IHsgd2lkdGg6IDI4cHg7IHRleHQtYWxpZ246IHJpZ2h0OyBmb250LXNpemU6IDEzcHg7IGZvbnQtd2VpZ2h0OiA3MDA7IGNvbG9yOiAjMGYxMzIwOyB9XG5cbiAgICAvKiDDosKUwoDDosKUwoAgVkVORE9SUyDDosKUwoDDosKUwoAgKi9cbiAgICAudmVuZG9yLWxpc3QgeyBkaXNwbGF5OiBmbGV4OyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBnYXA6IDEzcHg7IH1cbiAgICAudmVuZG9yLXJvdyB7IGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGdhcDogMTBweDsgfVxuICAgIC52LWF2YXRhciB7IHdpZHRoOiAzNHB4OyBoZWlnaHQ6IDM0cHg7IGJvcmRlci1yYWRpdXM6IDhweDsgYmFja2dyb3VuZDogIzVDNUM5OTsgY29sb3I6ICNmZmY7IGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGp1c3RpZnktY29udGVudDogY2VudGVyOyBmb250LXdlaWdodDogODAwOyBmb250LXNpemU6IDE0cHg7IGZsZXgtc2hyaW5rOiAwOyB9XG4gICAgLnYtaW5mbyB7IGZsZXg6IDE7IG1pbi13aWR0aDogMDsgfVxuICAgIC52LW5hbWUgeyBmb250LXNpemU6IDEzcHg7IGZvbnQtd2VpZ2h0OiA2MDA7IGNvbG9yOiAjMGYxMzIwOyBkaXNwbGF5OiBibG9jazsgd2hpdGUtc3BhY2U6IG5vd3JhcDsgb3ZlcmZsb3c6IGhpZGRlbjsgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7IH1cbiAgICAudi1iYXItdHJhY2sgeyBoZWlnaHQ6IDVweDsgYmFja2dyb3VuZDogI2VlZjBmNDsgYm9yZGVyLXJhZGl1czogOTlweDsgbWFyZ2luLXRvcDogNXB4OyBvdmVyZmxvdzogaGlkZGVuOyB9XG4gICAgLnYtYmFyLWZpbGwgeyBoZWlnaHQ6IDEwMCU7IGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzZiNGRmMCwgIzNiYmRlYSk7IGJvcmRlci1yYWRpdXM6IDk5cHg7IHRyYW5zaXRpb246IHdpZHRoIDkwMG1zOyB9XG4gICAgLnYtc2NvcmUgeyBmb250LXNpemU6IDEycHg7IGZvbnQtd2VpZ2h0OiA4MDA7IHdpZHRoOiA0MHB4OyB0ZXh0LWFsaWduOiByaWdodDsgfVxuICAgIC5zYy1oaSB7IGNvbG9yOiAjMTZhMzRhOyB9XG4gICAgLnNjLW1kIHsgY29sb3I6ICNlODkxMmE7IH1cbiAgICAuc2MtbG8geyBjb2xvcjogI2RjMjYyNjsgfVxuXG4gICAgLyogw6LClMKAw6LClMKAIFRJTUUgVE8gRklMTCDDosKUwoDDosKUwoAgKi9cbiAgICAudHRmLWxpc3QgeyBkaXNwbGF5OiBmbGV4OyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBnYXA6IDEycHg7IH1cbiAgICAudHRmLXJvdyB7IGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGdhcDogMTBweDsgfVxuICAgIC50dGYtcm9sZSB7IHdpZHRoOiA5NXB4OyBmb250LXNpemU6IDEycHg7IGNvbG9yOiAjNGI1MjYyOyBmbGV4LXNocmluazogMDsgd2hpdGUtc3BhY2U6IG5vd3JhcDsgb3ZlcmZsb3c6IGhpZGRlbjsgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7IH1cbiAgICAudHRmLXRyYWNrIHsgZmxleDogMTsgaGVpZ2h0OiA4cHg7IGJhY2tncm91bmQ6ICNmNmY3ZmE7IGJvcmRlci1yYWRpdXM6IDk5cHg7IHBvc2l0aW9uOiByZWxhdGl2ZTsgb3ZlcmZsb3c6IHZpc2libGU7IH1cbiAgICAudHRmLWZpbGwgeyBoZWlnaHQ6IDEwMCU7IGJvcmRlci1yYWRpdXM6IDk5cHg7IHRyYW5zaXRpb246IHdpZHRoIDkwMG1zOyB9XG4gICAgLnR0Zi1vayB7IGJhY2tncm91bmQ6ICMxNmEzNGE7IH1cbiAgICAudHRmLW92IHsgYmFja2dyb3VuZDogI2RjMjYyNjsgfVxuICAgIC50dGYtbWFya2VyIHsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IC0zcHg7IHdpZHRoOiAycHg7IGhlaWdodDogMTRweDsgYmFja2dyb3VuZDogIzM0M2E0ODsgYm9yZGVyLXJhZGl1czogMXB4OyB9XG4gICAgLnR0Zi1kYXlzIHsgZm9udC1zaXplOiAxMnB4OyBmb250LXdlaWdodDogNzAwOyB3aWR0aDogMzJweDsgdGV4dC1hbGlnbjogcmlnaHQ7IGNvbG9yOiAjMGYxMzIwOyB9XG4gICAgLnR0Zi1kYXlzLnR0Zi1vdiB7IGNvbG9yOiAjZGMyNjI2OyB9XG5cbiAgICAvKiDDosKUwoDDosKUwoAgU0tJTExTIMOiwpTCgMOiwpTCgCAqL1xuICAgIC5za2lsbC1saXN0IHsgZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgZ2FwOiAxMXB4OyB9XG4gICAgLnNraWxsLXJvdyB7IGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGdhcDogMTBweDsgfVxuICAgIC5za2lsbC1uYW1lIHsgd2lkdGg6IDgwcHg7IGZvbnQtc2l6ZTogMTJweDsgY29sb3I6ICM0YjUyNjI7IGZsZXgtc2hyaW5rOiAwOyB9XG4gICAgLnNraWxsLXRyYWNrIHsgZmxleDogMTsgaGVpZ2h0OiA4cHg7IGJhY2tncm91bmQ6ICNmNmY3ZmE7IGJvcmRlci1yYWRpdXM6IDk5cHg7IG92ZXJmbG93OiBoaWRkZW47IH1cbiAgICAuc2tpbGwtZmlsbCB7IGhlaWdodDogMTAwJTsgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjNUM1Qzk5LCAjQ0NDQ0ZGKTsgYm9yZGVyLXJhZGl1czogOTlweDsgdHJhbnNpdGlvbjogd2lkdGggOTAwbXM7IH1cbiAgICAuc2tpbGwtY250IHsgZm9udC1zaXplOiAxMnB4OyBmb250LXdlaWdodDogNzAwOyBjb2xvcjogIzBmMTMyMDsgd2lkdGg6IDI0cHg7IHRleHQtYWxpZ246IHJpZ2h0OyB9XG5cbiAgICAvKiDDosKUwoDDosKUwoAgUkVDUlVJVEVSIFRBQkxFIMOiwpTCgMOiwpTCgCAqL1xuICAgIC50YWJsZS1zY3JvbGwgeyBvdmVyZmxvdy14OiBhdXRvOyB9XG4gICAgLnBlcmYtdGJsIHsgd2lkdGg6IDEwMCU7IGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7IGZvbnQtc2l6ZTogMTNweDsgfVxuICAgIC5wZXJmLXRibCB0aCB7XG4gICAgICBwYWRkaW5nOiA3cHggMTBweDsgdGV4dC1hbGlnbjogbGVmdDsgZm9udC1zaXplOiAxMHB4OyBmb250LXdlaWdodDogNzAwO1xuICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsgbGV0dGVyLXNwYWNpbmc6IC4wNmVtOyBjb2xvcjogIzZlNzY4NjtcbiAgICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjZTFlNGViOyB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIH1cbiAgICAucGVyZi10YmwgdGQgeyBwYWRkaW5nOiA5cHggMTBweDsgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmNmY3ZmE7IGNvbG9yOiAjMGYxMzIwOyB9XG4gICAgLnBlcmYtdGJsIHRib2R5IHRyOmxhc3QtY2hpbGQgdGQgeyBib3JkZXItYm90dG9tOiBub25lOyB9XG4gICAgLnBlcmYtdGJsIHRib2R5IHRyOmhvdmVyIHRkIHsgYmFja2dyb3VuZDogI2Y2ZjdmYTsgfVxuICAgIC5yLWNlbGwgeyBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBnYXA6IDhweDsgfVxuICAgIC5yLWF2IHsgd2lkdGg6IDI2cHg7IGhlaWdodDogMjZweDsgYm9yZGVyLXJhZGl1czogNnB4OyBjb2xvcjogI2ZmZjsgZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjsganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IGZvbnQtd2VpZ2h0OiA4MDA7IGZvbnQtc2l6ZTogMTFweDsgZmxleC1zaHJpbms6IDA7IH1cbiAgICAuZ3JhZGUgeyBkaXNwbGF5OiBpbmxpbmUtZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjsganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IHdpZHRoOiAyNHB4OyBoZWlnaHQ6IDI0cHg7IGJvcmRlci1yYWRpdXM6IDZweDsgZm9udC1zaXplOiAxMXB4OyBmb250LXdlaWdodDogODAwOyB9XG4gICAgLmctYSB7IGJhY2tncm91bmQ6IHJnYmEoMjIsMTYzLDc0LC4xNCk7IGNvbG9yOiAjMTZhMzRhOyB9XG4gICAgLmctYiB7IGJhY2tncm91bmQ6IHJnYmEoMjMyLDE0NSw0MiwuMTQpOyBjb2xvcjogI2U4OTEyYTsgfVxuICAgIC5nLWMgeyBiYWNrZ3JvdW5kOiByZ2JhKDIyMCwzOCwzOCwuMTQpOyBjb2xvcjogI2RjMjYyNjsgfVxuXG4gICAgLyogw6LClMKAw6LClMKAIEFDVElWSVRZIMOiwpTCgMOiwpTCgCAqL1xuICAgIC5hY3Rpdml0eS1mZWVkIHsgZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgfVxuICAgIC5hY3QtaXRlbSB7IGRpc3BsYXk6IGZsZXg7IGdhcDogMTBweDsgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7IHBhZGRpbmc6IDhweCAwOyBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Y2ZjdmYTsgfVxuICAgIC5hY3QtaXRlbTpsYXN0LWNoaWxkIHsgYm9yZGVyLWJvdHRvbTogbm9uZTsgfVxuICAgIC5hY3QtZG90IHsgd2lkdGg6IDhweDsgaGVpZ2h0OiA4cHg7IGJvcmRlci1yYWRpdXM6IDUwJTsgYmFja2dyb3VuZDogI2NiZDBkYTsgZmxleC1zaHJpbms6IDA7IG1hcmdpbi10b3A6IDRweDsgfVxuICAgIC5hY3QtZG90LmRvdC1za2lsbCB7IGJhY2tncm91bmQ6ICM2YjRkZjA7IH1cbiAgICAuYWN0LWRvdC5kb3QtdG9kYXkgeyBiYWNrZ3JvdW5kOiAjMTZhMzRhOyB9XG4gICAgLmFjdC1ib2R5IHsgZmxleDogMTsgbWluLXdpZHRoOiAwOyB9XG4gICAgLmFjdC10ZXh0IHsgZGlzcGxheTogYmxvY2s7IGZvbnQtc2l6ZTogMTNweDsgY29sb3I6ICMzNDNhNDg7IGxpbmUtaGVpZ2h0OiAxLjQ7IH1cbiAgICAuYWN0LXRpbWUgeyBmb250LXNpemU6IDExcHg7IGNvbG9yOiAjOWFhMmIyOyB9XG5cbiAgICBAbWVkaWEgKG1heC13aWR0aDogMTIwMHB4KSB7XG4gICAgICAua3BpLXJvdyB7IGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7IH1cbiAgICAgIC5yb3ctMmNvbC53aWRlLWxlZnQgeyBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjsgfVxuICAgICAgLnJvdy0zY29sIHsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyOyB9XG4gICAgfVxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA4NjBweCkge1xuICAgICAgLmtwaS1yb3csIC5yb3ctMmNvbCwgLnJvdy0zY29sIHsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7IH1cbiAgICB9XG4gICJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ }),

/***/ 3698:
/*!********************************************!*\
  !*** ./src/app/http-config.interceptor.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HttpConfigInterceptor: () => (/* binding */ HttpConfigInterceptor)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 4876);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 7919);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 2611);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 3255);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 1318);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/auth.service */ 4796);




class HttpConfigInterceptor {
  constructor(authService) {
    this.authService = authService;
  }
  intercept(request, next) {
    // Add auth token if available
    const token = this.authService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    // Add Content-Type if not already set
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
    }
    return next.handle(request).pipe(
    // Retry with exponential backoff for 5xx errors and timeouts
    (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.retryWhen)(errors => errors.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.mergeMap)((error, index) => {
      // Only retry on 5xx errors or timeouts (status 0)
      if (error.status >= 500 && error.status < 600 || error.status === 0) {
        if (index < 3) {
          const delayMs = Math.pow(2, index) * 1000; // 1s, 2s, 4s
          console.warn(`Retrying request (attempt ${index + 1}): ${request.url}`, {
            delayMs
          });
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.timer)(delayMs);
        }
      }
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.throwError)(() => error);
    }))), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
      // Handle 401 - redirect to login
      if (error.status === 401) {
        this.authService.logout();
      }
      // Log error
      console.error('HTTP Error:', {
        status: error.status,
        message: error.message,
        url: error.url
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.throwError)(() => error);
    }));
  }
  static {
    this.ɵfac = function HttpConfigInterceptor_Factory(t) {
      return new (t || HttpConfigInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
      token: HttpConfigInterceptor,
      factory: HttpConfigInterceptor.ɵfac
    });
  }
}

/***/ }),

/***/ 5156:
/*!**********************************************************!*\
  !*** ./src/app/import-center/import-center.component.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImportCenterComponent: () => (/* binding */ ImportCenterComponent)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);





function ImportCenterComponent_div_19_div_16_option_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "option", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const f_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", f_r3.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](f_r3.label);
  }
}
function ImportCenterComponent_div_19_div_16_div_12_span_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Click to browse or drag & drop");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, ".csv or .xlsx accepted");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
function ImportCenterComponent_div_19_div_16_div_12_span_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.selectedFile.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", (ctx_r1.selectedFile.size / 1024).toFixed(1), " KB \u2014 click to change");
  }
}
function ImportCenterComponent_div_19_div_16_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 19)(1, "label", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Select File to Import ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ImportCenterComponent_div_19_div_16_div_12_Template_div_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const fileInput_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](7);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](fileInput_r5.click());
    })("dragover", function ImportCenterComponent_div_19_div_16_div_12_Template_div_dragover_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event.preventDefault());
    })("drop", function ImportCenterComponent_div_19_div_16_div_12_Template_div_drop_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.onFileDrop($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "input", 33, 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function ImportCenterComponent_div_19_div_16_div_12_Template_input_change_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.onFileSelect($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](10, ImportCenterComponent_div_19_div_16_div_12_span_10_Template, 5, 0, "span", 35)(11, ImportCenterComponent_div_19_div_16_div_12_span_11_Template, 5, 2, "span", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("has-file", ctx_r1.selectedFile);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.selectedFile ? "insert_drive_file" : "cloud_upload");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r1.selectedFile);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.selectedFile);
  }
}
function ImportCenterComponent_div_19_div_16_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 39)(1, "div", 40)(2, "input", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function ImportCenterComponent_div_19_div_16_div_13_Template_input_ngModelChange_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r1.hasHeader, $event) || (ctx_r1.hasHeader = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "label", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "First row contains column headers");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 43)(6, "label", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Delimiter");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "select", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function ImportCenterComponent_div_19_div_16_div_13_Template_select_ngModelChange_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r1.delimiter, $event) || (ctx_r1.delimiter = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "option", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Comma ,");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "option", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "Semicolon ;");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "option", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "Tab");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "div", 43)(16, "label", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "Schedule Import");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "select", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function ImportCenterComponent_div_19_div_16_div_13_Template_select_ngModelChange_18_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r1.scheduleMode, $event) || (ctx_r1.scheduleMode = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "option", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](20, "Immediate");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "option", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22, "Schedule for later");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.hasHeader);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.delimiter);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.scheduleMode);
  }
}
function ImportCenterComponent_div_19_div_16_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 51)(1, "span", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "download");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, " Are you a first timer? ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "a", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ImportCenterComponent_div_19_div_16_div_14_Template_a_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r7);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.downloadTemplate());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "VIEW & DOWNLOAD SAMPLE");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
function ImportCenterComponent_div_19_div_16_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 54)(1, "span", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "info");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r1.featureNote, " ");
  }
}
function ImportCenterComponent_div_19_div_16_span_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Proceed to Field Mapping \u203A");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function ImportCenterComponent_div_19_div_16_span_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Parsing file\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function ImportCenterComponent_div_19_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 17)(1, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Initiate Import");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 19)(4, "label", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Select Feature ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "select", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function ImportCenterComponent_div_19_div_16_Template_select_ngModelChange_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r1.selectedFeature, $event) || (ctx_r1.selectedFeature = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function ImportCenterComponent_div_19_div_16_Template_select_change_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.onFeatureChange());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "option", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "\u2014 Choose a module \u2014");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, ImportCenterComponent_div_19_div_16_option_11_Template, 2, 2, "option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, ImportCenterComponent_div_19_div_16_div_12_Template, 12, 5, "div", 25)(13, ImportCenterComponent_div_19_div_16_div_13_Template, 23, 3, "div", 26)(14, ImportCenterComponent_div_19_div_16_div_14_Template, 6, 0, "div", 27)(15, ImportCenterComponent_div_19_div_16_div_15_Template, 4, 1, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "div", 29)(17, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ImportCenterComponent_div_19_div_16_Template_button_click_17_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.resetWizard());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "Close");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ImportCenterComponent_div_19_div_16_Template_button_click_19_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.validate());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](20, ImportCenterComponent_div_19_div_16_span_20_Template, 2, 0, "span", 11)(21, ImportCenterComponent_div_19_div_16_span_21_Template, 2, 0, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.selectedFeature);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.features);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.selectedFeature);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.selectedFeature);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.selectedFeature);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.selectedFeature);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", !ctx_r1.selectedFeature || !ctx_r1.selectedFile || ctx_r1.validating);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r1.validating);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.validating);
  }
}
function ImportCenterComponent_div_19_div_17_div_5_th_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const col_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](col_r9);
  }
}
function ImportCenterComponent_div_19_div_17_div_5_tr_9_td_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const cell_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](cell_r10);
  }
}
function ImportCenterComponent_div_19_div_17_div_5_tr_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, ImportCenterComponent_div_19_div_17_div_5_tr_9_td_1_Template, 2, 1, "td", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", row_r11);
  }
}
function ImportCenterComponent_div_19_div_17_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 61)(1, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Preview (first 5 rows)");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 63)(4, "table", 64)(5, "thead")(6, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, ImportCenterComponent_div_19_div_17_div_5_th_7_Template, 2, 1, "th", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, ImportCenterComponent_div_19_div_17_div_5_tr_9_Template, 2, 1, "tr", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.detectedColumns);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.previewRows);
  }
}
function ImportCenterComponent_div_19_div_17_div_16_option_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "option", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const f_r14 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", f_r14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](f_r14);
  }
}
function ImportCenterComponent_div_19_div_17_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 66)(1, "span", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "\u2192");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "select", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function ImportCenterComponent_div_19_div_17_div_16_Template_select_ngModelChange_5_listener($event) {
      const m_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r12).$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](m_r13.systemField, $event) || (m_r13.systemField = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "option", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "\u2014 Ignore \u2014");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, ImportCenterComponent_div_19_div_17_div_16_option_8_Template, 2, 2, "option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "input", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function ImportCenterComponent_div_19_div_17_div_16_Template_input_ngModelChange_9_listener($event) {
      const m_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r12).$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](m_r13.skip, $event) || (m_r13.skip = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const m_r13 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](m_r13.csvColumn);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", m_r13.systemField);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.systemFields);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", m_r13.skip);
  }
}
function ImportCenterComponent_div_19_div_17_span_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Import Now");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function ImportCenterComponent_div_19_div_17_span_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Importing\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function ImportCenterComponent_div_19_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 17)(1, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Map Your Columns \u2192 System Fields");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "p", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, ImportCenterComponent_div_19_div_17_div_5_Template, 10, 2, "div", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 58)(7, "div", 59)(8, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Your CSV Column");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "\u2192");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "System Field");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Skip?");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](16, ImportCenterComponent_div_19_div_17_div_16_Template, 10, 4, "div", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "div", 29)(18, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ImportCenterComponent_div_19_div_17_Template_button_click_18_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r8);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.step = 1);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, "\u2039 Back");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ImportCenterComponent_div_19_div_17_Template_button_click_20_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r8);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.autoMap());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21, "Auto-Map");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ImportCenterComponent_div_19_div_17_Template_button_click_22_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r8);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.executeImport());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](23, ImportCenterComponent_div_19_div_17_span_23_Template, 2, 0, "span", 11)(24, ImportCenterComponent_div_19_div_17_span_24_Template, 2, 0, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("", ctx_r1.detectedColumns.length, " column(s) detected \u00B7 ", ctx_r1.previewRows.length, " data row(s)");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.previewRows.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.mappings);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx_r1.importing);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r1.importing);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.importing);
  }
}
function ImportCenterComponent_div_19_div_18_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 79)(1, "span", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "\u26A0\uFE0F");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div")(4, "div", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Warnings");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.importResult == null ? null : ctx_r1.importResult.warnings == null ? null : ctx_r1.importResult.warnings.length);
  }
}
function ImportCenterComponent_div_19_div_18_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 80)(1, "span", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "\u274C");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div")(4, "div", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Errors");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.importResult == null ? null : ctx_r1.importResult.errors == null ? null : ctx_r1.importResult.errors.length);
  }
}
function ImportCenterComponent_div_19_div_18_div_14_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const w_r16 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"](" Row ", w_r16.row, ": ", w_r16.message, " ");
  }
}
function ImportCenterComponent_div_19_div_18_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 81)(1, "div", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Warnings");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, ImportCenterComponent_div_19_div_18_div_14_div_3_Template, 2, 2, "div", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.importResult.warnings);
  }
}
function ImportCenterComponent_div_19_div_18_div_15_div_3_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const e_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" \u2014 ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind3"](2, 1, e_r17.rawData, 0, 80), "");
  }
}
function ImportCenterComponent_div_19_div_18_div_15_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, ImportCenterComponent_div_19_div_18_div_15_div_3_span_2_Template, 3, 5, "span", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const e_r17 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"](" Row ", e_r17.row, ": ", e_r17.message, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", e_r17.rawData);
  }
}
function ImportCenterComponent_div_19_div_18_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 81)(1, "div", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Errors");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, ImportCenterComponent_div_19_div_18_div_15_div_3_Template, 3, 3, "div", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.importResult.errors);
  }
}
function ImportCenterComponent_div_19_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 17)(1, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Import Complete");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 70)(4, "div", 71)(5, "span", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "\u2705");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div")(8, "div", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Rows imported");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, ImportCenterComponent_div_19_div_18_div_12_Template, 8, 1, "div", 75)(13, ImportCenterComponent_div_19_div_18_div_13_Template, 8, 1, "div", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](14, ImportCenterComponent_div_19_div_18_div_14_Template, 4, 1, "div", 77)(15, ImportCenterComponent_div_19_div_18_div_15_Template, 4, 1, "div", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "div", 29)(17, "button", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ImportCenterComponent_div_19_div_18_Template_button_click_17_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r15);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.resetWizard());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "Import Another File");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ImportCenterComponent_div_19_div_18_Template_button_click_19_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r15);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      ctx_r1.activeTab = "history";
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.loadHistory());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](20, "View History");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.importResult == null ? null : ctx_r1.importResult.imported);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.importResult == null ? null : ctx_r1.importResult.warnings == null ? null : ctx_r1.importResult.warnings.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.importResult == null ? null : ctx_r1.importResult.errors == null ? null : ctx_r1.importResult.errors.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.importResult == null ? null : ctx_r1.importResult.warnings == null ? null : ctx_r1.importResult.warnings.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.importResult == null ? null : ctx_r1.importResult.errors == null ? null : ctx_r1.importResult.errors.length);
  }
}
function ImportCenterComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div")(1, "div", 13)(2, "div", 14)(3, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "1");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, " Configure ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 14)(8, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, " Map Fields ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](11, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 14)(13, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, " Results ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](16, ImportCenterComponent_div_19_div_16_Template, 22, 9, "div", 12)(17, ImportCenterComponent_div_19_div_17_Template, 25, 7, "div", 12)(18, ImportCenterComponent_div_19_div_18_Template, 21, 5, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("active", ctx_r1.step === 1)("done", ctx_r1.step > 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("active", ctx_r1.step === 2)("done", ctx_r1.step > 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("active", ctx_r1.step === 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.step === 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.step === 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.step === 3);
  }
}
function ImportCenterComponent_div_20_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Loading history\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function ImportCenterComponent_div_20_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "No imports recorded yet.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function ImportCenterComponent_div_20_div_5_tr_22_button_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ImportCenterComponent_div_20_div_5_tr_22_button_20_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r18);
      const h_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.downloadErrorReport(h_r19.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Error Report");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function ImportCenterComponent_div_20_div_5_tr_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "tr")(1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "td", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "td")(6, "span", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "td", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "td", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "td", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](18, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](20, ImportCenterComponent_div_20_div_5_tr_22_button_20_Template, 2, 0, "button", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const h_r19 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](h_r19.feature);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](h_r19.fileName);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("data-status", h_r19.status.toLowerCase());
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](h_r19.status);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](h_r19.totalRows);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](h_r19.importedRows);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](h_r19.warningRows);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](h_r19.errorRows);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](18, 10, h_r19.importedAt, "dd MMM yyyy HH:mm"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", h_r19.hasErrors);
  }
}
function ImportCenterComponent_div_20_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 63)(1, "table", 94)(2, "thead")(3, "tr")(4, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Feature");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "File Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Status");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Total");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Imported");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Warnings");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "Errors");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, "Date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](20, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](22, ImportCenterComponent_div_20_div_5_tr_22_Template, 21, 13, "tr", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.history);
  }
}
function ImportCenterComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 17)(1, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Import History");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, ImportCenterComponent_div_20_div_3_Template, 2, 0, "div", 89)(4, ImportCenterComponent_div_20_div_4_Template, 2, 0, "div", 90)(5, ImportCenterComponent_div_20_div_5_Template, 23, 1, "div", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.historyLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r1.historyLoading && !ctx_r1.history.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r1.historyLoading && ctx_r1.history.length);
  }
}
const FEATURES = [{
  key: 'Requisitions',
  label: 'Requisitions'
}, {
  key: 'Candidates',
  label: 'Candidates'
}, {
  key: 'Vendors',
  label: 'Vendors'
}, {
  key: 'BudgetFiscalYears',
  label: 'Budget — Fiscal Years'
}, {
  key: 'BudgetAllocations',
  label: 'Budget — Department Allocations'
}, {
  key: 'BudgetLineItems',
  label: 'Budget — Line Items'
}, {
  key: 'BudgetActuals',
  label: 'Budget — Actual Spend'
}, {
  key: 'RecruiterPerformances',
  label: 'Recruiter Performance'
}, {
  key: 'TalentPool',
  label: 'Talent Pool'
}, {
  key: 'CandidateSources',
  label: 'Candidate Sources'
}, {
  key: 'InterviewSchedule',
  label: 'Interview Schedule'
}, {
  key: 'InternalJobPostings',
  label: 'Internal Job Postings'
}];
const FEATURE_NOTES = {
  Requisitions: 'Dates must be dd-mm-yyyy. Priority: Low/Medium/High/Critical. Headcount is an integer. Requisition IDs must be unique.',
  Candidates: 'Skills are semicolon-separated. Stage must match: Submitted/Screening/L1/L2/L3/HR/Selected/Rejected/Joined/Dropped. Vendor Name will be resolved to Vendor ID.',
  Vendors: 'Category: General/Recruiter/Staffing/Executive. Status: Active/Inactive/Blacklisted/Suspended. Existing vendors are updated by name.',
  BudgetFiscalYears: 'FiscalYearLabel is used as the key in all other budget sheets — it must be unique and match exactly.',
  BudgetAllocations: 'FiscalYearLabel must match an existing Fiscal Year. Quarter: Q1/Q2/Q3/Q4. Category: Permanent/Contract/Intern/Replacement/NewRole.',
  BudgetLineItems: 'Department Name + Quarter + Fiscal Year Label resolves to parent allocation. LineItemType must match exactly.',
  BudgetActuals: 'SpendDate must be dd-mm-yyyy. IsApproved Yes = included in TotalSpent KPI. Vendor Name resolved to Vendor ID.',
  RecruiterPerformances: 'Month is numeric 1–12. Employee ID must match an existing user in the system.',
  TalentPool: 'Candidate Email must match an existing Candidate record. NurtureStatus: Active/Passive/DoNotContact.',
  CandidateSources: 'Source must match exactly: LinkedIn/Indeed/Referral/Portal/Agency/Other.',
  InterviewSchedule: 'Multiple recruiters for panel — separate Employee IDs by semicolons. Meeting Link required for Video type.',
  InternalJobPostings: 'ShowSalary No = salary bands hidden from employees. RequisitionID links posting to an approved requisition.'
};
class ImportCenterComponent {
  constructor(http) {
    this.http = http;
    this.features = FEATURES;
    this.featureNotes = FEATURE_NOTES;
    this.activeTab = 'import';
    this.step = 1;
    // Step 1
    this.selectedFeature = '';
    this.selectedFile = null;
    this.hasHeader = true;
    this.delimiter = ',';
    this.scheduleMode = 'immediate';
    this.featureNote = '';
    // Step 2
    this.detectedColumns = [];
    this.previewRows = [];
    this.mappings = [];
    this.systemFields = [];
    this.fileToken = '';
    this.validating = false;
    // Step 3
    this.importing = false;
    this.importResult = null;
    // History
    this.history = [];
    this.historyLoading = false;
    this.api = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl;
  }
  ngOnInit() {}
  onFeatureChange() {
    this.featureNote = this.featureNotes[this.selectedFeature] ?? '';
    this.selectedFile = null;
  }
  onFileSelect(event) {
    const input = event.target;
    if (input.files?.[0]) this.selectedFile = input.files[0];
  }
  onFileDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (file) this.selectedFile = file;
  }
  downloadTemplate() {
    if (!this.selectedFeature) return;
    const url = `${this.api}/api/import/template/${this.selectedFeature}`;
    this.http.get(url, {
      responseType: 'blob'
    }).subscribe(blob => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${this.selectedFeature.toLowerCase()}_template.csv`;
      a.click();
      URL.revokeObjectURL(a.href);
    });
  }
  validate() {
    if (!this.selectedFile || !this.selectedFeature) return;
    this.validating = true;
    const fd = new FormData();
    fd.append('file', this.selectedFile);
    fd.append('feature', this.selectedFeature);
    fd.append('hasHeader', String(this.hasHeader));
    fd.append('delimiter', this.delimiter);
    this.http.post(`${this.api}/api/import/validate`, fd).subscribe({
      next: res => {
        this.validating = false;
        this.detectedColumns = res.columns ?? [];
        this.previewRows = (res.preview ?? []).map(r => r.map(String));
        this.fileToken = res.fileToken ?? '';
        // Build initial mappings — auto-map where column name matches system field
        const sysFields = this.getSystemFields(this.selectedFeature);
        this.systemFields = sysFields;
        this.mappings = this.detectedColumns.map(col => {
          const matched = sysFields.find(f => f.toLowerCase() === col.toLowerCase().replace(/[^a-z0-9]/gi, '')) ?? '';
          return {
            csvColumn: col,
            systemField: matched,
            skip: false
          };
        });
        this.step = 2;
      },
      error: err => {
        this.validating = false;
        alert(err?.error?.error ?? 'Could not parse file. Please check format and try again.');
      }
    });
  }
  autoMap() {
    const sysFields = this.systemFields;
    this.mappings = this.mappings.map(m => {
      const clean = m.csvColumn.toLowerCase().replace(/[^a-z0-9]/gi, '');
      const match = sysFields.find(f => f.toLowerCase() === clean || f.toLowerCase().replace(/[^a-z0-9]/gi, '') === clean);
      return {
        ...m,
        systemField: match ?? m.systemField
      };
    });
  }
  executeImport() {
    this.importing = true;
    const payload = {
      feature: this.selectedFeature,
      mappings: this.mappings,
      fileToken: this.fileToken,
      scheduleAt: this.scheduleMode === 'immediate' ? null : null
    };
    this.http.post(`${this.api}/api/import/execute`, payload).subscribe({
      next: res => {
        this.importing = false;
        this.importResult = res;
        this.step = 3;
      },
      error: err => {
        this.importing = false;
        alert(err?.error?.error ?? 'Import failed. Please try again.');
      }
    });
  }
  loadHistory() {
    this.historyLoading = true;
    this.http.get(`${this.api}/api/import/history`).subscribe({
      next: h => {
        this.history = h;
        this.historyLoading = false;
      },
      error: () => {
        this.historyLoading = false;
      }
    });
  }
  downloadErrorReport(id) {
    this.http.get(`${this.api}/api/import/history/${id}/error-report`, {
      responseType: 'blob'
    }).subscribe(blob => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `error_report_${id}.csv`;
      a.click();
      URL.revokeObjectURL(a.href);
    });
  }
  resetWizard() {
    this.step = 1;
    this.selectedFeature = '';
    this.selectedFile = null;
    this.mappings = [];
    this.fileToken = '';
    this.importResult = null;
    this.featureNote = '';
  }
  getSystemFields(feature) {
    const map = {
      Requisitions: ['RequisitionId', 'Title', 'Department', 'Location', 'Headcount', 'BudgetMin', 'BudgetMax', 'Currency', 'Priority', 'Category', 'EmploymentType', 'ExperienceFrom', 'ExperienceTo', 'SalaryTimeframe', 'RecruitmentStartDate', 'ExpectedClosureDate', 'ReportingManagerId', 'HRBPId', 'EmployeeType', 'BillableNonBillable', 'OPEXCAPEX', 'BudgetedSalaryFixed', 'BudgetedSalaryVariable', 'BudgetedSalaryTotal', 'ProjectName', 'ProjectLocation', 'Comments', 'AutoApprove', 'IsReplacement', 'ReplacementEmployeeId', 'AssetRequirements', 'PayrollSpecification', 'RFPRequirement'],
      Candidates: ['CandidateName', 'Email', 'Phone', 'VendorName', 'RequisitionId', 'CurrentCompany', 'CurrentRole', 'TotalExperience', 'CurrentCTC', 'ExpectedCTC', 'Currency', 'NoticePeriod', 'Location', 'Skills', 'SubmissionDate', 'Stage', 'CVJDMatchScore', 'DropoutRiskScore', 'CompetencyScore', 'RejectionReason', 'DropoutReason', 'InterviewNotes'],
      Vendors: ['VendorName', 'ContactPerson', 'Email', 'Phone', 'Address', 'City', 'State', 'Category', 'Status', 'QualityScore', 'SLAScore', 'JoiningRatePercent', 'AvgTimeToSubmit', 'Notes'],
      BudgetFiscalYears: ['FiscalYearLabel', 'StartDate', 'EndDate', 'TotalBudgetAmount', 'Currency', 'Status', 'Notes'],
      BudgetAllocations: ['FiscalYearLabel', 'DepartmentName', 'DepartmentCode', 'HeadcountPlanned', 'AllottedAmount', 'Currency', 'Category', 'Quarter', 'ActualHiringStartDate', 'Notes'],
      BudgetLineItems: ['FiscalYearLabel', 'DepartmentName', 'Quarter', 'LineItemType', 'PlannedAmount', 'ActualAmount', 'Notes'],
      BudgetActuals: ['FiscalYearLabel', 'DepartmentName', 'SpendCategory', 'Amount', 'SpendDate', 'InvoiceReference', 'VendorName', 'RequisitionID', 'CandidateEmail', 'ApprovedById', 'IsApproved', 'Notes'],
      RecruiterPerformances: ['RecruiterName', 'EmployeeId', 'Month', 'Year', 'TotalSubmissions', 'TotalSelections', 'TotalJoinings', 'TotalRejections', 'TotalDropouts', 'OpenRequirements', 'ClosedRequirements', 'AvgTimeToJoin'],
      TalentPool: ['CandidateEmail', 'Tags', 'NurtureStatus', 'Notes', 'LastContactedDate'],
      CandidateSources: ['CandidateEmail', 'Source', 'CampaignCode', 'RecordedDate'],
      InterviewSchedule: ['CandidateEmail', 'RequisitionId', 'ScheduledDate', 'ScheduledTime', 'InterviewType', 'MeetingLink', 'RecruiterEmployeeIds', 'Notes', 'Status'],
      InternalJobPostings: ['Title', 'Department', 'Location', 'EmploymentType', 'PostingType', 'Description', 'Requirements', 'SalaryBandMin', 'SalaryBandMax', 'Currency', 'ShowSalary', 'PostedDate', 'ClosingDate', 'Status', 'RequisitionId', 'Notes']
    };
    return map[feature] ?? [];
  }
  static {
    this.ɵfac = function ImportCenterComponent_Factory(t) {
      return new (t || ImportCenterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: ImportCenterComponent,
      selectors: [["app-import-center"]],
      decls: 21,
      vars: 6,
      consts: [["fileInput", ""], [1, "import-shell"], [1, "page-header"], [1, "page-header-left"], [1, "material-icons", "page-icon"], [1, "page-title"], [1, "page-sub"], [1, "btn", "btn-ghost", 3, "click"], [1, "material-icons", 2, "font-size", "18px", "vertical-align", "middle"], [1, "import-tabs"], [1, "import-tab", 3, "click"], [4, "ngIf"], ["class", "card import-card", 4, "ngIf"], [1, "step-bar"], [1, "step"], [1, "step-num"], [1, "step-connector"], [1, "card", "import-card"], [1, "import-card-title"], [1, "form-row"], [1, "form-label"], [1, "req"], [1, "select", 3, "ngModelChange", "change", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["class", "form-row", 4, "ngIf"], ["class", "options-row", 4, "ngIf"], ["class", "sample-row", 4, "ngIf"], ["class", "notes-box", 4, "ngIf"], [1, "card-actions"], [1, "btn", "btn-primary", 3, "click", "disabled"], [3, "value"], [1, "file-drop-zone", 3, "click", "dragover", "drop"], ["type", "file", "accept", ".csv,.xlsx", 2, "display", "none", 3, "change"], [1, "material-icons", "file-icon"], ["class", "file-hint", 4, "ngIf"], ["class", "file-name", 4, "ngIf"], [1, "file-hint"], [1, "file-name"], [1, "options-row"], [1, "form-check"], ["type", "checkbox", "id", "hasHeader", 3, "ngModelChange", "ngModel"], ["for", "hasHeader"], [1, "option-group"], [1, "form-label-sm"], [1, "select-sm", 3, "ngModelChange", "ngModel"], ["value", ","], ["value", ";"], ["value", "\t"], ["value", "immediate"], ["value", "later"], [1, "sample-row"], [1, "material-icons", 2, "font-size", "18px", "vertical-align", "middle", "color", "#6b4df0"], [1, "sample-link", 3, "click"], [1, "notes-box"], [1, "material-icons", 2, "font-size", "16px", "vertical-align", "middle", "color", "#e8912a"], [1, "import-sub"], ["class", "preview-table-wrap", 4, "ngIf"], [1, "mapping-table"], [1, "mapping-header"], ["class", "mapping-row", 4, "ngFor", "ngForOf"], [1, "preview-table-wrap"], [1, "preview-label"], [1, "table-scroll"], [1, "preview-table"], [4, "ngFor", "ngForOf"], [1, "mapping-row"], [1, "col-name"], [1, "arrow"], ["type", "checkbox", "title", "Skip this column", 3, "ngModelChange", "ngModel"], [1, "result-stats"], [1, "result-stat", "result-stat--success"], [1, "result-icon"], [1, "result-num"], [1, "result-lbl"], ["class", "result-stat result-stat--warn", 4, "ngIf"], ["class", "result-stat result-stat--error", 4, "ngIf"], ["class", "result-list", 4, "ngIf"], [1, "btn", "btn-outline", 3, "click"], [1, "result-stat", "result-stat--warn"], [1, "result-stat", "result-stat--error"], [1, "result-list"], [1, "result-list-title"], ["class", "result-item result-item--warn", 4, "ngFor", "ngForOf"], [1, "result-item", "result-item--warn"], ["class", "result-item result-item--error", 4, "ngFor", "ngForOf"], [1, "result-item", "result-item--error"], ["class", "raw-data", 4, "ngIf"], [1, "raw-data"], ["class", "loading-state", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "table-scroll", 4, "ngIf"], [1, "loading-state"], [1, "empty-state"], [1, "data-table"], [1, "file-cell"], [1, "status-badge"], [1, "num-cell", "success"], [1, "num-cell", "warn"], [1, "num-cell", "error"], ["class", "btn btn-xs", 3, "click", 4, "ngIf"], [1, "btn", "btn-xs", 3, "click"]],
      template: function ImportCenterComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "span", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "upload_file");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div")(6, "h2", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Import Center");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "p", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Bulk-import data into any Decypher module using CSV or Excel files");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "button", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ImportCenterComponent_Template_button_click_10_listener() {
            ctx.activeTab = "history";
            return ctx.loadHistory();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "span", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "history");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, " Import History ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 9)(15, "button", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ImportCenterComponent_Template_button_click_15_listener() {
            return ctx.activeTab = "import";
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "New Import");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "button", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ImportCenterComponent_Template_button_click_17_listener() {
            ctx.activeTab = "history";
            return ctx.loadHistory();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "History");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](19, ImportCenterComponent_div_19_Template, 19, 13, "div", 11)(20, ImportCenterComponent_div_20_Template, 6, 3, "div", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](15);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("active", ctx.activeTab === "import");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("active", ctx.activeTab === "history");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.activeTab === "import");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.activeTab === "history");
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_3__.SlicePipe, _angular_common__WEBPACK_IMPORTED_MODULE_3__.DatePipe],
      styles: [".import-shell[_ngcontent-%COMP%] {\n  padding: 24px 28px;\n  max-width: 1100px;\n  margin: 0 auto;\n  font-family: inherit;\n}\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 20px;\n}\n.page-header-left[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 14px; }\n.page-icon[_ngcontent-%COMP%] { font-size: 32px; color: #6b4df0; }\n.page-title[_ngcontent-%COMP%] { margin: 0; font-size: 22px; font-weight: 700; color: #1a1a3e; }\n.page-sub[_ngcontent-%COMP%] { margin: 2px 0 0; font-size: 13px; color: #6b7280; }\n\n.import-tabs[_ngcontent-%COMP%] { display: flex; gap: 4px; margin-bottom: 20px; border-bottom: 2px solid #e5e7eb; }\n.import-tab[_ngcontent-%COMP%] { background: none; border: none; padding: 10px 20px; font-size: 14px; font-weight: 500; color: #6b7280; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; transition: all .2s; }\n.import-tab.active[_ngcontent-%COMP%] { color: #6b4df0; border-bottom-color: #6b4df0; }\n.import-tab[_ngcontent-%COMP%]:hover:not(.active) { color: #374151; }\n\n\n\n.step-bar[_ngcontent-%COMP%] { display: flex; align-items: center; margin-bottom: 24px; }\n.step[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 500; color: #9ca3af; }\n.step.active[_ngcontent-%COMP%] { color: #6b4df0; }\n.step.done[_ngcontent-%COMP%] { color: #059669; }\n.step-num[_ngcontent-%COMP%] {\n  width: 28px; height: 28px; border-radius: 50%;\n  background: #e5e7eb; color: #6b7280; display: flex; align-items: center; justify-content: center;\n  font-size: 13px; font-weight: 700;\n}\n.step.active[_ngcontent-%COMP%]   .step-num[_ngcontent-%COMP%] { background: #6b4df0; color: #fff; }\n.step.done[_ngcontent-%COMP%]   .step-num[_ngcontent-%COMP%] { background: #059669; color: #fff; }\n.step-connector[_ngcontent-%COMP%] { flex: 1; height: 2px; background: #e5e7eb; margin: 0 12px; }\n\n.import-card[_ngcontent-%COMP%] { padding: 28px 32px; margin-bottom: 20px; }\n.import-card-title[_ngcontent-%COMP%] { font-size: 17px; font-weight: 700; color: #1a1a3e; margin-bottom: 20px; }\n.import-sub[_ngcontent-%COMP%] { font-size: 13px; color: #6b7280; margin: -12px 0 16px; }\n\n.form-row[_ngcontent-%COMP%] { margin-bottom: 18px; }\n.form-label[_ngcontent-%COMP%] { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px; }\n.form-label-sm[_ngcontent-%COMP%] { font-size: 12px; font-weight: 600; color: #374151; margin-bottom: 4px; display: block; }\n.req[_ngcontent-%COMP%] { color: #ef4444; }\n.select[_ngcontent-%COMP%] { width: 100%; padding: 9px 12px; border: 1.5px solid #d1d5db; border-radius: 8px; font-size: 14px; background: #fff; }\n.select-sm[_ngcontent-%COMP%] { padding: 6px 10px; border: 1.5px solid #d1d5db; border-radius: 6px; font-size: 13px; background: #fff; }\n\n\n\n.file-drop-zone[_ngcontent-%COMP%] {\n  border: 2px dashed #d1d5db; border-radius: 10px; padding: 32px 20px;\n  text-align: center; cursor: pointer; transition: all .2s; background: #fafafa;\n}\n.file-drop-zone[_ngcontent-%COMP%]:hover, .file-drop-zone.has-file[_ngcontent-%COMP%] { border-color: #6b4df0; background: #f5f3ff; }\n.file-icon[_ngcontent-%COMP%] { font-size: 36px; color: #9ca3af; display: block; margin-bottom: 8px; }\n.file-drop-zone.has-file[_ngcontent-%COMP%]   .file-icon[_ngcontent-%COMP%] { color: #6b4df0; }\n.file-hint[_ngcontent-%COMP%] { font-size: 14px; color: #6b7280; }\n.file-name[_ngcontent-%COMP%] { font-size: 14px; color: #6b4df0; font-weight: 500; }\n\n.options-row[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; margin-bottom: 18px; }\n.form-check[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #374151; }\n.form-check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { width: 16px; height: 16px; cursor: pointer; }\n.option-group[_ngcontent-%COMP%] { display: flex; flex-direction: column; }\n\n.sample-row[_ngcontent-%COMP%] { font-size: 13px; color: #374151; margin-bottom: 14px; display: flex; align-items: center; gap: 6px; }\n.sample-link[_ngcontent-%COMP%] { color: #6b4df0; font-weight: 600; cursor: pointer; text-decoration: underline; }\n.sample-link[_ngcontent-%COMP%]:hover { color: #4f37cc; }\n\n.notes-box[_ngcontent-%COMP%] { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 12px 16px; font-size: 13px; color: #92400e; margin-bottom: 20px; display: flex; align-items: flex-start; gap: 8px; }\n\n.card-actions[_ngcontent-%COMP%] { display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; border-top: 1px solid #f3f4f6; padding-top: 20px; }\n\n\n\n.preview-table-wrap[_ngcontent-%COMP%] { margin-bottom: 20px; }\n.preview-label[_ngcontent-%COMP%] { font-size: 12px; font-weight: 600; color: #6b7280; margin-bottom: 6px; }\n.preview-table[_ngcontent-%COMP%] { border-collapse: collapse; width: 100%; font-size: 12px; }\n.preview-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] { background: #f3f4f6; padding: 6px 10px; text-align: left; font-weight: 600; border: 1px solid #e5e7eb; white-space: nowrap; }\n.preview-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] { padding: 5px 10px; border: 1px solid #e5e7eb; max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n\n\n\n.mapping-table[_ngcontent-%COMP%] { margin-bottom: 20px; }\n.mapping-header[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr 24px 1fr 60px; gap: 12px; padding: 8px 12px; background: #f3f4f6; border-radius: 6px; font-size: 12px; font-weight: 600; color: #374151; margin-bottom: 4px; }\n.mapping-row[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr 24px 1fr 60px; gap: 12px; padding: 8px 12px; align-items: center; border-bottom: 1px solid #f3f4f6; }\n.mapping-row[_ngcontent-%COMP%]:hover { background: #fafafa; }\n.col-name[_ngcontent-%COMP%] { font-size: 13px; color: #374151; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.arrow[_ngcontent-%COMP%] { color: #9ca3af; font-size: 16px; text-align: center; }\n\n\n\n.result-stats[_ngcontent-%COMP%] { display: flex; gap: 16px; margin-bottom: 24px; flex-wrap: wrap; }\n.result-stat[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 12px; padding: 16px 20px; border-radius: 10px; min-width: 140px; }\n.result-stat--success[_ngcontent-%COMP%] { background: #f0fdf4; border: 1px solid #86efac; }\n.result-stat--warn[_ngcontent-%COMP%] { background: #fffbeb; border: 1px solid #fcd34d; }\n.result-stat--error[_ngcontent-%COMP%] { background: #fef2f2; border: 1px solid #fca5a5; }\n.result-icon[_ngcontent-%COMP%] { font-size: 24px; }\n.result-num[_ngcontent-%COMP%] { font-size: 24px; font-weight: 700; color: #1a1a3e; }\n.result-lbl[_ngcontent-%COMP%] { font-size: 12px; color: #6b7280; }\n\n.result-list[_ngcontent-%COMP%] { margin-bottom: 16px; }\n.result-list-title[_ngcontent-%COMP%] { font-size: 13px; font-weight: 700; margin-bottom: 8px; color: #374151; }\n.result-item[_ngcontent-%COMP%] { font-size: 13px; padding: 6px 10px; border-radius: 6px; margin-bottom: 4px; }\n.result-item--warn[_ngcontent-%COMP%] { background: #fffbeb; color: #92400e; }\n.result-item--error[_ngcontent-%COMP%] { background: #fef2f2; color: #991b1b; }\n.raw-data[_ngcontent-%COMP%] { opacity: .6; font-size: 11px; }\n\n\n\n.data-table[_ngcontent-%COMP%] { width: 100%; border-collapse: collapse; font-size: 13px; }\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] { background: #f3f4f6; padding: 10px 14px; text-align: left; font-weight: 600; color: #374151; border-bottom: 2px solid #e5e7eb; }\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] { padding: 10px 14px; border-bottom: 1px solid #f3f4f6; color: #374151; }\n.data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] { background: #fafafa; }\n.file-cell[_ngcontent-%COMP%] { font-size: 12px; color: #6b7280; max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.num-cell[_ngcontent-%COMP%] { text-align: right; font-weight: 600; }\n.num-cell.success[_ngcontent-%COMP%] { color: #059669; }\n.num-cell.warn[_ngcontent-%COMP%] { color: #d97706; }\n.num-cell.error[_ngcontent-%COMP%] { color: #dc2626; }\n\n.status-badge[_ngcontent-%COMP%] { padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; background: #f3f4f6; color: #374151; }\n.status-badge[data-status=\"completed\"][_ngcontent-%COMP%] { background: #f0fdf4; color: #059669; }\n.status-badge[data-status=\"completedwitherrors\"][_ngcontent-%COMP%] { background: #fffbeb; color: #d97706; }\n.status-badge[data-status=\"failed\"][_ngcontent-%COMP%] { background: #fef2f2; color: #dc2626; }\n.status-badge[data-status=\"processing\"][_ngcontent-%COMP%] { background: #eff6ff; color: #2563eb; }\n\n.btn[_ngcontent-%COMP%] { padding: 9px 18px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; border: none; transition: all .15s; }\n.btn-primary[_ngcontent-%COMP%] { background: #6b4df0; color: #fff; }\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) { background: #4f37cc; }\n.btn-primary[_ngcontent-%COMP%]:disabled { opacity: .5; cursor: not-allowed; }\n.btn-ghost[_ngcontent-%COMP%] { background: none; color: #6b7280; border: 1.5px solid #e5e7eb; }\n.btn-ghost[_ngcontent-%COMP%]:hover { background: #f9fafb; }\n.btn-outline[_ngcontent-%COMP%] { background: none; color: #6b4df0; border: 1.5px solid #6b4df0; }\n.btn-outline[_ngcontent-%COMP%]:hover { background: #f5f3ff; }\n.btn-xs[_ngcontent-%COMP%] { padding: 4px 10px; font-size: 11px; border-radius: 6px; background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb; cursor: pointer; }\n.btn-xs[_ngcontent-%COMP%]:hover { background: #e5e7eb; }\n\n.table-scroll[_ngcontent-%COMP%] { overflow-x: auto; }\n.loading-state[_ngcontent-%COMP%], .empty-state[_ngcontent-%COMP%] { text-align: center; padding: 40px; color: #9ca3af; font-size: 14px; }\n\n\n\n.card[_ngcontent-%COMP%] { background: #fff; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,.07); border: 1px solid #f3f4f6; }"]
    });
  }
}

/***/ }),

/***/ 5588:
/*!**************************************************************************!*\
  !*** ./src/app/internal-job-postings/internal-job-postings.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InternalJobPostingsComponent: () => (/* binding */ InternalJobPostingsComponent)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);





function InternalJobPostingsComponent_tr_38_span_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](3, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const p_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate3"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 3, p_r2.salaryBandMin), " \u2013 ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](3, 5, p_r2.salaryBandMax), " ", p_r2.currency, " ");
  }
}
function InternalJobPostingsComponent_tr_38_span_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Hidden");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function InternalJobPostingsComponent_tr_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "tr", 18)(1, "td", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "td", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "td", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "td", 14)(8, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "td", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, InternalJobPostingsComponent_tr_38_span_11_Template, 4, 7, "span", 16)(12, InternalJobPostingsComponent_tr_38_span_12_Template, 2, 0, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "td", 14)(14, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "td", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](18, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "td", 23)(20, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function InternalJobPostingsComponent_tr_38_Template_button_click_20_listener() {
      const p_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.editPosting(p_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21, "Edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function InternalJobPostingsComponent_tr_38_Template_button_click_22_listener() {
      const p_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.deletePosting(p_r2.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23, "Delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const p_r2 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](p_r2.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](p_r2.department || "\u2014");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](p_r2.employmentType);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("background", ctx_r2.postingTypeColor(p_r2.postingType));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", p_r2.postingType, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", p_r2.showSalary && p_r2.salaryBandMin);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !p_r2.showSalary);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("background", ctx_r2.statusColor(p_r2.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", p_r2.status, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](p_r2.closingDate ? _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](18, 12, p_r2.closingDate, "dd MMM yyyy") : "\u2014");
  }
}
function InternalJobPostingsComponent_tr_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "tr")(1, "td", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "No postings found.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
function InternalJobPostingsComponent_div_40_div_97_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.saveError);
  }
}
function InternalJobPostingsComponent_div_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 1)(1, "h3", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 29)(4, "div")(5, "label", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Title *");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "input", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function InternalJobPostingsComponent_div_40_Template_input_ngModelChange_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r2.draft.title, $event) || (ctx_r2.draft.title = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div")(9, "label", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Department");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "input", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function InternalJobPostingsComponent_div_40_Template_input_ngModelChange_11_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r2.draft.department, $event) || (ctx_r2.draft.department = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div")(13, "label", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "Location");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "input", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function InternalJobPostingsComponent_div_40_Template_input_ngModelChange_15_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r2.draft.location, $event) || (ctx_r2.draft.location = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "div")(17, "label", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "Employment Type");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "select", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function InternalJobPostingsComponent_div_40_Template_select_ngModelChange_19_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r2.draft.employmentType, $event) || (ctx_r2.draft.employmentType = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "option");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21, "FullTime");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "option");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23, "PartTime");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "option");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](25, "Contract");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "option");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](27, "Intern");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "div")(29, "label", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](30, "Posting Type");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "select", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function InternalJobPostingsComponent_div_40_Template_select_ngModelChange_31_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r2.draft.postingType, $event) || (ctx_r2.draft.postingType = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "option");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](33, "Internal");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](34, "option");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](35, "Referral");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](36, "option");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](37, "Both");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](38, "div")(39, "label", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](40, "Status");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](41, "select", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function InternalJobPostingsComponent_div_40_Template_select_ngModelChange_41_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r2.draft.status, $event) || (ctx_r2.draft.status = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](42, "option");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](43, "Draft");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](44, "option");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](45, "Active");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](46, "option");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](47, "Paused");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](48, "div")(49, "label", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](50, "Salary Min");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](51, "input", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function InternalJobPostingsComponent_div_40_Template_input_ngModelChange_51_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r2.draft.salaryBandMin, $event) || (ctx_r2.draft.salaryBandMin = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](52, "div")(53, "label", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](54, "Salary Max");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](55, "input", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function InternalJobPostingsComponent_div_40_Template_input_ngModelChange_55_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r2.draft.salaryBandMax, $event) || (ctx_r2.draft.salaryBandMax = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](56, "div")(57, "label", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](58, "Currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](59, "select", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function InternalJobPostingsComponent_div_40_Template_select_ngModelChange_59_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r2.draft.currency, $event) || (ctx_r2.draft.currency = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](60, "option");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](61, "INR");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](62, "option");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](63, "GBP");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](64, "option");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](65, "USD");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](66, "option");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](67, "EUR");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](68, "div", 37)(69, "input", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function InternalJobPostingsComponent_div_40_Template_input_ngModelChange_69_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r2.draft.showSalary, $event) || (ctx_r2.draft.showSalary = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](70, "label", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](71, "Show Salary to Employees");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](72, "div")(73, "label", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](74, "Posted Date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](75, "input", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function InternalJobPostingsComponent_div_40_Template_input_ngModelChange_75_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r2.draft.postedDate, $event) || (ctx_r2.draft.postedDate = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](76, "div")(77, "label", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](78, "Closing Date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](79, "input", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function InternalJobPostingsComponent_div_40_Template_input_ngModelChange_79_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r2.draft.closingDate, $event) || (ctx_r2.draft.closingDate = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](80, "div", 41)(81, "label", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](82, "Description");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](83, "textarea", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function InternalJobPostingsComponent_div_40_Template_textarea_ngModelChange_83_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r2.draft.description, $event) || (ctx_r2.draft.description = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](84, "div", 41)(85, "label", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](86, "Requirements");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](87, "textarea", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function InternalJobPostingsComponent_div_40_Template_textarea_ngModelChange_87_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r2.draft.requirements, $event) || (ctx_r2.draft.requirements = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](88, "div", 41)(89, "label", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](90, "Notes");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](91, "input", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function InternalJobPostingsComponent_div_40_Template_input_ngModelChange_91_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r2.draft.notes, $event) || (ctx_r2.draft.notes = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](92, "div", 45)(93, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function InternalJobPostingsComponent_div_40_Template_button_click_93_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.save());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](94);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](95, "button", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function InternalJobPostingsComponent_div_40_Template_button_click_95_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.closeForm());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](96, "Cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](97, InternalJobPostingsComponent_div_40_div_97_Template, 2, 1, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx_r2.draft.id ? "Edit" : "New", " Job Posting");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.draft.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.draft.department);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.draft.location);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.draft.employmentType);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.draft.postingType);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.draft.status);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.draft.salaryBandMin);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.draft.salaryBandMax);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.draft.currency);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.draft.showSalary);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.draft.postedDate);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.draft.closingDate);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.draft.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.draft.requirements);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.draft.notes);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.draft.id ? "Update" : "Create");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r2.saveError);
  }
}
class InternalJobPostingsComponent {
  constructor(http) {
    this.http = http;
    this.api = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/internal-job-postings`;
    this.postings = [];
    this.filterStatus = '';
    this.showForm = false;
    this.saveError = '';
    this.draft = {};
  }
  ngOnInit() {
    this.load();
  }
  load() {
    const params = this.filterStatus ? `?status=${this.filterStatus}` : '';
    this.http.get(`${this.api}${params}`).subscribe(data => this.postings = data, () => this.postings = []);
  }
  openForm() {
    this.draft = {
      employmentType: 'FullTime',
      postingType: 'Internal',
      status: 'Draft',
      currency: 'INR',
      showSalary: false
    };
    this.showForm = true;
    this.saveError = '';
  }
  editPosting(p) {
    this.draft = {
      ...p
    };
    this.showForm = true;
    this.saveError = '';
  }
  closeForm() {
    this.showForm = false;
  }
  save() {
    const req = this.draft.id ? this.http.put(`${this.api}/${this.draft.id}`, this.draft) : this.http.post(this.api, this.draft);
    req.subscribe(() => {
      this.closeForm();
      this.load();
    }, err => this.saveError = err.error?.message || 'Save failed.');
  }
  deletePosting(id) {
    if (!confirm('Delete this posting?')) return;
    this.http.delete(`${this.api}/${id}`).subscribe(() => this.load());
  }
  statusColor(s) {
    return s === 'Active' ? '#16a34a' : s === 'Paused' ? '#d97706' : '#64748b';
  }
  postingTypeColor(t) {
    return t === 'Internal' ? '#2563eb' : t === 'Referral' ? '#7c3aed' : '#0891b2';
  }
  static {
    this.ɵfac = function InternalJobPostingsComponent_Factory(t) {
      return new (t || InternalJobPostingsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: InternalJobPostingsComponent,
      selectors: [["app-internal-job-postings"]],
      decls: 41,
      vars: 4,
      consts: [[1, "stack-page"], [1, "card"], [2, "display", "flex", "align-items", "center", "justify-content", "space-between", "margin-bottom", "16px"], [2, "margin", "0", "font-size", "20px", "font-weight", "700"], [1, "btn", "btn-primary", 3, "click"], [2, "display", "flex", "gap", "8px", "margin-bottom", "16px"], [1, "input", 2, "width", "160px", 3, "ngModelChange", "change", "ngModel"], ["value", ""], ["value", "Draft"], ["value", "Active"], ["value", "Paused"], [2, "overflow-x", "auto"], [2, "width", "100%", "border-collapse", "collapse", "font-size", "13px"], [2, "border-bottom", "2px solid #e2e8f0", "text-align", "left"], [2, "padding", "10px 8px"], ["style", "border-bottom:1px solid #f1f5f9", 4, "ngFor", "ngForOf"], [4, "ngIf"], ["class", "card", 4, "ngIf"], [2, "border-bottom", "1px solid #f1f5f9"], [2, "padding", "10px 8px", "font-weight", "600"], [2, "padding", "3px 8px", "border-radius", "12px", "font-size", "11px", "color", "#fff", "font-weight", "600"], ["style", "color:#94a3b8", 4, "ngIf"], [2, "padding", "3px 10px", "border-radius", "12px", "font-size", "11px", "color", "#fff", "font-weight", "600"], [2, "padding", "10px 8px", "display", "flex", "gap", "6px"], [1, "btn", "btn-secondary", 2, "height", "28px", "font-size", "12px", 3, "click"], [1, "btn", "btn-ghost", 2, "height", "28px", "font-size", "12px", "color", "#dc2626", 3, "click"], [2, "color", "#94a3b8"], ["colspan", "8", 2, "padding", "32px", "text-align", "center", "color", "#94a3b8"], [2, "margin", "0 0 16px", "font-size", "16px", "font-weight", "700"], [1, "form-grid"], [2, "font-size", "12px", "font-weight", "600", "display", "block", "margin-bottom", "4px"], ["placeholder", "e.g. Senior Engineer \u2014 Internal", 1, "input", 3, "ngModelChange", "ngModel"], ["placeholder", "Engineering", 1, "input", 3, "ngModelChange", "ngModel"], ["placeholder", "London / Remote", 1, "input", 3, "ngModelChange", "ngModel"], [1, "input", 3, "ngModelChange", "ngModel"], ["type", "number", 1, "input", 3, "ngModelChange", "ngModel"], [1, "select", 3, "ngModelChange", "ngModel"], [2, "display", "flex", "align-items", "center", "gap", "8px", "padding-top", "20px"], ["type", "checkbox", "id", "showSal", 3, "ngModelChange", "ngModel"], ["for", "showSal", 2, "font-size", "13px"], ["type", "date", 1, "input", 3, "ngModelChange", "ngModel"], [2, "margin-top", "12px"], ["rows", "3", "placeholder", "Role description...", 1, "input", "textarea", 3, "ngModelChange", "ngModel"], ["rows", "3", "placeholder", "Skills, experience requirements...", 1, "input", "textarea", 3, "ngModelChange", "ngModel"], ["placeholder", "Internal notes...", 1, "input", 3, "ngModelChange", "ngModel"], [2, "display", "flex", "gap", "8px", "margin-top", "16px"], [1, "btn", "btn-secondary", 3, "click"], ["style", "color:#dc2626;font-size:13px;margin-top:8px", 4, "ngIf"], [2, "color", "#dc2626", "font-size", "13px", "margin-top", "8px"]],
      template: function InternalJobPostingsComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "h2", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Internal Job Postings");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "button", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function InternalJobPostingsComponent_Template_button_click_5_listener() {
            return ctx.openForm();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "+ New Posting");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 5)(8, "select", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function InternalJobPostingsComponent_Template_select_ngModelChange_8_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.filterStatus, $event) || (ctx.filterStatus = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function InternalJobPostingsComponent_Template_select_change_8_listener() {
            return ctx.load();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "option", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "All Statuses");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "option", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "Draft");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "option", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "Active");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "option", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "Paused");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "div", 11)(18, "table", 12)(19, "thead")(20, "tr", 13)(21, "th", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22, "Title");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "th", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](24, "Department");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "th", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26, "Type");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "th", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](28, "Posting");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "th", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](30, "Salary Band");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "th", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](32, "Status");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "th", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](34, "Closing");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](35, "th", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](36, "Actions");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "tbody");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](38, InternalJobPostingsComponent_tr_38_Template, 24, 15, "tr", 15)(39, InternalJobPostingsComponent_tr_39_Template, 3, 0, "tr", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](40, InternalJobPostingsComponent_div_40_Template, 98, 18, "div", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.filterStatus);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](30);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.postings);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.postings.length === 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.showForm);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_3__.DecimalPipe, _angular_common__WEBPACK_IMPORTED_MODULE_3__.DatePipe],
      encapsulation: 2
    });
  }
}

/***/ }),

/***/ 3016:
/*!**********************************************************************!*\
  !*** ./src/app/interview-scheduler/interview-scheduler.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InterviewSchedulerComponent: () => (/* binding */ InterviewSchedulerComponent)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);





function InterviewSchedulerComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Interview scheduled!");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function InterviewSchedulerComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r0.saveErr);
  }
}
function InterviewSchedulerComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 17)(1, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 19)(4, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](6, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](9, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const i_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](i_r2.type);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](6, 6, i_r2.scheduledAt, "d MMM y, HH:mm"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Candidate: ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind3"](9, 9, i_r2.candidateId, 0, 8), "\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("chip-brand", i_r2.status === "Scheduled");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](i_r2.status);
  }
}
function InterviewSchedulerComponent_div_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " No upcoming interviews. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
class InterviewSchedulerComponent {
  constructor(http) {
    this.http = http;
    this.interviews = [];
    this.saving = false;
    this.saveOk = false;
    this.saveErr = '';
    this.form = {
      candidateId: '',
      jobId: '',
      type: 'Video',
      scheduledAt: '',
      meetingLink: '',
      notes: '',
      recruiterIds: []
    };
  }
  ngOnInit() {
    this.loadInterviews();
  }
  loadInterviews() {
    // Load recent interviews via the upcoming board
  }
  schedule() {
    this.saving = true;
    this.saveOk = false;
    this.saveErr = '';
    this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/interviews`, this.form).subscribe({
      next: r => {
        this.interviews = [r, ...this.interviews];
        this.saving = false;
        this.saveOk = true;
      },
      error: err => {
        this.saveErr = err?.error?.error ?? 'Failed to schedule';
        this.saving = false;
      }
    });
  }
  static {
    this.ɵfac = function InterviewSchedulerComponent_Factory(t) {
      return new (t || InterviewSchedulerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: InterviewSchedulerComponent,
      selectors: [["app-interview-scheduler"]],
      decls: 26,
      vars: 12,
      consts: [[1, "stack-page"], [1, "grid", "grid-cols-2", "gap-6"], [1, "card", "form-card"], ["placeholder", "Candidate ID", 1, "input", 3, "ngModelChange", "ngModel"], ["placeholder", "Job ID", 1, "input", 3, "ngModelChange", "ngModel"], [1, "select", 3, "ngModelChange", "ngModel"], ["type", "datetime-local", 1, "input", 3, "ngModelChange", "ngModel"], ["placeholder", "Meeting link (Zoom / Teams)", 1, "input", 3, "ngModelChange", "ngModel"], ["placeholder", "Notes", "rows", "3", 1, "textarea", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-primary", 3, "click", "disabled"], ["style", "color:#10b981;margin-top:8px;", 4, "ngIf"], ["style", "color:#ef4444;margin-top:8px;", 4, "ngIf"], [1, "card"], ["class", "interview-item", 4, "ngFor", "ngForOf"], ["style", "color:var(--text-3);text-align:center;padding:20px;", 4, "ngIf"], [2, "color", "#10b981", "margin-top", "8px"], [2, "color", "#ef4444", "margin-top", "8px"], [1, "interview-item"], [1, "interview-type-badge"], [1, "interview-detail"], [2, "color", "var(--text-3)", "font-size", "12px"], [1, "chip"], [2, "color", "var(--text-3)", "text-align", "center", "padding", "20px"]],
      template: function InterviewSchedulerComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Schedule Interview");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "input", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function InterviewSchedulerComponent_Template_input_ngModelChange_5_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.form.candidateId, $event) || (ctx.form.candidateId = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "input", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function InterviewSchedulerComponent_Template_input_ngModelChange_6_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.form.jobId, $event) || (ctx.form.jobId = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "select", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function InterviewSchedulerComponent_Template_select_ngModelChange_7_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.form.type, $event) || (ctx.form.type = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "option");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Phone");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "option");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Video");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "option");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Onsite");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "input", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function InterviewSchedulerComponent_Template_input_ngModelChange_14_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.form.scheduledAt, $event) || (ctx.form.scheduledAt = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "input", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function InterviewSchedulerComponent_Template_input_ngModelChange_15_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.form.meetingLink, $event) || (ctx.form.meetingLink = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "textarea", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function InterviewSchedulerComponent_Template_textarea_ngModelChange_16_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.form.notes, $event) || (ctx.form.notes = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "button", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function InterviewSchedulerComponent_Template_button_click_17_listener() {
            return ctx.schedule();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](19, InterviewSchedulerComponent_div_19_Template, 2, 0, "div", 10)(20, InterviewSchedulerComponent_div_20_Template, 2, 1, "div", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "div", 12)(22, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23, "Upcoming Interviews");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](24, InterviewSchedulerComponent_div_24_Template, 12, 13, "div", 13)(25, InterviewSchedulerComponent_div_25_Template, 2, 0, "div", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.form.candidateId);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.form.jobId);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.form.type);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.form.scheduledAt);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.form.meetingLink);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.form.notes);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx.saving);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.saving ? "Scheduling\u2026" : "Schedule Interview", " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.saveOk);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.saveErr);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.interviews);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.interviews.length);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_3__.SlicePipe, _angular_common__WEBPACK_IMPORTED_MODULE_3__.DatePipe],
      styles: [".interview-item[_ngcontent-%COMP%] { display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid var(--border); }\n    .interview-type-badge[_ngcontent-%COMP%] { background:var(--brand-bg); color:var(--brand); border-radius:6px; padding:4px 8px; font-size:11px; font-weight:700; }\n    .interview-detail[_ngcontent-%COMP%] { flex:1; display:flex; flex-direction:column; gap:2px; }\n  \n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvaW50ZXJ2aWV3LXNjaGVkdWxlci9pbnRlcnZpZXctc2NoZWR1bGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0lBQ0ksa0JBQWtCLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLHFDQUFxQyxFQUFFO0lBQ3JILHdCQUF3QiwwQkFBMEIsRUFBRSxrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRTtJQUM3SSxvQkFBb0IsTUFBTSxFQUFFLFlBQVksRUFBRSxxQkFBcUIsRUFBRSxPQUFPLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAuaW50ZXJ2aWV3LWl0ZW0geyBkaXNwbGF5OmZsZXg7IGFsaWduLWl0ZW1zOmNlbnRlcjsgZ2FwOjEycHg7IHBhZGRpbmc6MTBweCAwOyBib3JkZXItYm90dG9tOjFweCBzb2xpZCB2YXIoLS1ib3JkZXIpOyB9XG4gICAgLmludGVydmlldy10eXBlLWJhZGdlIHsgYmFja2dyb3VuZDp2YXIoLS1icmFuZC1iZyk7IGNvbG9yOnZhcigtLWJyYW5kKTsgYm9yZGVyLXJhZGl1czo2cHg7IHBhZGRpbmc6NHB4IDhweDsgZm9udC1zaXplOjExcHg7IGZvbnQtd2VpZ2h0OjcwMDsgfVxuICAgIC5pbnRlcnZpZXctZGV0YWlsIHsgZmxleDoxOyBkaXNwbGF5OmZsZXg7IGZsZXgtZGlyZWN0aW9uOmNvbHVtbjsgZ2FwOjJweDsgfVxuICAiXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 8806:
/*!********************************************************!*\
  !*** ./src/app/jd-generator/jd-generator.component.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JdGeneratorComponent: () => (/* binding */ JdGeneratorComponent)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);





function JdGeneratorComponent_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function JdGeneratorComponent_button_7_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.reset());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "New JD");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function JdGeneratorComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" \u26A0 ", ctx_r1.errorMessage, " ");
  }
}
function JdGeneratorComponent_div_9_option_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "option", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const t_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", t_r4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](t_r4);
  }
}
function JdGeneratorComponent_div_9_span_35_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "\u2728 Generate JD");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function JdGeneratorComponent_div_9_span_36_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "\uD83D\uDD04 Generating...");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function JdGeneratorComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 10)(1, "h3", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Job Details");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 12)(4, "div")(5, "label", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Job Title *");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "input", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function JdGeneratorComponent_div_9_Template_input_ngModelChange_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r1.form.jobTitle, $event) || (ctx_r1.form.jobTitle = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div")(9, "label", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Department");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "input", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function JdGeneratorComponent_div_9_Template_input_ngModelChange_11_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r1.form.department, $event) || (ctx_r1.form.department = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div")(13, "label", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "Required Skills (comma-separated)");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "input", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function JdGeneratorComponent_div_9_Template_input_ngModelChange_15_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r1.form.requiredSkillsText, $event) || (ctx_r1.form.requiredSkillsText = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "div")(17, "label", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "Employment Type");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "select", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function JdGeneratorComponent_div_9_Template_select_ngModelChange_19_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r1.form.employmentType, $event) || (ctx_r1.form.employmentType = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](20, JdGeneratorComponent_div_9_option_20_Template, 2, 2, "option", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "div")(22, "label", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23, "Min Years Experience");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "input", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function JdGeneratorComponent_div_9_Template_input_ngModelChange_24_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r1.form.minYearsExperience, $event) || (ctx_r1.form.minYearsExperience = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "div")(26, "label", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](27, "Max Years Experience");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "input", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function JdGeneratorComponent_div_9_Template_input_ngModelChange_28_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r1.form.maxYearsExperience, $event) || (ctx_r1.form.maxYearsExperience = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "div", 21)(30, "label", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](31, "Additional Context (optional)");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "textarea", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function JdGeneratorComponent_div_9_Template_textarea_ngModelChange_32_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r1.form.additionalContext, $event) || (ctx_r1.form.additionalContext = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "div", 21)(34, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function JdGeneratorComponent_div_9_Template_button_click_34_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.generate());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](35, JdGeneratorComponent_div_9_span_35_Template, 2, 0, "span", 24)(36, JdGeneratorComponent_div_9_span_36_Template, 2, 0, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.form.jobTitle);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.form.department);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.form.requiredSkillsText);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.form.employmentType);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.employmentTypes);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.form.minYearsExperience);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.form.maxYearsExperience);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.form.additionalContext);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx_r1.isGenerating || !ctx_r1.form.jobTitle);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r1.isGenerating);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.isGenerating);
  }
}
function JdGeneratorComponent_div_10_div_11_li_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r6);
  }
}
function JdGeneratorComponent_div_10_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 29)(1, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Key Responsibilities");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "ul", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, JdGeneratorComponent_div_10_div_11_li_4_Template, 2, 1, "li", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.result.data.responsibilities);
  }
}
function JdGeneratorComponent_div_10_div_12_li_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r7);
  }
}
function JdGeneratorComponent_div_10_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 29)(1, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Requirements");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "ul", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, JdGeneratorComponent_div_10_div_12_li_4_Template, 2, 1, "li", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.result.data.requirements);
  }
}
function JdGeneratorComponent_div_10_div_13_li_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r8);
  }
}
function JdGeneratorComponent_div_10_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 29)(1, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Nice to Have");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "ul", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, JdGeneratorComponent_div_10_div_13_li_4_Template, 2, 1, "li", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.result.data.niceToHave);
  }
}
function JdGeneratorComponent_div_10_div_14_li_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r9);
  }
}
function JdGeneratorComponent_div_10_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 29)(1, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Benefits");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "ul", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, JdGeneratorComponent_div_10_div_14_li_4_Template, 2, 1, "li", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.result.data.benefits);
  }
}
function JdGeneratorComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 26)(1, "div", 27)(2, "h2", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function JdGeneratorComponent_div_10_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r5);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.copyToClipboard());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Copy as Markdown");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 29)(7, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Overview");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "p", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, JdGeneratorComponent_div_10_div_11_Template, 5, 1, "div", 31)(12, JdGeneratorComponent_div_10_div_12_Template, 5, 1, "div", 31)(13, JdGeneratorComponent_div_10_div_13_Template, 5, 1, "div", 31)(14, JdGeneratorComponent_div_10_div_14_Template, 5, 1, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "div", 32)(16, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](24, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r1.result.data.title, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.result.data.overview);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.result.data.responsibilities == null ? null : ctx_r1.result.data.responsibilities.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.result.data.requirements == null ? null : ctx_r1.result.data.requirements.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.result.data.niceToHave == null ? null : ctx_r1.result.data.niceToHave.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.result.data.benefits == null ? null : ctx_r1.result.data.benefits.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Employment: ", ctx_r1.result.data.employmentType, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Experience: ", ctx_r1.result.data.experienceRange, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Model: ", ctx_r1.result.modelVersion, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Generated: ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](24, 10, ctx_r1.result.timestamp, "medium"), "");
  }
}
class JdGeneratorComponent {
  constructor(http) {
    this.http = http;
    this.form = {
      jobTitle: '',
      department: '',
      requiredSkillsText: '',
      minYearsExperience: 2,
      maxYearsExperience: 5,
      employmentType: 'Full-time',
      additionalContext: ''
    };
    this.isGenerating = false;
    this.result = null;
    this.errorMessage = '';
    this.employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Remote', 'Hybrid', 'Internship'];
  }
  generate() {
    if (!this.form.jobTitle.trim()) {
      this.errorMessage = 'Job Title is required.';
      return;
    }
    this.isGenerating = true;
    this.result = null;
    this.errorMessage = '';
    const payload = {
      jobTitle: this.form.jobTitle,
      department: this.form.department,
      requiredSkills: this.form.requiredSkillsText.split(',').map(s => s.trim()).filter(Boolean),
      minYearsExperience: this.form.minYearsExperience,
      maxYearsExperience: this.form.maxYearsExperience,
      employmentType: this.form.employmentType,
      additionalContext: this.form.additionalContext || null
    };
    this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/aiagents/generate-jd`, payload).subscribe({
      next: res => {
        this.result = res;
        this.isGenerating = false;
      },
      error: err => {
        this.errorMessage = err?.error?.error ?? 'JD generation failed. Please try again.';
        this.isGenerating = false;
      }
    });
  }
  copyToClipboard() {
    if (!this.result?.data) return;
    const d = this.result.data;
    const text = [`# ${d.title}`, `\n## Overview\n${d.overview}`, `\n## Responsibilities\n${d.responsibilities.map(r => `• ${r}`).join('\n')}`, `\n## Requirements\n${d.requirements.map(r => `• ${r}`).join('\n')}`, d.niceToHave?.length ? `\n## Nice to Have\n${d.niceToHave.map(r => `• ${r}`).join('\n')}` : '', d.benefits?.length ? `\n## Benefits\n${d.benefits.map(r => `• ${r}`).join('\n')}` : '', `\n**Employment Type:** ${d.employmentType}`, `**Experience:** ${d.experienceRange}`].join('\n');
    navigator.clipboard.writeText(text);
  }
  reset() {
    this.result = null;
    this.errorMessage = '';
    this.form = {
      jobTitle: '',
      department: '',
      requiredSkillsText: '',
      minYearsExperience: 2,
      maxYearsExperience: 5,
      employmentType: 'Full-time',
      additionalContext: ''
    };
  }
  static {
    this.ɵfac = function JdGeneratorComponent_Factory(t) {
      return new (t || JdGeneratorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: JdGeneratorComponent,
      selectors: [["app-jd-generator"]],
      decls: 11,
      vars: 4,
      consts: [[1, "page-container", "page-enter"], [1, "flex", "justify-between", "items-center", "mb-6"], [1, "page-title"], [1, "text-sm", 2, "color", "var(--text-3)"], ["class", "btn btn-secondary", 3, "click", 4, "ngIf"], ["class", "human-review-banner", "style", "border-color:var(--sla-overdue);background:rgba(239,68,68,0.08);color:var(--sla-overdue)", 4, "ngIf"], ["class", "card mb-6", 4, "ngIf"], ["class", "card", 4, "ngIf"], [1, "btn", "btn-secondary", 3, "click"], [1, "human-review-banner", 2, "border-color", "var(--sla-overdue)", "background", "rgba(239,68,68,0.08)", "color", "var(--sla-overdue)"], [1, "card", "mb-6"], [1, "card-title", "mb-4"], [1, "form-grid"], [1, "label"], ["placeholder", "e.g. Senior Software Engineer", 1, "input", 3, "ngModelChange", "ngModel"], ["placeholder", "e.g. Engineering", 1, "input", 3, "ngModelChange", "ngModel"], ["placeholder", "e.g. React, TypeScript, Node.js", 1, "input", 3, "ngModelChange", "ngModel"], [1, "select", 3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], ["type", "number", "min", "0", "max", "20", 1, "input", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", "max", "30", 1, "input", 3, "ngModelChange", "ngModel"], [1, "mt-4"], ["rows", "3", "placeholder", "e.g. Remote-first team, startup environment, fintech domain...", 1, "input", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-primary", 3, "click", "disabled"], [4, "ngIf"], [3, "value"], [1, "card"], [1, "flex", "justify-between", "items-start", "mb-6"], [2, "font-size", "22px", "font-weight", "700", "color", "var(--moonlight-dark)"], [1, "jd-section"], [2, "line-height", "1.7", "color", "var(--text-2)"], ["class", "jd-section", 4, "ngIf"], [1, "model-info"], [1, "jd-list"], [4, "ngFor", "ngForOf"]],
      template: function JdGeneratorComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "AI Job Description Generator");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "p", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Generate professional, bias-free JDs with AI");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, JdGeneratorComponent_button_7_Template, 2, 0, "button", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, JdGeneratorComponent_div_8_Template, 2, 1, "div", 5)(9, JdGeneratorComponent_div_9_Template, 37, 11, "div", 6)(10, JdGeneratorComponent_div_10_Template, 25, 13, "div", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.result);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.errorMessage);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.result);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.result == null ? null : ctx.result.data);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.MinValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.MaxValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_3__.DatePipe],
      encapsulation: 2
    });
  }
}

/***/ }),

/***/ 7518:
/*!****************************************************************!*\
  !*** ./src/app/offer-management/offer-management.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OfferManagementComponent: () => (/* binding */ OfferManagementComponent)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);





function OfferManagementComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Offer created!");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function OfferManagementComponent_div_28_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function OfferManagementComponent_div_28_button_10_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const o_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.sendOffer(o_r2.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Send");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function OfferManagementComponent_div_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 17)(1, "div", 18)(2, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](4, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](7, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](10, OfferManagementComponent_div_28_button_10_Template, 2, 0, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const o_r2 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("", o_r2.currency, " ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](4, 7, o_r2.salary), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Expires ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](7, 9, o_r2.expiryDate, "d MMM y"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("background", ctx_r2.statusColour(o_r2.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](o_r2.status);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", o_r2.status === "Draft");
  }
}
function OfferManagementComponent_div_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " No pending offers. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
class OfferManagementComponent {
  constructor(http) {
    this.http = http;
    this.pending = [];
    this.saving = false;
    this.saveOk = false;
    this.form = {
      candidateId: '',
      jobId: '',
      salary: 0,
      currency: 'INR',
      startDate: '',
      expiryDate: '',
      benefits: []
    };
  }
  ngOnInit() {
    this.loadPending();
  }
  loadPending() {
    this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/offers/pending`).subscribe({
      next: d => this.pending = d,
      error: () => {}
    });
  }
  createOffer() {
    this.saving = true;
    this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/offers`, this.form).subscribe({
      next: r => {
        this.pending = [...this.pending, r];
        this.saving = false;
        this.saveOk = true;
      },
      error: () => {
        this.saving = false;
      }
    });
  }
  sendOffer(id) {
    this.http.put(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/offers/${id}/send`, {}).subscribe({
      next: () => this.loadPending(),
      error: () => {}
    });
  }
  statusColour(s) {
    return s === 'Accepted' ? '#d1fae5' : s === 'Declined' ? '#fee2e2' : '#fef3c7';
  }
  static {
    this.ɵfac = function OfferManagementComponent_Factory(t) {
      return new (t || OfferManagementComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: OfferManagementComponent,
      selectors: [["app-offer-management"]],
      decls: 30,
      vars: 12,
      consts: [[1, "stack-page"], [1, "grid", "grid-cols-2", "gap-6"], [1, "card", "form-card"], ["placeholder", "Candidate ID", 1, "input", 3, "ngModelChange", "ngModel"], ["placeholder", "Job ID", 1, "input", 3, "ngModelChange", "ngModel"], [2, "display", "flex", "gap", "8px"], ["placeholder", "Salary", "type", "number", 1, "input", 2, "flex", "1", 3, "ngModelChange", "ngModel"], [1, "select", 2, "flex", "0 0 80px", 3, "ngModelChange", "ngModel"], ["type", "date", "placeholder", "Start date", 1, "input", 3, "ngModelChange", "ngModel"], ["type", "date", "placeholder", "Offer expiry", 1, "input", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-primary", 3, "click", "disabled"], ["style", "color:#10b981;margin-top:8px;", 4, "ngIf"], [1, "card"], [1, "chip", "chip-brand", 2, "margin-left", "8px"], ["class", "offer-row", 4, "ngFor", "ngForOf"], ["style", "color:var(--text-3);text-align:center;padding:20px;", 4, "ngIf"], [2, "color", "#10b981", "margin-top", "8px"], [1, "offer-row"], [1, "offer-info"], [2, "font-size", "12px", "color", "var(--text-3)"], [1, "chip"], ["class", "btn btn-ghost btn-sm", 3, "click", 4, "ngIf"], [1, "btn", "btn-ghost", "btn-sm", 3, "click"], [2, "color", "var(--text-3)", "text-align", "center", "padding", "20px"]],
      template: function OfferManagementComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Create Offer");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "input", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function OfferManagementComponent_Template_input_ngModelChange_5_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.form.candidateId, $event) || (ctx.form.candidateId = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "input", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function OfferManagementComponent_Template_input_ngModelChange_6_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.form.jobId, $event) || (ctx.form.jobId = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 5)(8, "input", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function OfferManagementComponent_Template_input_ngModelChange_8_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.form.salary, $event) || (ctx.form.salary = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "select", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function OfferManagementComponent_Template_select_ngModelChange_9_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.form.currency, $event) || (ctx.form.currency = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "option");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "INR");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "option");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "GBP");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "option");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "USD");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "option");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "EUR");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "input", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function OfferManagementComponent_Template_input_ngModelChange_18_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.form.startDate, $event) || (ctx.form.startDate = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "input", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function OfferManagementComponent_Template_input_ngModelChange_19_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.form.expiryDate, $event) || (ctx.form.expiryDate = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "button", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function OfferManagementComponent_Template_button_click_20_listener() {
            return ctx.createOffer();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](22, OfferManagementComponent_div_22_Template, 2, 0, "div", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "div", 12)(24, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](25, "Pending Offers ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "span", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](27);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](28, OfferManagementComponent_div_28_Template, 11, 12, "div", 14)(29, OfferManagementComponent_div_29_Template, 2, 0, "div", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.form.candidateId);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.form.jobId);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.form.salary);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.form.currency);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.form.startDate);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.form.expiryDate);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx.saving);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.saving ? "Creating\u2026" : "Create Offer", " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.saveOk);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.pending.length);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.pending);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.pending.length);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_3__.DecimalPipe, _angular_common__WEBPACK_IMPORTED_MODULE_3__.DatePipe],
      styles: [".offer-row[_ngcontent-%COMP%] { display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid var(--border); }\n    .offer-info[_ngcontent-%COMP%] { flex:1; display:flex; flex-direction:column; gap:2px; }\n  \n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvb2ZmZXItbWFuYWdlbWVudC9vZmZlci1tYW5hZ2VtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0lBQ0ksYUFBYSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxxQ0FBcUMsRUFBRTtJQUNoSCxjQUFjLE1BQU0sRUFBRSxZQUFZLEVBQUUscUJBQXFCLEVBQUUsT0FBTyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgLm9mZmVyLXJvdyB7IGRpc3BsYXk6ZmxleDsgYWxpZ24taXRlbXM6Y2VudGVyOyBnYXA6MTJweDsgcGFkZGluZzoxMHB4IDA7IGJvcmRlci1ib3R0b206MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7IH1cbiAgICAub2ZmZXItaW5mbyB7IGZsZXg6MTsgZGlzcGxheTpmbGV4OyBmbGV4LWRpcmVjdGlvbjpjb2x1bW47IGdhcDoycHg7IH1cbiAgIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 2084:
/*!************************************************************!*\
  !*** ./src/app/pipeline-board/pipeline-board.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PipelineBoardComponent: () => (/* binding */ PipelineBoardComponent)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);





function PipelineBoardComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Loading pipeline\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function PipelineBoardComponent_div_6_div_1_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PipelineBoardComponent_div_6_div_1_div_6_Template_div_click_0_listener() {
      const c_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.openCandidate(c_r2.candidateId));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](3, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](6, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const c_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind3"](3, 2, c_r2.candidateId, 0, 8), "\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Moved ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](6, 6, c_r2.movedAt, "d MMM"), "");
  }
}
function PipelineBoardComponent_div_6_div_1_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "No candidates");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function PipelineBoardComponent_div_6_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 9)(1, "div", 10)(2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, PipelineBoardComponent_div_6_div_1_div_6_Template, 7, 9, "div", 12)(7, PipelineBoardComponent_div_6_div_1_div_7_Template, 2, 0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const col_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("border-top-color", col_r4.stage.colour);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](col_r4.stage.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](col_r4.candidates.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", col_r4.candidates);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !col_r4.candidates.length);
  }
}
function PipelineBoardComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, PipelineBoardComponent_div_6_div_1_Template, 8, 6, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r2.board);
  }
}
function PipelineBoardComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " No stages configured yet. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
class PipelineBoardComponent {
  constructor(http) {
    this.http = http;
    this.jobId = '';
    this.board = [];
    this.loading = false;
    this.loaded = false;
  }
  ngOnInit() {
    this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/pipeline-board/stages`).subscribe({
      next: () => {},
      error: () => {}
    });
  }
  loadBoard() {
    if (!this.jobId.trim()) return;
    this.loading = true;
    this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/pipeline-board/${this.jobId}`).subscribe({
      next: data => {
        this.board = data;
        this.loading = false;
        this.loaded = true;
      },
      error: () => {
        this.loading = false;
        this.loaded = true;
      }
    });
  }
  openCandidate(id) {
    // Navigate to candidate detail when implemented
  }
  static {
    this.ɵfac = function PipelineBoardComponent_Factory(t) {
      return new (t || PipelineBoardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: PipelineBoardComponent,
      selectors: [["app-pipeline-board"]],
      decls: 8,
      vars: 4,
      consts: [[1, "stack-page"], [1, "card", "form-row", 2, "margin-bottom", "16px"], ["placeholder", "Job ID (UUID)", 1, "input", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-primary", 3, "click"], ["style", "text-align:center;padding:40px;color:var(--text-3)", 4, "ngIf"], ["class", "kanban-board", 4, "ngIf"], [2, "text-align", "center", "padding", "40px", "color", "var(--text-3)"], [1, "kanban-board"], ["class", "kanban-col", 4, "ngFor", "ngForOf"], [1, "kanban-col"], [1, "kanban-col-header"], [1, "chip"], ["class", "kanban-card", 3, "click", 4, "ngFor", "ngForOf"], ["class", "kanban-empty", 4, "ngIf"], [1, "kanban-card", 3, "click"], [1, "kanban-card-name"], [1, "kanban-card-meta"], [1, "kanban-empty"]],
      template: function PipelineBoardComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "section", 0)(1, "div", 1)(2, "input", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function PipelineBoardComponent_Template_input_ngModelChange_2_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.jobId, $event) || (ctx.jobId = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PipelineBoardComponent_Template_button_click_3_listener() {
            return ctx.loadBoard();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Load Board");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, PipelineBoardComponent_div_5_Template, 2, 0, "div", 4)(6, PipelineBoardComponent_div_6_Template, 2, 1, "div", 5)(7, PipelineBoardComponent_div_7_Template, 2, 0, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.jobId);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.loading);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.board.length);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.board.length && !ctx.loading && ctx.loaded);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_3__.SlicePipe, _angular_common__WEBPACK_IMPORTED_MODULE_3__.DatePipe],
      styles: [".kanban-board[_ngcontent-%COMP%] { display:flex; gap:16px; overflow-x:auto; padding-bottom:8px; }\n    .kanban-col[_ngcontent-%COMP%] { min-width:200px; background:var(--surface); border-radius:10px; padding:12px; }\n    .kanban-col-header[_ngcontent-%COMP%] { display:flex; justify-content:space-between; align-items:center; font-weight:700; font-size:13px; border-top:3px solid #6366f1; padding-top:8px; margin-bottom:12px; }\n    .kanban-card[_ngcontent-%COMP%] { background:#fff; border:1px solid var(--border); border-radius:8px; padding:10px; margin-bottom:8px; cursor:pointer; }\n    .kanban-card[_ngcontent-%COMP%]:hover { border-color:#6366f1; }\n    .kanban-card-name[_ngcontent-%COMP%] { font-weight:600; font-size:13px; }\n    .kanban-card-meta[_ngcontent-%COMP%] { font-size:11px; color:var(--text-3); margin-top:2px; }\n    .kanban-empty[_ngcontent-%COMP%] { color:var(--text-3); font-size:12px; text-align:center; padding:16px 0; }\n  \n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGlwZWxpbmUtYm9hcmQvcGlwZWxpbmUtYm9hcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7SUFDSSxnQkFBZ0IsWUFBWSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsa0JBQWtCLEVBQUU7SUFDN0UsY0FBYyxlQUFlLEVBQUUseUJBQXlCLEVBQUUsa0JBQWtCLEVBQUUsWUFBWSxFQUFFO0lBQzVGLHFCQUFxQixZQUFZLEVBQUUsNkJBQTZCLEVBQUUsa0JBQWtCLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSw0QkFBNEIsRUFBRSxlQUFlLEVBQUUsa0JBQWtCLEVBQUU7SUFDMUwsZUFBZSxlQUFlLEVBQUUsOEJBQThCLEVBQUUsaUJBQWlCLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLGNBQWMsRUFBRTtJQUNwSSxxQkFBcUIsb0JBQW9CLEVBQUU7SUFDM0Msb0JBQW9CLGVBQWUsRUFBRSxjQUFjLEVBQUU7SUFDckQsb0JBQW9CLGNBQWMsRUFBRSxtQkFBbUIsRUFBRSxjQUFjLEVBQUU7SUFDekUsZ0JBQWdCLG1CQUFtQixFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAua2FuYmFuLWJvYXJkIHsgZGlzcGxheTpmbGV4OyBnYXA6MTZweDsgb3ZlcmZsb3cteDphdXRvOyBwYWRkaW5nLWJvdHRvbTo4cHg7IH1cbiAgICAua2FuYmFuLWNvbCB7IG1pbi13aWR0aDoyMDBweDsgYmFja2dyb3VuZDp2YXIoLS1zdXJmYWNlKTsgYm9yZGVyLXJhZGl1czoxMHB4OyBwYWRkaW5nOjEycHg7IH1cbiAgICAua2FuYmFuLWNvbC1oZWFkZXIgeyBkaXNwbGF5OmZsZXg7IGp1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuOyBhbGlnbi1pdGVtczpjZW50ZXI7IGZvbnQtd2VpZ2h0OjcwMDsgZm9udC1zaXplOjEzcHg7IGJvcmRlci10b3A6M3B4IHNvbGlkICM2MzY2ZjE7IHBhZGRpbmctdG9wOjhweDsgbWFyZ2luLWJvdHRvbToxMnB4OyB9XG4gICAgLmthbmJhbi1jYXJkIHsgYmFja2dyb3VuZDojZmZmOyBib3JkZXI6MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7IGJvcmRlci1yYWRpdXM6OHB4OyBwYWRkaW5nOjEwcHg7IG1hcmdpbi1ib3R0b206OHB4OyBjdXJzb3I6cG9pbnRlcjsgfVxuICAgIC5rYW5iYW4tY2FyZDpob3ZlciB7IGJvcmRlci1jb2xvcjojNjM2NmYxOyB9XG4gICAgLmthbmJhbi1jYXJkLW5hbWUgeyBmb250LXdlaWdodDo2MDA7IGZvbnQtc2l6ZToxM3B4OyB9XG4gICAgLmthbmJhbi1jYXJkLW1ldGEgeyBmb250LXNpemU6MTFweDsgY29sb3I6dmFyKC0tdGV4dC0zKTsgbWFyZ2luLXRvcDoycHg7IH1cbiAgICAua2FuYmFuLWVtcHR5IHsgY29sb3I6dmFyKC0tdGV4dC0zKTsgZm9udC1zaXplOjEycHg7IHRleHQtYWxpZ246Y2VudGVyOyBwYWRkaW5nOjE2cHggMDsgfVxuICAiXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 8952:
/*!**********************************************!*\
  !*** ./src/app/reports/reports.component.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReportsComponent: () => (/* binding */ ReportsComponent)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);





function ReportsComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ReportsComponent_div_7_Template_div_click_0_listener() {
      const r_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.selectReport(r_r2.key));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const r_r2 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("border", ctx_r2.selected === r_r2.key ? "2px solid #6b4df0" : "1.5px solid #e2e8f0")("background", ctx_r2.selected === r_r2.key ? "#f5f3ff" : "#fff");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](r_r2.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](r_r2.label);
  }
}
function ReportsComponent_div_8_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ReportsComponent_div_8_button_9_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r5);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.exportExcel());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Export Excel");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function ReportsComponent_div_8_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ReportsComponent_div_8_button_10_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r6);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.exportPdf());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Export PDF");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function ReportsComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 15)(1, "label", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "From");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "input", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function ReportsComponent_div_8_Template_input_ngModelChange_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r2.fromDate, $event) || (ctx_r2.fromDate = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "label", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "To");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "input", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function ReportsComponent_div_8_Template_input_ngModelChange_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r2.toDate, $event) || (ctx_r2.toDate = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ReportsComponent_div_8_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.runReport());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, ReportsComponent_div_8_button_9_Template, 2, 0, "button", 19)(10, ReportsComponent_div_8_button_10_Template, 2, 0, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.fromDate);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r2.toDate);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx_r2.loading);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r2.loading ? "Loading\u2026" : "Run Report", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r2.reportData);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r2.reportData);
  }
}
function ReportsComponent_div_9_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 23)(1, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const kpi_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](kpi_r7.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](kpi_r7.label);
  }
}
function ReportsComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, ReportsComponent_div_9_div_1_Template, 5, 2, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r2.reportData.kpis);
  }
}
function ReportsComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 26)(1, "div")(2, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "\uD83D\uDCCA");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Visual chart integration via Chart.js \u2014 wire up with reportData.chartData");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate3"]("Chart: ", ctx_r2.selectedLabel, " (", ctx_r2.fromDate, " \u2013 ", ctx_r2.toDate, ")");
  }
}
function ReportsComponent_div_11_th_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "th", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const col_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](col_r8);
  }
}
function ReportsComponent_div_11_tr_6_td_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    let tmp_5_0;
    const col_r9 = ctx.$implicit;
    const row_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"]((tmp_5_0 = row_r10[col_r9]) !== null && tmp_5_0 !== undefined ? tmp_5_0 : "\u2014");
  }
}
function ReportsComponent_div_11_tr_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "tr", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, ReportsComponent_div_11_tr_6_td_1_Template, 2, 1, "td", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r2.reportData.columns);
  }
}
function ReportsComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 30)(1, "table", 31)(2, "thead")(3, "tr", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, ReportsComponent_div_11_th_4_Template, 2, 1, "th", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, ReportsComponent_div_11_tr_6_Template, 2, 1, "tr", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r2.reportData.columns);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r2.reportData.rows);
  }
}
function ReportsComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " No data found for the selected date range. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function ReportsComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Select a report type above to get started. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
const REPORT_TYPES = [{
  key: 'requisition-aging',
  label: 'Requisition Aging Report',
  icon: '📋'
}, {
  key: 'vendor-performance',
  label: 'Vendor Performance Report',
  icon: '🏢'
}, {
  key: 'candidate-funnel',
  label: 'Candidate Funnel Report',
  icon: '🔽'
}, {
  key: 'offer-dropout',
  label: 'Offer & Dropout Analysis',
  icon: '📉'
}, {
  key: 'time-to-hire',
  label: 'Time-to-Hire Report',
  icon: '⏱️'
}, {
  key: 'source-effectiveness',
  label: 'Source Effectiveness Report',
  icon: '📡'
}, {
  key: 'budget-utilisation',
  label: 'Budget Utilisation Report',
  icon: '💰'
}, {
  key: 'recruiter-productivity',
  label: 'Recruiter Productivity Report',
  icon: '🧑‍💼'
}, {
  key: 'sla-compliance',
  label: 'SLA Compliance Report',
  icon: '🎯'
}, {
  key: 'diversity-hiring',
  label: 'Diversity & Hiring Mix Report',
  icon: '📊'
}, {
  key: 'talent-pool-health',
  label: 'Talent Pool Health Report',
  icon: '🌱'
}, {
  key: 'internal-mobility',
  label: 'Internal Mobility Report',
  icon: '🔄'
}];
class ReportsComponent {
  constructor(http) {
    this.http = http;
    this.api = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl;
    this.reportTypes = REPORT_TYPES;
    this.selected = '';
    this.selectedLabel = '';
    this.fromDate = '';
    this.toDate = '';
    this.loading = false;
    this.reportData = null;
  }
  ngOnInit() {
    const now = new Date();
    const y = now.getFullYear(),
      m = now.getMonth();
    this.fromDate = new Date(y, m - 3, 1).toISOString().split('T')[0];
    this.toDate = now.toISOString().split('T')[0];
  }
  selectReport(key) {
    this.selected = key;
    this.selectedLabel = this.reportTypes.find(r => r.key === key)?.label || key;
    this.reportData = null;
  }
  runReport() {
    if (!this.selected) return;
    this.loading = true;
    const params = `?from=${this.fromDate}&to=${this.toDate}`;
    this.http.get(`${this.api}/api/reports/${this.selected}${params}`).subscribe({
      next: data => {
        this.reportData = data;
        this.loading = false;
      },
      error: () => {
        this.reportData = this.getMockData(this.selected);
        this.loading = false;
      }
    });
  }
  exportExcel() {
    const url = `${this.api}/api/reports/${this.selected}/export/excel?from=${this.fromDate}&to=${this.toDate}`;
    window.open(url, '_blank');
  }
  exportPdf() {
    const url = `${this.api}/api/reports/${this.selected}/export/pdf?from=${this.fromDate}&to=${this.toDate}`;
    window.open(url, '_blank');
  }
  getMockData(type) {
    const mockMap = {
      'requisition-aging': {
        kpis: [{
          label: 'Total Open',
          value: 24
        }, {
          label: 'Overdue',
          value: 7
        }, {
          label: 'Avg Days Open',
          value: 34
        }],
        columns: ['Requisition', 'Department', 'Days Open', 'Status'],
        rows: []
      },
      'vendor-performance': {
        kpis: [{
          label: 'Total Vendors',
          value: 12
        }, {
          label: 'Avg Quality Score',
          value: '84%'
        }, {
          label: 'Avg Joining Rate',
          value: '68%'
        }],
        columns: ['Vendor', 'Submissions', 'Selections', 'Joining Rate', 'SLA Score'],
        rows: []
      },
      'candidate-funnel': {
        kpis: [{
          label: 'Submitted',
          value: 240
        }, {
          label: 'Screened',
          value: 80
        }, {
          label: 'Selected',
          value: 22
        }, {
          label: 'Joined',
          value: 18
        }],
        columns: ['Stage', 'Count', 'Conversion %'],
        rows: []
      },
      'offer-dropout': {
        kpis: [{
          label: 'Offers Made',
          value: 31
        }, {
          label: 'Accepted',
          value: 24
        }, {
          label: 'Dropouts',
          value: 7
        }, {
          label: 'Dropout Rate',
          value: '22.6%'
        }],
        columns: ['Candidate', 'Requisition', 'Offer Date', 'Outcome', 'Reason'],
        rows: []
      },
      'time-to-hire': {
        kpis: [{
          label: 'Avg TAT (days)',
          value: 38
        }, {
          label: 'Fastest',
          value: 12
        }, {
          label: 'Slowest',
          value: 91
        }],
        columns: ['Requisition', 'Department', 'Open Date', 'Close Date', 'TAT Days'],
        rows: []
      },
      'source-effectiveness': {
        kpis: [{
          label: 'Sources Used',
          value: 8
        }, {
          label: 'Top Source',
          value: 'LinkedIn'
        }, {
          label: 'Best Joining Rate',
          value: 'Referral 78%'
        }],
        columns: ['Source', 'Submissions', 'Joinings', 'Joining Rate'],
        rows: []
      },
      'budget-utilisation': {
        kpis: [{
          label: 'Total Budget',
          value: '£2.5M'
        }, {
          label: 'Spent',
          value: '£1.1M'
        }, {
          label: 'Utilisation',
          value: '44%'
        }],
        columns: ['Department', 'Allocated', 'Spent', 'Remaining', 'Utilisation %'],
        rows: []
      },
      'recruiter-productivity': {
        kpis: [{
          label: 'Active Recruiters',
          value: 8
        }, {
          label: 'Avg Submissions/mo',
          value: 28
        }, {
          label: 'Avg Joinings/mo',
          value: 6
        }],
        columns: ['Recruiter', 'Submissions', 'Selections', 'Joinings', 'Avg TAJ (days)'],
        rows: []
      },
      'sla-compliance': {
        kpis: [{
          label: 'On Track',
          value: 14
        }, {
          label: 'Warning',
          value: 6
        }, {
          label: 'Overdue',
          value: 4
        }],
        columns: ['Requisition', 'Stage', 'Days in Stage', 'Target Days', 'Status'],
        rows: []
      },
      'diversity-hiring': {
        kpis: [{
          label: 'Total Hires',
          value: 18
        }, {
          label: 'Dept Coverage',
          value: 6
        }],
        columns: ['Department', 'Headcount Hired', 'Permanent', 'Contract', 'Intern'],
        rows: []
      },
      'talent-pool-health': {
        kpis: [{
          label: 'Pool Size',
          value: 142
        }, {
          label: 'Active',
          value: 89
        }, {
          label: 'DoNotContact',
          value: 12
        }],
        columns: ['Candidate', 'Tags', 'Status', 'Last Contacted'],
        rows: []
      },
      'internal-mobility': {
        kpis: [{
          label: 'Postings',
          value: 9
        }, {
          label: 'Applications',
          value: 31
        }, {
          label: 'Filled Internally',
          value: 5
        }],
        columns: ['Posting', 'Department', 'Applications', 'Status'],
        rows: []
      }
    };
    return mockMap[type] || {
      kpis: [],
      columns: [],
      rows: []
    };
  }
  static {
    this.ɵfac = function ReportsComponent_Factory(t) {
      return new (t || ReportsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: ReportsComponent,
      selectors: [["app-reports"]],
      decls: 14,
      vars: 7,
      consts: [[1, "stack-page"], [1, "card", 2, "padding", "20px 24px"], [2, "margin", "0 0 4px", "font-size", "20px", "font-weight", "700"], [2, "margin", "0 0 20px", "color", "#64748b", "font-size", "13px"], [2, "display", "grid", "grid-template-columns", "repeat(auto-fill,minmax(200px,1fr))", "gap", "10px", "margin-bottom", "24px"], ["style", "padding:14px 16px;border-radius:10px;cursor:pointer;transition:all .15s", 3, "border", "background", "click", 4, "ngFor", "ngForOf"], ["style", "display:flex;align-items:center;gap:12px;margin-bottom:20px", 4, "ngIf"], ["style", "display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;margin-bottom:20px", 4, "ngIf"], ["style", "background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:10px;padding:24px;margin-bottom:20px;text-align:center;min-height:140px;display:flex;align-items:center;justify-content:center", 4, "ngIf"], ["style", "overflow-x:auto", 4, "ngIf"], ["style", "padding:32px;text-align:center;color:#94a3b8", 4, "ngIf"], ["style", "padding:40px;text-align:center;color:#94a3b8", 4, "ngIf"], [2, "padding", "14px 16px", "border-radius", "10px", "cursor", "pointer", "transition", "all .15s", 3, "click"], [2, "font-size", "20px", "margin-bottom", "6px"], [2, "font-size", "13px", "font-weight", "600", "color", "#0f172a"], [2, "display", "flex", "align-items", "center", "gap", "12px", "margin-bottom", "20px"], [2, "font-size", "13px", "font-weight", "600"], ["type", "date", 1, "input", 2, "width", "160px", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-primary", 3, "click", "disabled"], ["class", "btn btn-secondary", 3, "click", 4, "ngIf"], [1, "btn", "btn-secondary", 3, "click"], [2, "display", "grid", "grid-template-columns", "repeat(auto-fill,minmax(160px,1fr))", "gap", "12px", "margin-bottom", "20px"], ["class", "card", "style", "text-align:center;padding:16px 12px;background:#f8fafc;border:1.5px solid #e2e8f0", 4, "ngFor", "ngForOf"], [1, "card", 2, "text-align", "center", "padding", "16px 12px", "background", "#f8fafc", "border", "1.5px solid #e2e8f0"], [2, "font-size", "24px", "font-weight", "800", "color", "#6b4df0"], [2, "font-size", "12px", "color", "#64748b", "margin-top", "4px"], [2, "background", "#f8fafc", "border", "1.5px solid #e2e8f0", "border-radius", "10px", "padding", "24px", "margin-bottom", "20px", "text-align", "center", "min-height", "140px", "display", "flex", "align-items", "center", "justify-content", "center"], [2, "font-size", "32px", "margin-bottom", "8px"], [2, "color", "#64748b", "font-size", "13px"], [2, "color", "#94a3b8", "font-size", "12px", "margin-top", "4px"], [2, "overflow-x", "auto"], [2, "width", "100%", "border-collapse", "collapse", "font-size", "13px"], [2, "border-bottom", "2px solid #e2e8f0", "text-align", "left"], ["style", "padding:10px 8px;font-weight:700;color:#475569", 4, "ngFor", "ngForOf"], ["style", "border-bottom:1px solid #f1f5f9", 4, "ngFor", "ngForOf"], [2, "padding", "10px 8px", "font-weight", "700", "color", "#475569"], [2, "border-bottom", "1px solid #f1f5f9"], ["style", "padding:9px 8px", 4, "ngFor", "ngForOf"], [2, "padding", "9px 8px"], [2, "padding", "32px", "text-align", "center", "color", "#94a3b8"], [2, "padding", "40px", "text-align", "center", "color", "#94a3b8"]],
      template: function ReportsComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "section", 0)(1, "div", 1)(2, "h2", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Reports");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "p", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Select a report type to view KPIs, charts and detailed data.");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, ReportsComponent_div_7_Template, 5, 6, "div", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, ReportsComponent_div_8_Template, 11, 6, "div", 6)(9, ReportsComponent_div_9_Template, 2, 1, "div", 7)(10, ReportsComponent_div_10_Template, 8, 3, "div", 8)(11, ReportsComponent_div_11_Template, 7, 2, "div", 9)(12, ReportsComponent_div_12_Template, 2, 0, "div", 10)(13, ReportsComponent_div_13_Template, 2, 0, "div", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.reportTypes);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.selected);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.reportData);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.reportData);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.reportData && (ctx.reportData.rows == null ? null : ctx.reportData.rows.length));
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.reportData && !(ctx.reportData.rows == null ? null : ctx.reportData.rows.length));
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.selected);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel],
      encapsulation: 2
    });
  }
}

/***/ }),

/***/ 4776:
/*!********************************************************!*\
  !*** ./src/app/requisitions/requisitions.component.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RequisitionsComponent: () => (/* binding */ RequisitionsComponent)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);





function RequisitionsComponent_option_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "option");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const d_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](d_r1);
  }
}
function RequisitionsComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Request submitted for approval.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function RequisitionsComponent_button_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function RequisitionsComponent_button_29_Template_button_click_0_listener() {
      const s_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r2).$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      ctx_r3.statusFilter = s_r3;
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r3.load());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const s_r3 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("active", ctx_r3.statusFilter === s_r3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](s_r3 || "All");
  }
}
function RequisitionsComponent_div_30_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 25)(1, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function RequisitionsComponent_div_30_div_10_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r5);
      const r_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r3.approve(r_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Approve");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function RequisitionsComponent_div_30_div_10_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r5);
      const r_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r3.reject(r_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Reject");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
function RequisitionsComponent_div_30_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 20)(1, "div", 21)(2, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](10, RequisitionsComponent_div_30_div_10_Template, 5, 0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const r_r6 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](r_r6.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("", r_r6.department, " \u00B7 ", r_r6.headcount, " position(s)");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("background", ctx_r3.priorityColour(r_r6.priority));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](r_r6.priority);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("color", ctx_r3.statusTextColour(r_r6.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](r_r6.status);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", r_r6.status === "Pending");
  }
}
function RequisitionsComponent_div_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "No requisitions found.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
class RequisitionsComponent {
  constructor(http) {
    this.http = http;
    this.requisitions = [];
    this.saving = false;
    this.saveOk = false;
    this.statusFilter = '';
    this.statusFilters = ['', 'Pending', 'Approved', 'Rejected', 'Filled'];
    this.departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Operations'];
    this.form = {
      title: '',
      department: 'Engineering',
      headcount: 1,
      budgetMin: null,
      budgetMax: null,
      priority: 'Medium',
      justification: ''
    };
  }
  ngOnInit() {
    this.load();
  }
  load() {
    const q = this.statusFilter ? `?status=${this.statusFilter}` : '';
    this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/requisitions${q}`).subscribe({
      next: d => this.requisitions = d,
      error: () => {}
    });
  }
  create() {
    this.saving = true;
    this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/requisitions`, this.form).subscribe({
      next: r => {
        this.requisitions = [r, ...this.requisitions];
        this.saving = false;
        this.saveOk = true;
      },
      error: () => {
        this.saving = false;
      }
    });
  }
  approve(id) {
    this.http.put(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/requisitions/${id}/approve`, {}).subscribe({
      next: () => this.load(),
      error: () => {}
    });
  }
  reject(id) {
    const reason = prompt('Rejection reason:');
    if (!reason) return;
    this.http.put(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/requisitions/${id}/reject`, {
      reason
    }).subscribe({
      next: () => this.load(),
      error: () => {}
    });
  }
  priorityColour(p) {
    return p === 'Critical' ? '#fee2e2' : p === 'High' ? '#fef3c7' : '#f1f5f9';
  }
  statusTextColour(s) {
    return s === 'Approved' ? '#065f46' : s === 'Rejected' ? '#991b1b' : 'var(--text)';
  }
  static {
    this.ɵfac = function RequisitionsComponent_Factory(t) {
      return new (t || RequisitionsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: RequisitionsComponent,
      selectors: [["app-requisitions"]],
      decls: 32,
      vars: 14,
      consts: [[1, "stack-page"], [1, "grid", "grid-cols-2", "gap-6"], [1, "card", "form-card"], ["placeholder", "Job title", 1, "input", 3, "ngModelChange", "ngModel"], [1, "select", 3, "ngModelChange", "ngModel"], [4, "ngFor", "ngForOf"], ["type", "number", "placeholder", "Headcount", 1, "input", 3, "ngModelChange", "ngModel"], [2, "display", "flex", "gap", "8px"], ["type", "number", "placeholder", "Min salary", 1, "input", 2, "flex", "1", 3, "ngModelChange", "ngModel"], ["type", "number", "placeholder", "Max salary", 1, "input", 2, "flex", "1", 3, "ngModelChange", "ngModel"], ["rows", "3", "placeholder", "Justification\u2026", 1, "textarea", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-primary", 3, "click", "disabled"], ["style", "color:#10b981;margin-top:8px;", 4, "ngIf"], [1, "card"], [2, "display", "flex", "gap", "8px", "margin-bottom", "12px", "flex-wrap", "wrap"], ["class", "btn btn-ghost btn-sm", 3, "active", "click", 4, "ngFor", "ngForOf"], ["class", "req-row", 4, "ngFor", "ngForOf"], ["style", "color:var(--text-3);text-align:center;padding:20px;", 4, "ngIf"], [2, "color", "#10b981", "margin-top", "8px"], [1, "btn", "btn-ghost", "btn-sm", 3, "click"], [1, "req-row"], [1, "req-info"], [2, "font-size", "12px", "color", "var(--text-3)"], [1, "chip"], ["style", "display:flex;gap:4px;", 4, "ngIf"], [2, "display", "flex", "gap", "4px"], [1, "btn", "btn-primary", "btn-sm", 3, "click"], [2, "color", "var(--text-3)", "text-align", "center", "padding", "20px"]],
      template: function RequisitionsComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "New Headcount Request");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "input", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function RequisitionsComponent_Template_input_ngModelChange_5_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.form.title, $event) || (ctx.form.title = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "select", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function RequisitionsComponent_Template_select_ngModelChange_6_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.form.department, $event) || (ctx.form.department = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, RequisitionsComponent_option_7_Template, 2, 1, "option", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "input", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function RequisitionsComponent_Template_input_ngModelChange_8_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.form.headcount, $event) || (ctx.form.headcount = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 7)(10, "input", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function RequisitionsComponent_Template_input_ngModelChange_10_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.form.budgetMin, $event) || (ctx.form.budgetMin = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "input", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function RequisitionsComponent_Template_input_ngModelChange_11_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.form.budgetMax, $event) || (ctx.form.budgetMax = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "select", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function RequisitionsComponent_Template_select_ngModelChange_12_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.form.priority, $event) || (ctx.form.priority = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "option");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "Low");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "option");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "Medium");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "option");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "High");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "option");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](20, "Critical");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "textarea", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function RequisitionsComponent_Template_textarea_ngModelChange_21_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.form.justification, $event) || (ctx.form.justification = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "button", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function RequisitionsComponent_Template_button_click_22_listener() {
            return ctx.create();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](24, RequisitionsComponent_div_24_Template, 2, 0, "div", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "div", 13)(26, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](27, "Requisitions");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "div", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](29, RequisitionsComponent_button_29_Template, 2, 3, "button", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](30, RequisitionsComponent_div_30_Template, 11, 10, "div", 16)(31, RequisitionsComponent_div_31_Template, 2, 0, "div", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.form.title);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.form.department);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.departments);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.form.headcount);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.form.budgetMin);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.form.budgetMax);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.form.priority);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.form.justification);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx.saving);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.saving ? "Submitting\u2026" : "Submit Request", " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.saveOk);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.statusFilters);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.requisitions);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.requisitions.length);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel],
      styles: [".req-row[_ngcontent-%COMP%] { display:flex; align-items:center; gap:10px; padding:10px 0; border-bottom:1px solid var(--border); flex-wrap:wrap; }\n    .req-info[_ngcontent-%COMP%] { flex:1; display:flex; flex-direction:column; gap:2px; }\n    .btn.active[_ngcontent-%COMP%] { background:var(--brand); color:#fff; }\n  \n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcmVxdWlzaXRpb25zL3JlcXVpc2l0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtJQUNJLFdBQVcsWUFBWSxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUscUNBQXFDLEVBQUUsY0FBYyxFQUFFO0lBQzlILFlBQVksTUFBTSxFQUFFLFlBQVksRUFBRSxxQkFBcUIsRUFBRSxPQUFPLEVBQUU7SUFDbEUsY0FBYyx1QkFBdUIsRUFBRSxVQUFVLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAucmVxLXJvdyB7IGRpc3BsYXk6ZmxleDsgYWxpZ24taXRlbXM6Y2VudGVyOyBnYXA6MTBweDsgcGFkZGluZzoxMHB4IDA7IGJvcmRlci1ib3R0b206MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7IGZsZXgtd3JhcDp3cmFwOyB9XG4gICAgLnJlcS1pbmZvIHsgZmxleDoxOyBkaXNwbGF5OmZsZXg7IGZsZXgtZGlyZWN0aW9uOmNvbHVtbjsgZ2FwOjJweDsgfVxuICAgIC5idG4uYWN0aXZlIHsgYmFja2dyb3VuZDp2YXIoLS1icmFuZCk7IGNvbG9yOiNmZmY7IH1cbiAgIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 1380:
/*!**********************************************************!*\
  !*** ./src/app/resume-parser/resume-parser.component.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ResumeParserComponent: () => (/* binding */ ResumeParserComponent)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 4456);






const _c0 = ["fileInput"];
function ResumeParserComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 15)(1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "\uD83D\uDCCE");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Drop file here or ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "browse");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "PDF \u00B7 DOCX \u00B7 DOC \u00B7 JPG \u00B7 PNG");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
function ResumeParserComponent_div_10_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "\u23F3 Extracting...");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function ResumeParserComponent_div_10_span_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "\u2714 Text ready");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function ResumeParserComponent_div_10_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ResumeParserComponent_div_10_button_10_Template_button_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r3.clearFile($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "\u2715");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function ResumeParserComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 20)(1, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div")(4, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, ResumeParserComponent_div_10_span_8_Template, 2, 0, "span", 24)(9, ResumeParserComponent_div_10_span_9_Template, 2, 0, "span", 25)(10, ResumeParserComponent_div_10_button_10_Template, 2, 0, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r3.fileIcon);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r3.selectedFile.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r3.fileSizeLabel);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r3.extracting);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r3.extracting && ctx_r3.cvText);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r3.extracting);
  }
}
function ResumeParserComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("\u26A0 ", ctx_r3.extractError, "");
  }
}
function ResumeParserComponent_span_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "\u26A1 Parse Resume");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function ResumeParserComponent_span_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "\uD83D\uDD04 Parsing...");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function ResumeParserComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r3.parseError);
  }
}
function ResumeParserComponent_div_20_p_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "p", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r3.result.summary);
  }
}
function ResumeParserComponent_div_20_div_10_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const s_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](s_r6);
  }
}
function ResumeParserComponent_div_20_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 42)(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Skills");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, ResumeParserComponent_div_20_div_10_span_4_Template, 2, 1, "span", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r3.result.skills);
  }
}
function ResumeParserComponent_div_20_div_11_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 47)(1, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "span", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const e_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("", e_r7.title, " @ ", e_r7.company, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("", e_r7.startDate, " \u2013 ", e_r7.endDate, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](e_r7.description);
  }
}
function ResumeParserComponent_div_20_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 42)(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Experience");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, ResumeParserComponent_div_20_div_11_div_3_Template, 7, 5, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r3.result.experience);
  }
}
function ResumeParserComponent_div_20_div_12_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 51)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const e_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](e_r8.institution);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate3"]("", e_r8.degree, " ", e_r8.field, " (", e_r8.graduationYear, ")");
  }
}
function ResumeParserComponent_div_20_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 42)(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Education");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, ResumeParserComponent_div_20_div_12_div_3_Template, 5, 4, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r3.result.educationHistory);
  }
}
function ResumeParserComponent_div_20_div_13_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const c_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](c_r9);
  }
}
function ResumeParserComponent_div_20_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div")(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Certifications");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, ResumeParserComponent_div_20_div_13_span_4_Template, 2, 1, "span", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r3.result.certifications);
  }
}
function ResumeParserComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 32)(1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Parsed Result");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 33)(4, "div")(5, "h3", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "p", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, ResumeParserComponent_div_20_p_9_Template, 2, 1, "p", 36)(10, ResumeParserComponent_div_20_div_10_Template, 5, 1, "div", 37)(11, ResumeParserComponent_div_20_div_11_Template, 4, 1, "div", 37)(12, ResumeParserComponent_div_20_div_12_Template, 4, 1, "div", 37)(13, ResumeParserComponent_div_20_div_13_Template, 5, 1, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 38)(15, "button", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ResumeParserComponent_div_20_Template_button_click_15_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r5);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r3.runScorecard());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "Run AI Scorecard");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "button", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ResumeParserComponent_div_20_Template_button_click_17_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r5);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r3.saveToDatabase());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "Save to CV Database");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r3.result.fullName);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("", ctx_r3.result.email, " \u00A0\u00B7\u00A0 ", ctx_r3.result.phone, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r3.result.summary);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r3.result.skills == null ? null : ctx_r3.result.skills.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r3.result.experience == null ? null : ctx_r3.result.experience.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r3.result.educationHistory == null ? null : ctx_r3.result.educationHistory.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r3.result.certifications == null ? null : ctx_r3.result.certifications.length);
  }
}
class ResumeParserComponent {
  constructor(http, router) {
    this.http = http;
    this.router = router;
    this.cvText = '';
    this.parsing = false;
    this.result = null;
    this.parseError = '';
    this.selectedFile = null;
    this.extracting = false;
    this.extractError = '';
    this.isDragOver = false;
  }
  get fileIcon() {
    const ext = this.selectedFile?.name.split('.').pop()?.toLowerCase() ?? '';
    return {
      pdf: '📄',
      docx: '📝',
      doc: '📝',
      jpg: '🖼️',
      jpeg: '🖼️',
      png: '🖼️'
    }[ext] ?? '📎';
  }
  get fileSizeLabel() {
    if (!this.selectedFile) return '';
    const kb = this.selectedFile.size / 1024;
    return kb > 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${Math.round(kb)} KB`;
  }
  onDragOver(event) {
    event.preventDefault();
    this.isDragOver = true;
  }
  onDrop(event) {
    event.preventDefault();
    this.isDragOver = false;
    const file = event.dataTransfer?.files[0];
    if (file) this.extractFromFile(file);
  }
  onFileSelect(event) {
    const file = event.target.files?.[0];
    if (file) this.extractFromFile(file);
  }
  clearFile(event) {
    event.stopPropagation();
    this.selectedFile = null;
    this.cvText = '';
    this.extractError = '';
    if (this.fileInput?.nativeElement) this.fileInput.nativeElement.value = '';
  }
  extractFromFile(file) {
    this.selectedFile = file;
    this.extracting = true;
    this.extractError = '';
    this.cvText = '';
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/resume-parser/extract-text`, {
        fileData: base64,
        fileName: file.name,
        mimeType: file.type
      }).subscribe({
        next: r => {
          this.cvText = r.text;
          this.extracting = false;
        },
        error: err => {
          this.extractError = err?.error?.error ?? 'Failed to extract text from file';
          this.extracting = false;
        }
      });
    };
    reader.readAsDataURL(file);
  }
  parse() {
    this.parsing = true;
    this.parseError = '';
    this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/resume-parser/parse`, {
      cvText: this.cvText
    }).subscribe({
      next: r => {
        this.result = r;
        this.parsing = false;
      },
      error: err => {
        this.parseError = err?.error?.error ?? 'Parse failed';
        this.parsing = false;
      }
    });
  }
  runScorecard() {
    this.router.navigate(['/ai-scorecard'], {
      state: {
        resumeText: this.cvText
      }
    });
  }
  saveToDatabase() {
    if (!this.result) return;
    const payload = {
      name: this.result.fullName,
      email: this.result.email,
      skillsText: (this.result.skills ?? []).join(', '),
      cvText: this.cvText
    };
    this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/cv-database`, payload).subscribe({
      next: () => alert('Saved to CV Database'),
      error: () => alert('Save failed')
    });
  }
  static {
    this.ɵfac = function ResumeParserComponent_Factory(t) {
      return new (t || ResumeParserComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: ResumeParserComponent,
      selectors: [["app-resume-parser"]],
      viewQuery: function ResumeParserComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 5);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.fileInput = _t.first);
        }
      },
      decls: 21,
      vars: 13,
      consts: [["fileInput", ""], [1, "stack-page"], [1, "card", "form-card"], [2, "color", "var(--text-3)", "margin-bottom", "16px"], [1, "upload-zone", 3, "click", "dragover", "dragleave", "drop"], ["type", "file", "accept", ".pdf,.docx,.doc,.jpg,.jpeg,.png", 2, "display", "none", 3, "change"], ["class", "dz-idle", 4, "ngIf"], ["class", "dz-file-info", 4, "ngIf"], ["style", "color:#ef4444;font-size:13px;margin-top:6px;", 4, "ngIf"], [1, "or-divider"], ["rows", "8", "placeholder", "Paste CV / resume text here...", 1, "textarea", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-primary", 2, "margin-top", "12px", 3, "click", "disabled"], [4, "ngIf"], ["style", "color:#ef4444;margin-top:8px;", 4, "ngIf"], ["class", "card", 4, "ngIf"], [1, "dz-idle"], [1, "dz-icon"], [1, "dz-label"], [1, "dz-link"], [1, "dz-hint"], [1, "dz-file-info"], [1, "dz-file-icon"], [2, "font-weight", "600", "font-size", "14px"], [2, "font-size", "12px", "color", "var(--text-3)"], ["class", "dz-spinner", 4, "ngIf"], ["style", "color:#10b981;font-size:13px;margin-left:auto;", 4, "ngIf"], ["class", "dz-remove", 3, "click", 4, "ngIf"], [1, "dz-spinner"], [2, "color", "#10b981", "font-size", "13px", "margin-left", "auto"], [1, "dz-remove", 3, "click"], [2, "color", "#ef4444", "font-size", "13px", "margin-top", "6px"], [2, "color", "#ef4444", "margin-top", "8px"], [1, "card"], [1, "candidate-head", 2, "margin-bottom", "16px"], [2, "margin", "0"], [2, "margin", "4px 0 0", "color", "var(--text-3)"], ["style", "margin-bottom:16px;", 4, "ngIf"], ["class", "mb-4", 4, "ngIf"], [2, "display", "flex", "gap", "12px", "margin-top", "20px"], [1, "btn", "btn-primary", 3, "click"], [1, "btn", "btn-secondary", 3, "click"], [2, "margin-bottom", "16px"], [1, "mb-4"], [2, "display", "flex", "flex-wrap", "wrap", "gap", "6px", "margin-top", "8px"], ["class", "chip chip-brand", 4, "ngFor", "ngForOf"], [1, "chip", "chip-brand"], ["class", "metric-line", "style", "flex-direction:column;align-items:flex-start;gap:2px;padding:8px 0;border-bottom:1px solid var(--border);", 4, "ngFor", "ngForOf"], [1, "metric-line", 2, "flex-direction", "column", "align-items", "flex-start", "gap", "2px", "padding", "8px 0", "border-bottom", "1px solid var(--border)"], [2, "color", "var(--text-3)", "font-size", "12px"], [2, "font-size", "13px"], ["class", "metric-line", 4, "ngFor", "ngForOf"], [1, "metric-line"], ["class", "chip", 4, "ngFor", "ngForOf"], [1, "chip"]],
      template: function ResumeParserComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "section", 1)(1, "div", 2)(2, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Resume Parser");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "p", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Upload a resume file or paste text to extract structured candidate data using AI.");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ResumeParserComponent_Template_div_click_6_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
            const fileInput_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](8);
            return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](fileInput_r2.click());
          })("dragover", function ResumeParserComponent_Template_div_dragover_6_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx.onDragOver($event));
          })("dragleave", function ResumeParserComponent_Template_div_dragleave_6_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx.isDragOver = false);
          })("drop", function ResumeParserComponent_Template_div_drop_6_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx.onDrop($event));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "input", 5, 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function ResumeParserComponent_Template_input_change_7_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx.onFileSelect($event));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, ResumeParserComponent_div_9_Template, 9, 0, "div", 6)(10, ResumeParserComponent_div_10_Template, 11, 6, "div", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, ResumeParserComponent_div_11_Template, 2, 1, "div", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 9)(13, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "or paste text below");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "textarea", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function ResumeParserComponent_Template_textarea_ngModelChange_15_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.cvText, $event) || (ctx.cvText = $event);
            return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "button", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ResumeParserComponent_Template_button_click_16_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx.parse());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](17, ResumeParserComponent_span_17_Template, 2, 0, "span", 12)(18, ResumeParserComponent_span_18_Template, 2, 0, "span", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](19, ResumeParserComponent_div_19_Template, 2, 1, "div", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](20, ResumeParserComponent_div_20_Template, 19, 8, "div", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("dz-hover", ctx.isDragOver)("dz-loaded", !!ctx.selectedFile);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.selectedFile);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.selectedFile);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.extractError);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.cvText);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx.parsing || ctx.extracting || !ctx.cvText.trim());
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.parsing);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.parsing);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.parseError);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.result);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel],
      styles: [".upload-zone[_ngcontent-%COMP%] {\n        border: 2px dashed var(--border-strong);\n        border-radius: 10px;\n        padding: 24px;\n        cursor: pointer;\n        transition: border-color 0.2s, background 0.2s;\n        background: var(--surface-alt);\n        margin-bottom: 4px;\n      }\n      .upload-zone[_ngcontent-%COMP%]:hover, .upload-zone.dz-hover[_ngcontent-%COMP%] {\n        border-color: var(--brand-violet-500);\n        background: var(--brand-violet-50, #f4f1ff);\n      }\n      .upload-zone.dz-loaded[_ngcontent-%COMP%] {\n        border-style: solid;\n        border-color: var(--brand-violet-400);\n        background: var(--brand-violet-50, #f4f1ff);\n      }\n      .dz-idle[_ngcontent-%COMP%] { text-align: center; }\n      .dz-icon[_ngcontent-%COMP%] { font-size: 36px; margin-bottom: 8px; }\n      .dz-label[_ngcontent-%COMP%] { font-size: 15px; color: var(--text-2); }\n      .dz-link[_ngcontent-%COMP%] { color: var(--brand-violet-500); font-weight: 600; }\n      .dz-hint[_ngcontent-%COMP%] { font-size: 12px; color: var(--text-3); margin-top: 4px; }\n      .dz-file-info[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 12px; }\n      .dz-file-icon[_ngcontent-%COMP%] { font-size: 28px; }\n      .dz-spinner[_ngcontent-%COMP%] { color: var(--text-3); font-size: 13px; margin-left: auto; }\n      .dz-remove[_ngcontent-%COMP%] {\n        margin-left: auto; background: none; border: none; cursor: pointer;\n        font-size: 16px; color: var(--text-3); padding: 4px 8px; border-radius: 4px;\n      }\n      .dz-remove[_ngcontent-%COMP%]:hover { background: var(--n-100); color: var(--danger-500); }\n      .or-divider[_ngcontent-%COMP%] {\n        display: flex; align-items: center; gap: 12px;\n        color: var(--text-3); font-size: 13px; margin: 14px 0 10px;\n      }\n      .or-divider[_ngcontent-%COMP%]::before, .or-divider[_ngcontent-%COMP%]::after {\n        content: ''; flex: 1; height: 1px; background: var(--border);\n      }"]
    });
  }
}

/***/ }),

/***/ 4796:
/*!******************************************!*\
  !*** ./src/app/services/auth.service.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthService: () => (/* binding */ AuthService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 5797);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 8764);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 6443);




class AuthService {
  constructor(http) {
    this.http = http;
    this.apiUrl = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/auth`;
    this.currentUserSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(this.getStoredUser());
    this.currentUser$ = this.currentUserSubject.asObservable();
  }
  login(email, password) {
    return this.http.post(`${this.apiUrl}/login`, {
      email,
      password
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.tap)(result => this.setSession(result.token, result.user)));
  }
  guestLogin() {
    return this.http.post(`${this.apiUrl}/guest`, {}).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.tap)(result => this.setSession(result.token, result.user)));
  }
  getToken() {
    return localStorage.getItem('authToken');
  }
  getCurrentUser() {
    return this.currentUserSubject.value;
  }
  can(accessKey) {
    const user = this.currentUserSubject.value;
    return !!user && (user.role === 'SuperAdmin' || user.access.includes(accessKey));
  }
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  setSession(token, user) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('tenantId', '11111111-1111-1111-1111-111111111111');
    this.currentUserSubject.next(user);
  }
  getStoredUser() {
    const raw = localStorage.getItem('currentUser');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  static {
    this.ɵfac = function AuthService_Factory(t) {
      return new (t || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
      token: AuthService,
      factory: AuthService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 8260:
/*!********************************************!*\
  !*** ./src/app/services/vendor.service.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VendorService: () => (/* binding */ VendorService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);




class VendorService {
  constructor(http) {
    this.http = http;
    this.apiUrl = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/vendors`;
  }
  getAllVendors(tenantId) {
    return this.http.get(`${this.apiUrl}?tenantId=${tenantId}`);
  }
  getVendorById(id) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  createVendor(vendor) {
    return this.http.post(this.apiUrl, vendor);
  }
  updateVendor(id, vendor) {
    return this.http.put(`${this.apiUrl}/${id}`, vendor);
  }
  deleteVendor(id) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getVendorPerformanceMetrics(tenantId) {
    return this.http.get(`${this.apiUrl}/performance-metrics?tenantId=${tenantId}`);
  }
  getVendorsByStatus(status, tenantId) {
    let params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpParams().set('status', status).set('tenantId', tenantId);
    return this.http.get(`${this.apiUrl}/by-status`, {
      params
    });
  }
  static {
    this.ɵfac = function VendorService_Factory(t) {
      return new (t || VendorService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
      token: VendorService,
      factory: VendorService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 4536:
/*!**********************************************************!*\
  !*** ./src/app/sla-dashboard/sla-dashboard.component.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SlaDashboardComponent: () => (/* binding */ SlaDashboardComponent)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);




function SlaDashboardComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 8)(1, "p", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Loading SLA data...");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
function SlaDashboardComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" \u26A0 ", ctx_r0.error, " ");
  }
}
function SlaDashboardComponent_ng_container_11_div_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 8)(1, "p", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "No SLA records found for this tenant.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
function SlaDashboardComponent_ng_container_11_div_23_tr_19_span_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const t_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](2, 1, t_r2.predictedCompletionDate, "MMM d, y"), " ");
  }
}
function SlaDashboardComponent_ng_container_11_div_23_tr_19_span_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "\u2014");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function SlaDashboardComponent_ng_container_11_div_23_tr_19_span_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const t_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](2, 1, t_r2.predictionConfidence * 100, "1.0-0"), "%");
  }
}
function SlaDashboardComponent_ng_container_11_div_23_tr_19_span_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "\u2014");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function SlaDashboardComponent_ng_container_11_div_23_tr_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "tr")(1, "td")(2, "small", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](4, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "td")(6, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "td", 23)(11, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "td")(14, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](17, SlaDashboardComponent_ng_container_11_div_23_tr_19_span_17_Template, 3, 4, "span", 7)(18, SlaDashboardComponent_ng_container_11_div_23_tr_19_span_18_Template, 2, 0, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](20, SlaDashboardComponent_ng_container_11_div_23_tr_19_span_20_Template, 3, 4, "span", 7)(21, SlaDashboardComponent_ng_container_11_div_23_tr_19_span_21_Template, 2, 0, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const t_r2 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind3"](4, 14, t_r2.requirementId, 0, 8), "\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](t_r2.stage);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("", t_r2.daysInStage, " / ", t_r2.targetDays, " days");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("width", ctx_r0.slaProgress(t_r2), "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", t_r2.status === "OnTrack" ? "high" : t_r2.status === "Warning" ? "medium" : "low");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", ctx_r0.getSlaClass(t_r2.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"](" ", ctx_r0.getSlaEmoji(t_r2.status), " ", t_r2.status, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", t_r2.predictedCompletionDate);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !t_r2.predictedCompletionDate);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", t_r2.predictionConfidence > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", t_r2.predictionConfidence === 0);
  }
}
function SlaDashboardComponent_ng_container_11_div_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 20)(1, "table", 21)(2, "thead")(3, "tr")(4, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Requirement");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Stage");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Days in Stage");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Progress");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Status");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Predicted Completion");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "Confidence");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](19, SlaDashboardComponent_ng_container_11_div_23_tr_19_Template, 22, 18, "tr", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.tracks);
  }
}
function SlaDashboardComponent_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 11)(2, "div", 12)(3, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "On Track");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 12)(8, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Warning");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 12)(13, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "Overdue");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "div", 12)(18, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21, "Total Tracked");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](22, SlaDashboardComponent_ng_container_11_div_22_Template, 3, 0, "div", 5)(23, SlaDashboardComponent_ng_container_11_div_23_Template, 20, 1, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r0.onTrackCount);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r0.warningCount);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r0.overdueCount);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r0.tracks.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.tracks.length === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r0.tracks.length > 0);
  }
}
class SlaDashboardComponent {
  get onTrackCount() {
    return this.tracks.filter(t => t.status === 'OnTrack').length;
  }
  get warningCount() {
    return this.tracks.filter(t => t.status === 'Warning').length;
  }
  get overdueCount() {
    return this.tracks.filter(t => t.status === 'Overdue').length;
  }
  constructor(http) {
    this.http = http;
    this.tracks = [];
    this.loading = true;
    this.error = '';
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading = true;
    this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/aiagents/sla-dashboard`).subscribe({
      next: data => {
        this.tracks = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load SLA data.';
        this.loading = false;
      }
    });
  }
  getSlaClass(status) {
    return status === 'OnTrack' ? 'on-track' : status === 'Warning' ? 'warning' : 'overdue';
  }
  getSlaEmoji(status) {
    return status === 'OnTrack' ? '✅' : status === 'Warning' ? '⚠️' : '🔴';
  }
  slaProgress(t) {
    return Math.min(Math.round(t.daysInStage / t.targetDays * 100), 100);
  }
  static {
    this.ɵfac = function SlaDashboardComponent_Factory(t) {
      return new (t || SlaDashboardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: SlaDashboardComponent,
      selectors: [["app-sla-dashboard"]],
      decls: 12,
      vars: 4,
      consts: [[1, "page-container", "page-enter"], [1, "flex", "justify-between", "items-center", "mb-6"], [1, "page-title"], [1, "text-sm", 2, "color", "var(--text-3)"], [1, "btn", "btn-secondary", 3, "click", "disabled"], ["class", "card text-center", 4, "ngIf"], ["class", "human-review-banner", "style", "border-color:var(--sla-overdue);background:rgba(239,68,68,0.08);color:var(--sla-overdue)", 4, "ngIf"], [4, "ngIf"], [1, "card", "text-center"], [2, "color", "var(--text-3)"], [1, "human-review-banner", 2, "border-color", "var(--sla-overdue)", "background", "rgba(239,68,68,0.08)", "color", "var(--sla-overdue)"], [1, "score-breakdown", "mb-6"], [1, "score-card"], [1, "score-value", 2, "color", "var(--sla-on-track)"], [1, "score-label"], [1, "score-value", 2, "color", "var(--sla-warning)"], [1, "score-value", 2, "color", "var(--sla-overdue)"], [1, "score-value"], ["class", "card", 4, "ngIf"], [2, "color", "var(--text-3)", "padding", "40px 0"], [1, "card"], [1, "table"], [4, "ngFor", "ngForOf"], [2, "min-width", "120px"], [1, "confidence-bar"], [1, "confidence-fill", 3, "ngClass"], [1, "sla-badge", 3, "ngClass"], ["style", "color:var(--text-3)", 4, "ngIf"]],
      template: function SlaDashboardComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "SLA Dashboard");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "p", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Recruitment pipeline SLA tracking");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "button", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function SlaDashboardComponent_Template_button_click_7_listener() {
            return ctx.load();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Refresh");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, SlaDashboardComponent_div_9_Template, 3, 0, "div", 5)(10, SlaDashboardComponent_div_10_Template, 2, 1, "div", 6)(11, SlaDashboardComponent_ng_container_11_Template, 24, 6, "ng-container", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx.loading);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.loading);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.error);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.loading && !ctx.error);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.SlicePipe, _angular_common__WEBPACK_IMPORTED_MODULE_3__.DecimalPipe, _angular_common__WEBPACK_IMPORTED_MODULE_3__.DatePipe],
      encapsulation: 2
    });
  }
}

/***/ }),

/***/ 3652:
/*!**************************************************************!*\
  !*** ./src/app/source-tracking/source-tracking.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SourceTrackingComponent: () => (/* binding */ SourceTrackingComponent)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);





function SourceTrackingComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r0.generatedLink, " ");
  }
}
function SourceTrackingComponent_tr_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "tr")(1, "td")(2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](14, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const row_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](row_r2.source);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](row_r2.applicants);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](row_r2.interviews);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](row_r2.offers);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](row_r2.hires);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](14, 6, row_r2.conversionPct, "1.1-1"), "%");
  }
}
function SourceTrackingComponent_tr_40_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "tr")(1, "td", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "No source data yet.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
class SourceTrackingComponent {
  constructor(http) {
    this.http = http;
    this.summary = [];
    this.baseUrl = '';
    this.utmSource = 'LinkedIn';
    this.generatedLink = '';
  }
  ngOnInit() {
    this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/source-tracking/summary`).subscribe({
      next: d => this.summary = d,
      error: () => {}
    });
  }
  generateLink() {
    if (!this.baseUrl.trim()) return;
    const sep = this.baseUrl.includes('?') ? '&' : '?';
    this.generatedLink = `${this.baseUrl}${sep}utm_source=${encodeURIComponent(this.utmSource)}&utm_medium=job_post&utm_campaign=decypher`;
  }
  static {
    this.ɵfac = function SourceTrackingComponent_Factory(t) {
      return new (t || SourceTrackingComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: SourceTrackingComponent,
      selectors: [["app-source-tracking"]],
      decls: 41,
      vars: 5,
      consts: [[1, "stack-page"], [1, "card", "form-card"], [2, "display", "flex", "gap", "8px"], ["placeholder", "Base job URL", 1, "input", 2, "flex", "1", 3, "ngModelChange", "ngModel"], [1, "select", 2, "flex", "0 0 150px", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-secondary", 3, "click"], ["style", "background:#f8fafc;padding:10px;border-radius:8px;font-size:12px;word-break:break-all;margin-top:8px;", 4, "ngIf"], [1, "card"], [1, "table"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [2, "background", "#f8fafc", "padding", "10px", "border-radius", "8px", "font-size", "12px", "word-break", "break-all", "margin-top", "8px"], ["colspan", "6", 2, "text-align", "center", "color", "var(--text-3)"]],
      template: function SourceTrackingComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "section", 0)(1, "div", 1)(2, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "UTM Tracking Link Generator");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 2)(5, "input", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function SourceTrackingComponent_Template_input_ngModelChange_5_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.baseUrl, $event) || (ctx.baseUrl = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "select", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function SourceTrackingComponent_Template_select_ngModelChange_6_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.utmSource, $event) || (ctx.utmSource = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "option");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "LinkedIn");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "option");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Indeed");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "option");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "Referral");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "option");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "Portal");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "option");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "Agency");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "button", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function SourceTrackingComponent_Template_button_click_17_listener() {
            return ctx.generateLink();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "Generate");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](19, SourceTrackingComponent_div_19_Template, 2, 1, "div", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "div", 7)(21, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22, "Application Source Summary");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "table", 8)(24, "thead")(25, "tr")(26, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](27, "Source");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](29, "Applicants");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](31, "Interviews");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](33, "Offers");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](34, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](35, "Hires");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](36, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](37, "Conversion %");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](38, "tbody");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](39, SourceTrackingComponent_tr_39_Template, 15, 9, "tr", 9)(40, SourceTrackingComponent_tr_40_Template, 3, 0, "tr", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.baseUrl);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.utmSource);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](13);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.generatedLink);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](20);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.summary);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.summary.length);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_3__.DecimalPipe],
      encapsulation: 2
    });
  }
}

/***/ }),

/***/ 4104:
/*!******************************************************!*\
  !*** ./src/app/talent-pool/talent-pool.component.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TalentPoolComponent: () => (/* binding */ TalentPoolComponent)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 4456);





function TalentPoolComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 9)(1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Campaign Composer");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "input", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function TalentPoolComponent_div_7_Template_input_ngModelChange_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r1.campaign.name, $event) || (ctx_r1.campaign.name = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "input", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function TalentPoolComponent_div_7_Template_input_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r1.campaign.tagsText, $event) || (ctx_r1.campaign.tagsText = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "input", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function TalentPoolComponent_div_7_Template_input_ngModelChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r1.campaign.subject, $event) || (ctx_r1.campaign.subject = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "textarea", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function TalentPoolComponent_div_7_Template_textarea_ngModelChange_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx_r1.campaign.messageTemplate, $event) || (ctx_r1.campaign.messageTemplate = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TalentPoolComponent_div_7_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.createCampaign());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.campaign.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.campaign.tagsText);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.campaign.subject);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate1"]("placeholder", "Message (use ", ctx_r1.candidateName, " token)");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.campaign.messageTemplate);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx_r1.savingCampaign);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r1.savingCampaign ? "Creating\u2026" : "Create & Send Campaign", " ");
  }
}
function TalentPoolComponent_article_9_span_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const t_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](t_r3);
  }
}
function TalentPoolComponent_article_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "article", 15)(1, "div", 16)(2, "div")(3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](5, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, TalentPoolComponent_article_9_span_9_Template, 2, 1, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 19)(11, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "Last contacted");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](15, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const e_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind3"](5, 4, e_r4.candidateId, 0, 8), "\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](e_r4.nurtureStatus);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", e_r4.tags);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](e_r4.lastContactedAt ? _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](15, 8, e_r4.lastContactedAt, "d MMM y") : "Never");
  }
}
function TalentPoolComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " No talent pool entries found. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
class TalentPoolComponent {
  constructor(http) {
    this.http = http;
    this.entries = [];
    this.tagFilter = '';
    this.showCampaign = false;
    this.savingCampaign = false;
    this.campaign = {
      name: '',
      tagsText: '',
      subject: '',
      messageTemplate: ''
    };
  }
  ngOnInit() {
    this.load();
  }
  load() {
    const params = this.tagFilter ? `?tag=${encodeURIComponent(this.tagFilter)}` : '';
    this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/talent-pool${params}`).subscribe({
      next: d => this.entries = d,
      error: () => {}
    });
  }
  createCampaign() {
    this.savingCampaign = true;
    const payload = {
      ...this.campaign,
      targetTags: this.campaign.tagsText.split(',').map(t => t.trim()).filter(Boolean)
    };
    this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/talent-pool/campaigns`, payload).subscribe({
      next: r => {
        this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/talent-pool/campaigns/${r.id}/send`, {}).subscribe();
        this.savingCampaign = false;
        this.showCampaign = false;
      },
      error: () => {
        this.savingCampaign = false;
      }
    });
  }
  static {
    this.ɵfac = function TalentPoolComponent_Factory(t) {
      return new (t || TalentPoolComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: TalentPoolComponent,
      selectors: [["app-talent-pool"]],
      decls: 11,
      vars: 5,
      consts: [[1, "stack-page"], [1, "card", "form-row", 2, "margin-bottom", "0"], ["placeholder", "Filter by tag\u2026", 1, "input", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "btn", "btn-secondary", 3, "click"], [1, "btn", "btn-primary", 2, "margin-left", "auto", 3, "click"], ["class", "card form-card", "style", "margin-top:0;", 4, "ngIf"], [1, "cards-grid"], ["class", "card candidate-card", 4, "ngFor", "ngForOf"], ["style", "grid-column:1/-1;text-align:center;color:var(--text-3);padding:40px;", 4, "ngIf"], [1, "card", "form-card", 2, "margin-top", "0"], ["placeholder", "Campaign name", 1, "input", 3, "ngModelChange", "ngModel"], ["placeholder", "Target tags (comma separated)", 1, "input", 3, "ngModelChange", "ngModel"], ["placeholder", "Email subject", 1, "input", 3, "ngModelChange", "ngModel"], ["rows", "4", 1, "textarea", 3, "ngModelChange", "placeholder", "ngModel"], [1, "btn", "btn-primary", 3, "click", "disabled"], [1, "card", "candidate-card"], [1, "candidate-head"], [2, "display", "flex", "flex-wrap", "wrap", "gap", "6px", "margin-top", "8px"], ["class", "chip chip-brand", 4, "ngFor", "ngForOf"], [1, "metric-line", 2, "margin-top", "8px"], [1, "chip", "chip-brand"], [2, "grid-column", "1/-1", "text-align", "center", "color", "var(--text-3)", "padding", "40px"]],
      template: function TalentPoolComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "section", 0)(1, "div", 1)(2, "input", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function TalentPoolComponent_Template_input_ngModelChange_2_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.tagFilter, $event) || (ctx.tagFilter = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("keyup.enter", function TalentPoolComponent_Template_input_keyup_enter_2_listener() {
            return ctx.load();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TalentPoolComponent_Template_button_click_3_listener() {
            return ctx.load();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Filter");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "button", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TalentPoolComponent_Template_button_click_5_listener() {
            return ctx.showCampaign = !ctx.showCampaign;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, TalentPoolComponent_div_7_Template, 9, 8, "div", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, TalentPoolComponent_article_9_Template, 16, 11, "article", 7)(10, TalentPoolComponent_div_10_Template, 2, 0, "div", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.tagFilter);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.showCampaign ? "Cancel" : "+ New Campaign", " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.showCampaign);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.entries);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.entries.length);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_3__.SlicePipe, _angular_common__WEBPACK_IMPORTED_MODULE_3__.DatePipe],
      encapsulation: 2
    });
  }
}

/***/ }),

/***/ 5144:
/*!**********************************************!*\
  !*** ./src/app/vendors/vendors.component.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VendorsComponent: () => (/* binding */ VendorsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_vendor_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/vendor.service */ 8260);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 4456);




function VendorsComponent_tr_55_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "tr")(1, "td")(2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "td")(18, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const vendor_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](vendor_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](vendor_r1.contactPerson);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](vendor_r1.email);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](vendor_r1.requirementsAssigned || 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](vendor_r1.assignedBy || "-");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](vendor_r1.submissions || vendor_r1.totalSubmissions);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](vendor_r1.joinings || vendor_r1.successfulPlacements);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", vendor_r1.qualityScore, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", vendor_r1.slaScore, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](vendor_r1.status);
  }
}
class VendorsComponent {
  constructor(vendorService) {
    this.vendorService = vendorService;
    this.vendors = [];
    this.filteredVendors = [];
    this.avgQualityScore = 0;
    this.submissionsThisMonth = 0;
    this.searchTerm = '';
    this.statusFilter = '';
  }
  ngOnInit() {
    this.loadVendors();
    this.vendorService.getVendorPerformanceMetrics('default').subscribe(metrics => {
      this.avgQualityScore = metrics.avgQualityScore || 0;
      this.submissionsThisMonth = metrics.submissionsThisMonth || 0;
    });
  }
  loadVendors() {
    this.vendorService.getAllVendors('default').subscribe(vendors => {
      this.vendors = vendors;
      this.filteredVendors = vendors;
    });
  }
  applyFilters() {
    const term = this.searchTerm.toLowerCase();
    this.filteredVendors = this.vendors.filter(vendor => {
      const matchesSearch = vendor.name.toLowerCase().includes(term) || vendor.email.toLowerCase().includes(term);
      const matchesStatus = !this.statusFilter || vendor.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }
  static {
    this.ɵfac = function VendorsComponent_Factory(t) {
      return new (t || VendorsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_vendor_service__WEBPACK_IMPORTED_MODULE_0__.VendorService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: VendorsComponent,
      selectors: [["app-vendors"]],
      decls: 56,
      vars: 6,
      consts: [[1, "stack-page"], [1, "kpi-grid"], [1, "kpi-tile"], [1, "kpi-label"], [1, "kpi-value"], [1, "kpi-meta"], [1, "card", "form-row"], ["placeholder", "Search vendors...", 1, "input", 3, "ngModelChange", "input", "ngModel"], [1, "select", 3, "ngModelChange", "change", "ngModel"], ["value", ""], ["value", "Active"], ["value", "Inactive"], [1, "card"], [1, "table"], [4, "ngFor", "ngForOf"], [1, "chip", "chip-brand"]],
      template: function VendorsComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "section", 0)(1, "div", 1)(2, "article", 2)(3, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Total Vendors");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Connected to local database");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "article", 2)(10, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Avg Quality");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Weighted vendor delivery score");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "article", 2)(17, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "Submissions");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](20);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "div", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22, "Current database total");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "div", 6)(24, "input", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function VendorsComponent_Template_input_ngModelChange_24_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.searchTerm, $event) || (ctx.searchTerm = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("input", function VendorsComponent_Template_input_input_24_listener() {
            return ctx.applyFilters();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "select", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function VendorsComponent_Template_select_ngModelChange_25_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.statusFilter, $event) || (ctx.statusFilter = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function VendorsComponent_Template_select_change_25_listener() {
            return ctx.applyFilters();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "option", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](27, "All Status");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "option", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](29, "Active");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "option", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](31, "Inactive");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "div", 12)(33, "table", 13)(34, "thead")(35, "tr")(36, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](37, "Vendor");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](38, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](39, "Contact");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](40, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](41, "Requirements");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](42, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](43, "Assigned By");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](44, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](45, "Submissions");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](46, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](47, "Joinings");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](48, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](49, "Quality");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](50, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](51, "SLA");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](52, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](53, "Status");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](54, "tbody");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](55, VendorsComponent_tr_55_Template, 24, 10, "tr", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.vendors.length);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx.avgQualityScore, "%");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.submissionsThisMonth);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.searchTerm);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.statusFilter);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](30);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.filteredVendors);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgModel],
      encapsulation: 2
    });
  }
}

/***/ }),

/***/ 5312:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
const environment = {
  production: false,
  apiUrl: 'http://localhost:5000'
};

/***/ }),

/***/ 4429:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 436);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 635);


_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule).catch(err => console.error(err));

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4429)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map