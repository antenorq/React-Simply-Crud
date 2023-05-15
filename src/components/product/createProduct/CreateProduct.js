import React, { useState } from "react";

// import './AdicionarUsuario.css'

function CreateProduct({ products, setProducts }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  console.log("createProduct");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const product = { name, color };

    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((newProduct) => {
        setName("");
        setColor("");
        setProducts([...products, newProduct]);
      });
  };

  return (
    <div className="CreateProduct">
      <h2>Create Product</h2>
      <form onSubmit={onSubmitHandler}>
        <div className="row">
          <div className="Column">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            ></input>
          </div>
          <div className="Column">
            <label>Color</label>
            <input
              type="text"
              name="color"
              value={color}
              onChange={(event) => setColor(event.target.value)}
              required
            ></input>
          </div>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default CreateProduct;
