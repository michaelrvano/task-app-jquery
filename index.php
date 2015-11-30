<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Task App - jQuery Version - Michael Vano - UI/UX/Front End Developer</title>
	<meta content="width=device-width, initial-scale=1.0" name="viewport" />
	<meta content="Front End Developer - Michael Vano" name="description" />
	<meta content="Michael Vano" name="author" />

	<meta property="og:title" content="Simple Task App by Michael Vano" />
	<meta property="og:site_name" content="Happy Tasker" />
	<meta property="og:url" content="http://portfolio.af13.ca/" />
	<meta property="og:description" content="Front End Developer Portfolio for Michael Vano" />
	<meta property="og:image" content="https://avatars0.githubusercontent.com/u/5809316?v=3&s=460" />

	<link rel="canonical" href="http://portfolio.af13.ca" />
	<link rel="shortcut icon" href="img/favicon.png"  type="image/png">

	<!-- STYLES -->
	<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
	<link href="css/font-awesome.min.css" rel="stylesheet" type="text/css"/>	
	<link href="css/base.css" rel="stylesheet" type="text/css"/>

	<!-- SCRIPTS -->
	<script src="js/jquery-1.11.3.min.js" type="text/javascript"></script>
	<script src="js/bootstrap.min.js" type="text/javascript"></script>
	<script src="js/base.js" type="text/javascript"></script>
	<script>
		$(document).ready(function(){
			var post_url = '/api/';
			var post_data = {
				class: 'tasks',
				action: 'getTasks',
				options: { 'id': 3 },
			};
			console.log(post_data);
			$.post(post_url, post_data, function(data){
				$.each(data, function(k,v) {
					$('[sample]').append(v.title + '<br />');
				});
				console.log($('[sample]'));
				console.log(data);
			},'JSON');
			// VANO.init();
		});
	</script>
</head>
<body>
	<div sample style="width:100%; height:200px;"></div>
	<?php /*
	<div class="wave01"></div>
	<div class="wave02"></div>
	<div class="wave03"></div>
	<div class="header">
		<div class="info">
			<span class="bold size50">Michael Vano</span> <br />
			<span class="bold italic size24">Front End Developer</span> <br />
			<span class="size18">P: 416-985-6100 | E: <a href="mailto:vano@af13.ca">vano@af13.ca</a></span>
			<div class="spacer"></div>
			<div class="row size20">
				<div class="col-md-12">Experience</div>
			</div>
			<div class="spacer-small"></div>
			<div class="row">
				<?php
				if (!empty($experience))
				{
					foreach($experience AS $a)
					{
						?>
						<div class="col-md-3">
							<strong><?php echo $a['type']; ?>: </strong>
							<?php echo $current_year - $a['year'].' years'; ?>
						</div>
						<?php
					}
				}
				?>
			</div>			
		</div>
	</div>
	<div class="info-circle" show-info>
	</div>
	*/ ?>
</body>
</html>

