import{a as v,S as w,i as u}from"./assets/vendor-eaddd480.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function l(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=l(e);fetch(e.href,r)}})();function h(s){let t="";return s.forEach(({webformatURL:l,largeImageURL:n,tags:e,likes:r,views:c,comments:L,downloads:b})=>{t+=`<li class="gallery-item">
          <a class="link" href="${n}">
            <img class="form-img" src="${l}" alt="${e}" />
            <ul class="description-list">
              <li class="description-item">
                <p class="text-">Likes</p>
                <p class="number">${r}</p>
              </li>
              <li class="description-item">
                <p class="text-">Views</p>
                <p class="number">${c}</p>
              </li>
              <li class="description-item">
                <p class="text-">Comments</p>
                <p class="number">${L}</p>
              </li>
              <li class="description-item">
                <p class="text-">Downloads</p>
                <p class="number">${b}</p>
              </li>
            </ul>
          </a>
        </li>`}),t}async function g(s,t){const l=new URLSearchParams({key:"41274788-792c8d92905fcf9da75194117",q:`${s}`,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:40,page:t}).toString();return(await v.get(`https://pixabay.com/api/?${l}`)).data}function S(){const s=window.innerHeight-100;window.scrollBy({top:s,behavior:"smooth"})}let o,d,m;const p=document.querySelector(".gallery"),i=document.querySelector(".loader");i.classList.remove("loader");const f=document.querySelector(".form"),y=new w(".gallery .link",{captionsData:"alt",captionDelay:250});document.querySelector(".page-section").insertAdjacentHTML("beforeend",'<button class="download-more">Load more</button>');const a=document.querySelector(".download-more");f.addEventListener("submit",async s=>{if(s.preventDefault(),d=s.target.elements.search.value.trim(),d===""){u.show({message:"❌ Field must be filled in",position:"topRight",color:"red"});return}a.classList.remove("is-visibal"),i.classList.add("loader"),o=1,f.reset(),p.innerHTML="";try{const t=await g(d,o);if(t.hits.length===0){i.classList.remove("loader"),u.show({message:"❌ Sorry, there are no images matching your search query. Please try again!",position:"topRight",color:"red"}),a.classList.remove("is-visibal");return}i.classList.remove("loader"),p.insertAdjacentHTML("afterbegin",h(t.hits)),y.refresh(),m=Math.ceil(t.totalHits/40),o<m&&a.classList.add("is-visibal")}catch(t){console.log(t)}});a.addEventListener("click",async()=>{a.classList.remove("is-visibal"),i.classList.add("loader"),o++;try{const s=await g(d,o);if(i.classList.remove("loader"),p.insertAdjacentHTML("beforeend",h(s.hits)),y.refresh(),m===o){u.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",color:"blue"});return}a.classList.add("is-visibal"),S()}catch(s){console.log(s)}});
//# sourceMappingURL=commonHelpers.js.map
