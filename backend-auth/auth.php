<?php

require_once __DIR__ . '/admin/includes/models/jwt.php';
require_once __DIR__ . '/admin/includes/controllers/user.php';
require_once __DIR__ . '/admin/includes/views/user.php';

use BackendAuth\JWT;

$error_messages = [];
$messages = [];
$user = false;

function output($message, $error = false)
{
    global $error_messages, $messages;

    if ($error) {
        $error_messages[] = $message;
    } else {
        $messages[] = $message;
    }
}

function process_request()
{
    global $user;

    $input = false;

    try {
        $input = file_get_contents('php://input');

        $obj = json_decode($input, true);

        $controller =  new UserController();

        if (!$controller->validateUsernameAndPassword($obj)) {
            throw new \Exception('Parâmetros inválidos');
        }

        $view = new UserView();
        $user = $view->getUserByUsernameAndPassword($obj['username'], $obj['password']);

        if (!$user) {
            throw new \Exception($view->model->db->getLastError());
        }

        output('Login success');
    } catch (\Exception $e) {
        output("Não foi possível logar: " . $e->getMessage(), true);
    }

    if (!$input) {
        return false;
    }

    return true;
}

function show()
{
    global $error_messages, $messages, $user;

    if (!empty($error_messages)) {
        $output = [
            'error' => true,
            'messages' => $error_messages
        ];
        echo json_encode($output);

        return true;
    }

    if (!empty($messages)) {
        $uid = !empty($user) ? $user['id'] : '0';

        $jwt = new JWT();
        $authorization = $jwt->create($uid, '1');

        $output = [
            'error' => false,
            'messages' => $messages,
            'user' => $user,
            'jwt' => $authorization
        ];
        echo json_encode($output);

        return true;
    }

    return false;
}

header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] != 'OPTIONS') {
    header('Content-type: application/json');
}

process_request();
show();
