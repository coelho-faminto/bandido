<?php
require_once __DIR__ . '/../models/user.php';

class UserController
{
    public $model;

    public function __construct()
    {
        $this->model = new UserModel();
    }

    public function insert()
    {
        $data = [
            'username' => $_POST['username'],
            'password' => hash('sha256', $_POST['password'])
        ];

        return $this->model->insert($data);
    }

    public function validate()
    {
        if (
            (empty($_POST['username'])) ||
            (empty($_POST['password'])) ||
            (empty($_POST['confirm-password'])) ||
            (empty($_POST['master-password']))
        ) {
            return false;
        }

        if ($_POST['password'] !== $_POST['confirm-password']) {
            return false;
        }

        if (hash('sha256', $_POST['master-password']) !== '52ac30f1ef11050e8f8f62a4a3b304927dadc561927a9a008cf35b9670cf1b57') {
            return false;
        }

        return true;
    }
}
