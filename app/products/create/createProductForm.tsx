"use client";

import { useState } from "react";
import Form from "next/form";
import { addProduct } from "./action";
import productsData from "@/server/products.json";

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

    const categoryName = preview
  ? productsData.categories.find(
      (cat) => cat.id === Number(preview.categoryId)
    )?.name
  : "";

  const categoryThumbnail = preview 
  ? productsData.categories.find(
      (cat) => cat.id === Number(preview?.categoryId)
    
    )?.image
  : "";

  return (
    <>
      <Form action={addProduct}>
        {/* relative w-6/12 mx-auto grid grid-cols-[1fr_5fr] items-center rounded */}
        <div className="flex flex-col w-6/12 mx-auto gap-y-4 bg-[linear-gradient(to_right,rgb(229,229,229)_7.1rem,transparent_7.1rem)] rounded-tl rounded-bl pl-3">
          

          <div className="flex items-center">
            <label htmlFor="title" className="min-w-25">Title</label>
            <input className="flex-1 border-gray-300 border" id="title" name="title" type="text" required />
          </div>

          <div className="flex items-center">
            <label htmlFor="brand" className="min-w-25">Brand</label>
            <input className="flex-1 border-gray-300 border" id="brand" name="brand" type="text" required />
          </div>

          <div className="flex items-center">
            <label htmlFor="price" className="min-w-25">Price</label>
            <input className="flex-1 border-gray-300 border" id="price" name="price" type="number" required />
          </div>

          <div className="flex items-center">
            <label htmlFor="stock" className="min-w-25">Stock</label>
            <input className="flex-1 border-gray-300 border" id="stock" name="stock" type="number" required />
          </div>

          <div className="flex items-center">
            <label htmlFor="categoryId" className="min-w-25">Category ID</label>
            <input className="flex-1 border-gray-300 border" id="categoryId" name="categoryId" type="number" required />
          </div>
          
          <div className="flex items-center">
            <label htmlFor="thumbnail" className="min-w-25">Thumbnail</label>
            <input className="flex-1 border-gray-300 border" id="thumbnail" name="thumbnail" type="url" />
          </div>

          <div className="flex items-center">
            <label htmlFor="description" className="min-w-25">Description</label>
            <textarea className="flex-1 border-gray-300 border min-w-[185]" id="description" name="description" required />
          </div>
        </div>
        <div className="flex gap-4 mt-4 justify-center">
            <button className="bg-purple-600 text-m text-white font-medium rounded focus:bg-purple-700 py-2 min-w-[80px]" type="submit">Save</button>

            <button className="bg-purple-600 text-m text-white font-medium rounded focus:bg-purple-700 py-2 min-w-[80px]"
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
      </Form>

      {preview && (
        <div className="mt-8 w-8/12 mx-auto  flex flex-col mt-30 mb-20">
            <h2 className="text-xl font-bold mb-5 text-center">Preview</h2>

            <div className="flex w-full gap-2 px-4 py-2 bg-neutral-200 rounded-t">
                <span className="w-[25%] flex justify-center">Product</span>
                <span className="w-[25%] flex justify-center">Category</span>
                <span className="w-[25%] flex justify-center">Price</span>
                <span className="w-[25%] flex justify-center">Stock</span>
            </div>

            <div className="flex w-full gap-2 items-center border-gray-300 border bg-white px-4 py-1 rounded-b">
                <div className="w-[25%] flex justify-center items-center">
                    <img src={`${preview.thumbnail || categoryThumbnail}`} alt="" className="w-[40px]"></img>
                    <span>{preview.title}</span>
                </div>
                <span className="w-[25%] flex justify-center">{categoryName}</span>
                <span className="w-[25%] flex justify-center">{preview.price}</span>
                <span className="w-[25%] flex justify-center">{preview.stock}</span>
            </div>
        </div>
      )}
    </>
  );
}