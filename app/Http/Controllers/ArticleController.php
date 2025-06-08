<?php
namespace App\Http\Controllers;
use App\Models\Article;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use Illuminate\Http\Request;

class ArticleController extends Controller
{    public function index(Request $request)
    {
        $query = Article::query();
        
        // Filtrar por restaurant_id si se proporciona
        if ($request->has('restaurant_id')) {
            $query->where('restaurant_id', $request->restaurant_id);
        }
        
        return response()->json($query->get());
    }

    public function show(Article $article)
    {
        return response()->json($article);
    }

    public function store(StoreArticleRequest $request)
    {
        $article = Article::create($request->validated());
        return response()->json($article, 201);
    }

    public function update(UpdateArticleRequest $request, Article $article)
    {
        $article->update($request->validated());
        return response()->json($article);
    }

    public function destroy(Article $article)
    {
        $article->delete();
        return response()->json(null, 204);
    }
}
