const products = require('./products.json');

const sorted = products.sort((a, b) => b.value - a.value);

const trucks = [
  {
    index: 0,
    products: [],
  },
];

const newTruck = (index, product) => ({ index, products: [product] });

let truckIndex = 0;

while (sorted.length > 0) {
  const totalWeight = trucks[truckIndex].products
    .map((p) => p.weight)
    .reduce((acc, curr) => Number(acc) + Number(curr), 0);
  if (totalWeight + Number(sorted[0].weight) >= 40) {
    truckIndex++;
    trucks.push(newTruck(truckIndex, sorted[0]));
    sorted.shift();
  } else {
    trucks[truckIndex].products.push(sorted[0]);
    sorted.shift();
  }
}

trucks.forEach((truck) => {
  const totalWeight = truck.products
    .map((p) => p.weight)
    .reduce((acc, curr) => Number(acc) + Number(curr), 0);

  const totalValue =
    truck.products
      .map((p) => p.value)
      .reduce((acc, curr) => Number(acc) + Number(curr), 0) * 1000;

  const result = {
    truck: truck.index + 1,
    value: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(totalValue),
    weight: `${totalWeight} Ton`,
    products: truck.products.length,
  };

  console.table(result);
});
