$(document).ready(function(e) {

	$.ajax({
		method: 'GET',
		url: "https://cryptic-sands-19648.herokuapp.com/get"
	}).then(function(data){
		$.each(data, function(index){
			var taskName = data[index].name;
			var done = data[index].done;

			if(!done){
				var taskHTML = '<li><span class="done">%</span>'; 
				taskHTML += '<span class="delete">x</span>'; 
				taskHTML += '<span class="task"></span></li>';
				var $newTask = $(taskHTML); 
				$newTask.find('.task').text(taskName);
				$newTask.hide(); 
				$('#todo-list').prepend($newTask); 
				$newTask.show('clip',250).effect('highlight',1000); 
				$('#task').val("");
			}
			else{
				var taskHTML = '<li><span class="done">%</span>'; 
				taskHTML += '<span class="delete">x</span>'; 
				taskHTML += '<span class="task"></span></li>';
				var $newTask = $(taskHTML); 
				$newTask.find('.task').text(taskName);
				$newTask.hide(); 
				$('#completed-list').prepend($newTask); 
				$newTask.show('clip',250).effect('highlight',1000); 
				$('#task').val("");
			}
		})
	}).fail(function(){console.log("Unsucceesful Request")});;

	$('#add-todo').button({ icons: { primary: "ui-icon-circle-plus" } });

	$('#add-todo').button({
		icons: { primary: "ui-icon-circle-plus" }}).click(
			function() {
				$('#new-todo').dialog('open');
	});

	$('#new-todo').dialog({ modal : true, autoOpen : false });
	$('#new-todo').dialog({
		modal : true, autoOpen : false, 
		buttons : {
			"Add task" : function () {
			
				var taskName = $('#task').val();
				if (taskName === '') { return false; }

				$.ajax({
					method: 'POST',
					url: "https://cryptic-sands-19648.herokuapp.com/post/" + taskName +"/false"
				}).fail(function(){console.log("Unsucceesful Request")});;	

				var taskHTML = '<li><span class="done">%</span>'; 
				taskHTML += '<span class="delete">x</span>'; 
				taskHTML += '<span class="task"></span></li>';
				var $newTask = $(taskHTML); 
				$newTask.find('.task').text(taskName);
				$newTask.hide(); $('#todo-list').prepend($newTask); 
				$newTask.show('clip',250).effect('highlight',1000); 
				$('#task').val("");
				$(this).dialog('close');
			
			},

			"Cancel" : function () { $(this).dialog('close'); } }
	});

	$('#todo-list').on('click', '.done', function() { 
		var $taskItem = $(this).parent('li'); 
		$taskItem.slideUp(250, function() {
			var $this = $(this);
			$this.detach(); 
			$('#completed-list').prepend($this); 
			$this.slideDown();
			$.ajax({
				method: 'PUT',
				url: "https://cryptic-sands-19648.herokuapp.com" + "/put/" + $taskItem[0].innerText.replace('%x', '') +"/true"
			}).fail(function(){console.log("Unsucceesful Request")});
		});
	});

	$('.sortlist').sortable({ 
		connectWith : '.sortlist',
		cursor : 'pointer',
		placeholder : 'ui-state-highlight', 
		cancel : '.delete,.done'
	});

	$('.sortlist').on('click','.delete',function() { 

		var x = confirm("Are you sure you want to delete this task?");

		if(x){
			$.ajax({
				method: 'PUT',
				url: "https://cryptic-sands-19648.herokuapp.com/remove/" + $(this).parent('li').find('.task')[0].innerText
			}).fail(function(){console.log("Unsucceesful Request")});
			$(this).parent('li').effect('puff', function() { $(this).remove(); 

			});
		}
	});

}); // end ready

var ERROR_LOG = console.error.bind(console);
