<script>
var queryString=window.location.search;console.log(queryString);var URLSearchParams_wb=new URLSearchParams(queryString);const utmParameters=["utm_source","utm_medium","utm_campaign","utm_content","utm_terms"];for(const a of utmParameters)$("form").each((function(r){if(URLSearchParams_wb.has(a)){console.log(a+" exists");var e=URLSearchParams_wb.get(a);$(this).find("."+a).val(e)}}));
//# sourceMappingURL=utm_parser.js.map
</script>