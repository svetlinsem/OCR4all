/**
 * Includes project specific jQuery module input parameter functionality
 * 
 * Things that need to be done to use this:
 * 1. Include this file in the head of the target page (see head.tag)
 *    In this project it can be included by passing inputParams="true" to the head.tag include
 * 2. Use getInputParams function to fetch all required parameters for the current module
 */

// Fetch all modified parameters and return them appropriately
function getInputParams(settingsEl) {
    var params = { 'cmdArgs': [] };

    // If no specific settings element is passed search in all collapsible elements
    settingsEl = settingsEl || $('.collapsible-body');
    // Exclude checkboxes in pagelist (will be passed separately)
    $.each($(settingsEl).find('input[type="checkbox"]').not('[data-pageid]').not('#selectAll'), function() {
        if( $(this).prop('checked') === true )
            params['cmdArgs'].push($(this).attr('id'));
    });
    $.each($(settingsEl).find('input[type="number"]'), function() {
        if( $(this).val() !== "" && $(this).attr('id'))
            params['cmdArgs'].push($(this).attr('id'), $(this).val());
    });
    $.each($(settingsEl).find('input[type="text"]'), function() {
        if( $(this).val() !== "" && $(this).attr('id'))
            params['cmdArgs'].push($(this).attr('id'), $(this).val());
    });
    $.each($(settingsEl).find('select'), function() {
        if( $(this).val() && $(this).val().length > 0 && $(this).attr('id')) {
            if($(this).attr('multiple')) {
                params['cmdArgs'].push($(this).attr('id'), $(this).val().join(" "));
            }
            else {
                params['cmdArgs'].push($(this).attr('id'), $(this).val());
            }
        }
    });
    return params;
}

$(document).ready(function() {
    // Error handling for parameter input fields
    $('input[type="number"]').on('change', function() {
        var num = $(this).val();
        if( !$.isNumeric(num) ) {
            if( num !== "" ) {
                $(this).addClass('invalid').focus();
            }
            else {
                $(this).removeClass('invalid');
            }
        }
        else if( Math.floor(num) != num ) {
            if( $(this).attr('data-type') === "int" ) 
                $(this).addClass('invalid').focus();
        }
        else {
            $(this).removeClass('invalid');
        }
    });
});
