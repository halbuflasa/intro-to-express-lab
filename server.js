const express = require ('express')
const app = express()

app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})



//1. Be Polite, Greet the User

app.get('/greetings/:username', (reqest,response)=>{
    //response.send(`Hello there, ${reqest.params.username}!`) 
    response.send(`What a delight it is to see you once more, ${reqest.params.username}.`) 
})

//2. Rolling the Dice
app.get('/roll/:number', (req, res) => {
    const number = req.params.number;
    if (!isNaN(number)) {
      res.send(`You rolled a ${number}.`)
    } else {
      res.send(`You must specify a number.`)
    }
  })

  //3. I Want THAT One!
  app.get('/collectibles/:index', (req, res) => {
    const collectibles = [
      { name: 'shiny ball', price: 5.95 },
      { name: 'autographed picture of a dog', price: 10 },
      { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
    ];
    const index = parseInt(req.params.index);
  
    if (index >= 0 && index < collectibles.length) {
      const item = collectibles[index];
      res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!.`)
    } else {
      res.send(`This item is not yet in stock. Check back soon!`)
    }
  })

  //4. Filter Shoes by Query Parameters
  app.get('/shoes', (req, res) => {
    const shoes = [
      { name: "Birkenstocks", price: 50, type: "sandal" },
      { name: "Air Jordans", price: 500, type: "sneaker" },
      { name: "Air Mahomeses", price: 501, type: "sneaker" },
      { name: "Utility Boots", price: 20, type: "boot" },
      { name: "Velcro Sandals", price: 15, type: "sandal" },
      { name: "Jet Boots", price: 1000, type: "boot" },
      { name: "Fifty-Inch Heels", price: 175, type: "heel" }
    ];
  
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const type = req.query.type;
  
    let filteredShoes = shoes;
  
    if (minPrice || maxPrice || type) {
      filteredShoes = filteredShoes.filter(shoe => {
        let match = true;
  
        if (minPrice && shoe.price < parseInt(minPrice)) {
          match = false;
        }
  
        if (maxPrice && shoe.price > parseInt(maxPrice)) {
          match = false;
        }
  
        if (type && shoe.type !== type) {
          match = false;
        }
  
        return match;
      });
    }
  
    res.send(filteredShoes);
  });