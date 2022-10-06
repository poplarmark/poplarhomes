<script>
$(document).ready(function(){
    $('.required').blur(function(){
        
        if($(this).val() != ''){
            $(this).removeClass('add-border-red');
        }else {
            $(this).addClass('add-border-red');
        }      
    });

    $('.bootstrap-tagsinput').blur(function(){
        
        if($(this).val() != ''){
            $(this).removeClass('add-border-red');
        }else {
            $(this).addClass('add-border-red');
        }      
    });
});
</script>