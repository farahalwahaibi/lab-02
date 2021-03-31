'use strict';

// global array to push the keyword inside it:
let keyword = [];

// main constructor:
function Option(optionPar) {
    this.imageUrl = optionPar.image_url;
    this.title = optionPar.title;
    this.description = optionPar.description;
    this.keyword = optionPar.keyword;
    this.horns = optionPar.horns;

    // To check the keyword array data: 
    if (!keyword.includes(this.keyword)) {
        keyword.push(this.keyword);
    }
}

// For fill the dropdown list from the global array:
let optionClone;
function forSelection() {
    for (let index = 0; index < keyword.length; index++) {
        optionClone = $('option').first().clone().text(keyword[index]);
        optionClone.attr('value', keyword[index]);
        $('select').append(optionClone);
    }

}

// To show the specific data for selection keyword (FILTER):
function checkGallery() {
    $('select').change(function () {
        let select = $(this).val();
        $('div').hide();
        $(`.${select}`).show();
        console.log(select);
    });
}

//Get data from page-1 to render the default page:
$.ajax('./Data/page-1.json')
    .then(data => {
        data.forEach(val => {
            let newOption = new Option(val);
            newOption.renderMustache();
        });
        forSelection();
        checkGallery();
    });

// To get the template from html and merge it to constructor (CREATE DIV ELEMENT): 
Option.prototype.renderMustache = function () {
    //1st step getting template by :
    let template = $('#galleryTemplate').html();
    //2nd step merging the data from constructor to the template :
    let data = Mustache.render(template, this);

    $('select').append(optionClone);
    $('main').append(data);
};

// When you click on button page1:
$('#page1').on('click', function () {
    $('main').empty();
    $('select').empty();
    keyword = [];

    $.ajax('./Data/page-1.json')
        .then(data => {
            data.forEach(val => {
                let newOption = new Option(val);
                newOption.renderMustache();
            });
            forSelection();
            checkGallery();
        });
});

// When you click on button page2
$('#page2').on('click', function () {
    $('main').empty();
    $('select').empty();
    keyword = [];

    //get data from page-2 
    $.ajax('data/page-2.json')
        .then(data => {
            let newOption;
            data.forEach(val => {
                newOption = new Option(val);
                newOption.renderMustache();

            });
            checkGallery();
            forSelection();
        })
});



