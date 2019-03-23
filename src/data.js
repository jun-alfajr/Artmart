export const navOpts = [
    [{
    name: "all-products"
    },{
    name: "pottery",
    },{
    name: "knives/swords",
    },{
    name: "paintings",
    },{
    name: "wood-work",
    }],
    [{
    name: "log-in",
    },{
    name: "sign-up",
    },{
    name: "log-out",
    },{
    name: "settings",
    },{
    name : "my-cart",
    }]
]

export const navHeadings = ["Products","Account"];

export const slides = [
    {img:"https://ffcp.s3.amazonaws.com/tfc/Resorts/palazzo/explore/arts_crafts/terrocotta_artisan/sizes/PM_artisans-9928.jpg",
    caption: "Welcome to Art Mart"},
    {img:"https://www.primeis.com/wp-content/uploads/2017/07/carpenter.jpg",
    caption: "A market and community of craftsmen, craftswomen, and seekers of unique hand-made crafts."}
]

export const signUpData = [
    [{
        label:'Username',
        type: 'text',
    },
    {
        label:'Email',
        type: 'email',
    }],
    [{
        label:'Password',
        type: 'password',
    },{
        label: 'Confirm Password',
        type: 'password'
    }],
    [{
        label:'Address',
        type: 'text',
    }],
    [{
        label:'City',
        type: 'text',
    },{
        label: 'State',
        type: 'select'
    },
    {
        label:'Zip',
        type: 'number',
    }],
    [{
        label:'Profile Picture',
        type: 'file',
    }],
    [{
        label: 'I have read and agree to follow the terms',
        type: 'checkbox',
    }]
]

export const logInData = [
    {
        label:'Username',
        type: 'text'
    },
    {
        label:'Email',
        type: 'email'
    },
    {
        label:'Password',
        type: 'password'
    }
]

export const columns = [
    [{
        name : "The goal behind the Art Mart is to provide an audience to those who like building things with their\
        hands all while presenting them with the opportunity to tell each item's story.",
        isLink: false
    }],
    [{
        name: "pottery",
        isLink: true
    },{
        name: "knives/swords",
        isLink: true
    },{
        name: "paintings",
        isLink: true
    },{
        name: "wood-work",
        isLink: true
    }],
    [{
        name: "about-us",
        isLink: true
    },{
        name: "terms",
        isLink: true
    },{
        name: "shipping-rates",
        isLink: true
    },{
        name: "help",
        isLink: true
    }],
    [{
        name: "Atlanta, GA 30305",
        isLink: false
    },{
        name: "artmart@gmail.com",
        isLink: false
    }],[{
        name: "2019 Copyright: Art Mart",
        isLink: false
    }]
]

export const headings = ["Art Mart","Products","Account","Contact"]

