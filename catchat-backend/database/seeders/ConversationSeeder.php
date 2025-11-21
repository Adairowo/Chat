<?php

namespace Database\Seeders;

use App\Models\Conversation;
use App\Models\User;
use Illuminate\Database\Seeder;

class ConversationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        if ($users->count() < 2) {
            return;
        }

        // Crear un grupo 
        $groupConversation = Conversation::create([
            'name' => 'General Group',
            'is_group' => true,
        ]);
        
        // Add first 5 users to the group
        $groupConversation->users()->attach($users->take(5)->pluck('id'));

        // Crear chat privado
        // Chat  entre usuario 1 y usuario 2
        $privateConversation1 = Conversation::create([
            'is_group' => false,
        ]);
        $privateConversation1->users()->attach([$users[0]->id, $users[1]->id]);

        // Chat entre usuario 1 y  usuario 3
        $privateConversation2 = Conversation::create([
            'is_group' => false,
        ]);
        $privateConversation2->users()->attach([$users[0]->id, $users[2]->id]);
    }
}
