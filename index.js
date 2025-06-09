import{a as h,i as d}from"./assets/vendor-Dy6RejrS.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();const y="https://sound-wave.b.goit.study/api",m=8;async function L(e=1){try{const t=await h.get(`${y}/artists`,{params:{page:e,limit:m}});return t.data?t.data||[]:(console.error("Error: API returned no data"),[])}catch(t){throw console.error("Error:",t),t}}function g(e,t){return typeof e!="string"?"":e.length>t?e.slice(0,t)+"...":e}const v=document.querySelectorAll(".artist-description"),A=67;v.forEach(e=>{if(e){const t=g(e.textContent,A);e.textContent=t}});const i=document.querySelector(".loader");function b(e){return`
    <ul class="artist-genre-list">
      ${e.map(t=>`<li class="artist-genre-item">${t}</li>`).join("")}
    </ul>
  `}function w(e){return e.map(t=>`
    <li class="artist-item">
          <img class="artist-item-img" src="${t.strArtistThumb}" alt="${t.strArtist}">
          ${b(t.genres)}
          <p class="artist-name">${t.strArtist}</p>
          <p class="artist-description">${g(t.strBiographyEN,67)}</p>
          <button type="button" class="artist-learn-btn" data-id="${t._id}">Learn More
            <svg class="learn-btn-svg">
               <use href="/img/icons-svg.svg#icon-icon"></use>
            </svg>
          </button>
        </li>`).join("")}function E(){i.classList.add("is-active"),i.classList.remove("is-hidden")}function S(){i.classList.add("is-hidden"),i.classList.remove("is-active")}function u(){l.classList.add("is-hidden"),l.classList.remove("is-active")}const $=document.querySelector(".artist-list"),l=document.querySelector(".artist-load-btn");let c=1,f=0;l.addEventListener("click",p);document.addEventListener("DOMContentLoaded",p);async function p(){E();try{const e=await L(c),t=e.artists;if(f=e.totalArtists,c*m>=f){u(),d.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}if(!t||!Array.isArray(t)){console.error("Error: fetched data is not an array or is undefined");return}if(t.length===0){u();return}const n=w(t);$.insertAdjacentHTML("beforeend",n),c++}catch(e){console.error("Error loading artists:",e),d.error({message:"Something went wrong. Please try again later.",position:"topCenter"})}finally{S();const e=document.querySelector(".artist-item");if(e){const t=e.getBoundingClientRect().height;window.scrollBy({top:t,behavior:"smooth"})}}}const M=document.querySelector(".artist-list");M.addEventListener("click",e=>{const t=e.target.closest(".artist-learn-btn");if(!t)return;const o=t.dataset.id;console.log("ID виконавця:",o)});
//# sourceMappingURL=index.js.map
