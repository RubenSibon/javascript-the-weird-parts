import{config}from"./_config.js";import{addClass,removeClass}from"./_cssClass.js";export function logIn(e){let o,s;e?(config.state.loggedIn=!0,g.firstName=document.querySelector(config.selectors.loginForm+" #firstName").value,g.lastName=document.querySelector(config.selectors.loginForm+" #lastName").value,g.age=document.querySelector(config.selectors.loginForm+" #age").value,g.HTMLGreeting("#toGreet",g.age>29),o="is-flipped",s="is-flippable"):(config.state.loggedIn=!1,o="is-flippable",s="is-flipped"),addClass(config.selectors.card,o),removeClass(config.selectors.card,s)};