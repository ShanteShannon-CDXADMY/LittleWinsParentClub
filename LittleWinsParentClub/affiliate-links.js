// After affiliate approval, replace empty values with YOUR program-generated HTTPS links.
// Empty values leave the manufacturer links intact. Do not invent tracking IDs.
const affiliateLinks = {
  'babybjorn-smart-potty': '',
  'oxo-go-potty': '',
  'vicks-speedread': '',
  'braun-thermoscan7': ''
};
let activeAffiliateLinks=false;
document.querySelectorAll('[data-product]').forEach(link=>{const value=affiliateLinks[link.dataset.product];if(!value)return;try{const url=new URL(value);if(url.protocol!=='https:')return;link.href=url.href;link.rel='sponsored noopener';activeAffiliateLinks=true;}catch{}});
if(activeAffiliateLinks)document.querySelectorAll('[data-affiliate-disclosure]').forEach(el=>{el.textContent='These are researched product reviews based on manufacturer information, not hands-on tests. I may earn a commission if you buy through affiliate links on this page. Manufacturer source links are shown below.'});
