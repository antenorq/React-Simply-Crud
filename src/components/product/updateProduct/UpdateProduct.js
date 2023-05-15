// import { useState, useEffect } from "react";

function UpdateProduct({
  products,
  setProducts,
  productToUpdate,
  setProductToUpdate,
}) {
  console.log("ESTOU NO COMPONENT UPDATE");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    fetch(`http://localhost:3000/products/${productToUpdate.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productToUpdate),
    }).then((data) => {
      setProductToUpdate({});

      const index = products.findIndex(
        (item) => item.id === productToUpdate.id
      );
      const list_products = [...products];

      list_products[index] = productToUpdate;

      setProducts([...list_products]);

      console.log("1 - " + JSON.stringify(list_products));
      console.log("2 - " + JSON.stringify(products));
    });
  };

  return (
    <>
      <div className="UpdateProduct">
        <h2>Update Product</h2>
        <form onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="Column">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={productToUpdate.name || ""}
                onChange={(event) =>
                  setProductToUpdate({
                    ...productToUpdate,
                    name: event.target.value,
                  })
                }
                required
              ></input>
            </div>
            <div className="Column">
              <label>Color</label>
              <input
                type="text"
                name="color"
                value={productToUpdate.color || ""}
                onChange={(event) =>
                  setProductToUpdate({
                    ...productToUpdate,
                    color: event.target.value,
                  })
                }
                required
              ></input>
            </div>
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
}

export default UpdateProduct;
