<?php

namespace App\Http\Controllers;

use App\Models\FriendRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FriendRequestController extends Controller
{
    public function sendRequest(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $receiver = User::where('email', $request->email)->first();
        $sender = Auth::user();

        if ($sender->id === $receiver->id) {
            return response()->json(['message' => 'You cannot send a friend request to yourself.'], 400);
        }

        $existingRequest = FriendRequest::where(function ($query) use ($sender, $receiver) {
            $query->where('sender_id', $sender->id)
                  ->where('receiver_id', $receiver->id);
        })->orWhere(function ($query) use ($sender, $receiver) {
            $query->where('sender_id', $receiver->id)
                  ->where('receiver_id', $sender->id);
        })->first();

        if ($existingRequest) {
            if ($existingRequest->status === 'accepted') {
                return response()->json(['message' => 'You are already friends.'], 400);
            }
            if ($existingRequest->status === 'pending') {
                return response()->json(['message' => 'A friend request is already pending.'], 400);
            }
        }

        FriendRequest::create([
            'sender_id' => $sender->id,
            'receiver_id' => $receiver->id,
            'status' => 'pending',
        ]);

        return response()->json(['message' => 'Friend request sent successfully.']);
    }

    public function getPendingRequests()
    {
        $requests = FriendRequest::where('receiver_id', Auth::id())
            ->where('status', 'pending')
            ->with('sender')
            ->get();

        return response()->json($requests);
    }

    public function acceptRequest($id)
    {
        $friendRequest = FriendRequest::where('id', $id)
            ->where('receiver_id', Auth::id())
            ->where('status', 'pending')
            ->first();

        if (!$friendRequest) {
            return response()->json(['message' => 'Friend request not found.'], 404);
        }

        $friendRequest->update(['status' => 'accepted']);

        return response()->json(['message' => 'Friend request accepted.']);
    }

    public function rejectRequest($id)
    {
        $friendRequest = FriendRequest::where('id', $id)
            ->where('receiver_id', Auth::id())
            ->where('status', 'pending')
            ->first();

        if (!$friendRequest) {
            return response()->json(['message' => 'Friend request not found.'], 404);
        }

        $friendRequest->update(['status' => 'rejected']);
        // Or delete: $friendRequest->delete();

        return response()->json(['message' => 'Friend request rejected.']);
    }

    public function getFriends()
    {
        $userId = Auth::id();
        $friends = FriendRequest::where('status', 'accepted')
            ->where(function ($query) use ($userId) {
                $query->where('sender_id', $userId)
                      ->orWhere('receiver_id', $userId);
            })
            ->with(['sender', 'receiver'])
            ->get()
            ->map(function ($request) use ($userId) {
                return $request->sender_id === $userId ? $request->receiver : $request->sender;
            });

        return response()->json($friends);
    }

    public function removeFriend($id)
    {
        $userId = Auth::id();
        $friendRequest = FriendRequest::where('status', 'accepted')
            ->where(function ($query) use ($userId, $id) {
                $query->where(function ($q) use ($userId, $id) {
                    $q->where('sender_id', $userId)->where('receiver_id', $id);
                })->orWhere(function ($q) use ($userId, $id) {
                    $q->where('sender_id', $id)->where('receiver_id', $userId);
                });
            })
            ->first();

        if (!$friendRequest) {
            return response()->json(['message' => 'Friend not found.'], 404);
        }

        $friendRequest->delete();

        return response()->json(['message' => 'Friend removed.']);
    }
}
