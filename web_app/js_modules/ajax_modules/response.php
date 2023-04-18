<?php

$test_string = $_POST['testString'];

if (empty($test_string)) {
  echo "<p>String is Empty</p>";
} else {
  echo "<p>" . $test_string . "</p>";
}

?>;