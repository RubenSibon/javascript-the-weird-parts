import{config}from"./_config.js";import{translate}from"./_translateStrings.js";import{formIsValid,formError,formEnable}from"./_formValidation.js";import{logIn}from"./_userAccount.js";!function(e){if(!e)throw"Greetr library not found.";window.g=e("John","Wick","en");const r=["#firstName","#lastName"],o=e=>{e.preventDefault();let r=!1;logIn(!1),formIsValid(config.selectors.loginForm)?formEnable(config.selectors.loginForm):(r=!0,formEnable(config.selectors.loginForm,!1)),"lastName"===e.target.id&&"Tab"!==e.key?formError(r):formError(!1)};document.querySelector("#langSelect").addEventListener("change",e=>{e.preventDefault(),e.target.value!==config.state.currentLanguage&&(config.state.currentLanguage=e.target.value,g.setLang(e.target.value),translate(e.target.value))});for(const e of r)document.querySelector(e).addEventListener("keyup",e=>o(e)),document.querySelector(e).addEventListener("blur",e=>o(e));document.querySelector("#login").addEventListener("click",e=>{e.preventDefault(),formIsValid(config.selectors.loginForm)?(formError(!1),!0!==config.state.loggedIn?logIn(!0):logIn(!1)):(logIn(!1),document.querySelector(config.selectors.loginForm)||formError())}),document.querySelector("#logout").addEventListener("click",e=>{e.preventDefault(),logIn(!1)})}(Greetr);