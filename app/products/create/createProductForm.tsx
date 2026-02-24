"use client";

import { useState } from "react";
import Form from "next/form";
import { addProduct } from "./action";

export default function CreateProductForm() {
  const [preview, setPreview] = useState<{
    title: string;
    brand: string;
    price: string;
    stock: string;
    categoryId: string;
    description: string;
    thumbnail: string;
  } | null> (null);

  function handlePreview(form: HTMLFormElement) {
    const formData = new FormData(form);
    
    
    setPreview({
        title: formData.get("title") as string,
        brand: formData.get("brand") as string,
        price: formData.get("price") as string,
        stock: formData.get("stock") as string,
        categoryId: formData.get("categoryId") as string,
        description: formData.get("description") as string,
        thumbnail: formData.get("thumbnail") as string,
    });
  }

  return (
    <>
      <Form action={addProduct}>
        <div className="w-8/12 mx-auto grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 items-center">

          <label htmlFor="title">Title</label>
          <input className="border" id="title" name="title" type="text" required />

          <label htmlFor="brand">Brand</label>
          <input className="border" id="brand" name="brand" type="text" required />

          <label htmlFor="price">Price</label>
          <input className="border" id="price" name="price" type="number" required />

          <label htmlFor="stock">Stock</label>
          <input className="border" id="stock" name="stock" type="number" required />

          <label htmlFor="categoryId">Category ID</label>
          <input className="border" id="categoryId" name="categoryId" type="number" required />

          <label htmlFor="description">Description</label>
          <textarea className="border" id="description" name="description" required />

          <label htmlFor="thumbnail">Thumbnail</label>
          <input className="border" id="thumbnail" name="thumbnail" type="url" required />

          <div className="col-span-2 flex gap-4 mt-4">
            <button type="submit">Save</button>

            <button
              type="button"
              onClick={(e) => {
                const form = e.currentTarget.form;
                if (!form) return;
                handlePreview(form);
              }}
            >
              Preview
            </button>
          </div>
        </div>
      </Form>

      {preview && (
        <div className="mt-8 w-8/12 mx-auto  flex flex-col mb-20">
            <h2 className="text-lg font-bold mb-2 text-center">Preview</h2>

            <div className="flex w-full gap-2 px-4 py-2 bg-neutral-200 rounded-t">
                <span className="w-[25%]">Product</span>
                <span className="w-[25%]">Category</span>
                <span className="w-[25%]">Price</span>
                <span className="w-[25%]">Stock</span>
            </div>

            <div className="flex w-full gap-2 items-center border-gray-300 border bg-white px-4 py-1 rounded-b">
                <div className="w-[25%] flex items-center">
                    <img src={`${preview.thumbnail}`} alt="" className="w-[40px]"></img>
                    <span>{preview.title}</span>
                </div>
                <span className="w-[25%]">{preview.brand}</span>
                <span className="w-[25%]">{preview.price}$</span>
                <span className="w-[25%]">{preview.stock}</span>
                {/* <span><strong>Category ID:</strong> {preview.categoryId}</span>
                <span><strong>Description:</strong>{preview.description}</span>
                <span><strong>Thumbnail:</strong>{preview.thumbnail}</span> */}
            </div>
        </div>
      )}
    </>
  );
}