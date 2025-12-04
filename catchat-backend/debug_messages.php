<?php

use App\Models\Message;

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$messages = Message::with('user')->latest()->take(5)->get();

foreach ($messages as $message) {
    echo "ID: " . $message->id . "\n";
    echo "User ID (Sender): " . $message->user_id . "\n";
    echo "User Name: " . $message->user->name . "\n";
    echo "Body: " . $message->body . "\n";
    echo "------------------------\n";
}
