<?php
namespace App\Http\Controllers;
use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // API: Listar categorías
    public function index()
    {
        return response()->json(Category::all());
    }

    // API: Mostrar una categoría
    public function show(Category $category)
    {
        return response()->json($category);
    }

    // API: Crear categoría
    public function store(StoreCategoryRequest $request)
    {
        $category = Category::create($request->validated());
        return response()->json($category, 201);
    }

    // API: Actualizar categoría
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $category->update($request->validated());
        return response()->json($category);
    }

    // API: Eliminar categoría
    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json(null, 204);
    }
}
