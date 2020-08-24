<?php
require_once __DIR__ . '/../models/user.php';

class UserView
{
    public function list()
    {
        $model = new UserModel();

        $model->orderBy('updatedAt', 'DESC');
        return $model->list();
    }
}
