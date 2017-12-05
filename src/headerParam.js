/**
 * Created by changyoung on 17. 11. 28.
 */
var pageURI = ['/', '/boards', '/contact', '/developer', '/commission'];
var contents = {
    '/' : {
        title : 'Join' ,
        description : ' us or send mail'
    },
    '/questions' : {
        title: 'Ask',
        description : ' anything about Openholo Libaray'
    },
    '/contact' : {
        title: 'Contact',
        description : ''
    },
    '/developer' : {
        title: 'Developer',
        description: ''
    },
    '/commission' : {
        title: 'Commission',
        description: ''
    }
}

var headerParam = function(currentPage) {
    return {
        headline: {
            uri : currentPage,
            pageTitle: contents[currentPage].title,
            pageDescription: contents[currentPage].description
        },
        nav: {
            active: pageURI.map(function(name) {
        return (name === currentPage) ? "active" : "";
    })}
    }
};

module.exports = headerParam;