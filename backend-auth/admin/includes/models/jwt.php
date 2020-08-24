<?php

namespace BackendAuth;

require_once __DIR__ . '/../../../config.php';
require_once __DIR__ . '/../../../vendor/autoload.php';

class JWT
{
    private $lastError = '';

    public function getLastError()
    {
        return $this->lastError;
    }

    public function create($uid, $gid)
    {
        $payload = array(
            "ip" => $_SERVER['REMOTE_ADDR'],
            "uid" => $uid,
            "gid" => $gid
        );

        return \Firebase\JWT\JWT::encode($payload, JWT_KEY);
    }

    public function auth($jwt)
    {
        try {
            $decoded = \Firebase\JWT\JWT::decode($jwt, JWT_KEY, array('HS256'));
        } catch (\Firebase\JWT\SignatureInvalidException $e) {
            $this->lastError = 'Invalid signature';
            return false;
        } catch (\Exception $e) {
            $this->lastError = $e->getMessage();
            return false;
        }

        if (!$decoded) {
            $this->lastError = 'Unknown error';
            return false;
        }

        if ($decoded->ip !== $_SERVER['REMOTE_ADDR']) {
            $this->lastError = 'Unauthorized location';
            return false;
        }

        return (array) $decoded;
    }
}
