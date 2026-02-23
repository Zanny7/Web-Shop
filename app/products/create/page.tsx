import Form from 'next/form';
import { addProduct } from './action';

export default function CreatePage() {

    return(
        <main className="container mx-auto">
            <h1 className="text-center">Add a new Product</h1>
            <Form action={addProduct}>
                <div className="w-8/12 mx-auto grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 items-center">
                    <label htmlFor="title">Title</label>
                    <input 
                        className="border"
                        id="title"
                        name="title"
                        type="text"
                        minLength={5}
                        maxLength={20}
                        required 
                    />

                    <label htmlFor="brand">Brand</label>
                    <input 
                        className="border"
                        id="brand"
                        name="brand"
                        type="text"
                        minLength={5}
                        maxLength={20}
                        required
                    />

                    <label htmlFor="price">Price</label>
                    <input 
                        className="border"
                        id="price"
                        name="price"
                        type="number"
                        min="0.5"
                        step="0.01"
                        required
                    />

                    <label htmlFor="stock">Stock</label>
                    <input 
                        className="border"
                        id="stock"
                        name="stock"
                        type="number"
                        required
                    />

                    <label htmlFor="categoryId">Category ID</label>
                    <input
                        className="border"
                        id="categoryId"
                        name="categoryId"
                        type="number"
                        required
                    />

                    <label htmlFor="description">Description</label>
                    <textarea
                        className="border"
                        id="description"
                        name="description"
                        minLength={5}
                        maxLength={500}
                        required
                    />

                    <label htmlFor="thumbnail">Thumbnail</label>
                    <input
                        className="border"
                        id="thumbnail"
                        name="thumbnail"
                        type="url"
                        required
                    />
                    <button type="submit">Save</button>
                </div>
                
            </Form>
        </main>
    )
}