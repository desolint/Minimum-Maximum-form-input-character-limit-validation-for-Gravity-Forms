jQuery(document).on('gform_post_render', function(event, form_id, current_page) {
    // code to trigger on form or form page render
    jQuery(document).ready(function($) {

        jQuery('.gform_next_button').attr("disabled", true);
        var acceptNone = 'keine';
        jQuery('.gfield').each(function(index, mainvalue) {
            thisfield = jQuery(this);

            thisfield.find('input:not([type=hidden])').after("<span class='validation_message gfield_validation_message ernomin'></span>");
            thisfield.find('.ernomin').css('display', 'none');
            thisfield.find('input:not([type=hidden])').after("<span class='validation_message gfield_validation_message ernomax'></span>");
            thisfield.find('.ernomax').css('display', 'none');

            jQuery(this).find('input').on('keyup', function() {

             var minvalueraw = jQuery(this).parents('.gfield').attr('class').match(/min-\d+/)[0];
             var maxvalueraw = jQuery(this).parents('.gfield').attr('class').match(/max-\d+/)[0];
             var error_text = jQuery(this).parents('.gfield').find('.error-text').text();
               //console.log(error_text);
               var minvalue = minvalueraw.split('-');
               var maxvalue  = maxvalueraw.split('-');
        
              // console.log(minvalueraw, maxvalueraw);
             //  console.log(parseInt(minvalue[1]), parseInt(maxvalue[1]));
             var thisVal = jQuery(this).val();
             var input_length = thisVal.length;

             var getId = jQuery(this).attr('id').toString();
              if(getId == "input_1_106"){
                if(thisVal.toString() === acceptNone){
                  input_length = minvalue[1];
                }
              }



             if (input_length < minvalue[1]) {
                jQuery(this).siblings(".ernomin").html(`Bitte geben Sie zwischen ${minvalue[1]} und ${maxvalue[1]} Zeichen ein.` + "<br>"+ error_text);
                jQuery(this).siblings(".ernomin").addClass('ernodisplay');
                jQuery(this).siblings(".ernomin").addClass('ernoactive');
                jQuery(this).siblings(".ernomin").slideDown(500)
            } else {
                jQuery(this).siblings(".ernomin").slideUp(500)
                jQuery(this).siblings(".ernomin").removeClass('ernoactive');
            }

            if (maxvalue[1] < input_length) {

                jQuery(this).siblings(".ernomax").html(`Bitte geben Sie zwischen ${minvalue[1]} und ${maxvalue[1]} Zeichen ein.` + "<br>"+ error_text);
                jQuery(this).siblings(".ernomax").addClass('ernodisplay');
                jQuery(this).siblings(".ernomax").addClass('ernoactive');
                jQuery(this).siblings(".ernomax").slideDown(500);
            }else {
                jQuery(this).siblings(".ernomax").slideUp(500);
                jQuery(this).siblings(".ernomax").removeClass('ernoactive');
            }


        })
        })

function EmailValidate (InputEmail){
  if (InputEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    return true; 
  } else {
    return false; 
  }
}
    /*
    on input any feild triger this function and disable submit button
    */
    function buttondisableminmax() {
        var resutllengths = [];
        jQuery('.gfield span.ernomax, span.ernomin').each(function(index, value) {
            var resutllength = jQuery(this).hasClass('ernoactive');
            resutllengths.push(resutllength)
        })
        if (jQuery.inArray(true, resutllengths) != -1) {
              //console.log("error show");
            jQuery('.gform_next_button').attr("disabled", true);

        } else {
             // console.log("error not show");
            jQuery('.gform_next_button').attr("disabled", false);
        }
    }

        // check empty required inputs 
        function checkemptyinput(){
          var allemptyinputvalues = [];
          jQuery('.gform_page').each(function(index, value) {
            if (jQuery(this).css('display') == 'block') {
            jQuery(this).find('.gfield_contains_required').each(function(){
        
                if (jQuery(this).css('display') !== 'none') {
                    reqFval = jQuery(this).find('input, select').val()
                    allemptyinputvalues.push(reqFval);
                }
            });
        }  
    })
        if (jQuery.inArray("", allemptyinputvalues) != -1) {
         // console.log("empty")
            jQuery('.gform_next_button').attr("disabled", true);
        }else{
         // console.log("empty not")

           jQuery('.gform_next_button').attr("disabled", false);
           buttondisableminmax();
        }
      }//function end



jQuery('.gfield').find('input').on('change', function() {
    if (jQuery(this).attr("type") == "email") {
    //alert("email")
    var emailvalue = jQuery(this).val()
    if (!EmailValidate(emailvalue)) {
      jQuery(this).siblings(".ernomin").html(`Die eingegebene E-Mail-Adresse ist ungültig, bitte prüfen Sie das Format (z. B: email@domain.com).`)
      jQuery(this).siblings(".ernomin").addClass('ernodisplay');
      jQuery(this).siblings(".ernomin").addClass('ernoactive');
      jQuery(this).siblings(".ernomin").slideDown(500)
    }else{
      jQuery(this).siblings(".ernomin").slideUp(500)
      jQuery(this).siblings(".ernomin").removeClass('ernoactive');
    }

  }
})

jQuery('.gfield').find('input, select').on('keyup change', function() {

buttondisableminmax()
  setTimeout(function() {
checkemptyinput()
  }, 200);
  
    })

 jQuery('.gform_page:not(:first-child)').each(function(index, value) {
    jQuery(this).prepend(`<span class="previous_arrow_button"><span>←</span></span>`); 
  });
jQuery(".previous_arrow_button").on("click", function(){
		jQuery(this).parents('.gform_page').find('.gform_previous_button').trigger('click');
		console.log(jQuery(this).parents('.gform_page').find('.gform_previous_button'));
	});
		
		
		
		
		
});
	
	
});
