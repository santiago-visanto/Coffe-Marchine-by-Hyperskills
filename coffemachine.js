// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input');

let supplies = {
    "water" : 400,
    "milk" : 540,
    "beans" : 120,
    "cups" : 9,
    "money" : 550
}

const typesOfCoffee = [
    {
        "water" : 250,
        "milk" : 0,
        "beans" : 16,
        "cups" : 1,
        "money" : 4
    },
    {
        "water" : 350,
        "milk" : 75,
        "beans" : 20,
        "cups" : 1,
        "money" : 7
    },
    {
        "water" : 200,
        "milk" : 100,
        "beans" : 12,
        "cups" : 1,
        "money" : 6
    }
]

processAction();

function printSupplies() {
    console.log(`\nThe coffee machine has:
    ${supplies.water} ml of water
    ${supplies.milk} ml of milk
    ${supplies.beans} g of coffee beans
    ${supplies.cups} disposable cups
    $${supplies.money} of money`)
}

function processAction() {
    while (true) {
        console.log(`\nWrite action (buy, fill, take, remaining, exit:`);
        let action = input();
        switch (action){
            case "buy" :
                buy();
                break;
            case "fill" :
                fill();
                break;
            case "take" :
                take();
                break;
            case "remaining" :
                printSupplies();
                break;
            case "exit" :
                return;
            default :
                console.log("\nWrong input");
                break;
        }
    }
}

function buy() {
    let typeOfCoffee = input(
        "\nWhat do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu: ");

    if (typeOfCoffee === "back") {
        return;
    }

    for (let key in supplies) {
        if (supplies[key] < typesOfCoffee[typeOfCoffee - 1][key]) {
            console.log(`\nSorry, not enough ${key}!`);
            return;
        }
    }
    console.log("\nI have enough resources, making you coffee!");
    for (let key in supplies) {
        if (key === "money") {
            supplies[key]  += typesOfCoffee[typeOfCoffee - 1][key];
        } else {
            supplies[key] -= typesOfCoffee[typeOfCoffee -1][key];
        }
    }
}

function fill() {
    let cantidadAguaAdicionada = Number(input("Write how many ml of water you want to add:"));
    let cantidadLecheAdicionada = Number(input("Write how many ml of milk you want to add:"));
    let cantidadCafeAdicionado = Number(input("Write how many grams of coffee beans you want to add:"));
    let cantidadVasosAdicionados = Number(input("Write how many disposable coffee cups you want to add:"));

    supplies.water += cantidadAguaAdicionada;
    supplies.milk += cantidadLecheAdicionada;
    supplies.beans += cantidadCafeAdicionado;
    supplies.cups += cantidadVasosAdicionados;
}

function take() {
    console.log(`\nI gave you $${supplies.money}`)
    supplies.money = 0;
}

/*
const action = "Write action (buy, fill, take, remaining, exit):";
const ingredients = {
    espresso: {
        water: 250,
        milk: 0,
        beans: 16,
        cost: 4,
        cup: 1
    },
    latte: {
        water: 350,
        milk: 75,
        beans: 20,
        cost: 7,
        cup: 1
    },
    cappuccino: {
        water: 200,
        milk: 100,
        beans: 12,
        cost: 6,
        cup: 1
    }
};

let supplies = {
    water: 400,
    milk: 540,
    beans: 120,
    cups: 9,
    money: 550
};

let menu = input(action);

while (menu !== "exit") {
    switch (menu) {
        case "remaining":
            displaySupplies();
            menu = input(action);
            break;
        case "buy":
            switch (input("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino")) {
                case "1":
                    if (findMinimal(ingredients.espresso)[0] !== 0){
                        buyingThings(ingredients.espresso);
                        console.log("I have enough resources, making you a coffee!");
                    } else {
                        console.log("Sorry, not enough " + Object.keys(supplies)
                            [findMinimal(ingredients.espresso)[1]] + "!");
                    }
                    menu = input(action);
                    break;
                case "2":
                    if (findMinimal(ingredients.latte)[0] !== 0){
                        buyingThings(ingredients.latte);
                        console.log("I have enough resources, making you a coffee!");
                    } else {
                        console.log("Sorry, not enough " + Object.keys(supplies)
                            [findMinimal(ingredients).latte[1]] + "!");
                    }
                    menu = input(action);
                    break;
                case "3":
                    if (findMinimal(ingredients.cappuccino)[0] !== 0){
                        buyingThings(ingredients.cappuccino);
                        console.log("I have enough resources, making you a coffee!");
                    } else {
                        console.log("Sorry, not enough " + Object.keys(supplies)
                            [findMinimal(ingredients.cappuccino)[1]] + "!");
                    }
                    menu = input(action);
                    break;
                case "back":
                    menu = input(action);
                    break;
                default:
                    console.log("No such values!");
                    menu = input(action);
            }
            break;
        case "fill":
            toppingUp();
            menu = input(action);
            break;
        case "take":
            takingMoney();
            menu = input(action);
            break;
        default:
            console.log("No such values!");
            menu = input(action);
    }
}

function displaySupplies() {
    console.log(`The coffee machine has:\n` +
        `${supplies.water} ml of water\n` +
        `${supplies.milk} ml of milk\n` +
        `${supplies.beans} g of coffe beans\n` +
        `${supplies.cups} disposable cups\n` +
        `$${supplies.money} of money\n`
    );
}

function buyingThings({water, milk, beans, cost, cup}){
    supplies.water -= water;
    supplies.milk -= milk;
    supplies.beans -= beans;
    supplies.cups -= cup;
    supplies.money += cost;
}

function toppingUp(){
    supplies.water += parseInt(input("Write how many ml of water you want to add:"));
    supplies.milk += parseInt(input("Write how many ml of milk you want to add:"));
    supplies.beans += parseInt(input("Write how many grams of coffee beans you want to add:"));
    supplies.cups += parseInt (input("Write how many disposable cups you want to add:"));
}

function takingMoney() {
    supplies.money -= supplies.money;
}

function findMinimal({ water, milk, beans, cup}) {
    let arr = [];
    arr.push(Math.floor(supplies.water / water));
    arr.push(Math.floor(supplies.milk / milk));
    arr.push(Math.floor(supplies.beans / beans));
    arr.push(Math.floor(supplies.cups / cup));
    let minIngredient = Math.min(...arr);
    let indexIngredient = arr.indexOf(minIngredient);
    return [minIngredient, indexIngredient];
}
*/
/*
const initialWater = 400;
const initialMilk = 540;
const initialCoffeBeans = 120;
const initialDisposableCups = 9;
const initialMoney = 550;
let finalWater = initialWater;
let finalMilk = initialMilk;
let finalCoffeBeans = initialCoffeBeans;
let finalDisposbleCups = initialDisposableCups;
let finalMoney = initialMoney;

seleccionarOpcionMaquina();

function seleccionarOpcionMaquina() {
    let opcion = "";
    opcion = input("Write action (buy, fill, take, remaining, exit):")

    switch (opcion) {
        case "buy":
            buyCoffee();
            seleccionarOpcionMaquina();
            break;
        case "fill":
            fillSuplliesMachine();
            seleccionarOpcionMaquina();
            break;
        case "take":
            takeMoney();
            seleccionarOpcionMaquina();
            break;
        case "remaining":
            remaining();
            seleccionarOpcionMaquina();
            break;
        case "exit":
            //break;
    }
}

function buyCoffee() {
    tipoCafe = input("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu:");
    if (tipoCafe == "back") {
        seleccionarOpcionMaquina();
    }
    const arrDescontarSupplies = [];
    let ingresoDinero = 0;
    if (tipoCafe == 1) {
        arrDescontarSupplies[0] = -250;
        arrDescontarSupplies[1] = 0;
        arrDescontarSupplies[2] = -16;
        arrDescontarSupplies[3] = -1;
        ingresoDinero = 4;

    } else if (tipoCafe == 2) {
        arrDescontarSupplies[0] = -350;
        arrDescontarSupplies[1] = -75;
        arrDescontarSupplies[2] = -20;
        arrDescontarSupplies[3] = -1;
        ingresoDinero = 7;
    } else {
        arrDescontarSupplies[0] = -200;
        arrDescontarSupplies[1] = -100;
        arrDescontarSupplies[2] = -12;
        arrDescontarSupplies[3] = -1;
        ingresoDinero = 6;
    }
    //printStockFinal(arrDescontarSupplies, ingresoDinero);
    finalWater = finalWater + arrDescontarSupplies[0];
    finalMilk = finalMilk + arrDescontarSupplies[1];
    finalCoffeBeans = finalCoffeBeans + arrDescontarSupplies[2];
    finalDisposbleCups = finalDisposbleCups + arrDescontarSupplies[3];
    finalMoney = finalMoney + ingresoDinero;

    if (finalWater > 0 && finalMilk > 0 && finalCoffeBeans > 0 && finalDisposbleCups > 0) {
        console.log("I have enough resources, making you a coffee!");
    } else {
        if (finalWater <= 0) {
            console.log("Sorry, not enough water!");
        } else if (finalMilk <= 0) {
            console.log("Sorry, not enough milk!");
        } else if (finalCoffeBeans <= 0) {
            console.log("Sorry, not enough coffe beans!");
        } else {
            console.log("Sorry, not enough disposable cups!");
        }
    }
}

function fillSuplliesMachine () {
    cantidadAguaAdicionada = Number(input("Write how many ml of water you want to add:"));
    cantidadLecheAdicionada = Number(input("Write how many ml of milk you want to add:"));
    cantidadCafeAdicionado = Number(input("Write how many grams of coffee beans you want to add:"));
    cantidadVasosAdicionados = Number(input("Write how many disposable coffee cups you want to add:"));

    const arrIngredientesAdicionados = [];

    arrIngredientesAdicionados[0] = cantidadAguaAdicionada;
    arrIngredientesAdicionados[1] = cantidadLecheAdicionada;
    arrIngredientesAdicionados[2] = cantidadCafeAdicionado;
    arrIngredientesAdicionados[3] = cantidadVasosAdicionados;

    finalWater = finalWater + arrIngredientesAdicionados[0];
    finalMilk = finalMilk + arrIngredientesAdicionados[1];
    finalCoffeBeans = finalCoffeBeans + arrIngredientesAdicionados[2];
    //console.log(finalWater);
    finalDisposbleCups = finalDisposbleCups + arrIngredientesAdicionados[3];

    //printStockFinal(arrIngredientesAdicionados, 0);
}

function takeMoney () {
    console.log("I gave you $" + finalMoney)
    finalMoney = 0;
}

function remaining() {
    console.log("The coffee machine has:\n" + finalWater + " ml of water\n" + finalMilk + " ml of milk\n"
        + finalCoffeBeans + " g of coffee beans\n" + finalDisposbleCups +  " disposable cups\n" + "$" + finalMoney + " of money")
}
*/

/*
function calcularIngredientes(tazasCafe) {
    const cantidadAgua = 200;
    const cantidadLecha = 50;
    const cantidadCafe = 15;
    console.log(tazasCafe * cantidadAgua + " ml of water");
    console.log(tazasCafe * cantidadLecha + " ml of milk");
    console.log(tazasCafe * cantidadCafe + " g of coffee beans");
}

// calcularIngredientes(tazasCafePreparar);


function calcularTazasDisponibles(stockAgua, stockLeche, stockCoffeeBeans) {
    const cantidadAgua = 200;
    const cantidadLecha = 50;
    const cantidadCafe = 15;

    let aguaDisponible = Math.floor(stockAgua / cantidadAgua);
    let lecheDisponible = Math.floor(stockLeche / cantidadLecha);
    let granosCafeDisponible = Math.floor(stockCoffeeBeans / cantidadCafe);

    let tazasDisponibles = 0;

    if (aguaDisponible <= (lecheDisponible && granosCafeDisponible)) {
        tazasDisponibles = aguaDisponible;
    } else if (lecheDisponible <= (granosCafeDisponible && aguaDisponible)) {
        tazasDisponibles = lecheDisponible;
    }
    else {
        tazasDisponibles = granosCafeDisponible;
    }

    if (tazasDisponibles == tazasCafePreparar) {
        console.log("Yes, I can make that amount of coffee");
    } else if (tazasDisponibles < tazasCafePreparar) {
        console.log("No, I can make only " + tazasDisponibles + " cups of coffee");
    } else {
        console.log("Yes, I can make that amount of coffee (and even " + (tazasDisponibles - tazasCafePreparar) + " more than that)");
    }
}

calcularTazasDisponibles(stockWater, stockMilk, stockCoffeeBeans); */

/*function printInitialSupplies() {
    console.log(initialWater + " ml of water\n" + initialMilk + " ml of milk\n"
        + initialCoffeBeans + " g of coffee beans\n" + initialDisposableCups + " disposable cups\n"
        + initialMoney + " of money");
}

printInitialSupplies();*/

/*
function printStockFinal(arr, dinero) {
    let nuevoStockAgua = initialWater + arr[0];
    let nuevoStockLeche = initialMilk + arr[1];
    let nuevoStockCafe = initialCoffeBeans + arr[2];
    let nuevoStockVasos = initialDisposableCups + arr[3];
    let nuevoSaldo = initialMoney + dinero;

    console.log("The coffee machine has:\n" + nuevoStockAgua + " ml of water\n" + nuevoStockLeche + " ml of milk\n"
        + nuevoStockCafe + " g of coffee beans\n" + nuevoStockVasos +  " disposable cups\n" + "$" + nuevoSaldo + " of money")

}


Write action (buy, fill, take, remaining, exit):> remaining
The coffee machine has:
    400 ml of water
540 ml of milk
120 g of coffee beans
9 disposable cups
$550 of money
Write action (buy, fill, take, remaining, exit):> buy
What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino:> 2
I have enough resources, making you a coffee!
    Write action (buy, fill, take, remaining, exit):> buy
What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino:> 2
Sorry, not enough water!
    Write action (buy, fill, take, remaining, exit):> fill
Write how many ml of water you want to add:> 1000
Write how many ml of milk you want to add:> 0
Write how many grams of coffee beans you want to add:> 0
Write how many disposable coffee cups you want to add:> 0
Write action (buy, fill, take, remaining, exit):> buy
What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino:> 2
I have enough resources, making you a coffee!
    Write action (buy, fill, take, remaining, exit):> take
I gave you $571
Write action (buy, fill, take, remaining, exit):> remaining
The coffee machine has:
    350 ml of water
315 ml of milk
60 g of coffee beans
6 disposable cups
$0 of money
Write action (buy, fill, take, remaining, exit):> exit
 */


