
$( document ).ready(function() {
	console.log('document ready!');

	// setup
	$('input').iCheck({
		checkboxClass: 'icheckbox_flat',
		radioClass: 'iradio_flat'
	});

	// load names
	let names;

	$.get('names.json', function(theNames) {
		names = theNames;
	})
		.done(function() {
			console.log('loaded names!');
		})
		.fail(function() {
			console.log('failed loading names...');
		});

	// getRandomNamePart ('male', 'first')
	let getRandomNamePart = (gender, firstOrLast) => {
		console.log('getting ' + gender + ' ' + firstOrLast + ' random name part');
		let namePart = names[gender][firstOrLast];
		return namePart[Math.round(Math.random() * (namePart.length - 1))];
	};

	$('button').on('click', {}, () => {
		let firstName = getRandomNamePart('male', 'first');
		let lastName = getRandomNamePart('male', 'last');

		$('#bng').html(firstName + ' ' + lastName);
	})
});