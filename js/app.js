'use strict';
let keyword = [];
function Option(option) {
    this.imageUrl = option.image_url;
    this.title = option.title;
    this.description = option.description;
    this.keyword = option.keyword;
    this.horns = option.horns;
    if (!keyword.includes(this.keyword)) {
        keyword.push(this.keyword);
    }
}
console.log(keyword);

$.ajax('data/page-1.json')
    .then(data => {
        let newOption ;
        data.forEach(val => {
            newOption = new Option(val);
            newOption.renderFilterList();
        });
    });



Option.prototype.renderFilterList = function () {
    let optionClone = $('option').first().clone().text(this.keyword);

    $('select').append(optionClone);


    // $('option').on('click',function(){
    let div = $('#photo-template').clone();
    $('main').append(div);

    div.find('h2').text(this.title);

    div.find('img').attr('src', this.imageUrl);

    div.find('p').text(this.description);
    // });
};
