<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::latest()->get();

        return Inertia::render('admin/users', [
            'initialUsers' => $users,
            'flash' => [
                'newUser' => session('newUser'),
                'updatedUser' => session('updatedUser'),
                'deletedUserId' => session('deletedUserId'),
                'success' => session('success'),
                'error' => session('error')
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'adresse' => 'nullable|string|max:255',
        ]);

        $user = User::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'adresse' => $request->adresse,
            'admin' => false,
        ]);

        session()->flash('newUser', $user);
        return redirect()->route('users.index')
            ->with('success', 'User created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $user->load('commandes', 'avis');

        return Inertia::render('admin/users/show', [
            'user' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8',
            'adresse' => 'nullable|string|max:255',
        ]);

        $data = [
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'adresse' => $request->adresse,
        ];

        // Only update password if provided
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        session()->flash('updatedUser', $user);
        return redirect()->route('users.index')
            ->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        // Prevent deleting the last admin user
        if ($user->admin && User::where('admin', true)->count() <= 1) {
            return redirect()->route('users.index')
                ->with('error', 'Cannot delete the last admin user.');
        }

        $userId = $user->id;
        $user->delete();

        session()->flash('deletedUserId', $userId);
        return redirect()->route('users.index')
            ->with('success', 'User deleted successfully.');
    }
}
