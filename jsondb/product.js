const jsondb = {
    products: [
        {
          name: 'Crispy Burger',
          description: 'American Style Burger',
          category: 'Hauptgericht',
          price: 6.99,
          url: 'burger',
          pic: '/img/products/burger.jpg',
          extras: [
            {
              text: 'doppelt',
              price: 4
            },            
            {
              text: 'extra scharf',
              price: 0.5
            }
          ]
        },
         {
          name: 'Coca Cola',
          description: 'Eisgekühlte Cola',
          category: 'Trinken',
          price: 1.99,
          url: 'cola',
          pic: '/img/products/cola.jpg',
          extras: [
            {
              text: 'gekühlt',
              price: 0.2
            }
          ]
        },   
        {
          name: 'Erdbeer Eis',
          description: 'Eis mit Erdbeeren und Sahne',
          category: 'Nachspeise',
          price: 2.99,
          url: 'erdbeereis',
          pic: '/img/products/eis.jpg',
          extras: [
            {
              text: 'extra Sahne',
              price: 1
            }
          ]
        },
         {
          name: 'Falaffel',
          description: 'Orientalische Falaffel',
          category: 'Hauptgericht',
          price: 6.99,
          url: 'falaffel',
          pic: '/img/products/falaffel.jpg',
          extras: [
            {
              text: 'Sesam Sauce',
              price: 1
            },            
            {
              text: 'Cocktail Sauce',
              price: 1
            }
          ]
        },
         {
          name: 'Lahmacun',
          description: 'Turkish Style Lahmacun',
          category: 'Hauptgericht',
          price: 4.50,
          url: 'lahmacun',
          pic: '/img/products/lahmacun.jpg',
          extras: [    
            {
              text: 'scharf',
              price: 0.5
            }
          ]
        },
         {
          name: 'Lasagne',
          description: 'Lasagne aus Italien',
          category: 'Hauptgericht',
          price: 8.50,
          url: 'lasagne',
          pic: '/img/products/lasagne.jpg',
          extras: [
            {
              text: 'doppelt',
              price: 5
            },            
            {
              text: 'extra Käse',
              price: 2
            }
          ]
        },  
         {
          name: 'Schokoladen Muffin',
          description: 'Sehr süßer Sckoko Muffin',
          category: 'Nachspeise',
          price: 3.20,
          url: 'muffin',
          pic: '/img/products/muffin.jpg'
        },  
         {
          name: 'Pizza Original',
          description: '4 seasons Pizza',
          category: 'Hauptgericht',
          price: 7.50,
          url: 'pizza',
          pic: '/img/products/pizza.jpg',
          extras: [
            {
              text: 'Extra Käse',
              price: 2
            },            
            {
              text: 'gross',
              price: 5
            }
          ]
        }, 
         {
          name: 'Süßkartoffel Pommes',
          description: 'Süßkartoffel Pommes mit Dip',
          category: 'Hauptgericht',
          price: 4.80,
          url: 'pommmes',
          pic: '/img/products/pommes.jpg',
          extras: [
            {
              text: 'Ketchup',
              price: 1
            },            
            {
              text: 'Mayonnaise',
              price: 1
            }
          ]
        },                                           
    ]
   }

   export default jsondb;