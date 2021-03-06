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
    $messages = [];

    $controller = new UserController();
    if ($controller->validate($_POST)) {
        $insert_id = $controller->insert();
        if ($insert_id) {
            $messages[] = "User added successfully, id: {$insert_id}";
        } else {
            $error = $controller->model->db->getLastError();
            $messages[] = "Error: {$error}";
        }
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $messages[] = "Error: validation failed, check if the password confirmation is correct and try again, please";
    }

    $view = new UserView();
    ?>

    <style>
        html {
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
        }

        *,
        *:before,
        *:after {
            box-sizing: inherit;
            -webkit-box-sizing: inherit;
            -moz-box-sizing: inherit;
        }

        body {
            margin: 0;
            padding: 0;
            max-width: 100%;
            background-color: #333;
        }

        form,
        form * {
            display: block;
        }

        form {
            font-size: 10pt;
            width: 100%;
            margin: 0 auto;
            margin-top: 0.333rem;
            padding: 0.666rem 1.333rem;
            background-color: #222;
            max-width: 1200px;
            border-radius: 0.333rem;
        }

        form * {
            margin: 0.666rem 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        form *:not(button) {
            width: 100%;
            color: white;
        }

        textarea:focus,
        input:focus {
            outline: none;
        }

        form input[type='text'],
        form input[type='password'] {
            padding: 0.333rem;
            border: none;
            border-bottom: 1px solid #333;
            background-color: unset;
            margin-bottom: 1.666rem;
            color: paleturquoise;
        }

        form label {
            font-weight: bold;
        }

        .myButton {
            box-shadow: inset 0px 1px 0px 0px #54a3f7;
            background: linear-gradient(to bottom, #007dc1 5%, #0061a7 100%);
            background-color: #007dc1;
            border-radius: 3px;
            border: 1px solid #124d77;
            display: inline-block;
            cursor: pointer;
            color: #ffffff;
            font-family: Arial;
            font-size: 13px;
            padding: 6px 24px;
            text-decoration: none;
            text-shadow: 0px 1px 0px #154682;
        }

        .myButton:hover {
            background: linear-gradient(to bottom, #0061a7 5%, #007dc1 100%);
            background-color: #0061a7;
        }

        .myButton:active {
            position: relative;
            top: 1px;
        }

        form button {
            margin-left: auto;
        }

        form .message {
            color: paleturquoise;
            margin-bottom: 1.333rem;
            font-weight: bold;
        }

        .code {
            width: 100%;
            padding: 0 0.333rem;
            padding-bottom: 0.333rem;
        }

        textarea.json {
            width: 100%;
            border: none;
            padding: 0.666rem;
            background-color: #222;
            color: paleturquoise;
            height: 400px;
            margin: 0 auto;
            margin-top: 0.333rem;
            border-radius: 0.333rem;
            max-width: 1200px;
            display: block;
        }

        .text-right {
            text-align: right;
        }
    </style>

    <form action="" method="post">
        <?php
        foreach ($messages as $m) :
        ?>

            <div class="message">
                <?= $m ?>
            </div>

        <?php
        endforeach
        ?>
        <label for="username">Username</label>
        <input type="text" name="username" id="username">
        <label for="password">Password</label>
        <input type="password" name="password" id="password">
        <label for="confirm-password">Confirm password</label>
        <input type="password" name="confirm-password" id="confirm-password">
        <label for="master-password">Master password</label>
        <input type="password" name="master-password" id="master-password">
        <div class="text-right">
            <button type="submit" class="myButton">Save</button>
        </div>
    </form>

    <div class="code">
        <?= '<textarea class="json">' . print_r(json_encode($view->list(), JSON_PRETTY_PRINT), true) . '</textarea>' ?>
    </div>
</body>

</html>