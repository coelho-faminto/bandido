<?php

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/admin/includes/models/jwt.php';

use BackendAuth\JWT;

function auth($authorization)
{
    return (new JWT())->auth($authorization);
}

/** 
 * Get header Authorization
 * */
function getAuthorizationHeader()
{
    $headers = null;
    if (isset($_SERVER['Authorization'])) {
        $headers = trim($_SERVER["Authorization"]);
    } else if (isset($_SERVER['HTTP_AUTHORIZATION'])) { //Nginx or fast CGI
        $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
    } elseif (function_exists('apache_request_headers')) {
        $requestHeaders = apache_request_headers();

        // Server-side fix for bug in old Android versions (a nice side-effect of this fix means we don't care about capitalization for Authorization)
        $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));

        //print_r($requestHeaders);
        if (isset($requestHeaders['Authorization'])) {
            $headers = trim($requestHeaders['Authorization']);
        }
    }
    return $headers;
}

/**
 * get access token from header
 * */
function getBearerToken()
{
    $headers = getAuthorizationHeader();

    // HEADER: Get the access token from the header
    if (!empty($headers)) {
        if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
            return $matches[1];
        }
    }

    return null;
}

$error_messages = [];
$messages = [];
$response = [];

function output($message, $error = false)
{
    global $error_messages, $messages;

    if ($error) {
        $error_messages[] = $message;
    } else {
        $messages[] = $message;
    }
}

function file_post_contents($url, $data, $method = 'POST', $authorization = false)
{
    $opts = [
        'http' => [
            'method'  => $method,
            'header'  => 'Content-type: application/json',
            'content' => json_encode($data)
        ]
    ];

    if ($authorization) {
        $opts['http']['header'] = "Authorization: Bearer " . $authorization;
    }

    $context = stream_context_create($opts);

    return file_get_contents($url, false, $context);
}

function process_input()
{
    global $response;

    try {
        $obj = file_get_contents('php://input');

        if (!$obj) {
            throw new \Exception('JSON Inválido');
        }

        $json = json_decode($obj, true);

        if (!$json) {
            throw new \Exception('Não foi possível obter o JSON');
        }

        if (
            (!isset($json['request'])) ||
            (!isset($json['data']))
        ) {
            throw new \Exception('Parâmetros insuficientes');
        }

        $response = file_post_contents(SERVER_URL, $json);

        output('Requisição processada com sucesso');

        return true;
    } catch (\Exception $e) {
        output('Erro na requisição: ' . $e->getMessage(), true);

        return false;
    }
}

function process_request()
{
    $authorization = getBearerToken();

    if (empty($authorization)) {
        return false;
    }

    if (!auth($authorization)) {
        return false;
    }

    // auth ok, forward request to main server

    process_input();
}

function show()
{
    global $error_messages, $messages, $response;

    if (!empty($error_messages)) {
        $output = [
            'error' => true,
            'isAPI' => false,
            'messages' => $error_messages
        ];
        echo json_encode($output);

        return true;
    }

    if (!empty($messages)) {
        echo $response;

        return true;
    }

    return false;
}

header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] != 'OPTIONS') {
    header('Content-type: application/json');
}

process_request();
show();
