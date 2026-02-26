
import CreateProductForm from "./createProductForm"

export default function CreatePage() {

    return (
    <main className="container mt-5 mx-auto">
      <h1 className="text-center mb-5 text-2xl font-semibold text-gray-900">Add a new Product</h1>
      <CreateProductForm />
    </main>
  );
}