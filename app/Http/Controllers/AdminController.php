<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $users = User::orderBy('created_at', 'desc')->get(['id', 'name', 'email', 'role', 'created_at']);
        $now   = now();

        return Inertia::render('Admin/Index', [
            'users' => $users,
            'stats' => [
                'total'     => $users->count(),
                'premium'   => $users->whereIn('role', ['premium', 'admin'])->count(),
                'admins'    => $users->where('role', 'admin')->count(),
                'thisMonth' => $users->filter(fn ($u) => $u->created_at->month === $now->month && $u->created_at->year === $now->year)->count(),
            ],
        ]);
    }

    public function updateRole(Request $request, User $user)
    {
        $request->validate(['role' => 'required|in:user,premium,admin']);
        $user->update(['role' => $request->role]);
        return back();
    }
}
