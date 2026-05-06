"use strict";
(self["webpackChunkdecypher_frontend"] = self["webpackChunkdecypher_frontend"] || []).push([["main"],{

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
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 74)(1, "div", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span", 76);
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
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Recent");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, AppComponent_div_1_div_13_a_4_Template, 5, 6, "a", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.recentApps);
  }
}
function AppComponent_div_1_div_17_a_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 74)(1, "div", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span", 76);
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
function AppComponent_div_1_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, AppComponent_div_1_div_17_a_1_Template, 5, 6, "a", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.filteredApps);
  }
}
function AppComponent_div_1_div_18_a_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 74)(1, "div", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", item_r6.path)("title", item_r6.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("background", item_r6.color);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r6.symbol);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r6.shortLabel || item_r6.label);
  }
}
function AppComponent_div_1_div_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, AppComponent_div_1_div_18_a_1_Template, 5, 6, "a", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.filteredApps);
  }
}
function AppComponent_div_1_ng_container_19_div_6_a_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 74)(1, "div", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", item_r9.path)("title", item_r9.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("background", item_r9.color);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r9.symbol);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r9.shortLabel || item_r9.label);
  }
}
function AppComponent_div_1_ng_container_19_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 80)(1, "div", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AppComponent_div_1_ng_container_19_div_6_Template_div_click_1_listener() {
      const group_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r7).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.toggleGroup(group_r8.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "span", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "span", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "\u203A");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 86)(11, "div", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, AppComponent_div_1_ng_container_19_div_6_a_12_Template, 5, 6, "a", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const group_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("background", group_r8.color);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](group_r8.symbol);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](group_r8.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](group_r8.modules.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("open", group_r8.expanded);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("open", group_r8.expanded);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", group_r8.modules);
  }
}
function AppComponent_div_1_ng_container_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 77)(2, "div", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "D");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Dashboard");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, AppComponent_div_1_ng_container_19_div_6_Template, 13, 10, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.visibleModuleGroups);
  }
}
function AppComponent_div_1_button_62_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 87);
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
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](17, AppComponent_div_1_div_17_Template, 2, 1, "div", 42)(18, AppComponent_div_1_div_18_Template, 2, 1, "div", 42)(19, AppComponent_div_1_ng_container_19_Template, 7, 1, "ng-container", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "div", 44)(21, "div", 45)(22, "div", 46)(23, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](24, "AI");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26, "AI ASSIST");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "button", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](30, "View insights");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "button", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AppComponent_div_1_Template_button_click_31_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.toggleSidebar());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](32, "\u2039\u203A");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "div", 52)(34, "header", 53)(35, "div", 54)(36, "h1", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](38, "div", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](40, "div", 57)(41, "div", 58)(42, "span", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](43, "/");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](44, "input", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("keyup.enter", function AppComponent_div_1_Template_input_keyup_enter_44_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.globalSearch($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](45, "div", 61)(46, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](47, "Last 30 days");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](48, "button", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AppComponent_div_1_Template_button_click_48_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.logout());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](49, "Logout");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](50, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](51);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](52, "mat-menu", null, 0)(54, "div", 65)(55, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](56);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](57, "div", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](58);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](59, "div", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](60);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](61, "mat-divider");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](62, AppComponent_div_1_button_62_Template, 2, 0, "button", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](63, "button", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AppComponent_div_1_Template_button_click_63_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.logout());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](64, "Logout");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](65, "div", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](66, "router-outlet");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const userMenu_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](53);
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("collapsed", ctx_r1.sidebarCollapsed);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx_r1.appSearch);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r1.appSearch && !ctx_r1.sidebarCollapsed);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.appSearch ? "Results" : "All Modules");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.sidebarCollapsed);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r1.sidebarCollapsed && ctx_r1.appSearch);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r1.sidebarCollapsed && !ctx_r1.appSearch);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.insightText);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("sidebar-collapsed", ctx_r1.sidebarCollapsed);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.currentPageTitle);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.currentBreadcrumb);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("matMenuTriggerFor", userMenu_r10);
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
  get visibleModuleGroups() {
    return this.groupDefs.map(g => ({
      ...g,
      expanded: this.expandedGroups.has(g.id),
      modules: this.allApps.filter(a => g.paths.includes(a.path) && (!a.adminOnly || this.canAccessAdmin))
    })).filter(g => g.modules.length > 0);
  }
  toggleGroup(groupId) {
    if (this.expandedGroups.has(groupId)) {
      this.expandedGroups.delete(groupId);
    } else {
      this.expandedGroups.add(groupId);
    }
  }
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
    this.allApps = [
    // Core
    {
      path: '/dashboard',
      label: 'Dashboard',
      shortLabel: 'Dashboard',
      symbol: 'D',
      color: '#292966',
      adminOnly: false
    },
    // Recruitment
    {
      path: '/requisitions',
      label: 'Requisitions',
      shortLabel: 'Requisitions',
      symbol: 'RQ',
      color: '#e8912a',
      adminOnly: false
    }, {
      path: '/job-broadcasting',
      label: 'Job Broadcasting',
      shortLabel: 'Job Board',
      symbol: 'JB',
      color: '#7c3aed',
      adminOnly: false
    }, {
      path: '/cv-database',
      label: 'Talent Database',
      shortLabel: 'Talent DB',
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
      path: '/interview-scheduler',
      label: 'Interview Scheduler',
      shortLabel: 'Interviews',
      symbol: 'IS',
      color: '#2563eb',
      adminOnly: false
    }, {
      path: '/video-interviews',
      label: 'Video Interviews',
      shortLabel: 'Video Int.',
      symbol: 'VI',
      color: '#db2777',
      adminOnly: false
    }, {
      path: '/offer-management',
      label: 'Offer Management',
      shortLabel: 'Offers',
      symbol: 'OM',
      color: '#5C5C99',
      adminOnly: false
    }, {
      path: '/source-tracking',
      label: 'Source Tracking',
      shortLabel: 'Sources',
      symbol: 'ST',
      color: '#3bbdea',
      adminOnly: false
    }, {
      path: '/vendors',
      label: 'Vendor Management',
      shortLabel: 'Vendors',
      symbol: 'V',
      color: '#22a3d2',
      adminOnly: false
    },
    // Core HR
    {
      path: '/employee-directory',
      label: 'Employee Directory',
      shortLabel: 'Employees',
      symbol: 'ED',
      color: '#6b4df0',
      adminOnly: false
    }, {
      path: '/org-chart',
      label: 'Org Chart',
      shortLabel: 'Org Chart',
      symbol: 'OC',
      color: '#2563eb',
      adminOnly: false
    }, {
      path: '/document-management',
      label: 'Document Management',
      shortLabel: 'Documents',
      symbol: 'DM',
      color: '#0891b2',
      adminOnly: false
    }, {
      path: '/letters-certificates',
      label: 'Letters & Certificates',
      shortLabel: 'Letters',
      symbol: 'LC',
      color: '#7c3aed',
      adminOnly: false
    }, {
      path: '/exit-management',
      label: 'Exit Management',
      shortLabel: 'Exits',
      symbol: 'EX',
      color: '#dc2626',
      adminOnly: false
    }, {
      path: '/internal-job-postings',
      label: 'Internal Mobility',
      shortLabel: 'Int. Mobility',
      symbol: 'IM',
      color: '#b45309',
      adminOnly: false
    },
    // Attendance & Time
    {
      path: '/attendance',
      label: 'Attendance',
      shortLabel: 'Attendance',
      symbol: 'AT',
      color: '#2563eb',
      adminOnly: false
    }, {
      path: '/leave-management',
      label: 'Leave Management',
      shortLabel: 'Leaves',
      symbol: 'LV',
      color: '#10b981',
      adminOnly: false
    }, {
      path: '/shift-management',
      label: 'Shift Management',
      shortLabel: 'Shifts',
      symbol: 'SH',
      color: '#f59e0b',
      adminOnly: false
    }, {
      path: '/timesheet',
      label: 'Timesheet',
      shortLabel: 'Timesheet',
      symbol: 'TS',
      color: '#6b4df0',
      adminOnly: false
    }, {
      path: '/overtime',
      label: 'Overtime Management',
      shortLabel: 'Overtime',
      symbol: 'OT',
      color: '#ef4444',
      adminOnly: false
    },
    // Payroll
    {
      path: '/payroll',
      label: 'Payroll Processing',
      shortLabel: 'Payroll',
      symbol: 'PR',
      color: '#059669',
      adminOnly: false
    }, {
      path: '/salary-structure',
      label: 'Salary Structure',
      shortLabel: 'Salary Struct.',
      symbol: 'SS',
      color: '#16a34a',
      adminOnly: false
    }, {
      path: '/tax-statutory',
      label: 'Tax & Statutory',
      shortLabel: 'Tax & Stat.',
      symbol: 'TX',
      color: '#0f766e',
      adminOnly: false
    }, {
      path: '/expense-management',
      label: 'Expense Management',
      shortLabel: 'Expenses',
      symbol: 'EP',
      color: '#0891b2',
      adminOnly: false
    }, {
      path: '/payslip-portal',
      label: 'Payslip Portal',
      shortLabel: 'Payslips',
      symbol: 'PS',
      color: '#22a3d2',
      adminOnly: false
    },
    // Compensation
    {
      path: '/compensation-planning',
      label: 'Compensation Planning',
      shortLabel: 'Compensation',
      symbol: 'CP',
      color: '#6b4df0',
      adminOnly: false
    }, {
      path: '/benefits-admin',
      label: 'Benefits Administration',
      shortLabel: 'Benefits',
      symbol: 'BA',
      color: '#db2777',
      adminOnly: false
    }, {
      path: '/salary-benchmarking',
      label: 'Salary Benchmarking',
      shortLabel: 'Benchmarking',
      symbol: 'SB',
      color: '#f59e0b',
      adminOnly: false
    }, {
      path: '/bonus-incentives',
      label: 'Bonus & Incentives',
      shortLabel: 'Bonus',
      symbol: 'BI',
      color: '#e8912a',
      adminOnly: false
    },
    // Performance
    {
      path: '/goals-okr',
      label: 'Goals & OKRs',
      shortLabel: 'Goals / OKRs',
      symbol: 'GO',
      color: '#2563eb',
      adminOnly: false
    }, {
      path: '/performance-reviews',
      label: 'Performance Reviews',
      shortLabel: 'Reviews',
      symbol: 'PV',
      color: '#6b4df0',
      adminOnly: false
    }, {
      path: '/feedback-360',
      label: '360° Feedback',
      shortLabel: '360 Feedback',
      symbol: '3F',
      color: '#7c3aed',
      adminOnly: false
    }, {
      path: '/continuous-feedback',
      label: 'Continuous Feedback',
      shortLabel: 'Feedback',
      symbol: 'CF',
      color: '#10b981',
      adminOnly: false
    },
    // Learning
    {
      path: '/learning-management',
      label: 'Learning Management',
      shortLabel: 'LMS',
      symbol: 'LM',
      color: '#6b4df0',
      adminOnly: false
    }, {
      path: '/training-calendar',
      label: 'Training Calendar',
      shortLabel: 'Training',
      symbol: 'TC',
      color: '#2563eb',
      adminOnly: false
    }, {
      path: '/skill-gap',
      label: 'Skill Gap Analysis',
      shortLabel: 'Skill Gap',
      symbol: 'SG',
      color: '#f59e0b',
      adminOnly: false
    }, {
      path: '/certification-tracker',
      label: 'Certification Tracker',
      shortLabel: 'Certs',
      symbol: 'CT',
      color: '#10b981',
      adminOnly: false
    },
    // Talent & Engagement
    {
      path: '/onboarding',
      label: 'Onboarding',
      shortLabel: 'Onboarding',
      symbol: 'OB',
      color: '#10b981',
      adminOnly: false
    }, {
      path: '/talent-pool',
      label: 'Talent Pool',
      shortLabel: 'Talent Pool',
      symbol: 'TP',
      color: '#c56bff',
      adminOnly: false
    }, {
      path: '/communications',
      label: 'Communications',
      shortLabel: 'Comms',
      symbol: 'CM',
      color: '#0891b2',
      adminOnly: false
    },
    // Employer Branding
    {
      path: '/careers-builder',
      label: 'Careers Page Builder',
      shortLabel: 'Careers Page',
      symbol: 'CB',
      color: '#6b4df0',
      adminOnly: false
    }, {
      path: '/talent-community',
      label: 'Talent Community',
      shortLabel: 'Community',
      symbol: 'TY',
      color: '#2563eb',
      adminOnly: false
    }, {
      path: '/social-recruiting',
      label: 'Social Recruiting',
      shortLabel: 'Social Rec.',
      symbol: 'SR',
      color: '#db2777',
      adminOnly: false
    }, {
      path: '/campus-connect',
      label: 'Campus Connect',
      shortLabel: 'Campus',
      symbol: 'CC',
      color: '#f59e0b',
      adminOnly: false
    }, {
      path: '/employee-advocacy',
      label: 'Employee Advocacy',
      shortLabel: 'Advocacy',
      symbol: 'EA',
      color: '#10b981',
      adminOnly: false
    }, {
      path: '/employer-reviews',
      label: 'Employer Reviews',
      shortLabel: 'Reviews',
      symbol: 'ER',
      color: '#e8912a',
      adminOnly: false
    },
    // AI & Intelligence
    {
      path: '/resume-parser',
      label: 'Resume Parser',
      shortLabel: 'Resume AI',
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
      label: 'Attrition Risk',
      shortLabel: 'Attrition',
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
      label: 'JD Analyzer',
      shortLabel: 'JD Analyzer',
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
    },
    // Analytics & Performance
    {
      path: '/reports',
      label: 'Reports & Analytics',
      shortLabel: 'Reports',
      symbol: '📊',
      color: '#0f766e',
      adminOnly: false
    }, {
      path: '/recruiters',
      label: 'Recruiter Performance',
      shortLabel: 'Recruiter Perf.',
      symbol: 'R',
      color: '#6b4df0',
      adminOnly: false
    }, {
      path: '/sla-dashboard',
      label: 'SLA Dashboard',
      shortLabel: 'SLA',
      symbol: 'SL',
      color: '#dc2626',
      adminOnly: false
    }, {
      path: '/budget',
      label: 'Budget & Forecasting',
      shortLabel: 'Budget',
      symbol: '💰',
      color: '#059669',
      adminOnly: false
    },
    // Policies & Compliance
    {
      path: '/policy-management',
      label: 'Policy Management',
      shortLabel: 'Policies',
      symbol: 'PM',
      color: '#374151',
      adminOnly: false
    }, {
      path: '/statutory-compliance',
      label: 'Statutory Compliance',
      shortLabel: 'Statutory',
      symbol: 'SC',
      color: '#dc2626',
      adminOnly: false
    }, {
      path: '/compliance',
      label: 'Compliance Tracker',
      shortLabel: 'Compliance',
      symbol: 'CO',
      color: '#5C5C99',
      adminOnly: false
    }, {
      path: '/audit-trail',
      label: 'Audit Trail',
      shortLabel: 'Audit',
      symbol: 'AU',
      color: '#6b4df0',
      adminOnly: false
    },
    // Administration
    {
      path: '/users',
      label: 'User Management',
      shortLabel: 'Users',
      symbol: 'UA',
      color: '#343a48',
      adminOnly: true
    }, {
      path: '/import-center',
      label: 'Import Center',
      shortLabel: 'Import',
      symbol: '📥',
      color: '#0891b2',
      adminOnly: false
    }, {
      path: '/integrations',
      label: 'Integrations Hub',
      shortLabel: 'Integrations',
      symbol: '🔌',
      color: '#059669',
      adminOnly: false
    }];
    this.recentApps = [];
    this.filteredApps = [];
    this.appSearch = '';
    /* kept for updatePageTitle() */
    this.coreNav = this.allApps.filter(a => !a.adminOnly).slice(0, 12);
    this.aiNav = this.allApps.slice(12, 18);
    this.adminNav = this.allApps.filter(a => a.adminOnly);
    this.groupDefs = [{
      id: 'recruitment',
      label: 'Recruitment',
      symbol: 'RE',
      color: '#2563eb',
      paths: ['/requisitions', '/job-broadcasting', '/cv-database', '/pipeline-board', '/interview-scheduler', '/video-interviews', '/offer-management', '/source-tracking', '/vendors']
    }, {
      id: 'corehr',
      label: 'Core HR',
      symbol: 'HR',
      color: '#6b4df0',
      paths: ['/employee-directory', '/org-chart', '/document-management', '/letters-certificates', '/exit-management', '/internal-job-postings']
    }, {
      id: 'attendance',
      label: 'Attendance & Time',
      symbol: 'AT',
      color: '#0891b2',
      paths: ['/attendance', '/leave-management', '/shift-management', '/timesheet', '/overtime']
    }, {
      id: 'payroll',
      label: 'Payroll',
      symbol: '₹',
      color: '#059669',
      paths: ['/payroll', '/salary-structure', '/tax-statutory', '/expense-management', '/payslip-portal']
    }, {
      id: 'compensation',
      label: 'Compensation & Benefits',
      symbol: 'CB',
      color: '#db2777',
      paths: ['/compensation-planning', '/benefits-admin', '/salary-benchmarking', '/bonus-incentives']
    }, {
      id: 'performance',
      label: 'Performance Management',
      symbol: 'PM',
      color: '#7c3aed',
      paths: ['/goals-okr', '/performance-reviews', '/feedback-360', '/continuous-feedback']
    }, {
      id: 'learning',
      label: 'Learning & Development',
      symbol: 'LD',
      color: '#f59e0b',
      paths: ['/learning-management', '/training-calendar', '/skill-gap', '/certification-tracker']
    }, {
      id: 'talent',
      label: 'Talent & Engagement',
      symbol: 'TE',
      color: '#10b981',
      paths: ['/onboarding', '/talent-pool', '/communications']
    }, {
      id: 'branding',
      label: 'Employer Branding',
      symbol: 'EB',
      color: '#e8912a',
      paths: ['/careers-builder', '/talent-community', '/social-recruiting', '/campus-connect', '/employee-advocacy', '/employer-reviews']
    }, {
      id: 'ai',
      label: 'AI & Intelligence',
      symbol: 'AI',
      color: '#a94ee6',
      paths: ['/resume-parser', '/ai-scorecard', '/dropout-predictor', '/competency-ranker', '/jd-checker', '/jd-generator']
    }, {
      id: 'analytics',
      label: 'Analytics & Performance',
      symbol: 'AP',
      color: '#0f766e',
      paths: ['/reports', '/recruiters', '/sla-dashboard', '/budget']
    }, {
      id: 'policies',
      label: 'Policies & Compliance',
      symbol: 'PC',
      color: '#374151',
      paths: ['/policy-management', '/statutory-compliance', '/compliance', '/audit-trail']
    }, {
      id: 'admin',
      label: 'Administration',
      symbol: 'AD',
      color: '#343a48',
      paths: ['/users', '/import-center', '/integrations']
    }];
    this.expandedGroups = new Set(['recruitment']);
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
        title: 'Vendor Management',
        breadcrumb: 'Home / Vendor Management'
      },
      '/budget': {
        title: 'Budget & Forecasting',
        breadcrumb: 'Home / Budget & Forecasting'
      },
      '/recruiters': {
        title: 'Recruiter Performance',
        breadcrumb: 'Home / Recruiter Performance'
      },
      '/cv-database': {
        title: 'Talent Database',
        breadcrumb: 'Home / Talent Database'
      },
      '/pipeline-board': {
        title: 'Pipeline Board',
        breadcrumb: 'Core / Pipeline Board'
      },
      '/requisitions': {
        title: 'Requisitions',
        breadcrumb: 'Core / Requisitions'
      },
      '/job-broadcasting': {
        title: 'Job Broadcasting',
        breadcrumb: 'Core / Job Broadcasting'
      },
      '/candidate-portal': {
        title: 'Candidate Portal',
        breadcrumb: 'Core / Candidate Portal'
      },
      '/interview-scheduler': {
        title: 'Interview Scheduler',
        breadcrumb: 'Core / Interview Scheduler'
      },
      '/video-interviews': {
        title: 'Video Interviews',
        breadcrumb: 'Core / Video Interviews'
      },
      '/integrations': {
        title: 'Integrations Hub',
        breadcrumb: 'Settings / Integrations Hub'
      },
      '/offer-management': {
        title: 'Offer Management',
        breadcrumb: 'Core / Offer Management'
      },
      '/onboarding': {
        title: 'Onboarding',
        breadcrumb: 'Core / Onboarding'
      },
      '/talent-pool': {
        title: 'Talent Pool',
        breadcrumb: 'Core / Talent Pool'
      },
      '/communications': {
        title: 'Communications',
        breadcrumb: 'Candidate Engagement / Communications'
      },
      '/source-tracking': {
        title: 'Source Tracking',
        breadcrumb: 'Core / Source Tracking'
      },
      '/sla-dashboard': {
        title: 'SLA Dashboard',
        breadcrumb: 'Core / SLA Dashboard'
      },
      '/reports': {
        title: 'Reports & Analytics',
        breadcrumb: 'Core / Reports & Analytics'
      },
      '/internal-job-postings': {
        title: 'Internal Mobility',
        breadcrumb: 'Core / Internal Mobility'
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
        title: 'Attrition Risk',
        breadcrumb: 'AI Tools / Attrition Risk'
      },
      '/competency-ranker': {
        title: 'Competency Ranker',
        breadcrumb: 'AI Tools / Competency Ranker'
      },
      '/jd-checker': {
        title: 'JD Analyzer',
        breadcrumb: 'AI Tools / JD Analyzer'
      },
      '/jd-generator': {
        title: 'JD Generator',
        breadcrumb: 'AI Tools / JD Generator'
      },
      '/import-center': {
        title: 'Import Center',
        breadcrumb: 'Admin / Import Center'
      },
      // Admin
      '/users': {
        title: 'User Management',
        breadcrumb: 'Admin / User Management'
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
      consts: [["userMenu", "matMenu"], ["class", "login-screen", 4, "ngIf"], ["class", "app-container", 4, "ngIf"], [1, "login-screen"], [1, "login-art"], [1, "brand-lockup"], ["src", "assets/images/Decypher%20logo-%20white.png", "alt", "Decypher", 1, "login-logo-white"], ["aria-hidden", "true", 1, "circuit-logo"], [1, "panel", "panel-back"], [1, "panel", "panel-front"], [1, "wire", "wire-a"], [1, "wire", "wire-b"], [1, "wire", "wire-c"], [1, "node", "n1"], [1, "node", "n2"], [1, "node", "n3"], [1, "node", "n4"], [1, "login-panel", 3, "ngSubmit"], [1, "login-panel-header"], ["src", "assets/images/Decypher%20logo-%20black.png", "alt", "Decypher", 1, "login-logo-black"], [1, "panel-subtitle"], [1, "role-tabs"], ["type", "button", 3, "click"], ["name", "email", "type", "email", "autocomplete", "email", 1, "input", 3, "ngModelChange", "ngModel"], ["name", "password", "type", "password", "autocomplete", "current-password", 1, "input", 3, "ngModelChange", "ngModel"], ["class", "login-error", 4, "ngIf"], ["type", "submit", 1, "btn", "btn-primary", "login-btn"], [1, "credential-hint"], [1, "login-error"], [1, "app-container"], [1, "sidebar"], [1, "sidebar-header"], [1, "sidebar-logo"], [1, "sidebar-brand"], [1, "sidebar-brand-name"], [1, "sidebar-brand-tagline"], [1, "sidebar-nav"], [1, "apps-search-wrap"], ["placeholder", "Search modules...", 1, "apps-search-input", 3, "input", "value"], ["class", "apps-section", 4, "ngIf"], [1, "apps-section"], [1, "apps-section-title"], ["class", "apps-grid", 4, "ngIf"], [4, "ngIf"], [1, "sidebar-footer"], [1, "sidebar-ai-assist"], [1, "sidebar-ai-assist-header"], [1, "nav-symbol"], [1, "sidebar-ai-assist-kicker"], [1, "sidebar-ai-assist-content"], ["routerLink", "/dropout-predictor", 1, "btn", "btn-primary", "btn-sm"], [1, "sidebar-collapse-btn", 3, "click"], [1, "main-content"], [1, "topbar"], [1, "topbar-left"], [1, "topbar-title"], [1, "topbar-breadcrumb"], [1, "topbar-center"], [1, "topbar-search"], [1, "topbar-search-icon"], ["placeholder", "Search candidates, vendors, skills...", 1, "topbar-search-input", 3, "keyup.enter"], [1, "topbar-right"], [1, "topbar-date-picker"], ["type", "button", 1, "btn", "btn-ghost", "btn-sm", 3, "click"], [1, "topbar-avatar", 3, "matMenuTriggerFor"], [1, "user-menu-header"], [1, "user-menu-name"], [1, "user-menu-email"], [1, "chip", "chip-brand", 2, "margin-top", "8px"], ["mat-menu-item", "", "routerLink", "/users", 4, "ngIf"], ["mat-menu-item", "", 3, "click"], [1, "page-container", "page-enter"], [1, "apps-grid"], ["routerLinkActive", "active", "class", "app-tile", 3, "routerLink", "title", 4, "ngFor", "ngForOf"], ["routerLinkActive", "active", 1, "app-tile", 3, "routerLink", "title"], [1, "app-tile-icon"], [1, "app-tile-label"], ["routerLink", "/dashboard", "routerLinkActive", "active", "title", "Dashboard", 1, "module-pinned-tile"], [1, "app-tile-icon", 2, "background", "#292966"], ["class", "module-group", 4, "ngFor", "ngForOf"], [1, "module-group"], [1, "module-group-header", 3, "click"], [1, "module-group-icon"], [1, "module-group-label"], [1, "module-group-count"], [1, "module-group-arrow"], [1, "module-group-tiles"], ["mat-menu-item", "", "routerLink", "/users"]],
      template: function AppComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, AppComponent_section_0_Template, 48, 9, "section", 1)(1, AppComponent_div_1_Template, 67, 19, "div", 2);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.isAuthenticated);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isAuthenticated);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgForm, _angular_material_menu__WEBPACK_IMPORTED_MODULE_5__.MatMenu, _angular_material_menu__WEBPACK_IMPORTED_MODULE_5__.MatMenuItem, _angular_material_menu__WEBPACK_IMPORTED_MODULE_5__.MatMenuTrigger, _angular_material_divider__WEBPACK_IMPORTED_MODULE_6__.MatDivider, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterOutlet, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLink, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLinkActive],
      styles: ["\n\n    .login-screen[_ngcontent-%COMP%] {\n      height: 100vh;\n      width: 100vw;\n      display: flex;\n      overflow: hidden;\n    }\n\n    \n\n    .login-art[_ngcontent-%COMP%] {\n      flex: 1;\n      min-width: 0;\n      padding: 44px 52px 52px;\n      background: linear-gradient(125deg, #1ae3f4 0%, #0798ef 45%, #1255df 100%);\n      color: #fff;\n      overflow: hidden;\n      display: flex;\n      flex-direction: column;\n      position: relative;\n    }\n    .login-art[_ngcontent-%COMP%]::before {\n      content: \"\";\n      position: absolute;\n      border-radius: 50%;\n      width: 720px;\n      height: 720px;\n      left: -180px;\n      bottom: -260px;\n      background: rgba(255,255,255,0.07);\n    }\n    .login-art[_ngcontent-%COMP%]::after {\n      content: \"\";\n      position: absolute;\n      border-radius: 50%;\n      width: 260px;\n      height: 260px;\n      right: 100px;\n      top: 180px;\n      background: rgba(255,255,255,0.06);\n    }\n    .brand-lockup[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 14px;\n      position: relative;\n      z-index: 2;\n    }\n    .login-logo-white[_ngcontent-%COMP%] {\n      width: 130px;\n      height: auto;\n      border-radius: 16px;\n      background: rgba(255,255,255,0.95);\n      padding: 12px;\n      box-shadow: 0 14px 40px rgba(15,23,42,0.18);\n    }\n    .circuit-logo[_ngcontent-%COMP%] {\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      transform: translate(-46%, -58%);\n      width: 440px;\n      height: 280px;\n      filter: drop-shadow(0 20px 60px rgba(124,58,237,0.4));\n      z-index: 1;\n    }\n    .panel[_ngcontent-%COMP%] {\n      position: absolute;\n      width: 235px;\n      height: 170px;\n      border: 2px solid rgba(103,232,249,0.6);\n      background: linear-gradient(135deg, rgba(126,34,206,0.74), rgba(29,78,216,0.52));\n      transform: skewY(16deg);\n    }\n    .panel-back[_ngcontent-%COMP%]  { left: 175px; top: 18px; }\n    .panel-front[_ngcontent-%COMP%] { left: 70px;  top: 82px; border-color: rgba(37,99,235,0.7); }\n    .wire[_ngcontent-%COMP%] {\n      position: absolute;\n      height: 8px;\n      border-radius: 999px;\n      background: linear-gradient(90deg, #22d3ee, #8b5cf6);\n      transform-origin: left center;\n    }\n    .wire-a[_ngcontent-%COMP%] { width: 380px; left: 20px;  top: 150px; transform: rotate(16deg); }\n    .wire-b[_ngcontent-%COMP%] { width: 270px; left: 110px; top: 172px; transform: rotate(-14deg); background: linear-gradient(90deg,#67e8f9,#60a5fa); }\n    .wire-c[_ngcontent-%COMP%] { width: 245px; left: 190px; top: 112px; transform: rotate(17deg);  background: linear-gradient(90deg,#c084fc,#2563eb); }\n    .node[_ngcontent-%COMP%] {\n      position: absolute;\n      width: 34px;\n      height: 34px;\n      border-radius: 50%;\n      background: #67e8f9;\n      box-shadow: 0 0 24px currentColor;\n    }\n    .n1[_ngcontent-%COMP%] { left: 12px;  top: 132px; background: #c084fc; }\n    .n2[_ngcontent-%COMP%] { left: 258px; top: 134px; }\n    .n3[_ngcontent-%COMP%] { left: 195px; top: 208px; background: #60a5fa; }\n    .n4[_ngcontent-%COMP%] { left: 370px; top: 121px; }\n    .login-art[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n      max-width: 560px;\n      font-size: 36px;\n      font-weight: 800;\n      line-height: 1.1;\n      margin: auto 0 16px;\n      position: relative;\n      z-index: 2;\n    }\n    .login-art[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n      max-width: 500px;\n      color: rgba(255,255,255,0.8);\n      font-size: 16px;\n      line-height: 1.65;\n      position: relative;\n      z-index: 2;\n      margin: 0;\n    }\n\n    \n\n    .login-panel[_ngcontent-%COMP%] {\n      width: 440px;\n      min-width: 440px;\n      background: #fff;\n      overflow-y: auto;\n      padding: 52px 48px;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      gap: 14px;\n      box-shadow: -20px 0 80px rgba(15,23,42,0.18);\n      position: relative;\n      z-index: 5;\n    }\n    .login-panel-header[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: center;\n      margin-bottom: 4px;\n    }\n    .login-logo-black[_ngcontent-%COMP%] {\n      width: 140px;\n      height: auto;\n      display: block;\n      border-radius: 14px;\n      box-shadow: 0 10px 30px rgba(15,23,42,0.1);\n    }\n    .login-panel[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n      margin: 0;\n      font-size: 28px;\n      font-weight: 800;\n      text-align: center;\n      color: #0f172a;\n      letter-spacing: -0.5px;\n    }\n    .panel-subtitle[_ngcontent-%COMP%] {\n      margin: 0;\n      color: #64748b;\n      text-align: center;\n      font-size: 14px;\n    }\n\n    \n\n    .role-tabs[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(3, 1fr);\n      gap: 0;\n      margin: 4px 0;\n      background: #f1f5f9;\n      border-radius: 10px;\n      padding: 4px;\n    }\n    .role-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n      border: none;\n      background: transparent;\n      border-radius: 7px;\n      padding: 10px 6px;\n      cursor: pointer;\n      font-weight: 600;\n      font-size: 13px;\n      color: #64748b;\n      transition: all 0.15s ease;\n    }\n    .role-tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n      background: #fff;\n      color: #5b21b6;\n      box-shadow: 0 2px 8px rgba(91,33,182,0.15);\n      font-weight: 700;\n    }\n    .role-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover:not(.active) {\n      color: #334155;\n    }\n\n    \n\n    .login-panel[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n      font-size: 13px;\n      font-weight: 700;\n      color: #374151;\n      margin-bottom: -4px;\n    }\n    .login-panel[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%] {\n      width: 100%;\n      height: 50px;\n      font-size: 15px;\n      padding: 0 16px;\n      border-radius: 10px;\n      border: 1.5px solid #e2e8f0;\n      box-sizing: border-box;\n      outline: none;\n      color: #0f172a;\n      background: #fafafa;\n      transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;\n    }\n    .login-panel[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%]:focus {\n      border-color: #7c3aed;\n      background: #fff;\n      box-shadow: 0 0 0 3px rgba(124,58,237,0.12);\n    }\n\n    \n\n    .login-error[_ngcontent-%COMP%] {\n      color: #b91c1c;\n      font-size: 13px;\n      background: #fef2f2;\n      border: 1px solid #fecaca;\n      border-radius: 8px;\n      padding: 10px 14px;\n      margin: 0;\n    }\n\n    \n\n    .login-btn[_ngcontent-%COMP%] {\n      width: 100%;\n      height: 52px;\n      font-size: 16px;\n      font-weight: 700;\n      letter-spacing: 0.3px;\n      border-radius: 10px;\n      border: none;\n      cursor: pointer;\n      background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%);\n      color: #fff !important;\n      box-shadow: 0 6px 22px rgba(124,58,237,0.35);\n      transition: background 0.2s, box-shadow 0.2s, transform 0.15s;\n      margin-top: 4px;\n    }\n    .login-btn[_ngcontent-%COMP%]:hover {\n      background: linear-gradient(135deg, #6d28d9 0%, #1d4ed8 100%);\n      box-shadow: 0 10px 30px rgba(124,58,237,0.45);\n      transform: translateY(-1px);\n    }\n    .login-btn[_ngcontent-%COMP%]:active {\n      transform: translateY(0);\n      box-shadow: 0 4px 14px rgba(124,58,237,0.3);\n    }\n\n    \n\n    .credential-hint[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 5px;\n      font-size: 12px;\n      color: #64748b;\n      background: #f8fafc;\n      border: 1px solid #e8edf5;\n      border-radius: 10px;\n      padding: 12px 14px;\n      margin-top: 2px;\n    }\n    .credential-hint[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n      color: #475569;\n      font-size: 11px;\n      text-transform: uppercase;\n      letter-spacing: 0.8px;\n      margin-bottom: 2px;\n    }\n\n    \n\n    .brand-mark[_ngcontent-%COMP%], .sidebar-logo[_ngcontent-%COMP%] {\n      width: 42px;\n      height: 42px;\n      border-radius: 10px;\n      display: grid;\n      place-items: center;\n      background: #111827;\n      color: #fff;\n      font-weight: 800;\n    }\n    .nav-symbol[_ngcontent-%COMP%] {\n      width: 22px;\n      min-width: 22px;\n      font-size: 12px;\n      font-weight: 800;\n      color: #64748b;\n    }\n    .user-menu-header[_ngcontent-%COMP%] { padding: 12px 16px; }\n    .user-menu-name[_ngcontent-%COMP%]  { font-weight: 700; font-size: 14px; color: var(--text); }\n    .user-menu-email[_ngcontent-%COMP%] { font-size: 12px; color: var(--text-3); margin-top: 2px; }\n    .btn-sm[_ngcontent-%COMP%] { height: 28px; font-size: 12px; padding: 0 12px; }\n\n    \n\n    @media (max-width: 900px) {\n      .login-screen[_ngcontent-%COMP%] {\n        flex-direction: column;\n        height: auto;\n        min-height: 100vh;\n        overflow: auto;\n      }\n      .login-art[_ngcontent-%COMP%] {\n        min-height: 340px;\n        padding: 32px 28px 44px;\n      }\n      .circuit-logo[_ngcontent-%COMP%] {\n        transform: translate(-46%, -60%) scale(0.6);\n      }\n      .login-art[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n        font-size: 26px;\n      }\n      .login-panel[_ngcontent-%COMP%] {\n        width: 100%;\n        min-width: 0;\n        padding: 36px 28px 44px;\n        box-shadow: none;\n      }\n    }\n  \n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXBwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0lBQ0ksc0RBQXNEO0lBQ3REO01BQ0UsYUFBYTtNQUNiLFlBQVk7TUFDWixhQUFhO01BQ2IsZ0JBQWdCO0lBQ2xCOztJQUVBLHVDQUF1QztJQUN2QztNQUNFLE9BQU87TUFDUCxZQUFZO01BQ1osdUJBQXVCO01BQ3ZCLDBFQUEwRTtNQUMxRSxXQUFXO01BQ1gsZ0JBQWdCO01BQ2hCLGFBQWE7TUFDYixzQkFBc0I7TUFDdEIsa0JBQWtCO0lBQ3BCO0lBQ0E7TUFDRSxXQUFXO01BQ1gsa0JBQWtCO01BQ2xCLGtCQUFrQjtNQUNsQixZQUFZO01BQ1osYUFBYTtNQUNiLFlBQVk7TUFDWixjQUFjO01BQ2Qsa0NBQWtDO0lBQ3BDO0lBQ0E7TUFDRSxXQUFXO01BQ1gsa0JBQWtCO01BQ2xCLGtCQUFrQjtNQUNsQixZQUFZO01BQ1osYUFBYTtNQUNiLFlBQVk7TUFDWixVQUFVO01BQ1Ysa0NBQWtDO0lBQ3BDO0lBQ0E7TUFDRSxhQUFhO01BQ2IsbUJBQW1CO01BQ25CLFNBQVM7TUFDVCxrQkFBa0I7TUFDbEIsVUFBVTtJQUNaO0lBQ0E7TUFDRSxZQUFZO01BQ1osWUFBWTtNQUNaLG1CQUFtQjtNQUNuQixrQ0FBa0M7TUFDbEMsYUFBYTtNQUNiLDJDQUEyQztJQUM3QztJQUNBO01BQ0Usa0JBQWtCO01BQ2xCLFFBQVE7TUFDUixTQUFTO01BQ1QsZ0NBQWdDO01BQ2hDLFlBQVk7TUFDWixhQUFhO01BQ2IscURBQXFEO01BQ3JELFVBQVU7SUFDWjtJQUNBO01BQ0Usa0JBQWtCO01BQ2xCLFlBQVk7TUFDWixhQUFhO01BQ2IsdUNBQXVDO01BQ3ZDLGdGQUFnRjtNQUNoRix1QkFBdUI7SUFDekI7SUFDQSxlQUFlLFdBQVcsRUFBRSxTQUFTLEVBQUU7SUFDdkMsZUFBZSxVQUFVLEdBQUcsU0FBUyxFQUFFLGlDQUFpQyxFQUFFO0lBQzFFO01BQ0Usa0JBQWtCO01BQ2xCLFdBQVc7TUFDWCxvQkFBb0I7TUFDcEIsb0RBQW9EO01BQ3BELDZCQUE2QjtJQUMvQjtJQUNBLFVBQVUsWUFBWSxFQUFFLFVBQVUsR0FBRyxVQUFVLEVBQUUsd0JBQXdCLEVBQUU7SUFDM0UsVUFBVSxZQUFZLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSx5QkFBeUIsRUFBRSxrREFBa0QsRUFBRTtJQUNoSSxVQUFVLFlBQVksRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLHdCQUF3QixHQUFHLGtEQUFrRCxFQUFFO0lBQ2hJO01BQ0Usa0JBQWtCO01BQ2xCLFdBQVc7TUFDWCxZQUFZO01BQ1osa0JBQWtCO01BQ2xCLG1CQUFtQjtNQUNuQixpQ0FBaUM7SUFDbkM7SUFDQSxNQUFNLFVBQVUsR0FBRyxVQUFVLEVBQUUsbUJBQW1CLEVBQUU7SUFDcEQsTUFBTSxXQUFXLEVBQUUsVUFBVSxFQUFFO0lBQy9CLE1BQU0sV0FBVyxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBRTtJQUNwRCxNQUFNLFdBQVcsRUFBRSxVQUFVLEVBQUU7SUFDL0I7TUFDRSxnQkFBZ0I7TUFDaEIsZUFBZTtNQUNmLGdCQUFnQjtNQUNoQixnQkFBZ0I7TUFDaEIsbUJBQW1CO01BQ25CLGtCQUFrQjtNQUNsQixVQUFVO0lBQ1o7SUFDQTtNQUNFLGdCQUFnQjtNQUNoQiw0QkFBNEI7TUFDNUIsZUFBZTtNQUNmLGlCQUFpQjtNQUNqQixrQkFBa0I7TUFDbEIsVUFBVTtNQUNWLFNBQVM7SUFDWDs7SUFFQSx3Q0FBd0M7SUFDeEM7TUFDRSxZQUFZO01BQ1osZ0JBQWdCO01BQ2hCLGdCQUFnQjtNQUNoQixnQkFBZ0I7TUFDaEIsa0JBQWtCO01BQ2xCLGFBQWE7TUFDYixzQkFBc0I7TUFDdEIsdUJBQXVCO01BQ3ZCLFNBQVM7TUFDVCw0Q0FBNEM7TUFDNUMsa0JBQWtCO01BQ2xCLFVBQVU7SUFDWjtJQUNBO01BQ0UsYUFBYTtNQUNiLHVCQUF1QjtNQUN2QixrQkFBa0I7SUFDcEI7SUFDQTtNQUNFLFlBQVk7TUFDWixZQUFZO01BQ1osY0FBYztNQUNkLG1CQUFtQjtNQUNuQiwwQ0FBMEM7SUFDNUM7SUFDQTtNQUNFLFNBQVM7TUFDVCxlQUFlO01BQ2YsZ0JBQWdCO01BQ2hCLGtCQUFrQjtNQUNsQixjQUFjO01BQ2Qsc0JBQXNCO0lBQ3hCO0lBQ0E7TUFDRSxTQUFTO01BQ1QsY0FBYztNQUNkLGtCQUFrQjtNQUNsQixlQUFlO0lBQ2pCOztJQUVBLHdDQUF3QztJQUN4QztNQUNFLGFBQWE7TUFDYixxQ0FBcUM7TUFDckMsTUFBTTtNQUNOLGFBQWE7TUFDYixtQkFBbUI7TUFDbkIsbUJBQW1CO01BQ25CLFlBQVk7SUFDZDtJQUNBO01BQ0UsWUFBWTtNQUNaLHVCQUF1QjtNQUN2QixrQkFBa0I7TUFDbEIsaUJBQWlCO01BQ2pCLGVBQWU7TUFDZixnQkFBZ0I7TUFDaEIsZUFBZTtNQUNmLGNBQWM7TUFDZCwwQkFBMEI7SUFDNUI7SUFDQTtNQUNFLGdCQUFnQjtNQUNoQixjQUFjO01BQ2QsMENBQTBDO01BQzFDLGdCQUFnQjtJQUNsQjtJQUNBO01BQ0UsY0FBYztJQUNoQjs7SUFFQSxnQkFBZ0I7SUFDaEI7TUFDRSxlQUFlO01BQ2YsZ0JBQWdCO01BQ2hCLGNBQWM7TUFDZCxtQkFBbUI7SUFDckI7SUFDQTtNQUNFLFdBQVc7TUFDWCxZQUFZO01BQ1osZUFBZTtNQUNmLGVBQWU7TUFDZixtQkFBbUI7TUFDbkIsMkJBQTJCO01BQzNCLHNCQUFzQjtNQUN0QixhQUFhO01BQ2IsY0FBYztNQUNkLG1CQUFtQjtNQUNuQixrRUFBa0U7SUFDcEU7SUFDQTtNQUNFLHFCQUFxQjtNQUNyQixnQkFBZ0I7TUFDaEIsMkNBQTJDO0lBQzdDOztJQUVBLFVBQVU7SUFDVjtNQUNFLGNBQWM7TUFDZCxlQUFlO01BQ2YsbUJBQW1CO01BQ25CLHlCQUF5QjtNQUN6QixrQkFBa0I7TUFDbEIsa0JBQWtCO01BQ2xCLFNBQVM7SUFDWDs7SUFFQSxtQkFBbUI7SUFDbkI7TUFDRSxXQUFXO01BQ1gsWUFBWTtNQUNaLGVBQWU7TUFDZixnQkFBZ0I7TUFDaEIscUJBQXFCO01BQ3JCLG1CQUFtQjtNQUNuQixZQUFZO01BQ1osZUFBZTtNQUNmLDZEQUE2RDtNQUM3RCxzQkFBc0I7TUFDdEIsNENBQTRDO01BQzVDLDZEQUE2RDtNQUM3RCxlQUFlO0lBQ2pCO0lBQ0E7TUFDRSw2REFBNkQ7TUFDN0QsNkNBQTZDO01BQzdDLDJCQUEyQjtJQUM3QjtJQUNBO01BQ0Usd0JBQXdCO01BQ3hCLDJDQUEyQztJQUM3Qzs7SUFFQSxxQkFBcUI7SUFDckI7TUFDRSxhQUFhO01BQ2IsUUFBUTtNQUNSLGVBQWU7TUFDZixjQUFjO01BQ2QsbUJBQW1CO01BQ25CLHlCQUF5QjtNQUN6QixtQkFBbUI7TUFDbkIsa0JBQWtCO01BQ2xCLGVBQWU7SUFDakI7SUFDQTtNQUNFLGNBQWM7TUFDZCxlQUFlO01BQ2YseUJBQXlCO01BQ3pCLHFCQUFxQjtNQUNyQixrQkFBa0I7SUFDcEI7O0lBRUEsbUNBQW1DO0lBQ25DO01BQ0UsV0FBVztNQUNYLFlBQVk7TUFDWixtQkFBbUI7TUFDbkIsYUFBYTtNQUNiLG1CQUFtQjtNQUNuQixtQkFBbUI7TUFDbkIsV0FBVztNQUNYLGdCQUFnQjtJQUNsQjtJQUNBO01BQ0UsV0FBVztNQUNYLGVBQWU7TUFDZixlQUFlO01BQ2YsZ0JBQWdCO01BQ2hCLGNBQWM7SUFDaEI7SUFDQSxvQkFBb0Isa0JBQWtCLEVBQUU7SUFDeEMsbUJBQW1CLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxrQkFBa0IsRUFBRTtJQUMxRSxtQkFBbUIsZUFBZSxFQUFFLG9CQUFvQixFQUFFLGVBQWUsRUFBRTtJQUMzRSxVQUFVLFlBQVksRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFOztJQUUxRCxxQkFBcUI7SUFDckI7TUFDRTtRQUNFLHNCQUFzQjtRQUN0QixZQUFZO1FBQ1osaUJBQWlCO1FBQ2pCLGNBQWM7TUFDaEI7TUFDQTtRQUNFLGlCQUFpQjtRQUNqQix1QkFBdUI7TUFDekI7TUFDQTtRQUNFLDJDQUEyQztNQUM3QztNQUNBO1FBQ0UsZUFBZTtNQUNqQjtNQUNBO1FBQ0UsV0FBVztRQUNYLFlBQVk7UUFDWix1QkFBdUI7UUFDdkIsZ0JBQWdCO01BQ2xCO0lBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAvKiA9PT09PSBMT0dJTiBTQ1JFRU4gw6LCgMKTIHR3by1jb2x1bW4gZmxleCBsYXlvdXQgPT09PT0gKi9cbiAgICAubG9naW4tc2NyZWVuIHtcbiAgICAgIGhlaWdodDogMTAwdmg7XG4gICAgICB3aWR0aDogMTAwdnc7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB9XG5cbiAgICAvKiAtLS0tIExlZnQ6IGFydCAvIGJyYW5kIGNvbHVtbiAtLS0tICovXG4gICAgLmxvZ2luLWFydCB7XG4gICAgICBmbGV4OiAxO1xuICAgICAgbWluLXdpZHRoOiAwO1xuICAgICAgcGFkZGluZzogNDRweCA1MnB4IDUycHg7XG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTI1ZGVnLCAjMWFlM2Y0IDAlLCAjMDc5OGVmIDQ1JSwgIzEyNTVkZiAxMDAlKTtcbiAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIH1cbiAgICAubG9naW4tYXJ0OjpiZWZvcmUge1xuICAgICAgY29udGVudDogXCJcIjtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgIHdpZHRoOiA3MjBweDtcbiAgICAgIGhlaWdodDogNzIwcHg7XG4gICAgICBsZWZ0OiAtMTgwcHg7XG4gICAgICBib3R0b206IC0yNjBweDtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LDI1NSwyNTUsMC4wNyk7XG4gICAgfVxuICAgIC5sb2dpbi1hcnQ6OmFmdGVyIHtcbiAgICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICB3aWR0aDogMjYwcHg7XG4gICAgICBoZWlnaHQ6IDI2MHB4O1xuICAgICAgcmlnaHQ6IDEwMHB4O1xuICAgICAgdG9wOiAxODBweDtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LDI1NSwyNTUsMC4wNik7XG4gICAgfVxuICAgIC5icmFuZC1sb2NrdXAge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDE0cHg7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB6LWluZGV4OiAyO1xuICAgIH1cbiAgICAubG9naW4tbG9nby13aGl0ZSB7XG4gICAgICB3aWR0aDogMTMwcHg7XG4gICAgICBoZWlnaHQ6IGF1dG87XG4gICAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICAgICAgYmFja2dyb3VuZDogcmdiYSgyNTUsMjU1LDI1NSwwLjk1KTtcbiAgICAgIHBhZGRpbmc6IDEycHg7XG4gICAgICBib3gtc2hhZG93OiAwIDE0cHggNDBweCByZ2JhKDE1LDIzLDQyLDAuMTgpO1xuICAgIH1cbiAgICAuY2lyY3VpdC1sb2dvIHtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogNTAlO1xuICAgICAgbGVmdDogNTAlO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTQ2JSwgLTU4JSk7XG4gICAgICB3aWR0aDogNDQwcHg7XG4gICAgICBoZWlnaHQ6IDI4MHB4O1xuICAgICAgZmlsdGVyOiBkcm9wLXNoYWRvdygwIDIwcHggNjBweCByZ2JhKDEyNCw1OCwyMzcsMC40KSk7XG4gICAgICB6LWluZGV4OiAxO1xuICAgIH1cbiAgICAucGFuZWwge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgd2lkdGg6IDIzNXB4O1xuICAgICAgaGVpZ2h0OiAxNzBweDtcbiAgICAgIGJvcmRlcjogMnB4IHNvbGlkIHJnYmEoMTAzLDIzMiwyNDksMC42KTtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsIHJnYmEoMTI2LDM0LDIwNiwwLjc0KSwgcmdiYSgyOSw3OCwyMTYsMC41MikpO1xuICAgICAgdHJhbnNmb3JtOiBza2V3WSgxNmRlZyk7XG4gICAgfVxuICAgIC5wYW5lbC1iYWNrICB7IGxlZnQ6IDE3NXB4OyB0b3A6IDE4cHg7IH1cbiAgICAucGFuZWwtZnJvbnQgeyBsZWZ0OiA3MHB4OyAgdG9wOiA4MnB4OyBib3JkZXItY29sb3I6IHJnYmEoMzcsOTksMjM1LDAuNyk7IH1cbiAgICAud2lyZSB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBoZWlnaHQ6IDhweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDk5OXB4O1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjMjJkM2VlLCAjOGI1Y2Y2KTtcbiAgICAgIHRyYW5zZm9ybS1vcmlnaW46IGxlZnQgY2VudGVyO1xuICAgIH1cbiAgICAud2lyZS1hIHsgd2lkdGg6IDM4MHB4OyBsZWZ0OiAyMHB4OyAgdG9wOiAxNTBweDsgdHJhbnNmb3JtOiByb3RhdGUoMTZkZWcpOyB9XG4gICAgLndpcmUtYiB7IHdpZHRoOiAyNzBweDsgbGVmdDogMTEwcHg7IHRvcDogMTcycHg7IHRyYW5zZm9ybTogcm90YXRlKC0xNGRlZyk7IGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywjNjdlOGY5LCM2MGE1ZmEpOyB9XG4gICAgLndpcmUtYyB7IHdpZHRoOiAyNDVweDsgbGVmdDogMTkwcHg7IHRvcDogMTEycHg7IHRyYW5zZm9ybTogcm90YXRlKDE3ZGVnKTsgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywjYzA4NGZjLCMyNTYzZWIpOyB9XG4gICAgLm5vZGUge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgd2lkdGg6IDM0cHg7XG4gICAgICBoZWlnaHQ6IDM0cHg7XG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICBiYWNrZ3JvdW5kOiAjNjdlOGY5O1xuICAgICAgYm94LXNoYWRvdzogMCAwIDI0cHggY3VycmVudENvbG9yO1xuICAgIH1cbiAgICAubjEgeyBsZWZ0OiAxMnB4OyAgdG9wOiAxMzJweDsgYmFja2dyb3VuZDogI2MwODRmYzsgfVxuICAgIC5uMiB7IGxlZnQ6IDI1OHB4OyB0b3A6IDEzNHB4OyB9XG4gICAgLm4zIHsgbGVmdDogMTk1cHg7IHRvcDogMjA4cHg7IGJhY2tncm91bmQ6ICM2MGE1ZmE7IH1cbiAgICAubjQgeyBsZWZ0OiAzNzBweDsgdG9wOiAxMjFweDsgfVxuICAgIC5sb2dpbi1hcnQgaDEge1xuICAgICAgbWF4LXdpZHRoOiA1NjBweDtcbiAgICAgIGZvbnQtc2l6ZTogMzZweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA4MDA7XG4gICAgICBsaW5lLWhlaWdodDogMS4xO1xuICAgICAgbWFyZ2luOiBhdXRvIDAgMTZweDtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIHotaW5kZXg6IDI7XG4gICAgfVxuICAgIC5sb2dpbi1hcnQgPiBwIHtcbiAgICAgIG1heC13aWR0aDogNTAwcHg7XG4gICAgICBjb2xvcjogcmdiYSgyNTUsMjU1LDI1NSwwLjgpO1xuICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNjU7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB6LWluZGV4OiAyO1xuICAgICAgbWFyZ2luOiAwO1xuICAgIH1cblxuICAgIC8qIC0tLS0gUmlnaHQ6IGxvZ2luIHBhbmVsIGNvbHVtbiAtLS0tICovXG4gICAgLmxvZ2luLXBhbmVsIHtcbiAgICAgIHdpZHRoOiA0NDBweDtcbiAgICAgIG1pbi13aWR0aDogNDQwcHg7XG4gICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICAgIHBhZGRpbmc6IDUycHggNDhweDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBnYXA6IDE0cHg7XG4gICAgICBib3gtc2hhZG93OiAtMjBweCAwIDgwcHggcmdiYSgxNSwyMyw0MiwwLjE4KTtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIHotaW5kZXg6IDU7XG4gICAgfVxuICAgIC5sb2dpbi1wYW5lbC1oZWFkZXIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgbWFyZ2luLWJvdHRvbTogNHB4O1xuICAgIH1cbiAgICAubG9naW4tbG9nby1ibGFjayB7XG4gICAgICB3aWR0aDogMTQwcHg7XG4gICAgICBoZWlnaHQ6IGF1dG87XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIGJvcmRlci1yYWRpdXM6IDE0cHg7XG4gICAgICBib3gtc2hhZG93OiAwIDEwcHggMzBweCByZ2JhKDE1LDIzLDQyLDAuMSk7XG4gICAgfVxuICAgIC5sb2dpbi1wYW5lbCBoMiB7XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBmb250LXNpemU6IDI4cHg7XG4gICAgICBmb250LXdlaWdodDogODAwO1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgY29sb3I6ICMwZjE3MmE7XG4gICAgICBsZXR0ZXItc3BhY2luZzogLTAuNXB4O1xuICAgIH1cbiAgICAucGFuZWwtc3VidGl0bGUge1xuICAgICAgbWFyZ2luOiAwO1xuICAgICAgY29sb3I6ICM2NDc0OGI7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgfVxuXG4gICAgLyogUm9sZSB0YWJzIMOiwoDCkyBzZWdtZW50ZWQgY29udHJvbCBzdHlsZSAqL1xuICAgIC5yb2xlLXRhYnMge1xuICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XG4gICAgICBnYXA6IDA7XG4gICAgICBtYXJnaW46IDRweCAwO1xuICAgICAgYmFja2dyb3VuZDogI2YxZjVmOTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICBwYWRkaW5nOiA0cHg7XG4gICAgfVxuICAgIC5yb2xlLXRhYnMgYnV0dG9uIHtcbiAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgYm9yZGVyLXJhZGl1czogN3B4O1xuICAgICAgcGFkZGluZzogMTBweCA2cHg7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgICAgY29sb3I6ICM2NDc0OGI7XG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4xNXMgZWFzZTtcbiAgICB9XG4gICAgLnJvbGUtdGFicyBidXR0b24uYWN0aXZlIHtcbiAgICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgICBjb2xvcjogIzViMjFiNjtcbiAgICAgIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDkxLDMzLDE4MiwwLjE1KTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgfVxuICAgIC5yb2xlLXRhYnMgYnV0dG9uOmhvdmVyOm5vdCguYWN0aXZlKSB7XG4gICAgICBjb2xvcjogIzMzNDE1NTtcbiAgICB9XG5cbiAgICAvKiBGb3JtIGZpZWxkcyAqL1xuICAgIC5sb2dpbi1wYW5lbCBsYWJlbCB7XG4gICAgICBmb250LXNpemU6IDEzcHg7XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgY29sb3I6ICMzNzQxNTE7XG4gICAgICBtYXJnaW4tYm90dG9tOiAtNHB4O1xuICAgIH1cbiAgICAubG9naW4tcGFuZWwgLmlucHV0IHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgaGVpZ2h0OiA1MHB4O1xuICAgICAgZm9udC1zaXplOiAxNXB4O1xuICAgICAgcGFkZGluZzogMCAxNnB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgIGJvcmRlcjogMS41cHggc29saWQgI2UyZThmMDtcbiAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICBvdXRsaW5lOiBub25lO1xuICAgICAgY29sb3I6ICMwZjE3MmE7XG4gICAgICBiYWNrZ3JvdW5kOiAjZmFmYWZhO1xuICAgICAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDAuMTVzLCBib3gtc2hhZG93IDAuMTVzLCBiYWNrZ3JvdW5kIDAuMTVzO1xuICAgIH1cbiAgICAubG9naW4tcGFuZWwgLmlucHV0OmZvY3VzIHtcbiAgICAgIGJvcmRlci1jb2xvcjogIzdjM2FlZDtcbiAgICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgICBib3gtc2hhZG93OiAwIDAgMCAzcHggcmdiYSgxMjQsNTgsMjM3LDAuMTIpO1xuICAgIH1cblxuICAgIC8qIEVycm9yICovXG4gICAgLmxvZ2luLWVycm9yIHtcbiAgICAgIGNvbG9yOiAjYjkxYzFjO1xuICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgICAgYmFja2dyb3VuZDogI2ZlZjJmMjtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNmZWNhY2E7XG4gICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICBwYWRkaW5nOiAxMHB4IDE0cHg7XG4gICAgICBtYXJnaW46IDA7XG4gICAgfVxuXG4gICAgLyogU2lnbi1pbiBidXR0b24gKi9cbiAgICAubG9naW4tYnRuIHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgaGVpZ2h0OiA1MnB4O1xuICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIGxldHRlci1zcGFjaW5nOiAwLjNweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICBib3JkZXI6IG5vbmU7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjN2MzYWVkIDAlLCAjMjU2M2ViIDEwMCUpO1xuICAgICAgY29sb3I6ICNmZmYgIWltcG9ydGFudDtcbiAgICAgIGJveC1zaGFkb3c6IDAgNnB4IDIycHggcmdiYSgxMjQsNTgsMjM3LDAuMzUpO1xuICAgICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjJzLCBib3gtc2hhZG93IDAuMnMsIHRyYW5zZm9ybSAwLjE1cztcbiAgICAgIG1hcmdpbi10b3A6IDRweDtcbiAgICB9XG4gICAgLmxvZ2luLWJ0bjpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjNmQyOGQ5IDAlLCAjMWQ0ZWQ4IDEwMCUpO1xuICAgICAgYm94LXNoYWRvdzogMCAxMHB4IDMwcHggcmdiYSgxMjQsNTgsMjM3LDAuNDUpO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xcHgpO1xuICAgIH1cbiAgICAubG9naW4tYnRuOmFjdGl2ZSB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gICAgICBib3gtc2hhZG93OiAwIDRweCAxNHB4IHJnYmEoMTI0LDU4LDIzNywwLjMpO1xuICAgIH1cblxuICAgIC8qIERlbW8gY3JlZGVudGlhbHMgKi9cbiAgICAuY3JlZGVudGlhbC1oaW50IHtcbiAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICBnYXA6IDVweDtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIGNvbG9yOiAjNjQ3NDhiO1xuICAgICAgYmFja2dyb3VuZDogI2Y4ZmFmYztcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNlOGVkZjU7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgcGFkZGluZzogMTJweCAxNHB4O1xuICAgICAgbWFyZ2luLXRvcDogMnB4O1xuICAgIH1cbiAgICAuY3JlZGVudGlhbC1oaW50IHN0cm9uZyB7XG4gICAgICBjb2xvcjogIzQ3NTU2OTtcbiAgICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICBsZXR0ZXItc3BhY2luZzogMC44cHg7XG4gICAgICBtYXJnaW4tYm90dG9tOiAycHg7XG4gICAgfVxuXG4gICAgLyogU2lkZWJhciAvIHRvcGJhciBzaGFyZWQgc3R5bGVzICovXG4gICAgLmJyYW5kLW1hcmssIC5zaWRlYmFyLWxvZ28ge1xuICAgICAgd2lkdGg6IDQycHg7XG4gICAgICBoZWlnaHQ6IDQycHg7XG4gICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBiYWNrZ3JvdW5kOiAjMTExODI3O1xuICAgICAgY29sb3I6ICNmZmY7XG4gICAgICBmb250LXdlaWdodDogODAwO1xuICAgIH1cbiAgICAubmF2LXN5bWJvbCB7XG4gICAgICB3aWR0aDogMjJweDtcbiAgICAgIG1pbi13aWR0aDogMjJweDtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA4MDA7XG4gICAgICBjb2xvcjogIzY0NzQ4YjtcbiAgICB9XG4gICAgLnVzZXItbWVudS1oZWFkZXIgeyBwYWRkaW5nOiAxMnB4IDE2cHg7IH1cbiAgICAudXNlci1tZW51LW5hbWUgIHsgZm9udC13ZWlnaHQ6IDcwMDsgZm9udC1zaXplOiAxNHB4OyBjb2xvcjogdmFyKC0tdGV4dCk7IH1cbiAgICAudXNlci1tZW51LWVtYWlsIHsgZm9udC1zaXplOiAxMnB4OyBjb2xvcjogdmFyKC0tdGV4dC0zKTsgbWFyZ2luLXRvcDogMnB4OyB9XG4gICAgLmJ0bi1zbSB7IGhlaWdodDogMjhweDsgZm9udC1zaXplOiAxMnB4OyBwYWRkaW5nOiAwIDEycHg7IH1cblxuICAgIC8qIC0tLS0gTW9iaWxlIC0tLS0gKi9cbiAgICBAbWVkaWEgKG1heC13aWR0aDogOTAwcHgpIHtcbiAgICAgIC5sb2dpbi1zY3JlZW4ge1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBoZWlnaHQ6IGF1dG87XG4gICAgICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xuICAgICAgICBvdmVyZmxvdzogYXV0bztcbiAgICAgIH1cbiAgICAgIC5sb2dpbi1hcnQge1xuICAgICAgICBtaW4taGVpZ2h0OiAzNDBweDtcbiAgICAgICAgcGFkZGluZzogMzJweCAyOHB4IDQ0cHg7XG4gICAgICB9XG4gICAgICAuY2lyY3VpdC1sb2dvIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTQ2JSwgLTYwJSkgc2NhbGUoMC42KTtcbiAgICAgIH1cbiAgICAgIC5sb2dpbi1hcnQgaDEge1xuICAgICAgICBmb250LXNpemU6IDI2cHg7XG4gICAgICB9XG4gICAgICAubG9naW4tcGFuZWwge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgbWluLXdpZHRoOiAwO1xuICAgICAgICBwYWRkaW5nOiAzNnB4IDI4cHggNDRweDtcbiAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICAgIH1cbiAgICB9XG4gICJdLCJzb3VyY2VSb290IjoiIn0= */"]
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
/* harmony export */   UsersAdminComponent: () => (/* binding */ UsersAdminComponent)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/platform-browser */ 436);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/platform-browser/animations */ 3835);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/menu */ 1034);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/divider */ 4102);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ 92);
/* harmony import */ var _http_config_interceptor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./http-config.interceptor */ 3698);
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dashboard/dashboard.component */ 2320);
/* harmony import */ var _shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared.module */ 4179);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 7580);


















function UsersAdminComponent_label_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "label")(1, "input", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("change", function UsersAdminComponent_label_17_Template_input_change_1_listener() {
      const key_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r2.toggleAccess(key_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const key_r2 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("checked", ctx_r2.draft.access.includes(key_r2));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", key_r2, " ");
  }
}
function UsersAdminComponent_tr_35_span_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](item_r4);
  }
}
function UsersAdminComponent_tr_35_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "tr")(1, "td")(2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](4, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](10, UsersAdminComponent_tr_35_span_10_Template, 2, 1, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const user_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](user_r5.fullName);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](user_r5.email);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](user_r5.role);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", user_r5.access);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](user_r5.status);
  }
}
function CvDatabaseComponent_article_26_span_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const skill_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](skill_r1);
  }
}
function CvDatabaseComponent_article_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "article", 19)(1, "div", 20)(2, "div")(3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](10, CvDatabaseComponent_article_26_span_10_Template, 2, 1, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "div", 23)(12, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](13, "Source file");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "div", 23)(17, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](18, "Interviewed earlier");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](19, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](21, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const cv_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](cv_r2.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"]("", cv_r2.currentRole, " at ", cv_r2.company, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", cv_r2.experience, " yrs");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", cv_r2.skills);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](cv_r2.fileName || "Manual entry");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](cv_r2.interviewedEarlier ? "Yes" : "No");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](cv_r2.summary);
  }
}
function RecruitersPageComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 15)(1, "div", 16)(2, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "\uD83E\uDD48");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](8, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "div", 21)(10, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](11, "\uD83E\uDD47");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](16, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "div", 24)(18, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](19, "\uD83E\uDD49");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](22, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](24, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_4_0;
    let tmp_6_0;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r0.recruiters[1] == null ? null : ctx_r0.recruiters[1].name);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", (tmp_2_0 = (tmp_2_0 = ctx_r0.recruiters[1] == null ? null : ctx_r0.recruiters[1].joinings) !== null && tmp_2_0 !== undefined ? tmp_2_0 : ctx_r0.recruiters[1] == null ? null : ctx_r0.recruiters[1].placements) !== null && tmp_2_0 !== undefined ? tmp_2_0 : ctx_r0.recruiters[1] == null ? null : ctx_r0.recruiters[1].selections, " placements");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r0.recruiters[0] == null ? null : ctx_r0.recruiters[0].name);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", (tmp_4_0 = (tmp_4_0 = ctx_r0.recruiters[0] == null ? null : ctx_r0.recruiters[0].joinings) !== null && tmp_4_0 !== undefined ? tmp_4_0 : ctx_r0.recruiters[0] == null ? null : ctx_r0.recruiters[0].placements) !== null && tmp_4_0 !== undefined ? tmp_4_0 : ctx_r0.recruiters[0] == null ? null : ctx_r0.recruiters[0].selections, " placements");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r0.recruiters[2] == null ? null : ctx_r0.recruiters[2].name);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", (tmp_6_0 = (tmp_6_0 = ctx_r0.recruiters[2] == null ? null : ctx_r0.recruiters[2].joinings) !== null && tmp_6_0 !== undefined ? tmp_6_0 : ctx_r0.recruiters[2] == null ? null : ctx_r0.recruiters[2].placements) !== null && tmp_6_0 !== undefined ? tmp_6_0 : ctx_r0.recruiters[2] == null ? null : ctx_r0.recruiters[2].selections, " placements");
  }
}
function RecruitersPageComponent_tr_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "tr", 26)(1, "td", 27)(2, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "td", 27)(5, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "td", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "td", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "td", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "td", 31)(16, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    let tmp_8_0;
    let tmp_9_0;
    let tmp_10_0;
    let tmp_11_0;
    let tmp_12_0;
    let tmp_13_0;
    const r_r2 = ctx.$implicit;
    const i_r3 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵstyleProp"]("background", i_r3 === 0 ? "rgba(251,191,36,.2)" : i_r3 === 1 ? "rgba(192,192,192,.2)" : i_r3 === 2 ? "rgba(205,127,50,.2)" : "var(--surface-alt)")("color", i_r3 === 0 ? "#b45309" : i_r3 === 1 ? "#6b7280" : i_r3 === 2 ? "#92400e" : "var(--text-3)");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](i_r3 + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](r_r2.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](r_r2.role);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"]((tmp_8_0 = r_r2.submissions) !== null && tmp_8_0 !== undefined ? tmp_8_0 : "\u2014");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"]((tmp_9_0 = (tmp_9_0 = r_r2.selections) !== null && tmp_9_0 !== undefined ? tmp_9_0 : r_r2.offers) !== null && tmp_9_0 !== undefined ? tmp_9_0 : "\u2014");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"]((tmp_10_0 = (tmp_10_0 = r_r2.joinings) !== null && tmp_10_0 !== undefined ? tmp_10_0 : r_r2.placements) !== null && tmp_10_0 !== undefined ? tmp_10_0 : "\u2014");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵstyleProp"]("background", ((tmp_11_0 = (tmp_11_0 = r_r2.selectionRatio) !== null && tmp_11_0 !== undefined ? tmp_11_0 : r_r2.acceptanceRate) !== null && tmp_11_0 !== undefined ? tmp_11_0 : 0) >= 30 ? "#d1fae5" : "#fef3c7")("color", ((tmp_12_0 = (tmp_12_0 = r_r2.selectionRatio) !== null && tmp_12_0 !== undefined ? tmp_12_0 : r_r2.acceptanceRate) !== null && tmp_12_0 !== undefined ? tmp_12_0 : 0) >= 30 ? "#065f46" : "#92400e");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", (tmp_13_0 = (tmp_13_0 = r_r2.selectionRatio) !== null && tmp_13_0 !== undefined ? tmp_13_0 : r_r2.acceptanceRate) !== null && tmp_13_0 !== undefined ? tmp_13_0 : 0, "% ");
  }
}
function RecruitersPageComponent_div_35_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 37)(1, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "\u26A0\uFE0F");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 39)(4, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](item_r4.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](item_r4.description);
  }
}
function RecruitersPageComponent_div_35_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 34)(1, "h3", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Attention Needed");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, RecruitersPageComponent_div_35_div_4_Template, 8, 2, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r0.attentionItems);
  }
}
function DropoutPageComponent_div_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 20)(1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](4, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const d_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵstyleProp"]("color", d_r1.color);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](d_r1.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵstyleProp"]("width", d_r1.percentage, "%")("background", d_r1.color);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵstyleProp"]("color", d_r1.color);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](d_r1.count);
  }
}
function DropoutPageComponent_div_30_span_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const f_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](f_r2);
  }
}
function DropoutPageComponent_div_30_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 25)(1, "div", 26)(2, "div")(3, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](10, DropoutPageComponent_div_30_span_10_Template, 2, 1, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const c_r3 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](c_r3.firstName ? c_r3.firstName + " " + c_r3.lastName : c_r3.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"]("", c_r3.stage, " \u00B7 ", c_r3.currentCompany || c_r3.currentTitle || "", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵstyleProp"]("background", ctx_r3.getRiskColor(c_r3.dropoutRisk) + "1a")("color", ctx_r3.getRiskColor(c_r3.dropoutRisk))("border-color", ctx_r3.getRiskColor(c_r3.dropoutRisk));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"]("", c_r3.dropoutRisk, "% \u00B7 ", ctx_r3.getRiskLabel(c_r3.dropoutRisk), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r3.getRiskFactors(c_r3));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](c_r3.dropoutRisk >= 70 ? "Immediate recruiter follow-up recommended." : "Monitor closely \u2014 risk is elevated.");
  }
}
function DropoutPageComponent_div_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "No high-risk candidates found.");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function GenericToolComponent_label_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "label", 8)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "input", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("change", function GenericToolComponent_label_4_Template_input_change_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.onUpload($event, "jd"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"]((ctx_r1.jdFile == null ? null : ctx_r1.jdFile.fileName) || "Upload JD (.pdf, .docx)");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("accept", ctx_r1.allowedTypes);
  }
}
function GenericToolComponent_textarea_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "textarea", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function GenericToolComponent_textarea_5_Template_textarea_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx_r1.jdText, $event) || (ctx_r1.jdText = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.jdText);
  }
}
function GenericToolComponent_label_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "label", 8)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "input", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("change", function GenericToolComponent_label_6_Template_input_change_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r4);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r1.onUpload($event, "resume"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"]((ctx_r1.resumeFile == null ? null : ctx_r1.resumeFile.fileName) || "Upload resume");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("accept", ctx_r1.allowedTypes);
  }
}
function GenericToolComponent_textarea_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "textarea", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function GenericToolComponent_textarea_7_Template_textarea_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r5);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx_r1.resumeText, $event) || (ctx_r1.resumeText = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.resumeText);
  }
}
function GenericToolComponent_textarea_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "textarea", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function GenericToolComponent_textarea_8_Template_textarea_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r6);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx_r1.input, $event) || (ctx_r1.input = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx_r1.input);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("placeholder", ctx_r1.placeholder);
  }
}
function GenericToolComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 13)(1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Result");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "pre");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](5, "json");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](5, 1, ctx_r1.result));
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
    this.api = `${_environments_environment__WEBPACK_IMPORTED_MODULE_4__.environment.apiUrl}/api/users`;
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
      return new (t || UsersAdminComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClient));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
      type: UsersAdminComponent,
      selectors: [["app-users-admin"]],
      decls: 36,
      vars: 6,
      consts: [[1, "grid-page"], [1, "card", "form-card"], ["placeholder", "Full name", 1, "input", 3, "ngModelChange", "ngModel"], ["placeholder", "Email", 1, "input", 3, "ngModelChange", "ngModel"], ["placeholder", "Password", "type", "password", 1, "input", 3, "ngModelChange", "ngModel"], [1, "select", 3, "ngModelChange", "ngModel"], [1, "access-grid"], [4, "ngFor", "ngForOf"], [1, "btn", "btn-primary", 3, "click"], [1, "card", "table-card"], [1, "table"], ["type", "checkbox", 3, "change", "checked"], ["class", "chip chip-brand", 4, "ngFor", "ngForOf"], [1, "chip", "chip-brand"]],
      template: function UsersAdminComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "section", 0)(1, "div", 1)(2, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "Create User");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "input", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function UsersAdminComponent_Template_input_ngModelChange_4_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx.draft.fullName, $event) || (ctx.draft.fullName = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "input", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function UsersAdminComponent_Template_input_ngModelChange_5_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx.draft.email, $event) || (ctx.draft.email = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "input", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function UsersAdminComponent_Template_input_ngModelChange_6_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx.draft.password, $event) || (ctx.draft.password = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "select", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function UsersAdminComponent_Template_select_ngModelChange_7_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx.draft.role, $event) || (ctx.draft.role = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "option");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](9, "TenantAdmin");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "option");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](11, "TeamLead");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "option");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](13, "Recruiter");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "option");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](15, "Viewer");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "div", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](17, UsersAdminComponent_label_17_Template, 3, 2, "label", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "button", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function UsersAdminComponent_Template_button_click_18_listener() {
            return ctx.createUser();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](19, "Create user");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "div", 9)(21, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](22, "Users & Custom Access");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](23, "table", 10)(24, "thead")(25, "tr")(26, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](27, "User");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](28, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](29, "Role");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](30, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](31, "Access");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](32, "th");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](33, "Status");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](34, "tbody");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](35, UsersAdminComponent_tr_35_Template, 13, 5, "tr", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx.draft.fullName);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx.draft.email);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx.draft.password);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx.draft.role);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](10);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.accessKeys);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](18);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.users);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgModel],
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
    this.api = `${_environments_environment__WEBPACK_IMPORTED_MODULE_4__.environment.apiUrl}/api/cv-database`;
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
      skills: this.draft.skillsText.split(',').map(s => s.trim()).filter(Boolean)
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
      if (!this.draft.name) this.draft.name = file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
    };
    reader.readAsDataURL(file);
  }
  static {
    this.ɵfac = function CvDatabaseComponent_Factory(t) {
      return new (t || CvDatabaseComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
      type: CvDatabaseComponent,
      selectors: [["app-cv-database"]],
      decls: 27,
      vars: 12,
      consts: [[1, "stack-page"], [1, "card", "form-row"], ["placeholder", "Search by skill, name, role, company...", 1, "input", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "btn", "btn-primary", 3, "click"], [1, "card", "form-card"], [1, "form-grid"], ["placeholder", "Candidate name", 1, "input", 3, "ngModelChange", "ngModel"], ["placeholder", "Email", 1, "input", 3, "ngModelChange", "ngModel"], ["placeholder", "Current role", 1, "input", 3, "ngModelChange", "ngModel"], ["placeholder", "Company", 1, "input", 3, "ngModelChange", "ngModel"], ["placeholder", "Skills comma separated", 1, "input", 3, "ngModelChange", "ngModel"], ["placeholder", "Experience years", "type", "number", 1, "input", 3, "ngModelChange", "ngModel"], [1, "upload-box"], ["type", "file", 3, "change", "accept"], [1, "check-row"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], ["placeholder", "Paste CV text here", 1, "textarea", 3, "ngModelChange", "ngModel"], [1, "cards-grid"], ["class", "card candidate-card", 4, "ngFor", "ngForOf"], [1, "card", "candidate-card"], [1, "candidate-head"], [1, "skill-row"], ["class", "chip", 4, "ngFor", "ngForOf"], [1, "metric-line"], [1, "chip"]],
      template: function CvDatabaseComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "section", 0)(1, "div", 1)(2, "input", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function CvDatabaseComponent_Template_input_ngModelChange_2_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx.query, $event) || (ctx.query = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("keyup.enter", function CvDatabaseComponent_Template_input_keyup_enter_2_listener() {
            return ctx.search();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "button", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function CvDatabaseComponent_Template_button_click_3_listener() {
            return ctx.search();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "Search CVs");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "div", 4)(6, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7, "Add CV Profile");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "div", 5)(9, "input", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function CvDatabaseComponent_Template_input_ngModelChange_9_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx.draft.name, $event) || (ctx.draft.name = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "input", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function CvDatabaseComponent_Template_input_ngModelChange_10_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx.draft.email, $event) || (ctx.draft.email = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "input", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function CvDatabaseComponent_Template_input_ngModelChange_11_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx.draft.currentRole, $event) || (ctx.draft.currentRole = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "input", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function CvDatabaseComponent_Template_input_ngModelChange_12_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx.draft.company, $event) || (ctx.draft.company = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "input", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function CvDatabaseComponent_Template_input_ngModelChange_13_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx.draft.skillsText, $event) || (ctx.draft.skillsText = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "input", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function CvDatabaseComponent_Template_input_ngModelChange_14_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx.draft.experience, $event) || (ctx.draft.experience = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "label", 12)(16, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](17);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "input", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("change", function CvDatabaseComponent_Template_input_change_18_listener($event) {
            return ctx.onFile($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](19, "label", 14)(20, "input", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function CvDatabaseComponent_Template_input_ngModelChange_20_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx.draft.interviewedEarlier, $event) || (ctx.draft.interviewedEarlier = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](21, " Interviewed earlier ");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](22, "textarea", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function CvDatabaseComponent_Template_textarea_ngModelChange_22_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx.draft.cvText, $event) || (ctx.draft.cvText = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](23, "button", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function CvDatabaseComponent_Template_button_click_23_listener() {
            return ctx.addCv();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](24, "Add to CV database");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](25, "div", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](26, CvDatabaseComponent_article_26_Template, 23, 8, "article", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx.query);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx.draft.name);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx.draft.email);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx.draft.currentRole);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx.draft.company);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx.draft.skillsText);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx.draft.experience);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx.draft.fileName || "Upload CV (.pdf, .docx, .doc, .jpg, .png)");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("accept", ctx.allowedTypes);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx.draft.interviewedEarlier);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx.draft.cvText);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.cvs);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgModel],
      encapsulation: 2
    });
  }
}
class RecruitersPageComponent {
  constructor(http) {
    this.http = http;
    this.recruiters = [];
    this.period = 'month';
    this.attentionItems = [];
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_4__.environment.apiUrl}/api/recruiters`).subscribe(data => {
      this.recruiters = [...data].sort((a, b) => (b.joinings ?? b.placements ?? b.selections ?? 0) - (a.joinings ?? a.placements ?? a.selections ?? 0));
      this.buildAttentionItems();
    });
  }
  setPeriod(p) {
    this.period = p;
    this.load();
  }
  buildAttentionItems() {
    const items = [];
    const low = this.recruiters.filter(r => (r.selectionRatio ?? r.acceptanceRate ?? 100) < 20);
    if (low.length) items.push({
      title: `${low[0].name} has low hit rate`,
      description: `${low[0].selectionRatio ?? low[0].acceptanceRate ?? 0}% — investigation recommended`
    });
    const top = this.recruiters[0];
    if (top) items.push({
      title: `${top.name} is leading this ${this.period}`,
      description: `${top.joinings ?? top.placements ?? top.selections} placements — consider recognition`
    });
    this.attentionItems = items;
  }
  static {
    this.ɵfac = function RecruitersPageComponent_Factory(t) {
      return new (t || RecruitersPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClient));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
      type: RecruitersPageComponent,
      selectors: [["app-recruiters"]],
      decls: 36,
      vars: 9,
      consts: [[1, "page-container", "page-enter"], [1, "flex", "justify-between", "items-center", "mb-6"], [1, "page-title"], [1, "text-sm", 2, "color", "var(--text-3)"], [2, "display", "flex", "gap", "8px"], [1, "btn", "btn-ghost", "btn-sm", 3, "click"], ["class", "rec-podium", 4, "ngIf"], [1, "card", "mb-6"], [1, "card-title", "mb-4"], [2, "width", "100%", "border-collapse", "collapse"], [2, "border-bottom", "2px solid var(--border)"], [2, "padding", "10px", "text-align", "left", "font-size", "12px", "color", "var(--text-3)"], [2, "padding", "10px", "text-align", "center", "font-size", "12px", "color", "var(--text-3)"], ["style", "border-bottom:1px solid var(--border);", 4, "ngFor", "ngForOf"], ["class", "card", 4, "ngIf"], [1, "rec-podium"], [1, "rec-podium-item", "rec-p2"], [1, "rec-medal"], [1, "rec-podium-name"], [1, "rec-podium-stat"], [1, "rec-podium-block", 2, "height", "80px", "background", "#c0c0c0", "opacity", ".3", "border-radius", "6px 6px 0 0", "margin-top", "8px"], [1, "rec-podium-item", "rec-p1"], [1, "rec-podium-name", 2, "font-size", "16px"], [1, "rec-podium-block", 2, "height", "110px", "background", "var(--brand-violet-500)", "opacity", ".2", "border-radius", "6px 6px 0 0", "margin-top", "8px"], [1, "rec-podium-item", "rec-p3"], [1, "rec-podium-block", 2, "height", "55px", "background", "#cd7f32", "opacity", ".3", "border-radius", "6px 6px 0 0", "margin-top", "8px"], [2, "border-bottom", "1px solid var(--border)"], [2, "padding", "12px 10px"], [1, "rank-badge-r"], [2, "font-weight", "600"], [2, "font-size", "12px", "color", "var(--text-3)"], [2, "padding", "12px 10px", "text-align", "center"], [2, "padding", "12px 10px", "text-align", "center", "font-weight", "700"], [2, "padding", "2px 10px", "border-radius", "20px", "font-size", "12px", "font-weight", "700"], [1, "card"], [2, "display", "flex", "flex-direction", "column", "gap", "10px"], ["style", "display:flex;align-items:center;gap:12px;padding:12px 14px;background:rgba(251,146,60,.05);border-left:3px solid #f97316;border-radius:0 8px 8px 0;", 4, "ngFor", "ngForOf"], [2, "display", "flex", "align-items", "center", "gap", "12px", "padding", "12px 14px", "background", "rgba(251,146,60,.05)", "border-left", "3px solid #f97316", "border-radius", "0 8px 8px 0"], [2, "font-size", "18px"], [2, "flex", "1"], [2, "font-weight", "600", "font-size", "13px"]],
      template: function RecruitersPageComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "Recruiter Performance");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "p", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, "Leaderboard, placements & pipeline health");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "div", 4)(8, "button", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function RecruitersPageComponent_Template_button_click_8_listener() {
            return ctx.setPeriod("month");
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](9, "Month");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "button", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function RecruitersPageComponent_Template_button_click_10_listener() {
            return ctx.setPeriod("quarter");
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](11, "Quarter");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "button", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function RecruitersPageComponent_Template_button_click_12_listener() {
            return ctx.setPeriod("year");
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](13, "Year");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](14, RecruitersPageComponent_div_14_Template, 25, 6, "div", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "div", 7)(16, "h3", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](17, "Leaderboard");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "table", 9)(19, "thead")(20, "tr", 10)(21, "th", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](22, "Rank");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](23, "th", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](24, "Recruiter");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](25, "th", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](26, "Submissions");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](27, "th", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](28, "Selections");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](29, "th", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](30, "Joinings");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](31, "th", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](32, "Hit Rate");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](33, "tbody");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](34, RecruitersPageComponent_tr_34_Template, 18, 15, "tr", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](35, RecruitersPageComponent_div_35_Template, 5, 1, "div", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("btn-primary", ctx.period === "month");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("btn-primary", ctx.period === "quarter");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("btn-primary", ctx.period === "year");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.recruiters.length >= 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](20);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.recruiters);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.attentionItems.length);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf],
      styles: [".rec-podium[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:24px;align-items:flex-end}.rec-podium-item[_ngcontent-%COMP%]{text-align:center;background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px 12px 0}.rec-medal[_ngcontent-%COMP%]{font-size:36px;margin-bottom:8px}.rec-podium-name[_ngcontent-%COMP%]{font-weight:700;font-size:14px}.rec-podium-stat[_ngcontent-%COMP%]{font-size:12px;color:var(--text-3);margin-top:4px}.rank-badge-r[_ngcontent-%COMP%]{display:inline-block;padding:3px 10px;border-radius:6px;font-weight:700;font-size:13px}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXBwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLFlBQVksQ0FBQyxpQ0FBaUMsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCLGlCQUFpQixDQUFDLHlCQUF5QixDQUFDLDhCQUE4QixDQUFDLGtCQUFrQixDQUFDLG1CQUFtQixDQUFDLFdBQVcsY0FBYyxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixlQUFlLENBQUMsY0FBYyxDQUFDLGlCQUFpQixjQUFjLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDLGNBQWMsb0JBQW9CLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIucmVjLXBvZGl1bXtkaXNwbGF5OmdyaWQ7Z3JpZC10ZW1wbGF0ZS1jb2x1bW5zOjFmciAxZnIgMWZyO2dhcDoxNnB4O21hcmdpbi1ib3R0b206MjRweDthbGlnbi1pdGVtczpmbGV4LWVuZH0ucmVjLXBvZGl1bS1pdGVte3RleHQtYWxpZ246Y2VudGVyO2JhY2tncm91bmQ6dmFyKC0tc3VyZmFjZSk7Ym9yZGVyOjFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO2JvcmRlci1yYWRpdXM6MTJweDtwYWRkaW5nOjIwcHggMTJweCAwfS5yZWMtbWVkYWx7Zm9udC1zaXplOjM2cHg7bWFyZ2luLWJvdHRvbTo4cHh9LnJlYy1wb2RpdW0tbmFtZXtmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjE0cHh9LnJlYy1wb2RpdW0tc3RhdHtmb250LXNpemU6MTJweDtjb2xvcjp2YXIoLS10ZXh0LTMpO21hcmdpbi10b3A6NHB4fS5yYW5rLWJhZGdlLXJ7ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZzozcHggMTBweDtib3JkZXItcmFkaXVzOjZweDtmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjEzcHh9Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}
class DropoutPageComponent {
  constructor(http) {
    this.http = http;
    this.allCandidates = [];
    this.atRiskCandidates = [];
    this.atRiskCount = 0;
    this.totalCandidates = 0;
    this.riskDistribution = [{
      label: 'Critical (80%+)',
      count: 0,
      percentage: 0,
      color: '#ef4444'
    }, {
      label: 'High (60–79%)',
      count: 0,
      percentage: 0,
      color: '#f97316'
    }, {
      label: 'Medium (40–59%)',
      count: 0,
      percentage: 0,
      color: '#eab308'
    }, {
      label: 'Low (<40%)',
      count: 0,
      percentage: 0,
      color: '#22c55e'
    }];
  }
  ngOnInit() {
    this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_4__.environment.apiUrl}/api/candidates`).subscribe(data => {
      this.allCandidates = data;
      this.totalCandidates = data.length;
      this.atRiskCandidates = data.filter(c => (c.dropoutRisk ?? 0) >= 40).sort((a, b) => b.dropoutRisk - a.dropoutRisk);
      this.atRiskCount = this.atRiskCandidates.length;
      this.updateDistribution();
    });
  }
  updateDistribution() {
    const all = this.allCandidates;
    const total = all.length || 1;
    this.riskDistribution = [{
      label: 'Critical (80%+)',
      count: all.filter(c => c.dropoutRisk >= 80).length,
      percentage: 0,
      color: '#ef4444'
    }, {
      label: 'High (60–79%)',
      count: all.filter(c => c.dropoutRisk >= 60 && c.dropoutRisk < 80).length,
      percentage: 0,
      color: '#f97316'
    }, {
      label: 'Medium (40–59%)',
      count: all.filter(c => c.dropoutRisk >= 40 && c.dropoutRisk < 60).length,
      percentage: 0,
      color: '#eab308'
    }, {
      label: 'Low (<40%)',
      count: all.filter(c => (c.dropoutRisk ?? 0) < 40).length,
      percentage: 0,
      color: '#22c55e'
    }];
    this.riskDistribution.forEach(d => d.percentage = Math.round(d.count / total * 100));
  }
  getRiskColor(risk) {
    return risk >= 80 ? '#ef4444' : risk >= 60 ? '#f97316' : risk >= 40 ? '#eab308' : '#22c55e';
  }
  getRiskLabel(risk) {
    return risk >= 80 ? 'Critical' : risk >= 60 ? 'High' : risk >= 40 ? 'Medium' : 'Low';
  }
  getRiskFactors(c) {
    const f = [];
    if ((c.dropoutRisk ?? 0) >= 80) f.push('Very high risk');
    if ((c.matchScore ?? 100) < 60) f.push('Poor JD match');
    if (c.stage) f.push(`Stage: ${c.stage}`);
    return f.length ? f : ['Risk score elevated'];
  }
  static {
    this.ɵfac = function DropoutPageComponent_Factory(t) {
      return new (t || DropoutPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClient));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
      type: DropoutPageComponent,
      selectors: [["app-dropout"]],
      decls: 32,
      vars: 10,
      consts: [[1, "page-container", "page-enter"], [1, "flex", "justify-between", "items-center", "mb-6"], [1, "page-title"], [1, "text-sm", 2, "color", "var(--text-3)"], [1, "dp-overview-grid"], [1, "card", "dp-donut-card"], [2, "font-size", "13px", "font-weight", "600", "color", "var(--text-3)", "margin-bottom", "8px"], ["viewBox", "0 0 120 120", "width", "140", "height", "140", 2, "display", "block", "margin", "0 auto"], ["cx", "60", "cy", "60", "r", "48", "fill", "none", "stroke", "#e5e7eb", "stroke-width", "14"], ["cx", "60", "cy", "60", "r", "48", "fill", "none", "stroke", "#ef4444", "stroke-width", "14", "stroke-dashoffset", "75.4", "transform", "rotate(-90 60 60)", "stroke-linecap", "round"], ["x", "60", "y", "56", "text-anchor", "middle", "font-size", "20", "font-weight", "800", "fill", "#ef4444"], ["x", "60", "y", "72", "text-anchor", "middle", "font-size", "10", "fill", "#9ca3af"], [2, "text-align", "center", "margin-top", "8px", "font-size", "13px", "color", "var(--text-3)"], [1, "card", 2, "flex", "1", "min-width", "0"], [1, "card-title", "mb-4"], [2, "display", "flex", "flex-direction", "column", "gap", "12px"], ["style", "display:grid;grid-template-columns:140px 1fr 40px;gap:10px;align-items:center;", 4, "ngFor", "ngForOf"], [1, "card"], ["class", "dp-candidate-card", 4, "ngFor", "ngForOf"], ["style", "text-align:center;padding:40px;color:var(--text-3);", 4, "ngIf"], [2, "display", "grid", "grid-template-columns", "140px 1fr 40px", "gap", "10px", "align-items", "center"], [2, "font-size", "12px", "font-weight", "600"], [2, "height", "20px", "background", "var(--surface-alt)", "border-radius", "4px", "overflow", "hidden"], [2, "height", "100%", "border-radius", "4px", "transition", "width .4s"], [2, "font-weight", "700", "text-align", "right"], [1, "dp-candidate-card"], [1, "dp-card-top"], [2, "font-weight", "700", "font-size", "14px"], [2, "font-size", "12px", "color", "var(--text-3)"], [1, "dp-risk-pill"], [2, "display", "flex", "flex-wrap", "wrap", "gap", "6px", "margin-top", "8px"], ["style", "font-size:11px;background:var(--surface-alt);padding:2px 8px;border-radius:4px;color:var(--text-3);", 4, "ngFor", "ngForOf"], [2, "margin-top", "8px", "font-size", "12px", "color", "var(--text-3)"], [2, "font-size", "11px", "background", "var(--surface-alt)", "padding", "2px 8px", "border-radius", "4px", "color", "var(--text-3)"], [2, "text-align", "center", "padding", "40px", "color", "var(--text-3)"]],
      template: function DropoutPageComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "Dropout Predictor");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "p", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, "AI-powered candidate dropout risk analysis");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "div", 4)(8, "div", 5)(9, "div", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10, "At-Risk Candidates");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnamespaceSVG"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "svg", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](12, "circle", 8)(13, "circle", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "text", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](15);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "text", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](17);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnamespaceHTML"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "div", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](19);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](20, "number");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](21, "div", 13)(22, "h3", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](23, "Risk Distribution");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](24, "div", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](25, DropoutPageComponent_div_25_Template, 7, 10, "div", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](26, "div", 17)(27, "h3", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](28, "High-Risk Candidates");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](29, "div", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](30, DropoutPageComponent_div_30_Template, 13, 13, "div", 18)(31, DropoutPageComponent_div_31_Template, 2, 0, "div", 19);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](13);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵattribute"]("stroke-dasharray", ctx.atRiskCount / (ctx.totalCandidates || 1) * 301.6 + " 301.6");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx.atRiskCount);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("of ", ctx.totalCandidates, "");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", ctx.totalCandidates ? _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](20, 7, ctx.atRiskCount / ctx.totalCandidates * 100, "1.0-0") : 0, "% at risk");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.riskDistribution);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.atRiskCandidates);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.atRiskCandidates.length);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.DecimalPipe],
      styles: [".dp-overview-grid[_ngcontent-%COMP%]{display:flex;gap:20px;margin-bottom:24px}.dp-donut-card[_ngcontent-%COMP%]{min-width:180px;text-align:center}.dp-candidate-card[_ngcontent-%COMP%]{padding:14px 16px;background:var(--surface);border:1px solid var(--border);border-radius:10px}.dp-card-top[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:flex-start;gap:12px}.dp-risk-pill[_ngcontent-%COMP%]{padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;border:1px solid;white-space:nowrap}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXBwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxrQkFBa0IsWUFBWSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsaUJBQWlCLENBQUMseUJBQXlCLENBQUMsOEJBQThCLENBQUMsa0JBQWtCLENBQUMsYUFBYSxZQUFZLENBQUMsNkJBQTZCLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLGNBQWMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIuZHAtb3ZlcnZpZXctZ3JpZHtkaXNwbGF5OmZsZXg7Z2FwOjIwcHg7bWFyZ2luLWJvdHRvbToyNHB4fS5kcC1kb251dC1jYXJke21pbi13aWR0aDoxODBweDt0ZXh0LWFsaWduOmNlbnRlcn0uZHAtY2FuZGlkYXRlLWNhcmR7cGFkZGluZzoxNHB4IDE2cHg7YmFja2dyb3VuZDp2YXIoLS1zdXJmYWNlKTtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7Ym9yZGVyLXJhZGl1czoxMHB4fS5kcC1jYXJkLXRvcHtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47YWxpZ24taXRlbXM6ZmxleC1zdGFydDtnYXA6MTJweH0uZHAtcmlzay1waWxse3BhZGRpbmc6NHB4IDEycHg7Ym9yZGVyLXJhZGl1czoyMHB4O2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjcwMDtib3JkZXI6MXB4IHNvbGlkO3doaXRlLXNwYWNlOm5vd3JhcH0iXSwic291cmNlUm9vdCI6IiJ9 */"]
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
      this.title = path.includes('jd-checker') ? 'JD Checker' : path.includes('competency-ranker') ? 'Competency Ranker' : 'AI Assistant';
      this.needsJd = this.title !== 'AI Assistant';
      this.needsResume = false;
    });
  }
  analyze() {
    this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_4__.environment.apiUrl}/api/ai/analyze`, {
      type: this.title,
      text: this.input,
      jdText: this.jdText,
      resumeText: this.resumeText
    }).subscribe(r => this.result = r);
  }
  onUpload(event, target) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const payload = {
        fileName: file.name,
        fileType: file.type,
        fileData: String(reader.result || '')
      };
      if (target === 'jd') this.jdFile = payload;else this.resumeFile = payload;
    };
    reader.readAsDataURL(file);
  }
  static {
    this.ɵfac = function GenericToolComponent_Factory(t) {
      return new (t || GenericToolComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
      type: GenericToolComponent,
      selectors: [["app-tool"]],
      decls: 12,
      vars: 7,
      consts: [[1, "stack-page"], [1, "card", "form-card"], ["class", "upload-box", 4, "ngIf"], ["class", "textarea", "placeholder", "Or type / paste JD here", 3, "ngModel", "ngModelChange", 4, "ngIf"], ["class", "textarea", "placeholder", "Or paste resume text here", 3, "ngModel", "ngModelChange", 4, "ngIf"], ["class", "textarea", 3, "ngModel", "placeholder", "ngModelChange", 4, "ngIf"], [1, "btn", "btn-primary", 3, "click"], ["class", "card", 4, "ngIf"], [1, "upload-box"], ["type", "file", 3, "change", "accept"], ["placeholder", "Or type / paste JD here", 1, "textarea", 3, "ngModelChange", "ngModel"], ["placeholder", "Or paste resume text here", 1, "textarea", 3, "ngModelChange", "ngModel"], [1, "textarea", 3, "ngModelChange", "ngModel", "placeholder"], [1, "card"]],
      template: function GenericToolComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "section", 0)(1, "div", 1)(2, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, GenericToolComponent_label_4_Template, 4, 2, "label", 2)(5, GenericToolComponent_textarea_5_Template, 1, 1, "textarea", 3)(6, GenericToolComponent_label_6_Template, 4, 2, "label", 2)(7, GenericToolComponent_textarea_7_Template, 1, 1, "textarea", 4)(8, GenericToolComponent_textarea_8_Template, 1, 2, "textarea", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "button", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function GenericToolComponent_Template_button_click_9_listener() {
            return ctx.analyze();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10, "Analyze");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](11, GenericToolComponent_div_11_Template, 6, 3, "div", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx.title);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.needsJd);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.needsJd);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.needsResume);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.needsResume);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.needsJd && !ctx.needsResume);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.result);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_7__.JsonPipe],
      encapsulation: 2
    });
  }
}
const routes = [{
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full'
}, {
  path: 'dashboard',
  component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_2__.DashboardComponent
}, {
  path: 'recruiters',
  component: RecruitersPageComponent
}, {
  path: 'cv-database',
  component: CvDatabaseComponent
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
  path: 'users',
  component: UsersAdminComponent
}, {
  path: '',
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_features_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./features.module */ 6645)).then(m => m.FeaturesModule)
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
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
      type: AppModule,
      bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent]
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
      providers: [{
        provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HTTP_INTERCEPTORS,
        useClass: _http_config_interceptor__WEBPACK_IMPORTED_MODULE_1__.HttpConfigInterceptor,
        multi: true
      }, _angular_common__WEBPACK_IMPORTED_MODULE_7__.CurrencyPipe, _angular_common__WEBPACK_IMPORTED_MODULE_7__.DecimalPipe, _angular_common__WEBPACK_IMPORTED_MODULE_7__.DatePipe],
      imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__.BrowserAnimationsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.ReactiveFormsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClientModule, _shared_module__WEBPACK_IMPORTED_MODULE_3__.SharedModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_12__.MatMenuModule, _angular_material_divider__WEBPACK_IMPORTED_MODULE_13__.MatDividerModule, _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'top'
      })]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent, _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_2__.DashboardComponent, RecruitersPageComponent, CvDatabaseComponent, DropoutPageComponent, GenericToolComponent, UsersAdminComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__.BrowserAnimationsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.ReactiveFormsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClientModule, _shared_module__WEBPACK_IMPORTED_MODULE_3__.SharedModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_12__.MatMenuModule, _angular_material_divider__WEBPACK_IMPORTED_MODULE_13__.MatDividerModule, _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterModule]
  });
})();

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
    // Add Content-Type for JSON requests only — skip FormData so the browser
    // can auto-set multipart/form-data with the correct boundary.
    if (!request.headers.has('Content-Type') && !(request.body instanceof FormData)) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
    }
    // Never retry auth requests — fail immediately so the UI shows feedback right away
    const isAuthRequest = request.url.includes('/api/auth');
    return next.handle(request).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.retryWhen)(errors => errors.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.mergeMap)((error, index) => {
      const isRetryable = !isAuthRequest && (error.status >= 500 && error.status < 600 || error.status === 0) && index < 3;
      if (isRetryable) {
        const delayMs = Math.pow(2, index) * 1000;
        console.warn(`Retrying request (attempt ${index + 1}): ${request.url}`, {
          delayMs
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.timer)(delayMs);
      }
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.throwError)(() => error);
    }))), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
      if (error.status === 401) {
        // Only logout when the token is absent or genuinely expired.
        // A 401 from a backend logic failure (e.g. user record not found) should not
        // destroy the session — the user would be trapped in a logout loop.
        if (this.isTokenMissingOrExpired()) {
          this.authService.logout();
        }
      }
      console.error('HTTP Error:', {
        status: error.status,
        message: error.message,
        url: error.url
      });
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.throwError)(() => error);
    }));
  }
  isTokenMissingOrExpired() {
    const token = this.authService.getToken();
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp ? Date.now() / 1000 >= payload.exp : true;
    } catch {
      return true;
    }
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

/***/ 4179:
/*!**********************************!*\
  !*** ./src/app/shared.module.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SafeHtmlPipe: () => (/* binding */ SafeHtmlPipe),
/* harmony export */   SharedModule: () => (/* binding */ SharedModule),
/* harmony export */   TimeAgoPipe: () => (/* binding */ TimeAgoPipe)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 436);


class SafeHtmlPipe {
  constructor(sanitizer) {
    this.sanitizer = sanitizer;
  }
  transform(value) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
  static {
    this.ɵfac = function SafeHtmlPipe_Factory(t) {
      return new (t || SafeHtmlPipe)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.DomSanitizer, 16));
    };
  }
  static {
    this.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({
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
    this.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({
      name: "timeAgo",
      type: TimeAgoPipe,
      pure: true
    });
  }
}
class SharedModule {
  static {
    this.ɵfac = function SharedModule_Factory(t) {
      return new (t || SharedModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: SharedModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({});
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](SharedModule, {
    declarations: [SafeHtmlPipe, TimeAgoPipe],
    exports: [SafeHtmlPipe, TimeAgoPipe]
  });
})();

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