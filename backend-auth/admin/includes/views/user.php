<?php
require_once __DIR__ . '/../models/user.php';

class UserView
{
    public $model;

    public function __construct()
    {
        $this->model = new UserModel();
    }

    public function list()
    {
        $this->model->orderBy('updatedAt', 'DESC');
        return $this->model->list();
    }

    public function getUserByUsernameAndPassword($username, $password)
    {
        $password = hash('sha256', $password);

        $this->model->db->where('username', $username)->where('password', $password);

        return $this->model->getOne('id, username, createdAt, updatedAt');
    }
}
