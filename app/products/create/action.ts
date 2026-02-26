"use server"

import { API_URL } from "@/lib/config";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addProduct(formData: FormData){
    
    const title = formData.get("title") as string;
    const brand = formData.get("brand") as string;
    const price = formData.get("price") as string;
    const stock = formData.get("stock") as string;
    const categoryId = formData.get("categoryId") as string;
    const description = formData.get("description") as string;
    const thumbnail = formData.get("thumbnail") as string;
    
    
    const newProduct = {
        title,
        brand,
        description,
        thumbnail,
        price: parseInt(price, 10),
        categoryId: parseInt(categoryId, 10),
        stock: parseInt(stock, 10),
    }

    console.log(newProduct)

    const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newProduct),
    });

    const data = await res.json();
    console.log(data);

    revalidatePath("/");
    // redirect("/");
    
}
