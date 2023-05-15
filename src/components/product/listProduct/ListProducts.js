import { useState, useEffect } from "react";

import CreateProduct from "../createProduct/CreateProduct";
import UpdateProduct from "../updateProduct/UpdateProduct";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [productToUpdate, setProductToUpdate] = useState({});

  console.log("ESTOU NO COMPONENT LIST");

  useEffect(() => {
    const fetchData = async (e) => {
      try {
        const res = await fetch("http://localhost:3000/products");
        const res_products = await res.json();
        setProducts(res_products);
        console.log("PRODUCTS LOAD SUCCESSFULY");
      } catch (error) {
        console.log("SOMETHING WHENT WRONG");
      }
    };

    fetchData();
  }, [productToUpdate]);

  console.log("LIST - " + JSON.stringify(products));

  //DELETE PRODUCT
  const deleteProduct = (product) => {
    if (window.confirm(`Confirm remove "${product.name} (#${product.id})"?`)) {
      fetch(`http://localhost:3000/products/${product.id}`, {
        method: "DELETE",
      }).then((response) => {
        if (response.ok) {
          let list_products = products;
          list_products = list_products.filter((x) => x.id !== product.id);
          setProducts([...list_products]);
        }
      });
    }
  };

  return (
    <>
      <CreateProduct products={products} setProducts={setProducts} />
      <br />
      <hr />

      <UpdateProduct
        productToUpdate={productToUpdate}
        setProductToUpdate={setProductToUpdate}
        products={products}
        setProducts={setProducts}
      />
      <br />
      <hr />
      <h1>List products</h1>
      <div className="products">
        <ul>
          {products.map((product) => (
            <div key={product.id}>
              <li>
                <strong>ID:</strong> {product.id}
              </li>
              <li>
                <strong>Name:</strong> {product.name}
              </li>
              <li>
                <strong>Color:</strong> {product.color}
              </li>
              <button onClick={() => setProductToUpdate(product)}>
                Update
              </button>
              &nbsp;&nbsp;
              <button onClick={() => deleteProduct(product)}>Delete</button>
              <hr />
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ListProducts;
