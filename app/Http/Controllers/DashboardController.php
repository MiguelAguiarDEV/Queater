<?php
namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Restaurant;
use Illuminate\Support\Facades\Auth;



class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Index');
    }

    public function show(Restaurant $restaurant)
    {
        /** @var User $user */
        $user = Auth::user();

        abort_if(!$user || $user->id !== $restaurant->user_id, 403);

        return Inertia::render('Dashboard/Index', [
            'restaurant' => $restaurant,
        ]);
    }
}
