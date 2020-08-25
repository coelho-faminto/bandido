<?php
require_once __DIR__ . '/../../../config.php';
require_once __DIR__ . '/../../../vendor/autoload.php';

class Model
{
    public $table_name;
    public $db = false;

    public function __construct()
    {
        $this->db = new MysqliDb(
            MYSQL_HOST,
            MYSQL_USERNAME,
            MYSQL_PASSWORD,
            MYSQL_DATABASE
        );

        $this->db->rawQuery("SET time_zone = '-3:00'");
    }

    public function orderBy(...$orderBy)
    {
        return $this->db->orderBy(...$orderBy);
    }

    public function getOne($columns) {
        return $this->db->getOne($this->table_name, $columns);
    }

    public function list()
    {
        return $this->db->get($this->table_name);
    }

    public function insert($data = [])
    {
        if (!$this->db) {
            return false;
        }

        return $this->db->insert($this->table_name, $data);
    }
}
