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
            (empty($_POST['confirm-password']))
        ) {
            return false;
        }

        if ($_POST['password'] !== $_POST['confirm-password']) {
            return false;
        }

        return true;
    }
}
