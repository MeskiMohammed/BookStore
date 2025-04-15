<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AvisTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('avis')->insert([
            [
                'user_id' => 1,
                'livre_id' => 1,
                'note' => 5,
                'commentaire' => 'Un livre fantastique, très immersif !',
            ],
            [
                'user_id' => 2,
                'livre_id' => 2,
                'note' => 4,
                'commentaire' => 'Belle histoire, un peu prévisible par moments.',
            ],
        ]);
    }
}
