<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Admin User
        User::create([
            'name' => 'Adair Admin',
            'email' => 'adair@test.com',
            'password' => Hash::make('password'),
            'is_online' => true,
            'role' => 'admin',
        ]);

        // Create 10 random users
        User::factory(10)->create();
    }
}
