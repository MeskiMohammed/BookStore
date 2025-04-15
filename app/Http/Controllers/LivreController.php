<?php

namespace App\Http\Controllers;

use App\Models\Livre;
use Illuminate\Http\Request;

class LivreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('admin/books',['initialBooks'=>Livre::all()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'libelle' => 'required|string|max:255',
            'description' => 'nullable|string',
            'auteur' => 'required|string|max:255',
            'isbn' => [
                'required',
                'string',
                'max:20',
            ],
            'prix' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'categorie_id' => 'required',
            'editeur' => 'required|string|max:255',
            'date_publication' => 'required|date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'actif' => 'required|boolean',
        ]);
    
        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }
    
        $data = $validator->validated();
    
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('livres', 'public');
            $data['image'] = $path;
        }
    
        Livre::create($data);
    
        return redirect()->route('livres.index')->with('success', 'Livre créé !');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Livre::find($id)->delete();
        to_route('books.index');
    }
}
