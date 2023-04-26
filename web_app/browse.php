#!/usr/local/bin/php
<?php
include('../admin-connection-data.txt');

try
{
	  $ts_dbh = new PDO('mysql:host='.$server.';port='.$port.';dbname='.$tsdb, $user, $pass);
} catch (PDOException $e) {
	  print $e->getMessage();
	  exit;
}

try
{
	  $user_dbh = new PDO('mysql:host='.$server.';port='.$port.';dbname='.$userdb, $user, $pass);
} catch (PDOException $e) {
	  print $e->getMessage();
	  exit;
}
?>
<!DOCTYPE HTML>
<html lang="en">
  <head>
    <meta charts="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Browse</title>
    <link rel="stylesheet" href="css_modules/theme.css">
    <link rel="stylesheet" href="css_modules/flex-container.css">
    <link rel="stylesheet" href="css_modules/header.css">
    <link rel="stylesheet" href="css_modules/content.css">
    <link rel="stylesheet" href="css_modules/footer.css">
  </head>
  <body>
    <?php
      
      $browse_query_ts = "SELECT ts_id, ts_name, ts_desc,
                 ts_domain, ts_keywords,
                 ts_length, ts_sampling_period
                 FROM ts_metadata";
      
      $browse_query_users = "SELECT id, username
                 FROM users";

      $result_ts = $ts_dbh->query($browse_query_ts);
      $result_users = $user_dbh->query($browse_query_users);
      
      if (!$result_ts) {
          print "ts db execution error: </br>";
          $error = $ts_dbh->errorInfo();
          print($error[2]);
          exit;
      }

      if (!$result_users) {
        print "user db execution error: </br>";
        $error = $user_dbh->errorInfo();
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

      <div class="tab-container">
        <div id="time-series-tab" class="tab active" onclick="switchTab('time-series')">Time Series</div>  
        <div id="users-tab" class="tab" onclick="switchTab('users')">Users</div>
        </div>

        <div id="users-content" class="content-container">
        <div class="interface font">
          <table style="border-collapse: collapse;">
            <thead>
              <tr>
                <th style="padding: 10px;">ID</th>
                <th style="padding: 10px;">Username</th>
              </tr>
            </thead>
            <tbody>
              <?php
                foreach ($result_users as $row) {
                  echo "<tr>";
                  echo "<td style='padding: 10px;'><a href='view-user.php?ts_id="
                        .$row['id']. "'>".$row['id']."<a/></td>";
                  echo "<td style='padding: 10px;'>".$row['username']."</td>";
                  echo "</tr>";
                }
              ?>
            </tbody>
          </table>
        </div>
        </div>

        <div id="time-series-content" class="content-container active">
        <div class="interface font">
          <table style="border-collapse: collapse;">
            <thead>
              <tr>
                <th style="padding: 10px;">ID</th>
                <th style="padding: 10px;">Name</th>
                <th style="padding: 10px;">Description</th>
                <th style="padding: 10px;">Domain</th>
                <th style="padding: 10px;">Keywords</th>
                <th style="padding: 10px;">Length</th>
                <th style="padding: 10px;">Sampling Period</th>
              </tr>
            </thead>
            <tbody>
              <?php
                foreach ($result_ts as $row) {
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
              ?>
            </tbody>
          </table>
        </div>
        </div>
      </main>
      <footer>
        <div class="font">
          <p>company information</p>
        </div>
      </footer>
    </div>
    <script src="js_modules/browse.js"></script>
  </body>
</html>