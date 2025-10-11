// Module pattern(IIFE)
let Bank = (function () {
  let bankBalance = 12000;

  function checkBalance() {
    console.log(bankBalance);
  }
  function setBalance(val) {
    bankBalance = val;
  }

  function withdraw(val) {
    if (val <= bankBalance) {
      bankBalance -= val;
      console.log(bankBalance);
    }
  }
  return {
    bankBalance,
    checkBalance,
    withdraw
  }
})();

// FACTORY FUNCTION PATTERN
function factory(name, price) {
  let stock = 10;
  return {
    name,
    price,
    checkStock() {
      console.log(stock);
    },
    buy(qty) {
      if (qty <= stock) {
        stock -= qty;
        console.log(`booked ${stock} pieces left.`);
      } else {
        console.error("Not in stock ");
      }
    },
    refill(qty) {
      stock += qty;
      console.log(`refilled the stock  ${stock} pieces now`);
    },
  };
}

let iphone = factory("iphone", 70000);
let kitkat = factory("kitkat", 10);

kitkat.buy(9);
iphone.checkStock();

// Observer pattern

class YoutubeChannel{
    constructor(){
        this.subscribers = [];

    }

    subscribe(user){
        this.subscribers.push(user);
        user.update(`${user.name} You have subscribed the channel.`)
    }
    unSubscribe(user){
         this.subscribers =  this.subscribers.filter(sub => sub !== user);
        user.update(`${user.name} You have unsubscribed the channel.`)
    }
    notify(message){
        this.subscribers.forEach(sub=>sub.update(message))
    }
}

class User{
    constructor(name){
        this.name = name;
    }

    update(data) {
            console.log(`${this.name } ${data}`)
    }
}

let sushankCode = new YoutubeChannel();
let user2 = new User("sensei")

sushankCode.subscribe(user2)

sushankCode.notify("new video is live on the channel")

// Perfomance optimization

function debounce(fnc, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(function () {
      fnc(...args);
    }, delay);
  };
}
function throttle(fnc, delay) {
  let timer = 0;
  return function (...args) {
    let now = Date.now();
    if(now - timer >= delay ){
        timer = now;
        fnc(...args);
    }
   
  };
}
let inp = document.querySelector("input")

inp.addEventListener("input", throttle(function(e){
    console.log(e.target.value)
},1000) )
  
