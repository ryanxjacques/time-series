#!/usr/local/bin/php
<?php
include('../admin-connection-data.txt');

try
{
	  $dbh = new PDO('mysql:host='.$server.';port='.$port.';dbname='.$tsdb, $user, $pass);
} catch (PDOException $e) {
	  print $e->getMessage();
	  exit;
}
?>
<!DOCTYPE HTML>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Search Results</title>
    <link rel="stylesheet" href="css_modules/theme.css">
    <link rel="stylesheet" href="css_modules/flex-container.css">
    <link rel="stylesheet" href="css_modules/header.css">
    <link rel="stylesheet" href="css_modules/content.css">
    <link rel="stylesheet" href="css_modules/footer.css">
  </head>
  <body>
    <?php
      $search = strtoupper($_GET['query']);
      
      $search_query = "SELECT ts_id, ts_name, ts_desc,
                 ts_domain, ts_keywords,
                 ts_length, ts_sampling_period
                 FROM ts_metadata
                 WHERE upper(ts_name) LIKE '%".$search."%'
                 OR upper(ts_desc) LIKE '%".$search."%'
                 OR upper(ts_domain) LIKE '%".$search."%'
                 OR upper(ts_keywords) LIKE '%".$search."%'";
      
      $result1 = $dbh->query($search_query);
      
      if (!$result1) {
          print "execution error: </br>";
          $error = $dbh->errorInfo();
          print($error[2]);
          exit;
      }
    ?>
    <div class="flex-container">
      <header>
        <div class="logo-container">
          <img id="logo-image" src="images/logo.png">
        </div>
      </header>
      <main class="content-flex-container">
        <div class="interface font">
          <table style="border-collapse: collapse;">
            <thead>
              <?php
              if ($result1->rowCount() > 0) {
              echo "<tr>";
              echo "<th style='padding: 10px;'>ID</th>";
              echo "<th style='padding: 10px;'>Name</th>";
              echo "<th style='padding: 10px;'>Description</th>";
              echo "<th style='padding: 10px;'>Domain</th>";
              echo "<th style='padding: 10px;'>Keywords</th>";
              echo "<th style='padding: 10px;'>Length</th>";
              echo "<th style='padding: 10px;'>Sampling Period</th>";
              echo "</tr>";
              }
              ?>
            </thead>
            <tbody>
              <?php
              if ($result1->rowCount() > 0) {
                foreach ($result1 as $row) {
                  echo "<tr>";
                  echo "<td style='padding: 10px;'><a href='view-time-series.php?ts_id="
                  .$row['ts_id']. "'>".$row['ts_id']."<a/></td>";
                  echo "<td style='padding: 10px;'>".$row['ts_name']."</td>";
                  echo "<td style='padding: 10px;'>".$row['ts_desc']."</td>";
                  echo "<td style='padding: 10px;'>".$row['ts_domain']."</td>";
                  echo "<td style='padding: 10px;'>".$row['ts_keywords']."</td>";
                  echo "<td style='padding: 10px;'>".$row['ts_length']."</td>";
                  echo "<td style='padding: 10px;'>".$row['ts_sampling_period']."</td>";
                  echo "</tr>";
                }
              }
              else {
                echo "<p>No Results Found</p>";
              }

              ?>
            </tbody>
          </table>
        </div>
      </main>
      <footer>
        <div class="font">
          <p>company information</p>
        </div>
      </footer>
    </div>
  </body>
</html>