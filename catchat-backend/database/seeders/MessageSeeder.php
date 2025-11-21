<?php

namespace Database\Seeders;

use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Database\Seeder;

class MessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $conversations = Conversation::with('users')->get();

        foreach ($conversations as $conversation) {
            // Create 10 messages for each conversation
            for ($i = 0; $i < 10; $i++) {
                $sender = $conversation->users->random();
                
                Message::create([
                    'conversation_id' => $conversation->id,
                    'user_id' => $sender->id,
                    'body' => "Message $i in conversation {$conversation->id} from {$sender->name}",
                    'is_read' => rand(0, 1),
                ]);
            }
        }
    }
}
