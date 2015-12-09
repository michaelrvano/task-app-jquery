<?php
$links = array(
	array(
		'name' => 'Standard View',
		'view' => 'standard',
		'icon' => 'fa fa-th-large',
		'href' => ''
	),
	array(
		'name' => 'Date View',
		'view' => 'date',
		'icon' => 'fa fa-calendar',
		'href' => ''	
	),
	array(
		'name' => 'Category View',
		'view' => 'category',
		'icon' => 'fa fa-folder',
		'href' => ''	
	),
	array(
		'name' => 'Latest First',
		'sort' => 'latest',
		'icon' => 'fa fa-sort-amount-desc',
		'href' => ''
	),
	array(
		'name' => 'Oldest First',
		'sort' => 'oldest',
		'icon' => 'fa fa-sort-amount-asc',
		'href' => ''
	),
);
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Happy Tasker - jQuery Version - Michael Vano - UI/UX/Front End Developer</title>
	<meta content="width=device-width, initial-scale=1.0" name="viewport" />
	<meta content="A simple task web application developed by Michael Vano using jQuery as it's main library" name="description" />
	<meta content="Michael Vano" name="author" />

	<meta property="og:title" content="Happy Tasker App by Michael Vano" />
	<meta property="og:site_name" content="Happy Tasker" />
	<meta property="og:url" content="http://portfolio.af13.ca/task-app-jquery" />
	<meta property="og:description" content="A simple task web application developed by Michael Vano using jQuery as it's main library" />
	<meta property="og:image" content="https://avatars0.githubusercontent.com/u/5809316?v=3&s=460" />

	<link rel="canonical" href="http://portfolio.af13.ca/task-app-jquery" />
	<link rel="shortcut icon" href="img/favicon.png"  type="image/png">

	<!-- STYLES -->
	<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
	<link href="css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
	<link href='https://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>
	<link href="css/sweetalert.css" rel="stylesheet" type="text/css"/>
	<link href="css/base.css" rel="stylesheet" type="text/css"/>
</head>
<body>
	<header class="row flex no-margin">
		<div class="size28 size20-md inline-block ml15 logo">Happy Tasker</div>
		<a class="nav-button" nav-button>
			<i class="fa fa-bars size24"></i>
		</a>
	</header>
	<nav>
		<a class="close-button" close-nav>
			<i class="fa fa-chevron-right"></i>
		</a>
		<div class="title size24">
			Menu
		</div>
		<div class="spacer"></div>
		<?php 
		foreach($links AS $k => $v)
		{
			if (isset($v['view']) && $v['view'] != '') { $cust_attr = ' view="'.$v['view'].'" '; } 
			elseif (isset($v['sort']) && $v['sort'] != '') { $cust_attr = ' sort="'.$v['sort'].'" '; } 
			else {$cust_attr = '';}
			$icon = (isset($v['icon']) && $v['icon'] != '') ? '<i class="'.$v['icon'].'"></i>' : '';
			?>
			<a class="nav-button" <?php echo $cust_attr; ?>>
				<?php echo stripslashes($icon).' '.stripslashes($v['name']); ?>
			</a>
			<?php
		}
		?>
	</nav>
	<a class="add-task" add-task>
		<i class="fa fa-plus"></i>
	</a>
	<div class="tasks standard">
		<div class="col-md-2 visible-md visible-lg fixed">
			<div class="size18 mb10 bold">Category Legend</div>
			<div category-legend></div>
		</div>
		<div class="col-md-8 col-md-offset-2" tasks></div>
	</div>
	<div class="popout" popout>
		<a class="close-button" close-popout>
			<i class="fa fa-chevron-right"></i>
		</a>
		<div content></div>
	</div>
	<footer></footer>
	<div class="hide">
		<div class="category" template="category">
			<div class="color inline-block" colors></div>
			- <span name></span>
		</div>
		<div class="task" template="task">
			<div class="title">
				<strong title></strong><br />
				<span class="size12 italic" date></span>
				<div class="clear"></div>
			</div>
			<div class="description" description></div>
			<div class="buttons">
				<i class="fa fa-check" mark-complete></i>
				<i class="fa fa-edit" edit></i>
				<i class="fa fa-trash" delete></i>
			</div>
		</div>
		<div class="task-full-view" template="task-full">
			<a class="close-detail" close-detail>
				<i class="fa fa-times-circle-o"></i>
			</a>
			<div class="title">
				<span title></span> <br />
				<span class="size12" date></span>
			</div>
			<div class="description" description></div>
		</div>
		<div class="custom-form" template="task-form" custom-form>
			<div class="title" title></div>
			<div class="group w100">
				<select categories></select>
				<div class="bar"></div>
			</div>
			<div class="group w100">
				<input type="text" name />
				<label>Task Title</label>
				<div class="bar"></div>
			</div>
			<div class="group w100">
				<textarea description></textarea>
				<label>Task Description</label>
				<div class="bar"></div>
			</div>
			<div class="w70 inline-block">
				<div class="error-message w100" style="display:none;" error-message></div>
			</div><div class="w30 text-right inline-block">
				<button type="submit"></button>
			</div>
		</div>
		<form template="category-form" >
			
		</form>
	</div>
	<!-- SCRIPTS -->
	<script src="js/jquery-1.11.3.min.js" type="text/javascript"></script>
	<script src="js/bootstrap.min.js" type="text/javascript"></script>
	<script src="js/sweetalert.min.js" type="text/javascript"></script>
	<script src="js/base.js" type="text/javascript"></script>
	<script>
		// $(document).ready(function(){
		// 	var post_url = '/api/';
		// 	var post_data = {
		// 		class: 'tasks',
		// 		action: 'getTasks',
		// 		options: { 'id': 3 },
		// 	};
		// 	console.log(post_data);
		// 	$.post(post_url, post_data, function(data){
		// 		$.each(data, function(k,v) {
		// 			$('[sample]').append(v.title + '<br />');
		// 		});
		// 		console.log($('[sample]'));
		// 		console.log(data);
		// 	},'JSON');
		// 	// VANO.init();
		// });
	</script>
	<div class="overlay" overlay></div>
	<div class="clicked" clicked></div>
</body>
</html>

