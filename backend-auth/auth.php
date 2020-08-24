<?php

require_once __DIR__ . '/admin/includes/models/jwt.php';

use BackendAuth\JWT;

function auth()
{
    $jwt = new JWT();

    $authorization = $jwt->create('1', '1');
    //$authorization = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpcCI6Ijo6MSIsInVpZCI6IjEiLCJnaWQiOiIxIn0.7BxFZM68Zj7EQfvJlFNPM07oMJipFCjZ6gGkQwLTnlg';

    $auth = $jwt->auth($authorization);

    if (!$auth) {
        echo 'Authentication failed: ' . $jwt->getLastError();
        return;
    }

    var_dump($auth);
}

auth();
