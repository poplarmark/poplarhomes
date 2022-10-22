<script>
var Webflow=Webflow||[];Webflow.push((function(){$(document).off("submit"),$("form").submit((function(t){t.preventDefault();const a=$(this),i=$("[type=submit]",a),o=i.val(),e=i.attr("data-wait"),s=a.attr("method"),l=a.attr("action"),n=a.attr("data-redirect"),f=a.serialize();e&&i.val(e),$.ajax(l,{data:f,method:s}).done((t=>{n?window.location=n:a.siblings(".w-form-done").show().siblings(".w-form-fail").hide()})).fail((t=>{a.siblings(".w-form-done").hide().siblings(".w-form-fail").show()})).always((()=>{i.val(o)}))}))}));
//# sourceMappingURL=custom-form-submit.js.map
</script>