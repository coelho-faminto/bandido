<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create new user</title>
</head>

<body>
    <?php
    require_once __DIR__ . '/includes/views/user.php';
    require_once __DIR__ . '/includes/controllers/user.php';

    $insert_message = '';

    $controller = new UserController();
    if ($controller->validate()) {
        $insert_id = $controller->insert();
        if ($insert_id) {
            echo "User added successfully, id: {$insert_id}";
        } else {
            $error = $controller->model->db->getLastError();
            echo "Error: {$error}";
        }
    }

    $view = new UserView();

    echo '<pre>' . print_r($view->list(), true) . '</pre>';
    ?>

    <form action="" method="post">
        <input type="text" name="username" id="username">
        <input type="password" name="password" id="password">
        <input type="password" name="confirm-password" id="confirm-password">
        <button type="submit">Save</button>
    </form>
</body>

</html>