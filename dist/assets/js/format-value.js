<script>
$(document).on("keypress",".format-value",(function(e){let t=e.which?e.which:e.keyCode;if(t>31&&(t<48||t>57))return!1})),$(document).on("keyup",".format-value",(function(e){let t=this.value;if(t=t.replace(/,/g,""),t.length>3){let e=Math.ceil(t.length/3)-1,l=t.length-3*e,n=[];for(let l=0;l<e;l++)n.unshift(t.substr(t.length-3*l-3,3));n.unshift(t.substr(0,l)),this.value=n}else this.value=t}));
//# sourceMappingURL=format-value.js.map
</script>