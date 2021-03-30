'use strict';
let keyword = [];

function Option(optionPar) {
    this.imageUrl = optionPar.image_url;
    this.title = optionPar.title;
    this.description = optionPar.description;
    this.keyword = optionPar.keyword;
    this.horns = optionPar.horns;
    if (!keyword.includes(this.keyword)) {
        keyword.push(this.keyword);
    }
}
console.log(keyword);


//get data from page-1
$.ajax('data/page-1.json')
    .then(data => {
        let newOption ;
        data.forEach(val => {
            newOption = new Option(val);
            newOption.renderFilterList();
        });
        $('#photo-template').first().remove();
        forSelection ();
        checkGallery();
    });

//get data from page-2
$.ajax('data/page-2.json')
    .then(data => {
        let newOption ;
        data.forEach(val =>{
            newOption = new Option(val);
            newOption.createMustacheTemp();

        });
        // $('#photo-template2').first().remove();
        // forSelection ();
        checkGallery();
    })

   // option one to clone the div element from html 
   Option.prototype.renderFilterList = function () {
    let div = $('#photo-template').clone();
    div.addClass(this.keyword);
    console.log(div);
    $('main').append(div);

    div.find('h2').text(this.title);

    div.find('img').attr('src', this.imageUrl);

    div.find('p').text(this.description);
    
};


   //option two to get the template from html and merge it to constructor
   Option.prototype.createMustacheTemp = function () {
       $('#page2').on('click',function () {
       //1st step getting template by :
       let template = $('#divTemplate').html();
       
       

       //2nd step merging the data from constructor to the template :
       let data = Mustache.render(template,this);

       //add class
       data.addClass(this.keyword);

       //3rd return data :
       return data ;
    });
   };

   

function checkGallery() {
    $('select').change(function(){
        let selectItem = $(this).val();
        $('div').hide();
        console.log(JSON.stringify(selectItem));
        $(`.${selectItem}`).show();
       console.log(selectItem);
        
    });
}

function forSelection () {
   for (let index = 0; index < keyword.length; index++) {
   let optionClone = $('option').first().clone().text(keyword[index]);
    optionClone.attr('value', keyword[index]);
    
    $('select').append(optionClone);
   }
   
}

