<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    public function sendMessage(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'body' => 'required|string',
        ]);

        $senderId = $request->user()->id;
        $receiverId = $request->receiver_id;

        // Check if conversation exists
        $conversation = Conversation::whereHas('users', function ($query) use ($senderId) {
            $query->where('user_id', $senderId);
        })->whereHas('users', function ($query) use ($receiverId) {
            $query->where('user_id', $receiverId);
        })->first();

        if (!$conversation) {
            $conversation = Conversation::create([
                'is_group' => false,
            ]);
            $conversation->users()->attach([$senderId, $receiverId]);
        }

        $message = Message::create([
            'conversation_id' => $conversation->id,
            'user_id' => $senderId,
            'body' => $request->body,
            'type' => 'text',
            'is_read' => false,
        ]);

        return response()->json($message->load('user'), 201);
    }

    public function getMessages(Request $request, $userId)
    {
        $authUserId = $request->user()->id;

        $conversation = Conversation::whereHas('users', function ($query) use ($authUserId) {
            $query->where('user_id', $authUserId);
        })->whereHas('users', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->first();

        if (!$conversation) {
            return response()->json([]);
        }

        $messages = $conversation->messages()->with('user')->orderBy('created_at', 'asc')->get();

        return response()->json($messages);
    }

    public function getConversations(Request $request)
    {
        $userId = $request->user()->id;

        $conversations = Conversation::whereHas('users', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })
        ->with(['users' => function ($query) use ($userId) {
            $query->where('user_id', '!=', $userId);
        }, 'lastMessage'])
        ->get()
        ->map(function ($conversation) {
            $otherUser = $conversation->users->first();
            return [
                'id' => $conversation->id,
                'user' => $otherUser,
                'last_message' => $conversation->lastMessage,
            ];
        });

        return response()->json($conversations);
    }
}
