import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: "harsh",
            email: "admin@go-shop.com",
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
        },{
            name: "harsh",
            email: "harsh@gmail.com",
            password: bcrypt.hashSync('123456789'),
            isAdmin: false,
        }
    ],
    products: [
        {
            name: "Free Shirt",
            slug: "free-shirt",
            category: "Shirt",
            images: '/images/shirt1.jpg',
            price: 750,
            brand: "Nike",
            rating: 4.5,
            numreview: 6.0,
            countInStock: 20,
            descriptions: "A Popular Shirt"
        }, {
            name: "Fit Shirt",
            slug: "fit-shirt",
            category: "Shirt",
            images: '/images/shirt2.jpg',
            price: 500,
            brand: "Reymond",
            rating: 4.6,
            numreview: 10,
            countInStock: 25,
            descriptions: "A Most Popular Shirt"
        }, {
            name: "XL Shirt",
            slug: "xl-shirt",
            category: "Shirt",
            images: '/images/shirt3.jpg',
            price: 790,
            brand: "Nike",
            rating: 4.0,
            numreview: 9.0,
            countInStock: 21,
            descriptions: "A Good Shirt"
        }, {
            name: "Office Pants",
            slug: "office-pants",
            category: "Pants",
            images: '/images/pant1.jpg',
            price: 800,
            brand: "Zara",
            rating: 4.2,
            numreview: 8.0,
            countInStock: 5,
            descriptions: "A Popular Pants From Zara"
        }, {
            name: "Microsoft Pants",
            slug: "microsoft-pants",
            category: "Pants",
            images: '/images/pant2.jpg',
            price: 600,
            brand: "Microsoft",
            rating: 4.3,
            numreview: 9.0,
            countInStock: 20,
            descriptions: "A Pants for Microsoft"
        }, {
            name: "Go Pants",
            slug: "go-pants",
            category: "Pants",
            images: '/images/pant3.jpg',
            price: 550,
            brand: "Go Shop",
            rating: 4.5,
            numreview: 10,
            countInStock: 22,
            descriptions: "A Merchandise Pants from Go Shop"
        }, {
            name: "Adidas Pants",
            slug: "adidas-pants",
            category: "Pants",
            images: '/images/pant4.jpg',
            price: 850,
            brand: "Adidas",
            rating: 4.7,
            numreview: 9.5,
            countInStock: 10,
            descriptions: "A Popular Pants from Adidas"
        }, {
            name: "Armani Pants",
            slug: "armani-pants",
            category: "Pants",
            images: '/images/pant5.jpg',
            price: 950,
            brand: "Armani",
            rating: 4.0,
            numreview: 8.9,
            countInStock: 5,
            descriptions: "A Popular Pants from Armani"
        }, {
            name: "Pants",
            slug: "pants",
            category: "Pants",
            images: '/images/pant6.jpg',
            price: 750,
            brand: "Levi's",
            rating: 4.6,
            numreview: 7.0,
            countInStock: 30,
            descriptions: "levi's Popular Pants"
        },
    ]
}

export default data;
