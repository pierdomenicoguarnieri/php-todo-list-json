<?php

header('Content_Type: application/json');

$jsonTaskString = file_get_contents('database.json');

// True server a rendere la srtinga decodificata un array associativo
$jsonTaskList = json_decode($jsonTaskString, true);

if(isset($_POST['newTaskText'])){
  $newTask = [
    "text" => $_POST['newTaskText'],
    "flag" => false
  ];

  $jsonTaskList[] = $newTask;

  file_put_contents('database.json', json_encode($jsonTaskList, JSON_PRETTY_PRINT));
}

if(isset($_POST['indexToCancel'])){
  $indexToDelete = $_POST['indexToCancel'];

  array_splice($jsonTaskList, $indexToDelete, 1);

  file_put_contents('database.json', json_encode($jsonTaskList, JSON_PRETTY_PRINT));
}

if(isset($_POST['indexToChange'])){
  $indexToChange = $_POST['indexToChange'];

  $jsonTaskList[$indexToChange]['flag'] = !$jsonTaskList[$indexToChange]['flag'];

  file_put_contents('database.json', json_encode($jsonTaskList, JSON_PRETTY_PRINT));
}

$taskList = json_encode($jsonTaskList);

echo $taskList;