<script>
$('form[action^="https://api.hsforms.com"]').each(function(e){$(this).find("input[type=checkbox]").val("true"),$(this).submit(function(e){e.preventDefault();let n=new FormData(e.target),t=[...n.entries()].map(e=>({name:e[0],value:e[1]})),i=t.find(e=>"goToWebinarWebinarKey"===e.name)?.value,a=t.find(e=>"sfdcCampaignId"===e.name)?.value,o=document.cookie.replace(/(?:(?:^|.*;\s*)hubspotutk\s*\=\s*([^;]*).*$)|^.*$/,"$1")||void 0;console.log(o);let s=$(this).find("[id*='gdpr-processing-prompt']"),r=t.filter(e=>e.name.includes("LEGAL_CONSENT")).map(e=>{let n=$(`#${e.name.replace(/(:|\.|\[|\]|,|=|@)/g,"\\$1")}`)[0],t=$("span[for='"+$(n).attr("id").replace(/(:|\.|\[|\]|,|=|@)/g,"\\$1")+"']");return{value:n.checked,text:t.text(),subscriptionTypeId:parseInt(e.name.split("LEGAL_CONSENT.subscription_type_")[1])}}),c=["cc-num","cc-number","gdpr","LEGAL_CONSENT","goToWebinarWebinarKey","sfdcCampaignId",],p={fields:t.filter(e=>!c.find(n=>e.name.includes(n))),context:{pageUri:window.location.href,pageName:document.title,sfdcCampaignId:a,goToWebinarKey:i,hutk:o},...s?{legalConsentOptions:{consent:{...s?{consentToProcess:!0,text:s.text()}:{},...r?{communications:r}:{}}}}:{}},l=JSON.stringify(p);$.ajax({url:e.target.action,type:"POST",dataType:"json",data:l,contentType:"application/json;charset=utf-8",accept:"application/json",success:function(n){if(n&&n.inlineMessage){let t=$(e.target).parent();t.children("form").css("display","none"),t.children(".w-form-done").show()}},error:function(){console.log("error on the form submission"),$(e.target).css("display","none").siblings(".w-form-fail").show()}})})});
</script>