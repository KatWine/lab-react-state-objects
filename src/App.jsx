import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import data from "./data";

function App() {
  const [foodObjs, setFoodObjs] = useState({ ...data });
  const foodKeys = Object.keys(foodObjs);

  const [foodList, setFoodList] = useState([]);
  const [foodDisplay, setFoodDisplay] = useState([]);
  const [sum, setSum] = useState(0);

  const deleteItem = (key) => {
    setFoodList((prevList) => prevList.filter((item) => item !== key));
  };

  useEffect(() => {
    setFoodDisplay(
      foodList.map((key) => {
        const { name, image } = foodObjs[key];
        return (
          <li key={key}>
            <td onClick={() => deleteItem(key)}>❌</td>
            <p>{image} {name}</p>
          </li>
        );
      })
    );
    setSum(
      foodList.reduce((total, key) => total + parseFloat(foodObjs[key].price), 0)
    );
  }, [foodList, foodObjs]);

  const foodItems = foodKeys.map((key) => {
    const { name, price, image, spiceLevel } = foodObjs[key];
    const pepper = '🌶️';
    return (
      <tr key={key} onClick={() => setFoodList((prevList) => [...prevList, key])}>
        <td>{image}</td>
        <td>{name}</td>
        <td>${price}</td>
        <td>{pepper.repeat(spiceLevel)}</td>
      </tr>
    );
  });

  return (
    <div className="App">
      <Header />
      <main>
        <aside>
          <table>
            <tbody>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Spice Level</th>
              </tr>
              {foodItems}
            </tbody>
          </table>
        </aside>
        <section>
          <div>
            <h2>Current Order</h2>
            <ul>{foodDisplay}</ul>
            <h4>Total: ${sum.toFixed(2)}</h4>
            <div>
              <button>Tidy order</button>
              <button>Close order</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
