var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var axios = require('axios');

exports.specific = (req, res, next) => {
    var url = 'https://docs.google.com/spreadsheets/d/1wQVypefm946ch4XDp37uZ-wartW4V7ILdg-qYiDXUHM/htmlview?usp=sharing&sle=true';
    axios.get(url).then((response) => {
        const $ = cheerio.load(response.data);
        const selector = $('#sheet-menu');
        console.clear();
        /*example.find('li').toArray().map((li, liIndx)=>{
            console.log($(li).attr('id'));
        });*/
        var lastID = selector.find('li').first().attr('id').split('-')[2];

        const selector1 = $('#' + lastID + '');
        var data = [];
        selector1.find('tbody').find('tr').toArray().map((element, index) => {
            //console.log($(element).text());
            if (index !== 0) {
                var aux = ''
                var data_aux = new Object();
                $(element).find('td').toArray().map((element1, index1) => {
                    aux === '' ? aux = aux + $(element1).text() : aux = aux + '-' + $(element1).text();
                    if (index1 === 0) {
                        data_aux.provinceState = $(element1).text();
                    }
                    else if (index1 === 1) {
                        if ($(element1).text() === 'Mainland China') {
                            data_aux.countryRegion = 'China';
                        } else if ($(element1).text() === 'US') {
                            data_aux.countryRegion = 'United States of America'
                        }
                        else {
                            data_aux.countryRegion = $(element1).text();
                        }
                    }
                    else if (index1 === 2) {
                        data_aux.lastUpdated = $(element1).text().t;
                    }
                    else if (index1 === 3) {
                        data_aux.confirmed = parseInt($(element1).text());
                    }
                    else if (index1 === 4) {
                        data_aux.deaths = parseInt($(element1).text());
                    }
                    else {
                        data_aux.recovered = parseInt($(element1).text());
                    }
                })
                //console.log(data_aux);
                //console.log(aux);
                data.push(data_aux);
            }
        });
        //console.log(data);
        res.json(data);
    }).catch((error) => {
        console.log('error respuesta');
        res.send(error);
    })
}

exports.overall = (req, res, next) => {
    var url = 'https://docs.google.com/spreadsheets/d/1wQVypefm946ch4XDp37uZ-wartW4V7ILdg-qYiDXUHM/htmlview?usp=sharing&sle=true';
    axios.get(url).then((response) => {
        const $ = cheerio.load(response.data);
        const selector = $('#sheet-menu');
        console.clear();
        /*example.find('li').toArray().map((li, liIndx)=>{
            console.log($(li).attr('id'));
        });*/
        var lastID = selector.find('li').first().attr('id').split('-')[2];

        const selector1 = $('#' + lastID + '');
        var data = [];
        selector1.find('tbody').find('tr').toArray().map((element, index) => {
            //console.log($(element).text());
            if (index !== 0) {
                var aux = ''
                var data_aux = new Object();
                $(element).find('td').toArray().map((element1, index1) => {
                    aux === '' ? aux = aux + $(element1).text() : aux = aux + '-' + $(element1).text();
                    if (index1 === 0) {
                        data_aux.provinceState = $(element1).text();
                    }
                    else if (index1 === 1) {
                        if ($(element1).text() === 'Mainland China') {
                            data_aux.countryRegion = 'China';
                        } else if ($(element1).text() === 'US') {
                            data_aux.countryRegion = 'United States of America'
                        }
                        else {
                            data_aux.countryRegion = $(element1).text();
                        }
                    }
                    else if (index1 === 2) {
                        data_aux.lastUpdated = $(element1).text();
                    }
                    else if (index1 === 3) {
                        data_aux.confirmed = parseInt($(element1).text());
                    }
                    else if (index1 === 4) {
                        data_aux.deaths = parseInt($(element1).text());
                    }
                    else {
                        data_aux.recovered = parseInt($(element1).text());
                    }
                })
                //console.log(data_aux);
                //console.log(aux);
                data.push(data_aux);
            }
        });

        const countries = [...new Set(data.map(element => element.countryRegion))];
        var data1 = [];

        countries.forEach(element => {
            var confirmed = 0;
            var deaths = 0;
            var recovered = 0;
            var data_aux = new Object();
            data.forEach(element1 => {
                if (element === element1.countryRegion) {
                    confirmed = confirmed + element1.confirmed;
                    deaths = deaths + element1.deaths;
                    recovered = recovered + element1.recovered;
                }
            });
            data_aux.countryRegion = element;
            data_aux.confirmed = confirmed;
            data_aux.recovered = recovered;
            data_aux.deaths = deaths;
            data1.push(data_aux);
        });
        res.json(data1);
    }).catch((error) => {
        console.log('error respuesta');
        res.send(error);
    })
}