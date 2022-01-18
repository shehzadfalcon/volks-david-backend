$(document).ready(function(){

   var dropDownAble = document.getElementsByClassName('dropDownAble');
   dropDownAble = Array.from(dropDownAble)
   dropDownAble.forEach(function(elm, index){
       elm.addEventListener('click',function(){
           $(`#slideMenu_${index+1}`).slideToggle();
           $('.dropDownIcone').eq(index).toggleClass('rotate')
       })
   })


//  When user click on user profile icone in header 
    $('.headerUserProfileImg').click(function(){
        $('.profileDteialsDropDown').slideToggle()
    });



    $('.menuBtn').click(function(){
        $('.leftSideBarBox').addClass('container');
        $('.sideBar').slideToggle('slow');
       
    })

      

  });