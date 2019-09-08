/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/

//set focus on the first text field using id "name"
$('#name').focus();

//hide "Other" job role input initially
//Will apear if JS is disabled
$('#other-title').hide();


/******************************************
Job Role Section
******************************************/

//text field will reveal when the "other" option is selected from the "Job Role" drop down menu
//add "click" event handler to "select" element with ID "title"
$('#title').on('click', function(e){
  if (e.target.value === 'other'){  //if user selects "other" option from drop down menu
    $('#other-title').show(); //show "input" element with ID "other-title"
  } else {
    $('#other-title').hide(); //hide other input element when "other" option not selected
  }
});


/**********************************************
T-Shirt Info Section
***********************************************/
$('#color').children().hide(); //hide shirt options initially
//add "click" event handler to element with ID "design"
$('#design').on('click', function(e){
  if (e.target.value === 'Select Theme' ){
    $('#color').children('option[value="selectTheme"]').prop('selected', true);
    $('#color').children('option[value="selectTheme"]').show();
    $('#color').children('option[value="tomato"]').hide();
    $('#color').children('option[value="steelblue"]').hide();
    $('#color').children('option[value="dimgrey"]').hide();
    $('#color').children('option[value="cornflowerblue"]').hide();
    $('#color').children('option[value="darkslategrey"]').hide();
    $('#color').children('option[value="gold"]').hide();
  } else if (e.target.value === 'js puns'){ //if user selects "js puns" hide/show appropriate options
    $('#color').children('option[value="cornflowerblue"]').prop('selected', true); //sets option to select a t-shirt theme if user wants to switch designs
    $('#color').children('option[value="tomato"]').hide();
    $('#color').children('option[value="steelblue"]').hide();
    $('#color').children('option[value="dimgrey"]').hide();
    $('#color').children('option[value="cornflowerblue"]').show();
    $('#color').children('option[value="darkslategrey"]').show();
    $('#color').children('option[value="gold"]').show();
  } else if (e.target.value === 'heart js'){
    $('#color').children('option[value="tomato"]').prop('selected', true); //sets option to select a t-shirt theme if user wants to switch designs
    $('#color').children('option[value="cornflowerblue"]').hide();
    $('#color').children('option[value="darkslategrey"]').hide();
    $('#color').children('option[value="gold"]').hide();
    $('#color').children('option[value="tomato"]').show();
    $('#color').children('option[value="steelblue"]').show();
    $('#color').children('option[value="dimgrey"]').show();
  }
});


/*********************************************************
Register For Activities Section
**********************************************************/


//Create an element to display the total activity cost
let displayCost = $('<label></label>');
//append created element to the fieldset with class "activitites"
$('.activities').append(displayCost);
//Create element to store total activity Cost
let totalCost = 0;

//Add an event listener to the "activities" fieldset
$('[type="checkbox"]').change(function(e){
  const clickedCheckbox = $(e.target);   //a reference to what checkbox is clicked
  const cost = $(clickedCheckbox).attr('data-cost'); //reference to the activity cost

  const regex = /^(.)(\d+)$/; //regex to capture group
  const replacement = '$2'; //exclude "$" in string "cost", keep the rest
  const newCost = +(cost.replace(regex, replacement)); //make new string, convert to integer

  //create if else statement to see if activities are checked or not
  //add or subtract to the totalCost
  if ( $(clickedCheckbox).prop('checked') === true){
    totalCost = totalCost + newCost;
  } else if ( $(clickedCheckbox).prop('checked') === false ){
    totalCost = totalCost - newCost;
  }

  //display running total cost of activities
  displayCost.html('Total Cost: $' + totalCost);

  //get "data-day-and-time" attribute value of the element which was clicked
  const dataDayTime = $(clickedCheckbox).attr('data-day-and-time');

  $('[type="checkbox"]').each(function(){
    const currentActivity = $(this);
    if ( ( dataDayTime === currentActivity.attr('data-day-and-time')) && (clickedCheckbox.attr('name') != currentActivity.attr('name'))) {
      if ( $(clickedCheckbox).prop('checked') === true ){
        currentActivity.attr('disabled', true);
        clickedCheckbox.attr('disabled', false);
      } else {
          currentActivity.attr('disabled', false);
          clickedCheckbox.attr('disabled', false);
      }
    }
  })
});


/****************************************************
Payment information Section
*****************************************************/

//Set "Select Payment Option" option to disabled so that is cannot be selected
//Select "Select Payment Method" and set its attribute to disabled using the property method
$('#payment').children('option[value="select method"]').prop('disabled', true);

//Set "Credit Card" as default option selected
$('#payment').children('option[value="Credit Card"]').attr('selected', true);
//Hide "Bitcoin" and "PayPal" information as "Credit Card" payment info is shown by default
//Payment information will display if JS is disabled
$('#paypal').hide();
$('#bitcoin').hide();

//Corresponding information should dispaly according to the users choice of payment
//add event listener to the payment options with adn ID of "payment"
$('#payment').on('click', function(e){
  if(e.target.value === 'PayPal'){   //if the user selects 'paypal'
    $('#credit-card').hide();
    $('#bitcoin').hide();
    $('#paypal').show();
  } else if (e.target.value === 'Bitcoin'){   //if the user selects 'Bitcoin'
    $('#credit-card').hide();
    $('#paypal').hide();
    $('#bitcoin').show()
  } else if (e.target.value === 'Credit Card'){   //if the user selects 'Credit Card'
    $('#bitcoin').hide();
    $('#paypal').hide();
    $('#credit-card').show();
  }
});



/*****************************************************
Form Validation Section
*****************************************************/

function isName(name){
  if (/^[a-z]+$/.test($('#name').val()) === false){
    //change labels text to an error message if invalid name
    $('#name').prev().text('Must Enter A Valid Name').css({'color': 'red' , 'font-weight': '600'});
    $('#name').css('border-color', 'red');     //make name input border red
    return false;
  } else {
      $('#name').prev().text('Name:').css({'color': '' , 'font-weight': 'normal'}); //change name label text back to previous statement
      $('#name').css('border-color', ""); //return name input border to normal
      return true;
  }
};
//real time validation
$('#name').change(function(e){
  isName(e.target.value);
});


function checkboxChecked(){
  //if totalCost is equal to zero then no activity has been selected
  if ( totalCost === 0 ){
    //dispaly an error message where the total cost is shown
    displayCost.html('Must select a minimum of one activity in order to register.').css({'color': 'red' , 'font-weight': '600'});
    return false;
  } else {
    displayCost.css({'color': '' , 'font-weight': 'normal'});
    return true;
  }
};


function isValidEmail(){
  if (/^\S+@\D+\.\D+$/.test( $('#mail').val() ) === false){ //check if value of the email input field is valid
    //error message if not a valid email
    $('#mail').prev().text('Must Enter A Valid email').css({'color': 'red' , 'font-weight': '600'});
    $('#mail').css('border-color', 'red');
    return false;
  } else {
      //return label text back to normal
      $('#mail').prev().text('Email:').css({'color': '' , 'font-weight': 'normal'});
      $('#mail').css('border-color', '')
      return true;
  }
};
//real time validation
$('#mail').change(function(e){
  isValidEmail(e.target.value);
});


function creditCard(number){
  if (/^\d{13,16}$/.test($('#cc-num').val()) === false){ //check if value of the credit card input field is valid
    //make credit card text red
    $('#cc-num').prev().css('color', 'red');
    $('#cc-num').css('border-color', 'red')
    return false
  } else {
      $('#cc-num').prev().css('color', '');
      $('#cc-num').css('border-color', '')
      return true;
  }
};
//real time validation
$('#cc-num').change(function(e){
  creditCard(e.target.value);
});

function zipCode(){
  if (/^\d{5}$/.test($('#zip').val()) === false){ //check if value of the zip code input field is valid
    $('#zip').prev().css('color', 'red');
    $('#zip').css('border-color', "red")
    return false;
  } else {
      $('#zip').prev().css('color', '');
      $('#zip').css('border-color', '');
      return true;
  }
};
//real time validation
$('#zip').change(function(e){
  zipCode(e.target.value);
});

function CVV(){
  if (/^\d{3}$/.test($('#cvv').val()) === false){ //check if value of the CVV input field is valid
    $('#cvv').prev().css('color', 'red');
    $('#cvv').css('border-color', 'red')
    return false;
  } else {
      $('#cvv').prev().css('color', '');
      $('#cvv').css('border-color', '');
      return true;
  }
};
//real time validation
$('#cvv').change(function(e){
  CVV(e.target.value);
});

//function to validate all the forms
function validateAll() {
  if ( $('option[value="Credit Card"]').is(':selected') ) { //if the user selects the "Credit Card" as payment
    creditCard();
    zipCode();
    CVV();
    if ( isName() == false || checkboxChecked() == false || isValidEmail()  == false || creditCard() == false || zipCode() == false || CVV() == false ) { //check if all forms are correct
      return false;
    } else { //will return true if all forms are correct when "credit card" is selected as payment
        return true;
    }
  } else {  //if user selects to pay with "Bitcoin" or "Paypal"
    if ( isName() == false || checkboxChecked() == false || isValidEmail() == false ) { //check if all forms are correct
      return false;
    } else { //will return true if the forms are correct
        return true;
    }
  }
};

//submit handler to prevent submission if forms are not filled out correctly
 $('form').submit(function(e){
   if ( validateAll() === true ){ //if the appropriate forms are filled correctly
     return true;
   } else { //if the forms are not valid will prevent the submision with prevent default
     e.preventDefault();
     return false;
   }
 });
